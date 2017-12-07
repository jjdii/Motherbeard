import { SET_PRODUCTS, SET_CURRENT_PRODUCT } from '../constants'

export const products = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.payload
    default:
      return state
  }
}

export const currentProduct = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_PRODUCT:
      return action.payload
    default:
      return state
  }
}
