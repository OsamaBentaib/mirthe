import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { createFollowQuery } from "../../../store/constants/queries";
import { useMutation } from "@apollo/client";
import { PROXY } from "../../../store/constants/urls";

export default function ProfileHeader(props) {
  const [selected, setSelected] = useState(1);
  const [clicked, setClicked] = useState(false);
  const { user, onTap } = props;
  const Me = JSON.parse(localStorage.getItem("user"));
  const onhandelTab = (e) => {
    setSelected(e);
  };
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
    <div className="container-fluid">
      <div className="header-body border-0">
        <div className="row align-items-end">
          <div className="col-auto">
            <div className="avatar avatar-xxl header-avatar-top">
              <img
                src={PROXY + `avatar/${user.profile.avatar.filename}`}
                alt="..."
                className="avatar-img rounded-circle border border-4 border-body"
              />
            </div>
          </div>
          <div className="col mb-3 ml-n3 ml-md-n2">
            <h6 className="header-pretitle">@{user.username}</h6>
            <h1 className="header-title">
              {user.profile.firstName} {user.profile.lastName}
              {user.profile.firstName === "" &&
                user.profile.lastName === "" &&
                "Untitled"}
            </h1>
          </div>
          <div className="col-12 col-md-auto mt-2 mt-md-0 mb-md-3">
            {user.username !== Me.username ? (
              <>
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
              </>
            ) : (
              <Link className="brn btn-primary btn-sm d-block" to="/settings/">
                Settings
              </Link>
            )}
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col">
            <ul className="nav nav-tabs nav-overflow header-tabs">
              <li className="nav-item">
                <button
                  onClick={() => {
                    onhandelTab(1);
                    onTap(1);
                  }}
                  className={`nav-link mr-n4 active ${
                    selected !== 1 && "border0 border-0"
                  }`}
                >
                  <span className="ml-4 mr-4">Posts</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => {
                    onhandelTab(2);
                    onTap(2);
                  }}
                  className={`nav-link mr-n4 active ${
                    selected !== 2 && "border0 border-0"
                  }`}
                >
                  <span className="ml-4 mr-4">Followers</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => {
                    onhandelTab(3);
                    onTap(3);
                  }}
                  className={`nav-link mr-n4 active ${
                    selected !== 3 && "border0 border-0"
                  }`}
                >
                  <span className="ml-4 mr-4">Following</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
