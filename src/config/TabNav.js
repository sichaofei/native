import React from 'react';
import {Image} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/Home';
import ProfilScreen from '../screens/Profile';
import TopLineScreen from '../screens/NewTopLine';
import ProductScreen from '../screens/ProductList';
const TabNavigator = createBottomTabNavigator(
    {
        Home: HomeScreen,
        TopLine: TopLineScreen,
        Product: ProductScreen,
        Profile: ProfilScreen,
    },
    {
        tabBarOptions: {
          activeTintColor: '#1BC787',
          inactiveTintColor: '#B5B5B5',
        }
    }
  );
export default createAppContainer(TabNavigator);