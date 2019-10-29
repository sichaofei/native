/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './src/config/AppNavigator';
import {Provider} from 'react-redux';
import store from './src/redux/store.js';
import login from './src/redux/loginAction.js';
import NetUtil from './src/utils/NetUtil';


export default class App extends Component {
  async componentDidMount() {
    const mobile = await AsyncStorage.getItem('phone');
    if(!mobile) return;
    
    await NetUtil.post('/api/opencar/user/login', {
        mobile: mobile,
        from: 'IOS'
    }).then(json => {
        const data = json.data;
        store.dispatch(login({data}))
        AsyncStorage.setItem('userId', data.userId);
    })
  }
  render() {
    return (
      <Provider store = {store}>
        <AppNavigator/>
      </Provider>
    );
  }
}

