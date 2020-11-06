import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";

class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.logout();
    window.location.href = "/login/";
  }

  render() {
    return (
      <div className="w-100">
        <div class="">
          <h1 class="font-bold text-center">Sorry to see you go..</h1>
        </div>
      </div>
    );
  }
}

export default connect(null, { logout })(Logout);
