import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { msg, Relax } from 'plume2';
import * as WMkit from 'wmkit/kit';
import { Carousel } from '@ant-design/react-native';
import { mainColor } from '@/wmkit/styles';
import {debounce} from 'lodash';

const orderStatus = {
  0: '运输中',
  1: '已揽收',
  2: '问题件',
  3: '已签收',
  4: '已退回',
  5: '派件中',
  6: '退回中',
  7: '转投',
  14: '收件人扫签'
};

@Relax
export default class Order extends React.Component {
  static relaxProps = {
    pointsIsOpen: 'pointsIsOpen',
    evaluateIsOpen: 'evaluateIsOpen',
    logisticsList: 'logisticsList',
    orderTrade:'orderTrade',
  };

  constructor(props) {
    super(props);
    this.state = {
      data: ['1', '2', '3']
    };
  }

  render() {
    const {
      pointsIsOpen,
      evaluateIsOpen,
      logisticsList,
      orderTrade
    } = this.props.relaxProps;
    const carousel = logisticsList.toJS();

    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.nav}
          onPress={debounce(() => {
            if (!WMkit.isLoginOrNotOpen()) {
              msg.emit('loginModal:toggleVisible', {
                callBack: () => {
                  msg.emit('router: goToNext', {
                    routeName: 'OrderList'
                  });
                }
              });
            } else {
              msg.emit('router: goToNext', { routeName: 'OrderList' });
            }
          }, 500)}
        >
          <Text allowFontScaling={false} style={styles.text}>
            订单
          </Text>
          <View style={styles.right}>
            <Text allowFontScaling={false} style={styles.rightText}>
              全部订单
            </Text>
            <Image source={require('../img/arrow.png')} style={styles.icon} />
          </View>
        </TouchableOpacity>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.8}
            onPress={debounce(() => {
              if (!WMkit.isLoginOrNotOpen()) {
                msg.emit('loginModal:toggleVisible', {
                  callBack: () => {
                    msg.emit('router: goToNext', {
                      routeName: 'OrderList',
                      tabKey: 'payState-NOT_PAID'
                    });
                  }
                });
              } else {
                msg.emit('router: goToNext', {
                  routeName: 'OrderList',
                  tabKey: 'payState-NOT_PAID'
                });
              }
            }, 500)}
          >
            <Image source={require('../img/pay.png')} style={styles.img} />
            <Text allowFontScaling={false} style={styles.dark}>
              待支付
            </Text>
            {orderTrade && !!orderTrade.waitPay && orderTrade.waitPay != 0 &&
              <View style={[styles.round, { backgroundColor: mainColor }]}>
                <Text style={styles.roundText}>
                  {orderTrade.waitPay > 99
                    ? '99+'
                    : orderTrade.waitPay}
                </Text>
              </View>
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.8}
            onPress={debounce(() => {
              if (!WMkit.isLoginOrNotOpen()) {
                msg.emit('loginModal:toggleVisible', {
                  callBack: () => {
                    msg.emit('router: goToNext', {
                      routeName: 'OrderList',
                      tabKey: 'flowState-AUDIT'
                    });
                  }
                });
              } else {
                msg.emit('router: goToNext', {
                  routeName: 'OrderList',
                  tabKey: 'flowState-AUDIT'
                });
              }
            }, 500)}
          >
            <Image source={require('../img/ship.png')} style={styles.img} />
            <Text allowFontScaling={false} style={styles.dark}>
              待发货
            </Text>
            {orderTrade && !!orderTrade.waitDeliver && orderTrade.waitDeliver != 0 &&
              <View style={[styles.round, { backgroundColor: mainColor }]}>
                <Text style={styles.roundText}>
                  {orderTrade.waitDeliver > 99
                    ? '99+'
                    : orderTrade.waitDeliver}
                </Text>
              </View>
            }

          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.8}
            onPress={debounce(() => {
              if (!WMkit.isLoginOrNotOpen()) {
                msg.emit('loginModal:toggleVisible', {
                  callBack: () => {
                    msg.emit('router: goToNext', {
                      routeName: 'OrderList',
                      tabKey: 'flowState-DELIVERED'
                    });
                  }
                });
              } else {
                msg.emit('router: goToNext', {
                  routeName: 'OrderList',
                  tabKey: 'flowState-DELIVERED'
                });
              }
            }, 500)}
          >
            <Image source={require('../img/receive.png')} style={styles.img} />
            <Text allowFontScaling={false} style={styles.dark}>
              待收货
            </Text>
            {orderTrade && !!orderTrade.waitReceiving && orderTrade.waitReceiving != 0 &&
              <View style={[styles.round, { backgroundColor: mainColor }]}>
                <Text style={styles.roundText}>
                  {orderTrade.waitReceiving > 99
                    ? '99+'
                    : orderTrade.waitReceiving}
                </Text>
              </View>
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.8}
            onPress={debounce(() => {
              if (!WMkit.isLoginOrNotOpen()) {
                msg.emit('loginModal:toggleVisible', {
                  callBack: () => {
                    msg.emit('router: goToNext', {
                      routeName: 'EvaluateCenter'
                    });
                  }
                });
              } else {
                msg.emit('router: goToNext', { routeName: 'EvaluateCenter' });
              }
            }, 500)}
          >
            <Image
              source={require('../img/evaluate.png')}
              style={styles.img}
            />
            <Text allowFontScaling={false} style={styles.dark}>
              待评价
            </Text>
            {orderTrade && !!orderTrade.waitEvaluate && orderTrade.waitEvaluate != 0 &&
              <View style={[styles.round, { backgroundColor: mainColor }]}>
                <Text style={styles.roundText}>
                  {orderTrade.waitEvaluate > 99
                    ? '99+'
                    : orderTrade.waitEvaluate}
                </Text>
              </View>
            }

          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.8}
            onPress={debounce(() => this._dealNotLogin('RefundList'), 500)}
          >
            <Image source={require('../img/refund.png')} style={styles.img} />
            <Text allowFontScaling={false} style={styles.dark}>
              退货退款
            </Text>
            {orderTrade && !!orderTrade.refund && orderTrade.refund != 0 &&
              <View style={[styles.round, { backgroundColor: mainColor }]}>
                <Text style={styles.roundText}>
                  {orderTrade.refund > 99
                    ? '99+'
                    : orderTrade.refund}
                </Text>
              </View>
            }
          </TouchableOpacity>
        </View>
        {carousel && carousel.length != 0 && (
          <Carousel autoplay>
            {carousel.map((item, index) => {
              const time = item.time;
              console.log('time', time);
              let date;
              if (time)
                date =
                  time.split('-')[1] + '-' + time.split('-')[2].split(' ')[0];

              return (
                <View key={index} style={styles.carousel}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      key={index}
                      style={{ width: 50, height: 50 }}
                      source={{ uri: item.goodsImg }}
                      resizeMode="contain"
                    />
                    <View style={styles.middle}>
                      <Text style={[styles.status, { color: mainColor }]}>
                        {orderStatus[item.state]}
                      </Text>
                      <Text style={styles.desc} numberOfLines={1}>
                        {item.context}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.desc}>{date}</Text>
                </View>
              );
            })}
          </Carousel>
        )}
      </View>
    );
  }

  /**
   * 需要登录但未登录时
   * @param url
   * @private
   */
  _dealNotLogin = (url) => {
    if (!WMkit.isLoginOrNotOpen()) {
      msg.emit('loginModal:toggleVisible', {
        callBack: () => {
          msg.emit('router: goToNext', { routeName: url });
        }
      });
    } else {
      msg.emit('router: goToNext', { routeName: url });
    }
  };

  /**
   * 未开发功能提示
   * @private
   */
  _toBeContinue = () => {
    msg.emit('app:tip', '暂未上线，敬请期待');
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 12
  },
  nav: {
    // height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    paddingHorizontal: 12,
    paddingTop: 15
    //backgroundColor: '#ffffff'
  },
  text: {
    color: '#333',
    fontSize: 14
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightText: {
    color: '#999',
    fontSize: 12
  },
  icon: {
    width: 12,
    height: 12
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#ffffff',
    paddingVertical: 15
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb'
  },
  img: {
    width: 24,
    height: 24,
    marginBottom: 4
    //tintColor: '#000'
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  dark: {
    color: '#999',
    fontSize: 12
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150
  },
  carousel: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    justifyContent: 'space-between'
  },
  middle: {
    marginLeft: 15,
    justifyContent: 'space-between'
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  desc: {
    color: '#999',
    fontSize: 12
  },
  round: {
    position: 'absolute',
    top: -5,
    right: 10,
    marginLeft: 8,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  roundText: {
    color: '#fff',
    fontSize: 10
  },
});
