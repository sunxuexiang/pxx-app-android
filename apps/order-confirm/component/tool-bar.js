import React, { Component } from 'react';
import { Text, StyleSheet, PixelRatio, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Relax } from 'plume2';

import { noop } from 'wmkit/noop';
import * as Button from 'wmkit/button';
import Price from 'wmkit/price';
import * as _ from '../../../wmkit/common/util';
import { screenWidth } from 'wmkit/styles/index';
import {debounce} from 'lodash';

const SubmitButton = Button.Submit;

@Relax
export default class ToolBar extends Component {
  static relaxProps = {
    buyerRemark: 'buyerRemark',
    sperator: 'sperator',
    invoice: 'invoice',
    defaultInvoiceAddr: 'defaultInvoiceAddr',
    totalPrice: 'totalPrice',

    submit: noop,
    isBookingSaleGoods: 'isBookingSaleGoods',
    isCommit: 'isCommit'
  };

  render() {
    const { totalPrice, isBookingSaleGoods, isCommit } = this.props.relaxProps;

    return (
      <View>
        {isBookingSaleGoods ? (
          <View style={styles.order_bottom}>
            <Text allowFontScaling={false} style={styles.bottom_text} />
            <SubmitButton
              disabled={!isCommit}
              onClick={debounce(() => {
                if (isCommit) this._submit();
              }, 500)}
              text="支付定金"
            />
          </View>
        ) : (
          <View style={styles.order_bottom}>
            <View style={styles.row}>
              <Text allowFontScaling={false} style={styles.bottom_text}>
                合计:
              </Text>
              <Price price={totalPrice} priceStyle={{ fontSize: 14 }} bigPriceStyle={{ fontSize: 20 }} />
            </View>
            <SubmitButton
              disabled={this.props.btnDisabled}
              onClick={debounce(() => this._submit(), 500)}
              text="提交订单"
            />
          </View>
        )}
      </View>
    );
  }

  /**
   * 提交订单
   * @private
   */
  _submit = () => {
    const { submit } = this.props.relaxProps;
    submit(false);
  };
}

const styles = StyleSheet.create({
  order_bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    bottom: 0,
    ..._.ifIphoneX(
      {
        height: 90,
        paddingBottom: 34
      },
      {
        height: 56,
        paddingBottom: 0
      }
    ),
    width: screenWidth,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottom_text: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)',
    marginRight: 4
  }
});
