import {
  ADD_COMMENT,
  REMOVE_COMMENT,
  RECEIVE_COMMENTS,
} from '../actions/types'

export default function comments (state = [], action) {
  switch (action.type) {
    case ADD_COMMENT: {
      const { comment } = action
      return [
        ...state,
        action.comment
      ]
    }
    case REMOVE_COMMENT: {
      const { comment } = action
      return state.filter((c) => c.id !== comment.id)
    }
    case RECEIVE_COMMENTS: {
      const { comments } = action
      return comments
    }
    default:
      return state
  }
}
