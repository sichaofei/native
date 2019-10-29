import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import BaseComponent from '../components/BaseComponent';
import CommonStyles from '../styles/CommonStyles';
import NetUtil from '../utils/NetUtil';
import GlobalState from '../config/GlobalState';
import { connect } from 'react-redux';
import login, {saveLocation,changeFirst} from '../redux/loginAction.js';
import LoginNav from '../components/LoginNav.js';
import style from '../styles/HomeStyle';
import { NavigationEvents } from 'react-navigation';
import FirstLogin from "../components/FirstLogin.js"
class Home extends BaseComponent {
    static navigationOptions = {
        tabBarLabel: '首页',
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={CommonStyles.tabBarIcon} source={require('../imgs/home_act.png')}/>
                );
            }
            return (
                <Image style={CommonStyles.tabBarIcon} source={require('../imgs/home_grey.png')}/>
            );
        },
    }
    state = {
        visible: false,
        currencyTotalAmount: 0,
        productList: [],
        taskList: [
            {
                productTitle: '邀请好友',
                rewardTitle: '+3000币',
                icon: require("../imgs/task1.png"),
                page: 'InviteFriend'
              },
              {
                productTitle: '连续登陆',
                rewardTitle: '+52币',
                icon: require("../imgs/task2.png"),
                page: 'loginnum'
              },
              {
                productTitle: '阅读文章',
                rewardTitle: '+30币',
                icon: require("../imgs/task3.png"),
                page: 'ArticleRead'
              }
        ],
        navList: [
            {
                "title": "查违章",
                "img": require("../imgs/cwz.png"),
                'link': 'citationFind'
            },
            {
                "title": "查油价",
                "img": require("../imgs/cyj.png"),
                'link': 'citationFind'
            },
            {
                "title": "查路况",
                "img": require("../imgs/wlk.png"),
                'link': 'nearbyRoad'
            },
            {
                "title": "发现",
                "img": require("../imgs/found.png"),
                'link': 'serviceList'
            }
        ]
    };
    componentDidMount() {
        this.getData();
        this.getInfo();
        if(!this.props.user.userId) return;
     
    }
    ifFirstLogin(){
        if(this.props.user.userId&&this.props.user.todayFirstLogin==1){
           this.firstLogin.detail(this.props.user.userId)
        }
      
    }
    hideFirstLogin(){
        this.props.changeFirst(0)
    }
    getInfo() {
        NetUtil.post('/api/opencar/home/load',
          {
            userId: this.props.user.userId
          })
          .then(data => {
            this.setState({
              currencyTotalAmount: data.data.currencyTotalAmount
            })
          })
    }
    getData() {
        NetUtil.post('/api/opencar/goods/query',
          { pageSize: 2, pageNum: 1 })
          .then(data => {
            this.setState({
              productList: data.data.pageGoods.list
            })
          })
    }
    toLogon() {
        if(!GlobalState.userId) {
            this.setState({ visible: true });
        }
    }
    render() {
        const navs = this.state.navList.map(nav => {
            return (
                <TouchableOpacity style={style.navItem} 
                    key={nav.title}
                    onPress={() => this.props.navigation.navigate(nav.link)}>
                    <Image source={nav.img} alt='' style={style.navImage}/>
                    <Text style={style.navText}>{nav.title}</Text>
                </TouchableOpacity>
            )
        })

        const tasks = this.state.taskList.map(item => {
            return (
                    <TouchableOpacity style={style.taskItem} key={item.productTitle}
                        onPress={() => {
                            if(!this.props.user.userId) {
                                this.loginNav.showLogin();
                                return;
                            }
                            this.props.navigation.navigate(item.page)
                        }}>
                        <Image source={item.icon} style={style.taskImage} alt='' />
                        <View style={style.divider}></View>
                        <Text style={style.taskTitle}>{item.productTitle}</Text>
                        <Text style={style.rewardTitle}>{item.rewardTitle}</Text>
                    </TouchableOpacity>
            )
        })

        return (
            <ScrollView style={style.bg}>
                                    <NavigationEvents
      onDidFocus={()=>this.ifFirstLogin()}
    />
                <View>
                    <View style={style.homeHeader}>
                        {
                        this.props.user.avatar ? <Image source={{uri:this.props.user.avatar}} style={style.bgDefault}/> : 
                        <Image source={require('../imgs/home-bg.png')} style={style.bgDefault} alt=''/>
                        }
                        <View style={style.infoBg}>
                            <View style={style.infoProfile}>
                                <View style={style.titleBlock}>
                                    <Text style={style.title}>Car币</Text>
                                    {this.props.user.userId ? null :
                                    <TouchableOpacity style={style.loginBtn} onPress={() => {
                                        this.props.navigation.navigate("Bind")}
                                    }>
                                        <Text style={style.loginTxt}>登录</Text>
                                    </TouchableOpacity>
                                    }
                                </View>
                                {this.props.user.avatar ? <Image source={{uri:this.props.avatar}} style={style.avatar} />:
                                    <Image source={require('../imgs/avatar-default.png')} style={style.avatar} alt='' />
                                }
                            </View>
                            <View> 
                                {this.props.user.userId ?
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate("Carbihistory")}
                                }><Text style={style.infoMoney}>{this.state.currencyTotalAmount}</Text></TouchableOpacity> :
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate("Bind")}
                                }><Text style={style.noLogin}>请登录查看Car币</Text></TouchableOpacity>
                                }
                            </View>
                        </View>
                        <View style={style.violateBlock}>
                            {navs}
                        </View>
                        
                    </View>
                    <View style={style.homeItem}>
                        <View style={[style.homeTitle, style.homeTitleShop]}>
                            <Text style={style.homeTitleTxt}>Car币购物</Text>
                            <TouchableOpacity onPress={() => {this.props.navigation.navigate("Product")}}>
                                <Text style={style.shopLabel}>更多> </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={style.shopList}>
                            {
                                this.state.productList.map(item => {
                                    return (
                                        <TouchableOpacity style={style.shopItem} key={item.goodsId}
                                            onPress={()=>{this.props.navigation.navigate("ProductDetail", {goodsId: item.goodsId})}}>
                                            <Image source={{uri:item.coverImage}} style={style.shopImage}/>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={style.homeItem}>
                        <View style={style.homeTitle}>
                            <Text style={style.homeTitleTxt}>车主任务</Text>
                            <View style={style.labelBg}>
                                <Text style={style.taskLabel}>赚Car币</Text>
                            </View>
                        </View>
                        <View style={style.taskList}>
                        <ScrollView style={style.taskContainer} horizontal={true}>
                            {tasks}
                        </ScrollView>
                        </View>
                    </View>
                </View>
                <LoginNav 
                    ref={r => this.loginNav = r}
                    key={this.props.user.userId}
                    navigation={this.props.navigation}
                    prev='Home'/>
                <FirstLogin hide={this.hideFirstLogin.bind(this)}  ref={r => this.firstLogin = r}/>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
})
  
const mapDispatchToProps = dispatch => ({
    changeFirst: first=>dispatch(changeFirst(first))
})
  // 连接 tore 和组件
export default connect(mapStateToProps,mapDispatchToProps)(Home);