import React from 'react'
import { map } from 'ramda'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import Toggle from 'material-ui/Toggle'
import processorIcon from '../images/cpu_icon_small.png'
import coolerIcon from '../images/cooler_icon_small.png'
import motherboardIcon from '../images/motherboard_icon_invert_small.png'
import memoryIcon from '../images/memory_icon_invert_small.png'
import storageIcon from '../images/storage_icon_small.png'
import videoCardIcon from '../images/gpu_icon_small.png'
import caseIcon from '../images/case_icon_small.png'
import powerSupplyIcon from '../images/power_supply_icon_small.png'
import networkIcon from '../images/network_icon_small.png'
import opticalDriveIcon from '../images/optical_icon_small.png'

const keywordStyle = {
  width: 145,
  display: 'inline-block',
  float: 'left',
  marginLeft: '16px',
  marginRight: '10px'
}
const selectStyle = {
  width: 100,
  display: 'inline-block',
  float: 'left',
  marginRight: 10
}
const biggerSelectStyle = {
  width: 122.5,
  display: 'inline-block',
  float: 'left',
  marginRight: 10
}
const biggestSelectStyle = {
  width: 145,
  display: 'inline-block',
  float: 'left',
  marginRight: 10
}
const iconStyle = {
  height: '43px',
  width: 'auto',
  marginTop: '21px',
  opacity: '0.5',
  display: 'inline-block',
  float: 'left'
}
const halfIconStyle = {
  height: '22px',
  width: 'auto',
  marginTop: '21px',
  opacity: '0.5',
  display: 'inline-block',
  float: 'left'
}

