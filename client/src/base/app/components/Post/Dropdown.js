import React, { Fragment } from "react";
import {
  FiMoreVertical,
  FiEdit,
  FiTrash,
  FiChevronsRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Dropdown(props) {
  const me = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="dropdown">
      <button
        className="dropdown-ellipses btn dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <FiMoreVertical />
      </button>
      <div className="dropdown-menu dropdown-menu-right">
        <Link to={`/post/${props._id}/`} className="dropdown-item">
          <FiChevronsRight /> View Post
        </Link>
        {me.username === props.user && (
          <Fragment>
            <Link to={`/post/${props._id}/update/`} className="dropdown-item">
              <FiEdit /> Update Post
            </Link>
            <button
              onClick={props.ondelete}
              to={`/post/${props._id}/update/`}
              className="dropdown-item btn"
            >
              <FiTrash /> Delete Post
            </button>
          </Fragment>
        )}
      </div>
    </div>
  );
}
