import {
  ADD_POST,
  RECEIVE_POST,
  REMOVE_POST,
  RECEIVE_POSTS
} from '../actions'

const initialPostState = {
  post: [],
  posts: []
}

function post (state = initialPostState, action) {
  switch (action.type) {
    case ADD_POST: {
      const { post } = action

      return {
        ...state,
        posts: [...state.posts, action.post]
      }
    }
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

export default post
