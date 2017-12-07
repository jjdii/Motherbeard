import React from 'react'
import { Switch, Router, Route } from 'react-router-dom'
import Home from './pages/home'
import Builds from './pages/builds/index'
import ShowBuild from './pages/builds/show'
import Products from './pages/products/index'
import ShowProduct from './pages/products/show'
import history from './history'
import './App.css'

const App = props => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/builds/:id" component={ShowBuild} />
          <Route path="/builds" component={Builds} />
          <Route path="/products/:id" component={ShowProduct} />
          <Route path="/products" component={Products} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
