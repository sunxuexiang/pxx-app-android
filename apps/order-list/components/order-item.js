import React from 'react';
import { msg } from 'plume2';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { fromJS } from 'immutable';

import * as _ from 'wmkit/common/util';
import * as Button from 'wmkit/button';
import CountDown from 'wmkit/count-down';

import { screenWidth, mainColor } from 'wmkit/styles/index';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';
const LongButton = Button.LongButton;

/**
 * 订单状态
 * @type {{INIT: string; GROUPON: string; AUDIT: string; DELIVERED_PART: string; DELIVERED: string; CONFIRMED: string; COMPLETED: string; VOID: string}}
 */
const flowState = (status, payState) => {
  if (status == 'INIT') {
    return '待审核';
  } else if (status == 'GROUPON') {
    // 是拼团订单 根据支付状态 ? 待支付 : 待发货
    if (payState == 'NOT_PAID') {
      return '待支付';
    } else if (payState == 'UNCONFIRMED') {
      return '待确认';
    } else if (payState == 'PAID') {
      return '待发货';
    }
  } else if (status == 'AUDIT' && payState == 'NOT_PAID') {
    return '待支付';
  } else if (status == 'WAIT_PAY_EARNEST' && payState == 'NOT_PAID') {
    return '待支付定金';
  } else if (
    (status == 'WAIT_PAY_TAIL' && payState == 'PAID_EARNEST') ||
    (status == 'AUDIT' && payState == 'PAID_EARNEST')
  ) {
    return '待支付尾款';
  } else if (status == 'CONFIRMED') {
    return '已收货';
  } else if (status == 'AUDIT' || status == 'DELIVERED_PART') {
    return '待发货';
  } else if (status == 'DELIVERED') {
    return '待收货';
  } else if (status == 'COMPLETED') {
    return '已完成';
  } else if (status == 'VOID') {
    return '已作废';
  }else if (status == 'TOPICKUP') {
    if (payState == 'NOT_PAID') {
      return '待支付';
    } else if (payState == 'UNCONFIRMED') {
      return '待确认';
    } else if (payState == 'PAID') {
      return '待自提';
    }
  }
};

export default class OrderItem extends React.Component {
  constructor(props) {
    super(props);
    //debug
    window._store = this;
  }

