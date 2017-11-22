import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import uuidv1 from 'uuid/v1'
import { connect } from 'react-redux'
import { postPost, putPost } from '../actions'

class PostForm extends Component {
  state = {
    title: '',
    body: '',
    author: '',
    category: '',
    submitButton: 'Add Post'
  }
  clearForm = () => {
    this.setState({
      title: '',
      body: '',
      author: '',
      category: '',
      submitButton: 'Add Post'
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { post, onUpdatePost, onCreatePost, clearPostToEdit, postId } = this.props
    let values = serializeForm(e.target, { hash: true })
    debugger
    if(post !== null) {
      values = {...values, id: post.id, timestamp: post.timestamp}
      onUpdatePost(values)
      this.clearForm()
      clearPostToEdit()
    } else {
      values = {...values, id: uuidv1(), timestamp: Date.now()}
      onCreatePost(values)
      this.clearForm()
    }
  }
  componentWillReceiveProps(nextProps) {
    const { post } = nextProps
    if(post !== null)
      this.setState({
        id: post.id,
        timestamp: post.timestamp,
        body: post.body,
        author: post.author,
        submitButton: 'Save Changes'
      })
  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  cannotSubmit() {
    const { title, body, author, category } = this.state
    return title.trim() === "" || body.trim() === "" || author.trim() === "" || category.trim() === ""
  }
  render() {
    const { post } = this.props
    const { title, body, author, category, submitButton } = this.state

    return (
      <div className="panel panel-info">
        <div className="panel-body">
          <form onSubmit={this.handleSubmit} className="create-comment-form">
            <div className="form-group">
              <input disabled={post !== null} type="text" className="form-control" name="title" placeholder="title"
                value={title}
                onChange={(e) => this.handleInputChange(e)} />
            </div>
            <div className="form-group">
              <textarea rows="3" className="form-control" name="body" placeholder="body"
                value={body}
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
              <input disabled={post !== null} type="text" className="form-control" name="author" placeholder="author"
                value={author}
                onChange={(e) => this.handleInputChange(e)} />
            </div>
            <button disabled={this.cannotSubmit()} type="submit" className="btn btn-default">{submitButton}</button>
          </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onUpdatePost: (data) => dispatch(putPost(data)),
    onCreatePost: (data) => dispatch(postPost(data))
  }
}

export default connect(null, mapDispatchToProps)(PostForm)
