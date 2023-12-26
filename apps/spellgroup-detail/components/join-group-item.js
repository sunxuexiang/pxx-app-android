import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { msg } from 'plume2';
import moment from 'moment';
import CountDown from 'wmkit/count-down';
import * as WMkit from 'wmkit/kit';
import { mainColor } from 'wmkit/styles/index';

const defaultImg = require('../img/default-img.png');
export default class JoinGroupItem extends Component {
  render() {
    const { item, serverTime, countOver, key } = this.props;
    //拼团结束时间
    const endTime = moment(item.get('endTime'));
    return (
      <TouchableOpacity TouchableOpacity={0.8} key={key} style={styles.groupItem}
        onPress={() => {
          if (!WMkit.isLoginOrNotOpen()) {
            msg.emit('loginModal:toggleVisible', {
              callBack: () => {
                msg.emit('router: goToNext', { routeName: 'GroupBuyDetail', grouponNo: item.get('grouponNo') })
              }
            })
          } else {
            msg.emit('router: goToNext', { routeName: 'GroupBuyDetail', grouponNo: item.get('grouponNo') })
          }
        }
        }>
        <View style={styles.itemLeft}>
          <Image style={styles.itemImg} source={item.get('headimgurl') ? { uri: item.get('headimgurl') } : defaultImg} />
          <Text style={styles.itemAccount} allowFontScaling={false}>{item.get('customerName')}</Text>
        </View>
        <View style={styles.itemRight}>
          <View style={styles.rightInfo}>
            <Text style={styles.rightText} allowFontScaling={false}>还差<Text style={{ color: mainColor }}>{item.get('grouponNum') - item.get('joinNum')}人</Text>成团</Text>
            <CountDown
              showTimeDays={true}
              allowFontScaling={false}
              numberOfLines={1}
              //倒计时结束，刷新页面
              endHandle={() => {
                msg.emit('router: refreshRoute', {
                  routeName: 'SpellGroupDetail'
                });
              }}
              timeTextStyle={[styles.timeText, {color: mainColor}]}
              timeOffset={moment
                .duration(endTime.diff(serverTime && serverTime.context))
                .asSeconds()
                .toFixed(0)}
              timerName='SpellGroupDetail'
            />
          </View>
          <View style={[styles.joinBtn, {backgroundColor: mainColor}]}>
            <Text allowFontScaling={false} style={styles.nowJoin}>立即参团</Text>
          </View>
        </View>
      </TouchableOpacity>);
  }
}

const styles = StyleSheet.create({
  groupItem: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  itemImg: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
  },
  itemAccount: {
    fontSize: 14,
    color: '#333'
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightText: {
    textAlign: 'right',
    fontSize: 12,
    color: '#333',
    marginBottom: 5
  },
  rightInfo: {
    marginRight: 10
  },
  time: {
    fontSize: 10,
    color: '#999'
  },
  joinBtn: {
    width: 65,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  nowJoin: {
    fontSize: 10,
    color: '#fff'
  }
});
