import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, Text, TouchableOpacity, Image, Clipboard}from 'react-native';
import NetUtil from '../utils/NetUtil';
import CommonStyles from '../styles/CommonStyles';
import Toast from 'react-native-easy-toast';
import style from '../styles/InviteStyle';

class InviteFriend extends Component {
    state={
        inviteNum: '',
        difference: '',
        invitationCode: '123',
        showCopy: false,
        awardArr: [
            [{ 'num': 3, 'zuan': 100 }, { 'num': 5, 'zuan': 150 }, { 'num': 10, 'zuan': 300 }],
            [{ 'num': 13, 'zuan': 125 }, { 'num': 15, 'zuan': 176 }, { 'num': 20, 'zuan': 330 }],
            [{ 'num': 23, 'zuan': 150 }, { 'num': 25, 'zuan': 200 }, { 'num': 30, 'zuan': 191 }],
            [{ 'num': 33, 'zuan': 174 }, { 'num': 35, 'zuan': 200 }, { 'num': 40, 'zuan': 207 }],
            [{ 'num': 43, 'zuan': 198 }, { 'num': 45, 'zuan': 258 }, { 'num': 50, 'zuan': 238 }],
          ],
        stage:1,
    }
    componentDidMount() {
        NetUtil.post('/api/opencar/task/getMyInvitation',{
            userId: this.props.user.userId
        }).then(json=>{
            this.setState({
                inviteNum: json.data.myInvitationInfo.inviteNum,
                difference: json.data.myInvitationInfo.difference,
                stage: json.data.myInvitationInfo.stage-1
            })
        })
        NetUtil.post('/api/opencar/task/getInvitationCode',{
            userId: this.props.user.userId
        }).then(json=>{
            this.setState({
                invitationCode: json.data.InvitationCode.invitationCode
            })
        })
    }
    render() {
        return (
            <View style={CommonStyles.container}>
                <View style={style.invite}>
                    <View style={style.inviteInfo}>
                        <Image source={require('../imgs/invite-friend.png')} style={style.inviteLogo}></Image>
                        <View style={style.inviteTitle}>
                            <Text style={style.titleTxt}>已邀请 </Text><Text style={style.inviteTotal}>{this.state.inviteNum}</Text><Text style={style.titleTxt}> 个</Text> 
                        </View>
                        <View style={style.inviteTips}>
                            <Text style={style.tipsTxt}>距离下一次奖励还差 </Text><Text style={style.inviteNo}>{this.state.difference}</Text><Text style={style.tipsTxt}> 人，让好朋友助你一臂之力</Text>
                        </View>
                    </View>
                    <View style={style.inviteRules}>   
                        {
                            this.state.awardArr[this.state.stage].map(item => 
                                <View style={style.inviteItem}>
                                    <Text style={style.itemTxt}>邀请{item.num}个好友，奖励{item.zuan}Car币</Text>
                                </View>
                            )
                        }
                    </View>
                    <TouchableOpacity style={style.inviteBtn}
                        onPress={()=>{
                            this.setState({
                                showCopy: true
                            })
                        }}>
                        <Text style={style.btnTxt}>邀请好友</Text>
                    </TouchableOpacity>
                    {this.state.showCopy ?
                        <View style={style.mask}>
                            <View style={style.copyPopup}>
                                <Text style={style.copyTitle}>邀请码已复制</Text>
                                <Text style={style.copySubtitle}>发送到微信／QQ立即邀请好友</Text>
                                <TouchableOpacity style={style.copyBtn}
                                    onPress={()=>{
                                        this.setState({
                                            showCopy: false
                                        })
                                        Clipboard.setString(this.state.invitationCode);
                                        this.refs.toast.show('邀请码已复制成功，请粘贴给好友');
                                    }}>
                                    <Text style={style.copyTxt}>粘贴給好友</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <View></View>
                    }
                    <Toast 
                        ref="toast"
                        style={{marginRight:370, padding: 30,}}
                        positionValue={100}
                        textStyle={{fontSize:28,color:'#fff'}}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
})
  // 连接 tore 和组件
export default connect(mapStateToProps)(InviteFriend);