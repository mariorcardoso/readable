import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago'
import CommentList from './CommentList'
import { getPost, getComments } from '../utils/api'

class Post extends Component {
  state = {
    post: [],
    comments: []
  }
  componentDidMount() {
    const postId = this.props.match.params.id
    getPost(postId).then((post) => {
      this.setState({ post })
    })
    getComments(postId).then((comments) => {
      this.setState({ comments })
    })
  }
  render() {
    const { post, comments } = this.state
    return (
      <div>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h4>{post.title}</h4>
          </div>
          <div className="panel-body">
            {post.body}
          </div>
          <div className="post-footer">
            <span>{post.voteScore} points</span>
            <span> by {post.author}</span>
            <span> <TimeAgo date={Date(post.timestamp)} /></span>
            <div className="actions">
              <Link to='#'>Edit</Link>
              <span> | </span>
              <Link to='#'>Delete</Link>
            </div>
          </div>
        </div>
        <hr/>
        <CommentList comments={comments}/>
      </div>
    )
  }
}

export default Post
