import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchComments, fetchPost } from '../actions'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago'
import CommentList from './CommentList'

class Post extends Component {
  componentDidMount() {
    const postId = this.props.match.params.id
    this.props.loadPost(postId)
    this.props.loadComments(postId)
  }
  render() {
    const { post, comments } = this.props
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
        <CommentList postId={post.id} />
      </div>
    )
  }
}

function mapStateToProps ({comment, post}) {
  return {
    post: post.post
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadPost: (postId) => dispatch(fetchPost(postId)),
    loadComments: (postId) => dispatch(fetchComments(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
