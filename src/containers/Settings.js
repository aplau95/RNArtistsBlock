import React, { Component } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableHighlight,
  SafeAreaView
} from "react-native";

import { connect } from "react-redux";
import Header from "../components/Header";
// import Slider from "@react-native-community/slider";

import { bindActionCreators } from "redux";
import { changeQuality } from "../actions/ActionCreators";
import firebase from "react-native-firebase";

class Settings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lowSelect: "black",
      mediumSelect: "black",
      highSelect: "#03a9f4"
    };
  }

  change(value) {
    this.changeSelect(value);
    this.props.changeQuality(value);
  }

  changeSelect = quality => {
    switch (quality) {
      case "low":
        this.setState({
          lowSelect: "#03a9f4",
          mediumSelect: "black",
          highSelect: "black"
        });
        break;
      case "medium":
        this.setState({
          lowSelect: "black",
          mediumSelect: "#03a9f4",
          highSelect: "black"
        });
        break;
      case "high":
        this.setState({
          lowSelect: "black",
          mediumSelect: "black",
          highSelect: "#03a9f4"
        });
        break;
    }
  };

  handleSignOut = () => {
    const { navigate } = this.props.navigation;
    firebase
      .auth()
      .signOut()
      .then(() => navigate("Login"));
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Settings" />
        <View style={styles.qualityContainter}>
          <Text style={styles.extractionText}>Extraction Quality</Text>
          <View style={styles.buttonContainter}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => this.change("high")}
            >
              <Text style={{ color: this.state.highSelect }}>High</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={() => this.change("medium")}
            >
              <Text style={{ color: this.state.mediumSelect }}>Medium</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={() => this.change("low")}
            >
              <Text style={{ color: this.state.lowSelect }}>Low</Text>
            </TouchableHighlight>
          </View>
        </View>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.handleSignOut()}
        >
          <Text style={{ fontSize: 16, color: "#03a9f4" }}>Sign Out</Text>
        </TouchableHighlight>
      </SafeAreaView>
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
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  qualityContainter: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start"
  },
  buttonContainter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  extractionText: {
    fontSize: 16,
    alignSelf: "center"
  },
  button: {
    // flex: 1,
    backgroundColor: "transparent",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    margin: 20,
    height: 50
  }
});
