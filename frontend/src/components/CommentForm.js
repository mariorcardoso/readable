import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import uuidv1 from 'uuid/v1'

class CommentForm extends Component {
  state = {
    id: uuidv1(),
    timestamp: Date.now(),
    body: '',
    author: '',
    postId: '',
    submitButton: 'Add Comment'
  }

  clearForm = () => {
    this.setState({ id: uuidv1(), timestamp: Date.now(), body: '', author: '' })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    const { comment, onUpdateComment, onCreateComment, clearCommentToEdit } = this.props
    if(comment !== null) {
      if (onUpdateComment)
        onUpdateComment(values)
        this.clearForm()
        clearCommentToEdit()
    } else {
      if (onCreateComment)
        onCreateComment({ comment: values })
        this.clearForm()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { comment, postId } = nextProps
    if(comment !== null) {
      this.setState({
        id: comment.id,
        timestamp: comment.timestamp,
        body: comment.body,
        author: comment.author,
        postId: postId,
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
    const { id, timestamp, body, author, submitButton, postId } = this.state

    return (
      <div className="panel panel-info">
        <div className="panel-body">
          <form onSubmit={this.handleSubmit} className="create-comment-form">
            <input readOnly type="hidden" name="id" value={id} />
            <input readOnly type="hidden" name="timestamp" value={timestamp} />
            <input readOnly type="hidden" name="parentId" value={postId} />
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

export default CommentForm
