import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux'
import {
  fetchComments,
  fetchPost,
  upVotePost,
  deletePost,
  downVotePost,
  putPost
} from '../actions'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago'
import CommentList from './CommentList'

class Post extends Component {
  state = {
    viewMode: true,
    title: '',
    body: ''
  }
  editMode = () => {
    this.setState({
      viewMode: false,
      title: this.props.post.title,
      body: this.props.post.body
    })
  }
  componentDidMount() {
    const postId = this.props.match.params.id
    this.props.loadPost(postId).then((res) => {
      if(res.post.title == null && res.post.title == null)
        this.props.history.push('/')
    })
    this.props.loadComments(postId)
  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { onUpdatePost, post } = this.props
    let values = serializeForm(e.target, { hash: true })
    values = {...values, id: post.id, timestamp: post.timestamp}
    onUpdatePost(values)
    this.setState({ viewMode: true })
  }
  deletePostAndRedirects = (postId) => {
    this.props.onDeletePost(postId).then(() => this.props.history.push('/'))
  }
  render() {
    const { post, comments, addVote, removeVote } = this.props
    const { viewMode, title, body } = this.state
    let content
    if (viewMode) {
      content = (
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h4>{post.title}</h4>
          </div>
          <div className="panel-body">
            {post.body}
            <div className="voting-actions">
              <button onClick={() => addVote(post.id)}><i className="fa fa-arrow-circle-up" aria-hidden="true"></i> +1 </button>
              <button onClick={() => removeVote(post.id)}><i className="fa fa-arrow-circle-down" aria-hidden="true"></i> -1 </button>
            </div>
          </div>
          <div className="post-footer">
            <span>{post.voteScore} points</span>
            <span> | {post.commentCount} comments</span>
            <span> | posted by {post.author}</span>
            <span> <TimeAgo date={Date(post.timestamp)} /></span>
            <div className="actions">
              <Link to='#' onClick={() => this.editMode()}>Edit</Link>
              <span> | </span>
              <Link to='#' onClick={() => this.deletePostAndRedirects(post.id)}>Delete</Link>
            </div>
          </div>
        </div>
      )
    } else {
      content = (
        <div className="panel panel-primary">
          <div className="panel-body">
            <form onSubmit={this.handleSubmit} className="create-comment-form">
              <div className="form-group">
                <input type="text" className="form-control" name="title" placeholder="title"
                  value={title}
                  onChange={(e) => this.handleInputChange(e)} />
              </div>
              <div className="form-group">
                <textarea rows="3" className="form-control" name="body" placeholder="body"
                  value={body}
                  onChange={(e) => this.handleInputChange(e)} />
              </div>
              <button type="submit" className="btn btn-default">Update Post</button>
            </form>
          </div>
        </div>
      )
    }
    return (
      <div>
        {content}
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
    loadComments: (postId) => dispatch(fetchComments(postId)),
    addVote: (data) => dispatch(upVotePost(data)),
    removeVote: (data) => dispatch(downVotePost(data)),
    onUpdatePost: (data) => dispatch(putPost(data)),
    onDeletePost: (data) => dispatch(deletePost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
