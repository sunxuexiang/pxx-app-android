import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PixelRatio
} from 'react-native';

import * as T from '../types';
import { screenWidth } from 'wmkit/styles/index';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { msg } from 'plume2';
import * as _ from 'wmkit/common/util';
import WMEmpty from 'wmkit/empty';
import WMImage from 'wmkit/image/index';
import Price from 'wmkit/price';
import GoodsNum from 'wmkit/biz/goods-num';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';
import { mainColor } from 'styles';

import LinearGradient from 'react-native-linear-gradient';
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
      actions: { action },
      main: { hotGoodsList, distributor }
    } = this.props;

    // 分销员是否禁用 0: 启用中  1：禁用中
    let forbidFlag = distributor.forbiddenFlag;

    return (
      <View style={styles.sellwellGoods}>
        <View style={styles.listTop}>
          <Text allowFontScaling={false} style={styles.topTitle}>
            热销商品
          </Text>
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

            // 是否禁用分享赚
            let socialDisabled = false;

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
                <View style={styles.imgBox}>
                  <WMImage style={styles.img} src={goodsInfo.goodsInfoImg} />
                  {noneStock && (
                    <View style={styles.notGoods}>
                      <View style={styles.whiteBox}>
                        <Text
                          style={styles.notGoodsText}
                          allowFontScaling={false}
                        >
                          缺货
                        </Text>
                      </View>
                    </View>
                  )}
                </View>

                <View style={styles.content}>
                  <View style={styles.selfSales}>
                    <View style={styles.label}>
                      {goodsInfo.companyType == 0 && <SelfSalesLabel />}
                    </View>
                    <Text
                      style={styles.title}
                      allowFontScaling={false}
                      numberOfLines={2}
                    >
                      {goodsInfo.companyType == 0 && (
                        <Text style={styles.words}>占位 </Text>
                      )}
                      {goodsInfo.goodsInfoName}
                    </Text>
                    <Text
                      style={styles.gec}
                      allowFontScaling={false}
                      numberOfLines={1}
                    >
                      {goodsInfo.specText}
                    </Text>
                  </View>

                  <View>
                    {/* 评价 */}
                    {isShow ? (
                      <View style={styles.goodsEvaluate}>
                        <Text
                          allowFontScaling={false}
                          style={styles.goodsEvaluateTxt}
                        >
                          {salesNum}
                          销量
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={styles.goodsEvaluateTxt}
                        >
                          {evaluateNum}
                          评价
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={styles.goodsEvaluateTxt}
                        >
                          {favorableRate}
                          %好评
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.goodsEvaluate}>
                        <Text
                          allowFontScaling={false}
                          style={styles.goodsEvaluateTxt}
                        >
                          {salesNum}
                          销量
                        </Text>
                      </View>
                    )}

                    <View style={styles.row}>
                      <View style={styles.tagCon}>
                        <Price buyPoint={goodsInfo.buyPoint} price={goodsInfo.marketPrice} />
                        {!forbidFlag && (
                          <Text
                            style={[
                              styles.commission,
                              noneStock && { color: '#bcbcbc' }
                            ]}
                            allowFontScaling={false}
                          />
                        )}
                      </View>
                      {!noneStock ? (
                        !forbidFlag ? (
                          <View style={styles.socialBtn}>
                            <TouchableOpacity
                              style={styles.btnBox1}
                              activeOpacity={0.8}
                              onPress={() =>
                                msg.emit('router: goToNext', {
                                  routeName: 'GraphicMaterial',
                                  goodsInfoId: goodsInfo.goodsInfoId
                                })
                              }
                            >
                              <Text
                                allowFontScaling={false}
                                style={styles.btnText1}
                              >
                                发圈
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={() => this._shareGoods(goodsInfo)}
                            >
                              <LinearGradient
                                colors={[mainColor, mainColor]}
                                style={[
                                  styles.btnBox2,
                                  socialDisabled && styles.btnBoxDisabled
                                ]}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                              >
                                <Text
                                  allowFontScaling={false}
                                  style={styles.btnText2}
                                >
                                  分享赚
                                  {_.addZero(goodsInfo.distributionCommission)}
                                </Text>
                              </LinearGradient>
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <GoodsNum
                            goodsInfoId={id}
                            value={buyCount}
                            max={stock}
                            disableNumberInput={noneStock}
                          />
                        )
                      ) : null}
                    </View>
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

  _shareGoods = async (goodsInfo) => {
    let {
      actions: { action }
    } = this.props;
    await action.saveCheckedSku(goodsInfo);
    //重新分享赚的时候加入店铺
    await action.setAddSelfShop();
    //打开分享弹框
    await action.toggleGoodsShare(true, false);
  };
}

const styles = StyleSheet.create({
  sellwellGoods: {
    backgroundColor: '#fff',
    width: screenWidth - 20,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    paddingHorizontal: 8
  },
  listTop: {
    height: 50,
    justifyContent: 'center'
    // borderBottomColor: '#ebebeb',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderStyle: 'solid',
    // marginBottom: 10
  },
  topTitle: {
    fontSize: 14,
    color: '#333'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 12
  },
  imgBox: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  img: {
    width: 128,
    height: 128,
    borderRadius: 6
  },
  notGoods: {
    position: 'absolute',
    width: 128,
    height: 128,
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(000,000,000,0.8)',
    borderRadius: 6
  },
  whiteBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notGoodsText: {
    fontSize: 14,
    color: '#fff'
  },
  content: {
    height: 128,
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 8
    // paddingBottom: 8
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb'
  },
  selfSales: {
    flexDirection: 'column',
    position: 'relative'
  },
  label: {
    position: 'absolute',
    left: 0
  },
  words: {
    color: 'rgba(255,255,255,0)'
  },
  title: {
    color: '#333',
    fontSize: 14,
    lineHeight: 16,
    //height: 32,
    marginBottom: 5,
    flexWrap: 'wrap'
  },
  gec: {
    color: '#999',
    fontSize: 10,
    marginBottom: 5
  },
  goodsEvaluate: {
    overflow: 'hidden',
    marginBottom: 4,
    marginRight: -50,
    flexDirection: 'row'
  },
  goodsEvaluateTxt: {
    fontSize: 10,
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
  btnBox1: {
    height: 23,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11.5,
    backgroundColor: 'rgba(255,102,0,0.08);'
  },
  btnText1: {
    color: '#ff6600',
    fontSize: 10,
    fontWeight: 'bold'
  },
  btnBox2: {
    marginLeft: 5,
    height: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  btnBoxDisabled: {
    backgroundColor: '#ddd'
  },
  btnText2: {
    color: '#fff',
    fontSize: 10
  }
});
