import React, { Component } from 'react';
import { Relax, msg } from 'plume2';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  PixelRatio
} from 'react-native';

import { noop } from 'wmkit/noop';
import MarketingLabel from 'wmkit/biz/marketing-label';
import WMImage from 'wmkit/image/index';

import * as _ from 'wmkit/common/util'; // added by scx
import { screenWidth, screenHeight, mainColor } from 'wmkit/styles/index';

import { marketAll, marketAllByOne } from '../kit';
import Price from 'wmkit/price';

const isAndroid = Platform.OS === 'android';

// 定义是否有底部确定按钮，这边牵扯到底部商品的滚动距离
const hasBottom = false;

/**
 * 通用促销底部弹出
 */
@Relax
export default class PanelBottom extends Component {
  static relaxProps = {
    show: 'show',
    showModal: noop,
    closeModal: noop,
    goodsInfo: 'goodsInfo',
    levelList: 'levelList',
    giftList: 'giftList',
    goodsInfos: 'goodsInfos',
    goods: 'goods'
  };

  render() {
    const {
      show,
      showModal,
      closeModal,
      goodsInfo,
      levelList,
      giftList,
      goodsInfos,
      goods
    } = this.props.relaxProps;
    //去重后的所有促销活动
    let marketingList = [];
    let isHaveGift = false;
    if (goodsInfo.size > 0 && goods.size > 0) {
      if (goods.get('saleType') == 1) {
        marketingList = goodsInfo.size == 0 ? [] : marketAllByOne(goodsInfo);
        if (marketingList.length > 0) {
          marketingList.forEach((label, _index) => {
            if (label.marketingType == 2) {
              isHaveGift = true;
            }
          });
        }
      } else if (goodsInfos.size > 0) {
        marketingList = marketAll(goodsInfos);
        isHaveGift = true;
      }
    }

    marketingList = marketingList.reverse();
    // 是否登录
    const loginFlag = window.token != undefined && window.token != '';

    return show ? (
      <View style={styles.panelBottom}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.mask}
          onPress={() => showModal()}
        />
        <View style={styles.panelBody}>
          <View style={styles.panelTitle}>
            <Text style={styles.title} allowFontSacling={false}>
              促销
            </Text>
            <TouchableOpacity
              style={styles.touchClose}
              activeOpacity={0.8}
              onPress={() => closeModal()}
            >
              <Image
                source={require('../img/close.png')}
                style={styles.close}
              />
            </TouchableOpacity>
          </View>

          {goodsInfo.size > 0 && goodsInfo.get('marketingLabels').size > 0 && (
            <View style={styles.panelInfo}>
              <Text
                allowFontSacling={false}
                style={styles.infoText}
                numberOfLines={1}
              >
                促销活动仅可任选其一，可在购物车修改
              </Text>
              {
                //展示所有促銷活動
                marketingList.length > 0 &&
                  marketingList.map((label, index) => {
                    console.log(label, 'label');
                    let type = label.marketingType;
                    return (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.panelPromotion}
                        key={index}
                        onPress={() => {
                          msg.emit('router: goToNext', {
                            routeName: 'GoodsListPromotion',
                            mid: label.marketingId,
                            stype: label.subType
                          });
                        }}
                      >
                        {<MarketingLabel
                          marketingLabels={[label]}
                          isFlashFlag={false}
                          isSocial={false}
                        />}
                        {/* <View style={[styles.tag, { borderColor: mainColor }]}>
                          {label.marketingType == 3 ? (
                            <Text
                              style={[styles.tagText, { color: mainColor }]}
                            >
                              {label.marketingDesc.split('，')[0]}
                            </Text>
                          ) : label.marketingType == 4 ? (
                            <Text
                              style={[styles.tagText, { color: mainColor }]}
                            >
                              {label.marketingDesc}
                            </Text>
                          ) : (
                            <Text
                              style={[styles.tagText, { color: mainColor }]}
                            >
                              {this.filterMarketingType(
                                _TYPE[label.marketingType].text,
                                label.marketingDesc
                              )}
                            </Text>
                          )}
                        </View> */}
                        <Text allowFontScaling={false} style={styles.proText}>
                          {label.marketingDesc}
                        </Text>
                        <Image
                          source={require('../img/arrow-right.png')}
                          style={styles.icon}
                        />
                      </TouchableOpacity>
                    );
                  })
              }
            </View>
          )}
          <ScrollView
            alwaysBounceHorizontal={false}
            contentContainerStyle={styles.panelContent}
            style={{ paddingTop: 12 }}
          >
            {isHaveGift &&
              giftList.size > 0 &&
              levelList.size > 0 &&
              levelList.toJS().map((level, index) => {
                //满金额赠还是满数量赠
                let countOrAmount = level.fullAmount
                  ? level.fullAmount + '元'
                  : level.fullCount + '件';
                //赠几件(0:全增,1:赠一种)
                let giftCount = level.giftType ? '1种' : '全部';
                return (
                  <View style={styles.giftItems} key={index}>
                    <Text
                      allowFontScaling={false}
                      style={styles.infoText}
                      numberOfLines={1}
                    >
                      满{countOrAmount}
                      可获以下赠品，可选
                      {giftCount}
                    </Text>
                    {level.fullGiftDetailList.map((full) => {
                      //赠品数量
                      let count = full.productNum;
                      return giftList
                        .toJS()
                        .filter((gift) => gift.goodsInfoId == full.productId)
                        .map((v, index) => {
                          return (
                            <TouchableOpacity
                              activeOpacity={0.8}
                              style={styles.goodsList}
                              key={index}
                              // onPress={() =>
                              //   v.goodsStatus != 2
                              //     ? msg.emit('router: goToNext', {
                              //         routeName: 'GoodsDetail',
                              //         skuId: v.goodsInfoId
                              //       })
                              //     : null
                              // }
                            >
                              <View style={styles.imgContent}>
                                <WMImage
                                  style={styles.giftImg}
                                  src={v.goodsInfoImg}
                                />
                                {v.goodsStatus == 1 && (
                                  <View style={styles.notGoods}>
                                    <View style={styles.whiteBox}>
                                      <Text
                                        style={styles.notGoodsText}
                                        allowFontScaling={false}
                                      >
                                        等货中
                                      </Text>
                                    </View>
                                  </View>
                                )}
                              </View>
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
                                  {v.specText}
                                </Text>
                                <View style={styles.goodsBottom}>
                                  <Price
                                    price={0}
                                    bigPriceStyle={{
                                      fontSize: 16,
                                      marginBottom: -2
                                    }}
                                  />
                                  <Text
                                    style={styles.goodsNum}
                                    allowFontScaling={false}
                                  >
                                    ×{count}
                                    {v.goodsUnit}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          );
                        });
                    })}
                  </View>
                );
              })}
          </ScrollView>
          {hasBottom && (
            <View style={styles.panelFoot}>
              <Text style={styles.hasCol} allowFontScaling={false}>
                已领1种
              </Text>
              <TouchableOpacity activeOpacity={0.8} style={styles.button}>
                <Text style={styles.buttonText} allowFontScaling={false}>
                  确定
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    ) : (
      <View />
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
  img: {
    width: 80,
    height: 80,
    borderColor: '#ebebeb'
    // borderWidth: 1 / PixelRatio.get()
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
  imgContent: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  panelBody: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: screenWidth,
    maxHeight: screenHeight * 0.75,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden'
  },
  panelTitle: {
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb',
    backgroundColor: '#fff'
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
    padding: 12,
    marginTop: 12,
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 6
  },
  infoText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600'
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
    marginTop: 12
  },
  checkStyle: {
    marginRight: 5
  },
  proText: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 12,
    marginRight: 5,
    flex: 1
  },
  icon: {
    width: 12,
    height: 12
  },
  notGoods: {
    position: 'absolute',
    width: 80,
    height: 80,
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 6
  },
  whiteBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notGoodsText: {
    fontSize: 14,
    color: '#fff'
  },

  tag: {
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    marginRight: 8,
    borderWidth: 1,
    borderRadius: 2
  },
  tagText: {
    fontSize: 10,
    fontWeight: '500'
  },
  panelContent: {
    paddingHorizontal: 12,
    ..._.ifIphoneX(
      {
        paddingBottom: hasBottom ? 90 : 46
      },
      {
        paddingBottom: isAndroid ? (hasBottom ? 70 : 25) : hasBottom ? 57 : 12
      }
    )
  },
  giftItems: {
    flexDirection: 'column',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: '#fff'
  },
  goodsList: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 8
  },
  giftImg: {
    width: 80,
    height: 80,
    borderRadius: 6
  },
  goodsDetail: {
    marginLeft: 10,
    justifyContent: 'flex-start',
    flex: 1
  },
  goodsTitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.8)'
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
  goodsNum: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.8)'
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
  }
});
