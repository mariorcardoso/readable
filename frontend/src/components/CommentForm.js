import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import uuidv1 from 'uuid/v1'

class CommentForm extends Component {
  state = {
    body: '',
    author: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    if (this.props.onCreateComment)
      this.props.onCreateComment(values)
      this.setState({ body: '', author: '' })
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { postId } = this.props
    const { body, author } = this.state

    return (
      <div className="panel panel-info">
        <div className="panel-body">
          <form onSubmit={this.handleSubmit} className="create-comment-form">
            <input readOnly type="hidden" name="id" value={uuidv1()} />
            <input readOnly type="hidden" name="timestamp" value={Date.now()} />
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
            <button type="submit" className="btn btn-default">Add Comment</button>
          </form>
        </div>
      </div>
    )
  }
}

export default CommentForm
