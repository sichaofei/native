import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toast, {DURATION} from 'react-native-easy-toast'
import {View, Text, Image, StyleSheet,FlatList,Dimensions,ImageBackground,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import NetUtil from '../utils/NetUtil';
import CommonStyles from '../styles/CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';
let {width, height} = Dimensions.get('window');

class ProductOrder extends Component{
    static navigationOptions = {
        headerTitle: '订单提交'
    };
    constructor(props){
        super(props)
        this.state={
            goodsId:"",
            detail:{},
            address:{},
            showAddress:false,
            list:[],
            goodsId:""
        }
    }
    componentDidMount(){
        // const goodsId = this.props.navigation.state.params.goodsId;
        let goodsId="18"
        this.setState({
            goodsId
        })
        this. getShopDetail(goodsId)
        this. getAddressList()
    }
    // 获取商品详情
    getShopDetail(goodsId){
       
        NetUtil.get('/api/opencar/goods/detail?goodsId='+goodsId)
        .then((json) => {
            this.setState({
                detail: json.data.GoodsDetail
            })
        })
    }
    // 查询地址
    getAddressList(id){
        let userId=this.props.user.userId
        NetUtil.post("/api/opencar/address/getUserAddressList",{
            userId
          })
          .then((res)=>{
              let list=res.data.UserAddressList
              if(res.data.UserAddressList==null){
                this.setState({
                    showAddress:false 
                })  
                return}
                this.setState({
                    showAddress:true ,
                    list
                })  
                if(id){
                    for(var a=0;a<list.length;a++){
                        if(list[a].addressId==id){
                            this.setState({
                                address:list[a]
                            })
                        }
                    }  
                    return
                }
              for(var j=0;j<list.length;j++){
                if(list[j].addressDefault===1){
                    this.setState({
                        address:list[j]
                    })
                }else{
                    this.setState({
                        address:list[0]
                    }) 
                }
              }
            }
          )
    }
    // 更换订单地址
    toAddress(){
        this.props.navigation.navigate("AddressList",{editaddress:1,set:((id)=>{
           this. getAddressList(id)
        })})
    }
    // 兑换商品
    dhShop(){
        if(this.state.showAddress===false){
            this.refs.toast.show('请先添加收货地址')
            return
        }
        let userId=this.props.user.userId
        NetUtil.post("/api/opencar/goods/buygoods",{
            userId,
            goodsId:this.state.goodsId,
            addressId:this.state.address.addressId
        })
        .then(res=>{
          
        //   alert(JSON.stringify(res))
        this.props.navigation.navigate("OrderSuccess") 
            if(res.code==0){
                this.props.navigation.navigate("OrderSuccess") 
            }else{
                this.refs.toast.show("兑换失败")
            }
        })
    }
    render(){
        return(
            <View style={[CommonStyles.container,styles.orderCon]}>
            <View style={{flex:1}}>
            {this.state.showAddress==true?<View style={styles.address}>
                    <View style={styles.addressList}><Text style={styles.addressTitle}>收货人：</Text><Text style={styles.addressValue}>{this.state.address.addressName}</Text><TouchableOpacity onPress={this.toAddress.bind(this)}><View style={styles.editAddress}></View></TouchableOpacity></View>
                    <View style={styles.addressList}><Text style={styles.addressTitle}>电话：</Text><Text style={styles.addressValue}>{this.state.address.addressPhone}</Text></View>
                    <View style={[styles.addressList,styles.addressListNo]}><Text style={styles.addressTitle}>地址：</Text><Text style={styles.addressValue}>{this.state.address.addressProvince}{this.state.address.addressCity}{this.state.address.addressDistrict}{this.state.address.addressDetailed}</Text></View>
                </View>:<Text></Text>}
                
                <View style={styles.orderHead}>
                    <View>
                        <Image style={{width:182,height:182}} source={{uri:this.state.detail.coverImage}}></Image>
                    </View>
                    <View style={styles.orderHeadRight}>
                        <View><Text style={{color:"#6E8085",fontSize:28,flexWrap: 'wrap',width:388}}>{this.state.detail.goodsName}</Text></View>
                        <View style={{flexDirection:"row",alignItems:"center",marginTop:35}}><Image style={{width:26,height:26}} source={{uri:'https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/mini-biyong/price-icon.png'}}></Image>
                            <Text style={{color:"#1BC787",fontSize:28,marginLeft:10}}>{this.state.detail.tokenNumber}</Text>
                        </View>
                    </View>
                </View>
                {this.state.showAddress==true?<Text></Text>:<TouchableOpacity onPress={this.toAddress.bind(this)}><Text style={{color:"#1BC787",fontSize:32,fontWeight:"600",marginLeft:80,marginTop:30}}>+添加地址</Text></TouchableOpacity>}
                </View>
                <View style={styles.bottomDh} >
                            <View style={styles.dhFoot} >
                                <View style={{flexDirection:"row",alignItems:"center"}}><Image style={{width:26,height:26}} source={{uri:'https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/mini-biyong/price-icon.png'}}></Image><Text style={{color:"#1BC787",fontSize:32,marginLeft:10}}>{this.state.detail.tokenNumber}</Text></View>
                                <ImageBackground style={{width:296,height:110,marginTop:-10}} source={require("../imgs/an1.png")}>
                                    <TouchableOpacity onPress={this.dhShop.bind(this)} style={{width:296,height:110,marginTop:-10,flexDirection:"row",alignItems:"center",justifyContent:"center",paddingTop: 20,}}>
                                        <View>
                                            <Text style={{color:"white",fontSize:38}}>立即兑换</Text>
                                        </View>
                                    </TouchableOpacity>
                               </ImageBackground>
                            </View>
                </View>
                <Toast 
                        ref="toast"
                        style={{marginRight:370}}
                        positionValue={50}
                        textStyle={{fontSize:28,color:'#fff'}}
                    />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    orderHead:{
        flexDirection:"row",
        width:670,
        marginLeft: 40,
        height:242,
        alignItems: 'center',
        backgroundColor: "#F8FBFC",
        padding: 30,
        overflow: 'hidden',
        marginTop: 60
    },
    orderCon:{
        // flex:1
        position:"relative"
    },
    orderHeadRight:{
        marginLeft:40
    },
    dhFoot:{
        flexDirection:"row",
        width:690,
        backgroundColor:"#333333",
        height:98,
        marginLeft:30,
        alignItems: 'center',
        justifyContent: "space-between",
        paddingLeft:40
    },
    bottomDh:{
        position:"absolute",
        bottom:300
    },
    address:{
        width:670,
        height:377,
        shadowColor:"rgb(197,197,197)",
        backgroundColor: "#FFFFFF",
        shadowOpacity:0.5,
        shadowOffset:{width: 0,height:8},
        shadowRadius:10,
        borderRadius:20,
        elevation: 4,
        marginLeft:40,
        marginTop:40,
    },
    addressTitle:{
        color:"#8F8F8F",
        fontSize:28,
    },
    addressList:{
        width:600,
        marginLeft:35,
        borderColor: "#EFEFEF",
       borderBottomWidth: 1,
       padding:30,
       flexDirection:"row",
    },
    addressListNo:{
        borderBottomWidth: 0,
    },
    addressValue:{
        color:"#333333",
        fontSize:28,
        paddingRight:80
    },
    editAddress:{
        marginLeft:180,
       width:0,
       height:0,
       borderStyle:'solid',
       borderWidth:15,
       borderTopColor:'#fff',//下箭头颜色
       borderLeftColor:'#D6F7DD',//右箭头颜色
       borderBottomColor:'#fff',//上箭头颜色
       borderRightColor:'#fff'//左箭头颜色
    }

})
const mapStateToProps = state => ({
    user: state.user
  })
  export default connect(mapStateToProps)(ProductOrder);