import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { prop, map, find, propEq } from 'ramda'
import Header from '../../components/header'

const listBuildProducts = productId => <li key={productId}>{productId}</li>

const listBuild = build => (
  <li key={prop('_id', build)}>
    <Link to={`/builds/${prop('_id', build)}`}>
      <h2>{prop('name', build)}</h2>
    </Link>
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
        <Header title="All Builds" />
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
        // dispatch(setBuilds)
        // dispatch(setProducts)
      }
    }
  }
)
export default connector(Builds)
