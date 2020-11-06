import React, { useState } from "react";
import * as FI from "react-icons/fi";
import { useMutation } from "@apollo/client";
import { createPostQuery } from "../../store/constants/queries";

export default function PostCompose(props) {
  const [textLenght, setTextLenght] = useState(0);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [createPost] = useMutation(createPostQuery, {
    onCompleted(data) {
      setLoading(false);
      props.onGetNewPost(data.createPost);
      setText("");
      setTextLenght(0);
      setImage(null);
    },
    onError(err) {
      console.log(err);
    },
  });
  const onhandelStartTyping = (e) => {
    setText(e.target.value);
    const textLenght = e.target.value.length;
    setTextLenght(textLenght);
  };
  const onSelectEvent = (e) => {
    const image = e.target.files[0];
    console.log(image);
    Object.assign(image, {
      preview: URL.createObjectURL(image),
    });
    console.log(image);
    setImage(image);
  };
  const onCreatePost = (e) => {
    setLoading(true);
    createPost({ variables: { content: text, Image: image } });
  };

  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const postBtn = (
    <button
      disabled={loading}
      onClick={onCreatePost}
      className={`btn btn-primary ${loading && "disabled"}`}
      style={{ borderRadius: "30px" }}
    >
      <span className="ml-3 mr-3">{loading ? "Posting..." : "Post"}</span>
    </button>
  );
  return (
    <div className="card">
      <div className="card-body">
        <div className="form-group">
          <textarea
            onChange={onhandelStartTyping}
            value={text}
            className="form-control form-control-flush form-control-auto"
            placeholder="Start a post..."
            style={{ overflow: "hidden", minHeight: "68px" }}
          ></textarea>
        </div>
        <div className="form-group">
          {image && <img className="w-100 rounded" src={image.preview} alt="..." />}
        </div>
        <div className="row align-items-center">
          <div className="col">
            <small className="text-muted">{textLenght}/500</small>
          </div>
          <div className="col-auto">
            <div className="text-muted">
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
                <FI.FiCamera />
              </button>
              {textLenght >= 1 ? postBtn : image !== null ? postBtn : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
