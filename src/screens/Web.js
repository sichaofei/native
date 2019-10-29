import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default class WebComponent extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <WebView
        source={{ uri:  navigation.getParam("url")}}
        // source={{uri: 'http:baidu.com'}}
        style={{ marginTop: 20 }}
      />
    );
  }
}