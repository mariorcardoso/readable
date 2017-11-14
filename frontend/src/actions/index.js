import {
  getPost,
  getComments,
  createComment,
  updateComment,
  destroyComment
} from '../utils/api'

export const ADD_COMMENT = 'ADD_COMMENT'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const RECEIVE_POST = 'RECEIVE_POST'

export const addComment = ({ comment }) => ({
  type: ADD_COMMENT,
  comment
})

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
})

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
})

export const fetchPost = (postId) => dispatch => (
  getPost(postId)
    .then(post => dispatch(receivePost(post)))
)

export const fetchComments = (postId) => dispatch => (
  getComments(postId)
    .then(comments => dispatch(receiveComments(comments)))
)

// TODO
export const postComment = (data) => dispatch => (
  createComment(data)
)

export const patchComment = (data) => dispatch => (
  updateComment(data)
)

export const deleteComment = (data) => dispatch => (
  destroyComment(data)
)
