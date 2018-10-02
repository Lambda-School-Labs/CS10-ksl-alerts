import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

import TopNav from './components/TopNav/TopNav.js';
import LandingPage from './components/LandingPage/LandingPage.js';
import SignIn from './components/SignIn/SignIn.js';
import SignUp from './components/SignUp/SignUp.js';
import AlertFeed from './components/AlertFeed/AlertFeed.js';
import CreateAlert from './components/CreateAlert/CreateAlert.js';
import Billing from './components/Billing/Billing.js';
import Settings from './components/Settings/Settings.js';
import AlertListings from './components/AlertListings/AlertListings';

class App extends Component {
  state = {
    userId: null,
    isLoggedIn: false,
    queries: [],
  };

  handleSignIn = (id, queries) => {
    this.setState({ userId: id, isLoggedIn: true, queries: queries });
  };

  handleSignOut = () => {
    this.setState({ userId: null, isLoggedIn: false });
  }

  handleUpdateQueries = (updatedQueries) => {
    this.setState({ queries: updatedQueries });
  }

  componentDidMount() {
    if(!this.state.isLoggedIn && localStorage.getItem('jwt') && localStorage.getItem('id')) {
      const id = localStorage.getItem('id');
      const token = localStorage.getItem('jwt');
      const requestOptions = {
        headers: {
          Authorization: token
        }
      };
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/user/getUser`, { id }, requestOptions)
        .then(res => {
          const { id: _id, queries } = res.data;
          
          this.setState({ userId: id, isLoggedIn: true, queries: queries });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  render() {
    return (
      <div className="App">
        <TopNav isSignedIn={this.state.isLoggedIn} signOut={this.handleSignOut} />
        <Switch>
          <Route exact path='/' component={(props) => <LandingPage history={props.history}/>} />
          <Route path='/signIn' component={(props) => <SignIn handleSignIn={this.handleSignIn} history={props.history}/>} />
          <Route path='/signUp' component={(props) => <SignUp handleSignIn={this.handleSignIn} history={props.history}/>} />
          <Route path='/feed' component={(props) => <AlertFeed handleSignOut={this.handleSignOut} id={this.state.userId} queries={this.state.queries} history={props.history} />} />
          <Route path="/createAlert" component={(props) => <CreateAlert id={this.state.userId} updateQueries={this.handleUpdateQueries} history={props.history}/>} />
          <Route path="/billing" component={Billing} />
          <Route path="/settings" component={(props) => <Settings id={this.state.userId} history={props.history}/>} />
          {/* for testing */}
          <Route path='/alertListings' component={AlertListings} />
        </Switch>

      </div>
    );
  }
}

export default App;