import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  PixelRatio,
  TouchableOpacity
} from 'react-native';
import { Relax } from 'plume2';
import Price from 'wmkit/price';
import * as WMkit from 'wmkit/kit';
import { Confirm } from 'wmkit/modal/confirm';
import Check from 'wmkit/check';
import { noop } from 'wmkit/noop';
import * as Button from 'wmkit/button';

import * as _ from 'wmkit/common/util'; // added by scx
import { checkAllQL, countSelectedQL, disableOrderQL, countGoodsQL } from '../ql';
import { screenWidth, mainColor } from 'wmkit/styles/index';

const SubmitButton = Button.Submit;

@Relax
export default class Bottom extends React.Component {
  static relaxProps = {
    checkAll: noop,
    checkAllQL: checkAllQL,
    countSelectedQL: countSelectedQL,
    toConfirm: noop,
    disableOrderQL: disableOrderQL,
    edit: 'edit',
    checkItemList: 'checkItemList',
    deletePurchase: noop,
    addToFollow: noop,
    totalPrice: 'totalPrice',
    totalBuyPoint: 'totalBuyPoint',
    discountPrice: 'discountPrice',
    tradePrice: 'tradePrice',
    //显示返利信息
    showDistributeCommission: 'showDistributeCommission',
    distributeCommission: 'distributeCommission',
    countGoodsQL: countGoodsQL,
    pageNum: 'pageNum',
    totalPages: 'totalPages'
  };

  render() {
    const {
      checkAll,
      checkAllQL,
      countSelectedQL,
      toConfirm,
      disableOrderQL,
      edit,
      checkItemList,
      addToFollow,
      totalPrice,
      totalBuyPoint,
      discountPrice,
      tradePrice,
      showDistributeCommission,
      distributeCommission,
      countGoodsQL
    } = this.props.relaxProps;
    const disabledMutation =
      checkItemList
        .filter((sku) => sku.get('checked') && sku.get('goodsStatus') !== 2)
        .count() === 0;
    const checkSkuIds = checkItemList.filter((sku) => sku.get('checked'));
    // 社交电商相关内容显示与否
    const social = showDistributeCommission && distributeCommission > 0;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.checkBox}>
            <Check checked={checkAllQL} onCheck={() => checkAll(checkAllQL)} style={styles.check}/>
            <Text allowFontScaling={false} style={styles.checkFont}>
              全选
            </Text>
          </View>
          {!edit && (
            <View style={styles.total}>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.totalNum} allowFontScaling={false}>合计:</Text>
                <Price
                  price={WMkit.isLoginOrNotOpen() ? tradePrice:0}
                  bigPriceStyle={{ fontSize: 16, marginBottom: -2 }}
                />
              </View>
              <Text style={{flexDirection:'row'}} allowFontScaling={false} numberOfLines={1}>
                <Text style={styles.num} allowFontScaling={false}>总数:</Text>
                <Text allowFontScaling={false} style={[styles.normalPrice, { color: mainColor }]}>
                  {countGoodsQL}件
                </Text>
                <Text style={styles.num} allowFontScaling={false}>总额:</Text>
                <Text style={[styles.normalPrice, { color: mainColor }]} allowFontScaling={false} numberOfLines={1}>
                  {totalBuyPoint > 0 && (
                    <Text allowFontScaling={false} style={[styles.normalPrice, { color: mainColor }]}>
                      {totalBuyPoint}
                      <Text allowFontScaling={false} style={[styles.normalPrice, { color: mainColor }]}>积分</Text>+
                    </Text>
                  )}
                </Text>
                <Text style={[styles.normalPrice, { color: mainColor },totalBuyPoint > 0 && {width:30}]} numberOfLines={1} allowFontScaling={false}>¥{_.addZero(WMkit.isLoginOrNotOpen() ?totalPrice:0)}</Text>
                <Text style={styles.num} allowFontScaling={false}>优惠:</Text>
                <Text allowFontScaling={false} style={[styles.normalPrice, { color: mainColor }]}>
                  -¥
                  {_.addZero(discountPrice)}
                </Text>
              </Text>
              {social && (
                <Text style={styles.commission} allowFontScaling={false}>
                  可返利:
                  <Text style={[styles.commissionPrice, { color: mainColor }]}> ￥{_.addZero(distributeCommission)}</Text>
                </Text>
              )}
            </View>
          )}
        </View>
        <View style={styles.deleteAndMove}>
          {edit ? (
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={!disabledMutation ? addToFollow:()=>{}}
                activeOpacity={0.8}
                style={!disabledMutation ? [styles.btn, { borderColor: mainColor }] : styles.grayBtn}
              >
                <Text
                  style={!disabledMutation ? [styles.btnText, { color: mainColor }] : styles.grayText}
                >{`移入收藏夹(${countSelectedQL})`}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={!disabledMutation ? this._handleDelete:()=>{}}
                activeOpacity={0.8}
                style={!disabledMutation ? [styles.btn, {borderColor: mainColor}] : styles.grayBtn}
              >
                <Text
                  style={!disabledMutation ? [styles.btnText, { color: mainColor }] : styles.grayText}
                >{`删除(${countSelectedQL})`}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <SubmitButton
              text={`结算(${countGoodsQL})`}
              onClick={toConfirm}
              isLinear={true}
              colors={disableOrderQL || checkSkuIds.size == 0 ? ['#d8d8d8', '#b3b3b3'] : [mainColor, mainColor]}
              btnTextStyle={{color: '#fff'}}
              disabled={disableOrderQL || checkSkuIds.size == 0}
            />
          )}
        </View>
      </View>
    );
  }

  /**
   * 删除购物车
   * @private
   */
  _handleDelete = () => {
    const { deletePurchase } = this.props.relaxProps;
    Confirm({
      title: '删除购物车商品',
      text: '您确定要删除所选商品?',
      okFn: deletePurchase,
      okText: '确定',
      cancelText: '取消'
    });
  };
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 56,
    width: screenWidth,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkBox: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },
  check: {
    width: screenWidth <= 320 ? 39 : 42,
    height: screenWidth <= 320 ? 39 : 42,
  },
  checkFont: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14
  },
  deleteAndMove: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  total: {
    flexDirection: 'column',
    maxWidth: screenWidth - 190
  },
  normalPrice: {
    fontSize: 10
  },
  totalNum: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 16,
    marginBottom: 2
  },
  num: {
    color: '#333',
    fontSize: 10,
    marginTop: 2
  },
  commission: {
    color: '#333',
    fontSize: 10
  },
  commissionPrice: {
    fontSize: 10
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btn: {
    borderRadius: 18,
    height: 36,
    marginLeft: 15,
    backgroundColor: 'transparent',
    borderWidth: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow:'hidden'
  },
  btnText: {
    fontSize: 14
  },
  grayBtn: {
    borderRadius: 18,
    height: 36,
    marginLeft: 15,
    backgroundColor: '#D8D8D8',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  grayText: {
    fontSize: 14,
    color: '#fff'
  }
});
