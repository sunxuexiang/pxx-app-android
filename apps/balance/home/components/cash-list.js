import React from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { msg, Relax } from 'plume2';
import * as WMkit from 'wmkit/kit';
import * as _ from 'wmkit/common/util';
import { mainColor, screenHeight, screenWidth } from 'wmkit/styles/index';
import CashAccountDetail from '../../cash-account-detail';
@Relax
export default class CashList extends React.Component {
  static relaxProps = {
    amount: 'amount'
  };
  render() {
    const { amount } = this.props.relaxProps;
    const accountBalanceTotal = amount.get('accountBalanceTotal')
      ? amount.get('accountBalanceTotal')
      : 0;
    const blockedBalanceTotal = amount.get('blockedBalanceTotal')
      ? amount.get('blockedBalanceTotal')
      : 0;
    const alreadyDrawAmount = amount.get('alreadyDrawAmount')
      ? amount.get('alreadyDrawAmount')
      : 0;
    return (
      <View style={styles.container}>
        <View style={styles.redBj}>
          <View style={styles.cash}>
            <Text style={styles.unit} allowFontScaling={false}>
              可提现余额（元）
            </Text>
            <Text style={[styles.cashNumber, { color: mainColor }]} allowFontScaling={false}>
              {_.fmoney(accountBalanceTotal, 2)}
            </Text>
          </View>
          <View style={styles.settle}>
            <View style={styles.twoText}>
              <Text style={styles.settleText} allowFontScaling={false}>
                待入账余额
              </Text>
              <Text style={styles.money} allowFontScaling={false}>
                {_.fmoney(blockedBalanceTotal, 2)}
              </Text>
            </View>
            <View style={styles.twoText}>
              <Text style={styles.settleText} allowFontScaling={false}>
                已提现余额
              </Text>
              <Text style={styles.money} allowFontScaling={false}>
                {_.fmoney(alreadyDrawAmount, 2)}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.viewBox}
          activeOpacity={0.8}
          onPress={() => {
            if (!WMkit.isLoginOrNotOpen()) {
              msg.emit('loginModal:toggleVisible', {
                callBack: () => {
                  msg.emit('router: goToNext', { routeName: 'BalanceCash' });
                }
              });
            } else {
              msg.emit('router: goToNext', { routeName: 'BalanceCash' });
            }
          }}
        >
          <View style={styles.leftView}>
            <Image
              style={styles.icon}
              source={require('../img/cash-icon.png')}
            />
            <Text style={styles.text} allowFontScaling={false}>
              提现
            </Text>
          </View>
          <Image style={styles.arrow} source={require('../img/arrow.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewBox}
          activeOpacity={0.8}
          onPress={() => {
            if (!WMkit.isLoginOrNotOpen()) {
              msg.emit('loginModal:toggleVisible', {
                callBack: () => {
                  msg.emit('router: goToNext', {
                    routeName: 'CashAccountDetail'
                  });
                }
              });
            } else {
              msg.emit('router: goToNext', { routeName: 'CashAccountDetail' });
            }
          }}
        >
          <View style={styles.leftView}>
            <Image
              style={styles.icon}
              source={require('../img/account-icon.png')}
            />
            <Text style={styles.text} allowFontScaling={false}>
              账户明细
            </Text>
          </View>
          <Image style={styles.arrow} source={require('../img/arrow.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewBox}
          activeOpacity={0.8}
          onPress={() => {
            if (!WMkit.isLoginOrNotOpen()) {
              msg.emit('loginModal:toggleVisible', {
                callBack: () => {
                  msg.emit('router: goToNext', {
                    routeName: 'BalanceCashRecord'
                  });
                }
              });
            } else {
              msg.emit('router: goToNext', { routeName: 'BalanceCashRecord' });
            }
          }}
        >
          <View style={styles.leftView}>
            <Image
              style={styles.icon}
              source={require('../img/record-icon.png')}
            />
            <Text style={styles.text} allowFontScaling={false}>
              提现记录
            </Text>
          </View>
          <Image style={styles.arrow} source={require('../img/arrow.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 12
  },
  redBj: {
    width: screenWidth - 24,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginTop: screenWidth * -0.288,
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'column'
  },
  cash: {
    flexDirection: 'column'
  },
  unit: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.8)'
  },
  cashNumber: {
    fontSize: 28,
    fontWeight: '500'
  },
  cashText: {
    fontSize: 10,
    color: '#333',
    marginBottom: 8
  },
  settle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  twoText: {
    width: (screenWidth - 56) / 2,
    flexDirection: 'column'
  },
  settleText: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.4)'
  },
  money: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginTop: 8
  },

  viewBox: {
    paddingLeft: 12,
    paddingRight: 10,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 6,
    marginTop: 12
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb'
  },
  leftView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 21,
    height: 20,
    marginRight: 7
  },
  text: {
    fontSize: 14,
    color: '#333'
  },
  arrow: {
    width: 7,
    height: 13
  }
});
