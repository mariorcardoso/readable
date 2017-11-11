import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import uuidv1 from 'uuid/v1'

class CommentForm extends Component {
  state = {
    id: uuidv1(),
    timestamp: Date.now(),
    body: '',
    author: '',
    submitButton: 'Add Comment'
  }

  clearForm = () => {
    this.setState({ id: uuidv1(), timestamp: Date.now(), body: '', author: '' })
  }

  handleSubmit = (e) => {
    const dthis = this
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    if(this.props.comment !== null) {
      if (this.props.onUpdateComment)
        this.props.onUpdateComment(values)
        this.clearForm()
        this.props.clearCommentToEdit()
    } else {
      if (this.props.onCreateComment)
        this.props.onCreateComment(values)
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
    const { postId } = this.props
    const { id, timestamp, body, author, submitButton } = this.state

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
              <input type="text" className="form-control" name="author" placeholder="author"
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
