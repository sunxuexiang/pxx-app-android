import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  UIManager,
  findNodeHandle,
  TouchableOpacity,
  Image,
  Animated
} from 'react-native';
import { msg } from 'plume2';
import { screenWidth, mainColor } from 'wmkit/styles/index';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import * as WMkit from 'wmkit/kit';
const PriceIcon = require('../img/price.png');
import { config } from 'wmkit/config';
type ICateTabProps = T.IProps & T.ICateTabProps;

@connect<Partial<ICateTabProps>, T.ICateTabState>(
  store2Props,
  actions
)
export default class CateTab extends React.Component<
  Partial<ICateTabProps>,
  T.ICateTabState
> {
  // 积分商品分类ScrollView
  _scroll;
  // 当前分类
  _cateRefs = [];

  static defaultProps = {
    stickyHeaderY: -1,
    stickyScrollY: new Animated.Value(0)
  };

  constructor(props: ICateTabProps) {
    super(props);
    this.state = {
      stickyLayoutY: 1
    };
  }

  // 兼容代码，防止没有传头部高度
  _onLayout = (event) => {
    this.setState({
      stickyLayoutY: event.nativeEvent.layout.y
    });
  };

  componentDidUpdate() {
    this.scrollViewTo();
  }

  componentDidMount() {
    setTimeout(() => {
      this.scrollViewTo();
    }, 10);
  }

  /**

*/
  render() {
    let {
      actions: { action },
      main: { cateList, cateId, pointsCouponListFlag, canExchange, sortType }
    } = this.props;

    const { stickyHeaderY, stickyScrollY } = this.props;
    const { stickyLayoutY } = this.state;
    let y = stickyHeaderY != -1 ? stickyHeaderY : stickyLayoutY;
    const translateY = stickyScrollY.interpolate({
      inputRange: [-1, 0, y, y + 1],
      outputRange: [0, 0, 0, 1]
    });

    let type = sortType.type;
    let sort = sortType.sort;

    return (
      <Animated.View
        onLayout={this._onLayout}
        style={[
          { zIndex: 100, backgroundColor: '#ffffff' },
          { transform: [{ translateY }] }
        ]}
      >
        <View style={styles.scrollView}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={styles.layoutContent}
            ref={(ref) => (this._scroll = ref)}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                action.onChooseOtherCate(false);
              }}
              style={[
                styles.tabItem,
                !cateId &&
                  !pointsCouponListFlag && {
                    borderBottomColor: mainColor
                  }
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[
                  styles.tabText,
                  !cateId &&
                    !pointsCouponListFlag && {
                      color: mainColor
                    }
                ]}
              >
                全部
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                action.onChooseOtherCate(true);
              }}
              style={[
                styles.tabItem,
                pointsCouponListFlag && {
                  borderBottomColor: mainColor
                }
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[
                  styles.tabText,
                  pointsCouponListFlag && {
                    color: mainColor
                  }
                ]}
              >
                优惠券
              </Text>
            </TouchableOpacity>
            {cateList.map((cateItem, index) => {
              return (
                <TouchableOpacity
                  key={cateItem.cateId}
                  activeOpacity={0.8}
                  onPress={() => {
                    action.choosePointsCate(cateItem.cateId, index);
                  }}
                  ref={(ref) => (this._cateRefs[cateItem.cateId] = ref)}
                  style={[
                    styles.tabItem,
                    cateId == cateItem.cateId && {
                      borderBottomColor: mainColor
                    }
                  ]}
                >
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.tabText,
                      cateId == cateItem.cateId && {
                        color: mainColor
                      }
                    ]}
                  >
                    {cateItem.cateName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.filterBox}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (!WMkit.isLoginOrNotOpen()) {
                msg.emit('loginModal:toggleVisible', {
                  callBack: () => {
                    this.props.actions.init();
                    action.onChooseCanExchange();
                  }
                });
              } else {
                this.props.actions.init();
                action.onChooseCanExchange();
              }
            }}
            style={[
              styles.filterBtn,
              canExchange ? {} : styles.btnGray
            ]}
          >
            <Text
              style={[
                styles.filterFont,
                canExchange ? styles.fontLight : styles.fontGray
              ]}
            >
              我能兑换
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.setPointsSort()}
            style={[
              styles.filterBtn,
              type === 'points' ? {} : styles.btnGray
            ]}
          >
            <Text
              style={[
                styles.filterFont,
                type === 'points' ? styles.fontLight : styles.fontGray
              ]}
            >
              积分价
            </Text>
            <Image
              source={
                type === 'points'
                  ? sort === 'asc'
                    ? {uri: config.OSS_HOST + '/assets/image/theme/price-up.png'}
                    : {uri: config.OSS_HOST + '/assets/image/theme/price-down.png'}
                  : PriceIcon
              }
              style={styles.upIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.setPriceSort()}
            style={[
              styles.filterBtn,
              type === 'price' ? {} : styles.btnGray
            ]}
          >
            <Text
              style={[
                styles.filterFont,
                type === 'price' ? styles.fontLight : styles.fontGray
              ]}
            >
              市场价
            </Text>
            <Image
              source={
                type === 'price'
                  ? sort === 'asc'
                    ? {uri: config.OSS_HOST + '/assets/image/theme/price-up.png'}
                    : {uri: config.OSS_HOST + '/assets/image/theme/price-down.png'}
                  : PriceIcon
              }
              style={styles.upIcon}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  setPointsSort = WMkit.onceFunc(() => {
    this.props.actions.action.setSort('points');
  }, 500);
  setPriceSort = WMkit.onceFunc(() => {
    this.props.actions.action.setSort('price');
  }, 2000);
  /**
   * 积分商品分类选中左右滚动事件
   */
  scrollViewTo = () => {
    let {
      main: { cateList, chooseCateIndex }
    } = this.props;

    let allLeft = 0;
    cateList.map((cateItem, index) => {
      UIManager.measure(
        findNodeHandle(this._cateRefs[cateItem.cateId]),
        (x, y, width) => {
          if (index < chooseCateIndex) {
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
  scrollView: {
    marginBottom: 5,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  layoutContent: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tabItem: {
    height: 30,
    borderBottomColor: 'transparent',
    borderBottomWidth: 1,
    justifyContent: 'center',
    marginRight: 30
  },
  tabText: {
    fontSize: 12,
    color: '#333'
  },
  filterBox: {
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  filterBtn: {
    width: 112,
    height: 28,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnGray: {
    // backgroundColor: '#F5F5F5'
  },
  filterFont: {
    fontSize: 12
  },
  fontLight: {
    color: '#ff6600'
  },
  fontGray: {
    color: '#333'
  },
  downIcon: {
    width: 10,
    height: 10,
    marginLeft: 6,
    tintColor: '#ffffff'
  },
  upIcon: {
    width: 12,
    height: 12,
    marginLeft: 5
  },
  sortImgColor: {
    tintColor: '#999999'
  }
});
