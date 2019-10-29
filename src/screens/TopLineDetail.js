import React, { Component } from 'react';
import {View, StyleSheet,SafeAreaView,BackHandler,Platform,TouchableOpacity,Text} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import LoginNav from '../components/LoginNav.js';
import { WebView } from "react-native-webview";
import { connect } from 'react-redux'
import size, {ptd} from '../styles/SizeHelper.js';
import NetUtil from '../utils/NetUtil';
class TopLineDetail extends Component {
    static navigationOptions = {
        headerTitle: '文章详情'
    };
    constructor(props) {
        super(props);
        this.state={
            startTime:new Date().getTime(),
            wid:this.props.navigation.state.params.wid,
            goUrl:`https://wzcx.chetuobang.com/article/articleDetailRN.html?userId=${this.props.user.userId?this.props.user.userId:''}&date=${new Date().getTime()}&id=${this.props.navigation.state.params.wid}`
        }
    }
    componentDidMount(){
      
    }
    componentWillUnmount() {
        if(!this.props.user.userId){
			return true;
		}
        let readDuration = parseInt((new Date().getTime() - this.state.startTime) / 1000);
        NetUtil.post('/api/info/opencar/readStatistics',{
            newsId: this.props.navigation.state.params.wid,
            readDuration: readDuration, 
            whetherAddHistory: 1,
            userId: this.props.user.userId
        }).then((res)=>{
            
        })
    }
    loadUrl(){
        this.setState({
            goUrl:`https://wzcx.chetuobang.com/article/articleDetailRN.html?userId=${this.props.user.userId?this.props.user.userId:''}&date=${new Date().getTime()}&id=${this.state.wid}`
        })
    }
    msgFromWeb(e){
        if(e.nativeEvent.data=='goEva'){
            this.props.navigation.navigate('EvaArea',{id:this.state.wid,refresh:()=>{this.loadUrl()}})
        }else if(e.nativeEvent.data=='goIntro'){
            this.props.navigation.navigate('carCoinIntro',{refresh:()=>{this.loadUrl()}})
        }else if(e.nativeEvent.data=='goLogin'){
            this.loginNav.showLogin();
        }
    }
    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <NavigationEvents
                    onWillFocus={()=>this.loadUrl()}
                />
                <View style={styles.articleMain}>
                    <WebView
                        ref={webview => this.webview = webview}
                  
       
                        mediaPlaybackRequiresUserAction={false}
                        source={{ uri:  this.state.goUrl}}
                        onMessage={this.msgFromWeb.bind(this)}
                    />
                    <LoginNav 
                        ref={r => this.loginNav = r}
                        key={this.props.user.userId}
                        navigation={this.props.navigation}
                        wid={this.props.navigation.state.params.wid}
                        prev='TopLineDetail'/>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    articleMain:{
        width:ptd(750),
        overflow:'hidden',
        flex:1,
    }
});
export default connect(state=>{
    return {
        user:state.user,
    }
})(TopLineDetail);