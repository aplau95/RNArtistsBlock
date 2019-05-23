import { combineReducers } from "redux";

const INITIAL_STATE = {
  current: "high",
  windowWidth: 0,
  windowHeight: 0
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_FRIEND":
      const current = action.payload;
      const newState = { current };
      return newState;
    default:
      return state;
  }
};

export default combineReducers({
  quality: reducer
});
