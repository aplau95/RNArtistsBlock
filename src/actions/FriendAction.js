export const changeQuality = friendIndex => ({
  type: "ADD_FRIEND",
  payload: friendIndex
});

export const setUserId = userId => ({
  type: "SET_USER_ID",
  payload: userId
});

export const setUserImages = userImages => ({
  type: "SET_USER_IMAGES",
  payload: userImages
});
