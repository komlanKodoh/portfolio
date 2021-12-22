import { configureStore } from import { configureStore } from '@reduxjs/toolkit'

const reducer = (state, action) => {
  if (action.type === `INCREMENT`) {
    return Object.assign({}, state, {
      count: state.count + 1,
    })
  }
  return state
}

const initialState = { count: 0 }

const _createStore = () => configureStore(reducer, initialState)

export default _createStore