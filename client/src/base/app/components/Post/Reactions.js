import React, { useState, useEffect } from "react";
import { reactions } from "./../../../store/constants/reactions";
import { useMutation } from "@apollo/client";
import { createReactionQuery } from "../../../store/constants/queries";

export default function Reactions(props) {
  const [myReaction, setMyReaction] = useState({});
  const [defaultReaction, setdefaultReaction] = useState({});
  const [createReaction] = useMutation(createReactionQuery, {
    onError(err) {
      console.log(err);
    },
    onCompleted(data) {
      console.log(data);
    },
  });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const myReaction = props.data.filter((e) => {
      return e.createdBy.username === user.username;
    });
    const react = myReaction[0] !== undefined ? myReaction[0].content : "";
    setMyReaction(react);
    setdefaultReaction(react);
  }, [props]);
  const onhandelSetReaction = (e) => {
    setMyReaction(e.content);
    createReaction({ variables: { content: e.content, postId: props.postId } });
  };
  const { data } = props;
  let reactionData = [];
  for (let i = 0; i < reactions.length; i++) {
    const react = reactions[i];
    let reactCount = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].content === react.content) reactCount += 1;
    }
    const newReact = {
      content: react.content,
      count: reactCount,
    };
    reactionData.push(newReact);
  }
  return (
    <div>
      {reactionData.map((react, index) => (
        <button
          key={index}
          onClick={() => onhandelSetReaction(react)}
          className={`btn btn-sm mr-1 btn-white ${
            myReaction === react.content && "badge-soft-primary"
          }`}
        >
          {react.content}{" "}
          {myReaction === react.content && defaultReaction !== react.content
            ? react.count + 1
            : react.count}
        </button>
      ))}
    </div>
  );
}
