import fetch from 'isomorphic-fetch'
import { SET_PRODUCTS, SET_CURRENT_PRODUCT } from '../constants'
//import history from '../history'
const url = 'http://localhost:5000'

export const setProducts = async (dispatch, getState) => {
  const response = await fetch(`${url}/products`).then(res => res.json())
  //console.log(response)
  dispatch({ type: SET_PRODUCTS, payload: response })
}

export const setCurrentProduct = id => async (dispatch, getState) => {
  const response = await fetch(`${url}/products/${id}`).then(res => res.json())
  dispatch({
    type: SET_CURRENT_PRODUCT,
    payload: response
  })
}
