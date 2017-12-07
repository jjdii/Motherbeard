import { createStore, combineReducers, applyMiddleware } from 'redux'
import { builds, currentBuild } from './reducers/builds'
import { products, currentProduct } from './reducers/products'

import thunk from 'redux-thunk'

const store = createStore(
  combineReducers({
    builds,
    currentBuild,
    products,
    currentProduct
  }),
  applyMiddleware(thunk)
)

store.subscribe(() => {
  console.log('store.getState()', store.getState())
})

export default store
