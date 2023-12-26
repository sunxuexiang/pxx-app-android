import React from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { msg } from 'plume2';
import * as WMkit from 'wmkit/kit';

export default class CashModal extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cashView}>
          <Text style={styles.title} allowFontScaling={false}>
            提现至
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.box}
          onPress={() => {
            if (!WMkit.isLoginOrNotOpen()) {
              msg.emit('loginModal:toggleVisible', {
                callBack: () => {
                  msg.emit('router: goToNext', {
                    routeName: 'BalanceCashForm'
                  });
                }
              });
            } else {
              msg.emit('router: goToNext', { routeName: 'BalanceCashForm' });
            }
          }}
        >
          <View style={styles.wecatBox}>
            <Image style={styles.wecat} source={require('../img/wecat.png')} />
            <Text style={styles.text} allowFontScaling={false}>
              微信钱包
            </Text>
          </View>
          <Image style={styles.arrow} source={require('../img/arrow.png')} />
        </TouchableOpacity>
        <View style={styles.tipBox}>
          <Text style={styles.tip} allowFontScaling={false}>
            微信提现：审核过后，将会提现至您账号绑定的微信钱包中，请确保您的微信开通钱包功能及完成实名认证。
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  cashView: {
    paddingHorizontal: 13,
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 13,
    color: '#000'
  },
  box: {
    paddingHorizontal: 12,
    paddingTop: 11,
    paddingBottom: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ebebeb',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb'
  },
  wecatBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  wecat: {
    width: 28,
    height: 28,
    marginRight: 5
  },
  text: {
    fontSize: 14,
    color: '#000'
  },
  arrow: {
    width: 7,
    height: 13
  },
  tipBox: {
    paddingHorizontal: 12,
    paddingTop: 12
  },
  tip: {
    fontSize: 12,
    color: '#999',
    lineHeight: 20
  }
});
