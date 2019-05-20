import React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

const ListItem = props => {
  return (
    <TouchableOpacity onPress={this._onPress}>
      <View>
        <Text style={{ color: "red" }}>{props.key}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default ListItem;
