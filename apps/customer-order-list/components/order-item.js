import React from 'react';
import { msg } from 'plume2';
import {
  Image,
  ImageBackground,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import * as _ from 'wmkit/common/util';

import { priceColor, screenWidth } from 'wmkit/styles/index';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';

/**
 * 订单状态
 * @type {{INIT: string; GROUPON: string; AUDIT: string; DELIVERED_PART: string; DELIVERED: string; CONFIRMED: string; COMPLETED: string; VOID: string}}
 */
const flowState = (status, payState) => {
  if (status == 'INIT') {
    return '待审核';
  } else if (status == 'GROUPON') {
    if (payState == 'NOT_PAID') {
      return '待发货';
    }
  } else if (status == 'AUDIT' || status == 'DELIVERED_PART') {
    return '待发货';
  } else if (status == 'DELIVERED') {
    return '待收货';
  } else if (status == 'CONFIRMED') {
    return '已收货';
  } else if (status == 'COMPLETED') {
    return '已完成';
  } else if (status == 'VOID') {
    return '已作废';
  }
};

export default class OrderItem extends React.Component {
  constructor(props) {
    super(props);
    //debug
    window._store = this;
  }

  render() {
    const { item: order } = this.props;
    const gifts = order.gifts || [];
    const isShowPurchase = order.buyer.id == order.inviteeId;
    return (
      <View style={styles.container}>
        <View style={styles.lineItem}>
          <View style={styles.codeContainer}>
            <ImageBackground
              style={styles.bg}
              source={require('../img/tag.png')}
            >
              <Text style={styles.white} allowFontScaling={false}>
                {order.platform == 'CUSTOMER' ? '订' : '代'}
              </Text>
            </ImageBackground>
            {order.supplier && order.supplier.isSelf && <SelfSalesLabel/>}
            <TouchableOpacity
             /* onPress={() => this._goStore(order.supplier.storeId)}*/
            >
              <View style={styles.itemCount}>
                <Text
                  style={styles.code}
                  allowFontScaling={false}
                  numberOfLines={1}
                >
                  {order.supplier && order.supplier.storeName}
                </Text>
                <Image source={require('../img/arrown.png')} style={styles.icon}/>
              </View>
            </TouchableOpacity>
          </View>
          <Text
            style={flowState(order.tradeState.flowState, order.tradeState.payState) == '待发货' ? styles.statusReceive : styles.status}
            allowFontScaling={false}>
            {/*{FLOW_STATE[order.tradeState.flowState]}*/}
            {flowState(order.tradeState.flowState, order.tradeState.payState)}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.lineItem, styles.itemContainer]}
          onPress={() =>
            msg.emit('router: goToNext', {
              routeName: 'CustomerOrderDetail',
              oId: order.id
            })
          }
        >
          <View style={styles.imgContainer}>
            {order.tradeItems
              .concat(gifts)
              .filter((val, index) => index < 4)
              .map((item) => (
                <Image
                  style={styles.img}
                  key={Math.random().toString()}
                  source={
                    item.pic
                      ? {
                        uri: item.pic
                      }
                      : require('../img/none.png')
                  }
                />
              ))}
          </View>
          <View style={styles.itemCount}>
            <Text style={styles.grey} allowFontScaling={false}>
              {order.tradeItems.concat(gifts).length}
            </Text>
            <Image source={require('../img/arrown.png')} style={styles.icon}/>
          </View>
        </TouchableOpacity>
        <View style={styles.lineItem}>
          <View style={styles.bottom}>
            <View style={styles.bottomLeft}>
              <Text style={[styles.price, {color: priceColor}]} allowFontScaling={false}>
                {`¥ ${_.addZero(order.tradePrice.totalPrice)}`}
              </Text>
              {order.commission
                ? order.commission != 0 && (
                <Text style={styles.commission} allowFontScaling={false}>
                  <Text style={styles.iconfont} allowFontScaling={false}>&nbsp;&nbsp;/预计可赚&nbsp;</Text>
                  <Text style={styles.commissionPrice}>￥{_.addZero(order.commission)}</Text>
                </Text>
              )
                : null}
            </View>
            {isShowPurchase && (
              <View style={styles.selfBuy}>
                <Text style={styles.selfBuyText} allowFontScaling={false}>
                  自购
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }

  /**
   * 跳转至店铺首页
   * @private
   */
  _goStore = (storeId) => {
    msg.emit('router: goToNext', {
      routeName: 'StoreMain',
      storeId
    });
  };

  // _isAbleReturn=(id)=>{
  //   return new Promise((resolve)=>{
  //     const res =  webapi.isAbleReturn(id)
  //     if(res.code=="K-000000"){
  //       resolve(true)
  //     }else{
  //       resolve(false)
  //     }
  //   })
  // }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 12
  },
  lineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: screenWidth - 150
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  iconfont:{
    color:'rgba(0,0,0,.4)',
    fontSize: 11,
  },
  commissionPrice:{
    color:'#f60',
    fontSize: 12,
  },
  img: {
    width: 55,
    height: 55,
    marginRight: 10,
    borderColor: '#ebebeb',
    borderWidth: 1 / PixelRatio.get()
  },
  itemCount: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemContainer: {
    borderColor: '#ebebeb'
  },
  bg: {
    width: 19,
    height: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 3
  },
  white: {
    color: '#ffffff',
    fontSize: 10,
    backgroundColor: 'transparent'
  },
  code: {
    fontSize: 15,
    color: '#333333'
  },
  statusReceive: {
    color: '#f60',
    fontSize: 13,
  },
  status: {
    fontSize: 13,
    color: 'rgba(0,0,0,.4)'
  },
  grey: {
    fontSize: 14,
    color: '#000'
  },
  icon: {
    width: 7,
    height: 13,
    marginLeft: 5,
    tintColor: '#000'
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1
  },
  bottomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  price: {
    fontSize: 14
  },
  boline: {
    width: screenWidth - 21,
    height: 2,
    marginLeft: -10
  },
  btn: {
    width: 75,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 1,
    marginLeft: 10,
    backgroundColor: '#ffffff'
  },
  box: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0
  },
  text: {
    fontSize: 13,
    color: '#000'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  commission: {
    fontSize: 14,
    color: '#333'
  },
  selfBuy: {
    width: 45,
    height: 20,
    backgroundColor: '#fff',
    borderColor: '#E6E6E6',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  selfBuyText: {
    fontSize: 10,
    color: '#000'
  }
});
