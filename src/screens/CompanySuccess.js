import React, { Component } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image,SafeAreaView,TextInput,KeyboardAvoidingView} from 'react-native';
import size, {ptd} from '../styles/SizeHelper.js';
export default class CompanySuccess extends Component {
    static navigationOptions = {
        headerTitle: '合作成功'
    };
    state = { 

    }
    goServerList(){
        this.props.navigation.navigate('serviceList')
    }
    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <View style={styles.mainContainer}>
                    <Image style={styles.icon} source={{uri:'https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/mini-biyong/partSuccess.png'}}></Image>
                    <Text style={styles.tip}>很荣幸收到您的合作申请，</Text>
                    <Text style={styles.tip}>我们会尽快与您取得联系。</Text>
                    <TouchableOpacity onPress={this.goServerList.bind(this)} style={styles.btn}>
                        <Text style={styles.btnText}>返回发现页</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    mainContainer:{
        paddingTop: ptd(166),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    icon:{
        width: ptd(200),
        height: ptd(268),
        marginBottom:ptd(90)
    },
    tip:{
        textAlign: 'center',
        fontFamily: 'PingFangHK-Light',
        fontSize: ptd(34),
        color: '#333333',
        letterSpacing: 0,
        lineHeight: ptd(48),
    },
    btn:{
        width: ptd(600),
        height: ptd(98),
        lineHeight: ptd(98),
        borderWidth: 1,
        borderColor:'#1BC787',
        borderRadius: ptd(100),
        textAlign: 'center',
        marginTop: ptd(102),
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        fontFamily: 'PingFangTC-Medium',
        fontSize: ptd(32),
        color: '#1BC787',
        letterSpacing: ptd(2.51),
    }
});