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
  Modal
} from "react-native";

// import { AsyncStorage } from "@react-native-community/async-storage";
import firebase from "react-native-firebase";
const { app } = firebase.storage();
import uuid from "uuid/v4"; // Import UUID to generate UUID
import { getAllSwatches } from "react-native-palette";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import { capitalize } from "../utils/paintFunctions";
import { alertMe } from "../utils/utils";
import Camera from "./Camera";

class Paint extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection(this.props.quality.userId);
    this.state = {
      isLoading: true,
      canUpdate: false,
      data: null,
      jsonLength: 0,
      imageUri: require("../../assets/loginLogo.png"),
      imageSource: require("../../assets/loginLogo.png"),
      onDefaultImage: true,
      colors: [],
      population: [],
      bodyTextColor: [],
      imageHeight: 100,
      imageWidth: 100,
      // uploading: false,
      progress: 0
    };
  }

  componentDidMount() {}

  clearArrays = () => {
    this.setState({ colors: [] });
    this.setState({ population: [] });
  };

  uploadImage = (image, userId) => {
    return new Promise(function(resolve, reject) {
      const imageExt = String(image)
        .split(".")
        .pop(); // Extract image extension
      const imageFilename = `${uuid()}.${imageExt}`; // Generate unique name
      // this.alertMe(filename);
      // this.setState({ uploading: true });
      firebase
        .storage()
        .ref(`${userId}/${imageFilename}`)
        .putFile(image)
        .on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          snapshot => {
            let state = {};
            state = {
              ...state,
              onDefaultImage: false,
              progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100, // Calculate progress percentage
              images: []
            };
            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
              resolve(snapshot.downloadURL);
            }
          },
          error => {
            unsubscribe();
            alert("Sorry, Try again.");
          }
        );
    });
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
      this.setState({ imageSource: source, imageUri: response.uri });

      this.clearArrays();
      getAllSwatches(quality, path, (error, swatches) => {
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

  pushImage = (referenceImage, pictureImage) => {
    this.ref.add({
      referenceImage: referenceImage,
      pictureImage: pictureImage
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
                  uploadImage: this.uploadImage.bind(this),
                  currentReference: this.state.imageUri
                });
              } else {
                alertMe("Extracting Image", "Please wait one moment...");
              }
            }}
          >
            <Text>Open Camera</Text>
          </TouchableHighlight>
        </View>
        <ImageBackground
          resizeMode={"center"}
          style={{
            flexDirection: "column",
            width: imageViewWidth,
            height: imageViewHeight,
            alignItems: "center"
          }}
          source={this.state.imageSource}
          key={this.state.imageUri}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "black",
              position: "absolute", // child
              top: imageViewHeight / 2 + 40
            }}
          >
            Click Get Photo To Begin
          </Text>
        </ImageBackground>
        <Text style={styles.qualityText}>{extractQuality}</Text>
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
          {this.colorsList(dimensions.width, (windowHeight * 8) / 16)}
        </View>
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
