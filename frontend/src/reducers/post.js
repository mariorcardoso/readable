import {
  RECEIVE_POST,
} from '../actions/types'

export default function post (state = {}, action) {
  switch (action.type) {
    case RECEIVE_POST: {
      const { post } = action
      return post
    }
    default:
      return state
  }
}
