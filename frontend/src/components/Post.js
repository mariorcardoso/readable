import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago'
import * as PostActions from '../actions/post'
import { fetchComments } from '../actions/comment'
import CommentList from './CommentList'

class Post extends Component {
  state = {
    viewMode: true,
    title: '',
    body: '',
    category: ''
  }
  editMode = () => {
    this.setState({
      viewMode: false,
      title: this.props.post.title,
      body: this.props.post.body,
      category: this.props.post.category
    })
  }
  componentDidMount() {
    const postId = this.props.match.params.id
    this.props.fetchPost(postId).then((res) => {
      if(res.post.error)
        this.props.history.push('/404')
    })
    this.props.fetchComments(postId)
  }
  componentWillReceiveProps(nextProps) {
    const { post } = nextProps
    if(post.category !== this.props.post.category)
      this.props.history.push(`/${post.category}/${post.id}`)
  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { putPost, post } = this.props
    let values = serializeForm(e.target, { hash: true })
    values = {...values, id: post.id, timestamp: post.timestamp}
    putPost(values)
    this.setState({ viewMode: true })
  }
  deletePostAndRedirects = (postId) => {
    this.props.deletePost(postId).then(() => this.props.history.push('/'))
  }
  render() {
    const { post, comments, upVotePost, downVotePost } = this.props
    const { viewMode, title, body, category } = this.state
    let content
    viewMode ?
      content = (
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h4>{post.title}</h4>
          </div>
          <div className="panel-body">
            {post.body}
            <div className="voting-actions">
              <button onClick={() => upVotePost(post.id)}><i className="fa fa-arrow-circle-up" aria-hidden="true"></i> +1 </button>
              <button onClick={() => downVotePost(post.id)}><i className="fa fa-arrow-circle-down" aria-hidden="true"></i> -1 </button>
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
      :
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
                <select value={category} name="category" onChange={(e) => this.handleInputChange(e)}>
                  <option value="react">React</option>
                  <option value="redux">Redux</option>
                  <option value="udacity">Udacity</option>
                </select>
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
    return (
      <div>
        {content}
        <hr/>
        <CommentList postId={post.id} />
      </div>
    )
  }
}

function mapStateToProps ({ post }) {
  return { post }
}

export default connect(mapStateToProps, { ...PostActions, fetchComments })(Post)
