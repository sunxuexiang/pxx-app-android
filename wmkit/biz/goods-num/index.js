import React, { Component } from 'react';
import { msg } from 'plume2';
import * as WMkit from 'wmkit/kit';
import NumInput from 'wmkit/num-input';
import { config } from 'wmkit/config';

import { putPurchase } from 'wmkit/biz/purchase-front';
import { delPurchase } from 'wmkit/biz/purchase-front';
import * as webApi from './webapi';

/**
 * 首页／商品列表／收藏列表 共用的步进器业务处理
 */
export default class GoodsNum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  render() {
    const value = this.state.value;

    return (
      <NumInput
        {...this.props}
        value={value}
        onDelayChange={(num) =>
          this.handleNumChange(this.props.goodsInfoId, num)
        }
        onAddClick={(addDisabled, nextValue) => {
          if (addDisabled && this.props.max > 0 && nextValue > this.props.max) {
            // msg.emit('app:tip', `库存数量：${this.props.max}！`);
          }
        }}
      />
    );
  }

  /**
   * 处理商品采购数量变化
   * @param goodsInfoId
   * @param num
   */
  handleNumChange = (goodsInfoId, num) => {
    if (num === 0) {
      if (WMkit.isLoginOrNotOpen()) {
        webApi.purchaseDelete(goodsInfoId).then((res) => {
          if (res.code === config.SUCCESS_CODE) {
            // 重新设置state的value
            this.setState({ value: num });
            this._handlePurchaseCount(num);
          } else {
            msg.emit('app:tip', '修改失败！请重试');
          }
        });
      } else {
        delPurchase([goodsInfoId]).then((res) => {
          if (res) {
            // 重新设置state的value
            this.setState({ value: num });
            this._handlePurchaseCount(num);
          } else {
            msg.emit('app:tip', '修改失败！请重试');
          }
        });
      }
    } else {
      if (num > this.props.max) {
        // msg.emit('app:tip', `库存数量：${this.props.max}！`);
        // 输入的值超过最大值，更新num为最大值
        num = this.props.max;
      }
      if (WMkit.isLoginOrNotOpen()) {
        webApi.purchaseNumChange(goodsInfoId, num).then((res) => {
          if (res.code == config.SUCCESS_CODE) {
            // 重新设置state的value
            this.setState({ value: num });
            this._handlePurchaseCount(num);
          } else if (res.code === 'K-050121') {
            msg.emit('app:tip', '购物车容量达到100种上限！');
            // 添加失败，数量变回0
            this.setState({ value: 0 });
          } else {
            msg.emit('app:tip', '修改失败！请重试');
          }
        });
      } else {
        putPurchase(goodsInfoId, num).then((res) => {
          if (res) {
            // 重新设置state的value
            this.setState({ value: num });
            this._handlePurchaseCount(num);
          } else {
            msg.emit('app:tip', '修改失败！请重试');
          }
        });
      }
    }
  };

  /**
   * 获取并更新购物车总数量
   * @private
   */
  _handlePurchaseCount = (num) => {
    msg.emit('purchaseNum:refresh');
    this.props.onAfterClick && this.props.onAfterClick(num);
  };
}
