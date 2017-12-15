import {
  SET_BUILDS,
  SET_CURRENT_BUILD,
  ONCHANGE_NEW_BUILD_FORM
} from '../constants'
import { merge, concat, append, find, propEq } from 'ramda'

export const builds = (state = [], action) => {
  switch (action.type) {
    case SET_BUILDS:
      return action.payload
    default:
      return state
  }
}

export const currentBuild = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_BUILD:
      return action.payload
    default:
      return state
  }
}

const newBuildDefault = {
  name: '',
  motherboardKeywords: '',
  motherboardMemory: 1,
  processorKeywords: '',
  processorType: 1,
  processorSpeed: 1,
  processorCores: 1,
  memoryKeywords: '',
  memorySize: 1,
  storageKeywords: '',
  storageType: 1,
  storageSize: 1,
  videoCardKeywords: '',
  videoCardSize: 1,
  videoCardToggle: true,
  caseKeywords: '',
  powerSupplyKeywords: '',
  networkToggle: false,
  opticalDriveToggle: false
}
export const newBuild = (state = newBuildDefault, action) => {
  switch (action.type) {
    case ONCHANGE_NEW_BUILD_FORM:
      //console.log('state', state)
      return merge(state, action.payload)
    case SET_BUILDS:
      return newBuildDefault
    default:
      return state
  }
}

export const cart = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      //console.log('action.payload', action.payload)
      if (find(propEq('_id', action.payload._id), state)) {
        return state
      } else {
        let newState = append(action.payload, state)
        localStorage.removeItem('cart')
        localStorage.setItem('cart', JSON.stringify(newState))
        return newState
      }
    case 'SET_CART':
      return action.payload
    case 'CLEAR_CART':
      localStorage.clear()
      return []
    default:
      return state
  }
}
