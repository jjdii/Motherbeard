import { SET_BUILDS, SET_CURRENT_BUILD } from '../constants'

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
