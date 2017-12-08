import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { prop, map, find, propEq } from 'ramda'

const listProduct = product => (
  <li key={prop('_id', product)}>
    <Link to={`/products/${prop('_id', product)}`}>
      <h3>{prop('name', product)}</h3>
    </Link>
  </li>
)

class Products extends React.Component {
  componentDidMount() {
    this.props.onMount()
  }

  render() {
    return (
      <div>
        <h1>{'All Products'}</h1>
        <ul>{map(listProduct, this.props.products)}</ul>
      </div>
    )
  }
}

const connector = connect(
  state => state,
  dispatch => {
    return {
      onMount: () => {}
    }
  }
)
export default connector(Products)
