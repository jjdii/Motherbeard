import React from 'react'
import { connect } from 'react-redux'
import { find, propEq, prop } from 'ramda'
import Header from '../../components/header'

class ShowBuild extends React.Component {
  componentDidMount() {}
  render() {
    const buildObj = find(propEq('_id', this.props.match.params.id))(
      this.props.builds
    )
    return (
      <div>
        <Header title={prop('name', buildObj)} />
        {JSON.stringify(buildObj)}
      </div>
    )
  }
}

const connector = connect(state => state)
export default connector(ShowBuild)
