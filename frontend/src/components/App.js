import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import PostList from './PostList'
import { getPosts } from '../utils/api';
import '../App.css';

class App extends Component {
  state = {
    posts: []
  }
  componentDidMount() {
    getPosts().then((posts) => {
      console.log(posts)
      this.setState({ posts })
    })
  }
  render() {
    return (
      <div className="container">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Readable</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#">All</NavItem>
            <NavItem eventKey={2} href="#">React</NavItem>
            <NavItem eventKey={2} href="#">Redux</NavItem>
            <NavItem eventKey={2} href="#">Udacity</NavItem>
          </Nav>
        </Navbar>
        <PostList posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;
