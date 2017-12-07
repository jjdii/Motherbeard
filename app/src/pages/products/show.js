import React from 'react'
import { connect } from 'react-redux'
import { mapObjIndexed, find, propEq } from 'ramda'

const listBuildProduct = product => <li key={product._id}>{product.name}</li>

class ShowBuild extends React.Component {
  componentDidMount() {}
  render() {
    const buildObj = find(propEq('_id', this.props.match.params.id))(
      this.props.builds
    )
    return (
      <div>
        <h2>{'Build:'}</h2>
        <h3>{this.props.match.params.id}</h3>
        {JSON.stringify(buildObj)}
      </div>
    )
  }
}

const connector = connect(state => state)
export default connector(ShowBuild)
