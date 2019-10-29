import React, { Component } from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';

export default class Violate extends Component {
    state = {  }
    render() {
        const userId = this.props.userId
        console.log(userId)
        return (
            <View>
                <Text>{this.props.userId}您有N条违章信息</Text>
            </View>
        );
    }
}