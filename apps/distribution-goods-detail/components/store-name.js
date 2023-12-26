import React, { Component } from 'react';
import { Relax, msg } from 'plume2';
import {
  View,
  Text,
  PixelRatio,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { screenWidth } from 'wmkit/styles/index';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';

const defaultImg = require('../img/defalutShop.png');

@Relax
export default class StoreName extends Component {
  static relaxProps = {
    // 店铺信息
    store: 'store'
  };

  render() {
    const { store } = this.props.relaxProps;
    const { storeId, storeName, storeLogo, companyType } = store.toJS();
    return (
      <TouchableOpacity
        style={styles.box}
        onPress={() =>
          msg.emit('router: goToNext', {
            routeName: 'StoreMain',
            storeId
          })
        }
      >
        <Image
          style={styles.img}
          source={storeLogo ? { uri: storeLogo } : defaultImg}
        />
        {companyType === 0 && <SelfSalesLabel />}
        <Text style={styles.name} allowFontScaling={false} numberOfLines={1}>
          {storeName}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1 / PixelRatio.get(),
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderTopWidth: 8,
    borderTopColor: '#fafafa'
  },
  img: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 10,
    resizeMode: 'contain'
  },
  name: {
    color: '#333333',
    maxWidth: screenWidth - 106
  }
});
