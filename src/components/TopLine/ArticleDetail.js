import React, { Component } from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import HTMLView from 'react-native-htmlview';
import NetUtil from '../../utils/NetUtil';
let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
export default class ArticleDetail extends Component {
    constructor(props) {
        super(props);
        this.state={
            newsDetail:'',
            content:'',
            totalCount:0
        }
    }
    componentDidMount(){
        this.getArtileDetail();
    }
    getArtileDetail(){
        console.log(this.props)
        return
        NetUtil.post('/api/info/news/newsDetail',
        {id: this.props.navigation.navigate.state.wid, category: 'news', userId:529955781198614528})
        .then((res) => {
            console.log(res)
            if(res.code==0){
                this.setState({
                    newsDetail:res.data.newsDetail,
                    content:res.data.newsDetail.content
                },()=>{
                    console.log(this.state.content)
                })
            }
        })
    }
    render() {
        return (
            <View style={styles.htmlContainer}>
                <View>
                    <Text style={styles.title}>{this.state.newsDetail.title}</Text>
                    <View style={styles.info}>
                        <View style={styles.iconBox}>
                            <View style={styles.icon}></View>
                            <Text style={styles.authName}>文/{this.state.newsDetail.author}</Text>
                        </View>
                        <Text style={styles.type}>{this.state.newsDetail.classifyName}</Text>
                        <Text style={styles.date}>{this.state.newsDetail.updateTime}</Text>
                    </View>
                </View>
                <HTMLView stylesheet={styles} value={this.state.content} stylesheet={styles} />
                <View style={styles.wdata}>
                    <View style={styles.wDataDetail}>
                        <View style={styles.wBorder}>
                            <Image source={require('../../imgs/chakan_hq.png')}></Image>
                        </View>
                        <Text>{this.state.newsDetail.reading}</Text>
                    </View>
                    <View style={styles.wDataDetail}>
                        <View style={styles.wBorder}>
                            <Image source={require('../../imgs/xh2_grey_hq.png')} hidden='{{!isZan}}'></Image>
                            <Image source={require('../../imgs/xh1_hq.png')} hidden='{{isZan}}' class="animated infinite {{zan}}"></Image>
                        </View>
                        <Text>{this.state.newsDetail.zanNews}</Text>
                    </View>
                    <View class="w-data-detail">
                        <View class="w-border">
                            <Image source={require('../../imgs/pinglun_detail_hq.png')}></Image>
                        </View>
                        <Text>{this.state.totalCount}</Text>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    title:{
        fontFamily:'PingFangSC-Regular',
        fontSize:50,
        color:'#333',
        letterSpacing:0,
    },
    htmlContainer:{
        paddingLeft:40,
        paddingRight:40
    },
    img:{
        width:'100%',
        height:180,
    },
    info:{
        flexDirection:'row',
        alignItems:'center',
        alignItems:'center',
        height:97
    },
    iconBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    icon:{
        width:14,
        height:14,
        backgroundColor:'#7cdaa2',
        borderRadius:14,
        marginRight:10
    },
    authName:{
        fontSize:26,
        lineHeight:37
    },
    type:{
        marginLeft:30,
        fontSize:26,
        color:'#27c79b',
    },
    date:{
        marginLeft:'auto',
        fontSize:26,
        color:'#999',
    }
});