import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SwipeListView ,SwipeRow} from 'react-native-swipe-list-view';
import Toast, {DURATION} from 'react-native-easy-toast'
import {View, Text, Image, StyleSheet,FlatList,Dimensions,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import NetUtil from '../utils/NetUtil';
import CommonStyles from '../styles/CommonStyles';
let {width, height} = Dimensions.get('window');
import {create} from '../styles/StyleSheet.js';
class DiscussList extends Component{
    static navigationOptions = {
        headerTitle: '我的评论'
    };
    constructor(props){
        super(props)
        this.state={
            list:[
                
            ],
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
        NetUtil.post("/api/info/news/myNews",{userId:userId,pageNum:this.state.pageNum,pageSize:10})
        .then(res=>{
          console.log(res)
          if(res.code=="0"){
            let list=res.data.myNewsList
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
// 跳转文章
todetail(id){
    this.props.navigation.navigate('TopLineDetail',{wid:id})
}
    render(){
        return(
            <View style={CommonStyles.container}>
            {this.state.list.length>0?
                 <FlatList
                 data={this.state.list}
                 onEndReached={this.handleLoadMore}
                 onEndReachedThreshold={1}
                 renderItem={({item}) =>
                 <TouchableOpacity onPress={()=>{this.todetail(item.newsitemId)}}>
                    <View style={[styles.discon,styles.bg]}>
                      <Text style={styles.contophead}>{item.newsitemTitle}</Text>
                      <Text style={styles.contime}>{item.createTime}</Text>
                      <Text style={styles.content}>{item.content}</Text>
                        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                        <Image style={{borderRadius:8}} style={{width:50,height:50}} source={{uri:item.headUrl}}></Image>
                        <Text style={styles.goto}>去往文章>></Text>
                        </View>
                      
                    </View>
                    </TouchableOpacity>
                  }
                 />:<View style={styles.noban}>
                 <Image style={styles.nocar} source={require('../imgs/nodiscuss.png')}></Image>
                 <Text style={styles.nocon}>您还没有评论，快去头条参与评论吧</Text>
             </View>
            
            }
                
        {this.state.loading==true? <Text style={styles.footer}>{this.state.footer}</Text>:<Text></Text>}
            </View>
        )
    }
}
const styles = create({
    con:{
        paddingTop:70,
        marginBottom:400
    },
    bg:{
        android:{
            backgroundColor: '#f8f8f8',
        }
    },
    nocar:{
        width:194,
        height:208,
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
    discon:{
        width:670,
        paddingTop:30,
        paddingBottom:30,
        paddingLeft:50,
        paddingRight:50,
        marginLeft: 40,
        marginBottom: 40,
        shadowOpacity:0.1,
        backgroundColor:"white",
        shadowColor: 'rgb(138,138,138)',
        shadowOffset:{x: 0,y: 20},
        shadowRadius:7,
        borderRadius:8
    },
    contophead:{
        color:"#333333",
        fontWeight: "600",
        fontSize:38,
    },
    contime:{
        color:"#CCCCCC",
        fontSize: 20,
        marginTop:10,
        marginBottom:10
    },
    content:{
        color:"#9B9B9B",
        fontSize:28,
        marginBottom:30
    },
    goto:{
        color:"#1BC787",
        fontSize:24
    },
    footer:{
        marginBottom:200,
        fontSize:30,
        width:670,
      textAlign: "center",
      marginLeft:40,
    },

})
const mapStateToProps = state => ({
    user: state.user
  })
  export default connect(mapStateToProps)(DiscussList);