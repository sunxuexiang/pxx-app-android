import React, { Component } from 'react';
import { Relax, msg } from 'plume2';

import * as Button from 'wmkit/button';
import { noop } from 'wmkit/noop';


const LongButton = Button.LongButton;

@Relax
export default class Save extends Component {
  static relaxProps = {
    defaultInvoiceAddr: 'defaultInvoiceAddr',
    sperator: 'sperator',
    save: noop
  };

  render() {
    return <LongButton text="保存" onClick={() => this._onSave()} />;
  }

  /**
   * 保存
   * @private
   */
  _onSave = async () => {
    const { sperator, defaultInvoiceAddr } = this.props.relaxProps;
    if (sperator && !defaultInvoiceAddr.get('deliveryAddressId')) {
      msg.emit('app:tip', '请选择单独的发票收货地址');
      return;
    }
    this.props.relaxProps.save({
      companyInfoId: this.props.companyInfoId,
      page: 'FlashSaleOrderConfirm'
    });
  };
}
