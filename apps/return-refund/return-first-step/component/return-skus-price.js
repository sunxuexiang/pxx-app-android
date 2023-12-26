import React from 'react';
import { View, Text, StyleSheet, PixelRatio } from 'react-native';
import { Relax, msg } from 'plume2';
import * as Button from 'wmkit/button';
import { noop } from 'wmkit/noop';
import * as _ from 'wmkit/common/util';

import { checkedAllPriceQL, checkedAnyQL } from '../../ql';

import { screenWidth, priceColor } from 'wmkit/styles/index';

const SubmitButton = Button.Submit;

/**
 * 退货商品价格
 */
@Relax
export default class RetuenSkusPrice extends React.Component {
  static relaxProps = {
    skus: 'skus',
    //获取选中退货商品价格
    checkedAllPrice: checkedAllPriceQL,
    //获取按钮是否禁用
    checkedAny: checkedAnyQL,
    returnSkuSecond: noop
  };

  render() {
    const { price, points } = this.props.relaxProps.checkedAllPrice;
    return (
      <View style={styles.bottom}>
        <Text allowFontSacling={false} style={styles.text}>
          应退金额：
        </Text>
        <Text allowFontSacling={false} style={[styles.price, { color: priceColor }]}>
          ¥{_.addZero(price)}
        </Text>
        <Text allowFontSacling={false} style={styles.text}>
          应退积分：
        </Text>
        <Text allowFontSacling={false} style={[styles.price, { color: priceColor }]}>
          {Math.floor(points)}
        </Text>
        <SubmitButton
          text="下一步"
          disabled={this.props.relaxProps.checkedAny}
          onClick={() => this.props.relaxProps.returnSkuSecond(this._nextStep)}
        />
      </View>
    );
  }

  _nextStep = () => {
    msg.emit('router: goToNext', { routeName: 'ReturnSecond' });
  };
}

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1 / PixelRatio.get(),
    ..._.ifIphoneX(
      {
        height: 78
      },
      {
        height: 48
      }
    ),
    ..._.ifIphoneXR({ height: 78 }),
    borderTopColor: '#ebebeb',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  text: {
    color: '#939495',
    fontSize: 14
  },
  price: {
    fontSize: 14,
    marginRight: 10
  }
});
