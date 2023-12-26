import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Relax } from 'plume2';
import moment from 'moment';
import { _ } from 'wmkit';

import CountDown from './count-down';

@Relax
export default class Prebuy extends Component {
  constructor(props) {
    super(props);
  }

  static relaxProps = {
    serverTime: 'serverTime',
    appointmentSaleVO: 'appointmentSaleVO'
  };

  render() {
    let { serverTime, appointmentSaleVO } = this.props.relaxProps;
    appointmentSaleVO = appointmentSaleVO.toJS()
    return (
      <View style={styles.preBuys}>
        <View style={styles.preBuysTop}>
          <Text style={styles.left}>{this.isBuyStatus(appointmentSaleVO)}</Text>
          <View style={styles.right}>
            <Text style={styles.middle}>
              {this.isBuyStatus(appointmentSaleVO) == '预约中'
                ? '距预定结束'
                : this.isBuyStatus(appointmentSaleVO) == '抢购中'
                  ? '距抢购结束'
                  : ''}
            </Text>
            <CountDown
              allowFontScaling={false}
              numberOfLines={1}
              groupFlag={true}
              showTimeDays={true}
              timeOffset={moment
                .duration(
                  moment(
                    this.isBuyStatus(appointmentSaleVO) == '预约中'
                      ? appointmentSaleVO.appointmentEndTime
                      : this.isBuyStatus(appointmentSaleVO) == '抢购中'
                        ? appointmentSaleVO.snapUpEndTime
                        : appointmentSaleVO.snapUpStartTime
                  ).diff(serverTime)
                )
                .asSeconds()
                .toFixed(0)}
            />
            <Text style={[styles.middleEnd]}>
              {this.isBuyStatus(appointmentSaleVO) == '预约结束' &&
                '后开始抢购'}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  //判断当前的预约状态
  isBuyStatus = (status) => {
    let appointmentStartTime = status.appointmentStartTime;
    let appointmentEndTime = status.appointmentEndTime;
    let snapUpStartTime = status.snapUpStartTime;
    let snapUpEndTime = status.snapUpEndTime;

    let isAppointmentStart = moment(appointmentStartTime).isBefore(new Date());
    let isAppointmentEnd = moment(new Date()).isBefore(appointmentEndTime);

    let isSnapUpStartTime = moment(snapUpStartTime).isBefore(new Date());
    let isSnapUpEndTime = moment(new Date()).isBefore(snapUpEndTime);

    if (isAppointmentStart && isAppointmentEnd) return '预约中';
    if (!isAppointmentEnd && !isSnapUpStartTime) return '预约结束';
    if (isSnapUpStartTime && isSnapUpEndTime) return '抢购中';
    if (!isAppointmentEnd && !isSnapUpStartTime) return '预约结束';
  };
}

const styles = StyleSheet.create({
  preBuys: {
    width: '100%',
    backgroundColor: 'rgba(255, 132, 0, 1)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: 'center',
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
  }
});
