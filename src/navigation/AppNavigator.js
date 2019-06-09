import { createAppContainer } from "react-navigation";

import React from "react";
import { Platform, StatusBar, Button } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";

import Paint from "../containers/Paint";
import Login from "../containers/Login";
import Camera from "../containers/Camera";
import { SignUp } from "../containers/SignUp";
import Gallery from "../containers/Gallery";
import Settings from "../containers/Settings";
import { alertMe } from "../utils/utils";

import Icon from "react-native-vector-icons/FontAwesome";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

const Left = ({ onPress }) => (
  <TouchableHighlight onPress={onPress}>
    <Text>Cancel</Text>
  </TouchableHighlight>
);

export const SignedOut = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: "Sign Up",
        headerStyle
      }
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

export const PaintNav = createStackNavigator(
  {
    Paint: {
      screen: Paint
    },
    Camera: {
      screen: Camera
      // navigationOptions: {
      //   header: ({ goBack }) => ({
      //     left: <Left onPress={goBack} />
      //   })
      // }
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

export const SignedIn = createBottomTabNavigator(
  {
    Paint: {
      screen: PaintNav,
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
      screen: Settings,
      navigationOptions: {
        tabBarLabel: "Settings"
      }
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;
        let iconName;
        let fill;
        if (routeName === "Paint") {
          iconName = "paint-brush";
          fill = focused ? "#4d9eff" : "#000000";
          // IconComponent = HomeIconWithBadge;
        } else if (routeName === "Settings") {
          iconName = `cog`;
          fill = focused ? "#4d9eff" : "#000000";
        } else if (routeName === "Gallery") {
          iconName = `align-center`;
          fill = focused ? "#4d9eff" : "#000000";
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={20} color={fill} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#4d9eff",
      inactiveTintColor: "#000000",
      showIcon: true,
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      }
    }
  }
);

export const createRootNavigator = signedIn => {
  return createAppContainer(
    createSwitchNavigator(
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
    )
  );
};
