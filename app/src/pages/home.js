import React from 'react'
import { connect } from 'react-redux'

class Home extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <h2>{'Welcome to Motherbeard.com'}</h2>
      </div>
    )
  }
}

const connector = connect(state => state)
export default connector(Home)
