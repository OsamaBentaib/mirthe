import React, { useState } from "react";
import Avatar from "../components/Post/Avatar";
import Title from "../components/Post/Title";
import Time from "../components/Post/Time";
import Dropdown from "../components/Post/Dropdown";
import PostImage from "../components/Post/Image";
import Reactions from "../components/Post/Reactions";
import PostText from "../components/Post/Text";
import PostNewComment from "../components/Post/PostNewComment";
import { useMutation } from "@apollo/client";
import { deletePostQuery } from "../../store/constants/queries";

export default function PostContent(props) {
  const { post } = props;
  const [Deleted, setDeleted] = useState(false);
  const [deletePost] = useMutation(deletePostQuery);
  const ondelete = () => {
    setDeleted(true);
    deletePost({ variables: { postId: post._id } });
  };
  return (
    <div className="card" style={{ display: Deleted ? "none" : "block" }}>
      <div className="card-body">
        <div className="mb-3">
          <div className="row align-items-center">
            <div className="col-auto">
              <Avatar avatar={post.createdBy.profile.avatar.filename} />
            </div>
            <div className="col ml-n2">
              <Title user={post.createdBy} />

              <Time time={post.createdAt} />
            </div>
            <div className="col-auto">
              {
                <Dropdown
                  user={post.createdBy.username}
                  ondelete={ondelete}
                  _id={post._id}
                />
              }
            </div>
          </div>
        </div>
        <PostText text={post.content} />
        {post.Image.filename ? (
          <PostImage image={post.Image.filename} />
        ) : (
          <hr />
        )}
        <div className="mb-3">
          <div className="row">
            <div className="col">
              <Reactions data={post.reactions} postId={post._id} />
            </div>
            <div className="col-auto mr-n3"></div>
            <div className="col-auto">
              {post.reactionsCount !== 0 && (
                <button className="btn btn-sm btn-white">
                  {post.reactionsCount} reaction{post.reactions !== 1 && "s"}
                </button>
              )}
            </div>
          </div>
        </div>
        <hr />
        <PostNewComment
          data={post.comments}
          count={post.commentsCount}
          postId={post._id}
        />
      </div>
    </div>
  );
}