class NewBuildForm extends React.Component {
  render() {
    return (
      <form
        onSubmit={e => {
          this.props.onSubmit(this.props.newBuild)
          e.preventDefault()
        }}
        style={{ paddingBottom: '53px' }}
      >
        <div className="outer-content">
          <div className="inner-content">
            <h3>
              Choose a name<span
                style={{ color: '#ec8007', fontSize: '80%', marginLeft: '2px' }}
              >
                *
              </span>
            </h3>
            <section className="build-row">
              <TextField
                value={this.props.newBuild.name}
                onChange={(e, l, c) => {
                  this.props.onChange('name', e.target.value)
                }}
                style={{
                  width: '100%'
                }}
                required={true}
              />
            </section>
          </div>
        </div>

        <div className="outer-content build-form-desc-banner">
          <div className="inner-content">
            <h4>Essential Components</h4>
            <p className="build-desc">
              Fill in as many options as you desire. Leave all of a components
              fields blank to use default settings.
            </p>
          </div>
        </div>

        <div className="outer-content">
          <div className="inner-content">
            <h3>Processor</h3>
            <section className="build-row">
              <img
                src={processorIcon}
                style={iconStyle}
                className="no-select"
                draggable="false"
              />
              <TextField
                floatingLabelText="Keywords"
                floatingLabelFixed={true}
                value={this.props.newBuild.processorKeywords}
                onChange={(e, l, c) => {
                  this.props.onChange('processorKeywords', e.target.value)
                }}
                style={keywordStyle}
              />
            </section>

            <h3>Motherboard</h3>
            <section className="build-row">
              <img
                src={motherboardIcon}
                style={iconStyle}
                className="no-select"
                draggable="false"
              />
              <TextField
                floatingLabelText="Keywords"
                floatingLabelFixed={true}
                value={this.props.newBuild.motherboardKeywords}
                onChange={(e, l, c) => {
                  this.props.onChange('motherboardKeywords', e.target.value)
                }}
                style={keywordStyle}
              />
            </section>

            <h3>Memory</h3>
            <section className="build-row">
              <img
                src={memoryIcon}
                style={iconStyle}
                className="no-select"
                draggable="false"
              />
              <TextField
                floatingLabelText="Keywords"
                floatingLabelFixed={true}
                value={this.props.newBuild.memoryKeywords}
                onChange={(e, l, c) => {
                  this.props.onChange('memoryKeywords', e.target.value)
                }}
                style={keywordStyle}
              />
            </section>

            <h3>Storage</h3>
            <section className="build-row">
              <img
                src={storageIcon}
                style={iconStyle}
                className="no-select"
                draggable="false"
              />
              <TextField
                floatingLabelText="Keywords"
                floatingLabelFixed={true}
                value={this.props.newBuild.storageKeywords}
                onChange={(e, l, c) => {
                  this.props.onChange('storageKeywords', e.target.value)
                }}
                style={keywordStyle}
              />
            </section>

            <h3>Case</h3>
            <section className="build-row">
              <img
                src={caseIcon}
                style={iconStyle}
                className="no-select"
                draggable="false"
              />
              <TextField
                floatingLabelText="Keywords"
                floatingLabelFixed={true}
                value={this.props.newBuild.caseKeywords}
                onChange={(e, l, c) => {
                  this.props.onChange('caseKeywords', e.target.value)
                }}
                style={keywordStyle}
              />
            </section>

            <h3>Power Supply</h3>
            <section className="build-row">
              <img
                src={powerSupplyIcon}
                style={iconStyle}
                className="no-select"
                draggable="false"
              />
              <TextField
                floatingLabelText="Keywords"
                floatingLabelFixed={true}
                value={this.props.newBuild.powerSupplyKeywords}
                onChange={(e, l, c) => {
                  this.props.onChange('powerSupplyKeywords', e.target.value)
                }}
                style={keywordStyle}
              />
            </section>
          </div>
        </div>

        <div className="outer-content build-form-desc-banner">
          <div className="inner-content">
            <h4>Optional Components</h4>
            <p className="build-desc">
              Toggle the component to include it in your build. Leave all of a
              components fields blank to use default settings.
            </p>
          </div>
        </div>

        <div className="outer-content">
          <div className="inner-content">
            <div style={{ width: '100%', display: 'table' }}>
              <Toggle
                onToggle={(e, data) => {
                  console.log(data)
                  this.props.onChange('videoCardToggle', data)
                }}
                defaultToggled={true}
                style={{
                  display: 'inline-block',
                  float: 'left',
                  width: 'auto',
                  marginTop: '-2px',
                  marginLeft: '-6px'
                }}
              />
              <h3
                style={{
                  display: 'inline-block',
                  float: 'left',
                  width: 'auto',
                  marginLeft: '10px'
                }}
              >
                Video Card
              </h3>
            </div>
            <section className="build-row">
              <img
                src={videoCardIcon}
                style={iconStyle}
                className="no-select"
                draggable="false"
              />
              <TextField
                floatingLabelText="Keywords"
                floatingLabelFixed={true}
                value={this.props.newBuild.videoCardKeywords}
                onChange={(e, l, c) => {
                  this.props.onChange('videoCardKeywords', e.target.value)
                }}
                style={keywordStyle}
              />
            </section>

            <div style={{ width: '100%', display: 'table' }}>
              <Toggle
                onToggle={(e, data) => {
                  console.log(data)
                  this.props.onChange('networkToggle', data)
                }}
                style={{
                  display: 'inline-block',
                  float: 'left',
                  width: 'auto',
                  marginTop: '-2px',
                  marginLeft: '-6px'
                }}
              />
              <h3
                style={{
                  display: 'inline-block',
                  float: 'left',
                  width: 'auto',
                  marginLeft: '10px'
                }}
              >
                Network
              </h3>
            </div>
            <section className="build-row">
              <img
                src={networkIcon}
                style={halfIconStyle}
                className="no-select"
                draggable="false"
              />
              <p
                className="build-desc"
                style={{
                  display: 'inline-block',
                  float: 'left',
                  width: 'auto',
                  maxWidth: '87%',
                  marginTop: '20px',
                  marginLeft: '10px'
                }}
              >
                TP-Link TL-WDN4800 PCI Express x1 Wireless N Dual Band Adapter
              </p>
            </section>

            <div style={{ width: '100%', display: 'table' }}>
              <Toggle
                onToggle={(e, data) => {
                  console.log(data)
                  this.props.onChange('opticalDriveToggle', data)
                }}
                style={{
                  display: 'inline-block',
                  float: 'left',
                  width: 'auto',
                  marginTop: '-2px',
                  marginLeft: '-6px'
                }}
              />
              <h3
                style={{
                  display: 'inline-block',
                  float: 'left',
                  width: 'auto',
                  marginLeft: '10px'
                }}
              >
                Optical Drive
              </h3>
            </div>
            <section className="build-row">
              <img
                src={opticalDriveIcon}
                style={halfIconStyle}
                className="no-select"
                draggable="false"
              />
              <p
                className="build-desc"
                style={{
                  display: 'inline-block',
                  float: 'left',
                  width: 'auto',
                  maxWidth: '87%',
                  marginTop: '20px',
                  marginLeft: '10px'
                }}
              >
                LITE-ON Black SATA DVD-ROM Drive Model iHDS118-104 8U
              </p>
            </section>

            <button
              type="submit"
              className="orange-button ease-in"
              style={{ cursor: 'pointer' }}
            >
              Generate Build
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default NewBuildForm
