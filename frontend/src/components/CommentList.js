import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import CommentForm from './CommentForm'
import uuidv1 from 'uuid/v1'
import { connect } from 'react-redux'
import { fetchComments, deleteComment } from '../actions'

class CommentList extends Component {
  state = {
    commentToEdit: null
  }
  editComment = (commentToEdit) => {
    this.setState({ commentToEdit: commentToEdit })
  }
  clearCommentToEdit = () => {
    this.setState({ commentToEdit: null })
  }
  render() {
    const { comments, onDeleteComment, onCreateComment, onUpdateComment, postId } = this.props
    const { commentToEdit } = this.state

    return (
      <div>
        <div className="list-group">
          {comments.map((comment) => (
            <div key={comment.id} className="panel panel-default">
              <div className="panel-body">
                <div className="comment-body">{comment.body}</div>
              </div>
              <div className="comment-footer">
                <span>{comment.voteScore} points</span>
                <span> by {comment.author}</span>
                <span> <TimeAgo date={Date(comment.timestamp)} /></span>
                <div className="actions">
                  <a href='#' onClick={() => this.editComment(comment)}>Edit</a>
                  <span> | </span>
                  <a href='#' onClick={() => onDeleteComment(comment.id)}>Delete</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <CommentForm
          comment={commentToEdit}
          clearCommentToEdit={() => this.clearCommentToEdit()}
          postId={postId}
        />
      </div>
    )
  }
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired
}

function mapStateToProps ({comment, post}) {
  return {
    comments: comment.comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onDeleteComment: (data) => dispatch(deleteComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
