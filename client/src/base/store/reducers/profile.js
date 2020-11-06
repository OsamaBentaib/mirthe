import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  profile: null,
};

const getProfile = (state, action) => {
  return updateObject(state, {
    profile: action.payload,
  });
};

const ProfileFail = (state, action) => {
  return updateObject(state, {
    error: action.err,
    loading: false,
  });
};

const addProfile = (state, action) => {
  return updateObject(state, {
    profile: action.payload,
  });
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PROFILE:
      return getProfile(state, action);
    case actionTypes.CREATE_PROFILE:
      return addProfile(state, action);
    case actionTypes.PROFILE_FAIL:
      return ProfileFail(state, action);
    default:
      return state;
  }
};

export default profileReducer;
