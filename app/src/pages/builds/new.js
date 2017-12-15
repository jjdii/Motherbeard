import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import NewBuildForm from '../../components/new-build-form'
import { connect } from 'react-redux'
import {
  setBuilds,
  onChangeNewBuildForm,
  addNewBuild,
  isActive
} from '../../action-creators/builds'
import { setProducts } from '../../action-creators/products'
import '../../styles/form.css'

// props.resources === []
class NewBuild extends React.Component {
  componentDidMount() {
    this.props.onMount()
  }
  render() {
    return (
      <div>
        <Header />

        <h2 style={{ marginTop: '34px' }}>Create A New Build</h2>
        <NewBuildForm
          newBuild={this.props.newBuild}
          onChange={this.props.onChange}
          onSubmit={this.props.onSubmit}
          isActive={this.props.isActive}
        />
        <Footer />
      </div>
    )
  }
}

const mapActionsToProps = dispatch => {
  return {
    onChange: (field, value) => {
      //console.log('value', value)
      dispatch(onChangeNewBuildForm(field, value))
      dispatch(isActive)
    },
    onSubmit: data => {
      console.log('incoming data', data)
      dispatch(addNewBuild(data))
    },
    onMount: () => {
      // dispatch(setBuilds)
      // dispatch(setProducts)
      dispatch(isActive)
    }
  }
}

const connector = connect(state => state, mapActionsToProps)

export default connector(NewBuild)
