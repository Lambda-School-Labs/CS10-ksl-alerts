import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import LandingPage from "./components/LandingPage/LandingPage.js";
import TopNav from "./components/TopNav/TopNav.js";
import SideNav from "./components/SideNav/SideNav.js";
import CreateAlert from "./components/CreateAlert/CreateAlert.js";
import Settings from "./components/Settings/Settings.js";
import Billing from "./components/Billing/Billing.js";

class App extends Component {
  //declaring our app states
  state = {
    signedIn: true,
  };
  

  render() {
    return (
      <div className="App">
        <TopNav signedIn={this.state.signedIn} /> 
        <LandingPage />
      </div>
    );
  }
}

export default App;
