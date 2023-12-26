import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import * as _ from '../../../wmkit/common/util'; // added by scx
import { screenWidth, isAndroid, mainColor, screenHeight } from 'wmkit/styles/index';

@Relax
export default class CateMask extends React.Component {
  static relaxProps = {
    couponCateList: 'couponCateList',
    couponCateId: 'couponCateId',
    activedKey: 'activedKey',

    changeCateMask: noop,
    changeActivedKey: noop,
    setCouponCate: noop
  };

  render() {
    const {
      changeCateMask,
      couponCateList,
      couponCateId,
      setCouponCate,
      changeActivedKey
    } = this.props.relaxProps;
    return (
      <View style={styles.shadow}>
        <View style={styles.content}>
          <View style={styles.titleBox}>
            <Text style={styles.titleText} allowFontScaling={false}>
              全部券分类
            </Text>
          </View>
          <ScrollView
            style={{
              ..._.ifIphoneX(
                {
                  maxHeight: screenHeight - 190
                },
                {
                  maxHeight: isAndroid ? screenHeight - 146 : screenHeight - 146
                }
              )
            }}
          >
            <View style={styles.menuList}>
              {couponCateList.toJS().map((cateItme, index) => {
                return (
                  <TouchableOpacity
                    key={cateItme.couponCateId}
                    style={[
                      styles.menuItem,
                      couponCateId === cateItme.couponCateId && { borderColor: mainColor,  backgroundColor: '#fff' }
                    ]}
                    activeOpacity={0.8}
                    onPress={() => {
                      changeActivedKey(index);
                      setCouponCate(cateItme.couponCateId);
                      changeCateMask();
                    }}
                  >
                    <Text
                      style={[
                        styles.text,
                        couponCateId === cateItme.couponCateId && {
                          color: mainColor
                        }
                      ]}
                      allowFontScaling={false}
                    >
                      {cateItme.couponCateName}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.cancleBox}
            onPress={() => {
              changeCateMask();
            }}
          >
            <Text allowFontScaling={false} style={styles.cancleText}>
              取消
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.shadowTouchable}>
          <TouchableOpacity
            onPress={() => {
              changeCateMask();
            }}
            style={styles.shadowTouchable}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#fff'
  },
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
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 7,
    paddingBottom: 10
  },
  menuItem: {
    width: (screenWidth - 46) / 3,
    height: 35,
    borderColor: 'transparent',
    borderWidth: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    marginBottom: 10,
    borderRadius:20
  },
  text: {
    fontSize: 12,
    color: '#000'
  },
  titleBox: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 14,
    color: '#333'
  },
  cancleBox: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#ebebeb',
    borderTopWidth: 1,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1
  }
});
