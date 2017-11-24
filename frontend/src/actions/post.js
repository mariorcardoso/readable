import * as API from '../utils/api'
import {
  ADD_POST,
  RECEIVE_POST,
  REMOVE_POST,
  RECEIVE_POSTS
} from './types'

export const addPost = post => ({
  type: ADD_POST,
  post
})

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
})

export const removePost = post => ({
  type: REMOVE_POST,
  post
})

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const fetchPost = (postId) => dispatch => (
  API.getPost(postId)
    .then(post => dispatch(receivePost(post)))
)

export const fetchPosts = () => dispatch => (
  API.getPosts()
    .then(posts => dispatch(receivePosts(posts)))
)

export const postPost = (data) => dispatch => (
  API.createPost(data)
    .then((post) => dispatch(addPost(post)))
)

export const putPost = (data) => dispatch => (
  API.updatePost(data)
    .then(post => {
      dispatch(receivePost(post))
      dispatch(fetchPosts())
    })
)

export const deletePost = (data) => dispatch => (
  API.destroyPost(data)
    .then(post => dispatch(removePost(post)))
)

export const upVotePost = (postId) => dispatch => (
  API.votePost({option: 'upVote'}, postId)
    .then(post => {
      dispatch(fetchPosts())
      dispatch(receivePost(post))
    })
)

export const downVotePost = (postId) => dispatch => (
  API.votePost({option: 'downVote'}, postId)
    .then(post => {
      dispatch(fetchPosts())
      dispatch(receivePost(post))
    })
)
