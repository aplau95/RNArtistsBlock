import React, { Component } from "react";

import { StyleSheet, View, ImageBackground, Image, Text } from "react-native";

import { Button } from "react-native-elements";

import RoundTextInput from "../components/RoundTextInput";
import Header from "../components/Header";
import firebase from "react-native-firebase";

const loginBackgroundPath = require("../../assets/loginBackground.jpg");
const loginLogoPath = require("../../assets/loginLogo.png");
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setUserId, changeQuality } from "../actions/FriendAction";

class Login extends Component {
  state = {
    email: "love4snuggles@gmail.com",
    password: "Pokemaster",
    errorMessage: null
  };

  handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(data => {
        this.props.setUserId(data.user.uid);
      })
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
            placeholder={"Bamgimmeegg@gmail.com"}
          />
          <RoundTextInput
            onChangeText={password => this.setState({ password })}
            width={"80%"}
            height={50}
            placeholder={"pokemaster"}
          />
          <Button
            raised
            title="Login"
            backgroundColor="#ffffff"
            onPress={() => this.handleSignIn()}
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

const mapStateToProps = state => {
  const { userID } = state;
  return { userID };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUserId,
      changeQuality
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
