import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'

class PostList extends Component {
  render() {
    return (
      <div className="list-group">
        {this.props.posts.map((post) => (
          <div key={post.id} className="list-group-item">
            <Link to={`/posts/${post.id}`}><h4 className="list-group-item-heading">{post.title}</h4></Link>
            <span className="list-group-item-text">{post.voteScore} points</span>
            <span className="list-group-item-text"> | {post.commentCount} comments</span>
            <span className="list-group-item-text"> | posted by {post.author}</span>
            <span className="list-group-item-text"> <TimeAgo date={Date(post.timestamp)} /></span>
            <div className="voting-actions">
              <a href="#"><i className="fa fa-arrow-circle-up" aria-hidden="true"></i> +1 </a>
              <a href="#"><i className="fa fa-arrow-circle-down" aria-hidden="true"></i> -1 </a>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired
}

export default PostList
