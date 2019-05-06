import React, {Component} from 'react';

import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  Button
} from 'react-native';


import {ReferencePhotos} from './ReferencePhotos';
import {PaintColors} from './PaintColors';

export class Settings extends Component {
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
          <Button
            title="Go to PaintColors"
            onPress={() => navigate('PaintColors')}
            />
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