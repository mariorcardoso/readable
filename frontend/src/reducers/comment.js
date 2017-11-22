import {
  ADD_COMMENT,
  REMOVE_COMMENT,
  RECEIVE_COMMENTS,
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

export default comment
