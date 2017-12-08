import React from 'react'
import { Link } from 'react-router-dom'
import LogoImg from '../images/logo-tiny.png'

const Footer = props => {
  return (
    <footer>
      <div id="footer" className="outer-content">
        <div className="inner-content">
          <span id="mobile-footer">
            <div id="footer-desc" className="fleft">
              <img id="mb-foot-title" src={LogoImg} draggable="false" />
              <p className="footer-text" style={{ marginTop: 6 }}>
                <i
                  className="payments fa fa-envelope-square"
                  style={{ fontSize: 16 }}
                />
                &nbsp; support@motherbeard.com
              </p>
            </div>
            <div id="footer-quick-links" className="fleft">
              <h3 className="footer-title">Quick Links</h3>
              <Link
                to="/"
                className="ease-in footer-text"
                style={{ marginTop: 0, marginLeft: 0 }}
              >
                Home
              </Link>
              <Link to="/products/" className="ease-in footer-text">
                Products
              </Link>
              <Link to="/cart/" className="ease-in footer-text">
                Cart
              </Link>
              <Link
                to="/search/"
                id="foot-search"
                className="ease-in footer-text"
              >
                Search
              </Link>
            </div>
            <div id="footer-support" className="fleft">
              <h3 className="footer-title">Support</h3>
              <Link
                to="/support/"
                className="ease-in footer-text"
                style={{ marginTop: 0, marginLeft: 0 }}
              >
                Contact
              </Link>
              <Link to="/support/#Guides" className="ease-in footer-text">
                Guides
              </Link>
              <Link to="/support/#FAQ" className="ease-in footer-text">
                FAQ
              </Link>
            </div>
          </span>
          <a id="return" className="fright ease-in no-select">
            <i
              className="fa fa-arrow-up ease-in no-select"
              style={{ fontSize: '18px', lineHeight: '30px' }}
            />
          </a>
        </div>
      </div>

      <div id="post-footer" className="outer-content">
        <div className="inner-content">
          <p id="copyright-text" style={{ margin: 0 }}>
            &copy; 2017 Motherbeard LLC. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
