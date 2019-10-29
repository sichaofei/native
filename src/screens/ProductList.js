import React, { Component } from 'react';
import {View, Text, TouchableOpacity, TouchableWithoutFeedback, Image, FlatList, SafeAreaView} from 'react-native';
import NetUtil from '../utils/NetUtil';
import CommonStyles from '../styles/CommonStyles';
import style from '../styles/ProductStyle';

export default class ProductList extends Component {
    static navigationOptions = {
        tabBarLabel: '好赚',
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={CommonStyles.tabBarIcon} source={require('../imgs/earn_act.png')}/>
                );
            }
            return (
                <Image style={CommonStyles.tabBarIcon} source={require('../imgs/earn_grey.png')}/>
            );
        },
    }
    state = { 
        data: [],
        isLoading: true,
        pageno: 1,
        pageSize:10,
    }
    componentDidMount() {
        this.getData()
    }
    getData() {
        NetUtil.post('/api/opencar/goods/query',{pageSize:this.state.pageSize,pageNum:this.state.pageno})
        .then((json) => {
            if(json.code==0){
                if(json.data.pageGoods.list.length==0){
                    this.setState({
                        hasMore:false,
                    })
                }
                let data = [...this.state.data, ...json.data.pageGoods.list];
                this.setState({
                    data: data,
                    pageno: this.state.pageno + 1,
                    isLoading: false,
                    hasMore: true
                })
            }
        });
    }
    onEndReached() {
        if(!this.state.hasMore){
            return;
        }
        if (this.state.isLoading && !this.state.hasMore) {
          return;
        }
        this.setState({ isLoading: true });
        this.getData();
    }
    renderItem(item) {
        const props = item.item 
        return (
            <TouchableOpacity style={style.prodItem}
                onPress={()=>{
                    this.props.navigation.navigate('ProductDetail',{goodsId:props.goodsId})
                }}>
                <Image source={{uri:props.coverImage}} style={style.itemImage} alt='' resizeMode='contain'/>
                <Text style={style.itemTitle} numberOfLines={1}>{props.goodsName}</Text>
                <Text style={style.itemCount}>剩余{props.stockNumber>=0?props.stockNumber:0}件</Text>
                <View style={style.itemPrice}>
                    <Image source={require('../imgs/price-icon.png')} style={style.priceIcon}/>
                    <Text style={style.itemZuan}> {props.goodsPrice} </Text>
                </View>
                <View style={style.dhWrapper}><Text style={style.dhBtn}>立即兑换</Text></View>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <SafeAreaView style={CommonStyles.container}>
                <View style={style.productContainer}>
                    <FlatList
                        style={style.prodList}
                        data={this.state.data}
                        renderItem={this.renderItem.bind(this)}
                        onEndReached={this.onEndReached.bind(this)}
                        numColumns={2}
                    >
                    </FlatList>
                </View>
            </SafeAreaView>
        );
    }
}