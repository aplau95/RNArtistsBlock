import React, { Component } from "react";

import { StyleSheet, View, ImageBackground, Image, Text } from "react-native";

import { Button } from "react-native-elements";

import RoundTextInput from "../components/RoundTextInput";
import Header from "../components/Header";
import firebase from "react-native-firebase";

const loginBackgroundPath = require("../../assets/loginBackground.jpg");
const loginLogoPath = require("../../assets/loginLogo.png");

export class Login extends Component {
  state = { email: "", password: "", errorMessage: null };

  handleSignUp = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate("SignedIn"))
      .catch(error => this.setState({ errorMessage: error.message }));
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={loginBackgroundPath}
          style={styles.backgroundImage}
          opacity={4 / 10}
        >
          <Image source={loginLogoPath} />
          <Header title="Artists Block" />
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
          <RoundTextInput
            width={"80%"}
            height={50}
            placeholder={"Bamgimmeegg@gmail.com"}
          />
          <RoundTextInput
            width={"80%"}
            height={50}
            placeholder={"pokemaster"}
          />
          <Button
            raised
            title="Login"
            backgroundColor="#ffffff"
            onPress={() => navigate("SignedIn")}
            buttonStyle={{
              width: "100%"
            }}
          />
          <Button
            raised
            title="Sign Up"
            backgroundColor="#ffffff"
            onPress={() => navigate("SignUp")}
            buttonStyle={{
              width: "100%"
            }}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});
