import React from 'react';
import { StyleSheet, View, Text, Image, PixelRatio } from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import * as _ from 'wmkit/common/util';
// 默认头像
const defaultImg = require('../img/default-img.png');
type IFriendProps = T.IProps & T.IFriendProps;

@connect<Partial<IFriendProps>, T.IFriendState>(
  store2Props,
  actions
)
export default class Friend extends React.Component<
  Partial<IFriendProps>,
  T.IFriendState
> {
  constructor(props: IFriendProps) {
    super(props);
  }

  render() {
    let {
      actions: { action },
      main: { tab }
    } = this.props;
    let { friend } = this.props;

    let customerName;
    let headImg;
    if ('3' == tab) {
      customerName = friend.customerName ? friend.customerName : '';
      headImg = friend.headImg ? { uri: friend.headImg } : defaultImg;
    } else {
      customerName = friend.invitedNewCustomerName
        ? friend.invitedNewCustomerName
        : friend.invitedNewCustomerAccount;
      headImg = friend.invitedNewCustomerHeadImg
        ? { uri: friend.invitedNewCustomerHeadImg }
        : defaultImg;
    }

    let orderNum = friend.orderNum ? friend.orderNum : 0;
    let amount = friend.amount ? friend.amount : '0';
    return (
      <View style={styles.container}>
        <View style={styles.viewBox}>
          <Image style={styles.pointer} source={headImg} />
          <View style={styles.rightBox}>
            <View style={styles.upBox}>
              <Text style={styles.userName} allowFontScaling={false}>
                {customerName}
              </Text>
              <Text style={styles.date} allowFontScaling={false}>
                {tab == '3' ? '首单时间：' : '注册时间：'}
                {tab == '3'
                  ? _.formatDay(friend.firstOrderTime)
                  : _.formatDay(friend.registerTime)}
              </Text>
            </View>
            <View style={styles.downBox}>
              <View style={styles.twoText}>
                <Text style={styles.money} allowFontScaling={false}>
                  累计消费金额:
                </Text>
                <Text style={styles.number} allowFontScaling={false}>
                  {amount}
                </Text>
              </View>
              <Text style={styles.order} allowFontScaling={false}>
                已购买{orderNum}单
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
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  viewBox: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    flexDirection: 'row',
    alignItems: 'center'
  },
  pointer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  },
  rightBox: {
    flexDirection: 'column',
    flex: 1
  },
  upBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3
  },
  userName: {
    fontSize: 14,
    color: '#000'
  },
  date: {
    fontSize: 12,
    color: '#666'
  },
  downBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  twoText: {
    flexDirection: 'row'
  },
  money: {
    fontSize: 12,
    color: '#000'
  },
  number: {
    fontSize: 12,
    color: '#FF1F4E'
  },
  order: {
    fontSize: 12,
    color: '#333'
  }
});
