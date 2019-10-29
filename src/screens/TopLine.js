import React, { Component } from 'react';
import {View,Image, StyleSheet,SafeAreaView} from 'react-native';
import CommonStyles from '../styles/CommonStyles';
import TopBar from '../components/TopLine/TopBar'
import Article from '../components/TopLine/Article'
let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
export default class TopLine extends Component {
    constructor(props) {
        super(props);
        this.state={
            curType:'头条资讯'
        }
    }
    static navigationOptions = {
        tabBarLabel: '头条',
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={CommonStyles.tabBarIcon} source={require('../imgs/top_act.png')}/>
                );
            }
            return (
                <Image style={CommonStyles.tabBarIcon} source={require('../imgs/top_grey.png')}/>
            );
        },
    };
    typeChange(type) {
        this.setState({
            curType:type
        })
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TopBar changeType={this.typeChange.bind(this)} style={{position:'relative',zIndex:100,}}></TopBar>
                <Article  goDetail={this.props}  type={this.state.curType}></Article>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        flex:1
    }
});