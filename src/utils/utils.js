import { Alert } from "react-native";

export const alertMe = (header, message) => {
  Alert.alert(
    header,
    message,
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: false }
  );
};

export const isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};
