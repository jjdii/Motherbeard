require('dotenv').config()
const express = require('express')
const app = express()
const HTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const cors = require('cors')
const checkRequiredFields = require('./lib/check-required-fields')
const pkGenerator = require('./lib/pk-generator')
const fetchNewegg = require('./lib/fetch-newegg')
const {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  addTemplate,
  getTemplate,
  updateTemplate,
  deleteTemplate,
  addBuild,
  getBuild,
  updateBuild,
  deleteBuild,
  listDocs
} = require('./dal')
const {
  propOr,
  pathOr,
  compose,
  not,
  isEmpty,
  prop,
  omit,
  merge,
  __,
  split,
  join,
  path,
  filter,
  propEq,
  reduce,
  trim,
  concat,
  toLower
} = require('ramda')
const port = process.env.PORT || 5000
const neweggUrl = process.env.NEWEGG_URL

////////////////
// Middleware //
////////////////

app.use(cors({ credentials: true }))
app.use(bodyParser.json())

app.get('/', (req, res, next) => res.send('Welcome to the Motherbeard api'))

//////////////////////
// Newegg Endpoints //
//////////////////////

app.get('/newegg/products', async (req, res, next) => {
  const keywords = encodeURIComponent(propOr('', 'keywords', req.query))
  const recordsPerPage = propOr('10', 'count', req.query)
  const lowPrice = propOr('5', 'low', req.query)
  const highPrice = propOr('10000', 'high', req.query)
  const url = `${neweggUrl}&keywords=${keywords}&currency=USD&sort-by=sale-price&records-per-page=${recordsPerPage}&low-sale-price=${lowPrice}&high-sale-price=${highPrice}`

  fetchNewegg(url)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send('Error fetching Newegg API'))
})

