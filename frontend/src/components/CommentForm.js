import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import uuidv1 from 'uuid/v1'
import { connect } from 'react-redux'
import { postComment, putComment } from '../actions'

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
    const { comment, onUpdateComment, onCreateComment, clearCommentToEdit, postId } = this.props
    let values = serializeForm(e.target, { hash: true })
    if(comment !== null) {
      if (onUpdateComment)
        values = {...values, id: comment.id, parentId: comment.parentId, timestamp: comment.timestamp}
        onUpdateComment(values)
        this.clearForm()
        clearCommentToEdit()
    } else {
      if (onCreateComment)
        values = {...values, id: uuidv1(), parentId: postId, timestamp: Date.now()}
        onCreateComment(values)
        this.clearForm()
    }
  }
  componentWillReceiveProps(nextProps) {
    const { comment } = nextProps
    if(comment !== null) {
      this.setState({
        id: comment.id,
        timestamp: comment.timestamp,
        body: comment.body,
        author: comment.author,
        submitButton: 'Save Changes'
      })
    } else {
      this.clearForm()
    }
  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
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
            <button type="submit" className="btn btn-default">{submitButton}</button>
          </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onUpdateComment: (data) => dispatch(putComment(data)),
    onCreateComment: (data) => dispatch(postComment(data))
  }
}

export default connect(null, mapDispatchToProps)(CommentForm)
