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
        style={{ paddingBottom: '50px' }}
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
                  width: '40vw'
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
              <SelectField
                floatingLabelText="Type"
                floatingLabelFixed={true}
                value={this.props.newBuild.processorType}
                onChange={(e, l, c) => {
                  this.props.onChange('processorType', c)
                }}
                style={selectStyle}
              >
                <MenuItem value={1} primaryText="any" />
                <MenuItem value={2} primaryText="Intel" />
                <MenuItem value={3} primaryText="AMD" />
              </SelectField>
              <SelectField
                floatingLabelText="Speed"
                floatingLabelFixed={true}
                value={this.props.newBuild.processorSpeed}
                onChange={(e, l, c) => {
                  this.props.onChange('processorSpeed', c)
                }}
                style={biggestSelectStyle}
              >
                <MenuItem value={1} primaryText="any" />
                <MenuItem value={2} primaryText="under 1.5ghz" />
                <MenuItem value={2} primaryText="1.5ghz to 2ghz" />
                <MenuItem value={3} primaryText="2ghz to 2.5ghz" />
                <MenuItem value={4} primaryText="2.5ghz to 3ghz" />
                <MenuItem value={5} primaryText="3ghz to 3.5ghz" />
                <MenuItem value={6} primaryText="3.5ghz to 4ghz" />
                <MenuItem value={7} primaryText="4ghz to 4.5ghz" />
                <MenuItem value={8} primaryText="4.5ghz to 5ghz" />
                <MenuItem value={9} primaryText="over 5ghz" />
              </SelectField>
              <SelectField
                floatingLabelText="Cores"
                floatingLabelFixed={true}
                value={this.props.newBuild.processorCores}
                onChange={(e, l, c) => {
                  this.props.onChange('processorCores', c)
                }}
                style={selectStyle}
              >
                <MenuItem value={1} primaryText="any" />
                <MenuItem value={2} primaryText="2" />
                <MenuItem value={3} primaryText="4" />
                <MenuItem value={4} primaryText="6" />
                <MenuItem value={5} primaryText="8" />
              </SelectField>
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
              <SelectField
                floatingLabelText="Max Memory"
                floatingLabelFixed={true}
                value={this.props.newBuild.motherboardMemory}
                onChange={(e, l, c) => {
                  this.props.onChange('motherboardMemory', c)
                }}
                style={selectStyle}
              >
                <MenuItem value={1} primaryText="16gb" />
                <MenuItem value={2} primaryText="32gb" />
                <MenuItem value={3} primaryText="64gb" />
              </SelectField>
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
              <SelectField
                floatingLabelText="Size"
                floatingLabelFixed={true}
                value={this.props.newBuild.memorySize}
                onChange={(e, l, c) => {
                  this.props.onChange('memorySize', c)
                }}
                style={selectStyle}
              >
                <MenuItem value={1} primaryText="any" />
                <MenuItem value={2} primaryText="2gb" />
                <MenuItem value={3} primaryText="4gb" />
                <MenuItem value={4} primaryText="6gb" />
                <MenuItem value={5} primaryText="8gb" />
                <MenuItem value={6} primaryText="12gb" />
                <MenuItem value={7} primaryText="16gb" />
                <MenuItem value={8} primaryText="24gb" />
                <MenuItem value={9} primaryText="32gb" />
                <MenuItem value={10} primaryText="48gb" />
                <MenuItem value={11} primaryText="64gb" />
              </SelectField>
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
              <SelectField
                floatingLabelText="Type"
                floatingLabelFixed={true}
                value={this.props.newBuild.storageType}
                onChange={(e, l, c) => {
                  this.props.onChange('storageType', c)
                }}
                style={selectStyle}
              >
                <MenuItem value={1} primaryText="hhd" />
                <MenuItem value={2} primaryText="ssd" />
              </SelectField>
              <SelectField
                floatingLabelText="Size"
                floatingLabelFixed={true}
                value={this.props.newBuild.storageSize}
                onChange={(e, l, c) => {
                  this.props.onChange('storageSize', c)
                }}
                style={biggerSelectStyle}
              >
                <MenuItem value={1} primaryText="125gb" />
                <MenuItem value={2} primaryText="250gb" />
                <MenuItem value={3} primaryText="500gb" />
                <MenuItem value={4} primaryText="1tb" />
                <MenuItem value={5} primaryText="2tb" />
              </SelectField>
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
                toggled={true}
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
              <SelectField
                floatingLabelText="Size"
                floatingLabelFixed={true}
                value={this.props.newBuild.videoCardSize}
                onChange={(e, l, c) => {
                  this.props.onChange('videoCardSize', c)
                }}
                style={selectStyle}
              >
                <MenuItem value={1} primaryText="1gb" />
                <MenuItem value={2} primaryText="2gb" />
                <MenuItem value={3} primaryText="4gb" />
                <MenuItem value={4} primaryText="8gb" />
                <MenuItem value={5} primaryText="16gb" />
              </SelectField>
            </section>

            <div style={{ width: '100%', display: 'table' }}>
              <Toggle
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
