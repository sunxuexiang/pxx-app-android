import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PixelRatio
} from 'react-native';

import { fromJS } from 'immutable';
import { Relax, msg } from 'plume2';

import { screenWidth, mainColor } from 'wmkit/styles/index';
import WMImage from 'wmkit/image/index';
import FormItem from '../../../wmkit/form/form-item';

@Relax
export default class PickUp extends Component {
  constructor(props) {
    super(props);
  }

  static relaxProps = {
    orderId: 'orderId',
    type: 'type'
  };

  render() {
    const { item,address,order } = this.props;

    let total = 0;
    const skuIdSet = order.giftItemList
      ? fromJS(order.tradeItems)
        .concat(fromJS(order.giftItemList))
        .map((item) => {
          total += item.get('num');
          return item.get('skuId');
        })
        .toSet()
      : fromJS(order.tradeItems)
        .map((item) => {
          total += item.get('num');
          return item.get('skuId');
        })
        .toSet();
    return (
      <View style={[styles.container, { borderTopColor: mainColor }]}>
        <FormItem
          labelName="自提单状态"
          textStyle={{ fontSize: 12, color: '#333' }}
          placeholder={
            order.tradeState.flowState &&
            (order.tradeState.flowState == 'COMPLETED'
              || order.tradeState.flowState == 'CONFIRMED')
              ? '已自提'
              : '待自提'
          }
        />
        <FormItem
          labelName="自提码"
          textStyle={{ fontSize: 12, color: '#333' }}
          placeholder={
            item.pickUpCode ? item.pickUpCode : '-'
          }
        />
        <FormItem
          labelName="自提地址"
          textStyle={{ fontSize: 12, color: '#333' }}
          placeholder={
            address
          }
        />
        <TouchableOpacity
          style={[styles.lineItem, styles.itemContainer]}
          onPress={() => this._toSkuList()}
        >
          <View style={styles.imgContainer}>
          {/*  {order.tradeItems.concat(order.giftItemList).map((it, index) => {
              return index < 4 ? (
                <WMImage key={index} style={styles.img} src={it.pic} />
              ) : null;
            })}*/}

            {order.giftItemList
              ? order.tradeItems.concat(order.giftItemList).map((it, index) => {
                return index < 4 ?  <WMImage key={index} style={styles.img} src={it.pic} /> : null;
              })
              : order.tradeItems.map((it, index) => {
                return index < 4 ?  <WMImage key={index} style={styles.img} src={it.pic} /> : null;
              })}

          </View>
          <View style={styles.itemCount}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.grey} allowFontScaling={false}>
                <Text style={styles.status} allowFontScaling={false}>
                  {skuIdSet.size}
                </Text>
                种{' '}
              </Text>
              <Text style={styles.grey} allowFontScaling={false}>
                共
                <Text style={styles.status} allowFontScaling={false}>
                  {total}
                </Text>
                件
              </Text>
            </View>
            <Image source={require('../img/arrow.png')} style={styles.icon} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _toSkuList = () => {
    const { orderId } = this.props.relaxProps;
    msg.emit('router: goToNext', {
      routeName: 'OrderDetailSkus',
      tId: orderId
    });
  };


}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    paddingHorizontal: 10,
    marginBottom: 10,
    paddingTop: 5,
    backgroundColor: '#fff'
  },
  headItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginVertical: 5
  },
  lineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  img: {
    width: 56,
    height: 56,
    marginRight: 10,
    borderRadius: 4
  },
  itemCount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemContainer: {
    borderColor: '#ebebeb'
  },
  code: {
    fontSize: 14,
    color: '#333333'
  },
  status: {
    fontSize: 12,
    color: '#333'
  },
  grey: {
    fontSize: 12,
    color: '#999'
  },
  icon: {
    width: 7,
    height: 13,
    marginLeft: 5
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1
  },
  boline: {
    width: screenWidth - 21,
    height: 2,
    marginLeft: -10
  },
  btn: {
    width: 64,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#e6e6e6',
    borderWidth: 1,
    marginLeft: 10,
    borderRadius: 12
  },
  text: {
    fontSize: 10,
    color: '#333',
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
