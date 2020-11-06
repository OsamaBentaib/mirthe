import React, { Component } from "react";
import { FiClock } from "react-icons/fi";
import moment from "moment";
export class Time extends Component {
  render() {
    return (
      <p className="card-text small text-muted">
        <span className="icon-md">
          <FiClock />
        </span>{" "}
        {moment(this.props.time).fromNow()}
      </p>
    );
  }
}

export default Time;
