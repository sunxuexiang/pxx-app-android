import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Relax, msg } from 'plume2';
import { screenWidth, isAndroid } from 'wmkit/styles/index';
import { noop } from 'wmkit/noop';
import ValidConst from 'wmkit/validate';

import * as _ from '../../../wmkit/common/util'; // added by scx 

@Relax
export default class GroupBuyTip extends Component {
  timer;
  static relaxProps = {
    //保存上次的团号
    oldGroupNo: 'oldGroupNo',
    // 公告请求来的团信息
    grouponInst: 'grouponInst',
    getGrouponLatestInstanceByActivityId: noop
  };
  componentDidMount() {
    const { getGrouponLatestInstanceByActivityId } = this.props.relaxProps;
    this.timer = setInterval(() => {
      getGrouponLatestInstanceByActivityId();
    }, 3000);
    msg.on('spell-group-detail:clearNotice', this._clearNoticeTimer);
  }
  componentWillUnmount() {
    msg.emit('spell-group-detail:clearNotice');
  }
  render() {
    const { grouponInst } = this.props.relaxProps;
    const regex = ValidConst.phone;
    let showName;
    if (grouponInst.customerName != '') {
      let customerName = grouponInst.customerName;
      //如果是手机号形式，需要隐藏中间四位
      if (regex.test(grouponInst.customerName)) {
        showName =
          customerName.substr(0, 3) + '****' + customerName.substr(7, 4);
      } else {
        showName = customerName;
      }
    }
    return grouponInst.customerName != undefined ? (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.groupBuyTip}
        onPress={() => {
          if (this.timer) {
            clearInterval(this.timer);
          }
          msg.emit('router: goToNext', {
            routeName: 'GroupBuyDetail',
            grouponNo: grouponInst.grouponInstance.grouponNo
          });
        }}
      >
        <View style={styles.tipBtn}>
          <Image source={require('../img/laba.png')} style={styles.laba} />
          <Text style={styles.tipText}>
            {showName}
            邀请你来参团
          </Text>
        </View>
      </TouchableOpacity>
    ) : null;
  }
  _clearNoticeTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
  };
}
const styles = StyleSheet.create({
  groupBuyTip: {
    position: 'absolute',
    width: screenWidth,
    height: 57,
    justifyContent: 'center',
    paddingLeft: 12,
    backgroundColor: 'transparent',
    ..._.ifIphoneX(
      {
        top: 55
      },
      {
        top: isAndroid ? 20 : 45
      }
    ),
  },
  tipBtn: {
    width: 159,
    height: 23,
    borderWidth: 2,
    flexDirection: 'row',
    borderColor: '#FF1F4E',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12
  },
  laba: {
    width: 12,
    height: 10,
    tintColor: '#FF1F4E'
  },
  tipText: {
    fontSize: 10,
    fontWeight: '400',
    color: '#FF1F4E'
  }
});
