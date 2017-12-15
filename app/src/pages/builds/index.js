import React from 'react'
import { connect } from 'react-redux'
import { map } from 'ramda'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { listBuild } from '../../components/list-build'
import { setBuilds } from '../../action-creators/builds'
import { setProducts } from '../../action-creators/products'

class Builds extends React.Component {
  componentDidMount() {
    this.props.onMount()
  }

  render() {
    return (
      <div>
        <Header title="All Builds" />

        <div id="featured-products" className="outer-content">
          <div id="featured-products-inner" className="inner-content">
            <h2 style={{ marginTop: '34px' }}>All Builds</h2>
            {map(listBuild(this.props.products), this.props.builds)}
          </div>
        </div>

        <Footer />
      </div>
    )
  }
}

const connector = connect(
  state => state,
  dispatch => {
    return {
      onMount: () => {
        dispatch(setBuilds)
        dispatch(setProducts)
      }
    }
  }
)
export default connector(Builds)
