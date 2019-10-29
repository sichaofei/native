import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SwipeListView ,SwipeRow} from 'react-native-swipe-list-view';
import Toast, {DURATION} from 'react-native-easy-toast'
import {View, Text,ScrollView, Image, TextInput,StyleSheet,FlatList,Dimensions,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import NetUtil from '../utils/NetUtil';
import Picker from 'react-native-picker';
import area from '../utils/location.json';
import CommonStyles from '../styles/CommonStyles';

let {width, height} = Dimensions.get('window');
let that
// that复制this
class NewAddress extends Component{
    static navigationOptions = ({navigation}) =>({
        headerTitle: '新增地址',
        headerRight:(
            <TouchableOpacity  onPress={()=>that.newAdd()}>
                <Text style={{fontSize:16,paddingRight:15,color:"#1BC787"}}>保存</Text>
            </TouchableOpacity>
        )
    });
    constructor(props){
        super(props)
        that=this;
        this.state={
            username:'',
            phone:'',
            address:'',
            addressDetail:'',
            younum:'',
            addressProvince:"",
            addressCity:"",
            addressDistrict:""
        }
    }
    componentDidMount(){
        // this.props.navigation.setParams({save:this.newAdd})
    }
    // 初始化地址
    _createAreaData() {
        let data = [];
        let len = area.length;
        for(let i=0;i<len;i++){
            let city = [];
            for(let j=0,cityLen=area[i]['city'].length;j<cityLen;j++){
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }
    _showAreaPicker() {
        Picker.init({
            pickerConfirmBtnText:"确定",
            pickerCancelBtnText:"取消",
            pickerTitleText: '选择地址',
            pickerConfirmBtnColor:[27,199,135,1],
            pickerCancelBtnColor:[27,199,135,1],
            pickerData: this._createAreaData(),
            onPickerConfirm: pickedValue => {
                this.setState({
                    addressProvince:pickedValue[0],
                    addressCity:pickedValue[1],
                    addressDistrict:pickedValue[2],
                    address:pickedValue[0]+pickedValue[1]+pickedValue[2]
                })
            },
            onPickerCancel: pickedValue => {
               
            },
            onPickerSelect: pickedValue => {
               
            }
        });
        Picker.show();
    }

    // 添加地址
        newAdd(){
            let data=this.state
            if(data.username==''){
                this.refs.toast.show('请输入联系人')
                return
            }
            if(!(/^1[34578]\d{9}$/.test(data.phone))){ 
                this.refs.toast.show('手机号错误')
                return
            } 
            if(data.address==''){
                this.refs.toast.show('请输入地址')
                return
            }
            if(data.addressDetail==''){
                this.refs.toast.show('请输入详细地址')
                return
            }
            if(!(/^[1-9][0-9]{5}$/.test(data.younum))){
                this.refs.toast.show('请输入正确的邮政编码')
                return
            }
            let userId=this.props.user.userId
            NetUtil.post("/api/opencar/address/addUserAddress",{
                userId:userId,
                // userId:1,
                addressName:data.username,
                addressPhone:data.phone,
                addressProvince:data.addressProvince,
                addressCity:data.addressCity,
                addressDistrict:data.addressDistrict,
                addressDetailed:data.addressDetail,
                postalCode:data.younum
              })
              .then((res)=>{
                  if(res.code==0){
                    this.props.navigation.goBack();
                    this.props.navigation.state.params.set()
                  }else{
                    this.refs.toast.show('添加失败')
                  }
              })
              .catch((res)=>{
                this.refs.toast.show('添加失败')
              })
        }
        changeusername(username){
            this.setState({
                username 
            })
        }
        changephone(phone){
            this.setState({
                phone
            })
        }
        changeaddress(address){
            this.setState({
                address
            })
        }
        changeaddressDetail(addressDetail){
            this.setState({
                addressDetail
            })
        }
        changeyounum(younum){
            this.setState({
                younum
            })
        }
        hidePicker(){
            Picker.hide();
        }
    render(){
        return(
            <View style={[CommonStyles.container]}>
                    <View style={styles.inputbox}>
                        <Text style={styles.inputText}>联系人</Text>
                        <TextInput style={styles.input} onFocus={()=>this.hidePicker()} value={this.state.username} onChangeText={(value)=>this.changeusername(value)} placeholder="请输入姓名"></TextInput>
                    </View>
                    <View style={styles.inputbox}>
                        <Text style={styles.inputText}>手机号码</Text>
                        <TextInput style={styles.input}   onFocus={()=>this.hidePicker()} maxLength={11} value={this.state.phone} onChangeText={(value)=>this.changephone(value)} placeholder="请输入手机号"></TextInput>
                    </View>
                    <TouchableWithoutFeedback  onPress={this._showAreaPicker.bind(this)}>
                        <View style={styles.inputbox}>
                            <Text style={styles.inputText}>选择地址</Text>
                            <TextInput style={styles.input}  editable={false} value={this.state.address} onChangeText={(value)=>this.changeaddress(value)} placeholder="地区信息"></TextInput>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.inputbox}>
                        <Text style={styles.inputText}>详细地址</Text>
                        <TextInput style={styles.input} onFocus={()=>this.hidePicker()} value={this.state.addressDetail} onChangeText={(value)=>this.changeaddressDetail(value)} placeholder="街道门牌信息"></TextInput>
                    </View>
                    <View style={styles.inputbox}>
                        <Text style={styles.inputText}>邮政编码</Text>
                        <TextInput style={styles.input} onFocus={()=>this.hidePicker()} maxLength={6} value={this.state.younum} onChangeText={(value)=>this.changeyounum(value)} placeholder="邮政编码"></TextInput>
                    </View>
                    {/* <TouchableOpacity onPress={()=>{this.newAdd()}}> 
                         <Text style={{color:"#1BC787",fontSize:28,marginLeft:80,marginTop:40}}>保存</Text>
                    </TouchableOpacity> */}
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
  inputbox:{
      flexDirection:"row",
      borderBottomColor: "#EFEFEF",
      borderBottomWidth: 1,
      width:600,
      marginLeft:75,
      flexDirection:"row",
      height:104
  },
  inputText:{
      color:"#8F8F8F",
      fontSize: 28,
      width:130,
      height:104,
      lineHeight:104
  },
  input:{
      flex:1,
      fontSize: 28,
      padding: 0
  }
})
   
const mapStateToProps = state => ({
    user: state.user
  })
  export default connect(mapStateToProps)(NewAddress);