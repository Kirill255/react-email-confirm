import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Notifications from "react-notify-toast";

import Landing from "./components/Landing";
import Confirm from "./components/Confirm";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner";

import "./App.css";

export default class App extends Component {
  state = {
    loading: true
  };

  // When the component mounts, a simple GET request is made to 'wake up' the
  // server. A lot of free services like Heroku and Now.sh will put your server
  // to sleep if no one has used your application in a few minutes. Using a
  // service like uptimerobot.com to ping the server regularly can mitigate
  // sleepiness.
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  }

  getContent = () => {
    if (this.state.loading) {
      return <Spinner size="8x" spinning="spinning" />;
    }

    return (
      <Router>
        <Switch>
          <Route exact path="/confirm/:id" component={Confirm} />
          <Route exact path="/" component={Landing} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    );
  };

  render() {
    return (
      <div className="app fadeIn">
        <Notifications />

        <main className="app__content">{this.getContent()}</main>

        <Footer />
      </div>
    );
  }
}
