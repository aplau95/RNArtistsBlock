import React, {Component} from 'react';

import {
  Platform, 
  StyleSheet, 
  Text, 
  View
} from 'react-native';

export class Gallery extends Component {
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Hi Professor Kurfess</Text>
          <Text style={styles.instructions}>this is the boilerplate tester for ...</Text>
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
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });