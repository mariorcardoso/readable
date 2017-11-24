import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import uuidv1 from 'uuid/v1'
import * as actions from '../actions/comment'

class CommentForm extends Component {
  state = {
    body: '',
    author: '',
    submitButton: 'Add Comment'
  }
  clearForm = () => {
    this.setState({
      body: '',
      author: '',
      submitButton: 'Add Comment'
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { comment, updateComment, createComment, clearCommentToEdit, postId } = this.props
    let values = serializeForm(e.target, { hash: true })
    if(comment !== null) {
      values = {...values, id: comment.id, parentId: comment.parentId, timestamp: comment.timestamp}
      updateComment(values)
      this.clearForm()
      clearCommentToEdit()
    } else {
      values = {...values, id: uuidv1(), parentId: postId, timestamp: Date.now()}
      createComment(values)
      this.clearForm()
    }
  }
  componentWillReceiveProps(nextProps) {
    const { comment } = nextProps
    if(comment !== null)
      this.setState({
        id: comment.id,
        timestamp: comment.timestamp,
        body: comment.body,
        author: comment.author,
        submitButton: 'Save Changes'
      })
  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  canSubmit() {
    const { body, author } = this.state
    return body.trim() !== "" && author.trim() !== ""
  }
  render() {
    const { comment } = this.props
    const { body, author, submitButton } = this.state

    return (
      <div className="panel panel-info">
        <div className="panel-body">
          <form onSubmit={this.handleSubmit} className="create-comment-form">
            <div className="form-group">
              <textarea rows="3" className="form-control" name="body" placeholder="body"
                value={body}
                onChange={(e) => this.handleInputChange(e)} />
            </div>
            <div className="form-group">
              <input disabled={comment !== null} type="text" className="form-control" name="author" placeholder="author"
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

export default connect(null, actions)(CommentForm)
