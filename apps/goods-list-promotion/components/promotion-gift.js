import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Relax } from 'plume2';

import { noop } from 'wmkit/noop';
import { Const } from 'wmkit/const';
import moment from 'moment';
import { mainColor, panelColor } from 'wmkit/styles/index';

/**
 * 促销—满赠活动
 */
@Relax
export default class PromotionGift extends React.Component {
  static relaxProps = {
    marketing: 'marketing',
    subType: 'subType',
    changeGiftShow: noop,
    isOverlap: 'isOverlap'
  };

  render() {
    const { marketing, changeGiftShow, isOverlap } = this.props.relaxProps;
    const { beginTime, endTime, subType, fullGiftLevelList } = marketing;
    let text = '';
    if (subType == 4) {
      text = fullGiftLevelList
        .map(m => m.fullAmount)
        .join(' ,')
        .toString();
        text = `买${text}送赠品`;
    } else if (subType == 5) {
      text = `买${fullGiftLevelList[0].fullCount}件送${fullGiftLevelList[0].fullGiftDetailList.length}件`
      // text = fullGiftLevelList
      //   .map(m => m.fullCount)
      //   .join(' ,')
      //   .toString();
      // if (text.length > 0) {
      //   text = text + '件';
      // }
    } else if (subType == 6) {
      text = `买${fullGiftLevelList[0].fullCount}件送${fullGiftLevelList[0].fullGiftDetailList.length}件`
      // text = fullGiftLevelList
      //   .map(m => m.fullCount)
      //   .join(' ,')
      //   .toString();
      // if (text.length > 0) {
      //   text = text + '件';
      // }
    }

    return (
      <View style={[styles.promotionBg, { backgroundColor: panelColor }]}>
        {beginTime &&
          endTime && (
            <View style={styles.info}>
              <Text allowFontSacling={false} style={styles.infoText}>
                {moment(beginTime).format(Const.DATE_FORMAT)}至
                {moment(endTime).format(
                  Const.DATE_FORMAT
                )}&nbsp;以下商品可参加买赠活动
              </Text>
              {/* <Text allowFontSacling={false} style={styles.infoText}>
                赠品赠完为止
              </Text> */}
              <Text allowFontSacling={false} style={styles.infoText}>
                {/* {text} */}
                {'送指定商品'}
              </Text>
              {
                isOverlap == 1 && <View style={[styles.activeBlock, {borderColor: mainColor}]}>
                  <Text style={[styles.activeText, {color: mainColor}]}>叠加</Text>
                </View>
              }
            </View>
          )}
        <TouchableOpacity
          style={styles.right}
          activeOpacity={0.8}
          onPress={() => changeGiftShow()}
        >
          <Image
            style={[styles.giftIcon, {tintColor: mainColor}]}
            source={require('wmkit/theme/gift-icon.png')}
          />
          <Text allowFontSacling={false} style={[styles.giftText, {color: mainColor}]}>
            查看赠品
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  promotionBg: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 75,
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb'
  },
  info: {
    paddingLeft: 10,
    justifyContent: 'space-between',
    flex: 1
  },
  infoText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 16
  },
  activeBlock: {
    height: 15,
    width: 40,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  activeText: {
    fontSize: 12
  },
  right: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 65,
    minWidth: 65,
    borderLeftColor: '#d6e4f0',
    borderLeftWidth: StyleSheet.hairlineWidth
  },
  giftIcon: {
    width: 25,
    height: 25,
  },
  giftText: {
    fontSize: 10,
    marginTop: 3,
    marginBottom: 3
  }
});
