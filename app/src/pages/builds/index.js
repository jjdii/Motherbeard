import React from 'react'
import { connect } from 'react-redux'
import { setBuilds } from '../../action-creators/builds'
import { setProducts } from '../../action-creators/products'
import { prop, map } from 'ramda'

const listBuildProducts = product => <li key={product}>{product}</li>

const listBuild = build => (
  <li key={prop('_id', build)}>
    <h3>{prop('name', build)}</h3>
    <ul>{map(listBuildProducts, build.products)}</ul>
  </li>
)

class Builds extends React.Component {
  componentDidMount() {
    this.props.onMount()
  }
  render() {
    return (
      <div>
        <h2>{'All Builds'}</h2>
        <ul>{map(listBuild, this.props.builds)}</ul>
      </div>
    )
  }
}

const connector = connect(
  state => state,
  dispatch => {
    return {
      onMount: () => {
        dispatch(setBuilds)
        dispatch(setProducts)
      }
    }
  }
)
export default connector(Builds)
