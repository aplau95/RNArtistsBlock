import {createAppContainer} from 'react-navigation'

import React from 'react';
import { Platform, StatusBar, Button } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";


import {Paint} from '../containers/Paint'
import {Login} from '../containers/Login'
import {SignUp} from '../containers/SignUp'
import {Gallery} from '../containers/Gallery'
import {Settings} from '../containers/settings/Settings'
import {ReferencePhotos} from '../containers/settings/ReferencePhotos'
import {PaintColors} from '../containers/settings/PaintColors'

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up",
      headerStyle
    }
  },
  
},
);

export const SettingsNav = createStackNavigator({
    Settings: {
        screen: Settings,
        navigationOptions: {
            title: 'Settings',
            headerRight: (
                <Button
                  onPress={() => alert('This is a button!')}
                  title="Sign Out"
                  color="#000000"
                />
            )
          }
    },
    ReferencePhotos: {
        screen: ReferencePhotos,
        
    },
    PaintColors: {
        screen: PaintColors,
        navigationOptions: {
            title: "Sign Up",
            headerStyle
          }
    }
});

export const SignedIn = createBottomTabNavigator(
  {
    Paint: {
      screen: Paint,
      navigationOptions: {
        tabBarLabel: "Paint"
      }
    },
    Gallery: {
      screen: Gallery,
      navigationOptions: {
        tabBarLabel: "Gallery"
      }
    },
    Settings: {
        screen: SettingsNav,
        navigationOptions: {
          tabBarLabel: "Settings"
        }
      }
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      }
    }
  }
);

export const createRootNavigator = (signedIn = false) => {
    return createAppContainer(createSwitchNavigator(
      {
        SignedIn: {
          screen: SignedIn
        },
        SignedOut: {
          screen: SignedOut
        }
      },
      {
        initialRouteName: signedIn ? "SignedIn" : "SignedOut"
      }
    ));
  };