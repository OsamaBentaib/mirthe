import React, { Component, Fragment } from "react";
import { FiAlignJustify } from "react-icons/fi";
import ProfileMenu from "../../widgets/ProfileMenu";
import { Link, Redirect } from "react-router-dom";
import { ReactComponent as Mirthe } from "./../../../../assets/svg/Mirthe.svg";
import { connect } from "react-redux";
import { PROXY } from "../../../store/constants/urls";

export class Header extends Component {
  state = {
    notificationShow: false,
    searchText: "",
    showResults: false,
    path: "",
  };
  onhandelNotificationShow = (e) => {
    this.setState({ notificationShow: !e });
  };
  onhandelStartSearch = (e) => {
    if (e.target.value) {
      this.setState({ searchText: e.target.value, showResults: true });
    } else {
      this.setState({ showResults: false });
    }
  };
  componentDidMount() {
    const path = window.location.pathname;
    this.setState({ path: path });
  }
  render() {
    const { path } = this.state;
    const { token } = this.props;
    const Me = JSON.parse(localStorage.getItem("user"));
    if (!token) return <Redirect to="/login/" />;
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-light" id="topnav">
          <div className="container">
            <button
              className="navbar-toggler mr-auto"
              type="button"
              data-toggle="collapse"
              data-target="#navbar"
              aria-controls="navbar"
              aria-label="Toggle navigation"
            >
              <FiAlignJustify />
            </button>
            <Link className="navbar-brand mr-auto" to="/">
              <Mirthe height="30" />
            </Link>
            <div className="form-inline mr-4 d-none d-lg-flex">{/*  */}</div>
            <div className="navbar-user">
              <div className="dropdown">
                <span
                  className="avatar avatar-sm avatar-online"
                  role="button"
                  dataToggle="dropdown"
                  ariaHaspopup="true"
                  ariaExpanded="false"
                >
                  <img
                    src={PROXY + `avatar/${Me.profile.avatar.filename}`}
                    alt="..."
                    className="avatar-img rounded-circle"
                  />
                </span>
                <ProfileMenu Me={Me} />
              </div>
            </div>
            <div
              className="collapse navbar-collapse mr-lg-auto order-lg-first"
              id="navbar"
            >
              <ul className="navbar-nav mr-lg-auto">
                <li className="nav-item dropdown">
                  <Link
                    className={`nav-link ${
                      path === "/" || (path === "" && "active")
                    }`}
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className={`nav-link ${
                      path === "/notification/" ||
                      (path === "/notification" && "active")
                    }`}
                    to="/notification/"
                  >
                    Notification
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    to="/explore/"
                    className={`nav-link ${path === "/explore/" && "active"}`}
                  >
                    Explore
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    errors: state.post.errors,
  };
};
export default connect(mapStateToProps, null)(Header);
