import React, { Component } from 'react';

// const url = 'https://testservice.chetuobang.com';
const url = 'https://service.chetuobang.com';
export default class NetUtil {
    static get(uri) {
        return new Promise(function (resolve, reject) {
            fetch(url+uri)
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                    // if (data.code === '0') {
                    //     resolve(data);
                    // } else {
                    //     // processError(data);
                    // }
                }).catch(function (ex) {
                    reject(ex);
                });
        });
    }
    static post(uri, params) {
        uri = url + uri;
        let init = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        };
        return new Promise(function (resolve, reject) {
            fetch(uri, init)
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                }).catch(function (ex) {
                    reject(ex);
                    // Alert.alert('错误提示', '网络链接出错');
                });
        });
    }
    
}