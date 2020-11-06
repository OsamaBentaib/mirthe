import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import LoadingSpinner from "../../components/LoadingSpinner";
import PostContent from "../../widgets/PostContent";
import { getUsersPostsQuery } from "../../../store/constants/queries";

export default function ProfilePosts(props) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const userId = window.location.pathname.split("/profile/")[1].split("/")[0];
  const [getPosts, { data: postsData }] = useLazyQuery(getUsersPostsQuery);
  useEffect(() => {
    if (postsData) {
      setLoading(false);
      console.log(postsData);
      setPosts(postsData.getUserPosts);
    }
  }, [postsData]);
  useEffect(() => {
    getPosts({ variables: { start: 0, limit: 10, userId: userId } });
    // setLoading(true);
  }, [getPosts, userId]);
  return (
    <div>
      {posts && posts.map((post, index) => <PostContent post={post} />)}
      {loading && <LoadingSpinner />}
    </div>
  );
}
