import React from 'react'
import { connect } from 'react-redux'
import MenuAppBar from '../components/app-bar'

class Home extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <MenuAppBar title="Motherbeard" />
      </div>
    )
  }
}

const connector = connect(state => state)
export default connector(Home)
