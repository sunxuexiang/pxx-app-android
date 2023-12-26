import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Relax } from 'plume2';
import * as Button from 'wmkit/button';
import { noop } from 'wmkit/noop';
import * as _ from 'wmkit/common/util';
import Price from 'wmkit/price';
import { screenWidth, priceColor } from 'wmkit/styles/index';

const SubmitButton = Button.Submit;

/**
 * 退货退款底部
 */
@Relax
export default class ReturnRefundPrice extends React.Component {
  static relaxProps = {
    order: 'order',
    description: 'description',
    skus: 'skus',
    totalPrice: 'totalPrice',
    tradePoints: 'tradePoints',
    applyReturns: noop
  };

  render() {
    const { totalPrice, tradePoints } = this.props.relaxProps;
    return (
      <View style={styles.bottom}>
        <View style={styles.row}>
          <Text allowFontScaling={false} style={styles.text}>
            应退金额：
          </Text>
          <Price price={totalPrice} />
        </View>
        <View>
          <Text allowFontScaling={false} style={styles.text}>
            应退积分：
            <Text allowFontScaling={false} style={{ color: priceColor }}>
              {tradePoints}
            </Text>
          </Text>
        </View>
        <SubmitButton
          disabled={this.props.disabled}
          text="提交"
          onClick={() => this.props.relaxProps.applyReturns()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    ..._.ifIphoneX(
      {
        height: 78
      },
      {
        height: 48
      }
    ),
    ..._.ifIphoneXR({ height: 78 }),
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    // borderTopWidth: 1 / PixelRatio.get(),
    // borderTopColor: '#e1e1e1',
    width: screenWidth
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    color: '#333',
    fontSize: 12
  }
});
