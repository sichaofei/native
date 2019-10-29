import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, Text,StyleSheet,TouchableOpacity,Image} from 'react-native';
import CommonStyles from '../styles/CommonStyles';
import size, {ptd} from '../styles/SizeHelper.js';
import {create} from '../styles/StyleSheet.js';
import NetUtil from '../utils/NetUtil';
 class ArticleRead extends Component{
    static navigationOptions = {
        headerTitle: '文章阅读'
    };
    constructor(props){
        super(props)
        this.state={
            coinNum:0,
            readNum:0
        }
    }
    componentDidMount(){
       this.getList()
    }
    getList(num){
        this.setState({
            loading:true,
            footer:"加载中....",
        })
        let userId=this.props.user.userId
        NetUtil.post("/api/info/opencar/readQuery",{userId:userId})
        .then(res=>{
          console.log(res)
          if(res.code=="0"){
            this.setState({
                coinNum:res.data.Read.cartoken,
                readNum:res.data.Read.readNum
            })
          }
        })
    }
    goList(){
        this.props.navigation.navigate('TopLine');
    }
    render(){
        return(
            <View style={[CommonStyles.container,styles.bg,styles.border]}>
                <View style={styles.readContianer}>
                    <View style={styles.mainBox}>
                        <Image style={styles.book} source={require('../imgs/yuedu_hq.png')}></Image>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>今日已阅读 </Text><Text style={styles.num}>{this.state.readNum}</Text><Text style={styles.titleText}> 篇</Text>
                        </View>
                    </View>
                    <View style={styles.rule}>
                        <View style={styles.list}><Text style={styles.listText}>阅读1篇文章20秒以上，奖励{this.state.coinNum}币</Text></View>
                        <View style={styles.list}><Text style={styles.listText}>每天可获得2次奖励</Text></View>
                        <View style={styles.list}><Text style={styles.listText}>一天内重复浏览相同文章无效</Text></View>
                    </View>
                    <TouchableOpacity style={styles.readBtn} onPress={this.goList.bind(this)}>
                        <View><Text style={styles.btnText}>去阅读</Text></View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = create({
    readContianer:{
        width:750,
        height:size.height,
        paddingLeft:40,
        paddingRight:40,
        position:'relative',
        display:'flex',
        alignItems:'center'
    },
    bg:{
        android:{
            backgroundColor: '#f8f8f8',
        }
    },
    border:{
        android:{
            borderColor:'#d8d8d8',
            borderWidth:ptd(1)
        }
    },
    mainBox:{
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingTop: 72,
        paddingBottom:70,
        marginTop: 40,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor:'#FFFFFF',
        shadowColor: 'rgb(213,213,213)',
        shadowOffset: {width: 0,height: 20},
        shadowOpacity: .5,
        shadowRadius: ptd(20),
        borderRadius:ptd(20),
        borderColor:'#d8d8d8',
        width:640
      },
    book:{
        width: 150,
        height: 134,
        marginBottom: 68,
    },
    title:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    titleText:{
        fontFamily: 'PingFangHK-Medium',
        fontSize: 48,
        color: '#333333',
        letterSpacing: 2,
        lineHeight: 67,
    },  
    num:{
        fontFamily: 'PingFangHK-Medium',
        fontSize: 48,
        color:  '#1BC787',
        letterSpacing: 2,
        lineHeight: 67,
    },
    rule:{
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginTop: 40,
        backgroundColor:'#FFFFFF',
        shadowColor: 'rgb(213,213,213)',
        shadowOffset: {width: 0,height: 20},
        shadowOpacity: .5,
        shadowRadius: ptd(20),
        borderRadius:ptd(20),
    },
    list:{
        paddingTop:30,
        paddingBottom:30,
        paddingLeft:20,
        paddingRight:20,
        borderBottomWidth:1,
        borderColor:'#e5e5e5',
        width: 750*0.83,
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    listText:{
        fontFamily: 'PingFangSC-Regular',
        fontSize: 28,
        color: '#333333',
        letterSpacing: 1.56,
        lineHeight: 40,
    },
    readBtn :{
        backgroundColor:'#1BC787',
        borderRadius: 98,
        width: 750*0.8,
        height: 98,
        lineHeight: 98,
        textAlign: 'center',
        // position: 'absolute',
        // bottom: 500,
        // left: 750*0.1,
        marginTop:60,
        display:'flex',
        justifyContent:'center',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        alignItems:'center'
    },
    btnText:{
        color: '#fff',
        fontFamily: 'PingFangTC-Medium',
        fontSize: 32,
        letterSpacing: 2.51,
    }      
});
export default connect(state=>{
    return {
        user:state.user,
    }
})(ArticleRead);