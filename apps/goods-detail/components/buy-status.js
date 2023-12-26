import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Relax } from 'plume2';
import moment from 'moment';
import { noop } from 'wmkit/noop';

@Relax
export default class Prebuy extends Component {
  constructor(props) {
    super(props);
  }

  static relaxProps = {
    // ruleContent: 'ruleContent',
    appointmentSaleVO: 'appointmentSaleVO',
    changeAppointmentRuleVisible: noop
  };

  render() {
    let {
      appointmentSaleVO,
      // ruleContent,
      changeAppointmentRuleVisible
    } = this.props.relaxProps;
    appointmentSaleVO = appointmentSaleVO.toJS();
    // let ruleInfo = ruleContent[0] ? ruleContent[0].content : '';

    return (
      <View style={styles.buyStatus}>
        <View style={styles.buyInfoRule}>
          <Text style={styles.buyInfoRuleText}>
            {appointmentSaleVO.appointmentType == 1
              ? '开售后即可购买'
              : '开售后凭预约资格购买'}
          </Text>
          <TouchableOpacity onPress={() => changeAppointmentRuleVisible()}>
            <Image
              source={require('../img/tag.png')}
              style={{ width: 16, height: 16 }}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.buySetp]}>
          <View
            style={[
              styles.buyStepType,
              this.isBuyStatus(appointmentSaleVO, 1) ? styles.buySetpCheck : ''
            ]}
          >
            <Text
              style={[
                styles.buyStepTypeText,
                this.isBuyStatus(appointmentSaleVO, 1) ? { color: '#fff' } : ''
              ]}
            >
              预约
            </Text>
          </View>
          <Text style={styles.buyStepDate}>
            {moment(appointmentSaleVO.appointmentStartTime).format(
              'M月DD日 HH:mm'
            )}
            ~
            {moment(appointmentSaleVO.appointmentEndTime).format(
              'M月DD日 HH:mm'
            )}
          </Text>
        </View>
        <View style={styles.lineState}>
          <View style={styles.stepLine} />
        </View>
        <View style={[styles.buySetp]}>
          <View
            style={[
              styles.buyStepType,
              this.isBuyStatus(appointmentSaleVO, 2) ? styles.buySetpCheck : ''
            ]}
          >
            <Text
              style={[
                styles.buyStepTypeText,
                this.isBuyStatus(appointmentSaleVO, 2) ? { color: '#fff' } : ''
              ]}
            >
              抢购
            </Text>
          </View>
          <Text style={styles.buyStepDate}>
            {moment(appointmentSaleVO.snapUpStartTime).format('M月DD日 HH:mm')}~
            {moment(appointmentSaleVO.snapUpEndTime).format('M月DD日 HH:mm')}
          </Text>
        </View>
        <View style={styles.lineState}>
          <View style={styles.stepLine} />
        </View>
        <View style={styles.buySetp}>
          <View style={styles.buyStepType}>
            <Text style={styles.buyStepTypeText}>开始发货</Text>
          </View>
          <Text style={styles.buyStepDate}>
            {moment(appointmentSaleVO.deliverTime).format('M月DD日')}
          </Text>
        </View>
      </View>
    );
  }

  //判断当前的预约状态
  isBuyStatus = (status, index) => {
    let appointmentStartTime = status.appointmentStartTime;
    let appointmentEndTime = status.appointmentEndTime;
    let snapUpStartTime = status.snapUpStartTime;
    let snapUpEndTime = status.snapUpEndTime;
    //如果预约开始时间在当前时间之前则代表预约中
    let isAppointmentStart = moment(appointmentStartTime).isBefore(new Date());
    let isAppointmentEnd = moment(new Date()).isBefore(appointmentEndTime);

    let isSnapUpStartTime = moment(snapUpStartTime).isBefore(new Date());
    let isSnapUpEndTime = moment(new Date()).isBefore(snapUpEndTime);
    if (index == 1) {
      if (
        (isAppointmentStart && isAppointmentEnd) ||
        (isSnapUpStartTime && isSnapUpEndTime) ||
        (!isAppointmentEnd && !isSnapUpStartTime)
      )
        return true;
    } else if (index == 2) {
      if (isSnapUpStartTime && isSnapUpEndTime) return true;
    }
  };
}

const styles = StyleSheet.create({
  buyStatus: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    marginBottom: 12
  },
  buyInfoRule: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 16
  },
  buyInfoRuleText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginRight: 15
  },
  buySetp: {
    flexDirection: 'row',
    paddingHorizontal: 12
  },
  buySetpCheck: {
    backgroundColor: 'rgba(255, 136, 0, 1)'
  },
  buyStepType: {
    width: 64,
    height: 18,
    backgroundColor: 'rgb(245, 245, 245)',
    borderRadius: 12,
    justifyContent: 'center'
  },
  buyStepTypeText: {
    fontSize: 10,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.4)'
  },
  buyStepDate: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.8)',
    marginLeft: 8
  },
  lineState: {
    width: 89,
    height: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 1,
    marginBottom: 1
  },
  stepLine: {
    width: 1,
    height: 8,
    backgroundColor: 'rgba(230, 230, 230, 1)'
  }
});
