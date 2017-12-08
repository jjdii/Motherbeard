import React from 'react'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import store from './store'
import ReactDOM from 'react-dom'
import { setBuilds } from './action-creators/builds'
import { setProducts } from './action-creators/products'
import './styles/global.css'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()

store.dispatch(setBuilds)
store.dispatch(setProducts)
