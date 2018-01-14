import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux'
import uuidv1 from 'uuid/v1'
import * as actions from '../actions/post'

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
    const { post, putPost, postPost, clearPostToEdit } = this.props
    let values = serializeForm(e.target, { hash: true })
    if(post !== null) {
      values = {...values, id: post.id, timestamp: post.timestamp}
      putPost(values)
      this.clearForm()
      clearPostToEdit()
    } else {
      values = {...values, id: uuidv1(), timestamp: Date.now()}
      postPost(values)
      this.clearForm()
    }
  }
  componentWillReceiveProps(nextProps) {
    const { post } = nextProps
    if(post !== null)
      this.setState({
        id: post.id,
        title: post.title,
        timestamp: post.timestamp,
        body: post.body,
        author: post.author,
        category: post.category,
        submitButton: 'Save Changes'
      })
  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  canSubmit() {
    const { title, body, author, category } = this.state
    return title.trim() !== "" && body.trim() !== "" && author.trim() !== "" && category.trim() !== ""
  }
  render() {
    const { post } = this.props
    const { title, body, author, category, submitButton } = this.state
    let emptyOption = null
    if(post === null) {
      emptyOption = <option value="">--Select Category--</option>
    }

    return (
      <div className="panel panel-info">
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
            <div className="form-group">
              <select value={category} name="category" onChange={(e) => this.handleInputChange(e)}>
                {emptyOption}
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
            <button disabled={!this.canSubmit()} type="submit" className="btn btn-default">{submitButton}</button>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(null, actions)(PostForm)
