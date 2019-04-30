import React, { Component } from "react";
import { notify } from "react-notify-toast";

import Spinner from "./Spinner";

import "./Landing.css";

export default class Landing extends Component {
  state = {
    sendingEmail: false
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ sendingEmail: true });

    setTimeout(() => {
      this.setState({ sendingEmail: false });
      notify.show("Some message");
      this.form.reset();
    }, 3000);
  };

  render() {
    const { sendingEmail } = this.state;

    return (
      <div className="landing">
        <form onSubmit={this.onSubmit} ref={(c) => (this.form = c)}>
          <div>
            <input type="email" name="email" ref={(с) => (this.email = с)} required />
            <label htmlFor="email">email</label>
          </div>
          <div>
            <button type="submit" className="btn" disabled={sendingEmail}>
              {sendingEmail ? <Spinner size="lg" spinning="spinning" /> : "Let's Go!"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
