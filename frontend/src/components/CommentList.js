import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import CommentForm from './CommentForm'

class CommentList extends Component {
  render() {
    const { comments, onDeleteComment, onCreateComment, postId } = this.props

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
                  <Link to='#'>Edit</Link>
                  <span> | </span>
                  <a href='#' onClick={() => onDeleteComment(comment.id)}>Delete</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <CommentForm
          postId={postId}
          onCreateComment={onCreateComment}
        />
      </div>
    )
  }
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired
}

export default CommentList
