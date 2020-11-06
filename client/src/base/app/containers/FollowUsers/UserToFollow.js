import React, { useState, Fragment } from "react";
import { useMutation } from "@apollo/client";
import { createFollowQuery } from "../../../store/constants/queries";
import { Link } from "react-router-dom";
import moment from "moment";
import { PROXY } from "../../../store/constants/urls";
export default function UserToFollow(props) {
  const Me = JSON.parse(localStorage.getItem("user"));
  const { user } = props;
  const [clicked, setClicked] = useState();
  const [createFollow] = useMutation(createFollowQuery, {
    onCompleted(data) {
      console.log(data);
    },
    onError(err) {
      console.log(err);
    },
  });
  const onhandelFollow = (e) => {
    console.log(Me);
    setClicked(!clicked);
    createFollow({ variables: { followedBy: Me._id, followed: e } });
  };
  return (
    <Fragment>
      <div class="row align-items-center">
        <div class="col-auto">
          <Link to={`/profile/${user._id}/`} className="avatar avatar-lg">
            <img
              src={PROXY + `avatar/${user.profile.avatar.filename}`}
              alt="..."
              className="avatar-img rounded-circle"
            />
          </Link>
        </div>
        <div class="col ml-n2">
          <h4 class="mb-1">
            <Link to={`/profile/${user._id}/`}>
              {user.profile.firstName} {user.profile.lastName}{" "}
              {user.profile.firstName === "" &&
                user.profile.lastName === "" &&
                "Untitled"}
            </Link>
          </h4>
          <p class="small text-muted mb-1">
            @{user.username}
            {user.isMyFollowes && (
              <span className="badge ml-2 badge-soft-primary">Follows you</span>
            )}
          </p>
          <p class="small mb-0">Joined {moment(user.createdAt).fromNow()}</p>
        </div>
        <div class="col-auto">
          {user.isMyFollowing ? (
            <Fragment>
              {clicked ? (
                <button
                  onClick={() => onhandelFollow(user._id)}
                  className="btn btn-sm btn-primary d-none d-md-inline-block"
                >
                  Follow
                </button>
              ) : (
                <button
                  onClick={() => onhandelFollow(user._id)}
                  className="btn btn-sm btn-light d-none d-md-inline-block"
                >
                  Following
                </button>
              )}
            </Fragment>
          ) : (
            <Fragment>
              {clicked ? (
                <button
                  onClick={() => onhandelFollow(user._id)}
                  className="btn btn-sm btn-light d-none d-md-inline-block"
                >
                  Following
                </button>
              ) : (
                <button
                  onClick={() => onhandelFollow(user._id)}
                  className="btn btn-sm btn-primary d-none d-md-inline-block"
                >
                  Follow
                </button>
              )}
            </Fragment>
          )}
        </div>
        <div class="col-auto"></div>
      </div>
    </Fragment>
  );
}
