import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  follows: null,
};

const getFollows = (state, action) => {
  return updateObject(state, {
    follows: action.payload,
  });
};

const followsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_FOLLOWS:
      return getFollows(state, action);
    default:
      return state;
  }
};

export default followsReducer;
