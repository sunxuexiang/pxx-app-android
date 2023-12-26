import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StoreProvider } from 'plume2';
import Header from 'wmkit/header';
import * as _ from 'wmkit/common/util';
import FormItem from 'wmkit/form/form-item';

import { priceColor, screenWidth } from 'wmkit/styles/index';
import AppStore from './store';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class ReturnRecord extends React.Component {
  store;

  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const { rid, returnFlowState } = (state && state.params) || {};

    this.store.init(rid, returnFlowState);
    this.store.basicRules();
  }

  render() {
    const refundRecord = this.store.state().get('refundRecord');
    //积分是否打开
    const pointsIsOpen = this.store.state().get('pointsIsOpen');
    //退款状态
    const returnFlowState = refundRecord.get('returnFlowState');
    //退款方式
    const payType = refundRecord.get('payType');
    //应退金额
    const returnPrice = refundRecord.get('returnPrice');
    //收款账户名称
    const returnAccountName = refundRecord.get('returnAccountName');
    //商家退款账户
    const customerAccountName = refundRecord.get('customerAccountName');
    //实退金额
    const actualReturnPrice = refundRecord.get('actualReturnPrice');
    //退款时间
    const refundBillTime = refundRecord.get('refundBillTime');
    //备注
    const comment = refundRecord.get('comment');
    //流水号
    const refundBillCode = refundRecord.get('refundBillCode');

    return (
      <View style={styles.container}>
        <Header title="退款记录" />
        <ScrollView alwaysBounceVertical={false}>
          <FormItem
            labelName="应退金额"
            placeholder={`¥ ${_.addZero(returnPrice)}`}
            textStyle={{ color: priceColor }}
          />
          <FormItem
            labelName="退款方式"
            placeholder={payType == 0 ? '在线支付' : '线下支付'}
          />
          <FormItem
            labelName="商家退款账户"
            placeholder={
              returnAccountName == null || returnAccountName == '' ? (
                '无'
              ) : (
                <View>
                  <Text allowFontScaling={false} style={styles.text}>
                    {returnAccountName.split(' ')[0]}
                  </Text>
                  <Text allowFontScaling={false} style={styles.text}>
                    {returnAccountName.split(' ')[1]}
                  </Text>
                </View>
              )
            }
          />
          <FormItem
            labelName="收款账户"
            placeholder={
              customerAccountName == null || customerAccountName == '' ? (
                '无'
              ) : (
                <View>
                  <Text allowFontScaling={false} style={styles.text}>
                    {customerAccountName.split(' ')[0]}
                  </Text>
                  <Text allowFontScaling={false} style={styles.text}>
                    {customerAccountName.split(' ')[1]}
                  </Text>
                </View>
              )
            }
          />
          <FormItem
            labelName="实退金额"
            placeholder={
              returnFlowState == 'COMPLETED'
                ? `¥ ${_.addZero(actualReturnPrice)}`
                : '无'
            }
          />
          <FormItem
            labelName="退款时间"
            placeholder={
              refundBillTime == null || refundBillTime == ''
                ? '无'
                : _.formatDate(refundBillTime)
            }
          />
          <FormItem
            labelName="备注"
            placeholder={comment == '' || comment == null ? '无' : comment}
          />
          <FormItem
            labelName="流水号"
            placeholder={returnFlowState == 'COMPLETED' ? refundBillCode : '无'}
          />

          {pointsIsOpen && (
            <FormItem
              labelName="应退积分"
              placeholder={refundRecord.get('applyPoints') + '' || '0'}
            />
          )}
          {pointsIsOpen && (
            <FormItem
              labelName="实退积分"
              placeholder={refundRecord.get('actualPoints') + '' || '0'}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  text: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'right',
    width: screenWidth > 320 ? screenWidth * 0.68 : screenWidth * 0.62,
    alignSelf: 'flex-end'
  }
});
