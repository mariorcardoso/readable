import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'

class CommentList extends Component {
  render() {
    return (
      <div className="list-group">
        {this.props.comments.map((comment) => (
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
                <Link to='#'>Delete</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired
}

export default CommentList
