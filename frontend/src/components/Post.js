import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment, fetchComments, fetchPost } from '../actions'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago'
import CommentList from './CommentList'
import {
  updateComment
} from '../utils/api'

class Post extends Component {
  state = {
    post: [],
    comments: []
  }
  componentDidMount() {
    const postId = this.props.match.params.id
    this.props.fetchPost(postId)
    this.props.fetchComments(postId)
  }
  // deleteComment = (commentId) => {
  //   this.setState((state) => ({
  //     comments: state.comments.filter((c) => c.id !== commentId)
  //   }))
  //
  //   deleteComment(commentId)
  // }
  updateComment(comment) {
    updateComment(comment).then(comment => {
      const postId = this.props.match.params.id
      this.props.fetchComments(postId)
    })
  }
  render() {
    // const { post } = this.state
    const { comments, addComment, post } = this.props
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
          onDeleteComment={this.deleteComment}
          onCreateComment={(comment) => addComment(comment)}
          onUpdateComment={(comment) => this.updateComment(comment)}
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
    addComment: (data) => dispatch(addComment(data)),
    fetchPost: (postId) => dispatch(fetchPost(postId)),
    fetchComments: (postId) => dispatch(fetchComments(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
