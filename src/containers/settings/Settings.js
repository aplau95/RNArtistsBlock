import React, { Component } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity
} from "react-native";

import { connect } from "react-redux";
import { ReferencePhotos } from "./ReferencePhotos";
import { PaintColors } from "./PaintColors";
import { RoundTextInput } from "../../components/RoundTextInput";
import Slider from "@react-native-community/slider";

import { bindActionCreators } from "redux";
import { changeQuality } from "../../actions/FriendAction";

class Settings extends React.PureComponent {
  getValue = () => {
    switch (this.props.quality.current) {
      case "high":
        return 2;
      case "medium":
        return 1;
      case "low":
        return 0;
    }
  };

  change(value) {
    var quality = "low";
    switch (value) {
      case 0:
        quality = "low";
        break;
      case 1:
        quality = "medium";
        break;
      case 2:
        quality = "high";
        break;
    }
    this.props.changeQuality(quality);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.quality.current}</Text>
        <Text>{this.props.quality.userId}</Text>
        <Slider
          step={1}
          value={this.getValue()}
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={2}
          onValueChange={this.change.bind(this)}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { quality } = state;
  return { quality };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeQuality
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
