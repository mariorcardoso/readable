import { combineReducers } from 'redux'
import {
  ADD_COMMENT,
  RECEIVE_COMMENTS,
  RECEIVE_POST
} from '../actions'

const initialCommentState = {
  comments: []
}

function comment (state = initialCommentState, action) {
  switch (action.type) {
    case ADD_COMMENT:
      const { comment } = action

      return {
        ...state,
        comments: [...state.comments, comment]
      }
    case RECEIVE_COMMENTS:
      const { comments } = action

      return {
        ...state,
        comments: comments
      }
    default:
      return state
  }
}

const initialPostState = {
  post: []
}

function post (state = initialPostState, action) {
  switch (action.type) {
    case RECEIVE_POST:
      const { post } = action

      return {
        ...state,
        post: post
      }
    default:
      return state
  }
}

export default combineReducers({
  comment,
  post
})
