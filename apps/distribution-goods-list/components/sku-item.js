import React from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { msg } from 'plume2';
import * as _ from 'wmkit/common/util';
import WMImage from 'wmkit/image/index';
import Price from 'wmkit/price';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';
import GoodsNum from 'wmkit/biz/goods-num';

import { screenWidth, mainColor } from 'wmkit/styles/index';

/**
 * Sku列表的item
 */
export default class SkuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  render() {
    return this.small();
  }

  /**
   * 小图商品
   * @returns {XML}
   */
  small = () => {
    const {
      goodsItem,
      // 销量、评价、好评展示与否，后期读取后台配置开关
      isShow,
      // 是否是分销员
      isDistributor
    } = this.state;

    // let isDistributor = WMkit.isDistributor();

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
        _.div(goodsInfo.goodsFavorableCommentNum, goodsInfo.goodsEvaluateNum),
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
        activeOpacity={0.6}
        style={styles.item}
        onPress={() =>
          msg.emit('router: goToNext', {
            routeName: 'GoodsDetail',
            skuId: goodsInfo.goodsInfoId
          })
        }
      >
        <WMImage style={styles.img} src={goodsInfo.goodsInfoImg}/>
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
              <Text style={styles.goodsEvaluateTxt}>
                {salesNum}
                销量
              </Text>
              <Text style={styles.goodsEvaluateTxt}>
                {evaluateNum}
                评价
              </Text>
              <Text style={styles.goodsEvaluateTxt}>
                {favorableRate}
                %好评
              </Text>
            </View>
          ) : (
            <View style={styles.goodsEvaluate}>
              <Text style={styles.goodsEvaluateTxt}>
                {salesNum}
                销量
              </Text>
            </View>
          )}

          <View style={styles.tagCon}>
            {goodsInfo.companyType == 0 && <SelfSalesLabel/>}
          </View>

          <View style={styles.row}>
            <View style={styles.tagCon}>
              <Price
                buyPoint={goodsInfo.buyPoint}
                price={goodsInfo.marketPrice}
              />
              {noneStock && (
                <View style={styles.lack}>
                  <Text allowFontScaling={false} style={styles.lackText}>
                    缺货
                  </Text>
                </View>
              )}
            </View>
            {!noneStock ? (
              isDistributor ? (
                <View style={styles.socialBtn}>
                  <TouchableOpacity
                    style={[styles.btnBox1, { borderColor: mainColor }]}
                    activeOpacity={0.8}
                    onPress={() =>
                      msg.emit('router: goToNext', {
                        routeName: 'GraphicMaterial',
                        goodsInfoId: goodsInfo.goodsInfoId
                      })
                    }
                  >
                    <Text allowFontScaling={false} style={[styles.btnText1, { color: mainColor }]}>发圈素材</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.btnBox2,
                      { backgroundColor: mainColor },
                      socialDisabled && styles.btnBoxDisabled
                    ]}
                    activeOpacity={0.8}
                    onPress={() => {
                      this.props.changeShowShare();
                      this.props.saveCheckedSku(goodsItem.goodsInfo);
                    }}
                  >
                    <Text allowFontScaling={false}
                          style={styles.btnText2}>分享赚 {_.addZero(goodsInfo.distributionCommission)}</Text>
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
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  bigBox: {
    paddingLeft: 5,
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  bigView: {
    width: (screenWidth - 30) / 2,
    marginVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#ebebeb'
  },
  bigimg: {
    width: (screenWidth - 30) / 2 - 2,
    height: (screenWidth - 30) / 2 - 2,
    marginBottom: 5
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
  wrapper: {
    padding: 10
  },
  title: {
    color: '#000',
    fontSize: 14,
    lineHeight: 16,
    marginBottom: 5
  },
  gec: {
    color: '#333',
    fontSize: 13,
    marginBottom: 5,
    lineHeight: 15
  },
  img: {
    width: 100,
    height: 100
  },
  item: {
    padding: 10,
    paddingBottom: 0,
    paddingRight: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  titBox: {
    height: 40
  },
  tagCon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    marginTop: 2,
    marginBottom: 2
  },
  commission: {
    marginLeft: 3,
    color: '#333',
    fontSize: 12
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
    backgroundColor: '#fff',
    borderWidth: 1
  },
  btnText1: {
    fontSize: 10
  },
  btnBox2: {
    marginLeft: 5,
    height: 23,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11.5
  },
  btnBoxDisabled: {
    backgroundColor: '#ddd'
  },
  btnText2: {
    color: '#fff',
    fontSize: 10
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
  }
});
