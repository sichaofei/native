import React from 'react';
import {View, Text, AsyncStorage, StyleSheet, TouchableOpacity, Image} from 'react-native';

import BaseComponent from '../components/BaseComponent';
import CommonStyles from '../styles/CommonStyles';

export default class Logon extends BaseComponent {
    static navigationOptions = {
        headerTitle: '登录'
    };
    componentDidMount() {
        AsyncStorage.setItem('UserId', '1')
    }
    render() {
        return (
            <View style={CommonStyles.container}>
                <Image source={require('../imgs/login-bg.png')} style={{width: 750, height:486}}/>
                <View style={styles.loginBg}>
                    <Text style={styles.loginText}>一键登录</Text>
                    <TouchableOpacity style={styles.loginBtn}><Image source={require('../imgs/weixin.png')} style={styles.loginImage}></Image></TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    loginBg: {
        width: 750,
        height: 670,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginText: {
        fontFamily: 'PingFangHK-Light',
        fontSize: 32,
        color: '#000000',
    },
    loginBtn: {
        width: 100,
        height: 100,
        borderRadius: 50,
        padding: 0,
        marginTop: 100,
    },
    loginImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    }
});