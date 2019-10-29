import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SwipeListView ,SwipeRow} from 'react-native-swipe-list-view';
import Toast, {DURATION} from 'react-native-easy-toast'
import {View, Text,ScrollView, Image, StyleSheet,FlatList,Dimensions,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import NetUtil from '../utils/NetUtil';
import CommonStyles from '../styles/CommonStyles';
import {create} from '../styles/StyleSheet.js';
let {width, height} = Dimensions.get('window');

class Setting extends Component{
    static navigationOptions = {
        headerTitle: '关于我们'
    };
    render(){
        return(
            <View style={[CommonStyles.container,styles.conAboutus]}>
            <ScrollView style={{flex:1}}>
                <View style={{alignItems:"center",width:750,marginTop:80,marginBottom:80}}><Image style={{width:150,height:150,}} source={require("../imgs/logo2.png")}></Image></View>
                
                <View style={styles.aboutus}><Text style={[styles.aboutText,styles.abouthead]}>【公司介绍】</Text></View>
                <View style={styles.aboutus}><Text style={[styles.aboutText]}>车托帮成立于2012年6月，是国
                内优选的基于地图导航技术的车主出行共享社区。旗下拥有微路况(1500万粉丝)查违章、电子狗、
                    帮买买等，业务形式涵盖公众号矩阵、小程序矩阵、全平台矩阵、APP、微信社群，提供內容资讯、违章查询、车后市场服务、电商服务等。现拥有2500万车主用户，
                    全网覆盖1亿车主。车托帮通过整合传统汽车企业、汽车周边软硬件服务商、汽车后服务市场等领域的资源，凭借多年的技术和资深的运营，使产品技术的创新改变传统驾驶方式，
                    把互联网渗透到传统汽车领域中，充分利用城市道路资源，解决车主岀行问题，实现真正的智慧生活。</Text></View>
                <View style={styles.aboutus}><Text style={[styles.aboutText,styles.abouthead]}>【开车币用】</Text></View>
                <View style={styles.aboutus}><Text style={[styles.aboutText]}>平台已涵盖的业务范围包括：查违章、缴纳违章、保险、洗车、加油、保养、内容资讯等车主刚需的综合性服务应用，其中Car币作为您的数据资产，
                    将会覆盖至全平台，我们将构建一个集“娱乐+消费+车辆”于一体的数字世界，未来将会切入到线下车主所到之处的使用场景，让您的每一次出行都拥有价值。</Text></View>
                <View style={styles.aboutus}><Text style={[styles.aboutText,styles.abouthead]}>【产品使用问题】</Text></View>
                <View style={styles.aboutus}><Text style={[styles.aboutText]}>如果您在使用产品时遇到任何问题可以发送邮件：lizhi.gan@chetuobang.com</Text></View>
                <View style={styles.aboutus}><Text style={[styles.aboutText,styles.abouthead]}>【商务合作问题】</Text></View>
                <View style={styles.aboutus}><Text style={[styles.aboutText]}>“好赚商城”、“车主服务”板块正火热招募合作伙伴中，如果您觉得产品与平台非常契合，
                    请您立刻、马上、现在联系我们：lidan.yang@chetuobang.com</Text></View>
                    <View style={styles.aboutus}><Text style={[styles.aboutText,styles.abouthead]}></Text></View>
                <View style={styles.aboutus}><Text style={[styles.aboutText]}>公司官网:https://www.chetuobang.com/</Text></View>
                </ScrollView>
            </View>
        )
    }
}
const styles = create({
    aboutus:{
        width:630,
        marginLeft: 60,
       
    },
    android:{
        backgroundColor: '#f8f8f8',
    },
    conAboutus:{
        paddingBottom: 220,
    },
    aboutText:{
       color:"#333333",
       fontSize: 32 
    },
    abouthead:{
        marginTop:30,
        marginBottom: 40,
        fontWeight: "600"
    }
})
   
const mapStateToProps = state => ({
    user: state.user
  })
  export default connect(mapStateToProps)(Setting);