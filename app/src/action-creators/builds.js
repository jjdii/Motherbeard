import fetch from 'isomorphic-fetch'
import {
  SET_BUILDS,
  SET_CURRENT_BUILD,
  ONCHANGE_NEW_BUILD_FORM,
  IS_ACTIVE
} from '../constants'
import history from '../history'
import { prop, propOr, isEmpty, append, propEq } from 'ramda'
const pkGenerator = require('../lib/pk-generator')
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
  let body = JSON.stringify({
    name: propOr('', 'name', data),
    build: [
      {
        name: 'motherboard',
        keywords: propOr('', 'motherboardKeywords', data),
        maxMemory: propOr('', 'motherboardMemory', data),
        low: '40',
        high: '200'
      },
      {
        name: 'processor',
        keywords: propOr('', 'processorKeywords', data),
        low: '80',
        high: '500'
      },
      {
        name: 'memory',
        keywords: propOr('', 'memoryKeywords', data),
        size: propOr('', 'memorySize', data),
        low: '20',
        high: '250'
      },
      {
        name: 'storage',
        keywords: propOr('', 'storageKeywords', data),
        size: propOr('', 'storageSize', data),
        type: propOr('', 'storageType', data),
        low: '25',
        high: '400'
      },
      {
        name: 'case',
        keywords: propOr('', 'caseKeywords', data),
        low: '20',
        high: '150'
      },
      {
        name: 'power supply',
        keywords: propOr('', 'powerSupplyKeywords', data),
        low: '30',
        high: '200'
      },
      {
        name: 'video card',
        keywords: propOr('', 'videoCardKeywords', data),
        low: '30',
        high: '200'
      }
    ]
  })
  //console.log('transformed data', JSON.parse(body))

  const result = await fetch(`${url}/newegg/builds`, {
    headers,
    method,
    body
  }).then(res => res.json())

  if (result.ok) {
    dispatch(setBuilds)
    //dispatch(setProducts)
    history.push(`/builds/${pkGenerator('build_', prop('name', result), '_')}`)
  } else {
    console.log('err adding build template:', result)
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
