import React, { Component } from 'react';
import { Relax } from 'plume2';
import { View } from 'react-native';

import FormItem from 'wmkit/form/form-item';

@Relax
export default class Status extends Component {
  store;

  static relaxProps = {
    goodList: 'goodList'
  };

  render() {
    const company = this.props.relaxProps.goodList.get('logistics');
    return (
      <View>
        <FormItem
          labelName="发货日期"
          placeholder={
            this.props.relaxProps.goodList.get('deliveryTime').split(' ')[0]
          }
        />
        <FormItem
          labelName="物流公司"
          placeholder={company.get('logisticCompanyName')}
        />
        <FormItem
          labelName="物流单号"
          placeholder={company.get('logisticNo')}
        />
      </View>
    );
  }
}
