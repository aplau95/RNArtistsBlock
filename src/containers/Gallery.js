import React, { Component } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView
} from "react-native";

export class Gallery extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <SectionList
            renderItem={({ item, index, section }) => (
              <Text key={index}>{item}</Text>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={{ fontWeight: "bold" }}>{title}</Text>
            )}
            sections={[
              { title: "Title1", data: ["item1", "item2"] },
              { title: "Title2", data: ["item3", "item4"] },
              { title: "Title3", data: ["item5", "item6"] }
            ]}
            keyExtractor={(item, index) => item + index}
          />
        </View>
      </SafeAreaView>
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
  backgroundImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
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
