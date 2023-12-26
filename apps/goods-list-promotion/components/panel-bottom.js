import React, { Component } from 'react';
import { Relax, msg } from 'plume2';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform
} from 'react-native';

import { noop } from 'wmkit/noop';
import WMImage from 'wmkit/image/index';


import * as _ from 'wmkit/common/util'; // added by scx
import { screenWidth, screenHeight, priceColor } from 'wmkit/styles/index';
import * as WMkit from 'wmkit/kit';

const isAndroid = Platform.OS === 'android';

// 定义是否有底部确定按钮，这边牵扯到底部商品的滚动距离
const hasBottom = false;

/**
 * 通用促销底部弹出
 */
@Relax
export default class PanelBottom extends Component {
  static relaxProps = {
    giftShow: 'giftShow',
    marketing: 'marketing',
    gift: 'gift',

    changeGiftShow: noop
  };

  render() {
    const { giftShow, changeGiftShow, marketing, gift } = this.props.relaxProps;
    const { fullGiftLevelList } = marketing;
    const { goodsInfos } = gift;

    return (
      giftShow && (
        <View style={styles.panelBottom}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.mask}
            onPress={() => changeGiftShow()}
          />
          <View style={styles.panelBody}>
            <View style={styles.panelTitle}>
              <Text style={styles.title} allowFontSacling={false}>
                赠品
              </Text>
              <TouchableOpacity
                style={styles.touchClose}
                activeOpacity={0.8}
                onPress={() => changeGiftShow()}
              >
                <Image
                  source={require('../img/close.png')}
                  style={styles.close}
                />
              </TouchableOpacity>
            </View>
            <ScrollView
              alwaysBounceHorizontal={false}
              contentContainerStyle={styles.panelContent}
            >
              {fullGiftLevelList &&
                fullGiftLevelList.length > 0 &&
                fullGiftLevelList.map(level => {
                  let rule =
                    marketing.subType === 4
                      ? level.fullAmount
                      : level.fullCount + '件';
                  return (
                    <View key={level.giftLevelId} style={styles.giftItems}>
                      <Text
                        allowFontScaling={false}
                        style={styles.giftTitle}
                        numberOfLines={1}
                      >
                        满{rule}可获以下赠品， 可选{level.giftType === 0
                          ? '全部'
                          : '一种'}
                      </Text>
                      {(goodsInfos || []).map((v, k) => {
                        const detail = level.fullGiftDetailList.find(
                          f => f.productId == v.goodsInfoId
                        );
                        const stock = v.stock;
                        // 库存等于0或者起订量大于剩余库存
                        return (
                          detail && (
                            <TouchableOpacity
                              activeOpacity={0.8}
                              key={k}
                              style={styles.goodsList}
                              // onPress={() =>
                              //   v.goodsStatus != 2
                              //     ? msg.emit('router: goToNext', {
                              //         routeName: 'GoodsDetail',
                              //         skuId: v.goodsInfoId
                              //       })
                              //     : null
                              // }
                            >
                              <WMImage
                                style={styles.giftImg}
                                src={v.goodsInfoImg&&`${v.goodsInfoImg}?x-oss-process=image/format,jpg/interlace,1,image/resize,m_mfit,w_100,h_100`}
                              />
                              {WMkit.isInvalid(v) && <View style={styles.notGoods}>
                                <View style={styles.whiteBox}>
                                  <Text style={styles.notGoodsText} allowFontScaling={false}>
                                    等货中
                                  </Text>
                                </View>
                              </View>}
                              <View style={styles.goodsDetail}>
                                <Text
                                  style={styles.goodsTitle}
                                  allowFontScaling={false}
                                  numberOfLines={1}
                                >
                                  {v.goodsInfoName}
                                </Text>
                                <Text
                                  style={styles.goodsGec}
                                  allowFontScaling={false}
                                  numberOfLines={1}
                                >
                                  {v.goodsSubtitle || ''}
                                </Text>
                                <View style={styles.goodsBottom}>
                                  <View style={styles.tagCon}>
                                    <Text
                                      style={[styles.goodsPrice, { color: priceColor }]}
                                      allowFontScaling={false}
                                    >
                                      &yen;{v.marketPrice}
                                    </Text>
                                    {v.goodsStatus == '2' && (
                                      <View style={styles.lack}>
                                        <Text
                                          allowFontScaling={false}
                                          style={styles.lackText}
                                        >
                                          失效
                                        </Text>
                                      </View>
                                    )}
                                    {/* {WMkit.isInvalid(v) && (
                                      <View style={styles.lack}>
                                        <Text
                                          allowFontScaling={false}
                                          style={styles.lackText}
                                        >
                                          等货中
                                        </Text>
                                      </View>
                                    )} */}
                                  </View>
                                  <Text
                                    style={styles.goodsNum}
                                    allowFontScaling={false}
                                  >
                                    ×{detail && detail.productNum}{v.goodsUnit}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          )
                        );
                      })}
                    </View>
                  );
                })}
            </ScrollView>
          </View>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  panelBottom: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    zIndex: 1000
  },
  mask: {
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
    height: screenHeight
  },
  panelBody: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: screenWidth,
    maxHeight: screenHeight * 0.8,
    backgroundColor: '#fff'
  },
  panelTitle: {
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb'
  },
  title: {
    textAlign: 'center',
    fontSize: 16
  },
  touchClose: {
    position: 'absolute',
    top: 15,
    right: 15
  },
  close: {
    width: 16,
    height: 16
  },
  panelInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb',
    backgroundColor: '#fafafa',
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  infoText: {
    fontSize: 12,
    color: '#999'
  },
  tips: {
    width: 18,
    height: 18,
    marginRight: 10
  },
  panelPromotion: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb'
  },
  checkStyle: {
    marginRight: 5
  },
  proText: {
    color: '#999',
    fontSize: 14,
    marginRight: 5,
    flex: 1
  },
  icon: {
    width: 7,
    height: 13
  },
  panelContent: {
    ..._.ifIphoneX(
      {
        paddingBottom: hasBottom ? 75 : 30
      },
      {
        paddingBottom: isAndroid ? (hasBottom ? 70 : 25) : hasBottom ? 45 : 0
      }
    )
  },
  giftItems: {
    flexDirection: 'column',
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb'
  },
  giftTitle: {
    fontSize: 12,
    color: '#666'
  },
  goodsList: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 8
  },
  giftImg: {
    width: 55,
    height: 55
  },
  goodsDetail: {
    marginLeft: 10,
    justifyContent: 'flex-start',
    flex: 1
  },
  goodsTitle: {
    fontSize: 14,
    color: '#333'
  },
  goodsGec: {
    fontSize: 12,
    color: '#999',
    marginTop: 3
  },
  goodsBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  goodsPrice: {
    fontSize: 15,
    marginRight: 5
  },
  goodsNum: {
    fontSize: 14,
    color: '#999'
  },
  tagCon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    marginTop: 2
  },
  lack: {
    width: 35,
    height: 15,
    backgroundColor: '#cccccc',
    borderRadius: 7.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lackText: {
    fontSize: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  panelFoot: {
    position: 'absolute',
    ..._.ifIphoneX(
      {
        bottom: 30
      },
      {
        bottom: isAndroid ? 22.5 : 0
      }
    ),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ebebeb',
    left: 0,
    height: 45,
    width: screenWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  hasCol: {
    color: '#999',
    fontSize: 14,
    marginLeft: 8
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cb4255'
  },
  buttonText: {
    color: '#fff'
  },
  notGoods: {
    position: 'absolute',
    width: 55,
    height: 55,
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 6
  },
  whiteBox: {
    width: 50,
    height: 50,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notGoodsText: {
    fontSize: 12,
    color: '#fff'
  },
});
