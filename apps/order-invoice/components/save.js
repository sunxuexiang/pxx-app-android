import React, { Component } from 'react';
import { Relax, msg } from 'plume2';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import * as Button from 'wmkit/button';
import { noop } from 'wmkit/noop';
import LinearGradient from 'react-native-linear-gradient';
const LongButton = Button.LongButton;
import { Text } from '@ant-design/react-native';
import {mainColor} from '@/wmkit/styles';

@Relax
export default class Save extends Component {
  static relaxProps = {
    defaultInvoiceAddr: 'defaultInvoiceAddr',
    sperator: 'sperator',
    save: noop
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this._onSave()}
          style={{ borderRadius: 18 }}
        >
          <LinearGradient
            colors={[mainColor, mainColor]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.save}
          >
            <Text style={styles.text}>保存</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
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
      page: 'OrderConfirm'
    });
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#fff',
    paddingBottom: 10,
    paddingTop: 10
  },
  save: {
    borderRadius: 18,
    alignItems: 'center',
    paddingTop: 11,
    paddingBottom: 11
  },
  text: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 14
  }
});
