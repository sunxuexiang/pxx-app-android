import React, { Component } from 'react';
import { Relax, msg } from 'plume2';
import { Map, List, fromJS } from 'immutable';
import produce from 'immer';
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

import Check from 'wmkit/check';
import { noop } from 'wmkit/noop';
import { Const } from 'wmkit/const';
import GiftItemList from './gift-item-list';

import * as _ from '../../../wmkit/common/util'; // added by scx
import { screenWidth, screenHeight, mainColor } from 'wmkit/styles/index';

const isAndroid = Platform.OS === 'android';

// 定义是否有底部确定按钮，这边牵扯到底部商品的滚动距离
let hasBottom = false;

/**
 * 通用促销底部弹出
 */
@Relax
export default class PanelBottom extends Component {
  static relaxProps = {
    closeModal: noop,
    popoverParam: 'popoverParam',
    chooseGift: noop,
    chooseSkuMarketing: noop,
    skuMarketingDict: 'skuMarketingDict',
    selectedMarketingGifts: 'selectedMarketingGifts',
    giftList: 'giftList',
    goodsMarketings: 'goodsMarketings'
  };

  constructor(props) {
    super(props);

    const popoverParam = this.props.relaxProps.popoverParam;

    const selectedMarketingGifts =
      popoverParam.get('selectedMarketingGifts') || List();

    this.state = {
      selectedMarketingGifts: selectedMarketingGifts
    };
  }

  componentDidMount(){
    const {selectedMarketingGifts} = this.props.relaxProps;
    this.setState({
      selectedMarketingGifts: selectedMarketingGifts
    });
  }

