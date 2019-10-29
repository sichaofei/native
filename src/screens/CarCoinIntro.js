import React, { Component } from 'react';
import Toast, {DURATION} from 'react-native-easy-toast'
import {Text,StyleSheet,TouchableOpacity,ScrollView,SafeAreaView,Clipboard} from 'react-native';
import size, {ptd} from '../styles/SizeHelper.js';
export default class CarCoinIntro extends Component{
    constructor(props) {
        super(props);
        this.state={
           copyEmail:'service@chetuobang.com'
        }
    }
    static navigationOptions = {
        headerTitle: 'Car币收入说明'
    };
    copy(){
        Clipboard.setString(this.state.copyEmail);
        this.refs.toast.show('复制成功');
    }
    render(){
        return(
            <SafeAreaView  style={{flex:1}}>
                <ScrollView style={styles.intro}>
                    <Text style={styles.title}>
                        什么是文章car币收入？
                    </Text>
                    <Text style={styles.content}>
                        “文章car收入”是平台根据每篇文章的阅读量、点赞量、分享量、评论量等，综合数值给予文章创作者的car币奖励。
                    </Text>
                    <Text style={styles.title}>
                        如何成为文章创作者？
                    </Text>
                    <Text style={styles.content}>
                        如果您想成为文章创作者，可以预先准备一篇相关文章或视频，发给我们工作人员进行审核，审核通过即可获得创作资格！审核方式，发送邮箱service@chetuobang.com，附上您的作品、联系方式、微信号，我们看到后会第一时间与您联系！
                    </Text>
                    <TouchableOpacity style={styles.copyBtn} onPress={this.copy.bind(this)}>
                        <Text style={styles.btnText}>复制邮箱</Text>
                    </TouchableOpacity>
                    <Toast 
                        ref="toast"
                        style={{padding:ptd(20)}} 
                        position='center'
                        textStyle={{fontSize:ptd(28),color:'#fff'}}
                    />
                </ScrollView>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
   intro:{
       paddingHorizontal:ptd(60),
       paddingTop:ptd(30),
       paddingBottom:ptd(60)
   },
   title:{
        fontFamily:'PingFangHK-Medium',
        fontSize:ptd(32),
        color:'#333333',
        marginBottom:ptd(60)    
   },
   content:{
        fontFamily:'PingFangHK-Light',
        fontSize:ptd(32),
        color:'#333333',    
        marginBottom:ptd(60),
        lineHeight:ptd(60)    
   },
   copyBtn:{
        backgroundColor:'#1BC787',
        shadowColor: 'rgb(213,213,213)',
        shadowOffset: {width: 0,height: 14},
        shadowOpacity: .5,
        shadowRadius: 14,
        borderRadius:ptd(100),
        marginVertical:ptd(100),
        textAlign:'center',
        width:ptd(600),
        height:ptd(98),
        lineHeight:ptd(98),    
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
   },
   btnText:{
        fontFamily:'PingFangTC-Medium',
        fontSize:ptd(32),
        color:'#FFFFFF',
   }
})
