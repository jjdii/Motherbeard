require('dotenv').config()
const request = require('request-promise')
const parseString = require('xml2js').parseString
const { map, mapObjIndexed } = require('ramda')
const auth = process.env.AUTH || 0

module.exports = url => {
  return new Promise((resolve, reject) => {
    const options = {
      uri: url,
      method: 'GET',
      headers: {
        Authorization: auth
      }
    }

    request(options)
      .then(function(response) {
        parseString(response, function(err, result) {
          if (err) reject(err)

          const reassembledResult = map(
            product => mapObjIndexed((val, key, obj) => val[0], product),
            result['cj-api']['products'][0]['product']
          )

          resolve(JSON.stringify(reassembledResult))
        })
      })
      .catch(function(err) {
        reject(err)
      })
  })
}
