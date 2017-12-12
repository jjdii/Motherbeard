import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { prop, map, find, propEq } from 'ramda'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { listBuild, listBuildProducts } from '../../components/list-build'

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
        // dispatch(setBuilds)
        // dispatch(setProducts)
      }
    }
  }
)
export default connector(Builds)
