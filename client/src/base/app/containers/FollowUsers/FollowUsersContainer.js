import React, { useState, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import FolowCard from "../../widgets/FolowCard";
import LoadingSpinner from "./../../components/LoadingSpinner";
import UserToFollow from "./UserToFollow";
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
    getUsers({ variables: { start: 0, limit: 10 } });
  }, [getUsers]);

  return (
    <div className="row mt-4 mt-md-5">
      <div className="col-12 col-xl-8">
        <div className="card">
          <div className="card-header">
            <h3 className="card-header-title">Who to follow</h3>
          </div>
        </div>
        {users &&
          users.map((user, index) => (
            <div class="card">
              <div class="card-body">
                {" "}
                <UserToFollow key={index} user={user} />
              </div>
            </div>
          ))}
        {loading && <LoadingSpinner />}
      </div>
      <div className="col-12 col-xl-4">
        <FolowCard />
      </div>
    </div>
  );
}
