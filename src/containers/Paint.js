import React, { Component } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Alert,
  Dimensions,
  SafeAreaView,
  TouchableHighlight
} from "react-native";

import { getAllSwatches } from "react-native-palette";
import ImagePicker from "react-native-image-picker";

export class Paint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      canUpdate: false,
      data: null,
      jsonLength: 0,
      imageUrl: require("../../assets/loginLogo.png"),
      colors: [],
      population: [],
      bodyTextColor: [],
      imageHeight: 100,
      imageWidth: 100
    };
  }

  alertMe = a => {
    Alert.alert(
      a,
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  };

  clearArrays = () => {
    this.setState({ colors: [] });
    this.setState({ population: [] });
  };

  getColor = () => {
    const person = {
      threshhold: false,
      quality: "high"
    };
    ImagePicker.launchImageLibrary({}, response => {
      var path = Platform.OS === "ios" ? response.origURL : response.path;
      const source = { uri: response.uri };
      this.setState({ imageUrl: source });
      this.getImageDim(source);
      this.clearArrays();
      getAllSwatches(person, path, (error, swatches) => {
        if (error) {
          console.log(error);
        } else {
          swatches.sort((a, b) => {
            return b.population - a.population;
          });
          swatches.forEach(swatch => {
            this.setState({ colors: [...this.state.colors, swatch.color] });
            this.setState({
              population: [...this.state.population, swatch.population]
            });
            this.setState({
              bodyTextColor: [
                ...this.state.bodyTextColor,
                swatch.titleTextColor
              ]
            });
          });
        }
      });
    });
  };

  getArrays = () => {
    this.alertMe(JSON.stringify(this.state.colors));
    this.alertMe(JSON.stringify(this.state.population));
  };

  toPercent = ratio => {
    return (Number(ratio) * 100).toFixed(2) + "%";
  };

  getSquareFormat = width => {
    if (this.state.colors.length > 15) {
      return width / 5;
    } else if (this.state.colors.length > 12) {
      return width / 4;
    }
  };

  colorsList = width => {
    return this.state.colors.map((data, index) => {
      return (
        <View
          key={index}
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: this.getSquareFormat(width),
            height: this.getSquareFormat(width),
            backgroundColor: data
          }}
        >
          <Text style={{ color: this.state.bodyTextColor[index] }}>
            {this.toPercent(this.state.population[index])}
          </Text>
        </View>
      );
    });
  };

  getImageDim = url => {
    Image.getSize(
      url,
      (width, height) => {
        this.alertMe(`The image dimensions are ${width}x${height}`);
      },
      error => {
        console.error(`Couldn't get the image size: ${error.message}`);
      }
    );
  };
  render() {
    var imageWidth = this.state.imageWidth;
    var imageHeight = this.state.imageHeight;
    const dimensions = Dimensions.get("window");
    this.setState({ imageWidth: dimensions.width });
    this.setState({
      imageHeight: (dimensions.width * imageHeight) / imageWidth
    });
    var imageViewHeight = this.state.imageHeight;
    var imageViewWidth = this.state.imageWidth;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={{
              width: imageViewWidth / 2 - 2,
              height: 100,
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={this.getColor}
          >
            <Text>Get Photo</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              width: imageViewWidth / 2 - 2,
              height: 100,
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={this.getColor}
          >
            <Text>Get Camera</Text>
          </TouchableHighlight>
        </View>
        <Image
          style={{ width: imageViewWidth, height: imageViewHeight }}
          source={this.state.imageUrl}
          key={this.state.imageUrl}
        />
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
          {this.colorsList(dimensions.width)}
        </View>
        {/* </View> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  buttonContainer: {
    flexDirection: "row"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDDDD"
  }
});
