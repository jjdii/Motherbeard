import React from 'react'
import { Link } from 'react-router-dom'
import { prop, map, find, propEq } from 'ramda'
import PlaceholderImg from '../images/placeholder.jpeg'
const numeral = require('numeral')

export const listBuildProducts = products => productId => {
  const productObj = find(propEq('_id', productId))(products)
  return (
    <div>
      <i
        className="fa fa-caret-right"
        style={{
          fontSize: '10px',
          position: 'absolute',
          marginTop: '4px'
        }}
      />
      <p className="product-list-item">{prop('name', productObj)}</p>
    </div>
  )
}

export const listBuild = products => build => {
  return (
    <div>
      <div className="product-item" style={{ marginLeft: 0 }}>
        <Link to={`/builds/${prop('_id', build)}`}>
          <img className="product-img" src={PlaceholderImg} draggable="false" />
        </Link>
        <p className="product-price">
          $<b>{Math.floor(Number(prop('price', build)))}</b>
          <span className="decimal">
            {numeral(prop('price', build)).format('.00')}
          </span>
        </p>
        <Link
          to={`/builds/${prop('_id', build)}`}
          className="product-link ease-in"
        >
          {prop('name', build)}
        </Link>
        <div className="clear" />
        <div className="full-content pli-wrap">
          {map(listBuildProducts(products), build.products)}
        </div>
        <div className="full-content vpd-wrap" align="center">
          <Link
            to={`/builds/${prop('_id', build)}`}
            className="grey-button ease-in"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
