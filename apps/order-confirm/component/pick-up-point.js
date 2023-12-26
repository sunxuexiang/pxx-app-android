import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Blank from './blank';
import check from 'wmkit/theme/check.png';
import uncheck from '../img/uncheck.png';
import {Relax,msg} from "plume2";
import { noop } from 'wmkit';
const nullImage = require('../img/null.png'); //回看播放

@Relax
export default class PickUpPoint extends Component {
    static defaultProps = {};
    constructor(props) {
        super(props);
    }

    static relaxProps = {
        _selectPickUp: noop,
        pickUpMessage:'pickUpMessage',
        pickUpSelect: 'pickUpSelect',
    };

    render() {
        const {pickUpMessage,pickUpSelect,_selectPickUp} = this.props.relaxProps;
        const {storeId} = this.props;
        return (
            <View style={styles.container}>
                {pickUpMessage.size == 0 ? (
                    <Blank
                        content="暂无自提地址信息哦"
                        img={nullImage}
                        imgStyle={{width: '208rpx', height: '208rpx'}}
                    />
                ) : (
                     <View>
                        {pickUpMessage.size > 0 && pickUpMessage.map((item) => {
                            const checked = pickUpSelect[storeId] == item.get('pickUpList').get(0).get('wareId') && item.get('pickUpList').get(0).get('stockOutFlag') == 0;
                            console.log('aaaa12', item.toJS(), pickUpSelect)
                            return <TouchableOpacity
                                style={styles.panel}
                                onPress={() => {
                                    if(pickUpMessage.size === 1) {
                                        return;
                                    }
                                    if (item.get('pickUpList').get(0).get('stockOutFlag') == 0) {
                                        _selectPickUp(storeId, checked ? null : item);
                                    } else {
                                        msg.emit('app:tip','你所选择的自提点库存不足');
                                    }
                                }}
                            >
                                <View style={styles.item}>
                                    <Text allowFontScaling={false} numberOfLines={1} style={[styles.text, {marginBottom: 4}]}>{item.get('pickUpList').get(0).get('wareName')}</Text>
                                    <Text allowFontScaling={false} numberOfLines={1} style={styles.text}>{item.get('pickUpList').get(0).get('addressDetail')}</Text>
                                </View>
                                <Image
                                    style={styles.img}
                                    source={checked ? check : uncheck}
                                />
                            </TouchableOpacity>
                        })}
                    </View>
                )}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        marginBottom:10
    },
    panel: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 6,
        overflow: 'hidden'
    },
    item: {
        flex: 1
    },
    text: {
        fontSize: 14,
        lineHeight: 18,
        color: 'rgba(0,0,0,0.8)'
    },
    img: {
        width: 16,
        height: 16
    }
})
