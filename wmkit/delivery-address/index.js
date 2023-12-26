import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { msg } from 'plume2';
import { cache } from 'wmkit/cache';
import {mainColor, screenWidth} from 'wmkit/styles/index';
export default class WMDeliveryAddress extends React.PureComponent {


  render() {
    const icon = require('wmkit/theme/location.png');
    let { cityInfo,sourceType } = this.props;
    return (
      <View style={styles.deliveryAdressWrapper}>
        <Image style={[styles.deliveryIcon, {tintColor: mainColor}]} source={icon} alt=''/>
        <Text style={styles.sendText}>送至</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={ async () => {
            await this._saveSessionStorage(sourceType);
            this._goAddressPage();
          }}
          style={styles.address}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={styles.text}
          >
            {cityInfo !='' ? cityInfo : '请选择'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _goAddressPage() {
    msg.emit('router: goToNext', { routeName: 'UserReceiveAddress' });
  }

  /**
   * 存储SessionStorage
   * @param comeFrom 来自哪里
   */
  _saveSessionStorage = async (type) => {
    let comeFrom ;
    let key;
    if(type == 'PurchaseOrder'){
      comeFrom = 'PurchaseOrder';
      key = cache.PURCHASE_ADDRESS;
    }else if(type == 'GoodsDetail'){
      comeFrom = 'GoodsDetail';
      key = cache.GOODS_DETAIL_ADDRESS;
    }else if(type == 'OrderConfirm'){
      comeFrom = 'OrderConfirm';
      key = cache.ORDER_CONFIRM;
    }
    await AsyncStorage.setItem(key
      ,
      JSON.stringify({
        comeFrom
      })
    );
  };
}

const styles = StyleSheet.create({
  deliveryAdressWrapper: {
    width: screenWidth,
    height: 44,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden'
  },
  deliveryIcon: {
    width: 14,
    height: 14
  },
  sendText: {
    fontWeight: '500',
    marginHorizontal: 12
  },
  address: {
    flex: 1
  },
  text: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.8)'
  }
});
