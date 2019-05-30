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

import { connect } from "react-redux";

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.listView}>
          <Image
            resizeMode={"contain"}
            style={{ width: 200, height: 100 }}
            source={{
              uri: this.props.title.referenceImage
            }}
            key={this.props.title.referenceImage}
          />
          <Image
            resizeMode={"contain"}
            style={{ width: 200, height: 100 }}
            source={{
              uri: this.props.title.pictureImage
            }}
            key={this.props.title.pictureImage}
          />
          {/* <Text style={{ color: textColor }}>{this.props.title}</Text> */}
        </View>
      </TouchableOpacity>
    );
  }
}

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
    <MyListItem
      id={item}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item}
    />
  );

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <FlatList
            data={this.props.quality.userImages}
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
