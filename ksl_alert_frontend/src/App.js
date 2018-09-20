import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';

import TopNav from './components/TopNav/TopNav.js';
import LandingPage from './components/LandingPage/LandingPage.js';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import AlertFeed from './components/AlertFeed/AlertFeed';
import CreateAlert from './components/CreateAlert/CreateAlert';
import Billing from './components/Billing/Billing';
import Settings from './components/Settings/Settings';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userId: null,
      isLoggedIn: false
    };
  }

  handleSignIn = id => {
    this.setState({ userId: id, isLoggedIn: true });
    console.log(this.state);
  };

  signOut = () => {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');
    }
    this.setState({ isLoggedIn: false })
  };

  render() {
    return (
      <div className="App">
        <h1>KSL Alerts</h1>
        <Switch>
          {/*<Route exact path='/' component={LandingPage} />*/}
          {/* <Route path='/signIn' component={() => <SignIn handleSignIn={this.handleSignIn}/> } />
        <Route path='/signUp' component={SignUp} /> */}
          {/* <Route path='/feed' component={AlertFeed} /> */}
          <Route path="/createAlert" component={CreateAlert} />
          <Route path="/billing" component={Billing} />
          <Route path="/settings" component={Settings} />
        </Switch>

        {this.state.isLoggedIn ? (
          <div>
            <Link to="/createAlert">Create Alert</Link>
            <Link to="/billing">Billing</Link>
            <Link to="/settings">Settings</Link>
          </div>
        ) : null}
        {this.state.isLoggedIn ? <AlertFeed id={this.state.userId} /> : null}
        {this.state.isLoggedIn ? (
          <button onClick={this.signOut}>Sign Out</button>
        ) : (
          <div>
            <SignUp handleSignIn={this.handleSignIn} />
            <SignIn handleSignIn={this.handleSignIn} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
