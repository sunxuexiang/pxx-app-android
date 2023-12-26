import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PixelRatio
} from 'react-native';
import { Relax } from 'plume2';

import { noop } from 'wmkit/noop';
import * as _ from '../../../wmkit/common/util'; // added by scx
import { screenWidth, isAndroid, mainColor } from 'wmkit/styles/index';
import LinearGradient from 'react-native-linear-gradient';
@Relax
export default class DropDown extends React.Component {
  static relaxProps = {
    //优惠券类型 0通用券 1店铺券 2运费券
    couponType: 'couponType',
    //我的优惠券优惠券类型选择
    setCouponType: noop,
    //下拉菜单的显示隐藏
    changeDrapMenu: noop
  };
  render() {
    const { couponType, setCouponType, changeDrapMenu } = this.props.relaxProps;
    return (
      <View style={styles.shadow}>
        <View style={styles.menuList}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setCouponType(null)}
          >
            <LinearGradient
              style={styles.menuItem}
              colors={
                couponType == null
                  ? [mainColor, mainColor]
                  : ['#F5F5F5', '#F5F5F5']
              }
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Text
                style={
                  couponType == null
                    ? [styles.text, { color: '#fff' }]
                    : styles.text
                }
                allowFontScaling={false}
              >
                全部券类型
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setCouponType(0)}
          >
            <LinearGradient
              style={styles.menuItem}
              colors={
                couponType == 0
                  ? [mainColor, mainColor]
                  : ['#F5F5F5', '#F5F5F5']
              }
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Text
                style={
                  couponType == 0
                    ? [styles.text, { color: '#fff' }]
                    : styles.text
                }
                allowFontScaling={false}
              >
                通用券
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setCouponType(1)}
          >
            <LinearGradient
              style={styles.menuItem}
              colors={
                couponType == 1
                  ? [mainColor, mainColor]
                  : ['#F5F5F5', '#F5F5F5']
              }
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Text
                style={
                  couponType == 1
                    ? [styles.text, { color: '#fff' }]
                    : styles.text
                }
                allowFontScaling={false}
              >
                店铺券
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={
              couponType == 2
                ? [styles.menuItem, { backgroundColor: '#000' }]
                : [styles.menuItem, { marginRight: 0 }]
            }
            activeOpacity={0.8}
            onPress={() => setCouponType(2)}
          >
            <Text
              style={
                couponType == 2 ? [styles.text, { color: '#fff' }] : styles.text
              }
              allowFontScaling={false}
            >
              运费券
            </Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.shadowTouchable}>
          <TouchableOpacity
            onPress={() => {
              changeDrapMenu();
            }}
            style={styles.shadowTouchable}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shadow: {
    position: 'absolute',
    left: 0,
    ..._.ifIphoneX(
      {
        top: 81
      },
      {
        top: isAndroid ? 41 : 61
      }
    ),
    width: screenWidth,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    height: '100%'
  },
  shadowTouchable: {
    flex: 1,
    height: '100%'
  },
  menuList: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuItem: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    marginRight: 10
  },
  text: {
    fontSize: 12,
    color: '#333'
  }
});
