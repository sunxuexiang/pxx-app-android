/**
 * Created by hht on 2017/8/30.
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  PixelRatio
} from 'react-native';
import { Relax, msg } from 'plume2';

import { mainColor } from 'wmkit/styles/index';
import { noop } from 'wmkit/noop';
import { Confirm } from 'wmkit/modal/confirm';

import * as _ from '../../../wmkit/common/util'; // added by scx
@Relax
export default class OrderBottom extends Component {
  static relaxProps = {
    detail: 'detail',
    cancel: noop
  };

  render() {
    const { detail, cancel } = this.props.relaxProps;

    const rid = detail.get('id');
    // 退单类型 RETURN 退货, REFUND 退款
    const returnType = detail.get('returnType') || 'RETURN';
    const returnFlowState = detail.get('returnFlowState');

    return (
      <View style={styles.container}>
        {returnFlowState === 'AUDIT' && returnType == 'RETURN' ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.btn, { borderColor: mainColor }]}
            onPress={() => {
              msg.emit('router: goToNext', {
                routeName: 'LogisticsInput',
                rid: rid,
                storeId: detail.get('company').get('storeId')
              });
            }}
          >
            <Text allowFontScaling={false} style={[styles.text, { color: mainColor }]}>
              填写物流
            </Text>
          </TouchableOpacity>
        ) : null}
        {returnFlowState === 'INIT' ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.btn, { borderColor: mainColor }]}
            onPress={() => {
              Confirm({
                title: '取消退货退款',
                text: '您确定要取消该退货退款？',
                okText: '确定',
                cancelText: '取消',
                okFn: function() {
                  cancel(rid);
                }
              });
            }}
          >
            <Text allowFontScaling={false} style={[styles.text, { color: mainColor }]}>
              取消退单
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopWidth: 1 / PixelRatio.get(),
    borderColor: '#dddddd',
    ..._.ifIphoneX({
      paddingBottom: 35
    })
  },
  btn: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    height: 30,
    justifyContent: 'center',
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 10,
    borderRadius: 15
  },
  text: {
    fontSize: 12
  }
});
