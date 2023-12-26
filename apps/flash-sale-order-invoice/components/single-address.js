import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  PixelRatio,
  Switch,
  TouchableOpacity,
  Image
} from 'react-native';
import { Relax } from 'plume2';
import * as FindArea from 'wmkit/area/area';
import { noop } from 'wmkit/noop';

import { mainColor } from 'wmkit/styles/index';

@Relax
export default class SingleAddress extends Component {
  static relaxProps = {
    sperator: 'sperator',
    invoice: 'invoice',
    defaultInvoiceAddr: 'defaultInvoiceAddr',
    storeId: 'storeId',
    defaultAddr: 'defaultAddr',

    onSwitchSperator: noop,
    saveTemp: noop
  };

  render() {
    const {
      sperator,
      onSwitchSperator,
      defaultAddr,
      defaultInvoiceAddr,
      storeId
    } = this.props.relaxProps;
    const addressDatail =
      FindArea.addressInfo(
        defaultInvoiceAddr ? defaultInvoiceAddr.get('provinceId') : '',
        defaultInvoiceAddr ? defaultInvoiceAddr.get('cityId') : '',
        defaultInvoiceAddr ? defaultInvoiceAddr.get('areaId') : ''
      ) +
      (defaultInvoiceAddr ? defaultInvoiceAddr.get('deliveryAddress') : '');

    return (
      <View style={styles.box}>
        <View style={styles.row}>
          <Text allowFontScaling={false} style={styles.text}>
            使用单独的发票收货地址
          </Text>
          <Switch
            trackColor={{ true: mainColor }}
            thumbColor={sperator ? mainColor : '#eee'}
            value={sperator}
            onValueChange={() => onSwitchSperator(!sperator)}
          />
        </View>
        {sperator ? (
          defaultInvoiceAddr && defaultInvoiceAddr.get('deliveryAddressId') ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.content}
              onPress={() =>
                this._goToChoose({
                  storeId,
                  companyInfoId: this.props.companyInfoId
                })
              }
            >
              <View style={styles.container}>
                <View style={styles.leftDom}>
                  <Image
                    style={styles.img}
                    source={require('../img/location.png')}
                  />
                </View>
                <View style={styles.rightDom}>
                  <View style={styles.center}>
                    <View style={styles.item}>
                      <Text allowFontScaling={false} style={styles.text}>
                        收货人：{defaultInvoiceAddr.get('consigneeName')}
                      </Text>
                      <Text allowFontScaling={false} style={styles.text}>
                        {defaultInvoiceAddr.get('consigneeNumber')}
                      </Text>
                    </View>
                    <Text
                      allowFontScaling={false}
                      numberOfLines={2}
                      style={styles.text}
                    >
                      收货地址：{addressDatail}
                    </Text>
                  </View>
                  <Image
                    style={styles.arrow}
                    source={require('../img/arrow.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ) : (
              <TouchableOpacity
                onPress={() =>
                  this._goToChoose({
                    storeId,
                    companyInfoId: this.props.companyInfoId
                  })
                }
                activeOpacity={0.8}
                style={styles.row}
              >
                <View style={styles.leftCon}>
                  <Image
                    style={styles.local}
                    source={require('../img/location.png')}
                  />
                  <Text allowFontScaling={false} style={styles.text}>
                    {defaultAddr && defaultAddr.get('deliveryAddressId')
                      ? '点击选择发票收货地址'
                      : '您的收货地址为空，点击新增收货地址'}
                  </Text>
                </View>
                <Image
                  style={styles.arrow}
                  source={require('../img/arrow.png')}
                />
              </TouchableOpacity>
            )
        ) : null}
      </View>
    );
  }

  /**
   * 初次进入页面选择地址
   * @private
   */
  _goToChoose = ({ storeId, companyInfoId }) => {
    const { defaultAddr, saveTemp } = this.props.relaxProps;
    saveTemp({
      companyInfoId,
      comeFroms:
        defaultAddr && defaultAddr.get('deliveryAddressId')
          ? `invoiceAddress_${storeId}`
          : `firstDefaultInvoiceAddr_${storeId}`,
      page:
        defaultAddr && defaultAddr.get('deliveryAddressId')
          ? 'UserReceiveAddress'
          : 'UserAddressEdit'
    });
  };

  /**
   * 下一步
   * @private
   */
  _goToNext = companyInfoId => {
    const { saveTemp } = this.props.relaxProps;
    saveTemp({
      companyInfoId: companyInfoId,
      comeFroms: 'invoiceAddress',
      page: 'UserReceiveAddress'
    });
  };
}

const styles = StyleSheet.create({
  box: {
    borderTopColor: '#ebebeb',
    borderTopWidth: 1 / PixelRatio.get()
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    height: 50,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1 / PixelRatio.get()
  },
  text: {
    color: '#333333',
    fontSize: 14
  },
  local: {
    width: 17,
    height: 22,
    marginRight: 10
  },
  // arrow: {
  //   width: 7,
  //   height: 13,
  // },
  leftCon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    backgroundColor: '#fff',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb'
  },
  container: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between'
  },
  leftDom: {
    justifyContent: 'center',
    marginRight: 5
  },
  rightDom: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  img: {
    width: 17,
    height: 22
  },
  arrow: {
    width: 7,
    height: 13,
    marginLeft: 10
  },
  center: {
    flex: 1,
    marginLeft: 10
  }
});
