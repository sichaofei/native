import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SwipeListView ,SwipeRow} from 'react-native-swipe-list-view';
import Toast, {DURATION} from 'react-native-easy-toast'
import {View, Text, Image, StyleSheet,FlatList,Dimensions,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import NetUtil from '../utils/NetUtil';
import CommonStyles from '../styles/CommonStyles';
let {width, height} = Dimensions.get('window');
import {create} from '../styles/StyleSheet.js';
class MyCars extends Component{
    static navigationOptions = {
        headerTitle: '我的车库'
    };
   
    constructor(props){
        super(props)
        this.state={
            listViewData:[
              {name:"scf"},
              {name:"123"},
              {name:"123"}
            ],
            carInfos:[],
            img:[
               require("../imgs/blue.png"),
               require("../imgs/yellow.png"),
               require("../imgs/green.png")
            ]
        }
    }

    doSomething(){

    }
    componentDidMount(){
        this.loadPlate() 
    }
    // 查找车辆
    loadPlate() {
        // Toast.loading("加载中...",0)
       let openId=this.props.user.openId
        NetUtil.get("/dzy/getPlateList/"+openId).then((res)=>{
            if(res.code==1){
                const data = res.results
                let msgs = this.loadPlateMsg(data)
                console.log(res)
				Promise.all(msgs).then(res => {
                    let carInfos = this.state.carInfos
                    
					res.map((item, index) => {
						let carInfo = carInfos[index]
						if (item.code ==1) {
                           
							if (item.results) {
                                // alert(JSON.stringify(item.results))
								const results = item.results;
								carInfo.illegalMsg = results.illegalMsg
								carInfo.violateInfos = results.violateInfos || []
								carInfo.status = results.status
							}
						} else {
							carInfo.illegalMsg.day = 0;
							carInfo.illegalMsg.illegalMoney = 0;
							carInfo.illegalMsg.illegalCount = 0;
							carInfo.illegalMsg.illegalScore = 0;
							carInfo.violateInfos = [];
							carInfo.status = 0;
						}
                    })
					this.setState({
						carInfos: carInfos
                    })
                    
                })
                Promise.all(msgs).catch(()=>{
                   
                })
            }else{
                
            }
        })
        .catch((res)=>{
            alert(JSON.stringify(res))
        })

    }
    loadPlateMsg(data) {
        let openId=this.props.user.openId
		let carInfos = []
		let list = data.map(plate => {
			let carInfo = {}
			carInfo.plate = plate
			carInfo.illegalMsg = {}
            carInfos.push(carInfo)
            let init = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
					uid: openId,
					plate: plate
				})
            };
            const req = NetUtil.post('/dzy/getPlateMsg',{
                uid: openId,
                plate: plate
            })
			return req
        })
        
		this.setState({
			carInfos: carInfos
		},()=>{
            let carInfos=this.state.carInfos
            for(var a=0;a<carInfos.length;a++){
                carInfos[a].url=this.state.img[a]
            }
            this.setState({
                carInfos:carInfos
                })
        })
		return list
    }
    // 删除车辆
    delete(plate){
        let openId=this.props.user.openId
        let num
        let list=this.state.carInfos
        list.forEach((item,index)=>{
            if(item.plate==plate){
                num=index
            }
        })
        NetUtil.post('/dzy/delPlate',{
            uid: openId,
            plate: plate
        })
        .then((res)=>{
            console.log(res)
            if(res.code==1){
                if(res.results==true){
                    list.splice(num,1)
                    this.setState({
                        carInfos:list 
                    })
                }else{
                    this.refs.toast.show('删除失败');
                }
            }
        }).catch(()=>{
            
        })
    }
    // 添加车辆
    addNewCar(){
        let list=this.state.carInfos
        if(list.length==3){
            this.refs.toast.show('每个用户最多可添加3辆车');
            return
        }
        this.props.navigation.navigate("Addcar",{title:"添加车辆",set:(()=>{
            this.loadPlate()
        })})
    }
    // 编辑车辆
    editcar(plate){
        this.props.navigation.navigate("Addcar",{plate:plate,title:'编辑车辆'})
    }
    render() {
        return (
            <View style={CommonStyles.container} >
            {this.state.carInfos.length==0?<View style={styles.noban}>
                    <Image style={styles.nocar} source={require('../imgs/carno.png')}></Image>
                    <Text style={styles.nocon}>你的车库没有车</Text>
                </View>:<View>
                <View><Text style={styles.cartitle}> 每个用户最多可添加<Text style={styles.carnum}>3</Text>辆车</Text></View>
               
                <SwipeListView
                style={{marginRight:40,marginLeft:40,width:670}}
                useFlatList
                disableRightSwipe={true}
                data={this.state.carInfos}
                closeOnRowPress={true}  //当按下一行，关闭打开的行
                closeOnScroll={true}    //列表滚动时关闭打开的行
                stopRightSwipe={-134}   //列表项右滑translateX最大的值：负值
                closeOnRowBeginSwipe= {true}
                renderItem={ (data, rowMap) => (
                    <TouchableWithoutFeedback onPress={()=>this.editcar(data.item.plate)}>
                    <View style={[styles.rowFront,styles.bg]}>
                            <View style={styles.rowLeft}>
                             <Text style={styles.plate}>{data.item.plate}</Text>
                              <View style={styles.detail }><Text style={styles.cardetail}>未处理{data.item.illegalMsg.illegalCount}</Text><Text style={styles.cardetail}>罚款{data.item.illegalMsg.illegalMoney}</Text><Text style={styles.cardetail}>扣分{data.item.illegalMsg.illegalScore}</Text></View>
                            </View>
                            <View style={styles.rowRight}>
                                <Image source={data.item.url}></Image>
                            </View>
                    </View>
                    </TouchableWithoutFeedback>
                )}
                renderHiddenItem={ (data, rowMap) => (
                    <TouchableOpacity onPress={()=>this.delete(data.item.plate)}>
                    <View style={styles.rowBack}>
                        <View style={styles.leftView}>
                            <Text style={{color: 'white',fontSize:28}}>删除</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                )}
            rightOpenValue={-134}
        />

                </View>
        }
           <TouchableOpacity style={styles.add} onPress={()=>this.addNewCar()}>
                <View  >
                    <Text style={styles.addcar}>+</Text>
                </View>
            </TouchableOpacity>
            <Toast 
                        ref="toast"
                        style={{marginRight:370}}
                        positionValue={100}
                        textStyle={{fontSize:28,color:'#fff'}}
                    />
        </View>

        )
    }
}
const styles = create({
    carcon:{
        width:670,
        paddingRight: 40,
        marginLeft:40
    },
    bg:{
        android:{
            backgroundColor: '#f8f8f8',
        }
    },
    outView: {
        flex: 1,
        marginTop: 22
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flexDirection: 'row',
        justifyContent: "flex-end",
    },
    rowFront: {
        flexDirection:"row",
        backgroundColor: 'white',
        marginBottom: 20,
        height:200,
        shadowColor:"rgb(138,138,138);",
        backgroundColor: "#FFFFFF",
        shadowOpacity:0.1,
        shadowOffset:{width: 0,height: 14},
        shadowRadius:5,
         paddingLeft: 40,
         paddingRight:40,
         justifyContent:"space-between"
    },
    leftView: {
        width:134,
        alignItems: 'center',
        backgroundColor: 'green',
        height: 200,
        justifyContent: 'center',
        backgroundColor:"red"
    },
    plate:{
        color:"#4A4A4A",
        fontSize: 38
    },
    detail:{
        flexDirection:"row",
        marginTop:14
    },
    rowLeft:{
       justifyContent:"center"
    },
    cardetail:{
        color:"#9B9B9B",
        fontSize:24,
        marginRight:30
    },
    carnum:{
        fontSize:32,
        color:"#1BC787"
    },
    cartitle:{
        fontSize:24,
        color:"#333333",
        marginLeft:40,
        marginTop:48,
        marginBottom:50
    },
    add:{
        width:101,
        height:101,
        borderRadius: 101,
        backgroundColor: "#1BC787",
        justifyContent:"center",
        alignItems:"center",
        position: "absolute",
        left:601,
        top:height+300
    },
    addcar:{
        fontSize:50,
        color:"white"
    },
    nocar:{
        width:200,
        height:268,
        marginBottom:120
    },
    nocon:{
        fontSize:34,
        color:"#333333"
    },
    noban:{
        alignItems:"center",
        justifyContent:"center",
        width:750,
        marginTop:188
    },

})
const mapStateToProps = state => ({
    user: state.user
  })
  export default connect(mapStateToProps)(MyCars);