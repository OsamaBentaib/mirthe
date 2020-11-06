import { combineReducers } from "redux";
import authReducer from "./auth";
import profileReducer from "./profile";
import postsReducer from "./posts";
import followsReducer from "./follow";

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  post: postsReducer,
  follow: followsReducer,
});
