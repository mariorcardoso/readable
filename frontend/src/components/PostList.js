import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import PostForm from './PostForm'
import { connect } from 'react-redux'
import { upVotePost, downVotePost, deletePost } from '../actions'

class PostList extends Component {
  state = {
    sortParam: '',
    order: 'asc',
    postToEdit: null
  }
  selectSort = (sortParam) => {
    let order = this.state.order
    if(order === 'asc')
      order = 'desc'
    else
      order = 'asc'
    this.setState({ sortParam, order })
  }
  orderSortCondition = (collection, param) => {
    return collection.sort((a, b) => {
      if(this.state.order === 'asc' )
        return a[`${param}`] < b[`${param}`]
      else
        return a[`${param}`] > b[`${param}`]
    })
  }
  sortPosts = (posts) => {
    const { sortParam } = this.state
    if(sortParam === 'date') {
      return this.orderSortCondition(posts, 'timestamp')
    } else if (sortParam === 'score') {
      return this.orderSortCondition(posts, 'voteScore')
    } else {
      return posts
    }
  }
  render() {
    const { posts, addVote, removeVote, onDeletePost } = this.props
    const { postToEdit } = this.state
    const sortedPosts = this.sortPosts(posts)
    return (
      <div>
        <div>
          <span>Order by: </span>
          <a href='#' onClick={() => this.selectSort('date')}>Date</a>
          <span> | </span>
          <a href='#' onClick={() => this.selectSort('score')}>Score</a>
        </div>
        <div className="list-group">
          {sortedPosts.map((post) => (
            <div key={post.id} className="list-group-item">
              <Link to={`/posts/${post.id}`}><h4 className="list-group-item-heading">{post.title}</h4></Link>
              <span className="list-group-item-text">{post.voteScore} points</span>
              <span className="list-group-item-text"> | {post.commentCount} comments</span>
              <span className="list-group-item-text"> | posted by {post.author}</span>
              <span className="list-group-item-text"> <TimeAgo date={Date(post.timestamp)} /></span>
              <div className="voting-actions post-actions">
                <div>
                  <button onClick={() => addVote(post.id)}><i className="fa fa-arrow-circle-up" aria-hidden="true"></i> +1 </button>
                  <button onClick={() => removeVote(post.id)}><i className="fa fa-arrow-circle-down" aria-hidden="true"></i> -1 </button>
                </div>
                <div>
                  <a href='#' onClick={() => this.editComment(post)}>Edit</a>
                  <span> | </span>
                  <a href='#' onClick={() => onDeletePost(post.id)}>Delete</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <PostForm
          post={postToEdit}
          clearPostToEdit={() => this.clearPostToEdit()}
        />
      </div>
    )
  }
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired
}

function mapDispatchToProps (dispatch) {
  return {
    addVote: (data) => dispatch(upVotePost(data)),
    removeVote: (data) => dispatch(downVotePost(data)),
    onDeletePost: (data) => dispatch(deletePost(data))
  }
}

export default connect(null, mapDispatchToProps)(PostList)
