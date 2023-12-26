import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PixelRatio
} from 'react-native';
import { Relax } from 'plume2';
import MarketingLabel from 'wmkit/biz/marketing-label';
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
    const list = goodsInfo.toJS().marketingLabels;
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
          <View style={styles.container}>
            <Text allowFontScaling={false} style={styles.specLabel}>
              促销
            </Text>
            <View style={styles.row}>
              <View style={styles.center}>
                {list.length > 0 &&
                  list.map((label, index) => {
                    return (
                      <View style={styles.promotion} key={index}>
                        <MarketingLabel
                          marketingLabels={[label]}
                          isFlashFlag={false}
                          isSocial={false}
                        />
                        {/* {
                          <View
                            style={[styles.tag, { borderColor: mainColor }]}
                          >
                            {label.marketingType == 3 ? (
                              <Text
                                style={[styles.tagText, { color: mainColor }]}
                                allowFontScaling={false}
                              >
                                {label.marketingDesc.split('，')[0]}
                              </Text>
                            ) : label.marketingType == 4 ? (
                              <Text
                                style={[styles.tagText, { color: mainColor }]}
                                allowFontScaling={false}
                              >
                                {label.marketingDesc}
                              </Text>
                            ) : (
                              <MarketingLabel
                                marketingLabels={[label]}
                                isFlashFlag={false}
                                isSocial={false}
                                labelType={'goodsDetails'}
                              />
                            )}
                          </View>
                        } */}
                        <Text
                          allowFontScaling={false}
                          style={styles.proText}
                          numberOfLines={1}
                        >
                          {label.marketingDesc}
                        </Text>
                      </View>
                    );
                  })}
              </View>
              <Image source={require('../img/more.png')} style={styles.icon} />
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  promotionBox: {
    marginBottom: 10
  },
  container: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 7,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  center: {
    flex: 1
  },
  promotion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
    paddingLeft:10
  },
  specLabel: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)',
    fontWeight: '500'
  },
  proText: {
    flex: 1,
    color: '#333',
    fontSize: 14
  },
  icon: {
    width: 24,
    height: 24
  },
  tag: {
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    marginRight: 8,
    marginLeft: 12,
    borderWidth: 1,
    borderRadius: 2
  },
  tagText: {
    fontSize: 10,
    fontWeight: '500'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
