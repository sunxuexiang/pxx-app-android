import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PixelRatio
} from 'react-native';
import { fromJS } from 'immutable';
import { Relax, msg } from 'plume2';
import { mainColor, screenWidth, panelColor } from 'wmkit/styles/index';

import { noop } from 'wmkit/noop';
import { Const } from 'wmkit/const';
import * as _ from 'wmkit/common/util';
const marketingType = ['满减', '买折', '买赠', '秒杀'];

@Relax
export default class HeadPromotion extends React.Component {
  static relaxProps = {
    showModal: noop,
    selectedMarketingGifts: 'selectedMarketingGifts',
    chooseGift: noop,
    edit: 'edit',
    goodsMarketings: 'goodsMarketings',
    checkItemList: 'checkItemList'
  };

  render() {
    let marketings = this.props.marketings;
    const {
      showModal,
      edit,
      selectedMarketingGifts,
      goodsMarketings,
      checkItemList
    } = this.props.relaxProps;
    const checkSkus =
      checkItemList && checkItemList.size > 0
        ? checkItemList.filter((sku) => sku.get('checked'))
        : fromJS([]);
    const checkSkuIds = checkSkus.map((sku) => sku?.get('goodsInfoId'));
    return (
      <View style={styles.container}>
        {checkSkuIds && marketings.map((marketing, index) => {
          // 商品正在参与的营销列表
          const goodsActMarketings =
            goodsMarketings &&
            goodsMarketings.filter((item) =>
              checkSkuIds?.toJS().includes(item.get('goodsInfoId'))
            );
          // 当前营销是否属于正在参与活动的营销
          let checked =
            goodsActMarketings &&
            goodsActMarketings.some(
              (goodsMarketingRele) =>
                goodsMarketingRele.get('marketingId') ===
                marketing.get('marketingId')
            );
          if (!checked) {
            return;
          }
          let isFullGift = marketing.get('marketingType') === 2;
          let isFullReduction = marketing.get('marketingType') === 0;
          let isFullDiscount = marketing.get('marketingType') === 1;
          let buyoutPrice = marketing.get('marketingType') === 3;
          let secondPrice = marketing.get('marketingType') === 4;

          let tag = marketingType[marketing.get('marketingType')];
          let title = '';
          let buttonTitle = '';
          let rule = '';
          if (isFullGift) {
            rule =
              marketing.get('subType') === 4
                ? marketing.getIn(['fullGiftLevel', 'fullAmount'])
                : marketing.getIn(['fullGiftLevel', 'fullCount']) + '件';

            title =
              marketing.get('lack') > 0
                ? `满${rule}${
                    marketing.get('subType') === 4 ? '元' : '件'
                  }送赠品，还差${marketing.get('lack')}${
                    marketing.get('subType') === 4 ? '元' : '件'
                  }`
                : `您已满足买${rule}送赠品`;

            buttonTitle = marketing.get('lack') > 0 ? '查看赠品' : '领取赠品';
          } else if (isFullReduction) {
            // 满减
            rule =
              marketing.get('subType') === 0
                ? marketing.getIn(['fullReductionLevel', 'fullAmount']) + '元'
                : marketing.getIn(['fullReductionLevel', 'fullCount']) + '件';
            let reduction = marketing.getIn([
              'fullReductionLevel',
              'reduction'
            ]);

            title =
              marketing.get('lack') > 0
                ? `满${rule}减${reduction}元，还差${marketing.get('lack')}${
                    marketing.get('subType') === 0 ? '元' : '件'
                  }`
                : `您已满足满${rule}减${reduction}元`;

            if (
              marketing.get('subType') === 1 &&
              marketing.getIn(['fullReductionLevel', 'fullCount']) === 1
            ) {
              title = `您已满足立减${reduction}元`;
              tag = '立减';
            }
          } else if (isFullDiscount) {
            rule =
              marketing.get('subType') === 2
                ? marketing.getIn(['fullDiscountLevel', 'fullAmount'])
                : marketing.getIn(['fullDiscountLevel', 'fullCount']) + '件';
            let discount = _.mul(
              marketing.getIn(['fullDiscountLevel', 'discount']),
              10
            );

            title =
              marketing.get('lack') > 0
                ? `立享${discount}折，还差${marketing.get('lack')}${
                    marketing.get('subType') === 2 ? '元' : '件'
                  }`
                : `您已满足立享${discount}折`;
          } else if (buyoutPrice) {
            rule =
              marketing.get('subType') === 6
                ? marketing.getIn(['buyoutPriceLevel', 'choiceCount'])
                : marketing.getIn(['buyoutPriceLevel', 'fullAmount']) + '件';
            let discount = marketing.getIn(['buyoutPriceLevel', 'fullAmount']);

            title =
              marketing.get('lack') > 0
                ? `${rule}件${discount}元，还差${marketing.get('lack')}${
                    marketing.get('subType') === 6 ? '件' : '元'
                  }`
                : `您已满足${rule}件${discount}元`;
          } else if (secondPrice) {
            rule =
              marketing.get('subType') === 7
                ? marketing.getIn(['halfPriceSecondPieceLevel', 'number'])
                : marketing.getIn(['halfPriceSecondPieceLevel', 'discount']) +
                  '件';
            let totalAmount = marketing.getIn([
              'halfPriceSecondPieceLevel',
              'discount'
            ]);
            if (totalAmount === 0) {
              title =
                marketing.get('lack') > 0
                  ? `买${rule - 1}送1，还差${marketing.get('lack')}${
                      marketing.get('subType') === 7 ? '件' : '元'
                    }`
                  : `您已满足买${rule - 1}送1`;
            } else {
              title =
                marketing.get('lack') > 0
                  ? `第${rule}件${totalAmount}折，还差${marketing.get('lack')}${
                      marketing.get('subType') === 7 ? '件' : '元'
                    }`
                  : `您已满足第${rule}件${totalAmount}折`;
            }
          }

          let showButton = !edit && isFullGift;
          let tags = title.split('，');

          return (
            <View style={styles.cartPromotion} key={index}>
              <View style={styles.promotionInfo}>
                <View style={[styles.tag, { borderColor: mainColor }]}>
                  <Text
                    style={[styles.tagText, { color: mainColor }]}
                    allowFontSacling={false}
                  >
                    {marketing.get('marketingType') == 3 ? (
                      <Text style={{ fontSize: 10 }} allowFontSacling={false}>
                        {tags[0].substring(tags[0].indexOf('足') + 1)}
                      </Text>
                    ) : marketing.get('marketingType') == 4 ? (
                      <Text style={{ fontSize: 10 }} allowFontSacling={false}>
                        {tags[0].substring(tags[0].indexOf('第'))}
                      </Text>
                    ) : (
                      <Text style={{ fontSize: 10 }} allowFontSacling={false}>
                        {tag}
                      </Text>
                    )}
                  </Text>
                </View>
                <View style={styles.giftInfo}>
                  {isFullReduction || isFullDiscount || isFullGift ? (
                    <Text style={styles.infoText} allowFontSacling={false}>
                      {title}
                    </Text>
                  ) : (
                    <Text style={styles.infoText} allowFontSacling={false}>
                      {title.split('，')[1]}
                    </Text>
                  )}

                  {marketing.get('marketingType') == 3 &&
                    tags[0].indexOf('足') > -1 && (
                      <Text style={styles.infoText} allowFontSacling={false}>
                        {'您已满足满' + rule + '件'}
                      </Text>
                    )}

                  {showButton ? (
                    <TouchableOpacity
                      style={[
                        styles.btnRound,
                        { backgroundColor: panelColor, borderColor: mainColor }
                      ]}
                      activeOpacity={0.8}
                      onPress={() => {
                        let type =
                          marketing.get('lack') > 0 ? 'showGift' : 'chooseGift';
                        let param = {
                          type: type,
                          marketing: marketing,
                          selectedMarketingGifts: selectedMarketingGifts,
                          hasBottom: marketing.get('lack') <= 0
                        };

                        showModal(param);
                      }}
                    >
                      <Text
                        style={[styles.btnText, { color: mainColor }]}
                        allowFontSacling={false}
                      >
                        {buttonTitle}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
              {!edit && marketing.get('lack') > 0 ? (
                <TouchableOpacity
                  style={styles.getSingle}
                  activeOpacity={0.8}
                  onPress={() => {
                    msg.emit('router: goToNext', {
                      routeName: 'GoodsListPromotion',
                      mid: marketing.get('marketingId'),
                      stype: marketing.get('subType')
                    });
                  }}
                >
                  <Text
                    style={[styles.blueText, { color: mainColor }]}
                    allowFontScaling={false}
                  >
                    去凑单
                  </Text>
                  <Image
                    style={[styles.arrow, { tintColor: mainColor }]}
                    source={require('wmkit/theme/r-arrow.png')}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  cartPromotion: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center'
  },
  promotionInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  giftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8
  },
  infoText: {
    color: '#333',
    fontSize: 10,
    maxWidth: screenWidth - 170
  },
  getSingle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tag: {
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    marginRight: 8,
    marginLeft: 32,
    borderWidth: 1,
    borderRadius: 2
  },
  tagText: {
    fontSize: 10,
    fontWeight: '500'
  },
  btnRound: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 16,
    borderRadius: 8,
    paddingLeft: 6,
    paddingRight: 6,
    marginLeft: 8
  },
  btnText: {
    fontSize: 10
  },
  blueText: {
    fontSize: 10,
    fontWeight: 'bold'
  },
  arrow: {
    width: 12,
    height: 12
  }
});
