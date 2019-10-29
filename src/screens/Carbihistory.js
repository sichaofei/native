import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, Text, FlatList,ImageBackground,Image, Platform,StyleSheet,Dimensions,ActivityIndicator} from 'react-native';
import CommonStyles from '../styles/CommonStyles';
import NetUtil from '../utils/NetUtil';
let {height} = Dimensions.get('window');
 class Carbihistory extends Component{
    static navigationOptions = {
        headerTitle: 'Car币记录'
    };
    constructor(props){
        super(props)
        this.state={
            list:[],
            loading:false,
            footer:'',
            pageNum:0,
            none:false,
            total:''
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
        NetUtil.post("/api/opencar/wallet/detail",{userId:userId,pageNum:this.state.pageNum,pageSize:10})
        .then(res=>{
          console.log(res)
          if(res.code=="0"){
            let list=res.data.details
                if(list.length==0){
                    this.setState({
                        footer:"",
                        loading:true,
                        none:true
                    })
                  return
                }else{
                  list=this.state.list.concat(list)
                  list.forEach((item)=>{
                    item.amount = parseFloat(item.amount).toFixed(2) 
                  })
                  this.setState({
                    list:list,
                    total: parseFloat(res.data.totalAmount ).toFixed(2),
                    loading:false
                  })
            }
          }
         
          
        })
    }
    render(){
        return(
        
            <View style={[CommonStyles.container,styles.carbilist]}>
            {this.state.list.length==0?<View style={styles.noban}>
            <Image style={styles.nocar} source={require('../imgs/carno.png')}></Image>
            <Text style={styles.nocon}>暂无Car币收支记录</Text>
            </View>: 
            <View style={styles.Carlist}>
            <ImageBackground source={require("../imgs/carhistoryhead.png")} style={styles.backgroundhead}>
                    <View style={styles.CArbihead}>
                        <View style={styles.Carbitop}>
                        <View style={styles.Carbileftradus}>
                            <Text style={styles.Carbileft} >Car币</Text></View>
                            <Text style={styles.Carbiright}>{this.state.total}</Text>
                        </View>
                        <Text style={styles.Carbibanner}>今日你的Car币总值</Text>
                    </View>
            </ImageBackground>
            <Text style={styles.Carbijilu}>收支记录</Text>
            <FlatList
                data={this.state.list}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={1}
                renderItem={({item}) => 
            <View style={styles.Carbicon}>
                <View style={styles.Carbiconleft}>
                <Text style={styles.CarbiconleftText}>{item.bizType}</Text>
                <Text style={styles.CarbiconleftTextT}>{item.happenTime}</Text>
                </View>
                <View style={styles.Carbiconright}>
                {item.ieType==1?<Text style={styles.Carbijia}>+</Text>: <Text style={styles.Carbijian}>-</Text>}
                    <Text style={styles.Carbinum}>{item.amount}</Text>
                </View>
                
          </View>}
          
        />
       {this.state.loading==true? <Text style={styles.footer}>{this.state.footer}</Text>:<Text></Text>}
        </View>
        }
            </View>
        )
    }
}

const styles = StyleSheet.create({
  backgroundhead:{
        width:670,
        height:165,
        marginTop:40,
        marginLeft:40
  },
  CArbihead:{
        width:670,
        height:165,
        marginLeft:40,
        paddingTop: 30,
        paddingBottom: 40,
  },
  Carbitop:{
      flexDirection:"row",  
      alignItems: 'center',
      height:72,
  },
  Carbileftradus:{
    width:100,
    color: "#FFFFFF",
    height:50,
    backgroundColor:"white",
    borderRadius:16,
    alignItems:'center',
    justifyContent: 'center',
  },
  Carbileft:{
     fontSize:24,
     color:"#1BC787"
  },
  Carbiright:{
    color: "#FFFFFF",
    fontSize: 40,
   marginLeft: 20,
  },
  Carbibanner:{
      fontSize:24,
      color:"white",
      marginTop: 10
  },
  Carbijilu:{
      marginLeft:80,
      fontSize:24,
      color:"#333333",
      fontWeight: "600",
      marginTop:60,
      marginBottom:30,
  },
  Carbicon:{
      width:670,
      marginLeft:40,
      height:128,
      backgroundColor:"#F8FBFC",
      flex:1,
      flexDirection:"row",
      marginBottom: 30,
      paddingLeft: 40,
      paddingRight: 40,
      borderRadius:8,
      alignItems:"center",
      justifyContent:"space-between"
  },
  CarbiconleftText:{
    fontSize:34,
    color:"#1BC787"
  },
  CarbiconleftTextT:{
    fontSize:22,
    color:"#1BC787",
    marginTop:10,
  },
  Carbijia:{
      fontSize:30,
      color:"#333333",
      marginRight: 10
  },
  Carbijian:{
      color:"#F95E59",
      fontSize:30,
      marginRight: 10
  },
  Carbinum:{
      color:"#1BC787",
      fontSize:30,
  },Carbiconright:{
      flexDirection:"row",
      alignItems:"center"
  },
  footer:{
      marginBottom:200,
      fontSize:30,
      width:670,
    textAlign: "center",
    marginLeft:40,
  },
  carbilist:{
      marginBottom:200,
  },
  nocar:{
      width:200,
      height:268,
      marginBottom:120
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
  Carlist:{
      height:Platform.OS === 'ios'?height+height:height+height-100
  }
});
const mapStateToProps = state => ({
    user: state.user
  })
  export default connect(mapStateToProps)(Carbihistory);