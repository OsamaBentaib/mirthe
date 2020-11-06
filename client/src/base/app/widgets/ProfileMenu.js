import React, { Component } from "react";
import { Link } from "react-router-dom";

export class ProfileMenu extends Component {
  render() {
    return (
      <div className="dropdown-menu dropdown-menu-right">
        <Link to={`/profile/${this.props.Me._id}/`} className="dropdown-item">
          Profile
        </Link>
        <Link to="/settings/" className="dropdown-item">
          Settings
        </Link>
        <hr className="dropdown-divider" />
        <Link to="/logout/" className="dropdown-item">
          Logout
        </Link>
      </div>
    );
  }
}

export default ProfileMenu;
