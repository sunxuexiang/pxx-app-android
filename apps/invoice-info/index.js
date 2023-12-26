import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StoreProvider } from 'plume2';

import FormItem from 'wmkit/form/form-item';
import Header from 'wmkit/header';

import AppStore from './store';

@StoreProvider(AppStore, { debug: true })
export default class InvoiceInfo extends React.Component {
  store;

  UNSAFE_componentWillMount() {
    // 是否是编辑状态
    const state = this.props.route;
    const { tid } = (state && state.params) || {};
    this.store.init(tid);
  }

  render() {
    const invoiceInfo = this.store
      .state()
      .get('invoiceInfo')
      .toJS();
    const contacts = invoiceInfo.contacts;
    const phone = invoiceInfo.phone;
    const address = invoiceInfo.address;
    return (
      <View style={{ flex: 1 }}>
        <Header title="发票信息" />
        <View style={styles.container}>
          <FormItem
            labelName="发票信息"
            placeholder={invoiceInfo.type == 1 ? '增值税专用发票' : '普通发票'}
          />
          {invoiceInfo.type == 1 ? (
            <View>
              <FormItem
                labelName="单位全称"
                placeholder={invoiceInfo.companyName}
              />
              <FormItem
                labelName="纳税人识别号"
                placeholder={invoiceInfo.identification}
              />
              <FormItem
                labelName="注册电话"
                placeholder={invoiceInfo.phoneNo}
              />
              <FormItem
                labelName="注册地址"
                placeholder={invoiceInfo.companyAddress}
              />
              <FormItem
                labelName="银行基本户号"
                placeholder={invoiceInfo.account}
              />
              <FormItem labelName="开户行" placeholder={invoiceInfo.bank} />
            </View>
          ) : invoiceInfo.flag == 0 ? (
            <FormItem labelName="发票抬头" placeholder={'个人'} />
          ) : (
            <View>
              <FormItem labelName="发票抬头" placeholder={invoiceInfo.title} />
              <FormItem
                labelName="纳税人识别号"
                placeholder={invoiceInfo.identification || '无'}
              />
            </View>
          )}
          <FormItem
            labelName="开票项目"
            placeholder={invoiceInfo.projectName}
          />
          <FormItem
            labelName="发票收货地址"
            placeholder={contacts + ' ' + phone + ' ' + address}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  text: {
    textAlign: 'right',
    color: '#999999',
    flex: 1
  },
  box: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
