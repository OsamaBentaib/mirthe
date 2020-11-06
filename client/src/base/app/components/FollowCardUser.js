import React, { useState, Fragment } from "react";
import { useMutation } from "@apollo/client";
import { createFollowQuery } from "../../store/constants/queries";
import Avatar from "./Post/Avatar";
import Title from "./Post/Title";

export default function FollowCardUser(props) {
  const { user } = props;
  const Me = JSON.parse(localStorage.getItem("user"));
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
    setClicked(!clicked);
    createFollow({ variables: { followedBy: Me._id, followed: e } });
  };
  return (
    <div className="list-group-item">
      <div className="row align-items-center">
        <div className="col-auto">
          <Avatar avatar={user.profile.avatar.filename} />
        </div>
        <div className="col ml-n2">
          <Title user={user} />
          <p class="small text-muted mb-1">
            @{user.username}
            {user.isMyFollowes && (
              <span className="badge ml-2 badge-soft-primary">Follows you</span>
            )}
          </p>
        </div>
        <div className="col-auto">
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
      </div>
    </div>
  );
}
