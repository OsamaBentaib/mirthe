import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { createFollowQuery } from "../../../store/constants/queries";
import { PROXY } from "../../../store/constants/urls";

export default function UserCard(props) {
  const { rel, user } = props;
  const Me = JSON.parse(localStorage.getItem("user"));
  const [isMyFollowing, setMyFollowing] = useState(
    user.followedBy.isMyFollowing ? true : false
  );
  const [stilFollowing, setStilFollowing] = useState(true);
  const [createFollow] = useMutation(createFollowQuery, {
    onCompleted(data) {
      console.log(data);
    },
    onError(err) {
      console.log(err);
    },
  });
  const onhandelFollower = (e) => {
    console.log(Me);
    setMyFollowing(!isMyFollowing);
    createFollow({ variables: { followedBy: Me._id, followed: user._id } });
  };
  const onhandelFollowing = (e) => {
    console.log(Me);
    setStilFollowing(!stilFollowing);
    createFollow({ variables: { followedBy: Me._id, followed: user._id } });
  };
  if (rel === 0)
    return (
      <Fragment>
        <div className="row align-items-center">
          <div className="col-auto">
            <Link href="profile-posts.html" className="avatar avatar-lg">
              <img
                src={
                  PROXY + `avatar/${user.followedBy.profile.avatar.filename}`
                }
                alt="..."
                className="avatar-img rounded-circle"
              />
            </Link>
          </div>
          <div className="col ml-n2">
            <h4 className="mb-1">
              <a href="profile-posts.html">
                {user.followedBy.profile.firstName}{" "}
                {user.followedBy.profile.lastName}{" "}
              </a>
            </h4>
          </div>
          <div className="col-auto">
            {isMyFollowing ? (
              <button
                onClick={onhandelFollower}
                className="btn btn-sm btn-light d-none d-md-inline-block"
              >
                Following
              </button>
            ) : (
              <button
                onClick={onhandelFollower}
                className="btn btn-sm btn-primary d-none d-md-inline-block"
              >
                Follow
              </button>
            )}
          </div>
        </div>
        <hr />
      </Fragment>
    );
  else if (rel === 1)
    return (
      <Fragment>
        <div className="row align-items-center">
          <div className="col-auto">
            <Link href="profile-posts.html" className="avatar avatar-lg">
              <img
                src={PROXY + `avatar/${user.followed.profile.avatar.filename}`}
                alt="..."
                className="avatar-img rounded-circle"
              />
            </Link>
          </div>
          <div className="col ml-n2">
            <h4 className="mb-1">
              <a href="profile-posts.html">
                {user.followed.profile.firstName}{" "}
                {user.followed.profile.lastName}{" "}
              </a>
            </h4>
          </div>
          <div className="col-auto">
            {stilFollowing ? (
              <button
                onClick={onhandelFollowing}
                className="btn btn-sm btn-light d-none d-md-inline-block"
              >
                Following
              </button>
            ) : (
              <button
                onClick={onhandelFollowing}
                className="btn btn-sm btn-primary d-none d-md-inline-block"
              >
                Follow
              </button>
            )}
          </div>
        </div>
        <hr />
      </Fragment>
    );
  else return <></>;
}
