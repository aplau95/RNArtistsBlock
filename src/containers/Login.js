import React, { Component } from "react";

import {
  StyleSheet,
  View,
  ImageBackground,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity
} from "react-native";

import { Button } from "react-native-elements";

import RoundTextInput from "../components/RoundTextInput";
import Header from "../components/Header";
import firebase from "react-native-firebase";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setUserId,
  changeQuality,
  setUserImages,
  setPictureImages
} from "../actions/FriendAction";

import { alertMe } from "../utils/utils";

const loginBackgroundPath = require("../../assets/loginBackground.jpg");
const loginLogoPath = require("../../assets/loginLogo.png");

class Login extends Component {
  constructor() {
    super();
  }
  state = {
    email: "bamgimmeegg@gmail.com",
    password: "Pokemaster",
    errorMessage: null
  };

  getPasswordReset = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        alertMe(
          "Password Reset",
          `Password reset link sent to ${this.state.email}`
        );
      })
      .catch(function(error) {
        // An error happened.
      });
  };
  getUserData = async userId => {
    const ref = firebase.firestore().collection(userId);
    const collection = await ref.get();
    collection.docs.map(doc => {
      const pieceUrl = doc.data();
      this.props.setUserImages(pieceUrl);
    });
  };

  handleSignIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(data => {
        this.props.setUserId(data.user.uid);
        this.getUserData(data.user.uid);
      })
      .then(() => this.props.navigation.navigate("SignedIn"))
      .catch(error => this.setState({ errorMessage: error.message }));

    // .then(() => this.props.navigation.navigate("SignedIn"));
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
          placeholder={"Bamgimmeegg@gmail.com"}
        />
        <RoundTextInput
          onChangeText={password => this.setState({ password })}
          style={styles.button}
          width={"80%"}
          height={50}
          placeholder={"pokemaster"}
        />
        <Button
          // raised
          title="Login"
          style={styles.button}
          backgroundColor="#ffffff"
          onPress={() => this.handleSignIn()}
          buttonStyle={{
            width: "100%"
          }}
        />
        <TouchableOpacity onPress={() => this.getPasswordReset()}>
          <Text style={styles.forgotPassword}> Forgot Password? </Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={(color = "black")}> Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigate("SignUp")}>
            <Text style={styles.signup}> Register Here </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const { userId } = state;
  return { userId };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUserId,
      changeQuality,
      setUserImages,
      setPictureImages
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  forgotPassword: {
    fontSize: 14,
    color: "grey",
    padding: 10
  },
  button: {
    padding: 10
  },
  signup: {
    color: "red"
  },
  signupContainer: {
    // flexSelf: 1,
    flexDirection: "row",
    padding: 10
  }
});
