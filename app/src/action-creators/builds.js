import fetch from 'isomorphic-fetch'
import { SET_BUILDS, SET_CURRENT_BUILD } from '../constants'
import { isEmpty, assoc } from 'ramda'
import history from '../history'
const url = 'http://localhost:5000'

export const setBuilds = async (dispatch, getState) => {
  //console.log(`${url}/builds`)
  const response = await fetch(`${url}/builds`).then(res => res.json())
  //console.log(response)
  dispatch({ type: SET_BUILDS, payload: response })
}

export const setCurrentBuild = id => async (dispatch, getState) => {
  const response = await fetch(`${url}/builds/${id}`).then(res => res.json())
  dispatch({
    type: SET_CURRENT_BUILD,
    payload: response
  })
}
