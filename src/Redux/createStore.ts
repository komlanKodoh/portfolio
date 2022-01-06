import { configureStore } from '@reduxjs/toolkit'
import sectionsReducer from './slices/section'

const createStore = () => configureStore({
  reducer: {
    sections: sectionsReducer,
  },
})

export default createStore;