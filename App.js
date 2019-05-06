import React, {Component} from 'react';
// import firebase from 'react-native-firebase';

import {createAppContainer} from 'react-navigation';

import {Login} from './src/containers/Login'
import { SignedIn, createRootNavigator } from './src/navigation/AppNavigator';

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

    const Layout = createRootNavigator(signedIn)
    return <Layout/>
  }
}
