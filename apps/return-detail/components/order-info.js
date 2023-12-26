/**
 * Created by hht on 2017/8/30.
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  ImageBackground
} from 'react-native';
import { Relax } from 'plume2';

import { mainColor } from 'wmkit/styles/index';
import { Const } from 'wmkit/const';
import * as _ from 'wmkit/common/util';


@Relax
export default class OrderInfo extends Component {
  static relaxProps = {
    detail: 'detail',
    rejectReason: 'rejectReason'
  };

  render() {
    const { detail, rejectReason } = this.props.relaxProps;
    const returnFlowState = detail.get('returnFlowState');

    let rejectLabel = '';
    switch (returnFlowState) {
      case 'REJECT_RECEIVE':
        rejectLabel = '拒绝收货原因';
        break;
      case 'REJECT_REFUND':
        rejectLabel = '拒绝退款原因';
        break;
      case 'VOID':
        rejectLabel = '作废原因';
        break;
    }

    const labelStatus =
      detail.get('returnType') == 'RETURN'
        ? Const.returnGoodsState[returnFlowState]
        : Const.returnMoneyState[returnFlowState];

    return (
      <View style={styles.container}>
        <View style={styles.itemTitle}>
          <Text allowFontScaling={false}>退单状态</Text>
          <Text allowFontScaling={false} style={{ color: mainColor }}>
            {labelStatus}
          </Text>
        </View>
        {'REJECT_RECEIVE' == returnFlowState ||
        'REJECT_REFUND' == returnFlowState ||
        'VOID' == returnFlowState ? (
          <View style={styles.item}>
            <Text allowFontScaling={false} style={styles.text}>
              {rejectLabel}
            </Text>
            <Text allowFontScaling={false} style={styles.textGray}>
              {rejectReason}
            </Text>
          </View>
        ) : null}
        <View style={styles.item}>
          <Text allowFontScaling={false} style={styles.text}>
            订单号
          </Text>
          <Text allowFontScaling={false} style={styles.textGray}>
            {detail.get('tid')}
          </Text>
        </View>
        <View style={styles.item}>
          <Text allowFontScaling={false} style={styles.text}>
            退单号
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {detail.get('platform') != 'CUSTOMER' && (
              <ImageBackground
                style={styles.bg}
                source={require('../img/tag.png')}
              >
                <Text style={styles.white} allowFontScaling={false}>
                  代
                </Text>
              </ImageBackground>
            )}
            <Text
              allowFontScaling={false}
              style={{ textAlign: 'right', color: '#333' }}
            >
              {detail.get('id')}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text allowFontScaling={false} style={styles.text}>
            退单时间
          </Text>
          <Text allowFontScaling={false} style={styles.textGray}>
            {_.formatDate(detail.get('createTime'))}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#fff',
    marginTop: 12,
    borderRadius: 8
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb'
  },
  itemTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingTop: 15
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15
  },
  textGray: {
    color: '#333',
    flex: 1,
    textAlign: 'right',
    marginLeft: 20,
    fontSize: 12
  },
  text: {
    color: '#333',
    fontSize: 12
  },
  center: {
    justifyContent: 'center'
  },
  white: {
    color: '#fff',
    fontSize: 10,
    backgroundColor: 'transparent'
  },
  bg: {
    width: 19,
    height: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 3
  }
});
