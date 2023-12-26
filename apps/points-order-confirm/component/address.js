import React, { Component } from 'react';
import { Relax, msg } from 'plume2';
import { noop } from 'wmkit/noop';
import * as FindArea from 'wmkit/area/area';

import {
  TouchableOpacity,
  View,
  Image,
  Text,
  PixelRatio,
  StyleSheet
} from 'react-native';
import { screenWidth } from 'wmkit/styles/index';

@Relax
export default class Address extends Component {
  static relaxProps = {
    defaultAddr: 'defaultAddr',
    saveSessionStorage: noop
  };

  render() {
    const { defaultAddr } = this.props.relaxProps;
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
      <View style={{ marginBottom: 10 }}>
        {defaultAddr && defaultAddr.get('deliveryAddressId') ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.box}
            onPress={() => this._goToNext()}
          >
            <View style={styles.container}>
              <Image style={styles.line} source={require('../img/line.png')} />
              <View style={styles.leftDom}>
                {/* <Image
                  style={styles.img}
                  source={require('../img/location.png')}
                /> */}
              </View>
              <View style={styles.rightDom}>
                <View style={styles.center}>
                  <View style={styles.item}>
                    <Text allowFontScaling={false} style={styles.text}>
                      {addressDatail}
                    </Text>
                  </View>
                  <Text
                    allowFontScaling={false}
                    numberOfLines={1}
                    style={styles.phone}
                  >
                    {defaultAddr.get('consigneeName')}{' '}
                    {defaultAddr.get('consigneeNumber')}
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
            activeOpacity={0.8}
            onPress={() => this._newFirst()}
          >
            <View style={styles.addAddress}>
              <Image style={styles.addImg} source={require('../img/add.png')} />
              <Text allowFontScaling={false} style={styles.addText}>
                您的收货地址为空，点击新增收货地址
              </Text>
            </View>
            <Image style={styles.line} source={require('../img/line.png')} />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  /**
   * 下一步
   * @private
   */
  _goToNext = () => {
    this.props.relaxProps.saveSessionStorage('pointsAddress');
    msg.emit('router: goToNext', { routeName: 'UserReceiveAddress' });
  };

  /**
   * 新增第一个地址
   * @private
   */
  _newFirst = () => {
    this.props.relaxProps.saveSessionStorage('firstPointsAddress');
    msg.emit('router: goToNext', { routeName: 'UserAddressEdit' });
  };
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 12,
    marginTop: 12,
    position: 'relative'
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'space-between',
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ebebeb'
  },
  leftDom: {
    justifyContent: 'center'
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
    width: 13,
    height: 13,
    marginLeft: 10
  },
  center: {
    flex: 1
  },
  line: {
    height: 4,
    width: screenWidth - 24,
    position: 'absolute',
    top: 0
  },
  addAddress: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#999999'
  },
  text: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold'
  },
  phone: {
    fontSize: 14,
    color: '#999',
    marginTop: -7
  },
  addImg: {
    width: 20,
    height: 20
  }
});
