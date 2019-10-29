import React, { Component } from 'react';
import {View, Text,StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView,ScrollView} from 'react-native';
import NetUtil from '../utils/NetUtil';
import CommonStyles from '../styles/CommonStyles';
import size, {ptd} from '../styles/SizeHelper.js';
import {create} from '../styles/StyleSheet.js';
export default class serverList extends Component {
    static navigationOptions = {
        headerTitle: '发现'
    };
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
        NetUtil.post('/api/opencar/goods/carOwnerService',{pageSize:this.state.pageSize,pageNum:this.state.pageno})
        .then((json) => {
            if(json.code==0){
                if(json.data.carOwnerService.list.length==0){
                    this.setState({
                        hasMore:false,
                    })
                }
                let data = [...this.state.data, ...json.data.carOwnerService.list];
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
    goDetail(id){
        console.log(id)
        this.props.navigation.navigate('ProductDetail',{goodsId:id})
    }
    goCompanyWidth(){
        this.props.navigation.navigate('companyWith')
    }
    renderItem(item) {
        return (
            <TouchableOpacity style={[styles.serverItem,styles.border]} key={item.item.goodsId} onPress={()=>{this.goDetail(item.item.goodsId)}}>
                <Image source={{uri:item.item.coverImage}} style={styles.itemImage} alt='' resizeMode='contain'/>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <SafeAreaView style={[styles.main,styles.bg]}>
                <View style={styles.serverContainer}>
                    <Image style={styles.banner} source={{uri:'https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/mini-biyong/newfuwucha.png'}} alt=''></Image>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.serverList}
                        data={this.state.data}
                        renderItem={this.renderItem.bind(this)}
                        onEndReached={this.onEndReached.bind(this)}
                        numColumns={1}
                    >
                    </FlatList>
                </View>
                <TouchableOpacity style={styles.ad} onPress={this.goCompanyWidth.bind(this)}>
                    <Image style={styles.ad} source={{uri:'https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/mini-biyong/companyWidth.png'}} alt=''></Image>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}
const styles = create({
    main:{
        flex:1
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
    serverContainer:{
        width:ptd(750),
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    serverList:{
        width:ptd(670),
        display:'flex',
        justifyContent:'center'
    },
    banner:{
        width:ptd(670),
        height:ptd(200),
        marginTop:ptd(20),
        marginBottom:ptd(20),
    }, 
    serverItem:{
        width:ptd(670),
        height:ptd(290),
        backgroundColor:'#FFFFFF',
        shadowColor: 'rgb(213,213,213)',
        shadowOffset: {width: 0,height: 8},
        shadowOpacity: .5,
        shadowRadius: ptd(20),
        borderRadius:ptd(20),
        marginBottom:ptd(40),
        display:'flex',
        alignItems:'center'
    },
    itemImage:{
        width:ptd(670),
        height:ptd(290),
        borderRadius:ptd(5)
    },
    ad:{
        width:ptd(750),
        height:ptd(200)
    }
});