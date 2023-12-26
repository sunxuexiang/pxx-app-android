import React, { Component } from 'react';
import { msg } from 'plume2';

import SuccessContent from './component/confirm-success';

export default class OrderSuccess extends Component {
  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const { results } = (state && state.params) || {};
    if (!state || !results) {
      msg.emit('app:tip', '订单不存在');
      msg.emit('router: replace', {
        routeName: 'OrderList'
      });
    }
  }

  render() {
    const state = this.props.route;
    const { results } = (state && state.params) || {};
    return <SuccessContent results={results} />;
  }
}
