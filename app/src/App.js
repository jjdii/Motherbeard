import React from 'react'
import { Switch, Router, Route } from 'react-router-dom'
import Home from './pages/home'
import Builds from './pages/builds/index'
import ShowBuild from './pages/builds/show'
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
        </Switch>
      </div>
    </Router>
  )
}

export default App
