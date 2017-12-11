import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/footer'
import BannerImg from '../images/motherboard-bg.png'
import PlaceholderImg from '../images/placeholder.jpeg'

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
            <div className="product-item" style={{ marginLeft: 0 }}>
              <a href="products/1/">
                <img
                  className="product-img"
                  src={PlaceholderImg}
                  draggable="false"
                />
              </a>
              <p className="product-price">
                $<b>303</b>
                <span className="decimal">.99</span>
              </p>
              <a href="products/1/" className="product-link ease-in">
                Budget Home & Office AMD Desktop Kit
              </a>
              <div className="clear" />
              <div className="full-content pli-wrap">
                <i
                  className="fa fa-caret-right"
                  style={{
                    fontSize: '10px',
                    position: 'absolute',
                    marginTop: '4px'
                  }}
                />
                <p className="product-list-item">
                  AMD A6 3.6GHz Dual-Core Processor
                </p>
                <i
                  className="fa fa-caret-right"
                  style={{
                    fontSize: '10px',
                    position: 'absolute',
                    marginTop: '4px'
                  }}
                />
                <p className="product-list-item">G.Skill 8GB Memory</p>
                <i
                  className="fa fa-caret-right"
                  style={{
                    fontSize: '10px',
                    position: 'absolute',
                    marginTop: '4px'
                  }}
                />
                <p className="product-list-item">Seagate 1TB Hard Drive</p>
                <i
                  className="fa fa-caret-right"
                  style={{
                    fontSize: '10px',
                    position: 'absolute',
                    marginTop: '4px'
                  }}
                />
                <p className="product-list-item">Cooler Master Mini Tower</p>
              </div>
              <div className="full-content vpd-wrap" align="center">
                <a href="products/1/" className="grey-button ease-in">
                  View Details
                </a>
              </div>
            </div>\
          </div>
        </div>

        <Footer />
      </div>
    )
  }
}

const connector = connect(state => state)
export default connector(Home)
