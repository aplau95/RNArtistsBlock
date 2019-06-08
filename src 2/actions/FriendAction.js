export const changeQuality = friendIndex => ({
  type: "ADD_FRIEND",
  payload: friendIndex
});

export const setUserId = userId => ({
  type: "SET_USER_ID",
  payload: userId
});

export const retrieveUserImages = userImages => ({
  type: "SET_USER_ID",
  payload: userImages
});
