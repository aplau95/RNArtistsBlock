import React from "react";
import { Text, View, TextInput } from "react-native";

const RoundTextInput = props => {
  return (
    <View
      style={{
        // borderColor: 'red',
        // borderRadius: 20,
        borderWidth: 2,
        marginBottom: 20,
        borderTopColor: "transparent",
        borderRightColor: "transparent",
        borderLeftColor: "transparent",
        borderBottomColor: "black",
        height: props.height,
        width: props.width,
        justifyContent: "center",
        position: "relative"
      }}
    >
      <TextInput
        style={{
          paddingLeft: 5,
          position: "absolute",
          bottom: 5
        }}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
};

const styles = {
  container: {}
};
export default RoundTextInput;
