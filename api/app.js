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
  listDocs,
  getDefaultProducts
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
  toLower,
  map,
  isNil,
  head,
  find,
  assoc,
  difference
} = require('ramda')
const port = process.env.PORT || 5000
const neweggUrl = process.env.NEWEGG_URL
const numeral = require('numeral')

////////////////
// Middleware //
////////////////

app.use(cors({ credentials: true }))
app.use(bodyParser.json())

app.get('/', (req, res, next) => res.send('Welcome to the Motherbeard API'))

//////////////////////
// Newegg Endpoints //
//////////////////////

app.get('/newegg/products', async (req, res, next) => {
  const keywords = propOr('', 'keywords', req.query)
  const upc = propOr('', 'upc', req.query)
  const recordsPerPage = propOr('1000', 'count', req.query)
  const lowPrice = propOr('5', 'low', req.query)
  const highPrice = propOr('1000', 'high', req.query)
  const toDB = propOr('', 'db', req.query)
  let url = ''

  if (isEmpty(upc)) {
    url = `${neweggUrl}&keywords=${encodeURIComponent(
      keywords
    )}&currency=USD&sort-by=sale-price&records-per-page=${recordsPerPage}&low-sale-price=${lowPrice}&high-sale-price=${highPrice}`
  } else {
    url = `${neweggUrl}&upc=${upc}&currency=USD&sort-by=sale-price&records-per-page=${recordsPerPage}`
  }

  fetchNewegg(url)
    .then(result => {
      if (not(isEmpty(toDB))) {
        const productObj = compose(
          omit(['_id', '_rev']),
          merge(__, { type: 'product' }),
          head,
          prop('products')
        )(JSON.parse(result))

        addProduct(productObj)
          .then(result =>
            console.log('build product added', prop('id', result))
          )
          .catch(err => console.log('err: adding build product', err))
      }
      res.status(200).send(result)
    })
    .catch(err => res.status(500).send('Error fetching Newegg API: ' + err))
})

