import React, { Component } from 'react';
import {View,StyleSheet,SafeAreaView,Text,TouchableOpacity,Image} from 'react-native';
import { withNavigation } from 'react-navigation';
import Toast, {DURATION} from 'react-native-easy-toast';
import { connect } from 'react-redux';
import login from '../redux/loginAction.js';
import LoginNav from '../components/LoginNav.js';
import Picker from 'react-native-picker';
import area from '../utils/local.json';
import NetUtil from '../utils/NetUtil';
import Locate from '../components/Locate';
import size, {ptd} from '../styles/SizeHelper.js';
import {create} from '../styles/StyleSheet.js';
class CitationFind extends Component {
    static navigationOptions = {
        headerTitle: '违章查询'
    };
    constructor(props) {
        super(props);
        this.state={
            plateIndex:0,
            details:[],
            oil89Price:0,
            oil92Price:0,
            oil95Price:0,
            oil0Price:0,
            todayText:'',
            times:0,
            province:'北京市',
            city:'北京市',
        }
    }
    componentDidMount(){
        navigator.geolocation.getCurrentPosition(
            (position) => {
              const url = `http://api.map.baidu.com/geocoder/v2/?location=${position.coords.latitude},${position.coords.longitude}&output=json&pois=1&ak=rzOTENpIQgddGZQoUniouvswM1M25hGZ`;
              fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.setState({
                        province:data.result.addressComponent.province,
                        city: data.result.addressComponent.city
                    },()=>{
                        this.getInfo();
                    });
                });
            },
            (error) => {},
            {enableHighAccuracy: false, timeout: 20000}
        );
    }
    getInfo(){
        NetUtil.post('/api/opencar/home/load',
        {
            userId:this.props.user.userId,
            province:this.state.province,
            city:this.state.city,
            violation:1
        })
        .then((res) => {
            console.log(res)
            if(res.code==0){
                this.setState({
                    details:res.data.illegalMessage.details,
                    oil89Price:res.data.oilPriceDetail?res.data.oilPriceDetail.oil90:0,
                    oil92Price:res.data.oilPriceDetail?res.data.oilPriceDetail.oil93:0,
                    oil95Price:res.data.oilPriceDetail?res.data.oilPriceDetail.oil97:0,
                    oil0Price:res.data.oilPriceDetail?res.data.oilPriceDetail.oilZero:0,
                    todayText:res.data.controlNumberMsg,
                    times: res.data.illegalMessage.details.length?res.data.illegalMessage.details[this.state.plateIndex].times:0,
                },()=>{
                    console.log(this.state.details)
                })
            }
        });
    }
    changePlate(index){
       this.setState({
           plateIndex:index,
           times:this.state.details[index].times
       })
    }
    goDetail(){
        const {plateIndex,details} = this.state;
        this.props.navigation.navigate('citationFindDetail',{plate:details[plateIndex].plate})
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
                    province:pickedValue[0],
                    city:pickedValue[1],
                },()=>{
                    this.getInfo();
                })
            },
            onPickerCancel: pickedValue => {
                
            },
            onPickerSelect: pickedValue => {
                
            }
        });
        Picker.show();
    }
    goAdd(){
        this.props.navigation.navigate('Addcar',{title:'添加车辆'})
    }
    render() {
        return (
            <SafeAreaView style={[styles.outer,styles.bg]}>
                <View style={styles.citationContianer}>
                    <View style={[styles.violateBlock,styles.border]}>
                        <View style={styles.plateList}>
                            {
                                (this.props.user.userId&&this.state.details.length)?this.state.details.map((item,index)=>{
                                    return(
                                        <TouchableOpacity onPress={()=>{this.changePlate(index)}} style={this.state.plateIndex==index?styles.plateCur:styles.plate} key={index}>
                                            <Text>{item.plate}</Text>
                                            {
                                                this.state.plateIndex==index?(<View style={styles.line}></View>):null
                                            }
                                        </TouchableOpacity>
                                    )
                                }):null
                            }
                            {
                                (this.props.user.userId&&this.state.details.length<3&&this.state.details.length>=1)?(<TouchableOpacity onPress={this.goAdd.bind(this)}>
                                    <Image style={styles.addCar} source={require('../imgs/addCar_hq.png')} ></Image>
                                </TouchableOpacity>):null
                            }
                        </View>
                        {
                            this.state.details.length&&this.props.user.userId?(
                                <View style={styles.carInfo}>
                                    
                                    {
                                        this.state.times>0?(
                                            <TouchableOpacity style={styles.violateContent} onPress={this.goDetail.bind(this)}>
                                                <Text style={styles.violateText}>您有</Text>
                                                <Text style={styles.violateCount}>{this.state.times}</Text>
                                                <Text style={styles.violateText}>条违章信息，点击查看>></Text>
                                            </TouchableOpacity>
                                        ):(
                                            <View style={styles.noMsg}>
                                                <Text>当前没有违章记录</Text>
                                            </View>
                                        )
                                    }
                                </View>
                            ):null
                        }
                        {
                            this.props.user.userId&&!this.state.details.length?(
                                <TouchableOpacity style={styles.noCar} onPress={this.goAdd.bind(this)}>
                                    <Image style={styles.addIcon} source={require('../imgs/tianjiada_hq.png')}></Image>
                                    <View style={styles.noDes}>
                                        <Text style={styles.noTitle}>添加车辆查违章</Text>
                                        <Text style={styles.noInfo}>享受最新违章查询，在线办理服务</Text>
                                    </View>
                                </TouchableOpacity>
                            ):(
                                null
                            )
                        } 
                        {
                            !this.props.user.userId?(
                                <TouchableOpacity style={styles.noCar} onPress={()=>{ this.loginNav.showLogin();}}>
                                    <Image style={styles.addIcon} source={require('../imgs/tianjiada_hq.png')}></Image>
                                    <View style={styles.noDes}>
                                        <Text style={styles.noTitle}>添加车辆查违章</Text>
                                        <Text style={styles.noInfo}>享受最新违章查询，在线办理服务</Text>
                                    </View>
                                </TouchableOpacity>
                            ):null
                        }
                    </View>   
                    <View style={[styles.limitPriceBox,styles.border]}>
                        <TouchableOpacity style={styles.picker} onPress={this._showAreaPicker.bind(this)}>
                            <Image style={styles.localIcon} source={require('../imgs/local_hq.png')}></Image>
                            <Text style={styles.city}>{this.state.city}</Text>
                        </TouchableOpacity>
                        <View style={styles.limitBox}>
                            <View style={styles.left}>
                                <Image style={styles.limitIcon} source={require('../imgs/xianhang_hq.png')}></Image>
                                <Text style={styles.title}>今日限行</Text>
                            </View>
                            <Text style={styles.limitNum}>{this.state.todayText}</Text>
                        </View>
                        <View style={styles.oilBox}>
                            <Image style={styles.yjIcon} source={require('../imgs/youjiaguanli_hq.png')}></Image>
                            <View style={styles.oilLine}>
                                <Text style={styles.oilTitle}>今日油价</Text>
                            </View>
                        </View>
                        <View style={styles.oilDetai}>
                            <View style={styles.oilItem}>
                                <Text style={styles.type}>89#汽油</Text>
                                <Text style={styles.price}>{this.state.oil89Price}/升</Text>
                            </View>
                            <View style={styles.oilItem}>
                                <Text style={styles.type}>92#汽油</Text>
                                <Text style={styles.price}>{this.state.oil92Price}/升</Text>
                            </View>
                            <View style={styles.oilItem}>
                                <Text style={styles.type}>95#汽油</Text>
                                <Text style={styles.price}>{this.state.oil95Price}/升</Text>
                            </View>
                            <View style={styles.oilItem}>
                                <Text style={styles.type}>0#汽油</Text>
                                <Text style={styles.price}>{this.state.oil0Price}/升</Text>
                            </View>
                        </View>
                    </View>
                </View> 
                <LoginNav 
                    ref={r => this.loginNav = r}
                    key={this.props.user.userId}
                    navigation={this.props.navigation}
                    prev='citationFind'/>
            </SafeAreaView>
        );
    }
}
const styles = create({
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
    outer:{
        display:'flex',
        width: ptd(750),
    },
    citationContianer:{
        width: ptd(750*0.9),
        marginLeft:ptd(750*0.05)
    },
    violateBlock:{
        display:'flex',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:ptd(20),
        width:ptd(670),
        paddingTop:ptd(40),
        paddingBottom:ptd(40),
        paddingRight:ptd(40),
        paddingLeft:ptd(40),
        textAlign:'center',
        marginTop:ptd(40),
        marginBottom:ptd(40),
        shadowColor: 'rgb(213,213,213)',
        shadowOffset: {width: 0,height: 10},
        shadowOpacity: .5,
        shadowRadius: 30,
    },
    noCar:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    addIcon:{
        width:ptd(80),
        height:ptd(80),
        marginLeft:ptd(10),
    },
    noDes:{
        textAlign:'left',
        marginLeft:ptd(30)
    },
    noTitle:{
        fontFamily:'PingFangHK-Regular',
        fontSize:ptd(34),
        color:'#333333',
        letterSpacing:0
    },
    noInfo:{
        fontFamily:'PingFangHK-Regular',
        fontSize:ptd(22),
        color:'#9B9B9B',
        letterSpacing:0,
        marginTop:ptd(10)
    },
    carInfo:{
        
    },
    plateList:{
        fontSize:ptd(26),
        color:'#9B9B9B',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        alignSelf:'flex-start'
    },
    plate:{
        position:'relative',
        marginRight:ptd(30),
    },
    plateCur:{
        position:'relative',
        marginRight:ptd(30),
        fontSize:ptd(32),
        color:'#333333',
    },
    line:{
        width: ptd(40),
        height: ptd(5),
        backgroundColor: '#1BC787',
        position: 'absolute',
        marginTop: ptd(5),
        left: ptd(60),
        bottom:ptd(-10),
        marginLeft: ptd(-20),
    },
    addCar:{
        width:ptd(44),
        height:ptd(44),
        marginLeft:ptd(6)
    },
    violateContent:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        height:ptd(150),
        justifyContent:'center'
    },
    violateText:{
        fontSize:ptd(32),
        color:'#1BC787'
    },
    violateCount:{
        fontFamily:'PingFangHK-Medium',
        fontSize:ptd(36),
        color:'#f95e59',
        marginLeft:ptd(6),
        marginRight:ptd(6),
    },
    limitPriceBox:{
        paddingLeft:ptd(40),
        paddingRight:ptd(50),
        backgroundColor:'#fff',
        borderRadius:ptd(20),
        marginBottom:ptd(60),
        shadowColor: 'rgb(213,213,213)',
        shadowOffset: {width: 0,height: 10},
        shadowOpacity: .5,
        shadowRadius: 30,
    },
    picker:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingTop:ptd(40),
        paddingBottom:ptd(27),
        borderBottomWidth:1,
        borderBottomColor:'#f3f4f5'
    },
    localIcon:{
        width:ptd(24),
        height:ptd(30),
        marginLeft:ptd(20)
    },
    city:{
        fontFamily:'PingFangSC-Regular',
        fontSize:ptd(26),
        color:'#4A4A4A',
        letterSpacing:ptd(1.44),
        lineHeight:ptd(37),
        marginLeft:ptd(10),
    },
    limitBox:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:ptd(40),
        paddingBottom:ptd(40),
        borderBottomColor:'#F3F4F5',
        borderBottomWidth:1
    },
    left:{
        display:'flex',
        alignItems:'center',
        flexDirection:'row'
    },
    limitIcon:{
        width:ptd(54),
        height:ptd(54),
        marginLeft:ptd(9),
    },
    title:{
        fontFamily:'PingFangHK-Regular',
        fontSize:ptd(34),
        color:'#333333',
        letterSpacing:0,
        marginLeft:ptd(30),
    },
    limitNum:{
        fontFamily:'PingFangHK-Regular',
        fontSize:ptd(34),
        color:'#1BC787',
        letterSpacing:ptd(5),
    },
    oilBox:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    yjIcon:{
        width:ptd(44),
        height:ptd(55),
        marginLeft:ptd(9),
        marginRight:ptd(8),
    },
    oilTitle:{
        fontFamily:'PingFangHK-Regular',
        fontSize:ptd(34),
        color:'#333333',
        letterSpacing:0,
    },
    oilLine:{
        borderBottomColor:'#f3f4f5',
        borderBottomWidth:1,
        marginLeft:ptd(30),
        flex:1,
        paddingTop:ptd(40),
        paddingBottom:ptd(40),
    },
    oilDetai:{
        paddingLeft:ptd(95),
    },
    oilItem:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:ptd(30),
        paddingBottom:ptd(32),
        borderBottomColor:'#F3F4F5',
        borderBottomWidth:1
    },
    type:{
        fontFamily:'PingFangHK-Regular',
        fontSize:ptd(28),
        color:'#4A4A4A',
        letterSpacing:0,
        lineHeight:ptd(40),
    },
    price:{
        fontFamily:'PingFangHK-Regular',
        fontSize:ptd(28),
        color:'#1BC787',
        letterSpacing:0,
        lineHeight:ptd(40),
    }
});
export default connect(state=>{
    return {
        user:state.user,
    }
})(withNavigation(CitationFind));