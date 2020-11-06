import React, { Component } from "react";
import { PROXY } from "../../../store/constants/urls";

export class PostImage extends Component {
  render() {
    return (
      <div>
        <p className="text-center mb-3">
          <img
            src={PROXY + `images/${this.props.image}`}
            alt="..."
            className="img-fluid rounded"
          />
        </p>
      </div>
    );
  }
}

export default PostImage;
