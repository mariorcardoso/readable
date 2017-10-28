import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'

class PostList extends Component {
  render() {
    return (
      <div className="list-group">
        {this.props.posts.map((post) => (
          <Link key={post.id} to={`/posts/${post.id}`} className="list-group-item">
            <h4 className="list-group-item-heading">{post.title}</h4>
            <span className="list-group-item-text">{post.voteScore} points</span>
            <span className="list-group-item-text"> by {post.author}</span>
            <span className="list-group-item-text"> <TimeAgo date={Date(post.timestamp)} /></span>
          </Link>
        ))}
      </div>
    )
  }
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired
}

export default PostList
