import React, { Component } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

export default class ListItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.listItem}>
          <Image
            resizeMode={"contain"}
            style={{ width: 200, height: 100 }}
            source={{
              uri: this.props.title.referenceImage
            }}
            key={this.props.title.referenceImage}
          />
          <Image
            resizeMode={"contain"}
            style={{ width: 200, height: 100 }}
            source={{
              uri: this.props.title.pictureImage
            }}
            key={this.props.title.pictureImage}
          />
          {/* <Text style={{ color: textColor }}>{this.props.title}</Text> */}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 20,
    color: "red",
    flex: 1,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
