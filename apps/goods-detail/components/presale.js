import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Relax } from 'plume2';
import moment from 'moment';
import { _ } from 'wmkit';

import CountDown from './count-down';

// 预售
@Relax
export default class Presale extends Component {
  constructor(props) {
    super(props);
  }

  static relaxProps = {
    bookingSaleVO: 'bookingSaleVO',
    serverTime: 'serverTime',
  };

  render() {
    let { bookingSaleVO, serverTime } = this.props.relaxProps;
    bookingSaleVO = bookingSaleVO.toJS();
    const { bookingType, bookingSaleGoods } = bookingSaleVO;

    let endTime;

    //全款预售
    if (bookingType == 0) {
      endTime = bookingSaleVO.bookingEndTime;
    }
    //定金预售取定金支付结束时间
    else if (bookingType == 1) {
      endTime = bookingSaleVO.handSelEndTime;
    }
    if (!this.isPresaleStatus(bookingSaleVO)) return <View />;

    return (
      <View style={styles.preBuys}>
        <View style={styles.preBuysTop}>
          <Text style={styles.left}>预定中</Text>
          <View style={styles.right}>
            <Text style={styles.middle}>距预定结束</Text>
            <CountDown
              allowFontScaling={false}
              numberOfLines={1}
              groupFlag={true}
              showTimeDays={true}
              timeOffset={moment
                .duration(moment(endTime).diff(serverTime))
                .asSeconds()
                .toFixed(0)}
            />
          </View>
        </View>
        {bookingSaleGoods.bookingCount && (
          <Text style={styles.presaleBottom}>{`限量发售${
            bookingSaleGoods.bookingCount
          }件 售完为止`}</Text>
        )}
      </View>
    );
  }
  //判断当前的预约状态
  isPresaleStatus = (item) => {
    const {
      bookingStartTime,
      bookingEndTime,
      bookingType,
      handSelStartTime,
      handSelEndTime
    } = item;
    let isBetween = false;

    //预售起止时间内 0:全款 1:定金
    if (bookingType == 0) {
      isBetween = moment(new Date()).isBetween(
        bookingStartTime,
        bookingEndTime
      );
    }

    //定金支付起止时间内
    if (bookingType == 1) {
      isBetween = moment(new Date()).isBetween(
        handSelStartTime,
        handSelEndTime
      );
    }

    return isBetween;
  };
}

const styles = StyleSheet.create({
  preBuys: {
    width: '100%',
    backgroundColor: 'rgba(255, 132, 0, 1)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 0,
    height: 44,
    justifyContent: 'center'
  },
  preBuysTop: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  left: {
    color: '#fff',
    fontSize: 14
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  middle: {
    fontSize: 12,
    color: '#fff',
    marginRight: 10
  },
  middleEnd: {
    fontSize: 12,
    color: '#fff'
  },
  presaleBottom: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'right',
    marginLeft: 10,
    opacity: 0.9,
    marginTop: -8
  }
});
