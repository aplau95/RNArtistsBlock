import React, { Component } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Button
} from "react-native";

// import {
//     Button
// } from 'react-native-elements';

import RoundTextInput from "../components/RoundTextInput";
import Header from "../components/Header";
import firebase from "react-native-firebase";

const loginBackgroundPath = require("../../assets/loginBackground.jpg");
const loginLogoPath = require("../../assets/loginLogo.png");

export class SignUp extends Component {
  state = { email: "", password: "", errorMessage: null };

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
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
            onChangeText={email => this.setState({ email })}
            width={"80%"}
            height={50}
            placeholder={"Email"}
          />
          <RoundTextInput
            onChangeText={password => this.setState({ password })}
            width={"80%"}
            height={50}
            placeholder={"Password"}
          />

          <Button
            raised
            title="Sign Up"
            backgroundColor="#ffffff"
            onPress={this.handleSignUp}
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
    backgroundColor: "#F5FCFF",
    backgroundColor: "rgba(255,0,0,0.5)"
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});
