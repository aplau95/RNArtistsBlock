import React, {Component} from 'react';

import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  ImageBackground,
  Image,
  Button
} from 'react-native';

// import {
//     Button
// } from 'react-native-elements';

import RoundTextInput from '../components/RoundTextInput';
import Header from '../components/Header';

const loginBackgroundPath = require('../../assets/loginBackground.jpg');
const loginLogoPath = require('../../assets/loginLogo.png');

export class SignUp extends Component {
    render() {
      // const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
        <ImageBackground 
            source={loginBackgroundPath} 
            style={styles.backgroundImage}
            opacity='.6'
        >
            <Image source={loginLogoPath}/>
            <Header title='Artists Block'/>
            <RoundTextInput width={'80%'} height={50} placeholder={'Username'}/>
            <RoundTextInput width={'80%'} height={50} placeholder={'Password'}/>
        </ImageBackground>
         
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
  });