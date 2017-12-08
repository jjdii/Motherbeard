import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { prop, map, find, propEq } from 'ramda'
import Header from '../../components/header'

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
        <Header title="All Products" />
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
