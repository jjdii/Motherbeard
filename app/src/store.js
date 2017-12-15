import { createStore, combineReducers, applyMiddleware } from 'redux'
import { builds, currentBuild, newBuild, cart } from './reducers/builds'
import { products, currentProduct } from './reducers/products'

import thunk from 'redux-thunk'

const store = createStore(
  combineReducers({
    builds,
    currentBuild,
    newBuild,
    products,
    currentProduct,
    cart
  }),
  applyMiddleware(thunk)
)

store.subscribe(() => {
  console.log('store.getState()', store.getState())
})

export default store
