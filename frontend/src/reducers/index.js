import { combineReducers } from 'redux'
import {
  ADD_COMMENT,
  REMOVE_COMMENT,
  RECEIVE_COMMENTS,
  RECEIVE_POST,
  REMOVE_POST,
  RECEIVE_POSTS
} from '../actions'

const initialCommentState = {
  comments: []
}

function comment (state = initialCommentState, action) {
  switch (action.type) {
    case ADD_COMMENT: {
      const { comment } = action

      return {
        ...state,
        comments: [...state.comments, action.comment]
      }
    }
    case REMOVE_COMMENT: {
      const { comment } = action

      return {
        ...state,
        comments: state.comments.filter((c) => c.id !== comment.id)
      }
    }
    case RECEIVE_COMMENTS: {
      const { comments } = action

      return {
        ...state,
        comments: comments
      }
    }
    default:
      return state
  }
}

const initialPostState = {
  post: [],
  posts: []
}

function post (state = initialPostState, action) {
  switch (action.type) {
    case RECEIVE_POST: {
      const { post } = action

      return {
        ...state,
        post: post
      }
    }
    case REMOVE_POST: {
      const { post } = action

      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== post.id)
      }
    }
    case RECEIVE_POSTS: {
      const { posts } = action

      return {
        ...state,
        posts: posts
      }
    }
    default:
      return state
  }
}

export default combineReducers({
  comment,
  post
})
