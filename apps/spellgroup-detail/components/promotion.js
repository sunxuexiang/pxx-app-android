import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import { screenWidth, mainColor } from 'wmkit/styles/index';
import { marketOne } from '../kit';

@Relax
export default class Promotion extends Component {
  static relaxProps = {
    // 店铺信息
    //store: 'store',
    //showModal: noop,
    goodsInfo: 'goodsInfo',
    marketingDetail: noop
  };

  render() {
    const { goodsInfo, marketingDetail } = this.props.relaxProps;

    //有促销活动时,返回优先级最高的活动
    const marketing =
      goodsInfo.size > 0 && goodsInfo.get('marketingLabels').size > 0
        ? marketOne(goodsInfo)[0]
        : null;
    //满赠营销
    const giftMarketing = goodsInfo
      .get('marketingLabels')
      .find((marketing) => marketing.get('marketingType') == 2);

    if (marketing) {
      let type = marketing.marketingType;

      return (
        <View style={styles.container}>
          <Text allowFontScaling={false} style={styles.text}>
            促销
          </Text>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.promotionBox}
              onPress={() =>
                marketingDetail(
                  giftMarketing ? giftMarketing.get('marketingId') : null
                )
              }
              key={marketing.marketingId}
            >
              <View style={styles.promotion}>
                {
                  <View style={[styles.tag, { backgroundColor: mainColor }]}>
                    <Text allowFontSacling={false} style={styles.tagText}>
                      {_TYPE[type]['text']}
                    </Text>
                  </View>
                }
                <Text
                  allowFontScaling={false}
                  style={styles.proText}
                  numberOfLines={1}
                >
                  {marketing.marketingDesc}
                </Text>
              </View>
              <Image
                source={require('../img/more.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    paddingTop: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb'
  },
  promotionBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  promotion: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  text: {
    color: '#333333',
    fontSize: 14,
    marginTop: 1
  },
  proText: {
    color: '#333',
    fontSize: 14,
    maxWidth: screenWidth - 90
  },
  icon: {
    width: 16,
    height: 16
  },
  tag: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 15,
    width: 15,
    borderRadius: 7.5,
    marginLeft: 10,
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
  }
});

//促销类型样式
const _TYPE = {
  '0': { text: '减', color: [styles.tag, { backgroundColor: mainColor }] },
  '2': { text: '赠', color: [styles.tag, styles.tagRed] },
  '1': { text: '折', color: [styles.tag, styles.tagOrange] },
  '5': { text: '秒', color: [styles.tag, styles.tagOrange] }

};
