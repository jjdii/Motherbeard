import React from 'react'
import { connect } from 'react-redux'
import { find, propEq, toLower } from 'ramda'

class ShowProduct extends React.Component {
  componentDidMount() {}
  render() {
    const productObj = find(propEq('_id', this.props.match.params.id))(
      this.props.products
    )
    console.log(this.props.products)
    return (
      <div>
        <h1>{'Product:'}</h1>
        {JSON.stringify(productObj)}
      </div>
    )
  }
}

const connector = connect(state => state)
export default connector(ShowProduct)
