import fetch from 'isomorphic-fetch'
import {
  SET_BUILDS,
  SET_CURRENT_BUILD,
  ONCHANGE_NEW_BUILD_FORM,
  IS_ACTIVE
} from '../constants'
import history from '../history'
import { prop, propOr, isEmpty } from 'ramda'
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

export const onChangeNewBuildForm = (field, value) => (dispatch, getState) => {
  dispatch({ type: ONCHANGE_NEW_BUILD_FORM, payload: { [field]: value } })
}

export const addNewBuild = data => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const method = 'POST'
  const body = JSON.stringify(data)

  const result = await fetch(`${url}/builds`, {
    headers,
    method,
    body
  }).then(res => res.json())

  if (result.ok) {
    dispatch(setBuilds)
    //dispatch(setProducts)
    history.push(`/builds/${result.id}`)
  } else {
    console.log('err adding build:', result)
    // handle error
  }
}

export const isActive = async (dispatch, getState) => {
  const currentData = propOr({}, 'newBuild', getState())

  if (
    isEmpty(propOr('', 'processor', currentData)) ||
    isEmpty(propOr('', 'memory', currentData)) ||
    isEmpty(propOr('', 'storage', currentData)) ||
    isEmpty(propOr('', 'videoCard', currentData)) ||
    isEmpty(propOr('', 'tower', currentData)) ||
    isEmpty(propOr('', 'powerSupply', currentData)) ||
    isEmpty(propOr('', 'motherboard', currentData))
  ) {
    dispatch({ type: IS_ACTIVE, payload: true })
  } else {
    dispatch({ type: IS_ACTIVE, payload: false })
  }
}
