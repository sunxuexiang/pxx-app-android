import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  PixelRatio,
  Image,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as T from '../types';
import CountDown from 'wmkit/count-down';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { GrouponTradeVO } from '../../../web-api/TradeBaseController';
import { mainColor, screenWidth } from 'wmkit/styles/index';
import moment from 'moment';
import { msg } from 'plume2';
import WMImage from 'wmkit/image/index';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';
import Price from '../../../../wmkit/biz/cartprice';
import Time from '../../../../wmkit/biz/time';

const GROUPON_STATE = {
  0: '待支付',
  1: '拼团中，已支付',
  2: '拼团成功，已支付',
  3: '拼团失败，金额退回',
  4: '拼团失败，订单未支付'
};

type IOrderItemProps = T.IProps & T.IOrderItemProps;

@connect<Partial<IOrderItemProps>, T.IOrderItemState>(store2Props, actions)
export default class OrderItem extends React.Component<
  Partial<IOrderItemProps>,
  T.IOrderItemState
> {
  constructor(props: IOrderItemProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: { action },
      main,
      item,
      serverTime
    } = this.props;
    const tradeItem = item && item.tradeItems[0] ? item.tradeItems[0] : null;
    const grouponInstance = item && item.grouponInstance;
    //拼团结束时间
    const orderStatus = this._orderStatus(item);
    let endTime;
    let countDown_labelText;
    if (orderStatus == 0) {
      endTime = item.orderTimeOut && moment(item.orderTimeOut);
      countDown_labelText = '支付倒计时';
    } else {
      endTime = grouponInstance && moment(grouponInstance.endTime);
      countDown_labelText = '拼团倒计时';
    }
    return (
      <View style={styles.container}>
        <View style={styles.order}>
          <TouchableOpacity
            style={styles.top}
            activeOpacity={0.8}
            onPress={() => this._handleLink(item)}
          >
            {item.supplier.isSelf && <SelfSalesLabel />}
            <Text
              allowFontScaling={false}
              style={[styles.topText, styles.topTextWidth]}
              numberOfLines={1}
            >
              &nbsp;
              {item.supplier.storeName}
            </Text>
            <Text allowFontScaling={false} style={[styles.topText, styles.red, { color: mainColor }]}>
              {GROUPON_STATE[this._orderStatus(item)]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.middle}
            onPress={() => this._handleLink(item)}
          >
            <View>
              {tradeItem.pic ? (
                <WMImage style={styles.img} src={tradeItem.pic} />
              ) : (
                <Image style={styles.img} source={require('../img/none.png')} />
              )}
            </View>
            <View style={styles.middleRight}>
              <View style={styles.midLeft}>
                <View>
                  <Text
                    allowFontScaling={false}
                    style={styles.skuName}
                    numberOfLines={2}
                  >
                    {tradeItem.skuName}
                  </Text>
                  {item.tradeItems[0].specDetails && (
                    <Text style={styles.spec}>
                      {item.tradeItems[0].specDetails}
                    </Text>
                  )}
                </View>
                <View style={styles.price}>
                  <View style={styles.pri}>
                    <Text
                      allowFontScaling={false}
                      style={[styles.skuNum, { marginRight: 2,marginBottom:2 }]}
                    >
                      实际付款
                    </Text>
                    <Price price={item.tradePrice.totalPrice.toFixed(2)} />
                  </View>
                  <Text allowFontScaling={false} style={styles.skuNum}>
                    x{tradeItem.num}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.bottom}>
            {(this._orderStatus(item) == 0 ||
              (this._orderStatus(item) == 1 && grouponInstance)) && (
              <View style={styles.bottomLeft}>
                <Time
                  timerName="GroupOrderList"
                  showTimeDays={true}
                  style={{ flexDirection: 'row' }}
                  label={countDown_labelText}
                  labelText={[styles.skuNames, styles.timeText]}
                  allowFontScaling={false}
                  numberOfLines={1}
                  endHandle={() =>
                    setTimeout(() => {
                      msg.emit('router: refreshRoute', {
                        routeName: 'GroupOrderList'
                      });
                    }, 2000)
                  }
                  //endHandle={() => action.endHandle()}
                  timeTextStyle={[styles.skuName, styles.timeText, styles.red, { color: mainColor }]}
                  showTimeDayStyle={{
                    paddingHorizontal: 2,
                    paddingVertical: 0}}
                  timeOffset={moment
                    .duration(endTime.diff(serverTime))
                    .asSeconds()
                    .toFixed(0)}
                  // timeOffset={8}
                />
              </View>
            )}
            {this._orderStatus(item) == 1 && grouponInstance && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this._handleLink(item)}
              >
                <LinearGradient
                  colors={[mainColor, mainColor]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.bottomRight}
                >
                  <Text allowFontScaling={false} style={styles.btnText}>
                    还差
                    {grouponInstance.grouponNum - grouponInstance.joinNum}
                    人&nbsp;&nbsp;邀请参团
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }

  _handleLink = (order) => {
    const orderStatus = this._orderStatus(order);
    //待支付,跳转至订单列表
    if (orderStatus == 0) {
      msg.emit('router: goToNext', {
        routeName: 'OrderList',
        tabKey: 'payState-NOT_PAID'
      });
    } else if (orderStatus == 1) {
      //拼团中，去团详情
      msg.emit('router: goToNext', {
        routeName: 'GroupBuyDetail',
        grouponNo: order.tradeGroupon.grouponNo
      });
    } else {
      //去订单详情
      msg.emit('router: goToNext', {
        routeName: 'OrderDetail',
        oId: order.id
      });
    }
  };

  /**
   * 拼团状态
   */
  _orderStatus = (order) => {
    let text = 0;

    if (order.tradeGroupon && order.tradeState) {
      let gs = order.tradeGroupon.grouponOrderStatus;
      let ps = order.tradeState.payState;
      // 待支付
      if (gs == 1 && ps == 'NOT_PAID') {
        text = 0;
      }
      // 拼团中，已支付拼团中，已支付
      if (gs == 1 && ps == 'PAID') {
        text = 1;
      }
      // 拼团成功，已支付
      if (gs == 2 && ps == 'PAID') {
        text = 2;
      }
      // 拼团失败，金额退回
      if (gs == 3 && ps == 'PAID') {
        text = 3;
      }
      // 拼团失败，订单未支付
      if (gs == 3 && ps == 'NOT_PAID') {
        text = 4;
      }
    }

    return text;
  };
}