  render() {
    const {
      closeModal,
      popoverParam,
      chooseSkuMarketing,
      skuMarketingDict,
      selectedMarketingGifts,
      giftList,
      goodsMarketings
    } = this.props.relaxProps;

    hasBottom = popoverParam.get('hasBottom');
    const goodsInfoId = popoverParam.get('goodsInfoId');
    const skuMarketings = skuMarketingDict && skuMarketingDict.filter((dicItem) => dicItem.get('goodsInfoIdList').indexOf(goodsInfoId) > -1) || List();
    let marketing = popoverParam.get('marketing') || Map();
    const maxValidLevel = marketing.get('fullGiftLevel') || Map();
    let title = '';

    let operateType = popoverParam.get('type');

    if (operateType === 'showGift') {
      title = '查看赠品';
    } else if (operateType === 'chooseGift') {
      title = '领取赠品';
    }
    if (operateType === 'chooseGoodsMarketing') {
      title = '修改促销';
    }
    const hasFullGift = marketing.get('fullGiftLevelList');
    const count = this.state.selectedMarketingGifts
      .filter(
        (gift) => gift.get('marketingId') === marketing.get('marketingId')
      )
      .count();
    const activityList = giftList ? giftList.filter((activityItem) => activityItem.get('marketingId') == marketing.get('marketingId')).toJS() : [];
    const activityItem = activityList && activityList.length > 0 && activityList[0];
    const subType = activityItem.subType;
    const compareNum = activityItem.subType === 4 ? activityItem.totalAmount : activityItem.totalCount;
    const fullGiftLevelList = activityItem.fullGiftLevelList;
    const storeId = activityItem.storeId;

    return (
      <View style={styles.panelBottom}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.mask}
          onPress={() => closeModal()}
        />
        <View style={styles.panelBody}>
          <View style={styles.panelTitle}>
            <Text style={styles.title} allowFontSacling={false}>
              {title}
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
          {operateType === 'chooseGoodsMarketing' && (
            <View style={styles.panelInfo}>
              <View>
                <Text
                  allowFontSacling={false}
                  style={styles.infoText}
                  numberOfLines={1}
                >
                  满减/买折/买赠仅可任选其一
                </Text>
              </View>
              {
                skuMarketings
                .map((skuMarketing, index) => {
                  let marketingId = skuMarketing.get('marketingId');
                  let marketingType = skuMarketing.get('marketingType');
                  let checked = goodsMarketings.toJS().some((goodsMarketingRele) => {
                    return (
                      goodsMarketingRele.goodsInfoId == goodsInfoId &&
                      goodsMarketingRele.marketingId === marketingId
                    );
                  });
                  let typeTag = Const.marketingType[marketingType];
                  typeTag = typeTag ==='满减'&&skuMarketing.get('alllevelDesc').includes('满1件')?'立减':typeTag
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.panelPromotion}
                      key={index}
                    >
                      <Check
                        style={styles.checkStyle}
                        checked={checked}
                        onCheck={() => {
                          chooseSkuMarketing(goodsInfoId, marketingId);
                        }}
                      />
                      <View style={[styles.tag, { borderColor: mainColor }]}>
                        {skuMarketing.get('marketingType') == 3 ? (
                          <Text allowFontSacling={false} style={[styles.tagText, { color: mainColor }]}>
                            {skuMarketing.get('alllevelDesc').split('，')[0]}
                          </Text>
                        ) : skuMarketing.get('marketingType') == 4 ? (
                          <Text allowFontSacling={false} style={[styles.tagText, { color: mainColor }]}>
                            {skuMarketing.get('alllevelDesc')}
                          </Text>
                        ) : (
                          <Text allowFontSacling={false} style={[styles.tagText, { color: mainColor }]}>
                            {typeTag}
                          </Text>
                        )}
                      </View>
                      <Text
                        allowFontScaling={false}
                        style={styles.proText}
                        numberOfLines={1}
                      >
                        {typeTag ==='立减'?skuMarketing.get('alllevelDesc').replace('满1件','立'):skuMarketing.get('alllevelDesc')}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              }
            </View>
          )}
          <ScrollView
            alwaysBounceHorizontal={false}
            contentContainerStyle={{
              paddingHorizontal: 12,
              ..._.ifIphoneX(
                {
                  paddingBottom: hasBottom ? 75 : 30
                },
                {
                  paddingBottom: isAndroid
                    ? hasBottom
                      ? 70
                      : 25
                    : hasBottom
                      ? 45
                      : 0
                }
              )
            }}
          >
            {hasFullGift &&
              fullGiftLevelList.map((level, index) => {
                const rule = subType === 4 ? level.fullAmount : level.fullCount;
                const disabled =
                  subType === 4 ? level.fullAmount > activityItem.totalAmount : level.fullCount > activityItem.totalCount;
                let giftList = [];
                level.fullGiftDetailList.map(item => {
                  let giftInfo = item.giftGoodsInfoVO;
                  giftInfo.goodsNum = item.productNum;
                  giftInfo.giftLevelId = item.giftLevelId;
                  giftInfo.marketingId = item.marketingId;
                  giftInfo.giftDetailId = item.giftDetailId;
                  giftInfo.checked = false;
                  if(disabled) {
                    giftInfo.disabled = disabled;
                  } else {
                    giftInfo.disabled = giftInfo.goodsStatus && giftInfo.goodsStatus > 0;
                  }
                  if(!giftInfo.disabled) {
                    const checkedIndex = selectedMarketingGifts.findIndex(
                      (selectedItem) => selectedItem.get('giftDetailId') == item.giftDetailId,
                    );
                    giftInfo.checked = checkedIndex > -1;
                  }
                  giftList.push(giftInfo);
                })
                  return (
                    <View style={styles.giftItems} key={index}>
                      <Text
                        allowFontScaling={false}
                        style={styles.giftTitle}
                        numberOfLines={1}
                      >
                        满{rule}{subType === 4 ? '元' : '件'}
                        可获以下赠品，可选
                        {level.giftType === 0 ? '全部' : '一种'}
                      </Text>
                      <GiftItemList
                        list={giftList}
                        allowCheck={true}
                        onCheck={(sku) => this.onCheck(storeId, sku, level, rule <= compareNum)}
                      />
                    </View>
                  );
                })}
          </ScrollView>

          {hasBottom && (
            <View style={styles.panelFoot}>
              <Text style={styles.hasCol} allowFontScaling={false}>
                已领
                <Text style={[styles.hasCol, {color: mainColor}]} allowFontScaling={false}>
                {count}
              </Text>种
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.button, { backgroundColor: mainColor }]}
                onPress={() => {
                  closeModal();
                }}
              >
                <Text style={styles.buttonText} allowFontScaling={false}>
                  确定
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }

  onCheck = (storeId, sku, level, ruleFlag) => {
    const {
      chooseGift,
    } = this.props.relaxProps;
    if (sku.goodsStatus === 0) {
      const {marketingId, giftLevelId, giftType} = level;
      const {selectedMarketingGifts} = this.state;
      const selectedMarketingGiftsState = this._chooseGift(
        marketingId,
        giftLevelId,
        giftType,
        storeId,
        selectedMarketingGifts.toJS(),
        ruleFlag,
        sku,
      );
      this.setState({
        selectedMarketingGifts: fromJS(selectedMarketingGiftsState)
      });
      chooseGift(fromJS(selectedMarketingGiftsState));
    }
  }

  /**
   * 领取赠品
   */
  _chooseGift = (
    marketingId,
    giftLevelId,
    giftType,
    storeId,
    selectedMarketingGifts,
    ruleFlag,
    goodsInfo,
  ) => {
    const {goodsInfoId, giftDetailId, goodsNum, goodsInfoName, goodsInfoImg} = goodsInfo;
    const selectedGift = selectedMarketingGifts.filter((gift) => gift.marketingId === marketingId)[0];
    if (!ruleFlag && this.props.maskType != 0) {
      msg.emit('app:tip', '不满足此档活动哦');
      return selectedMarketingGifts;
    }
    // 选取赠品，且为不同等级
    if (selectedGift && selectedGift.giftLevelId !== giftLevelId) {
      // 赠一个，且已选了一个
      msg.emit('app:tip', '只可参加1个买赠活动哦');
      return selectedMarketingGifts;
    } else {
      let selectedMarketingGift = {
        marketingId: marketingId,
        giftDetailId: giftDetailId,
        giftLevelId: giftLevelId,
        goodsInfoId: goodsInfoId,
        storeId: storeId,
        goodsNum: goodsNum,
        goodsInfoName: goodsInfoName,
        goodsInfoImg: goodsInfoImg,
      };
      let index = selectedMarketingGifts.findIndex((gift) => {
        return (
          gift.marketingId === selectedMarketingGift.marketingId &&
          gift.giftLevelId === selectedMarketingGift.giftLevelId &&
          gift.giftDetailId === selectedMarketingGift.giftDetailId &&
          gift.goodsInfoId === selectedMarketingGift.goodsInfoId
        );
      });
      return produce(selectedMarketingGifts, (list) => {
        // giftType: 0 赠全部 1 赠1件
        if (giftType == 1) {
          //已存在的同活动的商品下标
          let sameMarketingGoodsIndex = selectedMarketingGifts.findIndex((gift) => {
            return (
              gift.marketingId === selectedMarketingGift.marketingId &&
              gift.giftLevelId === selectedMarketingGift.giftLevelId
            );
          });
          //当前点击的商品已被选中-删除
          if (index > -1) {
            selectedMarketingGifts.splice(index, 1);
          } else if (sameMarketingGoodsIndex > -1) {
            //存在跟当前点击的商品相同活动且被选中的商品
            selectedMarketingGifts.splice(sameMarketingGoodsIndex, 1, selectedMarketingGift);
          } else {
            selectedMarketingGifts.push(selectedMarketingGift);
          }
        } else {
          index > -1 ? selectedMarketingGifts.splice(index, 1) : selectedMarketingGifts.push(selectedMarketingGift);
        }
      });
    }
  };
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
  panelPromotion: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 12
  },
  checkStyle: {
    marginRight: 10
  },
  proText: {
    color: '#333',
    fontSize: 12,
    marginRight: 5,
    flex: 1
  },
  icon: {
    width: 7,
    height: 13
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
    // ..._.ifIphoneX({
    //   paddingBottom: hasBottom ? 75 : 30
    // }, {
    //   paddingBottom: isAndroid
    //     ?
    //     hasBottom ? 70 : 25
    //     :
    //     hasBottom ? 45 : 0
    // })
  },
  giftItems: {
    flexDirection: 'column',
    padding: 10,
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 6
  },
  giftTitle: {
    fontSize: 13,
    color: '#333'
  },
  goodsList: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 8
  },
  giftImg: {
    width: 55,
    height: 55,
    marginLeft: 5
  },
  goodsDetail: {
    marginLeft: 10,
    justifyContent: 'flex-start',
    flex: 1
  },
  goodsTitle: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    paddingRight: 4
  },
  goodsGec: {
    fontSize: 12,
    color: '#333',
    marginTop: 3
  },
  goodsNum: {
    fontSize: 14,
    color: '#333'
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
    bottom:0,
    // ..._.ifIphoneX(
    //   {
    //     bottom: 30
    //   },
    //   {
    //     bottom: isAndroid ? 22.5 : 0
    //   }
    // ),
    left: 0,
    height: 45,
    width: screenWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#fff'
  },
  hasCol: {
    color: '#333',
    fontSize: 16
  },
  button: {
    height: 36,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 36
  },
  buttonText: {
    color: '#fff'
  }
});
