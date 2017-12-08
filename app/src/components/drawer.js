import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
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
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <MenuItem
            onClick={() => {
              this.handleClose()
              history.push('/')
            }}
          >
            Home
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleClose()
              history.push('/builds')
            }}
          >
            Builds
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleClose()
              history.push('/templates/new')
            }}
          >
            Create Build
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleClose()
              history.push('/search')
            }}
          >
            Search
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleClose()
              history.push('/cart')
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
