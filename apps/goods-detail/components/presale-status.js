import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Relax } from 'plume2';
import moment from 'moment';
import { noop } from 'wmkit/noop';
// 预售规则
@Relax
export default class Prebuy extends Component {
  constructor(props) {
    super(props);
  }

  static relaxProps = {
    // ruleContent: 'ruleContent',
    bookingSaleVO: 'bookingSaleVO',
    changePreSaleRuleVisible: noop
  };

  render() {
    let {
      bookingSaleVO
      // ruleContent
    } = this.props.relaxProps;
    bookingSaleVO = bookingSaleVO.toJS();
    // let ruleInfo = ruleContent[1] ? ruleContent[1].content : '';
    const { bookingType } = bookingSaleVO;
    return (
      <View>{bookingType == 0 ? this.renderRule() : this.renderPresale()}</View>
    );
  }

  //定金
  renderPresale() {
    let { bookingSaleVO, changePreSaleRuleVisible } = this.props.relaxProps;
    bookingSaleVO = bookingSaleVO.toJS();

    if (!this.isBuyStatus(bookingSaleVO, 3)) {
      return <View />;
    }

    return (
      <View style={styles.buyStatus}>
        <View style={styles.buyInfoRule}>
          <Text style={styles.buyInfoRuleText}>开售后凭资格预约购买</Text>
          <TouchableOpacity onPress={() => changePreSaleRuleVisible()}>
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
              this.isBuyStatus(bookingSaleVO, 1) ? styles.buySetpCheck : ''
            ]}
          >
            <Text
              style={[
                styles.buyStepTypeText,
                this.isBuyStatus(bookingSaleVO, 1) ? { color: '#fff' } : ''
              ]}
            >
              支付定金
            </Text>
          </View>
          <Text style={styles.buyStepDate}>
            {moment(bookingSaleVO.handSelStartTime).format('M月DD日 HH:mm')}~
            {moment(bookingSaleVO.handSelEndTime).format('M月DD日 HH:mm')}
          </Text>
        </View>
        <View style={styles.lineState}>
          <View style={styles.stepLine} />
        </View>
        <View style={styles.buySetp}>
          <View
            style={[
              styles.buyStepType,
              this.isBuyStatus(bookingSaleVO, 2) ? styles.buySetpCheck : ''
            ]}
          >
            <Text
              style={[
                styles.buyStepTypeText,
                this.isBuyStatus(bookingSaleVO, 2) ? { color: '#fff' } : ''
              ]}
            >
              支付尾款
            </Text>
          </View>
          <Text style={styles.buyStepDate}>
            {moment(bookingSaleVO.tailStartTime).format('M月DD日 HH:mm')}~
            {moment(bookingSaleVO.tailEndTime).format('M月DD日 HH:mm')}
          </Text>
        </View>

        <View style={styles.lineState}>
          <View style={styles.stepLine} />
        </View>
        <View style={styles.buySetp}>
          <View
            style={[
              styles.buyStepType,
              this.isDeliverStatus(bookingSaleVO) ? styles.buySetpCheck : ''
            ]}
          >
            <Text
              style={[
                styles.buyStepTypeText,
                this.isDeliverStatus(bookingSaleVO) ? { color: '#fff' } : ''
              ]}
            >
              开始发货
            </Text>
          </View>
          <Text style={styles.buyStepDate}>
            {moment(bookingSaleVO.deliverTime).format('M月DD日')}
          </Text>
        </View>
      </View>
    );
  }

  // 全款
  renderRule() {
    let { bookingSaleVO, changePreSaleRuleVisible } = this.props.relaxProps;
    bookingSaleVO = bookingSaleVO.toJS();

    if (!this.isBuyStatus(bookingSaleVO, 1)) {
      return <View />;
    }

    return (
      <View style={styles.buyStatus}>
        <View style={styles.buyInfoRule}>
          <Text style={styles.buyInfoRuleText}>预售规则</Text>
          <TouchableOpacity onPress={() => changePreSaleRuleVisible()}>
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
              this.isBuyStatus(bookingSaleVO, 1) ? styles.buySetpCheck : ''
            ]}
          >
            <Text
              style={[
                styles.buyStepTypeText,
                this.isBuyStatus(bookingSaleVO, 1) ? { color: '#fff' } : ''
              ]}
            >
              支付全款
            </Text>
          </View>
          <Text style={styles.buyStepDate}>
            {moment(bookingSaleVO.bookingStartTime).format('M月DD日 HH:mm')}~
            {moment(bookingSaleVO.bookingEndTime).format('M月DD日 HH:mm')}
          </Text>
        </View>

        <View style={styles.lineState}>
          <View style={styles.stepLine} />
        </View>
        <View style={styles.buySetp}>
          <View
            style={[
              styles.buyStepType,
              this.isDeliverStatus(bookingSaleVO) ? styles.buySetpCheck : ''
            ]}
          >
            <Text
              style={[
                styles.buyStepTypeText,
                this.isDeliverStatus(bookingSaleVO) ? { color: '#fff' } : ''
              ]}
            >
              开始发货
            </Text>
          </View>
          <Text style={styles.buyStepDate}>
            {moment(bookingSaleVO.deliverTime).format('M月DD日')}
          </Text>
        </View>
      </View>
    );
  }

  //判断当前的预售状态
  isBuyStatus = (item, type) => {
    const {
      bookingStartTime,
      bookingEndTime,
      bookingType,
      handSelStartTime,
      handSelEndTime,
      tailStartTime,
      tailEndTime
    } = item;

    //预售起止时间内 0:全款 1:定金
    if (bookingType == 0) {
      return moment(new Date()).isBetween(bookingStartTime, bookingEndTime);
    }

    //定金
    if (bookingType == 1) {
      //定金支付起止时间内
      if (type == 1) {
        return (
          moment(new Date()).isBetween(handSelStartTime, handSelEndTime) ||
          moment(new Date()).isBetween(tailStartTime, tailEndTime)
        );
      } else if (type == 2) {
        //尾款支付起止时间内
        return moment(new Date()).isBetween(tailStartTime, tailEndTime);
      } else if (type == 3) {
        //判断是否正在进行中
        return moment(new Date()).isBetween(handSelStartTime, handSelEndTime);
      }
    }
  };

  /**
   * 判断预售是否发货状态
   */
  isDeliverStatus = (item) => {
    const { deliverTime } = item;
    return moment(new Date()).isSameOrAfter(deliverTime);
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
