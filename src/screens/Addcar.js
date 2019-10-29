import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SwipeListView ,SwipeRow} from 'react-native-swipe-list-view';
import Toast, {DURATION} from 'react-native-easy-toast'

import {View, Text, Image,SafeAreaView, StyleSheet,TouchableWithoutFeedback,Dimensions,TouchableOpacity,TextInput,KeyboardAvoidingView} from 'react-native';
import NetUtil from '../utils/NetUtil';
import CommonStyles from '../styles/CommonStyles';
import {height} from "../styles/SizeHelper"
class Addcar extends Component{
    static navigationOptions = ({ navigation }) => ({
        headerTitle: `${navigation.state.params.title}`
    });
    constructor(props){
        super(props)
        this.state={
           add:true,
           allInput:false,
           plate:"",
           evin:"",
           engine:"",
           showSelect:false ,
           selectIndex:0,
           plateText:'京',
           list:[
            {name:"京"},
            {name:"津"},
            {name:"冀"},
            {name:"晋"},
            {name:"蒙"},
            {name:"辽"},
            {name:"黑"},
            {name:"沪"},
            {name:"苏"},
            {name:"浙"},
            {name:"皖"},
            {name:"闽"},
            {name:"赣"},
            {name:"鲁"},
            {name:"豫"},
            {name:"鄂"},
            {name:"湘"},
            {name:"粤"},
            {name:"桂"},
            {name:"琼"},
            {name:"渝"},
            {name:"川"},
            {name:"贵"},
            {name:"云"},
            {name:"藏"},
            {name:"陕"},
            {name:"甘"},
            {name:"青"},
            {name:"宁"},
            {name:"吉"},
            {name:"新"},
            {name:"台"}
          ],
        }
    }

