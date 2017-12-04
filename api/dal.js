const { assoc } = require('ramda')
const pkGenerator = require('./lib/pk-generator')
//const uuidv1 = require('uuid/v1')
const { add, get, upd, del, all } = require('./lib/dal-db')

const addProduct = doc =>
  add(
    assoc(
      '_id',
      pkGenerator(doc['manufacturer-name'], '-') + '_' + doc['sku'],
      doc
    )
  )
//const addProduct = doc => add(assoc('_id', uuidv1(), doc))
const getProduct = id => get(id)
const updateProduct = doc => upd(doc)
const deleteProduct = id => del(id)
const listProducts = () => all({ include_docs: true })

module.exports = {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  listProducts
}
