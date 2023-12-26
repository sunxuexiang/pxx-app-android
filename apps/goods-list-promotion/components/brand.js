import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  PixelRatio,
  Image
} from 'react-native';
import { Relax } from 'plume2';

import { noop } from 'wmkit/noop';
import * as _ from 'wmkit/common/util'; // added by scx
import { fromJS } from 'immutable';

import { screenWidth, mainColor } from 'wmkit/styles/index';

const isAndroid = Platform.OS === 'android';

/**
 * 商品品牌查询
 */
@Relax
export default class Brand extends React.Component {
  static relaxProps = {
    brands: 'brands',

    closeShade: noop,
    chooseBrand: noop,
    clearBrands: noop,
    okBrands: noop
  };

  render() {
    const {
      closeShade,
      brands,
      chooseBrand,
      clearBrands,
      okBrands
    } = this.props.relaxProps;
    const brandList = (brands || fromJS([])).toJS();

    return (
      !this.props.hide && (
        <View style={styles.shadow}>
          <View style={styles.sort}>
            <ScrollView
              contentContainerStyle={styles.sortScroll}
              alwaysBounceVertical={false}
            >
              {brandList.map((v, k) => {
                return (
                  <TouchableOpacity
                    key={k}
                    onPress={() => chooseBrand(v.brandId)}
                    style={styles.item}
                  >
                    {v.checked && <Image
                      source={require('wmkit/theme/gx.png')}
                      style={[styles.checkIcon, { tintColor: mainColor }]}
                    />}
                    <Text
                      allowFontScaling={false}
                      numberOfLines={1}
                      style={[
                        styles.itemText,
                        v.checked && { color: mainColor }
                      ]}
                    >
                      {v.brandName + (v.nickName ? '(' + v.nickName + ')' : '')}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <View style={styles.bottomBtn}>
              <TouchableOpacity
                onPress={() => clearBrands()}
                activeOpacity={0.8}
                style={[styles.reset, { borderColor: mainColor }]}
              >
                <Text style={[styles.resetText, { color: mainColor }]} allowFontScaling={false}>
                  重置
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => okBrands()}
                activeOpacity={0.8}
                style={[styles.submitBtn, { backgroundColor: mainColor }]}
              >
                <Text style={styles.whiteText} allowFontScaling={false}>
                  确定
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.shadowTouchable}>
            <TouchableWithoutFeedback onPress={closeShade}>
              <View style={styles.shadowTouchable} />
            </TouchableWithoutFeedback>
          </View>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  shadow: {
    position: 'absolute',
    left: 0,
    ..._.ifIphoneX(
      {
        top: 196
      },
      {
        top: isAndroid ? 176 : 176,
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
  sort: {
    backgroundColor: '#fff',
    maxHeight: 234,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden'
  },
  sortScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 5
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 5,
    width: (screenWidth - 30) / 2
  },
  itemText: {
    color: '#333',
    fontSize: 12
  },
  bottomBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 52,
    paddingHorizontal: 16
  },
  reset: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    width: screenWidth * 0.448,
    borderRadius: 32,
    borderWidth: 1 / PixelRatio.get()
  },
  resetText: {
    fontSize: 16
  },
  submitBtn: {
    width: screenWidth * 0.448,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
  },
  whiteText: {
    color: '#fff',
    fontSize: 16
  },
  checkIcon: {
    width: 12,
    height: 12,
    marginRight: 8
  }
});
