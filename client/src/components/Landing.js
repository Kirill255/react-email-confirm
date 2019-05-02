import React, { Component } from "react";
import { notify } from "react-notify-toast";

import Spinner from "./Spinner";

import { API_URL } from "../config";

import "./Landing.css";

export default class Landing extends Component {
  state = {
    sendingEmail: false
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ sendingEmail: true });

    fetch(`${API_URL}/email`, {
      method: "pOSt",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: this.email.value })
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ sendingEmail: false });
        notify.show(data.msg);
        this.form.reset();
      })
      .catch((err) => console.log(err));
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
