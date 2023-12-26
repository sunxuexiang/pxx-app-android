import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  PixelRatio,
  TouchableOpacity
} from 'react-native';
import { StoreProvider, msg } from 'plume2';

import { mainColor, screenWidth, priceColor } from 'wmkit/styles/index';
import Header from 'wmkit/header';
import { _, isAndroid } from 'wmkit';

import AppStore from '../store';

/**
 * 退货退款成功
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class ReturnRefundSuccess extends React.Component {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const { rid } = (state && state.params) || {};

    if (rid) {
      this.store.returnsOkInit(rid);
    } else {
      msg.emit('app:tip', '退单不存在');
      msg.emit('router: goToNext', { routeName: 'RefundList' });
    }
  }

  render() {
    const rid = this.store.state().getIn(['returnsResult', 'id']) || '';

    // 总额
    const totalPrice =
      this.store
        .state()
        .getIn(['returnsResult', 'returnPrice', 'totalPrice']) || 0;
    // 改价金额
    const applyPrice = this.store
      .state()
      .getIn(['returnsResult', 'returnPrice', 'applyPrice']);
    // 应退金额，如果对退单做了改价，使用applyPrice，否则，使用总额totalPrice
    const payPrice = applyPrice || totalPrice;

    return (
      <View style={styles.container}>
        <Header title="退单申请提交成功" />
        <View style={styles.box}>
          <View style={styles.imgBox}>
            <Image style={styles.img} source={require('./img/return.png')} />
            <Text style={styles.text}>退货退款申请提交成功！</Text>
            <Text style={styles.grey}>您的申请已提交审核</Text>
            <Text style={styles.grey}>您可在我的-退货退款查看处理进度</Text>
          </View>
          <View style={styles.orderBox}>
            <View style={styles.row}>
              <Text style={styles.dark} allowFontScaling={false}>
                退单编号：
              </Text>
              <Text style={styles.dark} allowFontScaling={false}>
                {this.store.state().getIn(['returnsResult', 'id'])}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.dark} allowFontScaling={false}>
                退单金额：
              </Text>
              <Text style={[styles.red, { color: priceColor }]} allowFontScaling={false}>
                ¥{_.addZero(payPrice)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={[styles.btn, { borderColor: mainColor }]}
            activeOpacity={0.8}
            onPress={() => this._returnsDetail(rid)}
          >
            <Text allowFontScaling={false} style={[styles.btnText, { color: mainColor }]}>
              查看退货退款详情
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { borderColor: mainColor }]}
            activeOpacity={0.8}
            onPress={() => msg.emit('router: goToNext', { routeName: 'Main' })}
            >
            <Text allowFontScaling={false} style={[styles.btnText, { color: mainColor }]}>
              返回首页
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  /**
   * 退单详情页面
   * @private
   */
  _returnsDetail(rid) {
    if (rid) {
      msg.emit('router: goToNext', {
        routeName: 'ReturnDetail',
        rid: rid
      });
    } else {
      msg.emit('app:tip', '退单不存在');
      msg.emit('router: goToNext', {
        routeName: 'RefundList'
      });
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  img: {
    width: 48,
    height: 48,
    marginBottom: 15
  },
  text: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold'
  },
  box: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40
    // justifyContent: 'center'
  },
  grey: {
    color: '#999',
    fontSize: 14,
    marginTop: 10
  },
  orderBox: {
    // borderColor: '#ebebeb',
    // borderWidth: 1 / PixelRatio.get(),
    backgroundColor: '#fff',
    width: screenWidth - 24,
    borderRadius: 4,
    paddingTop: 10,
    marginTop: 30,
    borderBottomWidth: 0
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 10
  },
  dark: {
    fontSize: 14,
    color: '#999'
  },
  red: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  imgBox: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    width: screenWidth,
    ..._.ifIphoneX(
      {
        height: 90,
        paddingBottom: 34
      },
      {
        height: 56
      }
    ),
    backgroundColor: '#ffffff'
  },
  btn: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    width: (screenWidth - 36) / 2,
    borderWidth: 1,
    borderRadius: 18
  },
  btnText: {
    fontSize: 16
  }
});
