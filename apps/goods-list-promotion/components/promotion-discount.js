import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Relax } from 'plume2';

import moment from 'moment';

import { Const } from 'wmkit/const';
import * as _ from 'wmkit/common/util';

//满减
import MJianIcon from 'wmkit/theme/mjian.png';
//满折
import MZheIcon from 'wmkit/theme/mzhe.png';
//满赠
import MZengIcon from 'wmkit/theme/mzeng.png';
import { mainColor, panelColor } from '@/wmkit/styles';

const _TYPE = {
  '0': { text: '满减', color: '' },
  '2': { text: '买赠', color: 'red' },
  '1': { text: '买折', color: 'orange' }
};
/**
 * 促销—满折活动
 */
@Relax
export default class PromotionDiscount extends React.Component {
  static relaxProps = {
    marketing: 'marketing',
    isOverlap: 'isOverlap'
  };

  render() {
    const { marketing, isOverlap } = this.props.relaxProps;
    const {
      beginTime,
      endTime,
      subType,
      fullReductionLevelList,
      marketingType,
      fullDiscountLevelList,
      buyoutPriceLevelList,
      halfPriceSecondPieceLevel
    } = marketing;
    let text = '';
    let icon = MZengIcon;
    if (marketingType == 0) {
      icon = MJianIcon;
      const fullDiscount=fullReductionLevelList.sort(compare('reduction'))

      if (subType == 0) {
        text = `满${fullDiscount[0].fullAmount}元减${fullDiscount[0].reduction}元`;
      } else if (subType == 1) {
        text = `满${fullDiscount[0].fullCount}件减${fullDiscount[0].reduction}元`;
        if(fullReductionLevelList.length===1&&fullDiscount[0].fullCount===1){
          text = `立减${fullDiscount[0].reduction}元`;
        }
      }
    } else if (marketingType == 1) {
      const fullDiscount=fullDiscountLevelList.sort(compare('discount'))
      icon = MZheIcon;
      if (subType == 2) {
        text = `立享${fullDiscount[0].discount * 10}折`
      } else if (subType == 3) {
        text = `立享${fullDiscount[0].discount * 10}折`
      }
    } else if (marketingType == 3) {
      if (subType == 6) {
        text = buyoutPriceLevelList
          .map((m) => `${m.choiceCount}件${m.fullAmount}元`)
          .toString();
      }
    } else if (marketingType == 4) {
      text = halfPriceSecondPieceLevel
      .map((m) => m.discount === 0 ? `买${m.number - 1}送1` : `第${m.number}件${m.discount}折`)
      .toString();
    }
   let marketingTypeText = _TYPE[marketingType] && _TYPE[marketingType].text
   if(marketingType == 0&&marketing.subType===1&&marketing.fullReductionLevelList.length===1&&marketing.fullReductionLevelList[0].fullCount===1){
    marketingTypeText= '立减'
   }
    
    return (
      <View style={[styles.promotionBg, { backgroundColor: panelColor }]}>
        {marketingType == 4
          ? beginTime &&
            endTime && (
              <View style={styles.info}>
                <Image source={MZheIcon} style={[styles.img, { tintColor: mainColor }]} />
                <View>
                  <Text allowFontSacling={false} style={styles.infoText}>
                    {moment(beginTime).format(Const.DATE_FORMAT)}～
                    {moment(endTime).format(Const.DATE_FORMAT)}
                    &nbsp;以下商品可参加多买多惠活动
                  </Text>
                  <Text allowFontSacling={false} style={styles.text}>
                    {text}
                  </Text>
                  {
                    isOverlap == 1 && marketingType != 1 && <View style={[styles.activeBlock, {borderColor: mainColor}]}>
                      <Text style={[styles.activeText, {color: mainColor}]}>叠加</Text>
                    </View>
                  }
                </View>
              </View>
            )
          : subType !== 6
            ? beginTime &&
              endTime && (
                <View style={styles.info}>
                  <Image source={icon} style={[styles.img, { tintColor: mainColor }]} />
                  <View>
                    <Text allowFontSacling={false} style={styles.infoText}>
                      {moment(beginTime).format(Const.DATE_FORMAT)}～
                      {moment(endTime).format(Const.DATE_FORMAT)}
                      &nbsp;以下商品可参加
                      {marketingTypeText}
                      活动
                    </Text>
                    <Text allowFontSacling={false} style={styles.text}>
                      {text}
                    </Text>
                    {
                      isOverlap == 1 && marketingType != 1 && <View style={[styles.activeBlock, {borderColor: mainColor}]}>
                        <Text style={[styles.activeText, {color: mainColor}]}>叠加</Text>
                      </View>
                    }
                  </View>
                </View>
              )
            : beginTime &&
              endTime && (
                <View style={styles.info}>
                  <Image source={MZheIcon} style={[styles.img, { tintColor: mainColor }]} />
                  <View>
                    <Text allowFontSacling={false} style={styles.infoText}>
                      {moment(beginTime).format(Const.DATE_FORMAT)}～
                      {moment(endTime).format(Const.DATE_FORMAT)}
                      &nbsp;以下商品可参加&nbsp;打包一口价活动
                    </Text>
                    <Text allowFontSacling={false} style={styles.text}>
                      {text}
                    </Text>
                    {
                      isOverlap == 1 && marketingType != 1 && <View style={[styles.activeBlock, {borderColor: mainColor}]}>
                        <Text style={[styles.activeText, {color: mainColor}]}>叠加</Text>
                      </View>
                    }
                  </View>
                </View>
              )}
      </View>
    );
  }
}
function compare(property){
  return function(a,b){
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
  }
}
const styles = StyleSheet.create({
  promotionBg: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 78,
    justifyContent: 'space-between'
  },
  info: {
    padding: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    maxHeight:78
  },
  activeBlock: {
    height: 15,
    width: 40,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  activeText: {
    fontSize: 12,
  },
  img: {
    height: 16,
    marginRight: 8,
    width: 16,
    marginTop:2
  },
  infoText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 20,
    marginBottom:2,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 10,
    color: '#999',
    lineHeight: 16
  }
});
