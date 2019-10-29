import React, { Component } from 'react';
import {View,StyleSheet,SafeAreaView,TextInput,Text,TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';
import Toast, {DURATION} from 'react-native-easy-toast'
import { connect } from 'react-redux'
import CommonStyles from '../styles/CommonStyles';
let Dimensions = require('Dimensions');
import NetUtil from '../utils/NetUtil';
class EvaArea extends Component {
    static navigationOptions = {
        headerTitle: '评论'
    };
    constructor(props) {
        super(props);
        this.state={
            content:'',
            id:''
        }
    }
    componentDidMount(){
        this.setState({
            id:this.props.navigation.state.params.id
        })
    }
    sendDis() {
        if (this.state.content.length == 0) {
            this.refs.toast.show('评论不能为空');
            return
        }
        NetUtil.post('/api/info/news/dicussAdd',{
            newsitemId: this.state.id,
            content: this.state.content,
            nickName: this.props.user.nickName,
            headUrl: this.props.user.avatar,
            userId: this.props.user.userId
        }).then((res)=>{
            if(res.code==0){
                this.props.navigation.goBack();
                this.props.navigation.state.params.refresh()
            }
        })
    }
    render() {
        return (
            <SafeAreaView style={CommonStyles.container}>
                <View style={styles.evaContainer}>
                    <TextInput
                        style={styles.textInputStyle}
                        multiline = {true}
                        maxLength = {200}
                        numberOfLines = {6}
                        onChangeText={(content) => {this.setState({content})}}
                        value={this.state.content}
                        placeholder="优质评论将会被优先展示"
                        contextMenuHidden={true}
                    />
                    {
                        this.state.content.length?(
                            <TouchableOpacity style={styles.evaBtn} onPress={this.sendDis.bind(this)}>
                                <Text style={styles.evaText}>发送</Text>
                            </TouchableOpacity>
                        ):(
                            <TouchableOpacity style={styles.disableBtn} onPress={this.sendDis.bind(this)}>
                                <Text style={styles.disText}>发送</Text>
                            </TouchableOpacity>
                        )
                    }
                    <Toast 
                        ref="toast"
                        style={{padding:20}} 
                        position='center'
                        textStyle={{fontSize:28,color:'#fff'}}
                    />
                </View> 
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    evaContainer:{
        width:750,
        display:'flex',
        // justifyContent:'center',
    },
    textInputStyle: {
        width:650,
        height:350,
        marginTop:40,
        backgroundColor:'#F8F8F8',
        borderRadius: 20,
        marginLeft:50,
        fontFamily: 'PingFangHK-Light',
        fontSize: 34,
        color: '#9B9B9B',
        letterSpacing: 0,
        paddingLeft:30,
        paddingRight:30,
        paddingTop:30,
        paddingBottom:30
    },
    evaBtn:{
        width: 180,
        height: 70,
        backgroundColor: '#1BC787',
        borderRadius: 100,
        textAlign: 'center',
        lineHeight: 70,
        alignSelf:'flex-end' ,
        marginRight:50,
        marginTop:40,
    },
    evaText:{
        fontFamily: 'PingFangHK-Medium',
        fontSize: 34,
        color: '#FFFFFF',
        letterSpacing: 0,
        textAlign:'center',
        lineHeight:70,
    },
    disableBtn:{
        width: 180,
        height: 70,
        backgroundColor: '#F8F8F8',
        borderRadius: 100,
        textAlign: 'center',
        lineHeight: 70,
        alignSelf:'flex-end' ,
        marginRight:50,
        marginTop:40,
    },
    disText:{
        fontFamily: 'PingFangHK-Light',
        fontSize: 34,
        color: '#B5B5B5',
        letterSpacing: 0,
        textAlign:'center',
        lineHeight:70,
    }
});
export default connect(state=>{
    return {
        user:state.user,
    }
})(withNavigation(EvaArea));