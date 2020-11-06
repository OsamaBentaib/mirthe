import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import { PROXY } from "../../../store/constants/urls";
export class Comments extends Component {
  render() {
    const { data, newComments, postId } = this.props;
    const filterArray = newComments ? newComments : [];
    const thisPostComments = filterArray.filter((e) => {
      return e.postId === postId;
    });
    return (
      <Fragment>
        {thisPostComments &&
          thisPostComments.map((comment, index) => (
            <div key={index} className="comment mb-3">
              <div className="row">
                <div className="col-auto">
                  <Link className="avatar avatar-sm" to="">
                    <img
                      src={
                        PROXY +
                        `avatar/${comment.createdBy.profile.avatar.filename}`
                      }
                      alt="..."
                      className="avatar-img rounded-circle"
                    />
                  </Link>
                </div>
                <div className="col ml-n2">
                  <div className="comment-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="comment-title">
                          {comment.createdBy.profile.firstName +
                            " " +
                            comment.createdBy.profile.lastName}
                        </h5>
                      </div>
                      <div className="col-auto">
                        <time className="comment-time">
                          {moment(comment.createdAt).fromNow(true)}
                        </time>
                      </div>
                    </div>
                    <p className="comment-text">{comment.content}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {data &&
          data.map((comment, index) => (
            <div key={index} className="comment mb-3">
              <div className="row">
                <div className="col-auto">
                  <Link className="avatar avatar-sm" to="">
                    <img
                      src={
                        PROXY +
                        `avatar/${comment.createdBy.profile.avatar.filename}`
                      }
                      alt="..."
                      className="avatar-img rounded-circle"
                    />
                  </Link>
                </div>
                <div className="col ml-n2">
                  <div className="comment-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="comment-title">
                          {comment.createdBy.profile.firstName +
                            " " +
                            comment.createdBy.profile.lastName}
                        </h5>
                      </div>
                      <div className="col-auto">
                        <time className="comment-time">
                          {moment(comment.createdAt).fromNow(true)}
                        </time>
                      </div>
                    </div>
                    <p className="comment-text">{comment.content}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    newComments: state.post.newComment.data,
  };
};
export default connect(mapStateToProps, null)(Comments);
