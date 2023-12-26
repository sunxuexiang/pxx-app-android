import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { screenWidth } from 'wmkit/styles/index';
import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { msg } from 'plume2';
import { cache } from 'wmkit/cache';
import * as _ from 'wmkit/common/util';
import LinearGradient from 'react-native-linear-gradient';
type IMySalesProps = T.IProps & T.IMySalesProps;

@connect<Partial<IMySalesProps>, T.IMySalesState>(
  store2Props,
  actions
)
export default class MySales extends React.Component<
Partial<IMySalesProps>,
T.IMySalesState
> {
  constructor(props: IMySalesProps) {
    super(props);
    // 小眼睛显示还是隐藏
    AsyncStorage.getItem(cache.MY_PERFORMANCE).then((res) => {
      if (res === 'true' || res == null || res == undefined) {
        this.setState({ showFlag: true });
      } else {
        this.setState({ showFlag: false });
      }
    });
  }

  /**

*/
  render() {
    if (!this.state) {
      return null;
    }

    let {
      main: {
        // 分销员昨天销售业绩
        yesterdayPerformance,
        // 分销员本月销售业绩
        monthPerformance,
        customerBalance
      }
    } = this.props;

    const { showFlag } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.containerInner}>
          <View style={styles.nav}>
            <View style={styles.leftBox}>
              <Text style={styles.title} allowFontScaling={false}>
                我的销售业绩
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this._onEyeClick()}
              >
                <Image
                  style={styles.eye}
                  source={
                    showFlag
                      ? require('../img/eye.png')
                      : require('../img/close-eye.png')
                  }
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.rightBox}
              activeOpacity={0.8}
              onPress={() => {
                msg.emit('router: goToNext', {
                  routeName: 'CustomerOrderList'
                });
              }}
            >
              <Text style={styles.orderName} allowFontScaling={false}>
                推广订单
              </Text>
              <Image
                style={styles.arrow}
                source={require('../img/arrow.png')}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              msg.emit('router: goToNext', {
                routeName: 'SalesPerform'
              });
            }}
          >
            <View style={styles.performance}>
              <View style={styles.box}>
                <Text style={styles.redNumber} allowFontScaling={false}>
                  {showFlag
                    ? `￥${yesterdayPerformance.saleAmount || '0.00'}`
                    : '***'}
                </Text>
                <Text style={styles.currentName} allowFontScaling={false}>
                  昨日销售额
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.redNumber} allowFontScaling={false}>
                  {showFlag
                    ? `￥${yesterdayPerformance.commission || '0.00'}`
                    : '***'}
                </Text>
                <Text style={styles.currentName} allowFontScaling={false}>
                  昨日预估收益
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.redNumber} allowFontScaling={false}>
                  {showFlag
                    ? `￥${(monthPerformance &&
                      monthPerformance.saleAmount) ||
                    '0.00'}`
                    : '***'}
                </Text>
                <Text style={styles.currentName} allowFontScaling={false}>
                  本月销售额
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.redNumber} allowFontScaling={false}>
                  {showFlag
                    ? `￥${(monthPerformance &&
                      monthPerformance.commission) ||
                    '0.00'}`
                    : '***'}
                </Text>
                <Text style={styles.currentName} allowFontScaling={false}>
                  本月预估收益
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['#FFEEDB', '#FFDFC7']}
          style={styles.accountBox}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <View style={styles.left}>
            <Text style={styles.label} allowFontScaling={false}>
              账户金额：
            </Text>
            <View style={styles.point}>
              <Text style={styles.unit} allowFontScaling={false}>
                ￥
              </Text>
              <Text style={styles.price} allowFontScaling={false}>
                {customerBalance && customerBalance.accountBalanceTotal
                  ? _.fmoney(customerBalance.accountBalanceTotal, 2)
                  : '0.00'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.right}
            activeOpacity={0.8}
            onPress={() => {
              msg.emit('router: goToNext', { routeName: 'BalanceCash' });
            }}
          >
            <Text style={styles.pay} allowFontScaling={false}>
              立即提现
            </Text>
            <Image
              style={styles.arrow1}
              source={require('../img/arrow1.png')}
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }

  /**
   * 改变当前页销售数据显示
   * @private
   */
  _onEyeClick = () => {
    const { showFlag } = this.state;
    this.setState({ showFlag: !showFlag });
    AsyncStorage.setItem(cache.MY_PERFORMANCE, !showFlag + '');
  };
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 20,
    marginBottom: 10,
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    position: 'relative',
    flexDirection: 'column',
    marginTop: -20
  },
  containerInner: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 16
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    backgroundColor: '#ffffff',
    paddingTop: 16
  },
  leftBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold'
  },
  eye: {
    width: 23,
    height: 23,
    marginLeft: 7
  },
  rightBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  orderName: {
    color: '#999',
    fontSize: 12
  },
  arrow: {
    width: 12,
    height: 12,
    marginLeft: 2
  },
  performance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 75,
    backgroundColor: '#fff'
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb'
  },
  box: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  redNumber: {
    color: '#FF6600',
    fontSize: 16,
    marginBottom: 4
  },
  currentName: {
    color: '#999',
    fontSize: 12
  },
  accountBox: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    fontSize: 10,
    color: '#985B31'
  },
  point: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  unit: {
    fontSize: 12,
    color: '#985B31'
  },
  price: {
    fontSize: 16,
    color: '#985B31',
    fontWeight: 'bold'
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  pay: {
    fontSize: 12,
    color: '#985B31'
  },
  arrow1: {
    width: 12,
    height: 12
  }
});
