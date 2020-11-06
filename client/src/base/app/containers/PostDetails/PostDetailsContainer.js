import React, { useEffect, useState } from "react";
import FolowCard from "../../widgets/FolowCard";
import PostContent from "../../widgets/PostContent";
import { useLazyQuery } from "@apollo/client";
import { getPostQuery } from "../../../store/constants/queries";
import LoadingSpinner from "../../components/LoadingSpinner";
import PostCompose from "../../widgets/PostCompose";

export default function PostDetailsContainer(props) {
  const [loading, setloading] = useState(false);
  const [post, setpost] = useState(null);
  const postId = window.location.pathname.split("/post/")[1].split("/")[0];
  const [getPost, { data: postData }] = useLazyQuery(getPostQuery);
  useEffect(() => {
    setloading(true);
    getPost({ variables: { postId: postId } });
  }, [getPost, postId]);
  useEffect(() => {
    if (postData) {
      setloading(false);
      setpost(postData.getPost);
    }
  }, [postData]);

  if (props.update) {
    if (loading) {
      return <LoadingSpinner />;
    } else {
      return <PostCompose post={post} update={true} />;
    }
  }
  return (
    <div className="row mt-4 mt-md-5">
      <div className="col-12 col-xl-8">
        {loading && <LoadingSpinner />}
        {!loading && post && <PostContent post={post} update={true} />}
      </div>
      <div className="col-12 col-xl-4">
        <FolowCard />
      </div>
    </div>
  );
}
