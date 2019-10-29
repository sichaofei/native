import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SwipeListView ,SwipeRow} from 'react-native-swipe-list-view';
import Toast, {DURATION} from 'react-native-easy-toast'
import {View, Text, Image, StyleSheet,FlatList,Dimensions,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import NetUtil from '../utils/NetUtil';
import CommonStyles from '../styles/CommonStyles';
let {width, height} = Dimensions.get('window');

class LoginNum extends Component{
    static navigationOptions = {
        headerTitle: '连续登录'
    };
    constructor(props){
        super(props)
        this.state={
           list:[],
           day:0,
        }
    }
    componentDidMount(){
        this.getloginnum()
    }
//   获取登录天数
getloginnum(){
    let userId=this.props.user.userId
    NetUtil.post("/api/opencar/task/continuousLogin",{userId})
    .then((res)=>{
        // console.log(res)
        // alert(JSON.stringify(res))
        if(res.code==0){
            let num=0
            let list=res.data.ContinuousLoginList
                for(var a=0;a<list.length;a++){
                    if(list[a].continuousLogin==1){
                     num+=1
                    }
                }
                this.setState({
                    list:list,
                    day:num-1,
                    carnum:list[num-1].cartokenNum
                })  
        }
    })
    
}
    render(){
        let day=this.state.day
        padding=(day+1)*15
        return(
            <View style={[CommonStyles.container]}>
               <View style={styles.loginNumCon}>
                {this.state.list.map((item,index)=>{
                    return(
                        <View style={[styles.numbox,index<=day?styles.numboxo:'']}>
                            <View style={[styles.border,index==day?styles.borderno:'']}><Text style={[styles.num,index==day?styles.numBig:'']}>{index+1}天</Text></View>
                        </View>
                    )
                })}
               </View>
               <View style={styles.carBi}>
                   {this.state.list.map((item,index)=>{
                       return(
                           index==day?<View style={{justifyContent:"center",alignItems:"center",paddingLeft:padding }}>
                                        <Image style={{marginTop:20,marginBottom:20}} source={require("../imgs/loginjian.png")}></Image>
                                        <Text style={styles.carbinum}>+{item.cartokenNum}Car币</Text>
                                     </View>
                          
                           :<Text style={{justifyContent:"center",alignItems:"center",paddingLeft: 30}}></Text>
                       )
                   })}
               </View>
               <View style={styles.loginTextBox}>
                   <View><Text style={styles.loginTExt}>说明:</Text></View>
                   <View style={{marginTop:10,marginBottom:10}}><Text style={styles.loginTExt}>Car币将在第3天和第7天统一发放;</Text></View>
                   <View><Text style={styles.loginTExt}>若有一天未登录，再次登录时，连续登录的天数会重新计算。</Text></View>
               </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    loginNumCon:{
        width:600,
        height:98,borderRadius: 100,
        marginLeft: 75,
        backgroundColor: "#B1F4C0",
        marginTop: 122,
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
        overflow:"hidden"
    },
    num:{
        height:40,
        lineHeight:40,
        textAlign: "center",
        fontSize: 20,
        color:"white",
    },
    numbox:{
        height:98,
        lineHeight:98,
        flex:1,
         justifyContent:"center"
    },
    numboxo:{
        backgroundColor:"#1BC787"
    },
    numBig:{
        fontSize:36
    },
    border:{
        borderRightColor: "white",borderRightWidth: 1
    },
    borderno:{
        borderRightWidth: 0
    },
    carBi:{
        width:600,
        marginLeft: 75,
        flexDirection:"row",
        justifyContent:"space-around"
    },
    carbinum:{
        color:"#1BC787",
        fontSize:28,
        fontWeight:"500",
    },
    loginTExt:{
        color:"#9B9B9B",
        fontSize:26
    },
    loginTextBox:{
        width:570,
        borderStyle: "dotted",
        borderColor: "#979797",
        borderWidth:1,
        marginLeft:90,
        marginTop:180,
        padding:55,
        borderRadius:10
    }

})
const mapStateToProps = state => ({
    user: state.user
  })
  export default connect(mapStateToProps)(LoginNum);