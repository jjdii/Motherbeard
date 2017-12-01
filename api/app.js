require('dotenv').config()

const express = require('express')
const app = express()
const HTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const cors = require('cors')
const request = require('request-promise')

const port = process.env.PORT || 5000
const auth = process.env.AUTH || 0
const neweggUrl = process.env.NEWEGG_URL || ''

////////////////
// Middleware //
////////////////

app.use(cors({ credentials: true }))
app.use(bodyParser.json())

app.get('/', (req, res, next) => res.send('Welcome to the Motherbeard api'))

//////////////////////
// Newegg Endpoints //
//////////////////////

app.get('/newegg/:keywords', async (req, res, next) => {
  const sortBy = 'sale-price'
  const url = `${neweggUrl}&keywords=${req.params
    .keywords}&sort-by=${sortBy}&records-per-page=10`
  const options = {
    uri: url,
    method: 'GET',
    headers: {
      Authorization: auth
    }
  }

  request(options)
    .then(function(response) {
      res.status(200).send(response)
    })
    .catch(function(err) {
      res.status(200).send('Error fetching Newegg API')
    })
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
