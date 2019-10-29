import React, { Component } from 'react';
import {View,StyleSheet,SafeAreaView,ScrollView,Text,TouchableOpacity,Image} from 'react-native';
import { WebView } from "react-native-webview";
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux'
import NetUtil from '../utils/NetUtil';
import size, {ptd} from '../styles/SizeHelper.js';
class NearbyRoad extends Component {
    static navigationOptions = {
        headerTitle: '附近路况'
    };
    constructor(props) {
        super(props);
        this.state={
           goUrl:`https://bqtv.chetuobang.com/map/newRoute.html?lat=39.9219&lng=116.44355&date=${new Date().getTime()}`
        }
    }
    componentDidMount(){
        navigator.geolocation.getCurrentPosition(
            (position) => {
              const url = `http://api.map.baidu.com/geocoder/v2/?location=${position.coords.latitude},${position.coords.longitude}&output=json&pois=1&ak=rzOTENpIQgddGZQoUniouvswM1M25hGZ`;
              fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                   this.setState({
                       goUrl:`https://bqtv.chetuobang.com/map/newRoute.html?lat=${data.result.location.lat}&lng=${data.result.location.lng}&date=${new Date().getTime()}`
                   })
                });
            },
            (error) => {},
            {enableHighAccuracy: false, timeout: 20000}
        );
    }
    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <View style={styles.nearbyContainer}>
                    <WebView
                        mediaPlaybackRequiresUserAction={false}
                        source={{uri: this.state.goUrl}}
                    />
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    nearbyContainer:{
        width:ptd(750),
        overflow:'hidden',
        flex:1,
    }
});
export default connect(state=>{
    return {
        user:state.user,
    }
})(withNavigation(NearbyRoad));