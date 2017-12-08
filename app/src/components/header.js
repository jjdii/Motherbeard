import React from 'react'
import { Link } from 'react-router-dom'
import LogoImg from '../images/logo-small.png'
import NavImg from '../images/nav-button.png'
import CartImg from '../images/cart.png'

const Header = props => {
  return (
    <div id="header" className="outer-content">
      <div className="inner-content">
        <div id="logo" className="full-content">
          <Link to="/">
            <img
              id="text-logo"
              className="fleft no-select"
              src={LogoImg}
              draggable="false"
            />
          </Link>
        </div>

        <div id="nav-left-mobile" className="fleft">
          <a className="fleft ease-in no-select" style={{ marginLeft: -24 }}>
            <img
              id="menu-button"
              className="no-select"
              src={NavImg}
              draggable="false"
            />
            &nbsp;Menu
          </a>
        </div>
        <div id="nav-left" className="fleft">
          <Link
            to="/"
            className="fleft ease-in no-select"
            style={{ marginLeft: -24 }}
          >
            Home
          </Link>
          <Link to="/products/" className="fleft ease-in no-select">
            Products
          </Link>
          <Link to="/support/" className="fleft ease-in no-select">
            Support
          </Link>
        </div>
        <div id="nav-right" className="fright">
          <Link
            id="cart"
            to="/cart/"
            className="fright ease-in no-select"
            style={{ paddingRight: 0 }}
          >
            Cart&nbsp;
            <img className="no-select" src={CartImg} draggable="false" />
            &nbsp;<span id="cart-num">(0)</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
