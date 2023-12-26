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
  TouchableOpacity
} from 'react-native';
import { Relax, msg } from 'plume2';
import { fromJS } from 'immutable';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';
import WMImage from 'wmkit/image/index';

@Relax
export default class OrderGoods extends Component {
  static relaxProps = {
    detail: 'detail'
  };

  render() {
    const { detail } = this.props.relaxProps;
    const returnType = detail.get('returnType');

    const returnItems = detail.get('returnItems') || fromJS([]);
    const returnGifts = detail.get('returnGifts') || fromJS([]);
    //全部商品(商品+赠品)
    const items = returnItems.concat(returnGifts);

    // 商品类型总数
    const itemCount = items.size;

    const storeId = detail.getIn(['company', 'storeId']);
    const totalPrice = detail.getIn(['returnPrice', 'totalPrice']);
    const companyType = detail.getIn(['company', 'companyType']);
    const storeName = detail.getIn(['company', 'storeName']);
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.otherItem}
          /*onPress={() => {
            msg.emit('router: goToNext', {
              routeName: 'StoreMain',
              storeId: storeId
            });
          }}*/
        >
          <View style={styles.storeItem}>
            {companyType == 0 && <SelfSalesLabel />}
            <Text allowFontScaling={false}>{storeName}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.firstItem}
          onPress={() => {
            msg.emit('router: goToNext', {
              routeName: 'ReturnGoodsList',
              rid: detail.get('id'),
              totalPrice: totalPrice,
            });
          }}
        >
          <View style={styles.imageDom}>
            {items.map((item, index) => {
              return index < 4 ? (
                <WMImage
                  key={index}
                  style={styles.image}
                  src={item.get('pic')}
                />
              ) : null;
            })}
          </View>
          <View style={styles.textDom}>
            <View style={styles.count}>
              <Text style={styles.num} allowFontScaling={false}>
                {itemCount}
              </Text>
            </View>
            <Image source={require('../img/arrow.png')} style={styles.arrow} />
          </View>
        </TouchableOpacity>

        {/**退货才有物流信息**/
        returnType == 'RETURN' ? (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.otherItem}
            onPress={() => {
              msg.emit('router: goToNext', {
                routeName: 'ReturnLogisticInfo',
                rid: detail.get('id')
              });
            }}
          >
            <Text allowFontScaling={false}>退货物流信息</Text>
            <Image source={require('../img/arrow.png')} style={styles.arrow} />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8
    // borderTopWidth: 1 / PixelRatio.get(),
    // borderTopColor: '#ebebeb'
  },
  firstItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    alignItems: 'center',
    padding: 10
  },
  otherItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10
  },
  image: {
    height: 55,
    width: 55,
    marginRight: 10
    // borderColor: '#ebebeb',
    // borderWidth: 1 / PixelRatio.get()
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
    marginLeft: 10
  },
  storeItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});
