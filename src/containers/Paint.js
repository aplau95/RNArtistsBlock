import React, { Component } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";

import firebase from "react-native-firebase";
import { getAllSwatches } from "react-native-palette";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import { capitalize } from "../utils/paintFunctions";
import { alertMe } from "../utils/utils";

class Paint extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection(this.props.quality.userId);
    this.windowHeight = (Dimensions.get("window").height * 6) / 16;
    this.state = {
      isLoading: true,
      canUpdate: false,
      data: null,
      jsonLength: 0,
      imageUri: null,
      imageSource: null,
      onDefaultImage: true,
      colors: [],
      population: [],
      bodyTextColor: [],
      imageHeight: 100,
      imageWidth: 100,
      extracting: false
    };
  }

  clearArrays = () => {
    this.setState({ colors: [] });
    this.setState({ population: [] });
  };

  getColor = () => {
    const quality = {
      threshhold: false,
      quality: this.props.quality.current
    };
    ImagePicker.launchImageLibrary({}, response => {
      this.setState({
        onDefaultImage: false
      });
      var path = Platform.OS === "ios" ? response.origURL : response.path;
      const source = { uri: response.uri };
      if (!response.didCancel) {
        this.setState({ imageSource: source, imageUri: response.uri });
        this.clearArrays();
        this.setState({ extracting: true });
        this.getSwatches(quality, path);
      }
    });
  };

  getSwatches = (quality, path) => {
    getAllSwatches(quality, path, (error, swatches) => {
      if (error) {
        alertMe(error);
      } else {
        swatches.sort((a, b) => {
          return b.population - a.population;
        });
        if (swatches.length == 1) {
          alertMe("Error", "Was Unable to Extract Colors");
          this.setState({ extracting: false });
        } else {
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
          this.setState({ extracting: false });
        }
      }
    });
  };

  toPercent = ratio => {
    var retRatio;
    Platform.OS === "ios"
      ? (retRatio = (Number(ratio) * 100).toFixed(2) + "%")
      : (retRatio = ratio);
    return retRatio;
  };

  getSquareFormat = width => {
    if (this.state.colors.length > 16) {
      return width / 5;
    } else if (this.state.colors.length > 9) {
      return width / 4;
    } else {
      return width / 3;
    }
  };

  colorsList = (width, height) => {
    return this.state.colors.map((data, index) => {
      return (
        <View
          key={index}
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: this.getSquareFormat(width),
            height: this.getSquareFormat(height),
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
        alertMe(`The image dimensions are ${width}x${height}`);
      },
      error => {
        console.error(`Couldn't get the image size: ${error.message}`);
      }
    );
  };

  checkDefaultImage = () => {
    if (this.state.onDefaultImage) {
      return (
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "black",
            position: "absolute", // child
            top: this.windowHeight / 2 + 40
          }}
        >
          Click Get Photo To Begin
        </Text>
      );
    }
  };

  pushImage = (referenceImage, pictureImage, timestamp) => {
    this.ref.add({
      referenceImage: referenceImage,
      pictureImage: pictureImage,
      timestamp: timestamp
    });
  };

  navigateToCamera = () => {
    const { navigate } = this.props.navigation;
    // alertMe(this.state.onDefaultImage);
    if (this.state.onDefaultImage == false) {
      navigate("Camera", {
        pushImage: this.pushImage.bind(this),
        // testFunc: this.testFunc.bind(this),
        currentReference: this.state.imageUri
      });
    }
  };
  render() {
    const { navigate } = this.props.navigation;
    const dimensions = Dimensions.get("window");
    const extractQuality =
      "Color Extraction Quality: " +
      `${capitalize(this.props.quality.current)}`;
    var windowHeight = dimensions.height - 80;
    var imageViewHeight = (windowHeight * 6) / 16;
    var imageViewWidth = dimensions.width;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={{
              width: imageViewWidth / 2 - 2,
              height: (windowHeight * 0.5) / 16,
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => this.getColor()}
          >
            <Text>Get Photo</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              width: imageViewWidth / 2 - 2,
              height: (windowHeight * 0.5) / 16,
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => {
              if (!this.state.onDefaultImage) {
                navigate("Camera", {
                  pushImage: this.pushImage.bind(this),
                  currentReference: this.state.imageUri
                });
              } else {
                alertMe(
                  "Must Select Reference Photo",
                  "Please Press Get Photo to Begin..."
                );
              }
            }}
          >
            <Text>Open Camera</Text>
          </TouchableHighlight>
        </View>
        <ImageBackground
          resizeMode={"contain"}
          style={{
            flexDirection: "column",
            width: imageViewWidth,
            height: imageViewHeight,
            alignItems: "center",
            backgroundColor: "white"
          }}
          source={this.state.imageSource}
          key={this.state.imageUri}
        >
          {this.checkDefaultImage()}
        </ImageBackground>
        <Text style={styles.qualityText}>{extractQuality}</Text>

        {this.state.extracting ? (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <ActivityIndicator />
          </View>
        ) : (
          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
            {this.colorsList(dimensions.width, (windowHeight * 8) / 16)}
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const { quality } = state;
  return { quality };
};

export default connect(
  mapStateToProps,
  {}
)(Paint);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: "flex-start",
    alignItems: "stretch"
  },
  buttonContainer: {
    flexDirection: "row"
  },
  qualityText: {
    textAlign: "center"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDDDD"
  }
});
