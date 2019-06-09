import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  ActivityIndicator
} from "react-native";

export default class UploadModal extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    modalVisible: true
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal transparent={true} onRequestClose={() => null} visible={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#dcdcdc",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#00000080"
            }}
          >
            <View
              style={{
                borderRadius: 10,
                padding: 25,
                backgroundColor: "#fff"
              }}
            >
              <ActivityIndicator size="large" />
              <Text style={{ fontSize: 20, fontWeight: "200" }}>
                Uploading Item {this.props.itemNum}/2
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "200" }}>
                {this.props.progress.toFixed(2)}%
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
