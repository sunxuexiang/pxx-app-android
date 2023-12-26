import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import * as Button from 'wmkit/button';

import * as _ from '../../../wmkit/common/util';
import Price from '../../../wmkit/price';

const SubmitButton = Button.Submit;

@Relax
export default class ToolBar extends Component {
  static relaxProps = {
    buyerRemark: 'buyerRemark',
    sperator: 'sperator',
    invoice: 'invoice',
    defaultInvoiceAddr: 'defaultInvoiceAddr',
    totalPrice: 'totalPrice',

    submit: noop
  };

  render() {
    const { totalPrice } = this.props.relaxProps;
    return (
      <View style={styles.order_bottom}>
        <View style={styles.row}>
          <Text allowFontScaling={false} style={styles.bottom_text}>
            合计：
          </Text>
          <Price price={totalPrice} />
        </View>
        <SubmitButton
          disabled={this.props.btnDisabled}
          onClick={() => this._submit()}
          text="提交订单"
        />
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
    ..._.ifIphoneX(
      {
        height: 78
      },
      {
        height: 48
      }
    ),
    ..._.ifIphoneXR({ height: 78 }),
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12
  },
  row: {
    flexDirection: 'row'
  },
  bottom_text: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    padding: 0,
    margin: 0
  }
});
