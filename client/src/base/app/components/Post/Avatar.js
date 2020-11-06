import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PROXY } from "../../../store/constants/urls";

export class Avatar extends Component {
  render() {
    return (
      <Link className="avatar" to="">
        <img
          src={PROXY + `avatar/${this.props.avatar}`}
          alt="..."
          className="avatar-img rounded-circle"
        />
      </Link>
    );
  }
}

export default Avatar;
