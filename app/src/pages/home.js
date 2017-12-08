import React from 'react'
import { connect } from 'react-redux'
import Header from '../components/header'
import '../styles/home.css'

class Home extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <Header title="Motherbeard" />
      </div>
    )
  }
}

const connector = connect(state => state)
export default connector(Home)
