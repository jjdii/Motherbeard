import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/footer'
import BannerImg from '../images/motherboard-bg.png'
import '../styles/home.css'

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
              Browse Now
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    )
  }
}

const connector = connect(state => state)
export default connector(Home)
