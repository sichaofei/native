import React, { Component } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image,SafeAreaView,TextInput,KeyboardAvoidingView} from 'react-native';
import NetUtil from '../utils/NetUtil';
import size, {ptd} from '../styles/SizeHelper.js';
import Toast, {DURATION} from 'react-native-easy-toast'
export default class CompanyWidth extends Component {
    static navigationOptions = {
        headerTitle: '合作'
    };
    state = { 
        company:'',
        type:'',
        name:'',
        mobile:'',
        des:''
    }
    componentDidMount() {

    }
    changeCompany(text){
        this.setState({
            company:text
        },()=>{
            this.canGoFun()
        })
    }
    changeType(text){
        this.setState({
            type:text
        },()=>{
            this.canGoFun()
        })
    }
    changeName(text){
        this.setState({
            name:text
        },()=>{
            this.canGoFun()
        })
    }
    changeMobile(text){
        this.setState({
            mobile:text
        },()=>{
            this.canGoFun()
        })
    }
    changeDes(text){
        this.setState({
            des:text
        },()=>{
            this.canGoFun()
        })
    }
    canGoFun(){
        let {company,type,name,mobile,des} = this.state;
        if(company==''||type==''||name==''||mobile==''||des==''){
          this.setState({
            canGo:false
          })
        }else{
          this.setState({
            canGo: true
          })
        }
    }
    subCompanyInfo(){
        let myreg = /^1[3|4|6|7|5|8|9]\d{9}$/;
        let {company,type,name,mobile,des} = this.state;
        if(!myreg.test(this.state.mobile)){
            this.refs.toast.show('请输入正确的联系方式');
            return
        }

        NetUtil.post('/api/opencar/task/addCooperationPartner',{
            cooperationCompany:company,
            businessType:type,
            name:name,
            phone:mobile,
            describe:des
        }).then((res)=>{
            if(res.code==0){
                this.setState({
                    company: '',
                    type: '',
                    name: '',
                    mobile: '',
                    des: ''
                })
                this.props.navigation.navigate('companySuccess')
            }else{
                this.refs.toast.show(res.msg);
            }
        })
    }
    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <KeyboardAvoidingView behavior='position'>
                    <View style={styles.companyContainer}>
                        <Image style={styles.headImg} source={{uri:'https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/mini-biyong/hezuo.png'}} alt=""></Image>
                        <Text style={styles.tip}>亲爱的合作方您好，请填写以下合作信息</Text>
        
                            <View style={styles.infoList}>
                                <View style={styles.infoItem}>
                                    <Text style={styles.label}>公司名称</Text>
                                    <TextInput style={styles.input} value={this.state.company} name="cooperationCompany" placeholder="请输入公司名" autoComplete={false} placeholderTextColor="#999"  onChangeText={this.changeCompany.bind(this)}/>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={styles.label}>行业类型</Text>
                                    <TextInput style={styles.input} value={this.state.type} name="businessType" placeholder="请输入行业类型" autoComplete={false} placeholderTextColor="#999" onChangeText={this.changeType.bind(this)}/>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={styles.label}>联系人</Text>
                                    <TextInput style={styles.input} value={this.state.name} name="name" placeholder="请输入姓名" placeholderTextColor="#999" autoComplete={false} onChangeText={this.changeName.bind(this)}/>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={styles.label}>联系方式</Text>
                                    <TextInput style={styles.input} maxLength={11} value={this.state.mobile} name="phone" placeholder="请输入联系方式" autoComplete={false}  placeholderTextColor="#999" onChangeText={this.changeMobile.bind(this)}/>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={styles.label}>合作描述</Text>
                                    <TextInput name="describe" value={this.state.des} style={styles.input} placeholder="请输入合作描述"  autoComplete={false} placeholderTextColor="#999" onChangeText={this.changeDes.bind(this)}/>
                                </View>
                            </View>
                        
                        {
                            this.state.canGo?(<TouchableOpacity onPress={this.subCompanyInfo.bind(this)} style={styles.btn}><Text style={styles.btnText}>提交</Text></TouchableOpacity>):(<View style={styles.greyBtn}><Text style={styles.btnText}>提交</Text></View>)
                        }
                        <Toast 
                            ref="toast"
                            style={{padding:ptd(20)}} 
                            position='top'
                            textStyle={{fontSize:ptd(28),color:'#fff'}}
                        />
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    companyContainer:{
        paddingHorizontal:ptd(70),
        paddingVertical:ptd(60)
    },
    headImg:{
        width:ptd(140),
        height:ptd(115),
        marginBottom:ptd(76),
        alignSelf:'center'
    },
    tip:{
        fontFamily:'PingFangTC-Regular',
        fontSize:ptd(24),
        color:'#8F8F8F',
        letterSpacing:ptd(2.4),
        textAlign:'center',
        marginBottom:ptd(34)
    },
    infoList:{

    },
    infoItem:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:ptd(104),
        borderBottomWidth:ptd(2),
        borderBottomColor:'#eee'
    },
    label:{
        fontFamily:'PingFangTC-Regular',
        fontSize:ptd(28),
        color:'#8F8F8F',
        letterSpacing:ptd(2.2),
        lineHeight:ptd(104),
        width:ptd(160)
    },
    input:{
        padding:0,
        height:ptd(104),
        fontFamily:'PingFangTC-Medium',
        fontSize:ptd(28),
        color:'#000000',
        letterSpacing:ptd(2.8),
        flex:1,
        fontWeight:'bold'
    },
    btn:{
        backgroundColor:'#1BC787',
        shadowColor: 'rgb(213,213,213)',
        shadowOffset: {width: 0,height: 4},
        shadowOpacity: .5,
        shadowRadius: ptd(14),
        borderRadius:ptd(100),
        width:ptd(600),
        height:ptd(98),
        lineHeight:ptd(98),
        textAlign:'center',
        marginTop:ptd(100),
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    greyBtn:{
        backgroundColor:'#CFCFCF',
        shadowColor: 'rgb(213,213,213)',
        shadowOffset: {width: 0,height: 4},
        shadowOpacity: .5,
        shadowRadius: ptd(14),
        borderRadius:ptd(100),
        width:ptd(600),
        height:ptd(98),
        lineHeight:ptd(98),
        textAlign:'center',
        marginTop:ptd(100),
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }, 
    btnText:{
        fontFamily:'PingFangTC-Medium',
        fontSize:ptd(32),
        color:'#FFFFFF',
        letterSpacing:ptd(2.51),
    }
});