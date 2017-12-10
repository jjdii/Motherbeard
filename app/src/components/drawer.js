import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import HomeIcon from 'material-ui/svg-icons/action/home'
import BuildsIcon from 'material-ui/svg-icons/action/build'
import CreateBuildIcon from 'material-ui/svg-icons/content/create'
import SearchIcon from 'material-ui/svg-icons/action/search'
import CartIcon from 'material-ui/svg-icons/action/shopping-cart'
import RaisedButton from 'material-ui/RaisedButton'
import history from '../history'
import { Link } from 'react-router-dom'

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
            id="menu-button"
            className="no-select"
            src={this.props.buttonImg}
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
          />
          <MenuItem
            onClick={() => {
              this.handleClose()
              history.push('/')
            }}
            leftIcon={<HomeIcon />}
            style={{
              background: '#ececec',
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
              background: '#ececec',
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
              background: '#ececec',
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
              background: '#ececec',
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
              background: '#ececec',
              borderBottom: '1px solid #d1d1d1'
            }}
          >
            Cart&nbsp;
            <span
              style={{
                position: 'relative',
                top: '-1px',
                fontSize: '80%',
                lineHeight: 'inherit'
              }}
            >
              (0)
            </span>
          </MenuItem>
        </Drawer>
      </div>
    )
  }
}
