import { combineReducers } from 'redux'
import {
  ADD_POST,
  REMOVE_POST
} from '../actions'

function post (state = {}, action) {
  switch (action.type) {
    case ADD_POST:
      const { post } = action

      return {
        ...state,
        [recipe.label]: recipe
      }
    default:
      return state
  }
}

function comment (state = {}, action) {
}

export default combineReducers({
  post,
  comment
})
