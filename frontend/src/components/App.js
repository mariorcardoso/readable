import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Navigation from './Navigation'
import PostList from './PostList'
import Post from './Post'
import { getPosts } from '../utils/api'
import '../App.css'

class App extends Component {
  state = {
    posts: []
  }
  componentDidMount() {
    getPosts().then((posts) => {
      this.setState({ posts })
    })
  }
  render() {
    const { posts } = this.state
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
        <Route exact path="/posts/:id" component={Post} />
      </div>
    );
  }
}

export default App;
