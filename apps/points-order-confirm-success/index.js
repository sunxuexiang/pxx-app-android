import React, { Component } from 'react';
import { msg } from 'plume2';

import SuccessContent from './component/confirm-success';

export default class PointsConfirmSuccess extends Component {
  UNSAFE_componentWillMount() {
    // 解析url中的参数
    const state = this.props.route;
    const { result } = (state && state.params) || {};
    if (!state && !result) {
      msg.emit('app:tip', '订单不存在');
      msg.emit('router: replace', { routeName: 'PointsOrderList' });
    }
  }

  render() {
    const state = this.props.route;
    const { result } = (state && state.params) || {};
    return <SuccessContent result={result} />;
  }
}
