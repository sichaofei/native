import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    RefreshControl,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import NetUtil from '../../utils/NetUtil';
let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
class Article extends Component {
    constructor(props){
        super(props);
        this.state={
            type:'',
            list: [],            /* 列表数据 */
            pageNum: 0,          /* 当前页数 */
            pageSize:3,         /* 每页条数 */
            count: 0,            /* 总条数 */
            refreshing: false,   /* 是否正在加载 */
            isEnd: false,        /* 是否加载完 */
            isNotList: false,    /* 是否未查询到数据 */
            isError: false,      /* 是否查询失败 */
            startRefresh:false ,  /*开始下拉刷新*/
            ableClick:true
        }
    }
    static navigationOptions = () => ({
            header: '头条',
        }
    );
    static getDerivedStateFromProps(nextProps,prevState){
        const {type} = nextProps;
        // 当传入的type发生变化的时候，更新state
        if (type !== prevState.type) {
            return {
                type,
                pageNum:0,
                list:[],
                count:0,
                refreshing:false,
                isEnd:false,
                isNotList:false,
                isError:false
            };
        }
        // 否则，对于state不进行任何操作
        return null;
    }
    componentDidUpdate(){
        this.timer=setTimeout(()=>{
            if(this.state.list.length==0){
                this.getList(false)
            }
        },10)
    }
    componentDidMount(){
        this.onEndReachedCalled = false;
        this.getList(false)
    }
    componentWillUnmount() {
        // 请注意Un"m"ount的m是小写
        
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }
    /**
     * 下拉刷新
     * @return {void}
     */
    onRefresh = () => {
        return;
        const {refreshing} = this.state;
        if(refreshing) return;
        this.setState({
            pageNum:0,
            list:[],
            count:0,
            isEnd:false,
            isNotList:false,
            isError:false
        },()=>{
            this.getList(false)
        })
    }
    /**
     * 上拉加载
     * @return {void}
     */
    onEndReached = () => {
        if(!this.state.isEnd&&this.onEndReachedCalled){
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
        console.log(this.state.type,this.state.pageNum)
        NetUtil.post('/api/info/news/classify/newsList',
        {platform: "2", classifyName: this.state.type, pageNum: this.state.pageNum, pageSize: this.state.pageSize,userId:this.props.user.userId})
        .then((res) => {
            console.log(res)
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
    goEva(id){
        console.log(this)
        this.props.navigation.navigate('EvaArea',{id:id})
    }
    renderItem(row){
        console.log(row)
        return(
            <TouchableOpacity style={styles.outer} >
                <TouchableOpacity onPress={()=>{this.goDetails(row.item.id)}}>
                    <Image style={styles.banner} source={{uri:row.item.headImage}}></Image>
                    <Text numberOfLines={2} style={styles.title}>{row.item.title}</Text>
                </TouchableOpacity>
                <View style={styles.info}>
                    <View style={styles.read}><Text>{row.item.reading} 人阅读了</Text></View>
                    <View style={styles.fun}>
                        <TouchableOpacity style={styles.love} onPress={()=>{this.signLove(row.item.id,row.item.index)}}>
                            <Image style={styles.loveIcon} source={(row.item.dianzanStatus==null||row.item.dianzanStatus==1)?require('../../imgs/xh2_hq.png'):require('../../imgs/xh2_grey_hq.png')}></Image>
                            <View style={styles.num}><Text>{row.item.zanNews}</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.discus} onPress={()=>{this.goEva(row.item.id)}}>
                            <Image style={styles.disIcon} source={require('../../imgs/carCoin.png')}></Image>
                            <View style={styles.num}><Text>{row.item.carToken}</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.share}>
                            <Image style={styles.shareIcon} source={require('../../imgs/fenxaing_hq.png')}></Image>
                        </TouchableOpacity>
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

        return(
            <TouchableOpacity style={styles.scrollContainer}>
                <FlatList
                    style={{flex:1}}
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
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    scrollContainer: {
        height:height-140,
        backgroundColor: '#Fff',
        position:'absolute',
        top:80,
        left:0,
        width:width,
        zIndex:900,
        flex:1
    },
    outer:{
        width:width,
        justifyContent:'center',
        alignItems:'center',
        paddingTop:15,
    },
    banner:{
        width:335,
        height:160,
        borderRadius: 5,
        marginBottom: 10,
    },
    title:{
        fontFamily: 'PingFangSC-Light',
        fontSize: 16,
        color: '#333',
        letterSpacing: 0.5,
        width: 335,
        marginBottom:10,
        paddingLeft:15,
        paddingRight:15
    },
    tipText:{
        textAlign:'center',
        padding:10,
    },
    noData:{
        padding:100,
    },
    info:{
        width:335,
        margin:'auto',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:15,
        paddingRight:15
    },
    read:{
        fontFamily:'PingFangSC-Light',
        fontSize:24,
        color:'#000000',
        letterSpacing:2.53,
    },
    fun:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    love:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        fontFamily:'PingFangSC-Light',
        fontSize:22,
        color:'#000000',
        marginRight:25,
    },
    share:{
        width:44,
        height:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    loveIcon:{
        width:16,
        height:15,
        marginRight:10,
    },
    num:{

    },
    discus:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        fontFamily:'PingFangSC-Light',
        fontSize:22,
        color:'#000000',
        marginRight:25,
    },
    disIcon:{
        width:15,
        height:15,
        marginRight:10
    },
    shareIcon:{
        width:44,
        height:20,
        position:'relative',
    }
});
export default connect(state=>{
    return {
        user:state.user,
    }
})(withNavigation(Article));