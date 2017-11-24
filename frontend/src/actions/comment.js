import * as API from '../utils/api'
import { fetchPost } from './post'
import {
  ADD_COMMENT,
  REMOVE_COMMENT,
  RECEIVE_COMMENTS
} from './types'


export const addComment = comment => ({
  type: ADD_COMMENT,
  comment
})

export const removeComment = comment => ({
  type: REMOVE_COMMENT,
  comment
})

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
})

export const fetchComments = (postId) => dispatch => (
  API.getComments(postId)
    .then(comments => dispatch(receiveComments(comments)))
)

export const createComment = (data) => dispatch => (
  API.createComment(data)
    .then((comment) => {
      dispatch(addComment(comment))
      dispatch(fetchPost(comment.parentId))
    })
)

export const updateComment = (data) => dispatch => (
  API.updateComment(data)
    .then(comment => dispatch(fetchComments(comment.parentId)))
)

export const deleteComment = (data) => dispatch => (
  API.destroyComment(data)
    .then(comment => dispatch(removeComment(comment)))
)

export const upVoteComment = (commentId) => dispatch => (
  API.voteComment({option: 'upVote'}, commentId)
    .then(comment => {
      dispatch(fetchComments(comment.parentId))
    })
)

export const downVoteComment = (commentId) => dispatch => (
  API.voteComment({option: 'downVote'}, commentId)
    .then(comment => {
      dispatch(fetchComments(comment.parentId))
    })
)