  render() {
    const { item: order, orderListType } = this.props;
    const gifts = order.gifts || [];
    const endTime = order.orderTimeOut ? moment(order.orderTimeOut) : null;
    return (
      <View style={styles.container}>
        <View style={styles.lineItem}>
          <View style={styles.codeContainer}>
            {/* <ImageBackground
              style={styles.bg}
              source={require('../img/tag.png')}
            >
              <Text style={styles.white} allowFontScaling={false}>
                {order.platform == 'CUSTOMER' ? '订' : '代'}
              </Text>
            </ImageBackground> */}
            {order.supplier && order.supplier.isSelf && <SelfSalesLabel />}
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
                <Image
                  source={require('../img/arrow.png')}
                  style={styles.arrow}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Text
            style={[
              order.tradeState.flowState == 'COMPLETED' ||
              order.tradeState.flowState == 'CONFIRMED' ||
              order.tradeState.flowState == 'VOID'
                ? styles.status
                : styles.status2,
                order.tradeState.flowState == 'COMPLETED' ||
                order.tradeState.flowState == 'CONFIRMED' ||
                order.tradeState.flowState == 'VOID'? {} : {color: mainColor}
            ]}
            allowFontScaling={false}
          >
            {/*{FLOW_STATE[order.tradeState.flowState]}*/}
            {flowState(order.tradeState.flowState, order.tradeState.payState)}
          </Text>
        </View>

        {
          //普通：0 明细：1
          orderListType === 0 ? (
            <TouchableOpacity
              style={[styles.lineItem, styles.itemContainer]}
              onPress={() =>
                msg.emit('router: goToNext', {
                  routeName: 'OrderDetail',
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
                          ? { uri: `${item.pic}?x-oss-process=image/format,jpg/interlace,1,image/resize,m_mfit,w_100,h_100` }
                          : require('../img/none.png')
                      }
                    />
                  ))}
              </View>
              <View style={styles.itemCount}>
                <Text style={styles.grey} allowFontScaling={false}>
                  {order.goodsTotalNum || this._countNum(order)}
                </Text>
                <Image
                  source={require('../img/arrow.png')}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.lineItem,
                styles.itemContainer,
                { flexDirection: 'column' }
              ]}
              onPress={() =>
                msg.emit('router: goToNext', {
                  routeName: 'OrderDetail',
                  oId: order.id
                })
              }
            >
              {order.tradeItems
                .concat(gifts)
                .filter((val, index) => index < 4)
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
                        <View style={styles.detail}>
                          <Text style={styles.skuName} numberOfLines={1}>
                            {item.skuName}
                          </Text>
                          <Text style={styles.specDetails}>
                            {item.specDetails ? item.specDetails : ''}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.middleRight}>
                        <Text style={styles.middlePrice}>
                          {'￥' + item.price.toFixed(2)}
                        </Text>
                        <Text style={styles.number}>{'x' + item.num}</Text>
                      </View>
                    </View>
                  );
                })}
            </TouchableOpacity>
          )
        }
        <View>
          <View style={[styles.bottom]}>
            <View style={{marginVertical:3, flex: 1}}>
              <Text
                style={[styles.price, {color: mainColor}]}
                allowFontScaling={false}
                numberOfLines={1}
              >{`¥ ${_.addZero(order.tradePrice.totalPrice)}`}</Text>
            </View>
            <View style={{flexDirection:'row',marginLeft:'auto'}}>
              {this._caculateButton(fromJS(order)).available.map(
                (availableButton,index) => {
                  //订单已完成且超过退货时间
                  return (
                    <View>
                      <LongButton
                        key={Math.random()}
                        activeOpacity={0.8}
                        btnStyle={[
                          styles.btn,
                          availableButton === '去付款' && {
                            backgroundColor: mainColor,
                            borderColor: 'transparent'
                          },
                          { borderRadius: 18, borderColor: mainColor, height: 26,overflow:'hidden' }
                        ]}
                        boxStyle={styles.box}
                        onClick={() =>
                          this._operationButtons(
                            order.id,
                            availableButton,
                            order.payInfo.payTypeId,
                            order.tradePrice.totalPrice,
                            order.deliverWay
                          )
                        }
                        btnTextStyle={[
                          styles.text,
                          availableButton === '去付款' ? {
                            color: '#fff',
                            fontWeight: 'bold'
                          } : {color: mainColor}
                        ]}
                        text={availableButton}
                      />
                    </View>
                  );
                }
              )}
            </View>
          </View>
          <View>
            {this.props.serverTime != 0 &&
              !!endTime &&
              order.tradeState.payState == 'NOT_PAID' &&
              order.tradeState.flowState != 'VOID' &&
              order.tradeState.auditState != 'NON_CHECKED' ? (
                <CountDown
                  style={{ flexDirection: 'row',marginBottom:3 }}
                  numberOfLines={1}
                  timerName="OrderList"
                  endHandle={() =>
                    msg.emit('router: refreshRoute', {
                      routeName: 'OrderList'
                    })
                  }
                  timeOffset={moment
                    .duration(endTime.diff(this.props.serverTime))
                    .asSeconds()
                    .toFixed(0)}
                  // timeOffset={5}
                  timeTextStyle={{
                    color: mainColor,
                    justifyContent: 'flex-start'
                  }}
                  label={'支付倒计时:'}
                />
              ) : null}
          </View>
        </View>
        {/* <Image style={styles.boline} source={require('../img/line.png')} /> */}
      </View>
    );
  }

  /**
   * 订单按钮event handler
   */
  _operationButtons = async (tid, button, payTypeId, totalPrice, deliverWay) => {
    const { cancelOrder, applyRefund, defaultPay, againBuy,confirm } = this.props;
    if (button === '去付款' && totalPrice == '0.00') {
      //0元素订单直接调默认支付接口
      defaultPay(tid);
    } else if (button === '去付款' && payTypeId == 0) {
      msg.emit('router: goToNext', { routeName: 'PayOrder', tid });
    } else if (button === '去付款' && payTypeId == 1) {
      msg.emit('router: goToNext', { routeName: 'FillPayment', tid });
    } else if (button === '取消订单') {
      cancelOrder(tid);
    } else if (button === '确认收货') {
      if (deliverWay == 3) {
        confirm(tid);
      } else {
        msg.emit('router: goToNext', {
          routeName: 'ShipRecord',
          tId: tid,
          type: 0
        });
      }
    } else if (button === '退货退款') {
      applyRefund(tid);
    } else if (button == '支付定金' && payTypeId == 0 && totalPrice != 0) {
      msg.emit('router: goToNext', {
        routeName: 'PayOrder',
        tid
      });
    } else if (button == '支付尾款' && payTypeId == 0 && totalPrice != 0) {
      msg.emit('router: goToNext', {
        routeName: 'OrderDetail',
        oId: tid
      });
    } else if (button === '再次购买' || button === '恢复订单') {
      againBuy(tid);
    }
  };

  _caculateButton = (order) => {
    let orderButtons = {
      available: [],
      id: ''
    };

    if (order) {
      // if(order.get('id')){
      //   console.log(Promise.resolve(this._isAbleReturn(order.get('id')))._55)
      // }
      const flow = order.getIn(['tradeState', 'flowState']);
      const pay = order.getIn(['tradeState', 'payState']);
      const deliverStatus = order.getIn(['tradeState', 'deliverStatus']);
      //配送方式
      const deliverWay = order.get('deliverWay');
      //取消订单
      const cancelButtons = [
        ['INIT', 'NOT_PAID'],
        ['AUDIT', 'NOT_PAID'],
        ['GROUPON', 'NOT_PAID']
      ];
      //付款
      const payButtons = [
        ['AUDIT', 'NOT_PAID'],
        ['DELIVERED_PART', 'NOT_PAID'],
        ['DELIVERED', 'NOT_PAID'],
        ['CONFIRMED', 'NOT_PAID'],
        ['GROUPON', 'NOT_PAID'],
        ['AUDIT', 'PAID_EARNEST']
      ];
      //确认收货
      const confirmButtons = [
        ['DELIVERED', 'NOT_PAID'],
        ['DELIVERED', 'PAID'],
        ['DELIVERED', 'UNCONFIRMED']
      ];
      //再次购买
      const againBuy = [
        ['COMPLETED', 'PAID']
      ];
      //已作废
      const recoveryBuy = [
        ['VOID', 'PAID'],
        ['VOID', 'NOT_PAID'],
      ];
      //待支付定金
      const presaleDepositButtons = [['WAIT_PAY_EARNEST', 'NOT_PAID']];
      //待支付尾款
      const presaleBalanceButtons = [['WAIT_PAY_TAIL', 'PAID_EARNEST']];

      //退货退款
      let canReturnFlag = order.get('canReturnFlag');

      if (flow == 'GROUPON' || deliverWay == 3) {
        // 待成团单，不展示退货退款
        // 自提订单，不展示退货退款
        canReturnFlag = false;
      }
      const {deliveryStatus} = this.props;
      let availables = Array();
      payButtons.filter((button) => this._calc(button)(flow, pay)).length > 0
        ? availables.push('去付款')
        : null;

      presaleDepositButtons.filter((button) => this._calc(button)(flow, pay))
        .length > 0
        ? availables.push('支付定金')
        : null;

      presaleBalanceButtons.filter((button) => this._calc(button)(flow, pay))
        .length > 0
        ? availables.push('支付尾款')
        : null;
      let confirmGoods = confirmButtons.filter((button) => this._calc(button)(flow, pay)).length > 0;
      if (
        confirmGoods ||
        (deliverWay == 3 && flow == 'TOPICKUP' && pay == 'PAID' && deliverStatus == 'SHIPPED' && deliveryStatus)
      ) {
        availables.push('确认收货');
      }
      // confirmButtons.filter((button) => this._calc(button)(flow, pay)).length >
      // 0
      //   ? availables.push('确认收货')
      //   : null;
      cancelButtons.filter((button) => this._calc(button)(flow, pay)).length > 0
        ? availables.push('取消订单')
        : null;

      // if (againBuy.filter(button => this._calc(button)(flow, pay)).length > 0) {
      //   availables.push('再次购买');
      // }
      // if (recoveryBuy.filter(button => this._calc(button)(flow, pay)).length > 0) {
      //   availables.push('再次购买');
      // }

      canReturnFlag ? availables.push('退货退款') : null;
      availables.push('再次购买');
      orderButtons['available'] = availables;
      orderButtons['id'] = order.get('id');
    }
    return orderButtons;
  };

  /**
   * 计算订单有效按钮
   */
  _calc = (button) => {
    return function (flow, pay) {
      return button[0] === flow && button[1] === pay;
    };
  };

  /**
   * 跳转至店铺首页
   * @private
   */
  _goStore = (storeId) => {
    msg.emit('router: goToNext', { routeName: 'StoreMain', storeId });
  };

  /**
   * 这个字段是后加的，为了旧数据订单没有加了这个方法
   * @param order
   * @private
   */
  _countNum = (order) => {
    let goodsTotalNum = 0;

    order.tradeItems.forEach((tradeItem) => {
      goodsTotalNum += tradeItem.num;
    });
    if (order.gifts) {
      order.gifts.forEach((gift) => {
        goodsTotalNum += gift.num;
      });
    }
    return goodsTotalNum;
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
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 6
  },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    marginRight: 10
  },
  itemCount: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemContainer: {
    paddingTop: 20
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
    fontSize: 14,
    color: '#333333'
  },
  arrow: {
    width: 12,
    height: 12
  },
  status: {
    fontSize: 14,
    color: '#999'
  },
  status2: {
    fontSize: 14
  },
  grey: {
    fontSize: 14,
    color: '#333'
  },
  icon: {
    width: 7,
    height: 13,
    marginLeft: 5,
    tintColor: '#000'
  },
  bottom: {
    marginTop:5,
    flexWrap:'wrap',
    flexDirection:'row',
    flex:1,
    justifyContent:'space-between'
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold'
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
    marginLeft: 6,
    backgroundColor: '#ffffff'
  },
  box: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0
  },
  text: {
    fontSize: 13
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    //width: screenWidth - 44,
    marginBottom: 10
  },
  middleLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
    // width: '85%'
  },
  skuName: {
    fontSize: 13,
    color: '#333'
    // flex: 1
  },
  specDetails: {
    fontSize: 12,
    color: '#999'
  },
  middleRight: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  detail: {
    flexDirection: 'column',
    flex: 1
  },

  middlePrice: {
    color: '#aaa',
    fontSize: 13
  },
  number: {
    color: '#aaa',
    fontSize: 13
  }
});
