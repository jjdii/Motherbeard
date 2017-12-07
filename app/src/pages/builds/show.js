import React from 'react'
import { connect } from 'react-redux'

class ShowBuild extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <h2>{'Build: ' + this.props.match.params.id}</h2>
      </div>
    )
  }
}

const connector = connect(state => state)
export default connector(ShowBuild)
