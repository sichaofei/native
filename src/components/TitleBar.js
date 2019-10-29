import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
   Text,
   View,
   Image,
   StatusBar,
   TouchableOpacity,
   StyleSheet,
} from 'react-native'; 
import size, {ptd} from '../styles/SizeHelper';
export default class TitleBar extends Component {
   static propTypes = {
       title: PropTypes.string.isRequired,
       navigation: PropTypes.object.isRequired,
       hideLeftArrow: PropTypes.bool,
       pressLeft: PropTypes.func,
       pressRight: PropTypes.func,
       left: PropTypes.string,
       backgroundColor: PropTypes.string,
       titleColor: PropTypes.string,
       right: PropTypes.oneOfType([
           PropTypes.string,
           PropTypes.object,
       ]),
       rightImage: Image.propTypes.source,
       LifeImage: Image.propTypes.source,
       statusBarBgColor: PropTypes.string,
       barStyle: PropTypes.string, 
   }

   static defaultProps = { 
       title: "",
       hideLeftArrow: false,
       pressRight: () => {
       },
   }

   back() {
       if (this.props.pressLeft) {
           this.props.pressLeft()
           return
       }
       this.props.navigation.goBack(); 
   }

   render() {
       const {backgroundColor, titleColor} = this.props
       return (
           <View style={[TitleStyle.titleBar, backgroundColor ? {backgroundColor: backgroundColor} : null]}> 
                   <StatusBar
                       backgroundColor={this.props.statusBarBgColor || "transparent"}
                       barStyle={this.props.barStyle || 'light-content'}
                       translucent={true}/> 
                <View style={TitleStyle.statusBar}/>

               <View style={TitleStyle.titleBarContent}>
                   {this.props.hideLeftArrow ? (
                       <View style={TitleStyle.left}/>
                   ) : (
                       <TouchableOpacity activeOpacity={1} onPress={this.back.bind(this)}
                                         style={TitleStyle.left}>
                           <Image style={TitleStyle.titleLeftImage}
                                  source={this.props.LifeImage || require('../imgs/back.png')}/>
                           <Text style={TitleStyle.leftText}>{this.props.left}</Text>
                       </TouchableOpacity>
                   )}
                   <View style={TitleStyle.middle}>
                       <Text numberOfLines={1}
                             style={[TitleStyle.middleTitle, titleColor ? {color: titleColor} : null]}>{this.props.title}</Text>
                   </View>
                   {this.renderRight()}
               </View>
           </View>
       );
   }

   renderRight() {
       if (!this.props.right && !this.props.rightImage) {
           return <View style={TitleStyle.right}/>
       }
       return (
           <TouchableOpacity activeOpacity={1} style={TitleStyle.right}
                             onPress={() => {
                                 this.props.pressRight()
                             }}>
               {typeof this.props.right == 'object' ? (this.props.right) : (
                   <Text style={TitleStyle.rightText}>{this.props.right}</Text>
               )}
               {this.props.rightImage ? (
                   <Image style={TitleStyle.rightImage} source={this.props.rightImage}/>
               ) : (null)}
           </TouchableOpacity>
       )
   }
}

const TitleStyle = StyleSheet.create({

   titleBar: {
       width: size.width,
       height: ptd(140),
       backgroundColor: 'red',
   },
   titleBarContent: {
       flexDirection: 'row',   
       height: ptd(80),
       alignItems: 'center',   
       width: size.width,
       justifyContent: 'space-between',
       height: ptd(60),
   },
   titleBarSearchContent: {
       flexDirection: 'row',   
       height: ptd(60),
       alignItems: 'center',   
       width: size.width,
       height: ptd(60),
   },

   searchLeftIcon: {
       width: ptd(30),
       height: ptd(38),
       resizeMode: 'stretch',
       marginLeft: ptd(24),
       marginRight:ptd(15) 
   },
   searchLeftText: {
       width:ptd(140),
       fontSize: ptd(30),
       color: "#ffffff",
   },

   searchBlock: {
       flexDirection: 'row',
       width: ptd(500),
       height: ptd(60),
       borderRadius: ptd(30),
       backgroundColor: "white", 
       alignItems: 'center',
       paddingLeft: ptd(30),
       paddingRight: ptd(30)
   },

   searchIcon: {
       width: ptd(40),
       height: ptd(10),
       resizeMode: 'stretch',
       marginRight: ptd(30)
   },

   searchBarInput: {
       width: ptd(350),
       height: ptd(60),
       fontSize: ptd(30),
       backgroundColor: 'transparent',
       alignItems: 'center',
       margin: 0,
       padding: 0
   },


   left: {
       width: ptd(180),
       height: ptd(60),
       flexDirection: 'row',
       justifyContent: 'flex-start',
       alignItems: 'center',
       paddingLeft: ptd(10), 
   },
   middle: {
       width: size.width - ptd(360),
       height: ptd(60),
       justifyContent: 'center',
       alignItems: 'center',
   },
   middleTitle: {
       fontSize: ptd(40),
       color: "white",
       alignItems: 'center',
       justifyContent: 'center'
   },

   right: {
       width: ptd(180),
       height: ptd(60),
       flexDirection: 'row',
       justifyContent: 'flex-end',
       alignItems: 'center',
       paddingRight: ptd(30), 
   },

   leftText: {
       fontSize: ptd(30),
       color: "white",
       alignItems: 'center',
       justifyContent: 'center'
   },

   rightText: {
       fontSize: ptd(30),
       color: "white",
       alignItems: 'center',
       justifyContent: 'center'
   },
   rightImage: {
       width:ptd(60),
       height: ptd(60),
       resizeMode: 'contain',
       marginLeft: ptd(5)
   },

   titleLeftImage: {
       width: ptd(50),
       height: ptd(35),
       marginRight: ptd(5),
       resizeMode: 'contain'
   },

   homeTitleIcon: {
       width: ptd(213),
       height: ptd(52),
       resizeMode: 'stretch'
   },
   titleRightImage: {
       width: ptd(65),
       height: ptd(65),
       resizeMode: 'contain'
   },
    statusBar:{
        width: size.width,
        height: ptd(60), 
        backgroundColor:'transparent'
    }
})