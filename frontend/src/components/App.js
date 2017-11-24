import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Navigation from './Navigation'
import PostList from './PostList'
import Post from './Post'
import '../App.css'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'

class App extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }
  render() {
    const { posts } = this.props
    const reactPosts = posts.filter(post => post.category === 'react')
    const reduxPosts = posts.filter(post => post.category === 'redux')
    const udacityPosts = posts.filter(post => post.category === 'udacity')

    return (
      <div className="container">
        <Navigation />
        <Route exact path="/" render={() => (
          <PostList posts={posts}/>
        )}/>
        <Route exact path="/react" render={() => (
          <PostList posts={reactPosts}/>
        )}/>
        <Route exact path="/redux" render={() => (
          <PostList posts={reduxPosts}/>
        )}/>
        <Route exact path="/udacity" render={() => (
          <PostList posts={udacityPosts}/>
        )}/>
        <Route exact path="/:category/:id" component={Post} />
      </div>
    );
  }
}

function mapStateToProps ({ posts }) {
  return { posts }
}

export default connect(mapStateToProps, { fetchPosts })(App)
