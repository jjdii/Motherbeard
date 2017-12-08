import React from 'react'
import { connect } from 'react-redux'
import { find, propEq } from 'ramda'

class ShowBuild extends React.Component {
  componentDidMount() {}
  render() {
    const buildObj = find(propEq('_id', this.props.match.params.id))(
      this.props.builds
    )
    return (
      <div>
        <h1>{'Build:'}</h1>
        {JSON.stringify(buildObj)}
      </div>
    )
  }
}

const connector = connect(state => state)
export default connector(ShowBuild)
