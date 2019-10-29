import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, Text, Image, StyleSheet,FlatList,Dimensions} from 'react-native';
import NetUtil from '../utils/NetUtil';
import CommonStyles from '../styles/CommonStyles';
import {create} from '../styles/StyleSheet.js';
let {width, height} = Dimensions.get('window');
class Shophistory extends Component{
    static navigationOptions = {
        headerTitle: '购物记录'
    };
    constructor(props){
        super(props)
        this.state={
            list:[
                
            ],
            loading:false, 
            footer:'',
            pageNum:1,
            none:false,
        }
    }
    handleLoadMore=()=>{
        if(this.state.loading==true||this.state.none==true){
            return 
        }
        let pageNum=this.state.pageNum+=1
        this.setState({
            pageNum:pageNum
        },()=>{
            this.getList()
        })
        
    }
    componentDidMount(){
        this.getList()
    }
    getList(num){
        this.setState({
            loading:true,
            footer:"加载中....",
        })
        let userId=this.props.user.userId
        NetUtil.post("/api/opencar/act/buy/query",{userId:userId,pageNum:this.state.pageNum,pageSize:5})
        .then(res=>{
          console.log(res)
          if(res.code=="0"){
            let list=res.data.StarBuyHistory.list
                if(list.length==0){
                    this.setState({
                        footer:"",
                        loading:true,
                        none:true
                    })
                  return
                }else{
                  list=this.state.list.concat(list)
                  this.setState({
                    list:list,
                    loading:false
                  })
            }
          }
         
          
        })
    }
    render(){
        return(
            <View style={CommonStyles.container}>
            {this.state.list.length==0? <View style={styles.noban}>
                    <Image style={styles.nocar} source={require('../imgs/carno.png')}></Image>
                    <Text style={styles.nocon}>暂无购物记录</Text>
                </View>:
                <View style={styles.shoplist}>
                <FlatList
                    data={this.state.list}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={1}
                    renderItem={({item}) => 
            <View style={[styles.Shoplistcon,styles.bg]}>
                <View style={styles.ShoplistTop}>
                <Image style={styles.shoporder} source={require('../imgs/shoporder.png')}></Image>
                <Text style={styles.order}>{item.orderNumber}</Text>
                <Text style={styles.buytime}>{item.buyTime}</Text>
                </View>
                <View style={styles.Shoplistcenter}>
                    <View style={styles.ShoplistcenterLeft}>
                    <Image source={{uri:item.coverImage}} style={{width:182,height:182}}></Image>
                    </View>
                    <View style={styles.ShoplistcenterRight}>
                    <Text style={styles.goodsName}>{item.goodsName}</Text>
                    <Text style={styles.tokennum}><Image style={{width:26,height:26}} source={{uri:'https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/mini-biyong/price-icon.png'}}></Image> <Text style={{marginLeft:15}}>{item.tokenNumber}</Text> </Text>
                    </View>
                </View>
                <View style={styles.Shoplistbottom}>
                {item.isSendOut==1?<Text style={styles.orderout}>已发货</Text>:<Text style={styles.orderin}>待发货</Text>}
                {item.isSendOut==1?<Text></Text>:<Text style={styles.ordertext}>15天内发货</Text>}
                   
                </View>
            </View> 
          }/>
                </View>
            }
               
            </View>
        )
    }
}

const styles = create({
    nocar:{
        width:200,
        height:268,
        marginBottom:120
    },
    bg:{
        android:{
            backgroundColor: '#f8f8f8',
        }
    },
    nocon:{
        fontSize:34,
        color:"#333333"
    },
    noban:{
        alignItems:"center",
        justifyContent:"center",
        width:750,
        marginTop:188
    },
    Shoplistcon:{
        width:670,
        height:422,
        marginLeft:40,
        backgroundColor: "blue",
        marginBottom: 40,
        borderRadius: 20,
        shadowColor:"rgb(0,0,0);",
        backgroundColor: "#FFFFFF",
        shadowOpacity:0.1,
        shadowOffset:{width: 0,height: 20},
        shadowRadius:5,
        shadowRadius: 2,
       borderRadius:20,
        marginTop:62

    },
    shoplist:{
        height:height+height-300
    },
    shoporder:{
        width:34
    },
    order:{
        fontSize:32,
        color:"#333333",
        marginLeft:-80
    },
    buytime:{
        fontSize:24,
        color:"#9B9B9B"
    },
    ShoplistTop:{
        paddingLeft: 30,
        paddingRight:30,
        height:90,
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems:"center"
    },
    Shoplistcenter:{
        paddingLeft: 30,
        paddingRight:30,
        backgroundColor:"#F8FBFC",
        height:242,
        flexDirection: "row",
        alignItems:"center"
    },
    Shoplistbottom:{
        paddingLeft: 30,
        paddingRight:30,
        height:90,
        backgroundColor:"white",
        flexDirection:"row",
        alignItems: 'center',
    },
    goodsName:{
        fontSize:28,
        color:"#6E8085",
        width:388
    },
    tokennum:{
        color:"#1BC787",
        fontSize:28,
        flexDirection:"row",
        alignItems:"center",
        height:40,
        marginTop:35
    },
    ShoplistcenterRight:{
        marginLeft:40
    },
    orderout:{
        fontSize:30,
        color:"#333333"
    },
    orderin:{
        color:"#1BC787",
        fontSize: 30,
    },
    ordertext:{
        color:"#9B9B9B",
        fontSize:22,
        marginLeft:30
    },
});
const mapStateToProps = state => ({
    user: state.user
  })
  export default connect(mapStateToProps)(Shophistory);