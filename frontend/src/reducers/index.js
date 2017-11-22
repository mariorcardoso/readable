import { combineReducers } from 'redux'
import comment from './comment'
import post from './post'

export default combineReducers({
  comment,
  post
})
