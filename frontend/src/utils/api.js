const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Authorization': token
}

// Posts
export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())

export const votePost = (body, postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

// Comments
export const getComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

export const destroyComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, { method: 'DELETE', headers })
    .then(res => res.json())

export const createComment = (body) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const updateComment = (body) =>
  fetch(`${api}/comments/${body.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
