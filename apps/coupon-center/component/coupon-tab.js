import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PixelRatio,
  ScrollView,
  Image,
  UIManager,
  findNodeHandle
} from 'react-native';
import { Relax } from 'plume2';

import { noop } from 'wmkit/noop';
import { mainColor } from 'wmkit/styles/index';

@Relax
export default class CouponTab extends React.Component {
  _cateRefs = [];
  scrollViewTo = noop;

  static relaxProps = {
    couponCateList: 'couponCateList',
    couponCateId: 'couponCateId',
    activedKey: 'activedKey',
    changeCateMask: noop,
    changeActivedKey: noop,
    setCouponCate: noop
  };

  componentDidUpdate() {
    this.scrollViewTo();
  }

  componentDidMount() {
    setTimeout(() => {
      this.scrollViewTo();
    }, 10);
  }

  render() {
    const {
      changeCateMask,
      couponCateList,
      couponCateId,
      setCouponCate,
      changeActivedKey
    } = this.props.relaxProps;
    return (
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={styles.tabBox}
          ref={(ref) => (this._scroll = ref)}
        >
          {couponCateList.toJS().map((cateItme, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setCouponCate(cateItme.couponCateId);
                  changeActivedKey(index);
                }}
                key={cateItme.couponCateId}
                ref={(ref) => (this._cateRefs[cateItme.couponCateId] = ref)}
                style={[
                  styles.tabItem,
                  couponCateId === cateItme.couponCateId && {
                    borderBottomColor: mainColor
                  }
                ]}
              >
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.tabText,
                    couponCateId === cateItme.couponCateId && {
                      color: mainColor
                    }
                  ]}
                >
                  {cateItme.couponCateName}
                </Text>
                {couponCateId === cateItme.couponCateId && (
                  <View style={[styles.line, { backgroundColor: mainColor }]} />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.allBox}
          onPress={() => {
            changeCateMask();
          }}
        >
          <Text allowFontScaling={false} style={styles.tabText}>
            全部
          </Text>
          <Image
            source={require('../img/down-arrow.png')}
            style={styles.downImg}
          />
        </TouchableOpacity>
      </View>
    );
  }

  scrollViewTo = () => {
    const { couponCateList, activedKey } = this.props.relaxProps;
    let allLeft = 0;
    couponCateList.toJS().map((cateItem, index) => {
      UIManager.measure(
        findNodeHandle(this._cateRefs[cateItem.couponCateId]),
        (x, y, width) => {
          if (index < activedKey) {
            allLeft = allLeft + width + 30;
          } else {
            this._scroll.scrollTo({ x: allLeft, y: 0 });
            return;
          }
        }
      );
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
    height: 40
    // borderBottomColor: '#ebebeb',
    // borderBottomWidth: 1 / PixelRatio.get()
  },
  bar: {
    flexDirection: 'row'
  },
  tabBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff'
  },
  tabItem: {
    height: 39,
    // borderBottomColor: 'transparent',
    // borderBottomWidth: 1,
    justifyContent: 'center',
    marginRight: 30
  },
  tabText: {
    fontSize: 12,
    color: '#333'
  },
  allBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10
  },
  downImg: {
    width: (13 / 7) * 5,
    height: 5,
    marginLeft: 4
  },
  line: {
    width: 24,
    height: 2,
    position: 'absolute',
    bottom: 3
  }
});
