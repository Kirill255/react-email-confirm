import React, { Component } from "react";
import { Link } from "react-router-dom";
import { notify } from "react-notify-toast";

import Spinner from "./Spinner";

import { API_URL } from "../config";

import "./Confirm.css";

export default class Confirm extends Component {
  state = {
    confirming: true
  };

  // When the component mounts the mongo id for the user is pulled  from the
  // params in React Router. This id is then sent to the server to confirm that
  // the user has clicked on the link in the email. The link in the email will
  // look something like this:
  //
  // http://localhost:3000/confirm/5c40d7607d259400989a9d42
  //
  // where 5c40d...a9d42 is the unique id created by Mongo
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);

    fetch(`${API_URL}/email/confirm/${id}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ confirming: false });
        notify.show(data.msg);
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="confirm">
        {this.state.confirming ? (
          <Spinner size="8x" spinning={"spinning"} />
        ) : (
          <Link to="/">
            <Spinner size="8x" spinning={""} />
          </Link>
        )}
      </div>
    );
  }
}
