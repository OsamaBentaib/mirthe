import React, { Component } from "react";
import PostCompose from "../../widgets/PostCompose";
import PostContent from "../../widgets/PostContent";
import FolowCard from "../../widgets/FolowCard";
import { connect } from "react-redux";
import { fetchPosts } from "./../../../store/actions/posts";
import LoadingSpinner from "../../components/LoadingSpinner";

export class HomeContainer extends Component {
  state = {
    newPosts: [],
  };
  componentDidMount() {
    this.props.fetchPosts(null, 0, 10);
  }
  onGetNewPost = (e) => {
    const newPosts = [e, ...this.state.newPosts];
    this.setState({ newPosts: newPosts });
  };
  render() {
    const { posts, loading } = this.props;
    return (
      <div className="row mt-4 mt-md-5">
        <div className="col-12 col-xl-8">
          <PostCompose onGetNewPost={this.onGetNewPost} />
          {loading && <LoadingSpinner />}
          {!loading &&
            this.state.newPosts &&
            this.state.newPosts.map((post, index) => (
              <PostContent key={index} post={post} />
            ))}
          {!loading &&
            posts &&
            posts.map((post, index) => <PostContent key={index} post={post} />)}
        </div>
        <div className="col-12 col-xl-4">
          <FolowCard />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    posts: state.post.posts,
    loading: state.post.loading,
  };
};
export default connect(mapStateToProps, { fetchPosts })(HomeContainer);
