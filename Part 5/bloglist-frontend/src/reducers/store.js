import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import errorReducer from './errorReducer'

const reducer = combineReducers({
  error: errorReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store