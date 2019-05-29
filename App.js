import React, { Component } from "react";
// import firebase from 'react-native-firebase';

import { createAppContainer } from "react-navigation";

import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./src/reducers/reducer.js";

import { Login } from "./src/containers/Login";
import { SignedIn, createRootNavigator } from "./src/navigation/AppNavigator";

const store = createStore(reducer);

export default class App extends Component {
  state = {
    signedIn: false,
    checkedSignIn: false
  };

  // componentDidMount(){
  //  firebase.auth()
  // .signInAnonymously()
  // .then(credential => {
  //   if (credential) {
  //     console.log('default app user ->', credential.user.toJSON());
  //   }
  // });
  // }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    const Layout = createRootNavigator(signedIn);
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}