const styles = StyleSheet.create({
  orderItem: {},
  container: {
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    marginTop: 12
  },
  order: {
    paddingVertical: 17,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    flex: 1,
    overflow: 'hidden'
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  topText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(0,0,0,0.8)',
    lineHeight: 16
  },
  red: {
    fontSize: 10,
    lineHeight: 16
  },
  topTextWidth: {
    flex: 1
  },
  middle: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 15
  },
  midLeft: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 2
  },
  middleRight: {
    marginLeft: 12,
    flex: 1
  },
  skuName: {
    fontSize: 12,
    lineHeight: 16,
    color: 'rgba(0,0,0,0.8)'
  },
  skuNames: {
    fontSize: 12,
    lineHeight: 22,
    color: 'rgba(0,0,0,0.8)',
    marginRight: 8
  },
  spec: {
    fontSize: 10,
    // lineHeight: 10,
    color: 'rgba(0,0,0,0.4)',
    marginTop: 4
  },
  pay: {
    flexDirection: 'row'
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end'
  },
  skuNum: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.4)'
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  pri: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  totalPrice: {},
  bottom: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottomRight: {
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center'
  },
  btnText: {
    color: '#fff',
    fontSize: 12,
    // lineHeight: 12
  },
  timeText: {
    // marginLeft: 10
  }
});