    componentDidMount(){
        if(this.props.navigation.state.params.plate){
            this.setState({
                add:false,
                plateText:this.props.navigation.state.params.plate.substring(0,1)
            })
            this.getplate()
        }   
    }
    // 获取车牌信息
    getplate(){
        NetUtil.post('/dzy/getPlate',{
            uid: this.props.user.openId,
            plate: this.props.navigation.state.params.plate
        })
        .then((res)=>{
            let msg = res.results
            let num = msg.plate.slice(1)
            this.setState({
              evin: msg.evin,
              engine: msg.engine,
              plate: num,
            }, () => {
             
            })
        })
    }
    // 车牌号
    changeInput1(value){
        this.setState({
            plate:value
        },()=>{
            this. ifinput()
        })
    }
    // 车架号
    changeInput2(value){
        this.setState({
            evin:value
        },()=>{
            this. ifinput()
        })
    }
    // 发动机号
    changeInput3(value){
        this.setState({
            engine:value
        },()=>{
            this. ifinput()
        })
    }
    // 判断是否输入完成
    ifinput(){
        let {plate,evin,engine}=this.state
        if(plate!=''&&evin!=''&&engine!=''){
            this.setState({
                allInput:true
            })
            return
        }
        this.setState({
            allInput:false
        })
    }
    // 提交数据判断
        submit(){
          
            let {plate,evin,engine,plateText}=this.state
            let myreg = /^[A-Z]{1}[A-Z_0-9]{5}$/;
            // alert(plateText+plate)
            if (!myreg.test(plate)) {
                this.refs.toast.show('车牌号错误');
              return false
            }
            if (evin.length != 17) {
                this.refs.toast.show('车架号为17位字母与数字组合');
                return false
            }
            if (engine.length < 6 || engine.length > 12) {
                this.refs.toast.show('发动机号为6-12位字母与数字组合');
                return false
              }
              this. updateCar()
        }
        // 选择
        select(){
            if(this.state.add==false){
                return false
            }
            this.setState({
                showSelect:true
            })
        }
        quxial(){
            this.setState({
                showSelect:false
            }) 
        }
        selectSd(index){
           let list=this.state.list
           this.setState({
            plateText:list[index].name,
            selectIndex:index,
            showSelect:false
           })
        }
        // 执行提交接口
        updateCar(){
            NetUtil.post('/dzy/redactCarInfo',{
                uid: this.props.user.openId,
                plate: this.state.plateText + this.state.plate,
                engine:  this.state.engine,
                evin:  this.state.evin,
                mobile:  this.props.user.mobile
            })
            .then(res=>{
                if(res.results==true){
                    this.props.navigation.goBack();
                    this.props.navigation.state.params.set()
                    return
                }
                this.refs.toast.show('添加失败');
            })
        }
    render(){
        return(
            <SafeAreaView style={[CommonStyles.container,styles.addCar]}>
                <Image style={{width:250,height:270,marginLeft:250}} source={require("../imgs/addcar.png")}></Image>
                    <Text style={styles.tip}>目前暂不支持新能源车辆的违章查询</Text>
                    <KeyboardAvoidingView>
                        <View style={styles.InputList}>
                            <View style={styles.inputFlex}>
                                <TouchableWithoutFeedback onPress={()=>this.select()}>
                                    <View style={[styles.inputText,styles.inputText2]}>
                                        <Text style={styles.inputTextHead}>{this.state.plateText}
                                          <Image style={styles.jian} source={require("../imgs/addjian.png")}></Image>
                                        </Text>
                                       
                                    </View>
                                </TouchableWithoutFeedback>
                                    <TextInput editable={ this.state.add==false?false:true}  value={this.state.plate} maxLength={6} onChangeText={(text) =>this.changeInput1(text)} style={[styles.input,styles.inputHead]}  placeholder="请输入车牌号"></TextInput>
                            </View> 
                            <View style={styles.inputFlex}>
                                <Text style={styles.inputText}>车架号</Text>
                                    <TextInput value={this.state.evin} maxLength={17} onChangeText={(text) =>this.changeInput2(text)} style={styles.input}   placeholder="请输入车架号"></TextInput>
                            </View>
                            <View style={styles.inputFlex}>
                                <Text style={styles.inputText}>发动机号</Text>
                                    <TextInput value={this.state.engine}  maxLength={12}  onChangeText={(text) =>this.changeInput3(text)} style={styles.input}  placeholder="请输入发动机号"></TextInput>
                            </View>  
                        </View>
                        <Text style={{color:"#CFCFCF",fontSize:24,marginLeft:75,marginTop:20}}>所填信息为当地交管局查询所需，您的信息将严格保密</Text>
                    </KeyboardAvoidingView> 
                    {this.state.allInput==true?  <TouchableOpacity onPress={()=>this.submit()}>
                         <View style={styles.btn}><Text style={styles.btnText}>下一步</Text></View>
                    </TouchableOpacity>:<View style={[styles.btn,styles.btnno]}><Text style={styles.btnText}>下一步</Text></View>}    
                    <Toast 
                        ref="toast"
                        style={{marginRight:370}}
                        positionValue={100}
                        textStyle={{fontSize:28,color:'#fff'}}
                    />
                    {this.state.showSelect==true?<View style={styles.selectS}>
                        <View style={{position:"relative",height:height}}>
                                <View style={styles.shengList}>
                                    {this.state.list.map((item,index)=>{
                                        return(
                                            <TouchableOpacity onPress={()=>this.selectSd(index)}>
                                                <Text style={[styles.shengText,index==this.state.selectIndex?styles.selected:'']} key={index}>{item.name}</Text>
                                            </TouchableOpacity>
                                            )
                                    })}
                                      <TouchableOpacity onPress={()=>this.quxial()}>
                                    <Text style={{color:'#1BC787',fontSize:36,textAlign:"center",
                                marginTop:40,width:750}}>取消</Text>
                                </TouchableOpacity>
                                </View>
                        </View>
                    </View>:<Text></Text>}
                    
            </SafeAreaView>
           
        )
    }
}
const styles = StyleSheet.create({
    addCar:{
 
    },
    tip:{
        color:"#8F8F8F",
        fontSize:24,
        textAlign: "center",
        width:750,
        marginTop: 71,
        marginBottom: 30
    },
    InputList:{

    },
    input:{
        padding:0,
        height:104,
        fontSize:28,
        flex: 1
    },
    inputFlex:{
        flexDirection:"row",
        borderBottomColor: "#EFEFEF",
        borderBottomWidth: 1,
        width:600,
        marginLeft:75
    },
    inputText:{
        width:130,
        color:"#8F8F8F",
        fontSize:28,
         height:104,
         lineHeight:104,
    }  ,
    inputText2:{
        height:70,
        lineHeight:70,  
        },
    inputTextHead:{
        fontSize:28,
        color:"#1BC787",
        borderColor: "#1BC787",
        borderWidth: 1,
        width:100,
        height:70,
        textAlign:"center",
       lineHeight:70,
       
    },
    jian:{
        width:27,
        height:27,
        position:"absolute",
         display: "none",
        right:0,
        bottom:0
    },
    inputHead:{
        height:70
    },
    btn:{
        width:600,
        height:98,
        borderRadius: 100,
        backgroundColor: "#1BC787",
        marginLeft:75,
        marginTop:134
       
    },
    btnText:{
        textAlign:"center",
        lineHeight:98,
        fontSize:32,
        color:"white"
    },
    btnno:{
        backgroundColor:"#CFCFCF"
    },
    selectS:{
        height:height+height,
        width:750,
        backgroundColor:"rgba(0,0,0,0.6)",
        position:"absolute",
        height:height
    },
    shengList:{
        height:580,
        width:750,
        backgroundColor:"white",
        position:"absolute",
        bottom:180,
        flexDirection:"row",
        flexWrap: "wrap",
        backgroundColor:"#F8F8F8",
        paddingLeft: 18,
    },
    shengText:{
        width:80,
        height:90,
        backgroundColor:"white",
        marginRight:10,
        marginTop:20,
    color:"#4F5761",
    fontSize:36,
    textAlign:"center",
    lineHeight:90,
    borderRadius:10
    },
    selected:{
        color:"#1BC787",
        borderWidth:1,
        borderColor:"#1BC787"
    }
})
const mapStateToProps = state => ({
    user: state.user
  })
  export default connect(mapStateToProps)(Addcar);