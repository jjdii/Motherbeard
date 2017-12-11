import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { prop, map, find, propEq } from 'ramda'
import Header from '../components/header'
import Footer from '../components/footer'
import BannerImg from '../images/motherboard-bg.png'
import PlaceholderImg from '../images/placeholder.jpeg'
const numeral = require('numeral')

const listBuildProducts = products => productId => {
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

const listBuild = products => build => {
  return (
    <div>
      <div className="product-item" style={{ marginLeft: 0 }}>
        <Link to={`/builds/${prop('_id', build)}`}>
          <img className="product-img" src={PlaceholderImg} draggable="false" />
        </Link>
        <p className="product-price">
          $<b>{Math.floor(prop('price', build))}</b>
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

class Home extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <Header title="Home" />

        <div
          id="banner"
          className="outer-content ease-in"
          style={{ backgroundImage: `url(${BannerImg})` }}
        >
          <div className="inner-content" style={{ textAlign: 'center' }}>
            <h1 id="banner-title">Save money building your new computer</h1>
            <Link
              to="/builds"
              id="shop-button"
              className="ease-in orange-button"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div id="featured-products" className="outer-content">
          <div id="featured-products-inner" className="inner-content">
            <h2>Latest Builds</h2>
            {map(listBuild(this.props.products), this.props.builds)}
          </div>
        </div>

        <Footer />
      </div>
    )
  }
}

const connector = connect(state => state)
export default connector(Home)
