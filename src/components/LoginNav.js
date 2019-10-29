import React, { Component } from 'react';
import size, {ptd} from '../styles/SizeHelper.js';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

class LoginNav extends Component {
    state = { 
        show: false
    }
    showLogin() {
        this.setState({
            show: true
        })
    }
    hideLogin() {
        this.setState({
            show: false
        })
    }
    render() {
        let view = <View></View>;
        if(this.state.show) {
            view = <View style={styles.mask}>
                        <View style={styles.loginPopup}>
                            <Text style={styles.loginTitle}>您还未登录</Text>
                            <Text style={styles.loginSubtitle}>请先登录后再进行操作</Text>
                            <Image style={styles.loginPbg} source={require('../imgs/login-popup.png')}></Image>
                            <View style={styles.loginBtns}>
                                <TouchableOpacity style={styles.loginBtn}
                                    onPress={()=>{
                                        this.hideLogin()
                                    }}>
                                    <Text style={styles.loginBtnTxt}>暂不登录</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.loginBtnBlue}
                                    onPress={()=>{
                                        this.props.navigation.navigate('Bind', {prev: this.props.prev, wid: this.props.wid});
                                    }}>
                                    <Text style={styles.loginBtnBlueTxt}>立即登录</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>;
        }
        
        return (
               view 
        );
    }
}

const styles = StyleSheet.create({
    mask: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        position: 'absolute',
        width: ptd(750),
        height: size.height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginPopup: {
        backgroundColor: '#FFFFFF',
        borderRadius: ptd(20),
        paddingTop: ptd(50),
        paddingHorizontal: ptd(100),
        paddingBottom: ptd(40),
        position: 'absolute',
        top: ptd(500),
        width: ptd(670),
        alignItems: 'center',
    },
    loginTitle: {
        fontSize: ptd(34),
        color: '#333333',
    },
    loginSubtitle: {
        fontSize: ptd(24),
        color: '#B5B5B5',
        marginTop: ptd(14),
        marginBottom: ptd(80),
    },
    loginPbg: {
        width: ptd(208),
        height: ptd(140),
        marginBottom: ptd(90),
    },
    loginBtns: {
        flexDirection: 'row',
    },
    loginBtn: {
        width: ptd(235),
    },
    loginBtnBlue: {
        width: ptd(235),
        borderLeftColor: '#CCCCCC',
        borderLeftWidth: 1,
    },
    loginBtnBlueTxt: {
        height: ptd(48),
        lineHeight: ptd(48),
        fontSize: ptd(34),
        textAlign: 'center',
        color: '#1BC787',
    },
    loginBtnTxt: {
        height: ptd(48),
        lineHeight: ptd(48),
        fontSize: ptd(34),
        color: '#B5B5B5',
        textAlign: 'center',
    }
});
export default LoginNav;