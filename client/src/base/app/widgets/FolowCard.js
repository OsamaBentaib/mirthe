import React, { useState, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import LoadingSpinner from "./../components/LoadingSpinner";
import FollowCardUser from "../components/FollowCardUser";
const GET_USERS = gql`
  query getUsers($start: Int!, $limit: Int!) {
    getUsers(keyword: "", start: $start, limit: $limit) {
      isMyFollowers
      isMyFollowing
      _id
      username
      isPrivate
      createdAt
      profile {
        firstName
        lastName
        avatar {
          filename
          path
        }
      }
    }
  }
`;
export default function FollowUsersContainer() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const [getUsers, { data: usersData }] = useLazyQuery(GET_USERS);
  useEffect(() => {
    if (usersData) {
      setLoading(false);
      console.log(usersData);
      setUsers(usersData.getUsers);
    }
  }, [usersData]);
  useEffect(() => {
    setLoading(true);
    getUsers({ variables: { start: 0, limit: 6 } });
  }, [getUsers]);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-header-title">Who to follow</h3>
      </div>
      <div className="card-body">
        <div className="list-group list-group-flush my-n3">
          {users &&
            users.map((user, index) => (
              <FollowCardUser key={index} user={user} />
            ))}
          {loading && <LoadingSpinner />}
        </div>
      </div>
    </div>
  );
}
