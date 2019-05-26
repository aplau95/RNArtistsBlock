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
    const textColor = this.props.selected ? "red" : "black";
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Image
            resizeMode={"center"}
            style={{ width: 200, height: 100 }}
            source={{
              uri: this.props.title
            }}
            key={this.props.title}
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
      id={item.piece}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.piece}
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
          {/* <SectionList
            renderItem={({ item, index, section }) => (
              <Text key={index}>{item}</Text>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={{ fontWeight: "bold" }}>{title}</Text>
            )}
            sections={[
              { title: "Title1", data: ["item1", "item2"] },
              { title: "Title2", data: ["item3", "item4"] },
              { title: "Title3", data: ["item5", "item6"] },
              {
                title: "Title4",
                data: ["item5", "item6"]
              }
            ]}
            keyExtractor={(item, index) => item + index}
          /> */}
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
  }
});
