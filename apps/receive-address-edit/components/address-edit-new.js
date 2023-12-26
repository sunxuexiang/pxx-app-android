import React from 'react';
import { Image, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Relax } from 'plume2';
import AccountFrom from './account-from';
import { isAndroid, screenWidth } from 'wmkit/styles/index';
import * as _ from 'wmkit/common/util';
import { noop } from '../../../wmkit';

@Relax
export default class AddressEditNew extends React.Component {
  static relaxProps = {
    address: 'address',
    onChange: noop,
    getArea: noop,
    saveAddress: noop,
    canSubmit: 'canSubmit',
    addressId: 'addressId',
    provinceCity: 'provinceCity',
  };
  isClickCenter = false;
  /**
   * 点击空白隐藏键盘
   * @private
   */
  _dismissKeyboard = () => {
    setTimeout(() => {
      if (!this.isClickCenter) {
        Keyboard.dismiss();
      }
    }, 100); // 延时100毫秒等待事件传递完成;
  };

  render() {
    const {

    } = this.props.relaxProps;
    return (
      <View style={styles.container}
            onStartShouldSetResponderCapture={() => {
              this.isClickCenter = false;
              this._dismissKeyboard();
              return false;
            }}
      >
        <View style={styles.loginContent}>
          {/* <View style={styles.logoBox}>
            <Image
              resizeMode="contain"
              source={require('../img/logo.png')}
              style={styles.logo}
            />
          </View> */}
          <View
            onStartShouldSetResponderCapture={() => {
              // 内层view后捕获事件;
              this.isClickCenter = true;
            }}
          >
            <AccountFrom/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    alignItems: 'center',
    backgroundColor: '#fff',
    // ..._.ifIphoneX(
    //   {
    //     paddingTop: 85,
    //   },
    //   {
    //     paddingTop: isAndroid ? 50 : 70,
    //   },
    // ),
  },
  loginContent: {
    // flex: 1
    // width: '75%'
  },
  closeBox: {
    position: 'absolute',
    ..._.ifIphoneX(
      {
        top: 30,
      },
      {
        top: isAndroid ? 0 : 20,
      },
    ),
    left: 0,
    padding: 20,
  },
  close: {
    width: 16,
    height: 16,
  },
  logoBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 50,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: screenWidth < 385 ? 20 : 50,
    marginBottom: screenWidth < 385 ? 0 : 30,
  },
  item: {
    flex: 1,
  },
  itemText: {
    color: '#999',
  },
  itemTextSelected: {
    color: '#000',
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#999',
  },
  img: {
    width: 9,
    height: 7,
    marginLeft: 5,
  },
  copyText: {
    fontSize: 12,
    backgroundColor: 'transparent',
    lineHeight: 14,
    color: '#4992d9',
  },
});
