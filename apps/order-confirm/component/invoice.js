import React, { Component } from 'react';

import { Relax, msg } from 'plume2';
import FormSelect from 'wmkit/form/form-select';
import { noop } from 'wmkit/noop';
import FormItem from 'wmkit/form/form-item';
import {debounce} from 'lodash';

import { fromJS } from 'immutable';

const INVOICE_TYPE = {
  '0': '普通发票',
  '1': '增值税专用发票',
  '-1': '不需要发票'
};

@Relax
export default class Invoice extends Component {
  static relaxProps = {
    orderConfirm: 'orderConfirm',

    saveSessionStorage: noop
  };

  render() {
    const { orderConfirm } = this.props.relaxProps;
    if (!orderConfirm || JSON.stringify(orderConfirm) == '{}') return;
    const { storeId } = this.props;
    const index = orderConfirm.findIndex((f) => f.get('storeId') == storeId);
    const invoice = orderConfirm.getIn([index, 'invoice']) || fromJS([]);
    const iSwitch = orderConfirm.getIn([index, 'iSwitch']);
    return iSwitch == 1 ? (
      <FormSelect
        label={'发票信息'}
        placeholder={INVOICE_TYPE[invoice.get('type')]}
        itemStyle={{
          borderBottomWidth: 0,
          paddingVertical: 20,
          paddingHorizontal: 12
        }}
        labelStyle={{ fontSize: 12 }}
        textStyle={{ fontSize: 12 }}
        onPress={debounce(() => this._goChooseInvoice(), 500)}
      />
    ) : (
      <FormItem
        labelName="发票信息"
        itemStyle={{
          borderBottomWidth: 0,
          paddingVertical: 20,
          paddingHorizontal: 12
        }}
        labelStyle={{fontSize: 12}}
        textStyle={{ fontSize: 12, color: 'rgba(0,0,0,0.8)', fontWeight: '500' }}
        placeholder="不支持开票"
      />
    );
  }

  /**
   * 选择发票信息
   * @private
   */
  _goChooseInvoice = () => {
    const { saveSessionStorage } = this.props.relaxProps;
    msg.emit('router: goToNext', {
      routeName: 'OrderInvoice',
      supplierId: this.props.supplierId
    });
    saveSessionStorage('invoice');
  };
}
