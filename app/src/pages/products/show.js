import React from 'react'
import { connect } from 'react-redux'
import { find, propEq, toLower, prop } from 'ramda'
import Header from '../../components/header'

class ShowProduct extends React.Component {
  componentDidMount() {}
  render() {
    const productObj = find(propEq('_id', this.props.match.params.id))(
      this.props.products
    )
    return (
      <div>
        <Header title={prop('name', productObj)} />
        {JSON.stringify(productObj)}
      </div>
    )
  }
}

const connector = connect(state => state)
export default connector(ShowProduct)
