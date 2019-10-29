import React, { Component } from 'react';
import { connect } from 'react-redux'
import {View,Image, StyleSheet,SafeAreaView,TouchableOpacity,Text,FlatList,RefreshControl,} from 'react-native';
import CommonStyles from '../styles/CommonStyles';
import {create} from '../styles/StyleSheet.js';
// import TopBar from '../components/TopLine/TopBar'
// import Article from '../components/TopLine/Article'
import size, {ptd} from '../styles/SizeHelper.js';
import NetUtil from '../utils/NetUtil';
// import login from '../redux/loginAction.js';
import LoginNav from '../components/LoginNav.js';
// let tabText = ['头条资讯','开心一刻','好品优选'];
let tabText = ['头条资讯','开心一刻'];
class TopLine extends Component {
    constructor(props) {
        super(props);
        this.state={
            type:'头条资讯',
            curIndex:0,
            list: [],            /* 列表数据 */
            pageNum: 0,          /* 当前页数 */
            pageSize:5,         /* 每页条数 */
            count: 0,            /* 总条数 */
            refreshing: false,   /* 是否正在加载 */
            isEnd: false,        /* 是否加载完 */
            isNotList: false,    /* 是否未查询到数据 */
            isError: false,      /* 是否查询失败 */
            startRefresh:false ,  /*开始下拉刷新*/
            ableClick:true
        }
    }
    static navigationOptions = {
        tabBarLabel: '头条',
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={CommonStyles.tabBarIcon} source={require('../imgs/top_act.png')}/>
                );
            }
            return (
                <Image style={CommonStyles.tabBarIcon} source={require('../imgs/top_grey.png')}/>
            );
        },
    };
    typeChange(index) {
        if(index>1){
            index=0
            this.setState({
                curIndex:0,
                type:tabText[index],
                list: [],            /* 列表数据 */
                pageNum: 0,          /* 当前页数 */
                pageSize:5,         /* 每页条数 */
                count: 0,            /* 总条数 */
                refreshing: false,   /* 是否正在加载 */
                isEnd: false,        /* 是否加载完 */
                isNotList: false,    /* 是否未查询到数据 */
                isError: false,      /* 是否查询失败 */
                startRefresh:false ,  /*开始下拉刷新*/
                ableClick:true
            },()=>{
                this.getList(false)
            })
        }else{
            this.setState({
                curIndex:index,
                type:tabText[index],
                list: [],            /* 列表数据 */
                pageNum: 0,          /* 当前页数 */
                pageSize:5,         /* 每页条数 */
                count: 0,            /* 总条数 */
                refreshing: false,   /* 是否正在加载 */
                isEnd: false,        /* 是否加载完 */
                isNotList: false,    /* 是否未查询到数据 */
                isError: false,      /* 是否查询失败 */
                startRefresh:false ,  /*开始下拉刷新*/
                ableClick:true
            },()=>{
                this.getList(false)
            })
        }
    }
    componentDidMount(){
        let index=0;
        this.onEndReachedCalled = false;
        this.setState({
            curIndex:index,
            type:tabText[index],
        },()=>{
            this.getList(false)
        })
    }
    componentWillUnmount() {
        // this.onEndReachedCalled = false;
        // // 请注意Un"m"ount的m是小写
        
        // // 如果存在this.timer，则使用clearTimeout清空。
        // // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        // this.timer && clearTimeout(this.timer);
    }
    /**
     * 下拉刷新
     * @return {void}
     */
    onRefresh = () => {
        this.onEndReachedCalled = false;
        const {refreshing} = this.state;
        if(refreshing) return;
        this.setState({
            list: [],            /* 列表数据 */
            pageNum: 0,          /* 当前页数 */
            pageSize:5,         /* 每页条数 */
            count: 0,            /* 总条数 */
            refreshing: false,   /* 是否正在加载 */
            isEnd: false,        /* 是否加载完 */
            isNotList: false,    /* 是否未查询到数据 */
            isError: false,      /* 是否查询失败 */
            startRefresh:false ,  /*开始下拉刷新*/
            ableClick:true
        },()=>{
            this.getList(false)
        })
    }
    /**
     * 上拉加载
     * @return {void}
     */
    onEndReached = () => {
        if(!this.state.isEnd){
            this.getList(false);
        }
        this.onEndReachedCalled = true;
    }
    /**
     * 获取列表
     * @return {void}
     */
    getList = (isRefresh = true) => {
        const {refreshing, isEnd } = this.state;
        if(refreshing || isEnd) return;
        this.setState({
            refreshing: true
        });
        NetUtil.post('/api/info/news/classify/newsList',
        {platform: "2", classifyName: this.state.type, pageNum: this.state.pageNum, pageSize: this.state.pageSize,userId:this.props.user.userId})
        .then((res) => {
            this.setState({refreshing: false});
            if(res.code==0){
                /* 判断是否查询到数据 */
                if(this.state.pageNum === 1 && res.data.newsEntityList.length === 0){
                    this.setState({
                        isNotList: true,
                        isEnd: true,
                    });
                } else {
                    this.setState({
                        isNotList: false,
                        isEnd: false,
                        list:[...this.state.list,...res.data.newsEntityList],
                        count: res.data.totalCount
                    });
                }
                if(this.state.list.length >= this.state.count) {
                    this.setState({
                        isEnd: true,
                    });
                }else{
                    this.setState({
                         isEnd: false,
                         pageNum:this.state.pageNum+1
                    })
                }
            }

        })
    }
    goDetails(id){
        this.props.navigation.navigate('TopLineDetail',{wid:id})
    }
    signLove(id,index){
        if(!this.props.user.userId) {
            this.loginNav.showLogin();
            return;
        }
        if (this.state.ableClick == false) {
            return
        }
        let nums = this.state.list[index].dianzanStatus==1?1:-1;
        NetUtil.post('/api/info/news/dianzan',{
            id: id,
            num: nums,
            category: 'news',
            userId: this.props.user.userId
        }).then((res)=>{
            if(res.code==0){
                let newList = this.state.list;
                newList[index].dianzanStatus = res.data.dianzanStatus;
                newList[index].zanNews = res.data.dianzanNum;
                this.setState({
                    list:newList,
                    ableClick: true
                })
            }
        })
    }
    goIntro(id){
        this.props.navigation.navigate('carCoinIntro')
    }
    renderItem(row){
        return(
            <TouchableOpacity style={styles.outer} >
                <View style={[styles.inner,styles.border]}>
                    <TouchableOpacity onPress={()=>{this.goDetails(row.item.id)}}>
                        <Image style={styles.banner} source={{uri:row.item.headImage}}></Image>
                        <Text numberOfLines={2} style={styles.title}>{row.item.title}</Text>
                    </TouchableOpacity>
                    <View style={styles.info}>
                        <View style={styles.read}><Text>{row.item.reading} 人阅读了</Text></View>
                        <View style={styles.fun}>
                            <TouchableOpacity style={styles.love} onPress={()=>{this.signLove(row.item.id,row.index)}}>
                                <Image style={styles.loveIcon} source={(row.item.dianzanStatus==null||row.item.dianzanStatus==1)?require('../imgs/xh2_hq.png'):require('../imgs/xh2_grey_hq.png')}></Image>
                                <View style={styles.num}><Text>{row.item.zanNews}</Text></View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.discus} onPress={()=>{this.goIntro(row.item.id)}}>
                                <Image style={styles.disIcon} source={require('../imgs/carCoin.png')}></Image>
                                <View style={styles.num}><Text>{row.item.carToken}</Text></View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.share}>
                                <Image style={styles.shareIcon} source={require('../imgs/fenxaing_hq.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>  
                </View>  
            </TouchableOpacity>
        )
    }
    renderListHeader = () => {
        const { count } = this.state;
        const { ListHeaderComponent = () => <View></View> } = this.props;
        return ListHeaderComponent(this.state);
    }
    renderListFooter = () => {
        const { isEnd, refreshing } = this.state;
        return this.defaultListFooter(isEnd, refreshing);
    }
    defaultListFooter = () => {
        return (
            <View justify="center" align="center" style={styles.listFooterView}>
                {this.defaultListFooterContent()}
            </View>
        );
    }
    defaultListFooterContent = () => {
        const { isEnd, refreshing, isNotList, isError } = this.state;
        if(isNotList) {
            return (
                <Text style={styles.tipText}>没有数据哦！</Text>
            );
        }
        if(isEnd) {
            return [

                <Text style={styles.tipText} key={2}></Text>,

            ];
        }
        if(refreshing) {
            return (
                <Text style={styles.tipText}>正在加载...</Text>
            );
        }
        if(isError) {
            return (
                <Text style={styles.tipText}>查询失败，下拉重新加载！</Text>
            );
        }
        return (
            <Text style={styles.tipText}>上拉加载更多</Text>
        );
    }
    renderListEmpty = () => {
        return (
            <View style={styles.noData}>
               <Text style={styles.tipText}>没有数据哦！</Text> 
            </View>
        );
    }
    render() {
        const { list, refreshing } = this.state;
        return (
            <SafeAreaView style={[styles.container,styles.bg]}>
                <View
                    style={styles.scrollArea}
                    >
                    {
                        tabText.map((item,index)=>{
                            return (
                                <TouchableOpacity style={styles.nav}  key={index} onPress={()=>{this.typeChange(index)}}>
                                    <View
                                        style={this.state.curIndex==index?styles.scrollActiveItem:styles.scrollItem}
                                        >
                                        <Text style={this.state.curIndex==index?styles.scrollActiveText:styles.scrollText}>{item}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <FlatList
                    style={{flex:1,paddingTop:ptd(40)}}
                    data={list}
                    renderItem={this.renderItem.bind(this)}
          
                    onEndReachedThreshold={0.1}
                    onEndReached={this.onEndReached}
                    keyExtractor={item => item.id+''}
                    ListHeaderComponent={this.renderListHeader}
                    ListFooterComponent={this.renderListFooter}
                    ListEmptyComponent={this.renderListEmpty}
                    ref={ref => this._listRef = ref}
                    refreshControl={
                        <RefreshControl
                          style={{
                            backgroundColor : 'transparent',
                          }}
                          refreshing={refreshing}
                          colors={['#ff0000', '#00ff00', '#0000ff']}
                          progressBackgroundColor={"#ffffff"}
                          onRefresh={() => {
                            this.onRefresh();
                          }}
                        />
                    }
                />
                <LoginNav 
                ref={r => this.loginNav = r}
                key={this.props.user.userId}
                navigation={this.props.navigation}
                prev='TopLine'/>
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
    container:{
        width:ptd(750),
        flex:1,
        alignItems:'center'
    },
    outer:{
       width:ptd(750),
       alignItems:'center',
       marginBottom:ptd(40)
    },
    inner:{
        width:ptd(670),
        alignItems:'center',
        backgroundColor:'#FFFFFF',
        shadowColor: 'rgb(213,213,213)',
        shadowOffset: {width: 0,height: 8},
        shadowOpacity: .5,
        shadowRadius: ptd(20),
        borderRadius:ptd(20),
    },
    scrollArea:{
        width:ptd(750),
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#fff',
        textAlign:'center',
        marginBottom:ptd(20)
    },
    nav:{
        width:0.33*ptd(750),
        display:'flex',
        flexDirection:'row',
        justifyContent:'center'
    },
    scrollItem:{
        width:ptd(120),
        textAlign:'center',
        paddingTop:ptd(16),
        paddingBottom:ptd(16),
        marginLeft:'auto',
        marginRight:'auto'
    },
    scrollActiveItem:{
        textAlign:'center',
        width:ptd(120),
        paddingTop:ptd(16),
        paddingBottom:ptd(12),
        marginLeft:'auto',
        marginRight:'auto',
        borderBottomWidth:2,
        borderColor:'#67d565',
    },
    banner:{
        width:ptd(670),
        height:ptd(320),
        borderRadius: ptd(10),
        marginBottom: ptd(20),
    },
    title:{
        fontFamily: 'PingFangSC-Light',
        fontSize: ptd(32),
        color: '#333',
        letterSpacing: ptd(1),
        width: ptd(670),
        marginBottom:ptd(20),
        paddingLeft:ptd(30),
        paddingRight:ptd(30)
    },
    tipText:{
        textAlign:'center',
        padding:ptd(20),
    },
    noData:{
        padding:ptd(200),
        width:ptd(750)
    },
    info:{
        width:ptd(670),
        margin:'auto',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:ptd(30),
        paddingRight:ptd(30),
        paddingBottom:ptd(40)
    },
    read:{
        fontFamily:'PingFangSC-Light',
        fontSize:ptd(48),
        color:'#000000',
        letterSpacing:ptd(2.53),
        flex:1
    },
    fun:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        // flex:1,
        alignSelf:'flex-end'
    },
    love:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        fontFamily:'PingFangSC-Light',
        fontSize:ptd(44),
        color:'#000000',
        marginRight:ptd(20),
    },
    share:{
        width:ptd(88),
        height:ptd(40),
        display:'none',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    loveIcon:{
        width:ptd(36),
        height:ptd(30),
        marginRight:ptd(5),
    },
    num:{
        // marginLeft:ptd(5)
    },
    discus:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        fontFamily:'PingFangSC-Light',
        fontSize:ptd(44),
        color:'#000000',
        marginRight:ptd(20),
    },
    disIcon:{
        width:ptd(30),
        height:ptd(30),
        marginRight:ptd(20)
    },
    shareIcon:{
        width:ptd(88),
        height:ptd(40),
        position:'relative',
    }
});
export default connect(state=>{
    return {
        user:state.user,
    }
})(TopLine);