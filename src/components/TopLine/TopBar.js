import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let tabText = ['头条资讯','开心一刻','好品优选'];
export default class TopBar extends Component {
    constructor(props){
        super(props);
        this.state={
            curIndex:0
        }
    }
    tip(index){
        if(index>1){
            index=0
            this.setState({
                curIndex:0,
            })
        }else{
            this.setState({
                curIndex:index,
            })
        }
        this.props.changeType(tabText[index]);
        
    }
    render() {
        return (
            <SafeAreaView style={styles.TopLineTabContainer}>
                <View
                        style={styles.scrollArea}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        bounces={false}
                    >
                    {
                        tabText.map((item,index)=>{
                            return (
                                <TouchableOpacity style={styles.nav}  key={index} onPress={()=>{this.tip(index)}}>
                                    <View
                                        style={this.state.curIndex==index?styles.scrollActiveItem:styles.scrollItem}
                                        >
                                        <Text style={this.state.curIndex==index?styles.scrollActiveText:styles.scrollText}>{item}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    TopLineTabContainer:{
        backgroundColor:'#fff',
        position:'relative',
        zIndex:1000,
        top:0,
        left:0,
        width:width  
    },
    scrollArea: {
        width:width,
        position:'absolute',
        top:0,
        left:0,
        zIndex:1000,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#fff',
        textAlign:'center',
        flex:1
    },
    nav:{
        width:0.33*width,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center'
    },
    scrollItem:{
        width:56,
        textAlign:'center',
        paddingTop:8,
        paddingBottom:8,
        marginLeft:'auto',
        marginRight:'auto'
    },
    scrollActiveItem:{
        textAlign:'center',
        width:56,
        paddingTop:8,
        paddingBottom:6,
        marginLeft:'auto',
        marginRight:'auto',
        borderBottomWidth:2,
        borderColor:'#67d565',
    },
    scrollText:{
      fontFamily: 'PingFangSC-Medium',
      fontSize: 14,
      color: '#333',
      textAlign:'center',
    },
    scrollActiveText:{
      fontFamily: 'PingFangSC-Medium',
      fontSize: 14,
      color: '#1BC787',
      textAlign:'center',
    }
});