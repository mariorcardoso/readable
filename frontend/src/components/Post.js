import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postComment, putComment, fetchComments, fetchPost, deleteComment } from '../actions'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago'
import CommentList from './CommentList'

class Post extends Component {
  componentDidMount() {
    const postId = this.props.match.params.id
    this.props.fetchPost(postId)
    this.props.fetchComments(postId)
  }
  render() {
    const { comments, postComment, putComment, deleteComment, post } = this.props
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
        <CommentList
          postId={post.id}
          comments={comments}
          onDeleteComment={deleteComment}
          onCreateComment={postComment}
          onUpdateComment={putComment}
        />
      </div>
    )
  }
}

function mapStateToProps ({comment, post}) {
  return {
    comments: comment.comments,
    post: post.post
  }
}

function mapDispatchToProps (dispatch) {
  return {
    deleteComment: (data) => dispatch(deleteComment(data)),
    putComment: (data) => dispatch(putComment(data)),
    postComment: (data) => dispatch(postComment(data)),
    fetchPost: (postId) => dispatch(fetchPost(postId)),
    fetchComments: (postId) => dispatch(fetchComments(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
