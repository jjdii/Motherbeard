require('dotenv').config()
const express = require('express')
const app = express()
const HTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const cors = require('cors')
// const request = require('request-promise')
// const parseString = require('xml2js').parseString
const fetchNewegg = require('./lib/fetch-newegg')
const { propOr } = require('ramda')
const port = process.env.PORT || 5000
const auth = process.env.AUTH || 0
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
  const highPrice = propOr('100000', 'high', req.query)
  const url = `${neweggUrl}&keywords=${keywords}&currency=USD&sort-by=sale-price&records-per-page=${recordsPerPage}&low-sale-price=${lowPrice}&high-sale-price=${highPrice}`

  console.log('newegg fetch url', url)

  fetchNewegg(url)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send('Error fetching Newegg API'))
})

///////////////////////
// Product Endpoints //
///////////////////////

app.post('/products', (req, res, next) => {})

app.get('/products', (req, res, next) => {})

app.get('/products/:id', (req, res, next) => {})

app.put('/products/:id', (req, res, next) => {})

app.delete('/products/:id', (req, res, next) => {})

///////////////////
// Error Handler //
///////////////////

app.use(function(err, req, res, next) {
  console.log(req.method, ' ', req.path, ' ', 'error ', err)
  res.status(err.status || 500).send(err)
})

app.listen(port, () => console.log('running on port:', port))
