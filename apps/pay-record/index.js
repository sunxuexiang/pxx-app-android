import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  PixelRatio,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { StoreProvider, msg } from 'plume2';
import { fromJS, Map } from 'immutable';

import FormItem from 'wmkit/form/form-item';
import * as _ from 'wmkit/common/util';
import WMImage from 'wmkit/image/index';
import Header from 'wmkit/header';

import { priceColor, mainColor } from 'wmkit/styles/index';

import AppStore from './store';

const PAY_TYPE = {
  0: '线上支付',
  1: '线下支付'
};

const PAY_STATUS = {
  0: '已付款',
  1: '未付款',
  2: '待确认'
};

@StoreProvider(AppStore, { debug: __DEV__ })
export default class PayRecord extends React.Component {
  componentDidMount() {
    const state = this.props.route;
    const { tId } = (state && state.params) || {};
    this.store.init(tId);
  }

  render() {
    const state = this.props.route;
    const { tId } = (state && state.params) || {};

    let payDetail = this.store.state().get('payDetail');

    let encloses =
      payDetail.get('encloses') && payDetail.get('encloses').split(',');
    let enclo = fromJS(encloses || []);
    let imageList =
      enclo.size > 0
        ? enclo.map((value) => Map().set('image', value)).toJS()
        : Array();

    let  payOrderPoints = payDetail.get('payOrderPoints') ? payDetail.get('payOrderPoints') : 0;

    return (
      <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
        <Header title="付款记录" />
        <ScrollView
          contentContainerStyle={styles.container}
          alwaysBounceVertical={false}
        >
          <FormItem
            labelName="应付积分"
            placeholder={_.parseNumber((payOrderPoints))}
            textStyle={{ color: priceColor }}
          />
          <FormItem
            labelName="应付金额"
            placeholder={'¥ ' + _.addZero(payDetail.get('totalPrice'))}
            textStyle={{ color: priceColor }}
          />
          <FormItem
            labelName="付款记录"
            placeholder={PAY_STATUS[payDetail.get('payOrderStatus')] || '无'}
            textStyle={{ color: '#333' }}
          />
          <FormItem
            labelName="付款方式"
            placeholder={PAY_TYPE[payDetail.get('payType')]}
            textStyle={{ color: '#333' }}
          />
          <FormItem
            labelName="商家收款账户"
            placeholder={payDetail.get('receivableAccount')?payDetail.get('receivableAccount'):'无'}
            textStyle={{ color: '#333' }}
          />
          <FormItem
            labelName="付款金额"
            placeholder={
              payDetail.get('receiveTime')
                ? '¥ ' + _.addZero(payDetail.get('payOrderPrice'))
                : '无'
            }
            textStyle={{ color: '#333' }}
          />
          {PAY_STATUS[payDetail.get('payOrderStatus')] != '未付款' &&           
          <FormItem
            labelName="付款时间"
            placeholder={
              payDetail.get('createTime')
                ? _.formatDate(payDetail.get('createTime'))
                : '无'
            }
            textStyle={{ color: '#333' }}
          />}
          <View style={styles.backItem}>
          <Text allowFontScaling={false} style={styles.backTitle}>
          附件
          </Text>
          <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
          {imageList.length > 0 ? (
          imageList.map((img) => (
          <WMImage
          key={Math.random()}
          resizeMode="contain"
          style={styles.image}
          zoom
          src={img.image}
          />
          ))
          ) : (
          <Text allowFontScaling={false} style={{ color: '#8b8b8b' }}>
          无
          </Text>
          )}
          </ScrollView>
          </View>
          <FormItem
            labelName="备注"
            placeholder={payDetail.get('comment') || '无'}
            textStyle={{ color: '#333' }}
          />
          <FormItem
            labelName="流水号"
            placeholder={payDetail.get('receivableNo') || '无'}
            textStyle={{ color: '#333' }}
          />

        </ScrollView>
        {payDetail.get('payOrderStatus') &&
        payDetail.get('payOrderStatus') == '1' ? (
          <View style={styles.box}>
            <TouchableOpacity
              key={Math.random()}
              onPress={() => {
                this._toPay(tId, payDetail.get('payType'));
              }}
              style={[styles.redBtn, { borderColor: mainColor }]}
            >
              <Text allowFontScaling={false} style={[styles.redText, { color: priceColor }]}>
                去付款
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }

  /**
   * 去支付
   */
  _toPay = (tId, payType) => {
    let payDetail = this.store.state().get('payDetail');
    if (payDetail && payDetail.get('totalPrice') == '0.00') {
      //0元订单直接调默认支付接口
      this.store.defaultPay(tId);
    }

    if (payType == '1') {
      msg.emit('router: goToNext', {
        routeName: 'FillPayment',
        tid: tId,
        search: 'from=order-detail'
      });
    } else if (payType == '0') {
      msg.emit('router: goToNext', {
        routeName: 'PayOrder',
        tid: tId
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa'
  },
  text: {
    textAlign: 'right',
    color: '#333'
  },
  box: {
    marginTop: 10,
    padding: 8,
    ..._.ifIphoneX(
      {
        paddingBottom: 34
      },
      {
        paddingBottom:8
      }
    ),
    ..._.ifIphoneXR(
      {
        paddingBottom: 34
      }
    ),
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  redBtn: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    height: 30,
    justifyContent: 'center',
    borderWidth: 1,
    width: 64,
    alignItems: 'center',
    marginLeft: 10,
    borderRadius: 15
  },
  redText: {
    fontSize: 12
  },
  backItem: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb'
  },
  backTitle: {
    color: '#333333',
    fontSize: 14,
    height: 30
  },
  image: {
    height: 55,
    width: 55,
    marginRight: 10,
    borderColor: '#ebebeb',
    borderWidth: 1 / PixelRatio.get()
  }
});
