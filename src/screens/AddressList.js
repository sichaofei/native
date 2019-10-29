import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SwipeListView ,SwipeRow} from 'react-native-swipe-list-view';
import Toast, {DURATION} from 'react-native-easy-toast'
import {View, Text, Image, StyleSheet,FlatList,Dimensions,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import NetUtil from '../utils/NetUtil';
import CommonStyles from '../styles/CommonStyles';
let {width, height} = Dimensions.get('window');

class Setting extends Component{
    static navigationOptions = {
        headerTitle: '我的地址'
    };
    constructor(props) {
        super(props);
        this.state={
            userCity:'',
            companyAreaArray:[],
            list:[],
            showAdd:false,
            editaddress:false
        }
    }
   componentDidMount(){
       if(this.props.navigation.state.params.editaddress==1){
           this.setState({
            editaddress:true   
           })
       }
    this.loadAddress()
   }
//    删除地址
   deleteAddress(index){
    let userId=this.props.user.userId
    NetUtil.post("/api/opencar/address/deleteUserAddress",{
        addressId:index,
        userId
      })
      .then((res)=>{
        console.log(res)
        this.loadAddress()
      })
   }
//    添加地址
   showaddRess(){
    this.props.navigation.navigate("NewAddress",{set:(()=>{
        this.loadAddress()
    })})
   }
//    查询地址
   loadAddress(){
       let userId=this.props.user.userId
    NetUtil.post("/api/opencar/address/getUserAddressList",{
        userId:userId
      })
      .then((res)=>{
          console.log(res)
          if(res.data.UserAddressList==null){
             return
            }
          this.setState({
            list:res.data.UserAddressList
          })
   })
   }

//    修改地址
    gobackOrder(id){
        this.props.navigation.goBack();
        this.props.navigation.state.params.set(id)
    }
          render(){
        return(
            <View style={CommonStyles.container}>
            <View>
                {this.state.editaddress==true? <SwipeListView
                style={{marginRight:40,marginLeft:40,width:670}}
                useFlatList
                disableRightSwipe={true}
                data={this.state.list}
                closeOnRowPress={true}  //当按下一行，关闭打开的行
                closeOnScroll={true}    //列表滚动时关闭打开的行
                stopRightSwipe={-134}   //列表项右滑translateX最大的值：负值
                closeOnRowBeginSwipe= {true}
                renderItem={ (data, rowMap) => (
                    <TouchableWithoutFeedback onPress={()=>this.gobackOrder(data.item.addressId)}>
                    <View style={styles.addressCon}>
                        <View>
                              <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}><Text style={styles.addressName}>{data.item.addressName}</Text><Text style={styles.addressTel}>{data.item.addressPhone}</Text></View>
                              <View><Text style={styles.addressDetail}>{data.item.addressProvince}{data.item.addressCity}{data.item.addressDistrict}{data.item.addressDetailed}</Text></View>
                        </View>
                        {/* <View style={{flexDirection:"row",alignItems:"center"}}>
                           <Text style={{color:'#E5E5E5',marginRight:40,fontSize:50}}>|</Text><Text style={{fontSize:24,color:"#BEC1D1"}}>编辑</Text>
                        </View> */}
                    </View>
                    </TouchableWithoutFeedback>
                )}
                renderHiddenItem={ (data, rowMap) => (
                    <TouchableOpacity onPress={()=>this.deleteAddress(data.item.addressId)}>
                        <View style={styles.rowBack}>
                            <View style={styles.leftView}>
                                <Text style={{color: 'white',fontSize:28}}>删除</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            rightOpenValue={-134}
        />: <SwipeListView
        style={{marginRight:40,marginLeft:40,width:670}}
        useFlatList
        disableRightSwipe={true}
        data={this.state.list}
        closeOnRowPress={true}  //当按下一行，关闭打开的行
        closeOnScroll={true}    //列表滚动时关闭打开的行
        stopRightSwipe={-134}   //列表项右滑translateX最大的值：负值
        closeOnRowBeginSwipe= {true}
        renderItem={ (data, rowMap) => (
            <View style={styles.addressCon}>
                <View>
                      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}><Text style={styles.addressName}>{data.item.addressName}</Text><Text style={styles.addressTel}>{data.item.addressPhone}</Text></View>
                      <View><Text style={styles.addressDetail}>{data.item.addressProvince}{data.item.addressCity}{data.item.addressDistrict}{data.item.addressDetailed}</Text></View>
                </View>
                {/* <View style={{flexDirection:"row",alignItems:"center"}}>
                   <Text style={{color:'#E5E5E5',marginRight:40,fontSize:50}}>|</Text><Text style={{fontSize:24,color:"#BEC1D1"}}>编辑</Text>
                </View> */}
            </View>
        )}
        renderHiddenItem={ (data, rowMap) => (
            <TouchableOpacity onPress={()=>this.deleteAddress(data.item.addressId)}>
                <View style={styles.rowBack}>
                    <View style={styles.leftView}>
                        <Text style={{color: 'white',fontSize:28}}>删除</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )}
    rightOpenValue={-134}
/>}
           
        <TouchableOpacity onPress={()=>{this.showaddRess()}}><Text style={styles.addRess}>+ 添加地址</Text></TouchableOpacity>
        </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    rowBack: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "flex-end",
    },
    leftView: {
        width:134,
        alignItems: 'center',
        height: 200,
        justifyContent: 'center',
        backgroundColor:"red"
    },
    addressCon:{
        height:200,
        width:670,
        backgroundColor:"white",
        shadowColor:"rgb(138,138,138);",
        shadowOpacity:0.1,
        shadowOffset:{width: 0,height: 14},
        shadowRadius:5,
         elevation: 4,
         marginBottom:40,
         flexDirection:"row",
         alignItems:"center",
         justifyContent:"space-between",
         paddingLeft: 40,
         paddingRight:40
    },
    addressName:{
        color:"#4A4A4A",
        fontWeight: "600",
        fontSize:38
    },
    addressTel:{
        color:"#9B9B9B",
        fontSize:24,
        marginLeft:40
    },
    addressDetail:{
        color:"#333333",
        fontSize:24,
       paddingTop: 14,
    },
    addRess:{
        color:"#1BC787",
        fontSize:32,
        marginLeft:80,
        marginTop: 50
    }
})
   
const mapStateToProps = state => ({
    user: state.user
  })
  export default connect(mapStateToProps)(Setting);