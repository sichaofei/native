import React, { Component } from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import Picker from 'react-native-picker';
import cities from '../config/Cities.json'
export default class Locate extends Component {
    state = {
        pos : ''
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
              const url = `http://api.map.baidu.com/geocoder/v2/?location=${position.coords.latitude},${position.coords.longitude}&output=json&pois=1&ak=rzOTENpIQgddGZQoUniouvswM1M25hGZ`;
              fetch(url)
                .then(response => response.json())
                .then(data => {
                        this.setState({pos: data.result.addressComponent.city});
                    });
            },
            (error) => {},
            {enableHighAccuracy: false, timeout: 20000}
        );
    }
    pickerShow() {
        Picker.init({
            pickerTitleText: '',
            pickerConfirmBtnText: '完成',
            pickerCancelBtnText: '取消',
            pickerData: cities,
            selectedValue: ['北京', '北京'],
            onPickerConfirm: data => {
                this.setState({
                    pos: data[1]
                })
                console.log(data);
            },
            onPickerCancel: data => {
                console.log(data);
            },
            onPickerSelect: data => {
                console.log(data);
            }
        });
        Picker.show();
    }
    render() {
        return (
            <Button
                title={this.state.pos}
                onPress={this.pickerShow.bind(this)}>
            </Button>
        )
    }
}