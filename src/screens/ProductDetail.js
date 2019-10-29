import React, { Component } from 'react';
import {View, Text, TouchableOpacity,SafeAreaView, Image, ImageBackground, ScrollView} from 'react-native';
import NetUtil from '../utils/NetUtil';
import CommonStyles from '../styles/CommonStyles';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import CheckBox from 'react-native-check-box';
import { WebView } from "react-native-webview";
import style from '../styles/ProductStyle';

class ProductDetail extends React.Component {
    static navigationOptions = {
        headerTitle: '商品详情'
    };
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            token: 0,
            xieyiEd: true,
            goodsId: '',
            swiperShow: false
        };
    }
    componentDidMount() {
        const goodsId = this.props.navigation.getParam("goodsId");
        this.setState({
            goodsId
        })
        NetUtil.get('/api/opencar/goods/detail?goodsId='+goodsId)
        .then((json) => {
            this.setState({
                detail: json.data.GoodsDetail,
                swiperShow: true
            })
        })
        NetUtil.post('/api/opencar/wallet/detail', {
            userId: this.props.user.userId,
            pageNum: 1,
            pageSize: 1
        }).then((json) => {
            this.setState({
                token: json.data.totalAmount
            })
        })
    }
    exchange() {
        if(this.state.xieyiEd==false){
            Toast.info('请勾选商品兑换协议', 1);
            return;
        }
        if (this.state.detail.stockNumber<=0){
            Toast.info('库存不足', 1);
            return;
        }
        this.props.navigation.navigate('ProductOrder', {goodsId: this.state.goodsId});
    }
    renderSwiper() {
        if(!this.state.swiperShow || !this.state.detail.broadcastImageList) return;
        const imgs = this.state.detail.broadcastImageList.map((item, index) => {
            return (
                <View style={style.slider} >
                    <Image source={{uri: item}} key={index} style={style.prodImage} resizeMode='stretch'/>
                </View>
            )
        });
       
        return (
            <View style={style.wrapper} >
                <Swiper 
                        paginationStyle={{bottom: 5}}
                        dotColor='#ccc'
                        activeDotColor='#aaa'
                        key={this.state.detail.broadcastImageList.length}
                    >
                    {imgs}
                </Swiper>
            </View>
        )

    }
    render() {
        const detail = this.state.detail;
        return (
            <SafeAreaView  style={{flex: 1}}>
            <View style={{flex: 1}}>
                <ScrollView style={style.prodMain}>
                    {this.renderSwiper()}
                    <View  style={style.prodInfo}>
                        <Text style={style.prodName}>{detail.goodsName}</Text>
                        <View style={style.prodCount}>
                            <View style={style.priceWrapper}>
                                <Image source={require('../imgs/price-icon.png')} style={style.priceIcon}/>
                                <Text style={style.prodZuan}>{detail.tokenNumber}</Text>
                            </View>
                            <View style={style.subtitle}>
                                <Text style={style.subtxt}>包邮：剩余</Text>
                                <Text style={style.blue}>{detail.stockNumber}</Text><Text style={style.subtxt}>件</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={style.recordList}
                        onPress={()=>{this.props.navigation.navigate('Shophistory')}}>
                        <Text style={style.recordTitle}>兑换记录</Text>
                        <Text style={style.recordeMore}>查看 ></Text>
                    </TouchableOpacity>
                    <View style={style.content}>
                        <Text style={style.contentTitle}>商品详情</Text>
                        <WebView
                            source={{uri: 'https://wzcx.chetuobang.com/parse/index.html?id='+ this.state.goodsId +'&url=testservice'}}
                            style={style.contentWeb}
                        />
                    </View>
                </ScrollView>
                <View style={style.bottom}>
                    <Text style={style.tips}>免费兑换商品，暂不支持退换货</Text>
                    {parseInt(detail.tokenNumber) > parseInt(this.state.token) ? 
                        <TouchableOpacity style={style.detailDhBtn}
                            onPress={()=>{this.props.navigation.navigate('Home')}}>
                            <Text style={style.dhBtnTxt}>Car币不足，快去做任务获取吧</Text>
                        </TouchableOpacity>
                        :
                        <View style={style.bottomDh} >
                            <View style={style.dhFoot} >
                                <View><Text style={style.dhFootTxt}>所需Car币{detail.tokenNumber}</Text></View>
                                <TouchableOpacity style={style.dhFoot2} 
                                    onPress={()=>{this.exchange()}}>
                                    <ImageBackground source={require('../imgs/an1.png')} style={style.dhFootBg}>
                                        <Text style={style.dhFoot2Txt} >立即兑换</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                            <View style={style.xieyi}>
                                <CheckBox
                                    onClick={()=>{
                                    this.setState({
                                        xieyiEd:!this.state.xieyiEd
                                    })
                                    }}
                                    isChecked={this.state.xieyiEd}
                                    checkedImage={<Image source={require('../imgs/cb-checked.png')} style={style.cbg}/>}
                                    unCheckedImage={<Image source={require('../imgs/cb-blank.png')} style={style.cbg}/>}
                                />
                                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Agreement')}}>
                                    <Text style={style.xieyiTxt}>
                                        商品兑换协议
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>
            </View>
            </SafeAreaView>
        );
    }
}
const mapStateToProps = state => ({
    user: state.user
})
  // 连接 tore 和组件
export default connect(mapStateToProps)(ProductDetail);