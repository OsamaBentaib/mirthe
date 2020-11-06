import React, { useState, Fragment } from "react";
import { useMutation } from "@apollo/client";
import { createCommentQuery } from "../../../store/constants/queries";
import { Comments } from "./Comments";
import { PROXY } from "../../../store/constants/urls";

export default function PostNewComment(props) {
  const { data, postId, count } = props;
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [newComments, setComments] = useState([]);
  const [addComment] = useMutation(createCommentQuery, {
    onCompleted(data) {
      setLoading(false);
      console.log(data);
      const cm = [...newComments, data.createComment];
      setComments(cm);
    },
    onerror(err) {
      console.log(err);
    },
  });
  const onCreate = (e) => {
    setLoading(true);
    addComment({ variables: { content: content, postId: postId } });
  };
  const Me = JSON.parse(localStorage.getItem("user"));
  return (
    <Fragment>
      {count + newComments.length === 0 ? (
        <p className="text-center text-muted">No comments yet</p>
      ) : (
        <p className="text-center text-muted">
          {count + newComments.length} comments
        </p>
      )}
      {newComments && (
        <Comments data={newComments} postId={postId} count={count} />
      )}
      {data && <Comments data={data} postId={postId} count={count} />}
      <hr />
      <div className="row">
        <div className="col-auto">
          <div className="avatar avatar-sm">
            <img
              src={PROXY + `avatar/${Me.profile.avatar.filename}`}
              alt="..."
              className="avatar-img rounded-circle"
            />
          </div>
        </div>
        <div className="col ml-n2">
          <form className="mt-1">
            <label className="sr-only">Leave a comment...</label>
            <textarea
              className="form-control form-control-flush"
              data-toggle="autosize"
              rows="1"
              placeholder="Leave a comment"
              value={content}
              style={{
                overflow: "hidden",
                overflowWrap: "break-word",
                height: "40px",
              }}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </form>
        </div>
        <div className="col-auto align-self-end">
          {content.length !== 0 && (
            <button
              disabled={loading}
              onClick={onCreate}
              className={`btn btn-primary ${loading && "disabled"}`}
              style={{ borderRadius: "30px" }}
            >
              <span className="ml-3 mr-3">
                {loading ? "Posting..." : "Post"}
              </span>
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
}
