import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Relax, msg } from 'plume2';

import { screenWidth } from 'wmkit/styles/index';
import { noop } from 'wmkit/noop';
import * as Button from 'wmkit/button';

import * as _ from '../../../wmkit/common/util'; // added by scx 
const SubmitButton = Button.Submit;

@Relax
export default class GoodsBottom extends Component {
  static relaxProps = {
    immediateBuy: noop,
    goodsInfo: 'goodsInfo'
  };

  UNSAFE_componentWillMount() {
    // 商品详情中购物车数量角标更新方法
    msg.on('purchaseNum:refresh', this.props.relaxProps.updatePurchaseCount);
  }

  componentWillUnmount() {
    msg.off('purchaseNum:refresh', this.props.relaxProps.updatePurchaseCount);
  }

  render() {
    const { goodsInfo, immediateBuy } = this.props.relaxProps;
    const invalid = goodsInfo.get('stock') <= 0;
    return (
      <View style={styles.detailBottom}>
        <SubmitButton
          boxStyle={{ width: '100%' }}
          disabled={invalid}
          text="立即购买"
          onClick={() => immediateBuy(goodsInfo.get('goodsInfoId'))}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailBottom: {
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    borderStyle: 'solid',
    backgroundColor: '#fff',
    width: screenWidth,
    position: 'absolute',
    left: 0,
    ..._.ifIphoneX(
      {
        height: 83,
        paddingBottom: 35
      },
      {
        height: 48
      }
    ),
    zIndex: 999
  }
});
