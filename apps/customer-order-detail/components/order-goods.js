/**
 * Created by hht on 2017/8/30.
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  PixelRatio,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Price from '../../../wmkit/price';
import { Relax, msg } from 'plume2';

import { priceColor, screenWidth } from 'wmkit/styles/index';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';
import OrderWrapper from 'wmkit/order-wrapper';
import WMImage from 'wmkit/image/index';
import FormSelect from 'wmkit/form/form-select';
import FormItem from 'wmkit/form/form-item';
import { noop } from 'wmkit/noop';

@Relax
export default class OrderGoods extends Component {
  static relaxProps = {
    detail: 'detail',
    changeAnnexMask: noop
  };

  render() {
    const { detail, changeAnnexMask } = this.props.relaxProps;
    const buySelf =
      detail.get('buyer') &&
      detail.get('buyer').get('id') == detail.get('inviteeId');
    let orderWrapper = OrderWrapper(detail);
    return (
      <View style={styles.container}>
        <View style={styles.box}>
        <View style={styles.skuHead}>
          {orderWrapper.isSelf() ? <SelfSalesLabel/> : null}
          <TouchableOpacity
            style={styles.itemCount}
            activeOpacity={0.8}
           /* onPress={() => this._goStore(orderWrapper.storeId())}*/
          >
            <Text
              allowFontSacling={false}
              numberOfLines={1}
              style={{ flex: 1 }}
            >
              {orderWrapper.storeName()}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.firstItem}
          onPress={() => {
            msg.emit('router: goToNext', {
              routeName: 'OrderDetailSkus',
              tId: orderWrapper.orderNo()
            });
          }}
        >
          <View style={styles.middleDetail}>
            {orderWrapper
              .tradeItems()
              .concat(orderWrapper.gifts())
              .toJS()
              .map((item) => {
                return (
                  <View
                    style={styles.productItem}
                    key={Math.random().toString()}
                  >
                    <View style={styles.middleLeft}>
                      <Image
                        style={styles.img}
                        key={Math.random().toString()}
                        source={
                          item.pic
                            ? { uri: item.pic }
                            : require('../img/none.png')
                        }
                      />
                      <View style={[styles.detail, { flex: 1 }]}>
                        <Text
                          style={styles.skuName}
                          allowFontScaling={false}
                          numberOfLines={2}
                        >
                          {item.skuName}
                        </Text>
                        <Text style={styles.specDetails}>
                          {item.specDetails ? item.specDetails : ''}
                        </Text>
                        <Price price={item.price} buyPoint={item.buyPoint}/>
                      </View>
                    </View>
                    <View style={styles.middleRight}>
                      <Text style={styles.number}>{'x' + item.num}</Text>
                    </View>
                  </View>
                );
              })}
          </View>
        </TouchableOpacity>

        <FormSelect
          label="付款记录"
          placeholder=""
          itemStyle={{
            borderBottomWidth: 0,
            paddingVertical: 10,
            paddingHorizontal: 12
          }}
          textStyle={{ textAlign: 'right' }}
          selected={{ key: '1', value: orderWrapper.orderPayState() }}
          onPress={() => this._toPayRecord(orderWrapper.orderNo())}
        />

        <FormSelect
          label="发货记录"
          placeholder=""
          itemStyle={{
            borderBottomWidth: 0,
            paddingVertical: 10,
            paddingHorizontal: 12
          }}
          textStyle={{ textAlign: 'right' }}
          selected={{ key: '1', value: orderWrapper.orderDeliveryState() }}
          onPress={() =>
            buySelf
              ? this._toShipRecord(
              orderWrapper.orderNo(),
              orderWrapper.orderDeliveryState()
              )
              : null
          }
          disabled={!this._isIconVisible(orderWrapper.orderDeliveryState())}
          iconVisible={this._isIconVisible(
            buySelf,
            orderWrapper.orderDeliveryState()
          )}
        />
        <FormSelect
          label="发票信息"
          placeholder=""
          itemStyle={{
            borderBottomWidth: 0,
            paddingVertical: 10,
            paddingHorizontal: 12
          }}
          textStyle={{ textAlign: 'right' }}
          selected={{ key: '1', value: orderWrapper.orderInvoice() }}
          onPress={() => this._toInvoice(orderWrapper.orderNo())}
          disabled={!this._isInvoiceVisible(orderWrapper.orderInvoice())}
          iconVisible={this._isInvoiceVisible(orderWrapper.orderInvoice())}
        />
        </View>
        <View style={{marginTop:10,borderRadius:10,overflow:'hidden'}}>
        <FormItem
          labelName="订单备注"
          itemStyle={{
            borderBottomWidth: 0,
            paddingVertical: 10,
            paddingHorizontal: 12
          }}
          textStyle={{ textAlign: 'right' }}
          placeholder={orderWrapper.buyerRemark()}
        />
        <FormItem
          labelName="卖家备注"
          itemStyle={{
            borderBottomWidth: 0,
            paddingVertical: 10,
            paddingHorizontal: 12
          }}
          textStyle={{ textAlign: 'right' }}
          placeholder={orderWrapper.sellerRemark()}
        />
        <View style={styles.backItem}>
          <View style={styles.backTitle}>
            <Text allowFontScaling={false}>订单附件</Text>
          </View>
          <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
          {orderWrapper.encloses().length > 0 ? (
            orderWrapper.encloses().map((img, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  changeAnnexMask(index);
                }}
                key={index}
              >
                <WMImage
                  key={Math.random()}
                  resizeMode="contain"
                  style={styles.image}
                  src={img.image}
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text allowFontScaling={false} style={{ color: '#8b8b8b' }}>
              无
            </Text>
          )}
        </ScrollView>
        </View>
      </View>
        <View style={styles.greyLine}/>

        <View style={styles.remarks}>
          <View style={styles.itemTitle}>
            <Text allowFontScaling={false}>应付金额</Text>
            <Text style={{ color: priceColor }} allowFontScaling={false}>
              &yen;
              {orderWrapper.totalPrice()}
            </Text>
          </View>
          <View style={styles.itemTitle}>
            <Text
              allowFontScaling={false}>商品总额</Text>
            <Text
              allowFontScaling={false}
              style={styles.textGray}>
              &yen;
              {orderWrapper.goodsPrice()}
            </Text>
          </View>
          {orderWrapper.reductionPrice() != 0 && (
            <View style={styles.itemTitle}>
              <Text allowFontScaling={false}>满减优惠</Text>
              <Text
                allowFontScaling={false}
                style={styles.textGray}>
                -&yen;
                {orderWrapper.reductionPrice()}
              </Text>
            </View>
          )}
          {orderWrapper.discountPrice() != 0 && (
            <View style={styles.itemTitle}>
              <Text allowFontScaling={false}>买折优惠</Text>
              <Text
                allowFontScaling={false}
                style={styles.textGray}>
                -&yen;
                {orderWrapper.discountPrice()}
              </Text>
            </View>
          )}
          {orderWrapper.pointsPrice() != 0 && (
            <View style={styles.itemTitle}>
              <Text allowFontScaling={false}>积分抵扣</Text>
              <Text
                allowFontScaling={false}
                style={styles.textGray}>
                -&yen;
                {orderWrapper.pointsPrice()}
              </Text>
            </View>
          )}
          {orderWrapper.couponPrice() != 0 && (
            <View style={styles.itemTitle}>
              <Text allowFontScaling={false}>优惠券</Text>
              <Text
                allowFontScaling={false}
                style={styles.textGray}>
                -&yen;
                {orderWrapper.couponPrice()}
              </Text>
            </View>
          )}
          {/*<View style={styles.itemTitle}>*/}
          {/*<Text allowFontScaling={false}>优惠金额（含赠品）</Text>*/}
          {/*<Text style={styles.textGray} allowFontScaling={false}>&yen;0.00</Text>*/}
          {/*</View>*/}
          <View style={styles.itemTitle}>
            <Text allowFontScaling={false}>配送费用</Text>
            <Text style={styles.textGray} allowFontScaling={false}>
              &yen;
              {orderWrapper.deliveryPrice()}
            </Text>
          </View>
          <View style={styles.itemTitle}>
            <Text allowFontScaling={false}>预计可赚</Text>
            <Text style={styles.textGray} allowFontScaling={false}>
              &yen;
              {orderWrapper.commission()}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  /**
   * 付款记录页
   */
  _toPayRecord = (tid) => {
    msg.emit('router: goToNext', {
      routeName: 'PayRecord',
      tId: tid
    });
  };

  _toShipRecord = (id, state) => {
    if (state == '未发货') {
      return;
    } else {
      msg.emit('router: goToNext', {
        routeName: 'ShipRecord',
        tId: id,
        type: 0
      });
    }
  };

  /**
   * 发货记录icon是否显示
   * @param state
   * @returns {boolean}
   * @private
   */
  _isIconVisible = (buySelf, state) => {
    if (state === '未发货' || !buySelf) {
      return false;
    }
    return true;
  };

  /**
   * 发票记录
   */
  _toInvoice = (id) => {
    const { detail } = this.props.relaxProps;
    let orderWrapper = OrderWrapper(detail);
    if (orderWrapper.orderInvoice() == '不需要发票') {
      return;
    } else {
      msg.emit('router: goToNext', {
        routeName: 'InvoiceInfo',
        tid: id
      });
    }
  };

  /**
   * 发票信息是否显示
   */
  _isInvoiceVisible = (invoice) => {
    if (invoice === '不需要发票') {
      return false;
    }
    return true;
  };

  /**
   * 跳转店铺首页
   * @param storeId
   * @private
   */
  _goStore = (storeId) => {
    msg.emit('router: goToNext', { routeName: 'StoreMain', storeId });
  };
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingBottom: 30
  },
  firstItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  middleDetail: {
    flex: 1
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    flex: 1
  },
  middleLeft: {
    flexDirection: 'row',
    flex: 1
  },
  skuName: {
    fontSize: 12,
    flex: 1
  },
  img: {
    width: 80,
    height: 80,
    marginRight: 12,
    borderRadius: 6
  },
  specDetails: {
    fontSize: 12,
    color: '#999'
  },
  middleRight: {
    justifyContent: 'flex-end',
    paddingRight: 12
  },
  otherItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10
  },
  image: {
    height: 55,
    width: 55,
    marginRight: 10,
  },
  imageDom: {
    flexDirection: 'row'
  },
  textDom: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  count: {
    justifyContent: 'center'
  },
  recordRight: {
    flexDirection: 'row'
  },
  center: {
    justifyContent: 'center'
  },
  num: {
    color: '#333',
    fontSize: 14
  },
  arrow: {
    width: 7,
    height: 13,
    marginLeft: 10,
    tintColor: '#333'
  },
  greyLine: {
    backgroundColor: '#fafafa',
    height: 11,
  },
  backItem: {
    backgroundColor: '#ffffff',
    padding: 14,
  },
  backTitle: {
    height: 30,
    justifyContent: 'center'
  },
  box:{
    backgroundColor: 'red',
    borderRadius: 8,
    overflow:'hidden'

  },
  skuHead: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemCount: {
    maxWidth: screenWidth - 60
  },
  remarks: {
    paddingVertical: 10,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#fff',
    borderRadius: 6
  },
  itemTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingTop: 5
  },
  textGray: {
    color: '#333'
  }
});
