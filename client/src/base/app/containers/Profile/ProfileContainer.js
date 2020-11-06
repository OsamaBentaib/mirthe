import React, { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "../../widgets/ProfileInfo";
import ProfilePosts from "./ProfilePosts";
import ProfileFollows from "./ProfileFollows";
import { useLazyQuery } from "@apollo/client";
import { getUserQuery } from "../../../store/constants/queries";

export default function ProfileContainer() {
  const [user, setUser] = useState(null);
  const [selected, setSelected] = useState(1);
  const userId = window.location.pathname.split("/profile/")[1].split("/")[0];
  const [getUser, { data: userData, error: err }] = useLazyQuery(getUserQuery);
  useEffect(() => {
    getUser({ variables: { ID: userId } });
  }, [getUser, userId]);
  useEffect(() => {
    if (userData) {
      setUser(userData.getUser);
    }
    if (err) {
      /*** */
    }
  }, [userData, err]);
  const onTap = (e) => {
    setSelected(e);
  };
  return (
    <div className="row ">
      <div className="col-12 col-xl-8 pt-3">
        <div className="card">
          {user && <ProfileHeader user={user} onTap={onTap} />}
        </div>
        {selected === 1 && <ProfilePosts />}
        {selected === 2 && <ProfileFollows rel={0} />}
        {selected === 3 && <ProfileFollows rel={1} />}
      </div>
      <div className="col-12 col-xl-4 pt-3">
        {user && <ProfileInfo profile={user} />}
      </div>
    </div>
  );
}
