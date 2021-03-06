import {
  ADD_POST,
  REMOVE_POST,
  RECEIVE_POSTS
} from '../actions/types'

export default function posts (state = [], action) {
  switch (action.type) {
    case ADD_POST: {
      const { post } = action
      return [
        ...state,
        post
      ]
    }
    case REMOVE_POST: {
      const { post } = action
      return state.filter((p) => p.id !== post.id)
    }
    case RECEIVE_POSTS: {
      const { posts } = action
      return posts
    }
    default:
      return state
  }
}
