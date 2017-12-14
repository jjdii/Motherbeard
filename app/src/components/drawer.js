import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import HomeIcon from 'material-ui/svg-icons/action/home'
import BuildsIcon from 'material-ui/svg-icons/action/build'
import CreateBuildIcon from 'material-ui/svg-icons/content/create'
import SearchIcon from 'material-ui/svg-icons/action/search'
import CartIcon from 'material-ui/svg-icons/action/shopping-cart'
import NavOpenImg from '../images/nav-button.png'
import NavCloseImg from '../images/nav-close.png'
import history from '../history'

export default class DrawerButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  handleToggle = () => this.setState({ open: !this.state.open })

  handleClose = () => this.setState({ open: false })

  render() {
    return (
      <div>
        <a
          onClick={this.handleToggle}
          className="fleft ease-in no-select"
          style={{ marginLeft: -24 }}
        >
          <img
            className="menu-button no-select"
            src={NavOpenImg}
            alt="open menu"
            draggable="false"
          />
          &nbsp;Menu
        </a>
        <Drawer
          docked={false}
          width={240}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
          containerStyle={{ background: '#ffffff' }}
        >
          <div
            style={{
              width: '100%',
              height: '105px',
              borderBottom: '1px solid #d1d1d1',
              background: '#ffffff'
            }}
          >
            <div className="inner-content">
              <div style={{ height: '60px' }}>
                <img
                  id="text-logo"
                  className="fleft no-select"
                  src={this.props.logo}
                  alt="motherbeard logo"
                  draggable="false"
                />
              </div>
              <a
                onClick={this.handleToggle}
                className="fleft ease-in no-select"
                style={{ marginLeft: -24 }}
              >
                <img
                  className="menu-button no-select"
                  src={NavCloseImg}
                  alt="close menu"
                  draggable="false"
                />
                &nbsp;Close
              </a>
            </div>
          </div>
          <div style={{ background: '#f3f3f3' }}>
            <MenuItem
              onClick={() => {
                this.handleClose()
                history.push('/')
              }}
              leftIcon={<HomeIcon />}
              style={{
                borderBottom: '1px solid #d1d1d1'
              }}
            >
              Home
            </MenuItem>
            <MenuItem
              onClick={() => {
                this.handleClose()
                history.push('/builds')
              }}
              leftIcon={<BuildsIcon />}
              style={{
                borderBottom: '1px solid #d1d1d1'
              }}
            >
              Builds
            </MenuItem>
            <MenuItem
              onClick={() => {
                this.handleClose()
                history.push('/templates/new')
              }}
              leftIcon={<CreateBuildIcon />}
              style={{
                borderBottom: '1px solid #d1d1d1'
              }}
            >
              Create Build
            </MenuItem>
            <MenuItem
              onClick={() => {
                this.handleClose()
                history.push('/search')
              }}
              leftIcon={<SearchIcon />}
              style={{
                borderBottom: '1px solid #d1d1d1'
              }}
            >
              Search
            </MenuItem>
            <MenuItem
              onClick={() => {
                this.handleClose()
                history.push('/cart')
              }}
              leftIcon={<CartIcon />}
              style={{
                borderBottom: '1px solid #d1d1d1'
              }}
            >
              Cart&nbsp;
              <span
                style={{
                  position: 'relative',
                  top: '-2px',
                  fontSize: '80%',
                  lineHeight: 'inherit'
                }}
              >
                (0)
              </span>
            </MenuItem>
          </div>
        </Drawer>
      </div>
    )
  }
}
