import { combineReducers } from "redux";

const INITIAL_STATE = {
  current: "high",
  windowWidth: 0,
  windowHeight: 0,
  userId: "",
  userImages: [],
  pictureImages: []
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
    case "SET_USER_IMAGES":
      const userImage = action.payload;
      const newState3 = {
        ...state,
        userImages: [...state.userImages, userImage]
      };
      return newState3;
    case "SET_PICTURE_IMAGES":
      const pictureImage = action.payload;
      const newState4 = {
        ...state,
        pictureImages: [...state.pictureImages, pictureImage]
      };
      return newState4;
    default:
      return state;
  }
};

export default combineReducers({
  quality: reducer
});
