import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  UIManager,
  findNodeHandle,
  TouchableOpacity,
  Animated,
  Platform
} from 'react-native';

import * as T from '../types';
import { screenWidth, mainColor } from 'wmkit/styles/index';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';

import * as _ from '../../../../wmkit/common/util';

const isAndroid = Platform.OS === 'android';

type ICateTabProps = T.IProps & T.ICateTabProps;

@connect<Partial<ICateTabProps>, T.ICateTabState>(
  store2Props,
  actions
)
export default class CateTab extends React.Component<
  Partial<ICateTabProps>,
  T.ICateTabState
> {
  // 拼团分类ScrollView
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
      main: { grouponCates, chooseCateId }
    } = this.props;
    const { stickyHeaderY, stickyScrollY } = this.props;
    const { stickyLayoutY } = this.state;
    let y = stickyHeaderY != -1 ? stickyHeaderY : stickyLayoutY;
    const translateY = stickyScrollY.interpolate({
      inputRange: [-1, 0, y, y + 1],
      outputRange: [0, 0, 0, 1]
    });
    return (
      <Animated.View
        onLayout={this._onLayout}
        style={[{ zIndex: 100 }, { transform: [{ translateY }] }]}
      >
        <View style={styles.title}>
          <Image style={[styles.titleImg, { tintColor: mainColor }]} source={require('wmkit/theme/gift.png')} />
          <Text allowFontScaling={false} style={styles.titleTxt}>精选拼团</Text>
        </View>
        <View style={styles.cateTab}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={styles.layoutContent}
            ref={(ref) => (this._scroll = ref)}
          >
            {grouponCates.map((cateItem, index) => {
              return (
                <TouchableOpacity
                  key={cateItem.grouponCateId}
                  activeOpacity={0.8}
                  onPress={() => {
                    action.chooseGrouponCate(
                      cateItem.grouponCateId,
                      cateItem.defaultCate,
                      index
                    );
                    action.commonChange(
                      'main.chooseCateId',
                      cateItem.grouponCateId
                    );
                  }}
                  ref={(ref) => (this._cateRefs[cateItem.grouponCateId] = ref)}
                  style={[
                    styles.tabItem,
                    chooseCateId
                      ? chooseCateId === cateItem.grouponCateId && {
                          borderBottomColor: mainColor
                        }
                      : cateItem.defaultCate === 1 && {
                          borderBottomColor: mainColor
                        }
                  ]}
                >
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.tabText,
                      chooseCateId
                        ? chooseCateId === cateItem.grouponCateId && {
                            color: mainColor
                          }
                        : cateItem.defaultCate === 1 && {
                            color: mainColor
                          }
                    ]}
                  >
                    {cateItem.grouponCateName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Animated.View>
    );
  }

  // /**
  //  * 拼团分类初始化时距离屏幕的绝对位置y
  //  * @private
  //  */
  // _setTabOffsetTop = () => {
  //   if (!this.props.main._onScroll && this._fixView) {
  //     const handle = findNodeHandle(this._fixView);
  //     console.log('handle============:', handle);
  //     if (handle) {
  //       UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
  //         console.log('相对父视图位置x:', x);
  //         console.log('相对父视图位置y:', y);
  //         console.log('组件宽度width:', width);
  //         console.log('组件高度height:', height);
  //         console.log('距离屏幕的绝对位置x:', pageX);
  //         console.log('距离屏幕的绝对位置y:', pageY);

  //         this.props.actions.action.setTabOffsetTop(pageY);
  //       });
  //     }
  //   }
  // }

  /**
   * 拼团分类选中左右滚动事件
   */
  scrollViewTo = () => {
    let {
      main: { grouponCates, chooseCateIndex }
    } = this.props;

    let allLeft = 0;
    grouponCates.map((cateItem, index) => {
      UIManager.measure(
        findNodeHandle(this._cateRefs[cateItem.grouponCateId]),
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
  title: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: isAndroid ? 48 : 48,
    /*..._.ifIphoneX(
      {
        paddingTop: 80
      },
      {
        height: isAndroid ? 50 : 48
      }
    )*/
  },
  titleImg: {
    width: 16,
    height: 15,
    marginRight: 8
  },
  titleTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)'
  },
  cateTab: {
    marginBottom: 12,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12
  },
  layoutContent: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tabItem: {
    height: 39,
    borderBottomColor: 'transparent',
    borderBottomWidth: 1,
    justifyContent: 'center',
    marginRight: 30
  },
  tabText: {
    fontSize: 12,
    color: '#rgba(0,0,0,0.8)'
  }
});
