import React, { Component } from 'react';
import {View, Text, Image, StyleSheet,FlatList,Dimensions,AsyncStorage,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import NetUtil from '../utils/NetUtil';
import {ptd} from '../styles/SizeHelper.js';
let {width, height} = Dimensions.get('window');
class FirstLogin extends Component{
        state={
           show:false,
           day:0,
           list:[],
           carnum:0
        }
    
    componentDidMount(){
        
    }
    detail(id){
            this.getlogin(id)
    }
    getlogin(id){
        NetUtil.post("/api/opencar/task/continuousLogin",{userId:id})
        .then((res)=>{
            let num = 0
            let list = res.data.ContinuousLoginList
            for (var a = 0; a < list.length; a++) {
              list[a].isshow = false
              if (list[a].continuousLogin === 1) {
                num += 1
              }
            }
            list[num - 1].isshow = true
            console.log(list)
            console.log(num)
            this.setState({
              list: list,
              day: num,
              carnum: list[num - 1].cartokenNum,
              show:true
            })
        })
    }
    hideLogin(){
        this.setState({
            show:false
        })
        this.props.hide()
    }
    render(){
        let {list,day,carnum}=this.state
        return(
            <View style={styles.fixedBox}>
                    {this.state.show==true?<View style={styles.fixedCon}>
                                <View style={styles.firstLogin}>
                                <Text style={{color:"#333333",fontSize:ptd(34),textAlign:"center",paddingTop: ptd(60),}}>恭喜你已连续登录<Text style={{color:"#1BC787"}}>{day}</Text>天</Text>
                                <Image style={{width:ptd(194),height:ptd(139),marginBottom:ptd(40),marginTop:ptd(40)}} source={require("../imgs/renwucha_hq.png")}></Image>
                                <View style={{flexDirection:"row",marginBottom:ptd(40)}}><Text>共奖励Car币<Text>{carnum}</Text><Text>个,</Text></Text><Text>{list[day-1].describe}</Text></View>
                                <TouchableOpacity onPress={()=>this.hideLogin()}><Text style={styles.konw}>知道了</Text></TouchableOpacity>
                            </View>
                    </View>:<Text></Text>}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    fixedCon:{
        width:ptd(750),
        height:height,
        backgroundColor:"rgba(0,0,0,0.6)",
       
    },
    firstLogin:{
        width:ptd(670),
        height:ptd(550),
        backgroundColor:"white",
        position:"absolute",
        left:ptd(40),
        top:ptd(390),
        borderRadius: ptd(20),
        position:"relative",
        alignItems: 'center',
    },
    fixedBox:{
        position:"absolute",
        left:0,
        top:0
    },
    konw:{
        width:ptd(360),
        height:ptd(98),
        textAlign:"center",
        lineHeight:ptd(98),
        borderWidth: ptd(1),
        borderColor: "#1BC787",
        borderRadius:ptd(50)
    }
})

export default FirstLogin;