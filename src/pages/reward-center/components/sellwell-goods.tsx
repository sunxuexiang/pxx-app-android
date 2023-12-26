import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PixelRatio
} from 'react-native';

import * as T from '../types';
import { screenWidth, priceColor } from 'wmkit/styles/index';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { msg } from 'plume2';
import * as _ from 'wmkit/common/util';
import WMEmpty from 'wmkit/empty';
import WMImage from 'wmkit/image/index';

import GoodsNum from 'wmkit/biz/goods-num';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';

type ISellwellGoodsProps = T.IProps & T.ISellwellGoodsProps;

@connect<Partial<ISellwellGoodsProps>, T.ISellwellGoodsState>(
  store2Props,
  actions
)
export default class SellwellGoods extends React.Component<
  Partial<ISellwellGoodsProps>,
  T.ISellwellGoodsState
> {
  constructor(props: ISellwellGoodsProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      main: { hotGoodsList, distributor }
    } = this.props;

    return (
      <View style={styles.sellwellGoods}>
        <View style={styles.listTop}>
          <Text allowFontScaling={false} style={styles.topTitle}>热销商品</Text>
        </View>
        {hotGoodsList.length > 0 ? (
          hotGoodsList.map((goodsItem) => {
            // FIXME 销量、评价、好评展示与否，后期读取后台配置开关
            // 此版本默认都展示
            const isShow = true;
            // skuId
            const id = goodsItem.id;
            // sku信息
            const goodsInfo = goodsItem.goodsInfo;
            // 库存
            const stock = goodsInfo.stock;
            // 起订量
            const count = goodsInfo.count || 0;
            // 库存等于0或者起订量大于剩余库存
            const noneStock = stock <= 0 || (count > 0 && count > stock);
            const buyCount = noneStock ? 0 : goodsInfo.buyCount || 0;

            //⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇评价相关数据处理⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
            //好评率
            let favorableRate = '100';
            if (goodsInfo.goodsEvaluateNum && goodsInfo.goodsEvaluateNum != 0) {
              favorableRate = _.mul(
                _.div(
                  goodsInfo.goodsFavorableCommentNum,
                  goodsInfo.goodsEvaluateNum
                ),
                100
              ).toFixed(0);
            }

            //评论数
            let evaluateNum = '暂无';
            const goodsEvaluateNum = goodsInfo.goodsEvaluateNum;
            if (goodsEvaluateNum) {
              if (goodsEvaluateNum < 10000) {
                evaluateNum = goodsEvaluateNum;
              } else {
                const i = _.div(goodsEvaluateNum, 10000).toFixed(1);
                evaluateNum = i + '万+';
              }
            }

            //销量
            let salesNum = '暂无';
            const goodsSalesNum = goodsInfo.goodsSalesNum;
            if (goodsSalesNum) {
              if (goodsSalesNum < 10000) {
                salesNum = goodsSalesNum;
              } else {
                const i = _.div(goodsSalesNum, 10000).toFixed(1);
                salesNum = i + '万+';
              }
            }
            //⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆评价相关数据处理⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆
            return (
              <TouchableOpacity
                key={id}
                activeOpacity={0.6}
                style={styles.item}
                onPress={() =>
                  msg.emit('router: goToNext', {
                    routeName: 'GoodsDetail',
                    skuId: goodsInfo.goodsInfoId
                  })
                }
              >
                <WMImage style={styles.img} src={goodsInfo.goodsInfoImg} />
                <View style={styles.content}>
                  <Text
                    style={[styles.title, noneStock && { color: '#bcbcbc' }]}
                    allowFontScaling={false}
                    numberOfLines={2}
                  >
                    {goodsInfo.goodsInfoName}
                  </Text>
                  <Text
                    style={[styles.gec, noneStock && { color: '#bcbcbc' }]}
                    allowFontScaling={false}
                    numberOfLines={1}
                  >
                    {goodsInfo.specText}
                  </Text>

                  {/* 评价 */}
                  {isShow ? (
                    <View style={styles.goodsEvaluate}>
                      <Text allowFontScaling={false} style={styles.goodsEvaluateTxt}>
                        {salesNum}
                        销量
                      </Text>
                      <Text allowFontScaling={false} style={styles.goodsEvaluateTxt}>
                        {evaluateNum}
                        评价
                      </Text>
                      <Text allowFontScaling={false} style={styles.goodsEvaluateTxt}>
                        {favorableRate}
                        %好评
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.goodsEvaluate}>
                      <Text allowFontScaling={false} style={styles.goodsEvaluateTxt}>
                        {salesNum}
                        销量
                      </Text>
                    </View>
                  )}

                  <View style={styles.tagCon}>
                    {goodsInfo.companyType == 0 && <SelfSalesLabel />}
                  </View>

                  <View style={styles.row}>
                    <View style={styles.tagCon}>
                      <Text
                        allowFontScaling={false}
                        style={[
                          {color: priceColor},
                          noneStock && { color: '#bcbcbc' }
                        ]}
                      >
                        ¥ {_.addZero(goodsInfo.marketPrice)}
                      </Text>
                      {noneStock && (
                        <View style={styles.lack}>
                          <Text
                            allowFontScaling={false}
                            style={styles.lackText}
                          >
                            缺货
                          </Text>
                        </View>
                      )}
                    </View>
                    {!noneStock && (
                      <GoodsNum
                        goodsInfoId={id}
                        value={buyCount}
                        max={stock}
                        disableNumberInput={noneStock}
                      />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <WMEmpty
            emptyImg={require('../img/empty.png')}
            desc="没有搜到任何商品"
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sellwellGoods: {
    backgroundColor: '#fff',
    width: screenWidth - 20,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    position: 'relative',
    paddingLeft: 10,
    paddingRight: 10
  },
  listTop: {
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },
  topTitle: {
    fontSize: 14,
    color: '#333',
    paddingTop: 10,
    paddingBottom: 10
  },
  item: {
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  img: {
    width: 100,
    height: 100
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'flex-start',
    minHeight: 100,
    paddingBottom: 8,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb'
  },
  title: {
    color: '#000',
    fontSize: 14,
    lineHeight: 16,
    //height: 32,
    marginBottom: 5
  },
  gec: {
    color: '#333',
    fontSize: 13,
    marginBottom: 5,
    lineHeight: 15
  },
  goodsEvaluate: {
    overflow: 'hidden',
    marginBottom: 4,
    marginRight: -50,
    flexDirection: 'row'
  },
  goodsEvaluateTxt: {
    fontSize: 12,
    color: '#999',
    paddingRight: 5
  },
  tagCon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    marginTop: 2,
    marginBottom: 2
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  commission: {
    marginLeft: 3,
    color: '#333',
    fontSize: 12
  },
  lack: {
    width: 35,
    height: 15,
    marginLeft: 5,
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
  socialBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  btnBoxDisabled: {
    backgroundColor: '#ddd'
  },
  btnText2: {
    color: '#fff',
    fontSize: 10
  }
});
