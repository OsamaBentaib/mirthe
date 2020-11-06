import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { authLogin } from "../../store/actions/auth";
import { FiEye } from "react-icons/fi";
export class Login extends Component {
  state = {
    username: "",
    password: "",
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.login(username, password);
  };
  render() {
    const { loading, token } = this.props;
    const { username, password } = this.state;
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <div class="row justify-content-center">
        <div class="col-12 col-md-5 col-xl-4 my-5">
          <h1 class="display-4 text-center mb-3">Sign in</h1>
          <p class="text-muted text-center mb-5">Free access to mirthe.</p>
          <form onSubmit={this.handleSubmit}>
            <div class="form-group">
              <label>username</label>
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
              <div class="row">
                <div class="col">
                  <label>Password</label>
                </div>
                <div class="col-auto">
                  <Link to="/password_rest" class="form-text small text-muted">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div class="input-group input-group-merge">
                <input
                  type="password"
                  class="form-control form-control-appended"
                  name="password"
                  onChange={this.handleChange}
                  value={password}
                  placeholder="Enter your password"
                />
                <div class="input-group-append">
                  <span class="input-group-text">
                    <FiEye />
                  </span>
                </div>
              </div>
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
    login: (username, password) => dispatch(authLogin(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
