import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import NewBuildForm from '../../components/new-build-form'
import { connect } from 'react-redux'
import {
  onChangeNewBuildForm,
  addNewBuild,
  isActive
} from '../../action-creators/builds'
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
        <div className="outer-content">
          <div className="inner-content">
            <h2 style={{ marginTop: '42px' }}>Create A New Build</h2>
            <NewBuildForm
              newBuild={this.props.newBuild}
              onChange={this.props.onChange}
              onSubmit={this.props.onSubmit}
              isActive={this.props.isActive}
            />
          </div>
        </div>
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
      console.log('data', data)
      dispatch(addNewBuild(data))
    },
    onMount: () => {
      dispatch(isActive)
    }
  }
}

const connector = connect(state => state, mapActionsToProps)

export default connector(NewBuild)
