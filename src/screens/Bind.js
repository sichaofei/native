import React from 'react';
import {View, Text, AsyncStorage, StyleSheet, TouchableOpacity, Image, TextInput, BackHandler} from 'react-native';
import NetUtil from '../utils/NetUtil';
import BaseComponent from '../components/BaseComponent';
import CommonStyles from '../styles/CommonStyles';
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';
import login from '../redux/loginAction.js'
import {ptd} from '../styles/SizeHelper.js';

class Bind extends BaseComponent {
    _didFocusSubscription;
    _willBlurSubscription;
    static navigationOptions = ({navigation}) =>({
        headerTitle: '登录',
        headerLeft:(
            <TouchableOpacity  onPress={()=>navigation.state.params.navigatePress()}>
                <Image
                    source={require('../imgs/back.png')}
                    style={{ width: 15, height: 15, marginLeft: 10 }}
                    />
            </TouchableOpacity>
        ),
    });
    state = {
        btnTxt: '获取验证码',
        disable: false,
        phone: '',
        gray: true,
        userId:'',
        openId:'',
        mobile:'',
        avatar:'',
        nickName:'',
        code:'',
        todayFirstLogin:0
    }
    constructor(props) {
        super(props);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
          BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
      }
    componentDidMount() {
        this.props.navigation.setParams({ navigatePress:this.onBackButtonPressAndroid });
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }
    onBackButtonPressAndroid = () => {
        const navigation = this.props.navigation;
        const prev = navigation.getParam('prev');

        if(prev== 'Profile' || prev == 'Home') {
            navigation.navigate('Home');
            return
        }
        navigation.goBack();
        return true;
    };
    
    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }
    getCode() {
        if(this.state.disable) return;

        if (this.state.phone == '') {
            this.refs.toast.show('请输入手机号');
            return;
        }
        let myreg = /^1[3|6|7|5|8|9]\d{9}$/;
        if (!myreg.test(this.state.phone) || this.state.phone == '') {
            this.refs.toast.show('请输入有效的手机号码！');
            return false;
        }
        this.setState({
          disable: true
        })
        
        fetch('https://sms.chetuobang.com/sms.php?sms_type=1&tel_phone='+ this.state.phone
        ).then(response => {
            console.log(response._bodyText)
        })
        
        this.countDown(60);
    }
    countDown(i) {
        const me = this;
        me.timer = setTimeout(function () {
          if (i < 1) {
            me.setState({
              btnTxt: '获取验证码',
              disable: false
            })
    
            clearTimeout(me.timer);
            return;
          }
          me.setState({
            btnTxt: i-- + '秒再次获取'
          })
    
          me.countDown(i);
        }, 1000);
    }
    submit() {
        AsyncStorage.setItem('userId',"12321");
        if(this.state.gray) return;
    
        const me = this;
        fetch('https://sms.chetuobang.com/sms.php?sms_type=2&tel_phone='+ this.state.phone
               +'&verify_code=' + this.state.code
        ).then(response => {
            let txt = response._bodyText;
            txt = txt.replace('callback(', '').replace(')', '');
            txt = JSON.parse(txt);

            if (txt.code == 200) {
                me.login();
            } else {
                me.refs.toast.show("验证失败");
            }
        })
    
    }
    login() {
       
        const me = this;
        const prev = this.props.navigation.getParam('prev') || 'Home';
        const wid = this.props.navigation.getParam('wid');

        NetUtil.post('/api/opencar/user/login', {
            mobile: this.state.phone,
            from: 'IOS'
        }).then(json => {
            const data = json.data;
            me.props.login(data);

            AsyncStorage.setItem('phone', this.state.phone);
            AsyncStorage.setItem('userId', data.userId);
            this.props.navigation.navigate(prev, {wid:wid});
        })
    }
    render() {
        return (
            <View>
                <Image source={require('../imgs/login-bg.png')} style={{width: ptd(750), height:ptd(486)}}/>
                <View style={styles.loginBg}>
                    <View style={styles.infoBlock}>
                        <View style={styles.infoItem}>
                            <Text style={styles.label}>手机号</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="请输入手机号"
                                onChangeText={(phone) => this.setState({phone})}
                                />
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.label}>验证码</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="请输入验证码"
                                onChangeText={(code) => {
                                    this.setState({
                                        code
                                    })
                                    if(code.length == 4) {
                                        this.setState({
                                          gray: false
                                        })
                                    }else{
                                        this.setState({
                                            gray: true
                                        })
                                    }
                                }}
                                />
                            <TouchableOpacity onPress={()=>this.getCode()}>
                                <Text style={styles.codeBtn}>{this.state.btnTxt}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {this.state.gray?
                        <View style={styles.grayBtn}><Text style={styles.submitTxt}>立即开启</Text></View>
                        :
                        <TouchableOpacity style={styles.bindBtn}
                            onPress={this.submit.bind(this)}>
                            <Text style={styles.submitTxt}>立即开启</Text>
                        </TouchableOpacity>
                    }
                    
                    <TouchableOpacity style={styles.agreement} 
                        onPress={() => this.props.navigation.navigate("Web", {url: "https://bqtv.chetuobang.com/rn/protocol.html"})}>
                        <Text style={styles.agreementTxt}>开启即表示同意</Text><Text style={styles.blue}>《用户服务协议》</Text>
                    </TouchableOpacity>
                </View>
                <Toast 
                    ref="toast"
                    style={{padding: ptd(30), }}
                    position='center'
                    positionValue={100}
                    textStyle={{fontSize:ptd(28),color:'#fff'}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginBg: {
        width: ptd(750),
        height: ptd(670),
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoBlock: {
        marginHorizontal: ptd(108),
        marginBottom: ptd(134),
        marginTop: ptd(110),
    },
    infoItem: {
        borderBottomColor: '#EFEFEF',
        borderBottomWidth: 1,
        height: ptd(104),
        lineHeight: ptd(104),
        alignItems: 'center',
        flexDirection: 'row',
    },
    label: {
        fontSize: ptd(28),
        color: '#8F8F8F',
    },
    input: {
        height: ptd(104),
        lineHeight: ptd(104),
        marginLeft: ptd(60),
        color: '#333333',
        width: ptd(240),
    },
    codeBtn: {
        borderColor: '#B5B5B5',
        borderWidth: 1,
        backgroundColor: '#fff',
        fontFamily: 'PingFangTC-Light',
        fontSize: ptd(22),
        color: '#B5B5B5',
        width: ptd(146),
        height: ptd(46),
        lineHeight: ptd(46),
        textAlign: 'center',
    },
    bindBtn: {
        backgroundColor: '#1BC787',
        shadowColor: '#B5B5B5',
        shadowOffset: {x:0, y:4},
        shadowRadius: ptd(8),
        borderRadius: ptd(100),
        width: ptd(600),
        height: ptd(98),
    },
    grayBtn: {
        backgroundColor: '#CCCCCC',
        shadowColor: '#B5B5B5',
        shadowOffset: {x:0, y:4},
        shadowRadius: ptd(8),
        borderRadius: ptd(100),
        width: ptd(600),
        height: ptd(98),
    },
    submitTxt: {
        height: ptd(98),
        lineHeight: ptd(98),
        fontFamily: 'PingFangTC-Medium',
        fontSize: ptd(32),
        color: '#FFFFFF',
        textAlign: 'center',
    },
    agreement: {
        marginTop: ptd(32),
        flexDirection: 'row',
    },
    agreementTxt: {
        fontFamily: 'PingFangTC-Medium',
        fontSize: ptd(22),
        color: '#B5B5B5',
    },
    blue: {
        color: '#1BC787',
    }
});

const mapStateToProps = state => ({
    user: state.user
})
  
const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user))
})
  // 连接 tore 和组件
export default connect(mapStateToProps,mapDispatchToProps)(Bind);