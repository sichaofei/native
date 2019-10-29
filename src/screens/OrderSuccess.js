import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SwipeListView ,SwipeRow} from 'react-native-swipe-list-view';
import Toast, {DURATION} from 'react-native-easy-toast'
import {View, Text, Image, StyleSheet,FlatList,BackHandler,Platform,Dimensions,TouchableOpacity} from 'react-native';
import NetUtil from '../utils/NetUtil';
import CommonStyles from '../styles/CommonStyles';
let {width, height} = Dimensions.get('window');

class OrderSuccess extends React.Component{
    static navigationOptions = ({navigation}) =>({
        headerTitle: '兑换成功',
        headerLeft:(
            <TouchableOpacity  onPress={()=>navigation.state.params.navigatePress()}>
                <Text style={{fontSize:16,paddingLeft:15}}>返回</Text>
            </TouchableOpacity>
        ),
    });
    constructor(props){
        super(props)
        this.state={
          
        }
    }
    componentDidMount(){
       
    }
    _onBackAndroid=()=>{
        this.props.navigation.navigate('Product')
        return true
    }

    componentWillMount(){
        this.props.navigation.setParams({ navigatePress:this._onBackAndroid })
        if (Platform.OS === 'android') {
            BackHandler.addEventListener("navigatePress", this._onBackAndroid);
        }
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener("navigatePress", this._onBackAndroid);
        }
    }
    //    返回商城
    goShop(){
        this.props.navigation.navigate("Product")
    }
    render(){
        return(
            <View style={[CommonStyles.container]}>
                <View style={styles.dhSuccesss}>
                    <Image style={{marginTop:188}} source={require("../imgs/dhsuccess.png")}></Image>
                    <Text style={{color:"#333333",margin:120,fontSize:34}}>恭喜兑换成功</Text>
                    <TouchableOpacity onPress={this.goShop.bind(this)}>
                        <View style={styles.backShaudes}><Text style={{color:"#1BC787",fontSize:32}}>返回商城</Text></View>
                    </TouchableOpacity>
                </View>  
            </View>
        )
    }
}
const styles = StyleSheet.create({
    dhSuccesss:{
        alignItems:"center",
        width:750,
    },
    backShaudes:{
        width:600,
        height:98,
        borderWidth:1,
        borderColor:"#1BC787",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: 'center',
    }

})
const mapStateToProps = state => ({
    user: state.user
  })
  export default connect(mapStateToProps)(OrderSuccess);