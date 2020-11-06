import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import LoadingSpinner from "../../components/LoadingSpinner";
import { getFollowsQuery } from "../../../store/constants/queries";
import UserCard from "./UserCard";

export default function ProfileFollows(props) {
  const [loading, setLoading] = useState(false);
  const [follows, setFollows] = useState(null);
  const userId = window.location.pathname.split("/profile/")[1].split("/")[0];
  const [getFollows, { data: followsData }] = useLazyQuery(getFollowsQuery);
  useEffect(() => {
    if (followsData) {
      setLoading(false);
      console.log(followsData);
      setFollows(followsData.getFollows);
    }
  }, [followsData]);
  useEffect(() => {
    setLoading(true);
    console.log(userId);
    getFollows({
      variables: { rel: props.rel, userId: userId, start: 0, limit: 10 },
    });
  }, [getFollows, userId, props.rel]);
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h4>{props.rel === 0 ? "Followers" : "Followin"}</h4>
        </div>
        <div className="card-body">
          {follows &&
            follows.map((user, index) => (
              <UserCard user={user} rel={props.rel} key={index} />
            ))}
          {loading && <LoadingSpinner />}
        </div>
      </div>
    </div>
  );
}