app.post('/newegg/builds', async (req, res, next) => {
  const recordsPerPage = 1000
  const url = `${neweggUrl}&currency=USD&sort-by=sale-price`

  const promiseArr = compose(
    reduce((acc, val) => {
      const name = propOr('', 'name', val)
      const keywords = propOr('', 'keywords', val)
      const lowPrice = propOr('5', 'low', val)
      const highPrice = propOr('10000', 'high', val)

      let keywordStr = ''
      if (not(isEmpty(name)) && not(isEmpty(keywords))) {
        keywordStr = `+${name} +${keywords}`
      }

      if (isEmpty(keywords)) {
        return acc
      } else {
        return acc.concat(
          fetchNewegg(
            `${url}&keywords=${encodeURIComponent(
              keywordStr
            )}&low-sale-price=${lowPrice}&high-sale-price=${highPrice}`
          )
        )
      }
    }, []),
    path(['body', 'build'])
  )(req)

  Promise.all(promiseArr)
    .then(result => {
      let buildArr = []
      let productFound = 0
      let pageNumber = 1
      let i = 0
      result.forEach(products => {
        const parsedProducts = JSON.parse(products)
        const totalRecords = path(['results', 'total-matched'], parsedProducts)
        console.log('request ' + i + ':', totalRecords)
        let productsArr = prop('products', parsedProducts)
        const searchFor = split(
          ' ',
          concat(
            pathOr('', ['body', 'build', i, 'name'], req) + ' ',
            pathOr('', ['body', 'build', i, 'keywords'], req)
          )
        )

        productFound = 0
        //pageNumber = 1

        // while (
        //   productFound === 0 &&
        //   (pageNumber * recordsPerPage <= totalRecords || pageNumber < 10)
        // ) {
        //   if (pageNumber > 1) {
        //     if (pageNumber <= 10) {
        //       productsArr = fetchNewegg(
        //         `${url}&keywords=${pathOr(
        //           '',
        //           ['body', 'build', i, 'name'],
        //           req
        //         )}&low-sale-price=${pathOr(
        //           '',
        //           ['body', 'build', i, 'low'],
        //           req
        //         )}&high-sale-price=${pathOr(
        //           '',
        //           ['body', 'build', i, 'high'],
        //           req
        //         )}&page-number=${pageNumber}`
        //       )
        //         .then(nextPage => prop('products', JSON.parse(nextPage)))
        //         .catch(err => console.log(err))
        //
        //       map(product => {
        //         const category = toLower(
        //           propOr('', 'advertiser-category', product)
        //         )
        //         //console.log(category)
        //         const searchHits = reduce(
        //           (acc, val) =>
        //             category.search(toLower(val)) === -1 ? acc : acc + 1,
        //           0,
        //           searchFor
        //         )
        //
        //         if (searchHits >= searchFor.length - 1) {
        //           productFound += searchHits
        //
        //           let val = pkGenerator(
        //             'product_',
        //             trim(product['manufacturer-name']) +
        //               '_' +
        //               trim(product['sku']),
        //             '_'
        //           )
        //           console.log(i + '_' + val)
        //           return buildArr.push(i + '_' + val)
        //         }
        //       }, productsArr)
        //     }
        //   } else {

        productsArr.some(product => {
          const category = toLower(product['advertiser-category'])
          const searchName = toLower(product['name'])
          const searchHits = reduce(
            (acc, val) =>
              category.search(toLower(val)) === -1 &&
              searchName.search(toLower(val)) === -1
                ? acc
                : acc + 1,
            0,
            searchFor
          )
          console.log('searchHits', searchHits)

          if (searchHits >= searchFor.length - 1) {
            productFound += searchHits

            let productObj = compose(
              omit(['_id', '_rev']),
              merge(__, {
                type: 'product',
                category: path(['body', 'build', i, 'name'], req)
              })
            )(product)

            addProduct(productObj)
              .then(result =>
                console.log('build product added', prop('id', result))
              )
              .catch(err => console.log('err: adding build product', err))

            let _id = pkGenerator(
              'product_',
              trim(product['manufacturer-name']) + '_' + trim(product['sku']),
              '_'
            )
            return buildArr.push({
              _id,
              type: pathOr(
                null,
                ['body', 'build', buildArr.length || 0, 'name'],
                req
              ),
              price: numeral(product['sale-price']).format('0,0.00')
            })
          }
        })

        //   }
        //
        //   pageNumber++
        // }

        if (productFound === 0) {
          buildArr.push({
            _id: null,
            type: pathOr(null, ['body', 'build', buildArr.length, 'name'], req),
            price: null
          })
        }

        i++
      })

      const requiredTypes = [
        'motherboard',
        'processor',
        'memory',
        'storage',
        'case',
        'power supply'
      ]
      const missingTypes = compose(
        difference(requiredTypes),
        map(prop('type'))
      )(buildArr)

      missingTypes.forEach(type => {
        buildArr.push({
          _id: null,
          type,
          price: null
        })
      })

      const nullCount = reduce(
        (a, v) => (isNil(prop('_id', v)) ? a + 1 : a),
        0,
        buildArr
      )

      if (nullCount > 0) {
        getDefaultProducts()
          .then(result => {
            const defaultProducts = prop('products', result)
            // console.log('buildArr', buildArr)
            // console.log('defaultProducts', defaultProducts)
            let promArr = []
            buildArr.forEach(p => {
              if (isNil(prop('_id', p))) {
                console.log('type', prop('type', p))
                let productUPC = compose(
                  prop('upc'),
                  v => find(propEq('type', v), defaultProducts),
                  prop('type')
                )(p)
                console.log('productUPC', productUPC)
                promArr.push(fetchNewegg(`${url}&upc=${productUPC}`))
              }
            })

            Promise.all(promArr)
              .then(resArr => {
                const productsArr = map(
                  v =>
                    compose(
                      p =>
                        assoc(
                          '_id',
                          pkGenerator(
                            'product_',
                            prop('manufacturer-name', p) + '_' + prop('sku', p),
                            '_'
                          ),
                          p
                        ),
                      path(['products', 0])
                    )(JSON.parse(v)),
                  resArr
                )

                i = 0
                productsArr.forEach(prod => {
                  const category = prop(
                    'type',
                    find(
                      x =>
                        toLower(prop('_id', x)) == toLower(prop('_id', prod)),
                      defaultProducts
                    )
                  )
                  console.log('category', category)
                  const defaultProductObj = compose(
                    merge(__, {
                      type: 'product',
                      category
                    })
                  )(prod)

                  updateProduct(defaultProductObj)
                    .then(result =>
                      console.log('default product updated', prop('id', result))
                    )
                    .catch(err =>
                      console.log('err: updating default product', err)
                    )
                })

                i = 0
                const newBuildArr = map(
                  v =>
                    isNil(prop('_id', v))
                      ? {
                          _id: productsArr[i]['_id'],
                          type: v['type'],
                          price: numeral(productsArr[i++]['sale-price']).format(
                            '0,0.00'
                          )
                        }
                      : v,
                  buildArr
                )
                // console.log('buildArr', buildArr)
                // console.log('newBuildArr', newBuildArr)

                let buildObj = {
                  ok: true,
                  name: pathOr('', ['body', 'name'], req),
                  templateId: pkGenerator(
                    'template_',
                    path(['body', 'name'], req),
                    '_'
                  ),
                  products: newBuildArr,
                  type: 'build',
                  price: numeral(
                    reduce(
                      (a, v) =>
                        !isNil(prop('price', v))
                          ? a + parseFloat(prop('price', v))
                          : a,
                      0.0,
                      newBuildArr
                    )
                  )
                    .format('0,0.00')
                    .toString()
                }

                addBuild(buildObj)
                  .then(result =>
                    console.log('build added', prop('id', result))
                  )
                  .catch(err => console.log('err: adding build', err))

                let templateObj = compose(
                  omit(['_id', '_rev']),
                  merge(__, { type: 'template' }),
                  prop('body')
                )(req)

                addTemplate(templateObj)
                  .then(result =>
                    console.log('template added', prop('id', result))
                  )
                  .catch(err => console.log('err: adding template', err))

                res.status(200).send(buildObj)
              })
              .catch(err =>
                console.log('err: getting default product prices', err)
              )
          })
          .catch(err => console.log('err: getting default products', err))
      } else {
        let buildObj = {
          ok: true,
          name: pathOr('', ['body', 'name'], req),
          templateId: pkGenerator(
            'template_',
            path(['body', 'name'], req),
            '_'
          ),
          products: buildArr,
          type: 'build',
          price: numeral(
            reduce(
              (a, v) =>
                !isNil(prop('price', v)) ? a + parseFloat(prop('price', v)) : a,
              0.0,
              buildArr
            )
          )
            .format('0,0.00')
            .toString()
        }

        addBuild(buildObj)
          .then(result => {
            console.log('build added', prop('id', result))
            return JSON.stringify(result)
          })
          .catch(err => console.log('err: adding build', err))

        let templateObj = compose(
          omit(['_id', '_rev']),
          merge(__, { type: 'template' }),
          prop('body')
        )(req)

        addTemplate(templateObj)
          .then(result => console.log('template added', prop('id', result)))
          .catch(err => console.log('err: adding template', err))

        res.status(200).send(buildObj)
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Error fetching Newegg API: ' + err)
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
