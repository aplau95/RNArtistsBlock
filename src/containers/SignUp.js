import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView
} from "react-native";

import { Button } from "react-native-elements";

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
      <SafeAreaView style={styles.container}>
        <Header title="Artists Block" />
        <Image source={loginLogoPath} />
        <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        <RoundTextInput
          onChangeText={email => this.setState({ email })}
          width={"80%"}
          height={50}
          placeholder={"Email"}
          secureTextEntry={false}
        />
        <RoundTextInput
          onChangeText={password => this.setState({ password })}
          width={"80%"}
          height={50}
          placeholder={"Password"}
          secureTextEntry={true}
        />

        <Button
          // raised
          title="Sign Up"
          style={styles.button}
          backgroundColor="#ffffff"
          onPress={() => this.handleSignUp()}
          buttonStyle={{
            width: "100%"
          }}
        />
        <View style={styles.loginContainer}>
          <Text style={(color = "black")}> Already have an account? </Text>
          <TouchableOpacity onPress={() => navigate("Login")}>
            <Text style={styles.login}> Login In </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  button: {
    padding: 10
  },
  login: {
    color: "red"
  },
  loginContainer: {
    // flex: 1,
    flexDirection: "row",
    padding: 10
  }
});
