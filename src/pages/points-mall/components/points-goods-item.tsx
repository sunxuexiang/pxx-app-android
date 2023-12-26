import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import WMImage from 'wmkit/image/index';
import { screenWidth, mainColor } from 'wmkit/styles/index';
import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { msg } from 'plume2';

type IPointsGoodsItemProps = T.IProps & T.IPointsGoodsItemProps;

@connect<Partial<IPointsGoodsItemProps>, T.IPointsGoodsItemState>(
  store2Props,
  actions
)
export default class PointsGoodsItem extends React.Component<
  Partial<IPointsGoodsItemProps>,
  T.IPointsGoodsItemState
> {
  constructor(props: IPointsGoodsItemProps) {
    super(props);
  }

  /**

*/
  render() {
    let { pointGoods, id } = this.props;

    return (
      <TouchableOpacity
        style={styles.listBox}
        key={id}
        onPress={() => {
          msg.emit('router: goToNext', {
            routeName: 'GoodsDetail',
            skuId: pointGoods.goodsInfo.goodsInfoId,
            pointsGoodsId: pointGoods.pointsGoodsId
          });
        }}
      >
        <WMImage
          style={styles.itemImg}
          src={pointGoods.goodsInfo.goodsInfoImg || pointGoods.goods.goodsImg}
        />
        <View style={styles.listItem}>
          <Text allowFontScaling={false} style={styles.goodsName}>
            {pointGoods.goodsInfo.goodsInfoName}
          </Text>
          {!!pointGoods.specText && <Text>{pointGoods.specText}</Text>}
          <View style={styles.pointsBox}>
            <Text allowFontScaling={false} style={[styles.points, { color: mainColor }]}>
              {pointGoods.points}
            </Text>
            <Text allowFontScaling={false} style={styles.pointsTxt}>
              积分
            </Text>
          </View>
          <Text allowFontScaling={false} style={styles.priceTxt}>
            市场价&nbsp;&nbsp;￥
            {pointGoods.goodsInfo.marketPrice
              ? pointGoods.goodsInfo.marketPrice.toFixed(2)
              : 0}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listBox: {
    width: screenWidth,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 12,
    backgroundColor: '#fff'
  },
  itemImg: {
    width: 80,
    height: 80
  },
  listItem: {
    width: screenWidth - 116,
    marginLeft: 12
  },
  goodsName: {
    fontSize: 13,
    color: '#000',
    height: 34
  },
  pointsBox: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  points: {
    fontSize: 14
  },
  pointsTxt: {
    color: '#999',
    fontSize: 12,
    marginLeft: 2
  },
  priceTxt: {
    marginTop: 4,
    fontSize: 10,
    color: '#999',
    textDecorationLine: 'line-through'
  }
});
