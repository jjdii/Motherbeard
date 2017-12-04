const { compose, difference, keys } = require('ramda')

module.exports = (reqKeys, reqBody) =>
  compose(difference(reqKeys), keys)(reqBody)
