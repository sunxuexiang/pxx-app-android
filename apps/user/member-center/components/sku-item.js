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
import WMImage from 'wmkit/image/index';
import * as _ from 'wmkit/common/util';

import GoodsNum from 'wmkit/biz/goods-num';
import MarketingLabel from 'wmkit/biz/marketing-label';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';

import { priceColor, screenWidth } from 'wmkit/styles/index';
import * as WMkit from 'wmkit/kit';

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
    const { listView } = this.props;
    return listView ? this.small() : this.big();
  }

  /**
   * 小图商品
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
            allowFontSacling={false}
            numberOfLines={2}
          >
            {goodsInfo.goodsInfoName}
          </Text>
          <Text
            style={[styles.gec, noneStock && { color: '#bcbcbc' }]}
            allowFontSacling={false}
            numberOfLines={1}
          >
            {goodsInfo.specText}
          </Text>
          <View style={styles.tagCon}>
            {goodsInfo.companyType == 0 && <SelfSalesLabel />}
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
              <Text
                allowFontSacling={false}
                style={[{ color: priceColor }, noneStock && { color: '#bcbcbc' }]}
              >
                ¥ {this._calShowPrice(goodsItem, buyCount)}
              </Text>
              {WMkit.isInvalid(goodsInfo) && (
                <View style={styles.lack}>
                  <Text allowFontScaling={false} style={styles.lackText}>
                    等货中
                  </Text>
                </View>
              )}
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
   * 大图商品
   * @param esGoodsItem
   * @returns {XML}
   */
  big = () => {
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
        activeOpacity={0.6}
        style={styles.bigView}
        onPress={() =>
          msg.emit('router: goToNext', {
            routeName: 'GoodsDetail',
            skuId: goodsInfo.goodsInfoId
          })
        }
      >
        <WMImage style={styles.bigimg} src={goodsInfo.goodsInfoImg} />
        <View style={styles.wrapper}>
          <View style={styles.titBox}>
            <Text
              style={[styles.title, noneStock && { color: '#bcbcbc' }]}
              allowFontSacling={false}
              numberOfLines={2}
            >
              {goodsInfo.goodsInfoName}
            </Text>
          </View>
          <Text
            style={[styles.gec, noneStock && { color: '#bcbcbc' }]}
            allowFontSacling={false}
            numberOfLines={1}
          >
            {goodsInfo.specText}
          </Text>
          <View style={styles.tagCon}>
            {goodsInfo.companyType == 0 && <SelfSalesLabel />}
            {
              <MarketingLabel
                marketingLabels={goodsInfo.marketingLabels}
                couponLabels={goodsInfo.couponLabels}
                noneStock={noneStock}
              />
            }
          </View>
          <View>
            <View style={styles.tagCon}>
              <Text
                allowFontSacling={false}
                style={[{ color: priceColor }, noneStock && { color: '#bcbcbc' }]}
              >
                ¥ {this._calShowPrice(goodsItem, buyCount)}
              </Text>
              {WMkit.isInvalid(goodsInfo) && (
                <View style={styles.lack}>
                  <Text allowFontScaling={false} style={styles.lackText}>
                    等货中
                  </Text>
                </View>
              )}
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
    if (
      goodsInfo.get('priceType') === 1 && goodsInfo.get('intervalPriceIds') &&
      goodsItem.getIn(['_otherProps', 'goodsIntervalPrices'])
    ) {
      const intervalPriceArr = goodsInfo
        .get('intervalPriceIds')
        .map((id) =>
          goodsItem
            .getIn(['_otherProps', 'goodsIntervalPrices'])
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
    lineHeight:16,
    //height: 32,
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
  }
});
