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

@Relax
export default class ShipItem extends Component {
  constructor(props) {
    super(props);
  }

  static relaxProps = {
    orderId: 'orderId',
    type: 'type'
  };

  render() {
    const { item } = this.props;

    let total = 0;
    const skuIdSet = fromJS(item.shippingItems)
      .concat(fromJS(item.giftItemList))
      .map((v) => {
        total += v.get('itemNum');
        return v.get('skuId');
      })
      .toSet();

    return (
      <View style={[styles.container, { borderTopColor: mainColor }]}>
        <View style={styles.headItem}>
          <Text style={styles.code} allowFontScaling={false}>
            {item.logistics.logisticCompanyName}
          </Text>
          <Text style={styles.status} allowFontScaling={false}>
            {item.logistics.logisticNo}
          </Text>
        </View>
        <View style={styles.headItem}>
          <Text style={styles.grey} allowFontScaling={false}>
            发货时间{' '}
          </Text>
          <Text style={styles.grey} allowFontScaling={false}>
            {item.deliverTime.split(' ')[0]}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.lineItem, styles.itemContainer]}
          onPress={() => this._toShipList(item.deliverId)}
        >
          <View style={styles.imgContainer}>
            {item.shippingItems.concat(item.giftItemList).map((it, index) => {
              return index < 4 ? (
                <WMImage key={index} style={styles.img} src={it.pic} />
              ) : null;
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
        <View style={styles.lineItem}>
          <View style={styles.bottom}>
            <View style={styles.row}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={() => this._toLogisticInfo(item.deliverId)}
              >
                <Text allowFontScaling={false} style={styles.text}>
                  物流信息
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <Image style={styles.boline} source={require('../img/line.png')} /> */}
      </View>
    );
  }

  _toShipList = (deliverId) => {
    const { orderId, type } = this.props.relaxProps;
    msg.emit('router: goToNext', {
      routeName: 'ShipList',
      orderId: orderId,
      deliverId: deliverId,
      type
    });
  };

  _toLogisticInfo = (deliverId) => {
    const { orderId, type } = this.props.relaxProps;
    msg.emit('router: goToNext', {
      routeName: 'LogisticInfo',
      orderId: orderId,
      deliverId: deliverId,
      type
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
    width: 55,
    height: 55,
    marginRight: 8,
    borderRadius: 4
    // borderColor: '#ebebeb',
    // borderWidth: 1 / PixelRatio.get()
  },
  itemCount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemContainer: {
    paddingVertical: 8,
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
    borderColor: mainColor,
    borderWidth: 1,
    marginLeft: 10,
    borderRadius: 12
  },
  text: {
    fontSize: 10,
    color: mainColor,
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
