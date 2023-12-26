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

import WMImage from 'wmkit/image/index';
import { noop } from 'wmkit/noop';

import * as _ from '../../../wmkit/common/util'; // added by scx
import { screenWidth, screenHeight, priceColor, mainColor } from 'wmkit/styles/index';

import { marketAll, marketAllByOne } from '../kit';

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

          {goodsInfo.size > 0 &&
            goodsInfo.get('marketingLabels').size > 1 && (
              <View style={styles.panelInfo}>
                <Image
                  source={require('../img/warning.png')}
                  style={styles.tips}
                />
                <Text
                  allowFontSacling={false}
                  style={styles.infoText}
                  numberOfLines={1}
                >
                  立减/买折/买赠仅可任选其一，可在购物车修改
                </Text>
              </View>
            )}
          {//展示所有促銷活動
          marketingList.length > 0 &&
            marketingList.map((label, index) => {
              let type = label.marketingType;
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.panelPromotion}
                  key={index}
                  onPress={() => {
                    msg.emit('router: goToNext', {
                      routeName: 'GoodsListPromotion',
                      mid: label.marketingId
                    });
                  }}
                >
                  <View style={[styles.tag, { backgroundColor: mainColor }]}>
                    <Text allowFontSacling={false} style={styles.tagText}>
                      {_TYPE[type]['text']}
                    </Text>
                  </View>
                  <Text allowFontScaling={false} style={styles.proText}>
                    {label.marketingDesc}
                  </Text>
                  <Image
                    source={require('../img/arrow-right.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              );
            })}
          <ScrollView
            alwaysBounceHorizontal={false}
            contentContainerStyle={styles.panelContent}
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
                      style={styles.giftTitle}
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
                              onPress={() =>
                                v.goodsStatus != 2
                                  ? msg.emit('router: goToNext', {
                                      routeName: 'GoodsDetail',
                                      skuId: v.goodsInfoId
                                    })
                                  : null
                              }
                            >
                              <WMImage
                                style={styles.giftImg}
                                src={v.goodsInfoImg}
                              />
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
                                  <View style={styles.tagCon}>
                                    <Text
                                      style={[styles.goodsPrice, { color: priceColor}]}
                                      allowFontScaling={false}
                                    >
                                      &yen;
                                      {v.marketPrice}
                                    </Text>
                                    {v.goodsStatus != 0 && (
                                      <View style={styles.lack}>
                                        <Text
                                          allowFontScaling={false}
                                          style={styles.lackText}
                                        >
                                          {v.goodsStatus == 1 ? '缺货' : '失效'}
                                        </Text>
                                      </View>
                                    )}
                                  </View>
                                  <Text
                                    style={styles.goodsNum}
                                    allowFontScaling={false}
                                  >
                                    ×{count}件
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
    maxHeight: screenHeight * 0.75,
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
    height: 40
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
    paddingHorizontal: 10,
    height: 48,
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
  tag: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 15,
    width: 15,
    borderRadius: 7.5,
    marginRight: 5
  },
  tagRed: {
    backgroundColor: '#ff7e90'
  },
  tagOrange: {
    backgroundColor: '#ff985a'
  },
  tagText: {
    color: '#fff',
    fontSize: 9
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
  }
});

//促销类型样式
const _TYPE = {
  '0': { text: '减', color: [styles.tag, { backgroundColor: mainColor }] },
  '2': { text: '赠', color: [styles.tag, styles.tagRed] },
  '1': { text: '折', color: [styles.tag, styles.tagOrange] }
};
