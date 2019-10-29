import React, { Component } from 'react';
import { connect } from 'react-redux';
import {logout} from '../redux/loginAction'
import { SwipeListView ,SwipeRow} from 'react-native-swipe-list-view';
import Toast, {DURATION} from 'react-native-easy-toast'
import {View, Text, Image, StyleSheet,FlatList,Dimensions,AsyncStorage,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import NetUtil from '../utils/NetUtil';
import CommonStyles from '../styles/CommonStyles';
let {width, height} = Dimensions.get('window');

class Setting extends Component{
    static navigationOptions = {
        headerTitle: '账户设置'
    };
    constructor(props){
        super(props)
        this.state={
            url:[
                "AddressList",
                "Aboutus"
            ],
            phone:'',
            version:''
        }
    }
    componentDidMount(){
        this.getsetmsg()
    }
     // 获取用户设置信息
     getsetmsg(){
         let userId=this.props.user.userId
        NetUtil.post("/api/opencar/user/settings",{
            userId,
            appType:"2"
        })
        .then(res=>{
            console.log(res)
            if(res.code==0){
                this.setState({
                   phone: res.data.userMobile,
                   version:res.data.appVersion.curVersionName
                })
              
            }
        })
      
    }
    // 退出登录
    goout(){
        this.props.logout()
        this.props.navigation.navigate("Bind") 
        // 删除本地存储
        AsyncStorage.removeItem("userId")
        AsyncStorage.removeItem("phone")
    }
    go(index){
        if(index==2){
            return
        }
        this.props.navigation.navigate(this.state.url[index],{editaddress:0})
    }
    render(){
        return(
            <View style={[CommonStyles.container,styles.con]}>
                <View style={styles.sethead}>
                        <View style={styles.list}>
                            <Text style={styles.text}>当前帐号</Text>
                            <Text style={styles.to}>{this.state.phone}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.go(0)}>
                            <View style={styles.list}>
                                <Text style={styles.text}>收货地址</Text>
                                <Text><Image source={require("../imgs/more.png")}></Image></Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.go(2)}>
                            <View style={styles.list}>
                                <Text style={styles.text}>版本号</Text>
                                <Text style={styles.to}> <Text>{this.state.version}</Text> <Image source={require("../imgs/more.png")}></Image></Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.go(1)}>
                            <View style={[styles.list,styles.borderno]}> 
                                <Text style={styles.text}>关于我们</Text>
                                <Text><Image source={require("../imgs/more.png")}></Image></Text>
                            </View>
                        </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>this.goout()}>
                    <View style={styles.goout}>
                        <Text style={styles.goouttxt}>退出登录</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    list:{
        width:630,
        height:105,
        marginLeft: 60,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        borderBottomColor:"#D8D8D8",
        borderBottomWidth: 1,
    },
    con:{
        backgroundColor:"#F3F4F5"
    },
    text:{
        fontSize:32,
        color:"#333333"
    },
    to:{
        color:"#9B9B9B",
        fontSize:28,
        flexDirection:"row",
        alignItems: 'center',
    },
    sethead:{
        backgroundColor:"white"
    },
    borderno:{
        borderBottomWidth: 0,
    },
    goout:{
        marginTop:20,
        height:98,
        width:750,
        backgroundColor:"white",
        alignItems:"center",
        justifyContent:"center"
    },
    goouttxt:{
        color:"#333333",
        fontSize:32
    }

})
const mapStateToProps = state => ({
    user: state.user
  })
  const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
})
  export default connect(mapStateToProps,mapDispatchToProps)(Setting);