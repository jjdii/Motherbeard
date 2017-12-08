const { assoc, prop, toLower } = require('ramda')
const pkGenerator = require('./lib/pk-generator')
const { add, get, upd, del, all } = require('./lib/dal-couchdb')

//////////////
// Products //
//////////////

const addProduct = doc =>
  add(
    assoc(
      '_id',
      pkGenerator('product_', prop('manufacturer-name', doc), '_') +
        '_' +
        toLower(prop('sku', doc)),
      doc
    )
  )
const getProduct = id => get(id)
const updateProduct = doc => upd(doc)
const deleteProduct = id => del(id)

///////////////
// Templates //
///////////////

const addTemplate = doc =>
  add(assoc('_id', pkGenerator('template_', prop('name', doc), '_'), doc))
const getTemplate = id => get(id)
const updateTemplate = doc => upd(doc)
const deleteTemplate = id => del(id)

////////////
// Builds //
////////////

const addBuild = doc =>
  add(assoc('_id', pkGenerator('build_', prop('name', doc), '_'), doc))
const getBuild = id => get(id)
const updateBuild = doc => upd(doc)
const deleteBuild = id => del(id)

/////////////////////
// Mango Functions //
/////////////////////

const listDocs = opts => all(opts)

module.exports = {
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
}
