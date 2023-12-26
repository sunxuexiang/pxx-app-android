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
import { Relax, msg } from 'plume2';

import { priceColor, screenWidth } from 'wmkit/styles/index';

import OrderWrapper from 'wmkit/order-wrapper';
import WMImage from 'wmkit/image/index';
import FormSelect from 'wmkit/form/form-select';
import FormItem from 'wmkit/form/form-item';
import { noop } from 'wmkit/noop';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';

@Relax
export default class OrderGoods extends Component {
  static relaxProps = {
    detail: 'detail',
    changeAnnexMask: noop
  };

  render() {
    const { detail, changeAnnexMask } = this.props.relaxProps;
    let orderWrapper = OrderWrapper(detail);
    return (
      <View style={styles.container}>
        <View style={styles.box}>

        
        <View style={styles.skuHead}>
          {orderWrapper.isSelf() ? <SelfSalesLabel /> : null}
          <TouchableOpacity
            style={styles.itemCount}
            activeOpacity={0.8}
            /*onPress={() => this._goStore(orderWrapper.storeId())}*/
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
              routeName: 'PointsOrderDetailSkus',
              tId: orderWrapper.orderNo()
            });
          }}
        >
          <View style={styles.imageDom}>
            {orderWrapper
              .tradeItems()
              .concat(orderWrapper.gifts())
              .toJS()
              .map((v, k) => {
                if (k < 4) {
                  return <WMImage key={k} style={styles.image} src={v.pic} />;
                }
              })}
          </View>
          <View style={styles.textDom}>
            <View style={styles.count}>
              <Text style={styles.num} allowFontScaling={false}>
                x{orderWrapper.tradeItems().concat(orderWrapper.gifts()).size}
              </Text>
              {/*<Text style={styles.num} allowFontScaling={false}>共{orderWrapper.totalNum()}件</Text>*/}
            </View>
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
            this._toShipRecord(
              orderWrapper.orderNo(),
              orderWrapper.orderDeliveryState()
            )
          }
          disabled={!this._isIconVisible(orderWrapper.orderDeliveryState())}
          iconVisible={this._isIconVisible(orderWrapper.orderDeliveryState())}
        />

      </View>
        <View style={styles.box}>
        <FormItem
          labelName="订单备注"
          itemStyle={{
            borderBottomWidth: 0,
            paddingVertical: 10,
            paddingHorizontal: 12
          }}
          placeholder={orderWrapper.buyerRemark()}
        />
        <FormItem
          labelName="卖家备注"
          itemStyle={{
            borderBottomWidth: 0,
            paddingVertical: 10,
            paddingHorizontal: 12
          }}
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


        <View style={styles.remarks}>
          <View style={styles.itemTitle}>
            <Text allowFontScaling={false}>订单积分</Text>
            <Text style={{ color: priceColor }} allowFontScaling={false}>
              {orderWrapper.points()}
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
  _isIconVisible = (state) => {
    if (state === '未发货') {
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
    // backgroundColor: '#fff',
    // borderTopWidth: 1 / PixelRatio.get(),
    // borderTopColor: '#ebebeb'
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 12,
    marginBottom: 12,
    paddingVertical: 10
  },
  firstItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    alignItems: 'center',
    paddingTop: 10
  },
  otherItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10
  },
  image: {
    height: 55,
    width: 55,
    marginRight: 10,
    borderColor: '#ebebeb',
    borderWidth: 1 / PixelRatio.get(),
    borderRadius: 6
  },
  imageDom: {
    flexDirection: 'row'
  },
  textDom: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight:12
  },
  count: {
    justifyContent: 'center',
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
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1 / PixelRatio.get()
  },
  backItem: {
    backgroundColor: '#ffffff',
    padding: 14,
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb'
  },
  backTitle: {
    height: 30,
    justifyContent: 'center'
  },
  skuHead: {
    paddingTop: 12,
    paddingLeft: 10,
    paddingRight: 10,
    // backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemCount: {
    maxWidth: screenWidth - 60
  },
  remarks: {
    paddingVertical: 16,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 8,
    marginHorizontal: 12,
    backgroundColor: '#fff'
  },
  itemTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textGray: {
    color: '#333'
  }
});
