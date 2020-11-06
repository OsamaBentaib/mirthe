import React, { Component } from "react";

export class Title extends Component {
  render() {
    if (this.props.user)
      return (
        <h4 className="mb-1">
          {this.props.user.profile.firstName} {this.props.user.profile.lastName}
        </h4>
      );
    else return <h4 className="mb-1">Untitled</h4>;
  }
}

export default Title;
