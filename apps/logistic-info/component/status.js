import React, { Component } from 'react';
import { Relax } from 'plume2';
import { View } from 'react-native';

import FormItem from 'wmkit/form/form-item';

@Relax
export default class Status extends Component {
  static relaxProps = {
    goodList: 'goodList'
  };

  render() {
    const company = this.props.relaxProps.goodList.get('logistics');
    const logisticsCompanyInfo = this.props.relaxProps.goodList.get('logisticsCompanyInfo');
    console.log(logisticsCompanyInfo)
    return (
      <View>
        <FormItem
          labelName="发货日期"
          textStyle={{ fontSize: 12, color: '#333' }}
          placeholder={
            this.props.relaxProps.goodList.get('deliveryTime').split(' ')[0]
          }
        />
        <FormItem
          labelName="物流公司"
          textStyle={{ fontSize: 12, color: '#333' }}
          placeholder={company.get('logisticCompanyName')}
        />
        <FormItem
          labelName="物流单号"
          textStyle={{ fontSize: 12, color: '#333' }}
          placeholder={company.get('logisticNo')}
        />
        <FormItem
          labelName="物流公司电话"
          textStyle={{ fontSize: 12, color: '#333' }}
          placeholder={(logisticsCompanyInfo && logisticsCompanyInfo.logisticsCompanyPhone) || '-'}
        />
      </View>
    );
  }
}
