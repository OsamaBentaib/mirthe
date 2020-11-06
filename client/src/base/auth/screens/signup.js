import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { authSignup } from "../../store/actions/auth";
export class Login extends Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: "",
    err: null,
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, username, password1, password2 } = this.state;
    if (password1 === password2) {
      this.props.signup(email, username, password1, password2);
    } else {
      this.setState({
        err: "The two passwords are not match",
      });
    }
  };
  render() {
    const { loading, token } = this.props;
    const { username, password1, password2, email } = this.state;
    if (token != null) {
      return <Redirect to="/" />;
    }
    return (
      <div class="row justify-content-center">
        <div class="col-12 col-md-5 col-xl-4 my-5">
          <h1 class="display-4 text-center mb-3">Sign up</h1>
          <p class="text-muted text-center mb-5">Free access to Mirthe.</p>
          <form onSubmit={this.handleSubmit}>
            <div class="form-group">
              <label>Email Address</label>
              <input
                type="text"
                name="email"
                onChange={this.handleChange}
                value={email}
                placeholder="name@address.com"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                onChange={this.handleChange}
                value={username}
                placeholder="username"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input
                type="password"
                class="form-control form-control-appended"
                name="password1"
                onChange={this.handleChange}
                value={password1}
                placeholder="Enter your password"
              />
            </div>
            <div class="form-group">
              <label>Repeate Password</label>
              <input
                type="password"
                class="form-control form-control-appended"
                name="password2"
                onChange={this.handleChange}
                value={password2}
                placeholder="Repeate password"
              />
            </div>
            <button
              class="btn btn-lg btn-block btn-primary mb-3"
              type="submit"
              disabled={loading ? true : false}
            >
              {loading ? "Signing in ..." : "Sign in"}
            </button>
            <div class="text-center">
              <small class="text-muted text-center">
                Don't have an account yet? <Link to="/signup/">Sign up</Link>.
              </small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (email, username, password1, password2) =>
      dispatch(authSignup(username, email, password1, password2)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
