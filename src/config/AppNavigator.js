import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Image} from 'react-native';
import TabNav from './TabNav';
import WebScreen from '../screens/Web';
import LogonScreen from '../screens/Logon';
import GlobalState from './GlobalState';
import ToplineDetailScreen from '../screens/TopLineDetail'
import Carbihistory from "../screens/Carbihistory"
import Shophistory from "../screens/Shophistory"
import EvaAreaScreen from "../screens/EvaArea"
import ArticleReadScreen from '../screens/ArticleRead'
import MyCars from "../screens/myCars"
import CitationFind from "../screens/CitationFind"
import CitationFindDetail from "../screens/CitationFindDetail"
import Addcar from "../screens/Addcar";
import Setting from "../screens/setting"
import DiscussList from "../screens/DiscussList"
import AddressList from "../screens/AddressList"
import Aboutus from "../screens/Aboutus"
import NewAddress from "../screens/NewAddress"
import LoginNum from "../screens/LoginNum"
import ProductDetail from "../screens/ProductDetail"
import Agreement from "../screens/Agreement"
import InviteFriend from "../screens/InviteFriend"
import Bind from "../screens/Bind"
import ProductOrder from "../screens/ProductOrder"
import OrderSuccess from "../screens/OrderSuccess"
import NearbyRoad from "../screens/NearbyRoad"
import ServiceList from "../screens/ServiceList"
import CompanyWith from "../screens/CompanyWith"
import CompanySuccess from "../screens/CompanySuccess"
import CarCoinIntro from "../screens/CarCoinIntro"
class LogoTitle extends React.Component {
    render() {
      return (
        <Image
          source={require('../imgs/back.png')}
          style={{ width: 15, height: 15, marginLeft: 10 }}
        />
      );
    }
  }

const AppNavigator = createStackNavigator(
    {
        Main: {
            screen: TabNav,
            navigationOptions: ({navigation}) => ({
                header: null
            })
        },
        Web: WebScreen,
        Logon: LogonScreen,
        Carbihistory,
        Shophistory,
        MyCars,
        Addcar,
        Setting,
        Aboutus,
        LoginNum,
        OrderSuccess,
        DiscussList,
        AddressList,
        ProductOrder,
        NewAddress,
        Agreement,
        InviteFriend,
        Bind,
        TopLineDetail:ToplineDetailScreen,
        EvaArea:EvaAreaScreen,
        ProductDetail: ProductDetail,
        ArticleRead:ArticleReadScreen,
        citationFind:CitationFind,
        citationFindDetail:CitationFindDetail,
        nearbyRoad:NearbyRoad,
        serviceList:ServiceList,
        companyWith:CompanyWith,
        companySuccess:CompanySuccess,
        carCoinIntro:CarCoinIntro
    },
    {
        initialRouteName: "Main",
        defaultNavigationOptions: {
            headerTintColor: '#333',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1,
                elevation: 0,
                shadowOpacity: 0,
                marginLeft:-25
            },
            headerBackTitle: null,
            headerBackImage: <LogoTitle />
        },
    }
);
const defaultGetStateForAction = AppNavigator.router.getStateForAction;

// AppNavigator.router.getStateForAction =(action, state) => {
//     let userId=""
//  AsyncStorage.getItem('userId',(error,result)=>{
//          if (!error) {
//              userId=JSON.parse(result)
//          }
//      })
 
//     if (action.routeName === 'Profile' && !userId) {
//         const routes = [
//             ...state.routes,
//             {key: 'A', routeName: 'Bind', params: { name: action.name1}},
//         ];
//         return {
//         ...state,
//         routes,
//         index: routes.length - 1,
//         };
//     }

    
//     return defaultGetStateForAction(action, state);
// };
  
export default createAppContainer(AppNavigator);