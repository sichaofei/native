import React from 'react';
import {ScrollView, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image} from 'react-native';

import BaseComponent from '../components/BaseComponent';
import {ptd, height} from '../styles/SizeHelper.js';

export default class Logon extends BaseComponent {
    static navigationOptions = {
        headerTitle: '兑换协议'
    };
    componentDidMount() {
        
    }
    render() {
        return (
            <SafeAreaView  style={{flex: 1}}>
            <ScrollView style={[styles.container]}>
                <Text style={styles.title}>开车币用商城兑换协议</Text>
                <Text style={styles.txt}>
                用户在使用【开车币用】平台（文章开车币用平台简称平台）发生的一切行为（包括浏览、car币获取及兑换等），均须在已浏览并同意《开车币用兑换协议》公示的各项规则后进行，规则相关名词可互相引用参照，如有不同理解，平台保留解释权。特别提示：
                </Text>
                <Text style={styles.txt}>
                1、所有参与本活动兑换的商品一经受理，均不可撤销。免费兑换的实物商品在运送途中发生损坏恕不接受更换。实物商品退换货邮费由用户承担。
                </Text>
                <Text style={styles.txt}>
                2、car币商城所展示商品图片仅供参考，其颜色、外观及款式均以实物为准。
                </Text>
                <Text style={styles.txt}>
                3、根据市场变化，平台保留调整car币商城商品清单和相应car币币值的权利。可供兑换、抽奖的商品种类以用户当日car币商城公布内容为准。
                </Text>
                <Text style={styles.txt}>
                4、car币仅适用于平台所涉活动范围，在兑换为商品前并不作为用户资产，不附加任何增值项或利息，人民币暂不予兑换。car币不可转让、转赠给任何第三方，亦不能折算现金或给予其他非本活动商品的给付。
                </Text>
                <Text style={styles.txt}>
                5、以car币换领的各类兑换券、抵用券或其他凭证皆有使用期限，用户须在有效期限内使用，否则失效过期。平台予以补发、更换、延长期限或折换现金。
                </Text>
                <Text style={styles.txt}>
                6、由于平台处理car币兑换信息需要通过一定的流程，为保证您可以顺利兑换商品，请及时补全信息，如果因为信息不全等原因，导致car币无法使用、无法正常收到快递等问题，平台不予以进行补发、延期等处理。
                </Text>
                <Text style={styles.txt}>
                7、平台有权根据活动需要取消本计划或增删、修订本规定。所有活动规定以平台公布内容为准。
                </Text>
                <Text style={styles.txt}>
                8、关于car币累计的方式及方法或有关活动其他一切问题，平台保留解释权和最终决定权。
                </Text>
                <Text style={styles.txt}>
                9、物品快递后，如发生不可抗力因素，如地震、大风、山崩等导致物品丢失或损坏，平台不给予补发。
                </Text>
                <Text style={styles.txt}>
                10、新疆、内蒙古、西藏等地区，因快递原因暂不支持实物发货，请谨慎兑换，兑换的商品将不给予car币补偿
                </Text>
                <Text style={styles.txt}>
                11、封号行为处理情况：
                </Text>
                <Text style={styles.txt}>
                （1）通过人工操作或及其程序批量注册垃圾账号
                </Text>
                <Text style={styles.txt}>
                （2）通过人工操作或机器程序等非正常途径获得car币
                </Text>
                <Text style={styles.txt}>
                （3）通过人工操作或机器程序恶意关闭交易的扰乱秩序行为
                </Text>
                <Text style={styles.txt}>
                （4）通过系统漏斗获得car币行为
                </Text>
                <Text style={styles.txt}>
                满足以上四种情况的任意一种用户，通过抽奖、兑换等方式获得的商品，平台都有权利将用户进行封号处理，并扣除所得car币。
                </Text>
            </ScrollView>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: ptd(750),
        height: height,
        paddingHorizontal: ptd(80),
        paddingTop: ptd(80),
    },
    title: {
        fontSize: ptd(50),
        textAlign: 'center',
        color: '#333333',
        marginBottom: ptd(40),
    },
    txt: {
        color: '#333333',
        fontSize: ptd(32),
        marginBottom: ptd(40),
    }
});