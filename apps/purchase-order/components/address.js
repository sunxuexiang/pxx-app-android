import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { Relax, msg } from 'plume2';
import { FindArea, noop } from 'wmkit';
import * as WMkit from 'wmkit/kit';
import { mainColor } from '@/wmkit/styles';

@Relax
export default class Address extends Component {
  static relaxProps = {
    defaultAddr: 'defaultAddr',
    saveSessionStorage: noop
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { defaultAddr, saveSessionStorage } = this.props.relaxProps;

    const addressDatail =
      FindArea.addressInfo(
        defaultAddr && defaultAddr.get('provinceId')
          ? defaultAddr.get('provinceId')
          : '',
        defaultAddr && defaultAddr.get('cityId')
          ? defaultAddr.get('cityId')
          : '',
        defaultAddr && defaultAddr.get('areaId')
          ? defaultAddr.get('areaId')
          : ''
      ) +
      (defaultAddr && defaultAddr.get('deliveryAddress')
        ? defaultAddr.get('deliveryAddress')
        : '');

    return (
      <View style={styles.container}>
        <Image source={require('wmkit/theme/location.png')} style={[styles.icon, {tintColor: mainColor}]} />
        <Text style={styles.address}>送至</Text>
        <Text
          style={[styles.address, styles.addressInfo]}
          onPress={() => {
            saveSessionStorage('PurchaseOrder');

            if (WMkit.isLoginOrNotOpen()) {
              msg.emit('router: goToNext', {
                routeName: 'UserReceiveAddress'
              });
            } else {
              msg.emit('loginModal:toggleVisible', {
                callBack: () => {
                  msg.emit('router: goToNext', {
                    routeName: 'UserReceiveAddress'
                  });
                }
              });
            }
          }}
        >
          {addressDatail ? addressDatail : '点击新增收货地址'}
        </Text>
        {/* <Text
          renderRight={() => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ padding: 10 }}
              onPress={() => {
                state.params && state.params._changeEdit();
              }}
            >
              <Text
                allowFontScaling={false}
                style={{ fontSize: 13, color: '#000', marginRight: 10 }}
              >
                {state.params && state.params.buttonName}
              </Text>
            </TouchableOpacity>
          );
        }}></Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingVertical: 20,
    backgroundColor: '#ffffff'
  },
  address: {
    color: 'rgba(0,0,0, 0.8)',
    fontSize: 12,
    fontWeight: '500',
    marginRight: 4
  },
  icon: {
    height: 15,
    width: 15,
    marginRight: 5
  },
  addressInfo: {
    fontWeight: '400',
    marginRight: 45
  }
});
