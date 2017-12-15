import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { map, find, propEq, prop, propOr, pathOr } from 'ramda'
import Header from '../components/header'
import Footer from '../components/footer'
import { setBuilds } from '../action-creators/builds'
import { setProducts } from '../action-creators/products'
import { List, ListItem } from 'material-ui/List'
import LinkIcon from 'material-ui/svg-icons/content/link'
import BuildsIcon from 'material-ui/svg-icons/action/build'

const listCartItemProduct = products => product => {
  console.log(product)
  const fullProduct = find(propEq('_id', product._id), products)
  console.log(fullProduct)
  return (
    <ListItem
      key={product._id}
      primaryText={prop('name', fullProduct)}
      rightIcon={
        <a href={prop('buy-url', fullProduct)} target="_blank">
          <LinkIcon />
        </a>
      }
    />
  )
}
const listCartItem = products => build => {
  console.log(build)
  return (
    <ListItem
      primaryText={build.name}
      initiallyOpen={false}
      primaryTogglesNestedList={true}
      leftIcon={<BuildsIcon />}
      nestedItems={map(listCartItemProduct(products), build.products)}
    />
  )
}

class Cart extends React.Component {
  componentDidMount() {
    this.props.onMount()
  }

  render() {
    return (
      <div>
        <Header title="Cart" />

        <div className="outer-content">
          <div className="inner-content">
            <h2 style={{ marginTop: '34px' }}>Your Cart</h2>
            <List style={{ background: '#f8f8f8' }}>
              {map(
                listCartItem(pathOr([], ['props', 'products'], this)),
                this.props.cart
              )}
            </List>
            <button
              className="grey-button"
              style={{ margin: '25px 0px' }}
              onClick={e => this.props.onClearCart()}
            >
              Clear Cart
            </button>
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
        //dispatch(setBuilds)
        dispatch(setProducts)
      },
      onClearCart: () => {
        dispatch({ type: 'CLEAR_CART' })
      }
    }
  }
)
export default connector(Cart)
