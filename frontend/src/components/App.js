import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Navigation from './Navigation'
import PostList from './PostList'
import Post from './Post'
import NotFound from './NotFound'
import '../App.css'
import { fetchPosts } from '../actions/post'

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
        <Switch>
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
          <Route path="/404" component={NotFound} />
          <Redirect from="*" to="/404" />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps ({ posts }) {
  return { posts }
}

export default connect(mapStateToProps, { fetchPosts })(App)
