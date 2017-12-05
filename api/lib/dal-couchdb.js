require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
PouchDB.plugin(require('pouchdb-find'))
const HTTPError = require('node-http-error')
const { pluck, map, prop } = require('ramda')
const db = new PouchDB(process.env.COUCHDB_URL + process.env.COUCHDB_NAME)

const add = doc => db.put(doc)
const get = id => db.get(id)
const upd = doc => db.put(doc)
const del = id =>
  db
    .get(id)
    .then(doc => db.remove(doc))
    .catch(err => console.log(err))
const all = opts => {
  return db.allDocs(opts).then(docs => pluck('doc', docs.rows))
}
const find = query => (query ? db.find(query).then(res => res.docs) : [])

module.exports = {
  add,
  get,
  upd,
  del,
  all,
  find
}
