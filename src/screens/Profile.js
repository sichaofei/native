import React, { Component } from 'react';
import { NavigationEvents } from 'react-navigation';
import {View, Text, Image, StyleSheet,AsyncStorage,ImageBackground,ScrollView,Platform,TouchableOpacity} from 'react-native';
let Dimensions = require('Dimensions');
import { connect } from 'react-redux';
import BaseComponent from '../components/BaseComponent';
import CommonStyles from '../styles/CommonStyles';
import {create} from '../styles/StyleSheet.js';
let {width, height} = Dimensions.get('window');
 class Profile extends BaseComponent {
    constructor(props){
        super(props)
        this.state={
            list:[
                {name:"Car币记录",img:require('../imgs/carbijilu.png')},
                {name:"购物记录",img:require('../imgs/gouwujilu.png')},
                {name:"我的车库",img:require('../imgs/wodecheku.png')},
                {name:"我的评论",img:require('../imgs/mypinglun.png')},
                {name:"我的设置",img:require('../imgs/shezhi.png')}
            ],
            navigation:[
                "Carbihistory",
                "Shophistory",
                "MyCars",
                "DiscussList",
                "Setting"
            ],
            show:false,
        }
    }
    static navigationOptions = {
        tabBarLabel: '我的',
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={CommonStyles.tabBarIcon} source={require('../imgs/my_act.png')}/>
                );
            }
            return (
                <Image style={CommonStyles.tabBarIcon} source={require('../imgs/my_grey.png')}/>
            );
        },
    };
    // 跳转我的详情
    tomydetail(index){
        this.props.navigation.navigate(this.state.navigation[index])
    }
    ifyo(){
        if(this.props.user.userId){return}
        this.props.navigation.navigate("Bind",{prev:"Profile"})
    }
 componentWillUnmount(){

};
    render() {
        // const {login} = this.props;
        return (

           <ScrollView>
                        <NavigationEvents
      onWillFocus={()=>this.ifyo()}
    />
            <View style={[styles.container]}>
    
        <View style={CommonStyles.container}>
             <ImageBackground style={[styles.my]} source={require("../imgs/home-bg.png")}>
                            <View >
                                {this.props.user.avatar?<Image style={styles.myimg} source={{uri:this.props.user.avatar}} />:<Image style={styles.myimg} source={require('../imgs/my_act.png')} />}
                                
                            </View>
                            <View>
                                <Text style={styles.myname}>{this.props.user.nickName}</Text><Text style={styles.mytext}>正式居民</Text>
                            </View>
                </ImageBackground>
                <View style={styles.con}>
                    {this.state.list.map((item,index)=>{
                        return(
                    <TouchableOpacity key={index} onPress={()=>this.tomydetail(index)}>
                    <View style={[styles.mycon,styles.bg]}>
                         <View style={styles.mycon1}><Image source={item.img} style={styles.imgleft} /><Text style={styles.conname}>{item.name}</Text></View>
                        <View><Image style={styles.myrightimg} source={require('../imgs/myright.png')} /></View>
                    </View>
                        
                    </TouchableOpacity>
                        )
                    })}
                </View>
             </View>

            
            </View>
            </ScrollView>
        );
    }
}
const styles = create({
    my:{
        width:750,
        height:400,
        paddingLeft:15,
        flexDirection: 'row',
        color:"red",
        alignItems: "center"
    },
    bg:{
        android:{
            backgroundColor: '#f8f8f8',
        }
    },
    container:{
        height:height,
    },
    myname:{
        fontFamily:"PingFangSC-Medium",
        fontSize: 20,
        color:"white"
    },
    mytext:{
        fontFamily:"PingFangSC-Medium",
        fontSize: 24,
        color:"white",
       
    },
    myrightimg:{
        marginRight:20,
        width:40,
        height:13,
    },
    myimg:{
        width:140,
        height:140,
        borderRadius:35,
        marginRight:20,
    },
    myhead:{
      
    },
    imgleft:{
    width:80,
    height:80,
    },
    con:{
        width:670,
        marginTop:-32,
        marginLeft:40,
        paddingBottom: 200,
        alignItems:"center",
        zIndex:1000,
    },
    mycon:{
        flexDirection: 'row',
        width:670,
        height:128,
        alignItems:"center",
        justifyContent: "space-between",
        marginBottom:25,
        shadowColor:"rgb(138,138,138)",
        backgroundColor: "#FFFFFF",
        shadowOpacity:0.1,
        shadowOffset:{width: 0,height: 14},
        shadowRadius:7,
        borderRadius:3,
    },
    mycon1:{
        flexDirection: 'row',
        alignItems:"center",
    },
    conname:{
        fontFamily:"PingFangSC-Medium",
        fontSize: 24,
        color: "#4A4A4A",
        marginLeft: 20,
      
    }
});
const mapStateToProps = state => ({
    user: state.user
})
export default connect(mapStateToProps)(Profile);