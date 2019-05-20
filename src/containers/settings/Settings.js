import React, { Component } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity
} from "react-native";

import { ReferencePhotos } from "./ReferencePhotos";
import { PaintColors } from "./PaintColors";
import { RoundTextInput } from "../../components/RoundTextInput";

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? "red" : "black";
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text style={{ color: textColor }}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export class Settings extends React.PureComponent {
  state = { selected: (new Map(): Map<string, boolean>) };

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState(state => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
  };

  _renderItem = ({ item }) => (
    <MyListItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  );

  render() {
    const item = {
      id: "asdf",
      title: "medium"
    };
    const { navigate } = this.props.navigation;
    const data = [
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item
    ];
    return (
      <View style={styles.container}>
        {/* <Button
          title="Go to PaintColors"
          onPress={() => navigate("PaintColors")}
        />
        <Text style={styles.instructions}>
          this is the boilerplate tester for ...
        </Text> */}
        <FlatList
          data={data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
