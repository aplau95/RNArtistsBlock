import React, {Component} from 'react';

import {
  Platform, 
  StyleSheet, 
  Text, 
  View
} from 'react-native';

import {
  createSwitchNavigator, 
  createBottomTabNavigator,
  createAppContainer 
} from 'react-navigation';

export class Paint extends Component {
    constructor(props){
        super(props);
        this.state = { isLoading: true}
    }

    componentDidMount(){
        return fetch('https://facebook.github.io/react-native/movies.json')
          .then((response) => response.json())
          .then((responseJson) => {
    
            this.setState({
              isLoading: false,
              dataSource: responseJson.movies,
            }, function(){
    
            });
    
          })
          .catch((error) =>{
            console.error(error);
          });
    }

    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Hi Professor Kurfess</Text>
          <Text style={styles.instructions}>this is the boilerplate tester for ...</Text>
          <Text style={styles.instructions}></Text>
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