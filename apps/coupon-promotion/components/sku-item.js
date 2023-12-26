import React from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { fromJS } from 'immutable';
import { msg } from 'plume2';
import * as _ from 'wmkit/common/util';
import WMImage from 'wmkit/image/index';
import GoodsNum from 'wmkit/biz/goods-num';
import MarketingLabel from 'wmkit/biz/marketing-label';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';
import * as WMkit from 'wmkit/kit';
import Price from 'wmkit/biz/cartprice';

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
   * @param esGoodsItem
   * @returns {XML}
   */
  small = () => {
    const { goodsItem } = this.state;
    // skuId
    const id = goodsItem.id;
    // sku信息
    const goodsInfo = goodsItem.goodsInfo;
    const stock = goodsInfo.stock;
    // 起订量
    const count = goodsInfo.count || 0;
    // 库存等于0或者起订量大于剩余库存
    const noneStock = stock <= 0 || (count > 0 && count > stock);
    const buyCount = noneStock ? 0 : goodsInfo.buyCount || 0;
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
        <WMImage style={styles.img} src={goodsInfo.goodsInfoImg&&`${goodsInfo.goodsInfoImg}?x-oss-process=image/format,jpg/interlace,1,image/resize,m_mfit,w_200,h_200`} />
        {WMkit.isInvalid(goodsInfo) && (
          <View style={styles.notGoods}>
            <View style={styles.whiteBox}>
              <Text style={styles.notGoodsText} allowFontScaling={false}>
                等货中
              </Text>
            </View>
          </View>
        )}
        <View style={styles.content}>
          <View style={styles.titleBox}>
            <View style={styles.label}>
              {goodsInfo.companyType == 0 && <SelfSalesLabel />}
            </View>
            <Text
              style={styles.titles}
              allowFontScaling={false}
              numberOfLines={2}
            >
              {goodsInfo.companyType == 0 && (
                <Text style={styles.words}>占位 </Text>
              )}
              {goodsInfo.goodsInfoName}
            </Text>
          </View>
          <Text
            style={[styles.gec, noneStock && { color: '#bcbcbc' }]}
            allowFontSacling={false}
            numberOfLines={1}
          >
            {goodsInfo.goodsSubtitle || ''}
          </Text>

          {/*销量、好评信息*/}
          {/* {this._saleInfo()} */}

          <View style={styles.tagCon}>
            {
              <MarketingLabel
                marketingLabels={goodsInfo.marketingLabels}
                couponLabels={goodsInfo.couponLabels}
                noneStock={noneStock}
              />
            }
          </View>
          <View style={styles.row}>
            <View style={styles.tagCon}>
              <Price price={this._calShowPrice(goodsItem, buyCount)} />
            </View>
            <GoodsNum
              goodsInfoId={id}
              value={buyCount}
              max={stock}
              disableNumberInput={noneStock}
              onAfterClick={this._afterChangeNum}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * 根据设价方式,计算显示的价格
   * @returns 显示的价格
   * @private
   */
  _calShowPrice = (goodsItem, buyCount) => {
    goodsItem = fromJS(goodsItem);
    const goodsInfo = goodsItem.get('goodsInfo');
    let showPrice;
    // 阶梯价,根据购买数量显示对应的价格
    if (goodsInfo.get('priceType') === 1 && goodsInfo.get('intervalPriceIds')) {
      const intervalPriceArr = goodsInfo
        .get('intervalPriceIds')
        .map((id) =>
          goodsItem
            .getIn(['_otherProps', 'esGoodsInfoResponse.goodsIntervalPrices'])
            .find((pri) => pri.get('intervalPriceId') === id)
        )
        .sort((a, b) => b.get('count') - a.get('count'));
      if (buyCount > 0) {
        // 找到sku的阶梯价,并按count倒序排列从而找到匹配的价格
        showPrice = intervalPriceArr
          .find((pri) => buyCount >= pri.get('count'))
          .get('price');
      } else {
        showPrice = goodsInfo.get('intervalMinPrice') || 0;
      }
    } else {
      showPrice = goodsInfo.get('salePrice') || 0;
    }
    return _.addZero(showPrice);
  };

  /**
   * 数量修改后的方法,用于修改购买数量,响应变化对应的阶梯价格
   * @private
   */
  _afterChangeNum = (num) => {
    const goodsItem = this.state.goodsItem;
    goodsItem.goodsInfo.buyCount = num;
    this.setState({
      goodsItem: goodsItem
    });
  };

  _saleInfo = () => {
    const { goodsItem, isShow } = this.state;
    // sku信息
    const goodsInfo = fromJS(goodsItem.goodsInfo);
    //好评率
    let favorableRate = '100';
    if (
      goodsInfo.get('goodsEvaluateNum') &&
      goodsInfo.get('goodsEvaluateNum') != 0
    ) {
      favorableRate = _.mul(
        _.div(
          goodsInfo.get('goodsFavorableCommentNum'),
          goodsInfo.get('goodsEvaluateNum')
        ),
        100
      ).toFixed(0);
    }

    //评论数
    let evaluateNum = '暂无';
    const goodsEvaluateNum = goodsInfo.get('goodsEvaluateNum');
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
    const goodsSalesNum = goodsInfo.get('goodsSalesNum');
    if (goodsSalesNum) {
      if (goodsSalesNum < 10000) {
        salesNum = goodsSalesNum;
      } else {
        const i = _.div(goodsSalesNum, 10000).toFixed(1);
        salesNum = i + '万+';
      }
    }

    const html = (
      <View style={styles.assseTag}>
        <Text
          allowFontScaling={false}
          style={[styles.assseText, { paddingLeft: 0 }]}>
          {salesNum}
          销量
        </Text>
        <Text
          allowFontScaling={false}
          style={[styles.assseText, { paddingLeft: 20 }]}>
          {evaluateNum}
          评价
        </Text>
        <Text
          allowFontScaling={false}
          style={[styles.assseText, { paddingLeft: 20 }]}>
          {favorableRate}
          %好评
        </Text>
      </View>
    );

    return isShow ? (
      html
    ) : (
        <View style={styles.assseTag}>
          <Text
            allowFontScaling={false}
            style={[styles.assseText, { paddingLeft: 0 }]}>
            {salesNum}
            销量
        </Text>
        </View>
      );
  };
}

const styles = StyleSheet.create({
  lack: {
    width: 35,
    height: 15,
    backgroundColor: '#cccccc',
    borderRadius: 7.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5
  },
  lackText: {
    fontSize: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  wrapper: {
    padding: 10
  },
  titleBox: {
    flexDirection: 'row',
    position: 'relative'
  },
  label: {
    position: 'absolute',
    left: 0
  },
  words: {
    color: 'rgba(255,255,255,0)'
  },
  titles: {
    color: '#333',
    fontSize: 14,
    lineHeight: 16,
    //height: 32,
    marginBottom: 5,
    flexWrap: 'wrap'
  },
  gec: {
    color: '#333',
    fontSize: 13,
    marginBottom: 5,
    lineHeight: 15
  },
  img: {
    width: 128,
    height: 128,
    borderRadius: 6
  },
  item: {
    padding: 12,
    paddingBottom: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    alignItems: 'flex-start',
    minHeight: 128,
    paddingBottom: 8
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
  assseTag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 2,
    paddingBottom: 2
  },
  assseText: {
    color: '#999999',
    fontSize: 12
  },
  notGoods: {
    position: 'absolute',
    width: 128,
    height: 128,
    top: 10,
    left: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(000,000,000,0.3)',
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
});
