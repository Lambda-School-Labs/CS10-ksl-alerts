import React, { Component } from 'react';
import axios from 'axios';
import { Button, Segment, Container, Header } from 'semantic-ui-react';
import AlertCard from '../AlertCard/AlertCard';
import './AlertFeed.css';

// use users for now. It needs to change to be saved urls
// then scrape the saved url to show alert feed
export default class AlertFeed extends Component {
  state = {
    queries: []
  };

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const requestOptions = {
      headers: {
        Authorization: token
      }
    };

    //
    axios
      .post(
        // get the user's data
        `${process.env.REACT_APP_BACKEND_URL}/user/getUser`,
        { id: this.props.id },
        requestOptions
      )
      .then(res => {
        // set the state with queries from userModel
        // in the queries contain the urls
        console.log(res.data);
        this.setState({ queries: res.data.queries });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // remove token from local storage
  signOut = () => {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');
      this.props.history.push('/');
    }
    this.props.handleSignOut();
  };

  render() {
    return (
      <Container>
        <Header>Alert Feed</Header>
        {this.state.queries.map(query => (
          <Segment>
            <AlertCard query={query} />
          </Segment>
        ))}
        <Button onClick={this.signOut}>Sign out</Button>
      </Container>
    );
  }
}
