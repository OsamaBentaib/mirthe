import React from "react";
import { Route } from "react-router-dom";
import Home from "../app/secreens/Home";
import Header from "../app/containers/Header/Header";
import Login from "../auth/screens/login";
import Notification from "../app/secreens/Notification";
import FollowUsers from "../app/secreens/FollowUsers";
import PostDetails from "../app/secreens/PostDetails";
import PostUpdate from "../app/secreens/PostUpdate";
import Profile from "../app/secreens/Profile";
import Settings from "../app/secreens/Settings";
import signup from "../auth/screens/signup";
import logout from "../auth/screens/logout";

const BaseRouter = () => (
  <div className="main-content">
    <Header />
    <div className="container">
      <Route exact path="/" component={Home} />
      <Route exact path="/login/" component={Login} />
      <Route exact path="/signup/" component={signup} />
      <Route exact path="/logout/" component={logout} />
      <Route exact path="/notification/" component={Notification} />
      <Route exact path="/explore/" component={FollowUsers} />
      <Route exact path="/post/:id/" component={PostDetails} />
      <Route exact path="/post/:id/update/" component={PostUpdate} />
      <Route exact path="/profile/:id/" component={Profile} />
      <Route exact path="/settings/" component={Settings} />
    </div>
  </div>
);

export default BaseRouter;
