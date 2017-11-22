import {
  getPost,
  getPosts,
  votePost,
  updatePost,
  createPost,
  destroyPost,
  getComments,
  createComment,
  updateComment,
  voteComment,
  destroyComment
} from '../utils/api'

export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_POST = 'ADD_POST'
export const RECEIVE_POST = 'RECEIVE_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

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
  getPost(postId)
    .then(post => dispatch(receivePost(post)))
)

export const fetchPosts = () => dispatch => (
  getPosts()
    .then(posts => dispatch(receivePosts(posts)))
)

export const postPost = (data) => dispatch => {
  debugger;
  createPost(data)
    .then((post) => dispatch(addPost(post)))
}

export const putPost = (data) => dispatch => (
  updatePost(data)
    .then(post => {
      dispatch(receivePost(post))
      dispatch(fetchPosts())
    })
)

export const deletePost = (data) => dispatch => (
  destroyPost(data)
    .then(post => dispatch(removePost(post)))
)

export const upVotePost = (postId) => dispatch => (
  votePost({option: 'upVote'}, postId)
    .then(post => {
      dispatch(fetchPosts())
      dispatch(receivePost(post))
    })
)

export const downVotePost = (postId) => dispatch => (
  votePost({option: 'downVote'}, postId)
    .then(post => {
      dispatch(fetchPosts())
      dispatch(receivePost(post))
    })
)

export const fetchComments = (postId) => dispatch => (
  getComments(postId)
    .then(comments => dispatch(receiveComments(comments)))
)

export const postComment = (data) => dispatch => (
  createComment(data)
    .then((comment) => {
      dispatch(addComment(comment))
      dispatch(fetchPost(comment.parentId))
    })
)

export const putComment = (data) => dispatch => (
  updateComment(data)
    .then(comment => dispatch(fetchComments(comment.parentId)))
)

export const deleteComment = (data) => dispatch => (
  destroyComment(data)
    .then(comment => dispatch(removeComment(comment)))
)

export const upVoteComment = (commentId) => dispatch => (
  voteComment({option: 'upVote'}, commentId)
    .then(comment => {
      dispatch(fetchComments(comment.parentId))
    })
)

export const downVoteComment = (commentId) => dispatch => (
  voteComment({option: 'downVote'}, commentId)
    .then(comment => {
      dispatch(fetchComments(comment.parentId))
    })
)
