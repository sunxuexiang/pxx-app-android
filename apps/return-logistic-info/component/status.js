import React, { Component } from 'react';
import { Relax } from 'plume2';
import { View } from 'react-native';

import FormItem from 'wmkit/form/form-item';

@Relax
export default class Status extends Component {
  store;

  static relaxProps = {
    companyInfo: 'companyInfo'
  };

  render() {
    const { companyInfo } = this.props.relaxProps;
    //物流公司名称
    const company = companyInfo.get('company');
    //创建日期
    const createTime = companyInfo.get('createTime');
    //运单号
    const no = companyInfo.get('no');

    return (
      <View>
        <FormItem
          labelName="发货日期"
          placeholder={createTime == '' ? '无' : createTime.split(' ')[0]}
        />
        <FormItem
          labelName="物流公司"
          placeholder={company == '' ? '无' : company}
        />
        <FormItem labelName="物流单号" placeholder={no == '' ? '无' : no} />
      </View>
    );
  }
}
