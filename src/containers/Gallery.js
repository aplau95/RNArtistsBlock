import React, { Component } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  SectionList,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image
} from "react-native";

import ListItem from "../components/ListItem";
import Header from "../components/Header";
import { connect } from "react-redux";

export class Gallery extends Component {
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
    <ListItem
      id={item}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item}
    />
  );

  sortByDate = array => {
    array.sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    return array;
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Header title="Gallery" />
          <FlatList
            data={this.sortByDate(this.props.quality.userImages)}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
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
)(Gallery);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  listView: {
    borderRadius: 20,
    color: "red",
    flex: 1,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
