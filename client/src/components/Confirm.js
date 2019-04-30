import React, { Component } from "react";
import { Link } from "react-router-dom";
import { notify } from "react-notify-toast";

import Spinner from "./Spinner";

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

    setTimeout(() => {
      this.setState({ confirming: false });
      notify.show("Other message");
    }, 3000);
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
