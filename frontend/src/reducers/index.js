import { combineReducers } from 'redux'
import comments from './comments'
import posts from './posts'
import post from './post'

export default combineReducers({
  comments,
  posts,
  post
})
