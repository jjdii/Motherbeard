import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { map } from 'ramda'
import Header from '../components/header'
import Footer from '../components/footer'
import { listBuild } from '../components/list-build'
import BannerImg from '../images/motherboard-bg.png'

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
              to="/builds/new"
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
