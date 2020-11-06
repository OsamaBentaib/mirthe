import React, { Component } from "react";

export class LoadingSpinner extends Component {
  render() {
    return (
      <div className="w-100 text-center pt-3 pb-3">
        <div className="cs-page-spinner"></div>
      </div>
    );
  }
}

export default LoadingSpinner;
