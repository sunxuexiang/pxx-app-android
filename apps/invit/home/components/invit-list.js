import React from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import * as _ from 'wmkit/common/util';
import { mainColor } from 'wmkit/styles/index';

// 默认头像
const defaultImg = require('../img/default-img.png');
export default class MySales extends React.Component {
  props: {
    friend: any
  };
  render() {
    let { friend } = this.props;
    let customerName = friend.invitedNewCustomerName
      ? friend.invitedNewCustomerName
      : friend.invitedNewCustomerAccount;
    let orderNum = friend.orderNum ? friend.orderNum : 0;
    let amount = friend.amount ? friend.amount : '0';
    return (
      <View style={styles.container}>
        <View style={styles.viewBox}>
          <Image
            style={styles.pointer}
            source={
              friend.invitedNewCustomerHeadImg
                ? { uri: friend.invitedNewCustomerHeadImg }
                : defaultImg
            }
          />
          <View style={styles.rightBox}>
            <View style={styles.upBox}>
              <Text style={styles.userName} allowFontScaling={false}>
                {customerName}
              </Text>
              <Text style={styles.commonFont} allowFontScaling={false}>
                已购买
                <Text style={{ color: mainColor }} allowFontScaling={false}>
                  {orderNum}
                </Text>
                单
              </Text>
            </View>
            <View style={styles.downBox}>
              <Text style={styles.commonFont} allowFontScaling={false}>
                累计消费金额：
                <Text style={{ color: mainColor }} allowFontScaling={false}>
                  {amount}
                </Text>
              </Text>
              <Text style={styles.date} allowFontScaling={false}>
                注册时间：
                {_.formatDay(friend.registerTime)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  viewBox: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  pointer: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  rightBox: {
    marginLeft: 12,
    flexDirection: 'column',
    flex: 1
  },
  upBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  userName: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.8)'
  },
  commonFont: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.4)'
  },
  downBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  date: {
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.4)'
  }
});
