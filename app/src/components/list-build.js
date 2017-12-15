import React from 'react'
import { Link } from 'react-router-dom'
import {
  prop,
  propOr,
  map,
  find,
  propEq,
  contains,
  slice,
  compose,
  filter,
  reduce
} from 'ramda'
import PlaceholderImg from '../images/placeholder.jpeg'
const numeral = require('numeral')

export const listBuildProducts = products => productId => {
  const productObj = find(propEq('_id', prop('_id', productId)))(products)
  if (
    contains(prop('type', productId), [
      'processor',
      'memory',
      'storage',
      'video card'
    ])
  ) {
    return (
      <div key={prop('type', productId)}>
        <i
          className="fa fa-caret-right"
          style={{
            fontSize: '10px',
            position: 'absolute',
            marginTop: '4px'
          }}
        />
        <p className="product-list-item">
          {compose(
            str => (str.length > 54 ? slice(0, 54, str) + '...' : str),
            propOr('', 'name')
          )(productObj)}
        </p>
      </div>
    )
  }
}

export const listBuild = products => build => {
  const caseId = compose(
    prop('_id'),
    find(propEq('type', 'case')),
    prop('products')
  )(build)
  //console.log('caseId', caseId)
  const caseImgUrl = compose(
    reduce((a, v) => prop('image-url', v), ''),
    filter(propEq('_id', caseId))
  )(products)
  //console.log('caseImgUrl', caseImgUrl)

  return (
    <div
      key={prop('_id', build)}
      className="product-item"
      style={{ marginLeft: 0 }}
    >
      <Link to={`/builds/${prop('_id', build)}`}>
        <img
          className="product-img"
          src={caseImgUrl || PlaceholderImg}
          alt={prop('name', build)}
          draggable="false"
        />
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
  )
}
