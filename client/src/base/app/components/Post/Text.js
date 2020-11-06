import React, { Component } from "react";
import { Link } from "react-router-dom";

export class PostText extends Component {
  render() {
    const { text } = this.props;
    return (
      <div>
        <p className="mb-3">
          {text}{" "}
          <Link href="#!" className="badge badge-soft-primary">
            @Adolfo
          </Link>
        </p>
      </div>
    );
  }
}

export default PostText;
