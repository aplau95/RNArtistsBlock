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
  TouchableHighlight,
  AsyncStorage
} from "react-native";

// import { AsyncStorage } from "@react-native-community/async-storage";
import firebase from "react-native-firebase";
const { app } = firebase.storage();
import uuid from "uuid/v4"; // Import UUID to generate UUID
import { getAllSwatches } from "react-native-palette";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import { capitalize } from "../utils/paintFunctions";

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
      uploading: false,
      progress: 0,
      images: []
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

  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  _addImageRef = imageRef => {
    this.ref.add({
      piece: imageRef
      // referenceImage:
    });

    this.setState({
      textInput: ""
    });
  };

  uploadImage = () => {
    const ext = String(this.state.imageUri)
      .split(".")
      .pop(); // Extract image extension
    // this.alertMe(ext);
    const filename = `${uuid()}.${ext}`; // Generate unique name
    // this.alertMe(filename);
    this.setState({ uploading: true });
    firebase
      .storage()
      .ref(`tutorials/images/${this.props.quality.userId}/${filename}`)
      .putFile(this.state.imageUri)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          let state = {};
          state = {
            ...state,
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
          };
          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            const allImages = this.state.images;
            allImages.push(snapshot.downloadURL);
            state = {
              ...state,
              uploading: false,
              imgSource: "",
              imageUri: "",
              progress: 0,
              images: allImages
            };
            this._storeData(allImages);
            allImages.map(function(item, i) {
              this._addImageRef(item);
            }, this);
          }
          this.setState(state);
        },
        error => {
          unsubscribe();
          alert("Sorry, Try again.");
        }
      );
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("images");
      if (value !== null) {
        // We have data!!
        this.alertMe(value);
      }
      this.alertMe("nothing!!!");
    } catch (error) {
      // Error retrieving data
    }
  };

  _storeData = async allImages => {
    try {
      await AsyncStorage.setItem(
        "images/" + this.props.quality.userId,
        JSON.stringify(allImages)
      );
      this._retrieveData();
    } catch (error) {
      // Error saving data
    }
  };

  getColor = () => {
    const person = {
      threshhold: false,
      quality: this.props.quality.current
    };
    ImagePicker.launchImageLibrary({}, response => {
      var path = Platform.OS === "ios" ? response.origURL : response.path;
      const source = { uri: response.uri };

      // if (!this.isEmpty(source)) {
      this.setState({ imageSource: source, imageUri: response.uri });
      // }

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
        this.alertMe(`The image dimensions are ${width}x${height}`);
      },
      error => {
        console.error(`Couldn't get the image size: ${error.message}`);
      }
    );
  };
  render() {
    if (!this.state.onDefaultImage) {
      this.getImageDim(this.state.imageUrl2);
    }

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
            onPress={() => this.uploadImage()}
          >
            <Text>Get Camera</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              width: imageViewWidth / 2 - 2,
              height: (windowHeight * 0.5) / 16,
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => this._retrieveData()}
          >
            <Text>Get Data</Text>
          </TouchableHighlight>
        </View>
        <Image
          resizeMode={"center"}
          style={{ width: imageViewWidth, height: imageViewHeight }}
          source={this.state.imageSource}
          key={this.state.imageUri}
        />
        <Text style={styles.qualityText}>{extractQuality}</Text>
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
          {this.colorsList(dimensions.width, (windowHeight * 8) / 16)}
        </View>
        {/* </View> */}
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