import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { msg, StoreProvider } from 'plume2';
import Header from 'wmkit/header';

import AppStore from './store';
// import CouponSearch from './component/coupon-search';
import CouponTab from './component/coupon-tab';
import CouponList from './component/coupon-list';
import HelpMask from './component/help-mask.js';
import DropDown from './component/drop-down';
@StoreProvider(AppStore, { debug: __DEV__ })
export default class MyCoupon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const showHelp = this.store.state().get('showHelp');
    const showDrapMenu = this.store.state().get('showDrapMenu');
    return (
      <View style={styles.container}>
        <Header
          renderRight={() => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ padding: 10 }}
                onPress={() =>
                  msg.emit('router: goToNext', { routeName: 'CouponCenter' })
                }
              >
                <Text
                  allowFontScaling={false}
                  style={{ fontSize: 14, color: '#333', marginRight: 10 }}
                >
                  领券中心
                </Text>
              </TouchableOpacity>
            );
          }}
          renderTitle={() => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.headerBox}
                onPress={() => {
                  this.store.changeDrapMenu();
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={{ fontSize: 18, color: '#333', marginRight: 5 }}
                >
                  全部券类型
                </Text>
                <Image
                  style={[
                    styles.arrowImg,
                    showDrapMenu && {
                      transform: [
                        {
                          rotate: '180deg'
                        }
                      ]
                    }
                  ]}
                  source={require('./img/down-arrow.png')}
                />
              </TouchableOpacity>
            );
          }}
        />
        {/*<CouponSearch />*/}
        <CouponTab />
        <CouponList />
        {showDrapMenu && <DropDown />}
        {showHelp && <HelpMask />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  arrowImg: {
    width: 13,
    height: 7,
    tintColor: '#333'
  }
});
