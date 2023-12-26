import React from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import * as WMkit from 'wmkit/kit';
import { msg } from 'plume2';
import { screenWidth,mainColor } from 'wmkit/styles/index';
import { Relax } from 'plume2';
import {debounce} from 'lodash';

@Relax
export default class Assets extends React.Component {
  static relaxProps = {
    pointsIsOpen: 'pointsIsOpen',
    customer: 'customer',
    accountBalanceTotal: 'accountBalanceTotal', //总余额
    unUseCount: 'unUseCount' //未使用总张数
  };

  render() {
    const {
      pointsIsOpen,
      customer,
      accountBalanceTotal,
      unUseCount
    } = this.props.relaxProps;
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <Text allowFontScaling={false} style={styles.text}>
            我的资产
          </Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.8}
            onPress={debounce(() => {
              if (!WMkit.isLoginOrNotOpen()) {
                msg.emit('loginModal:toggleVisible', {
                  callBack: () => {
                    msg.emit('router: goToNext', { routeName: 'MyCoupon' });
                  }
                });
              } else {
                msg.emit('router: goToNext', { routeName: 'MyCoupon' });
              }
            }, 500)}
          >
            <Text allowFontScaling={false} style={[styles.num, { color: mainColor }]}>
              {unUseCount}
            </Text>
            <Text allowFontScaling={false} style={styles.dark}>
              优惠券
            </Text>
          </TouchableOpacity>
          {pointsIsOpen && (
            <TouchableOpacity
              style={styles.item}
              activeOpacity={0.8}
              onPress={debounce(() => {
                if (!WMkit.isLoginOrNotOpen()) {
                  msg.emit('loginModal:toggleVisible', {
                    callBack: () => {
                      msg.emit('router: goToNext', { routeName: 'PointsList' });
                    }
                  });
                } else {
                  msg.emit('router: goToNext', { routeName: 'PointsList' });
                }
              }, 500)}
            >
              <Text allowFontScaling={false} style={[styles.num, { color: mainColor }]}>
                {customer.get('pointsAvailable') || 0}
              </Text>
              <Text allowFontScaling={false} style={styles.dark}>
                积分
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 12
  },
  nav: {
    // height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    paddingHorizontal: 12,
    paddingTop: 15
    // backgroundColor: '#ffffff'
  },
  text: {
    color: '#333',
    fontSize: 14
  },
  icon: {
    width: 7,
    height: 13,
    tintColor: '#000'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    flexWrap: 'wrap'
  },
  img: {
    width: 22,
    height: 22,
    marginBottom: 8
  },
  item: {
    width: (screenWidth - 24) / 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginBottom: 4
  },
  num: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
  },
  dark: {
    color: '#999',
    fontSize: 12
  }
});
