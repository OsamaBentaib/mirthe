import React, { useEffect, useState } from "react";
import FolowCard from "../../widgets/FolowCard";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  getPostQuery,
  updatePostQuery,
} from "../../../store/constants/queries";
import LoadingSpinner from "../../components/LoadingSpinner";
import PostImage from "../../components/Post/Image";
import { FiCamera } from "react-icons/fi";
import Title from "../../components/Post/Title";
import Time from "../../components/Post/Time";
import Avatar from "../../components/Post/Avatar";

export default function PostUpdateContainer() {
  const [loading, setloading] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [updateLoading, setUpdateloading] = useState(false);
  const [post, setpost] = useState(null);
  const postId = window.location.pathname.split("/post/")[1].split("/")[0];
  console.log(postId);
  const [getPost, { data: postData, error }] = useLazyQuery(getPostQuery);
  useEffect(() => {
    setloading(true);
    getPost({ variables: { postId: postId } });
  }, [getPost, postId]);
  useEffect(() => {
    if (postData) {
      console.log(postData);
      setloading(false);
      setpost(postData.getPost);
      setText(postData.getPost.content);
    }
    if (error) {
      console.log(error);
    }
  }, [postData, error]);
  const [updatePost] = useMutation(updatePostQuery, {
    onCompleted(data) {
      window.location.href = `/`;
    },
    onError(err) {
      console.log(err);
    },
  });
  const onSelectEvent = (e) => {
    const image = e.target.files[0];
    console.log(image);
    Object.assign(image, {
      preview: URL.createObjectURL(image),
    });
    console.log(image);
    setImage(image);
  };
  const onUpdatePost = (e) => {
    setUpdateloading(true);
    updatePost({
      variables: { content: text, Image: image, postId: postId },
    });
  };

  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  return (
    <div className="row mt-4 mt-md-5">
      <div className="col-12 col-xl-8">
        {loading && <LoadingSpinner />}
        {!loading && post && (
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <Avatar />
                  </div>
                  <div className="col ml-n2">
                    <Title user={post.createdBy} />
                    <Time time={post.createdAt} />
                  </div>
                  <div className="col-auto">
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={onSelectEvent}
                      ref={hiddenFileInput}
                    />
                    <button
                      onClick={handleClick}
                      className="text-reset btn mr-3"
                      data-toggle="tooltip"
                      title=""
                      data-original-title="Add photo"
                    >
                      <FiCamera />
                    </button>
                    <button
                      disabled={loading}
                      onClick={onUpdatePost}
                      className={`btn btn-primary ${
                        updateLoading && "disabled"
                      }`}
                      style={{ borderRadius: "30px" }}
                    >
                      <span className="ml-3 mr-3">
                        {updateLoading ? "Updating..." : "Update"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="form-control form-control-flush form-control-auto"
                  placeholder=""
                  style={{ overflow: "hidden", minHeight: "68px" }}
                ></textarea>
              </div>
              {!image ? (
                post.Image.fileName && <PostImage />
              ) : (
                <img className="w-100 rounded" src={image.preview} alt="..." />
              )}
            </div>
          </div>
        )}
      </div>
      <div className="col-12 col-xl-4">
        <FolowCard />
      </div>
    </div>
  );
}
