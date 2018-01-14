import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TimeAgo from 'react-timeago'
import CommentForm from './CommentForm'
import * as actions from '../actions/comment'

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
    const { comments, deleteComment, postId, upVoteComment, downVoteComment } = this.props
    const { commentToEdit } = this.state

    return (
      <div>
        <div className="list-group">
          {comments.map((comment) => (
            <div key={comment.id} className="panel panel-default">
              <div className="panel-body">
                <div className="comment-body">{comment.body}</div>
                <div className="voting-actions">
                  <button onClick={() => upVoteComment(comment.id)}><i className="fa fa-arrow-circle-up" aria-hidden="true"></i> +1 </button>
                  <button onClick={() => downVoteComment(comment.id)}><i className="fa fa-arrow-circle-down" aria-hidden="true"></i> -1 </button>
                </div>
              </div>
              <div className="comment-footer">
                <span>{comment.voteScore} points</span>
                <span> by {comment.author}</span>
                <span> <TimeAgo date={Date(comment.timestamp)} /></span>
                <div className="actions">
                  <a href='#' onClick={() => this.editComment(comment)}>Edit</a>
                  <span> | </span>
                  <a href='#' onClick={() => deleteComment(comment.id)}>Delete</a>
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

function mapStateToProps ({ comments }) {
  return { comments }
}

export default connect(mapStateToProps, actions)(CommentList)
