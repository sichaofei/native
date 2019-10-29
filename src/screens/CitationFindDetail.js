import React, { Component } from 'react';
import {View,StyleSheet,SafeAreaView,ScrollView,Text,TouchableOpacity,Image} from 'react-native';
import { withNavigation } from 'react-navigation';
import Toast, {DURATION} from 'react-native-easy-toast'
import { connect } from 'react-redux'
import NetUtil from '../utils/NetUtil';
import size, {ptd} from '../styles/SizeHelper.js';
class CitationFindDetail extends Component {
    static navigationOptions = {
        headerTitle: '违章详情'
    };
    constructor(props) {
        super(props);
        this.state={
            carInfo: {
                plate: '',
                illegalMsg: {illegalCount:'',illegalMoney:'',illegalScore:''},
                violateInfos: [],
                status: ''
            }
        }
    }
    componentDidMount(){
        console.log(this.props.navigation.state.params.plate)
        this.loadPlatInfo();
    }
    loadPlatInfo(){
        NetUtil.post('/dzy/getPlateMsg',
        {
            uid: this.props.user.openId,
            plate:this.props.navigation.state.params.plate
        })
        .then((res) => {
            console.log(res)
            if(res.code==1){
                this.setState({
                    carInfo: {
                        plate: res.results.illegalMsg.plate,
                        illegalMsg: res.results.illegalMsg,
                        violateInfos: res.results.violateInfos,
                        status: res.results.status
                    }
                })
            }
        });
    }
    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <ScrollView style={styles.historyWrap}>
                    <View style={styles.history}>
                        <View style={styles.historyInner}>
                            <Text style={styles.violatePlate}>{this.state.carInfo.plate}</Text>
                            <View style={styles.violateInfoOld}>
                                {
                                    this.state.carInfo.violateInfos.map((item,index)=>{
                                        return(
                                            <View style={styles.box}>
                                                <View style={styles.imgTip}>
                                                    <Image source={require('../imgs/hm_icon_timeline_hq.png')} style={styles.circle}></Image>
                                                    <View style={styles.line}></View>
                                                </View>
                                                <View style={styles.content}>
                                                    <View style={styles.violateTitle}>
                                                        <Text style={styles.violateDate}>{item.illegalTime}</Text>
                                                    </View>
                                                    <View style={styles.violateRow}>
                                                        <Text style={styles.violateLabel}>违章原因</Text>
                                                        <Text style={styles.violateP}>{item.reason}</Text>
                                                    </View>
                                                    <View style={styles.violateRow}>
                                                        <Text style={styles.violateLabel}>违章地点</Text>
                                                        <Text style={styles.violateP}>{item.location}</Text>
                                                    </View>
                                                    <View style={styles.violatePunish}>
                                                        <View style={styles.newIcon}>
                                                            <Image style={styles.logo} source={require('../imgs/hm_icon_points_hq.png')}></Image>
                                                            <Text style={styles.violatePunishCount}>{item.punishPoint?item.punishPoint:0}分</Text>
                                                        </View>
                                                        <View style={styles.newIcon}>
                                                            <Image style={styles.logo}  source={require('../imgs/hm_iocn_penalty_hq.png')}></Image>
                                                            <Text style={styles.violatePunishMoney}>{item.punishMoney?item.punishMoney:0}元</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                                {
                                    this.state.carInfo.violateInfos.map((item,index)=>{
                                        return(
                                            <View style={styles.box}>
                                                <View style={styles.imgTip}>
                                                    <Image source={require('../imgs/hm_icon_timeline_hq.png')} style={styles.circle}></Image>
                                                    <View style={styles.line}></View>
                                                </View>
                                                <View style={styles.content}>
                                                    <View style={styles.violateTitle}>
                                                        <Text style={styles.violateDate}>{item.illegalTime}</Text>
                                                    </View>
                                                    <View style={styles.violateRow}>
                                                        <Text style={styles.violateLabel}>违章原因</Text>
                                                        <Text style={styles.violateP}>{item.reason}</Text>
                                                    </View>
                                                    <View style={styles.violateRow}>
                                                        <Text style={styles.violateLabel}>违章地点</Text>
                                                        <Text style={styles.violateP}>{item.location}</Text>
                                                    </View>
                                                    <View style={styles.violatePunish}>
                                                        <View style={styles.newIcon}>
                                                            <Image style={styles.logo} source={require('../imgs/hm_icon_points_hq.png')}></Image>
                                                            <Text style={styles.violatePunishCount}>{item.punishPoint?item.punishPoint:0}分</Text>
                                                        </View>
                                                        <View style={styles.newIcon}>
                                                            <Image style={styles.logo}  source={require('../imgs/hm_iocn_penalty_hq.png')}></Image>
                                                            <Text style={styles.violatePunishMoney}>{item.punishMoney?item.punishMoney:0}元</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.pay}>
                    <View style={styles.payList}>
                        <Text style={styles.payItem}>{this.state.carInfo.illegalMsg.illegalCount}笔</Text>
                        <View style={styles.divider}></View>
                        <Text style={styles.payItem}>共{this.state.carInfo.illegalMsg.illegalMoney}元</Text>
                        <View style={styles.divider}></View>
                        <Text style={styles.payItem}>扣{this.state.carInfo.illegalMsg.illegalScore}分</Text>
                    </View>
                    <TouchableOpacity style={styles.sBtn}>
                        <Text style={styles.btnText}>立即办理</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    historyWrap:{
        paddingBottom: ptd(110),
        paddingLeft:ptd(30),
        paddingRight:ptd(30),
    },
    box:{
        display:'flex',
        flexDirection:'row',
    },  
    historyInner:{
        flex:1
    },
    violatePlate:{
        fontFamily: 'PingFangHK-Medium',
        fontSize: ptd(40),
        color: '#4F5761',
        letterSpacing: 0,
        lineHeight: ptd(40),
        paddingTop: ptd(50),
        marginBottom:ptd(50),
        textAlign:'center'
    },
    violateInfoOld:{
        marginRight:ptd(73),
        marginLeft:ptd(40)
    },
    imgTip:{
        width: ptd(38),
        marginRight: ptd(32),
        position: 'relative',
        overflow: 'hidden',
    },
    circle:{
        width: ptd(38),
        height: ptd(38)
    },
    line:{
        width: ptd(4),
        height: ptd(2000),
        opacity: 0.2,
        backgroundColor: '#1BC787',
        position: 'absolute',
        left: ptd(17)
    },
    content:{
        paddingBottom: ptd(84),
        flex: 1,
    },
    violateTitle:{
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        marginBottom: ptd(24),
        alignItems: 'center'
    },
    violateDate:{
        fontFamily: 'PingFangTC-Regular',
        fontSize: ptd(22),
        color: '#8F8F8F',
        letterSpacing: ptd(2.2),
    },
    violateRow:{
        display: 'flex',
        flexDirection:'row',
        paddingVertical: ptd(20),
        borderBottomColor:'#EFEFEF',
        borderBottomWidth:1,
        alignItems: 'flex-start',
        textAlign: 'left'
    },
    violateLabel:{
        fontSize: ptd(22),
        color: '#8F8F8F',
        letterSpacing: ptd(2.2),
        marginRight: ptd(30),
        paddingTop: ptd(10),
        alignSelf: 'flex-start'
    },
    violateP:{
        fontSize: ptd(28),
        color: '#4F5761',
        letterSpacing: ptd(2.8),
        lineHeight: ptd(44),
        flex: 1,
    },
    violatePunish:{
        width: ptd(570),
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'center',
        fontFamily: 'PingFangTC-Medium',
        fontSize: ptd(28),
        color: '#4F5761',
        letterSpacing: ptd(2.2),
        lineHeight: ptd(28),
        marginTop: ptd(50),
        flex:1,
    },
    violatePunishCount:{
        marginRight:ptd(150)
    },
    newIcon:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    logo:{
        width:ptd(32),
        height:ptd(31),
        marginRight:ptd(18)
    },
    pay:{
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:ptd(690),
        alignSelf:'center'
    },
    payList:{
        display:'flex',
        flexDirection:'row',
        flex: 1,
        alignItems: 'center',
        paddingLeft: ptd(20),
        backgroundColor: '#333',
        height:ptd(88)
    },
    payItem:{
        fontSize: ptd(22),
        color: '#fff',
        paddingLeft: ptd(20),
        paddingRight:ptd(20),
        borderRightColor: '#B5B5B5',
        borderBottomWidth:1
    },
    divider:{
        width:ptd(2),
        height:ptd(30),
        backgroundColor:'#B5B5B5',
    },
    sBtn:{
        backgroundColor: '#1BC787',
        width: ptd(248),
        height: ptd(98),
        lineHeight: ptd(98),
        fontFamily: 'PingFangHK-Medium',
        position: 'relative',
        top: ptd(-10),
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    btnText:{
        fontSize: ptd(36),
        color: '#FFFFFF',
        letterSpacing: ptd(2),
    }
});
export default connect(state=>{
    return {
        user:state.user,
    }
})(withNavigation(CitationFindDetail));