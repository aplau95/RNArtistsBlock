import { combineReducers } from "redux";

const INITIAL_STATE = {
  current: "high",
  windowWidth: 0,
  windowHeight: 0,
  userId: ""
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_FRIEND":
      const current = action.payload;
      const newState = { ...state, current };
      return newState;
    case "SET_USER_ID":
      const userId = action.payload;
      const newState2 = { ...state, userId };
      return newState2;
    default:
      return state;
  }
};

export default combineReducers({
  quality: reducer
});
