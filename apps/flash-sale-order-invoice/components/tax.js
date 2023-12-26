import React, { Component } from 'react';
import { View, Text, StyleSheet, PixelRatio } from 'react-native';
import { Relax } from 'plume2';

import FormItem from 'wmkit/form/form-item';

import SingleAddress from '../components/single-address';

@Relax
export default class Tax extends Component {
  static relaxProps = {
    key: 'key',
    VATInvoice: 'VATInvoice'
  };

  render() {
    const { key, VATInvoice } = this.props.relaxProps;
    return (
      <View style={styles.container}>
        {key === 'added-value' && VATInvoice ? (
          <View style={{ flex: 1 }}>
            <View style={styles.topBox}>
              <FormItem
                labelName="单位全称"
                placeholder={VATInvoice.companyName}
              />
              <FormItem
                labelName="纳税人识别号"
                placeholder={VATInvoice.taxpayerNumber}
              />
              <FormItem
                labelName="注册电话"
                placeholder={VATInvoice.companyPhone}
              />
              <FormItem
                labelName="注册地址"
                placeholder={VATInvoice.companyAddress}
              />
              <FormItem
                labelName="银行基本户号"
                placeholder={VATInvoice.bankNo}
              />
              <FormItem labelName="开户行" placeholder={VATInvoice.bankName} />
            </View>
            <View style={styles.topBox}>
              <View style={styles.item}>
                <Text allowFontScaling={false} style={styles.text}>
                  开票项目<Text allowFontScaling={false} style={styles.grey}>
                    （增值税专用发票只支持明细）
                  </Text>
                </Text>
              </View>
              <FormItem labelName="明细" />
            </View>
            <SingleAddress companyInfoId={this.props.companyInfoId} />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
  },
  item: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#ffffff'
  },
  text: {
    color: '#333',
    fontSize: 14
  },
  topBox: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ebebeb',
    marginBottom: 10
  },
  grey: {
    color: '#999999',
    fontSize: 14
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    height: 50,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1 / PixelRatio.get()
  }
});
