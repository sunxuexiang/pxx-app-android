import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Animated
} from 'react-native';
import { Relax, msg } from 'plume2';
import { noop } from 'wmkit/noop';
import * as _ from '../../../wmkit/common/util'; // added by scx
import GoodsShareButton from './goods-share-button';

import { screenWidth, mainColor, isAndroid } from 'wmkit/styles/index';

import GoodsNav from './goods-nav';
import moment from 'moment';

@Relax
export default class DetailNav extends React.Component {
  _scroll;
  static defaultProps = {
    stickyImgY: -1,
    stickyScrollY: new Animated.Value(0)
  };

  static relaxProps = {
    showVideo: 'showVideo',
    isDistributor: 'isDistributor',
    goodsInfo: 'goodsInfo',
    pointsGoodsId: 'pointsGoodsId',
    menuList: 'menuList',
    changeShareModal: noop,
    appointmentSaleVO: 'appointmentSaleVO'
  };

  constructor(props) {
    super(props);
    this.state = {
      stickyLayoutY: 1,
      tab: 0
    };
  }
  _onLayout = (event) => {
    this.setState({
      stickyLayoutY: event.nativeEvent.layout.y
    });
  };

  componentDidUpdate() {}

  componentDidMount() {}

  /**

   */
  render() {
    const {
      stickyScrollY,
      stickyInfoY,
      stickyevaluationY,
      scrollTo
    } = this.props;
    const headerHeight = _.isIphoneX() ? 74 : isAndroid ? 56 : 66;
    const y = screenWidth - headerHeight - 20;
    const infoY = stickyInfoY > 5 ? y + stickyInfoY : y + 5;
    const evaluationY =
      stickyevaluationY > 5 ? infoY + stickyevaluationY : infoY + 5;
    const translateX = stickyScrollY.interpolate({
      inputRange: [
        -1,
        infoY - 5,
        infoY,
        evaluationY - 5,
        evaluationY,
        9999999999999
      ],
      outputRange: [0, 0, 49, 49, 98, 98]
    });
    const opacity1 = stickyScrollY.interpolate({
      inputRange: [-1, infoY - 5, infoY],
      outputRange: [0, 0, 1]
    });
    const opacityActive1 = stickyScrollY.interpolate({
      inputRange: [-1, infoY - 5, infoY],
      outputRange: [1, 1, 0]
    });

    const opacity2 = stickyScrollY.interpolate({
      inputRange: [-1, infoY - 5, infoY, evaluationY - 5, evaluationY],
      outputRange: [1, 1, 0, 0, 1]
    });
    const opacityActive2 = stickyScrollY.interpolate({
      inputRange: [-1, infoY - 5, infoY, evaluationY - 5, evaluationY],
      outputRange: [0, 0, 1, 1, 0]
    });

    const opacity3 = stickyScrollY.interpolate({
      inputRange: [-1, evaluationY - 5, evaluationY],
      outputRange: [1, 1, 0]
    });
    const opacityActive3 = stickyScrollY.interpolate({
      inputRange: [-1, evaluationY - 5, evaluationY],
      outputRange: [0, 0, 1]
    });

    const opacity = stickyScrollY.interpolate({
      inputRange: [-1, 0, 50, y - 20],
      outputRange: [0, 0, 0, 1]
    });

    const {
      isDistributor,
      goodsInfo,
      menuList,
    } = this.props.relaxProps;

    const buyPoint = goodsInfo.get('buyPoint');
    let social = goodsInfo.get('distributionGoodsAudit') == '2';

    return (
      <Animated.View style={[styles.detailNav, { opacity: opacity }]}>
        <View style={styles.animateView}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => msg.emit('router: back')}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require('../img/back.png')}
            />
          </TouchableOpacity>
          <View style={[styles.cateTab]}>
            <TouchableOpacity
              key={0}
              activeOpacity={0.8}
              onPress={() => {
                scrollTo(0);
              }}
              style={styles.tabItem}
            >
              <Animated.Text
                allowFontScaling={false}
                style={[styles.tabText, { opacity: opacity1 }]}
              >
                商品
              </Animated.Text>
              <Animated.Text
                allowFontScaling={false}
                style={[styles.activeTabText, { opacity: opacityActive1, color: mainColor }]}
              >
                商品
              </Animated.Text>
              <Animated.View
                style={[
                  styles.bottomLine,
                  { backgroundColor: mainColor },
                  { transform: [{ translateX: translateX }] }
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              key={1}
              activeOpacity={0.8}
              onPress={() => {
                // scrollTo(infoY);
              }}
              style={styles.tabItem}
            >
              <Animated.Text
                allowFontScaling={false}
                style={[styles.tabText, { opacity: opacity2 , color:'transparent'}]}
              >
                评价
              </Animated.Text>
              <Animated.Text
                allowFontScaling={false}
                style={[styles.activeTabText, { opacity: opacityActive2, color:'transparent' }]}
              >
                评价
              </Animated.Text>
            </TouchableOpacity>
            <TouchableOpacity
              key={2}
              activeOpacity={0.8}
              onPress={() => {
                scrollTo(evaluationY);
              }}
              style={styles.tabItem}
            >
              <Animated.Text
                allowFontScaling={false}
                style={[styles.tabText, { opacity: opacity3 }]}
              >
                详情
              </Animated.Text>
              <Animated.Text
                allowFontScaling={false}
                style={[styles.activeTabText, { opacity: opacityActive3, color: mainColor }]}
              >
                详情
              </Animated.Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rightNav}>
            {!social || (buyPoint && social) || (!isDistributor && social) ? (
              <View style={styles.rowFlex}>
                <GoodsShareButton type={'actived'} />
              </View>
            ) : null}
            {/*{menuList.length > 0 && <GoodsNav type={'actived'} />}*/}
          </View>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  detailNav: {
    width: screenWidth,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    ..._.ifIphoneX(
      {
        paddingTop: 30,
        height: 74
      },
      {
        height: isAndroid ? 56 : 66,
        paddingTop: isAndroid ? 5 : 20
      }
    )
  },
  rightNav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowFlex: {

  },
  animateView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44
  },
  titleImg: {
    width: 16,
    height: 16,
    marginRight: 8
  },
  titleTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)'
  },
  cateTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  tabItem: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12
  },
  bottomLine: {
    position: 'absolute',
    bottom: 2,
    height: 2,
    borderRadius: 1,
    width: 24,
    backgroundColor: 'transparent',
    zIndex: 200
  },
  tabText: {
    fontSize: 12,
    color: '#333'
  },
  activeTabText: {
    position: 'absolute',
    fontSize: 12,
    zIndex: 100
  }
});
