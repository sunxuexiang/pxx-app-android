import React from 'react';
import { StyleSheet, View, Text, Image, PixelRatio } from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { screenWidth, priceColor, mainColor } from 'wmkit/styles/index';
import WMImage from 'wmkit/image/index';
import * as _ from 'wmkit/common/util';
import LinearGradient from 'react-native-linear-gradient';
import Price from 'wmkit/price';


type IGoodsDetailProps = T.IProps & T.IGoodsDetailProps;

@connect<Partial<IGoodsDetailProps>, T.IGoodsDetailState>(
  store2Props,
  actions
)
export default class GoodsDetail extends React.Component<
  Partial<IGoodsDetailProps>,
  T.IGoodsDetailState
> {
  constructor(props: IGoodsDetailProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: { action },
      activity,

      goods,

      notice,

      otherGroup
    } = this.props;
    //筛选出团长的SKU
    const goodsInfo = goods.goodsInfos.filter(
      (info) => info.goodsInfoId == goods.goodsInfoId
    )[0];
    const leaderSku = goodsInfo ? goodsInfo : {};
    return (
      <View style={styles.noneDetail}>
        {goods.goods.goodsImg ? (
          <WMImage style={styles.goodsImg} src={goods.goods.goodsImg} />
        ) : (
          <Image source={require('../img/none.png')} style={styles.goodsImg} />
        )}

        <View style={styles.right}>
          <View>
            <Text
              style={styles.goodsName}
              allowFontScaling={false}
              numberOfLines={2}
            >
              {goods.goods.goodsName}
            </Text>
            <View style={{marginTop: 6, flexDirection: 'row'}}>
              <LinearGradient
                colors={[mainColor, mainColor]}
                style={styles.groupTag}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              >
                <Text allowFontScaling={false} style={styles.groupText}>{activity.activityInfo.grouponNum}人团</Text>
              </LinearGradient>
            </View>
          </View>
          <View>
            {leaderSku.count && leaderSku.count > 0 ? <Text style={styles.minSaleNum} allowFontScaling={false}>{leaderSku.count}件起售</Text> : null}
            <View style={styles.bottom}>
              <Price price={leaderSku.grouponPrice} priceStyle={{lineHeight: 16}} bigPriceStyle={{fontSize: 16}}/>
              <View style={styles.bottomRight}>
                <Text allowFontScaling={false} style={[styles.totalNumText, { color: priceColor }]}>
                  {activity.activityInfo.alreadyGrouponNum}
                </Text>
                <Text allowFontScaling={false} style={styles.totalText}>
                  人已拼团
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noneDetail: {
    flexDirection: 'row',
    width: screenWidth,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginVertical: 12,
    backgroundColor: '#fff'
  },
  goodsImg: {
    width: screenWidth * 0.341,
    height: screenWidth * 0.341,
    borderRadius: 4
  },
  right: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    paddingLeft: 12
  },
  goodsName: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.8)',
    lineHeight: 16
  },
  groupTag: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2
  },
  groupText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '500'
  },
  minSaleNum: {
    fontSize: 10,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.4)',
    paddingBottom: 8
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  totalText: {
    fontSize: 10,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.8)'
  },
  totalNumText: {
    fontSize: 10,
    fontWeight: '500',
    paddingRight: 3
  }
});
