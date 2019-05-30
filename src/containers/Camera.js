import React, { Component } from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { RNCamera } from "react-native-camera";
import { SafeAreaView } from "react-navigation";
import { alertMe } from "../utils/utils";
export default class Camera extends Component {
  constructor() {
    super();
  }
  state = {
    image: require("../../assets/loginLogo.png"),
    imagePreview: false
  };

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.imagePreview === false) {
      return (
        <SafeAreaView style={styles.container}>
          <View
            style={{
              flex: 0,
              flexDirection: "row",
              justifyContent: "flex-start"
            }}
          >
            <TouchableOpacity
              onPress={() => navigate("Paint")}
              style={styles.close}
            >
              <Text style={{ fontSize: 14, color: "white" }}> Close </Text>
            </TouchableOpacity>
          </View>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: "Permission to use camera",
              message: "We need your permission to use your camera",
              buttonPositive: "Ok",
              buttonNegative: "Cancel"
            }}
            androidRecordAudioPermissionOptions={{
              title: "Permission to use audio recording",
              message: "We need your permission to use your audio",
              buttonPositive: "Ok",
              buttonNegative: "Cancel"
            }}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              console.log(barcodes);
            }}
          >
            <TouchableOpacity
              // onPress={() => this.props.toggleCamera(false)}
              onPress={this.takePicture.bind(this)}
              style={styles.capture}
            >
              <Text style={{ fontSize: 14 }}> SNAP </Text>
            </TouchableOpacity>
          </RNCamera>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <View
            style={{
              flex: 0,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <TouchableOpacity
              onPress={() => navigate("Paint")}
              style={styles.close}
            >
              <Text style={{ fontSize: 14, color: "white" }}> Close </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.cancelPreview()}
              style={styles.close}
            >
              <Text style={{ fontSize: 14, color: "white" }}> Cancel </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.cancelPreview()}
              style={styles.close}
            >
              <Text style={{ fontSize: 14, color: "white" }}> Cancel </Text>
            </TouchableOpacity>
          </View>
          <Image
            style={styles.preview}
            resizeMode={"contain"}
            source={{ uri: this.state.image }}
          />
        </SafeAreaView>
      );
    }
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);

      this.setState({ image: data.uri, imagePreview: true });
      // alertMe(this.state.image);
      console.log(data.uri);
    }
  };

  cancelPreview = () => {
    this.setState({ imagePreview: false });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  },
  close: {
    flex: 0,
    backgroundColor: "black",
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 20,
    // alignSelf: "left",
    margin: 10
  }
});