app.post('/newegg/builds', async (req, res, next) => {
  const url = `${neweggUrl}&currency=USD&sort-by=sale-price&records-per-page=10`

  const promiseArr = compose(
    reduce((acc, val) => {
      const name = propOr('', 'name', val)
      const keywords = propOr('', 'keywords', val)
      const lowPrice = propOr('5', 'low', val)
      const highPrice = propOr('10000', 'high', val)

      let keywordStr = ''
      if (not(isEmpty(name)) && not(isEmpty(keywords))) {
        // keywordStr = `&keywords=+${name}+${compose(join('+'), split(' '), trim)(
        //   keywords
        // )}`
        keywordStr = `&keywords=${name}`
      }

      return acc.concat(
        fetchNewegg(
          `${url}${keywordStr}&low-sale-price=${lowPrice}&high-sale-price=${highPrice}`
        )
      )
    }, []),
    path(['body', 'build'])
  )(req)

  Promise.all(promiseArr)
    .then(result => {
      //res.status(200).send(result)

      let buildArr = []
      let i = 0
      result.forEach(products => {
        const productsArr = prop('products', JSON.parse(products))
        const searchFor = split(
          ' ',
          concat(
            pathOr('', ['body', 'build', i, 'name'], req) + ' ',
            pathOr('', ['body', 'build', i, 'keywords'], req)
          )
        )

        productsArr.some(product => {
          const category = toLower(product['advertiser-category'])
          const searchHits = reduce(
            (acc, val) =>
              category.search(toLower(val)) === -1 ? acc : acc + 1,
            0,
            searchFor
          )

          let val = pkGenerator(
            'product_',
            trim(product['manufacturer-name']) + '_' + trim(product['sku']),
            '_'
          )

          if (searchHits > 0) return buildArr.push(i + '_' + val)
        })

        i++
      })

      res.status(200).send({
        _id: pkGenerator('build_', path(['body', 'name'], req), '_'),
        name: path(['body', 'name'], req),
        templateId: path(['body', '_id'], req),
        products: buildArr,
        type: 'build'
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Error fetching Newegg API')
    })
})

///////////////////////
// Product Endpoints //
///////////////////////

app.post('/products', (req, res, next) => {
  if (isEmpty(prop('body', req))) {
    return next(
      new HTTPError(400, {
        ok: false,
        message:
          'Missing request body.  Content-Type header should be application/json.'
      })
    )
  }

  const body = compose(
    omit(['_id', '_rev']),
    merge(__, { type: 'product' }),
    prop('body')
  )(req)

  const missingFields = checkRequiredFields(['name', 'type'], body)

  if (not(isEmpty(missingFields))) {
    return next(
      new HTTPError(400, {
        ok: false,
        message: `Missing required fields: ${join(' ', missingFields)}`
      })
    )
  }

  addProduct(body)
    .then(result => res.status(201).send(result))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.get('/products/:id', (req, res, next) => {
  getProduct(path(['params', 'id'], req))
    .then(result => res.status(200).send(result))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.put('/products/:id', (req, res, next) => {
  const body = prop('body', req)

  if (isEmpty(body)) {
    return next(
      new HTTPError(400, {
        ok: false,
        message:
          'Missing request body.  Content-Type header should be application/json.'
      })
    )
  }

  const missingFields = checkRequiredFields(['name', 'type'], body)

  if (not(isEmpty(missingFields))) {
    return next(
      new HTTPError(400, {
        ok: false,
        message: `Missing required fields: ${join(' ', missingFields)}`
      })
    )
  }

  updateProduct(body)
    .then(result => res.status(200).send(result))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.delete('/products/:id', (req, res, next) => {
  deleteProduct(path(['params', 'id'], req))
    .then(result => res.status(200).send(result))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.get('/products', (req, res, next) => {
  listDocs({ include_docs: true })
    .then(result =>
      res.status(200).send(filter(propEq('type', 'product'), result))
    )
    .catch(err => next(new HTTPError(err.status, err.message)))
})

////////////////////////
// Template Endpoints //
////////////////////////

app.post('/templates', (req, res, next) => {
  if (isEmpty(prop('body', req))) {
    return next(
      new HTTPError(400, {
        ok: false,
        message:
          'Missing request body.  Content-Type header should be application/json.'
      })
    )
  }

  const body = compose(
    omit(['_id', '_rev']),
    merge(__, { type: 'template' }),
    prop('body')
  )(req)

  const missingFields = checkRequiredFields(['name', 'type'], body)

  if (not(isEmpty(missingFields))) {
    return next(
      new HTTPError(400, {
        ok: false,
        message: `Missing required fields: ${join(' ', missingFields)}`
      })
    )
  }

  addTemplate(body)
    .then(result => res.status(201).send(result))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.get('/templates/:id', (req, res, next) => {
  getTemplate(path(['params', 'id'], req))
    .then(result => res.status(200).send(result))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.put('/templates/:id', (req, res, next) => {
  const body = prop('body', req)

  if (isEmpty(body)) {
    return next(
      new HTTPError(400, {
        ok: false,
        message:
          'Missing request body.  Content-Type header should be application/json.'
      })
    )
  }

  const missingFields = checkRequiredFields(['name', 'type'], body)

  if (not(isEmpty(missingFields))) {
    return next(
      new HTTPError(400, {
        ok: false,
        message: `Missing required fields: ${join(' ', missingFields)}`
      })
    )
  }

  updateTemplate(body)
    .then(result => res.status(200).send(result))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.delete('/templates/:id', (req, res, next) => {
  deleteTemplate(path(['params', 'id'], req))
    .then(result => res.status(200).send(result))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.get('/templates', (req, res, next) => {
  listDocs({ include_docs: true })
    .then(result =>
      res.status(200).send(filter(propEq('type', 'template'), result))
    )
    .catch(err => next(new HTTPError(err.status, err.message)))
})

/////////////////////
// Build Endpoints //
/////////////////////

app.post('/builds', (req, res, next) => {
  if (isEmpty(prop('body', req))) {
    return next(
      new HTTPError(400, {
        ok: false,
        message:
          'Missing request body.  Content-Type header should be application/json.'
      })
    )
  }

  const body = compose(
    omit(['_id', '_rev']),
    merge(__, { type: 'build' }),
    prop('body')
  )(req)

  const missingFields = checkRequiredFields(['name'], body)

  if (not(isEmpty(missingFields))) {
    return next(
      new HTTPError(400, {
        ok: false,
        message: `Missing required fields: ${join(' ', missingFields)}`
      })
    )
  }

  addBuild(body)
    .then(result => res.status(201).send(result))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.get('/builds/:id', (req, res, next) => {
  getBuild(path(['params', 'id'], req))
    .then(result => res.status(200).send(result))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.put('/builds/:id', (req, res, next) => {
  const body = prop('body', req)

  if (isEmpty(body)) {
    return next(
      new HTTPError(400, {
        ok: false,
        message:
          'Missing request body.  Content-Type header should be application/json.'
      })
    )
  }

  const missingFields = checkRequiredFields(['name'], body)

  if (not(isEmpty(missingFields))) {
    return next(
      new HTTPError(400, {
        ok: false,
        message: `Missing required fields: ${join(' ', missingFields)}`
      })
    )
  }

  updateBuild(body)
    .then(result => res.status(200).send(result))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.delete('/builds/:id', (req, res, next) => {
  deleteBuild(path(['params', 'id'], req))
    .then(result => res.status(200).send(result))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.get('/builds', (req, res, next) => {
  listDocs({ include_docs: true })
    .then(result =>
      res.status(200).send(filter(propEq('type', 'build'), result))
    )
    .catch(err => next(new HTTPError(err.status, err.message)))
})

///////////////////
// Error Handler //
///////////////////

app.use((err, req, res, next) => {
  console.log(req.method, ' ', req.path, ' ', 'error ', err)
  res.status(err.status || 500).send(err)
})

app.listen(port, () => console.log('API running on port:', port))
