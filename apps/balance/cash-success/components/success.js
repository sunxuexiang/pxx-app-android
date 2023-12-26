import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { msg } from 'plume2';
import { mainColor, screenWidth } from 'wmkit/styles/index';
import * as _ from 'wmkit/common/util';

export default class Success extends React.Component {
  render() {
    const { drawCashId, drawCashNo, drawCashSum } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.itemBox}>
          <Image style={styles.cash} source={require('../img/success.png')} />
          <Text allowFontScaling={false} style={styles.title}>
            提现申请成功
          </Text>
          <Text allowFontScaling={false} style={styles.text}>
            请等待管理员审核，预计1～3个工作日完成
          </Text>
          <View style={styles.cashInfoBox}>
            <Text style={styles.cashText}>提现单号：{drawCashNo}</Text>
            <Text style={styles.cashText}>
              提现金额：
              <Text style={{ color: mainColor }}>
                ¥{_.addZero(drawCashSum)}
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.btn}>
          <TouchableOpacity
            style={[styles.lBtn, { borderColor: mainColor }]}
            activeOpacity={0.8}
            onPress={() =>
              msg.emit('router: goToNext', {
                routeName: 'CashDetail',
                drawCashId: drawCashId
              })
            }
          >
            <Text allowFontScaling={false} style={[styles.btnText, { color: mainColor }]}>
              查看提现申请
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.lBtn, { borderColor: mainColor, marginLeft: 7 }]}
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
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  itemBox: {
    alignItems: 'center'
  },
  cash: {
    width: 48,
    height: 48,
    marginTop: 40
  },
  title: {
    fontSize: 16,
    color: '#333',
    marginTop: 12
  },
  text: {
    fontSize: 14,
    color: '#999',
    lineHeight: 22,
    marginTop: 12
  },
  cashInfoBox: {
    marginTop: 36,
    backgroundColor: '#fff',
    borderRadius: 4,
    width: screenWidth - 24,
    paddingVertical: 16,
    paddingHorizontal: 12
  },
  cashText: {
    fontSize: 14,
    color: '#999',
    lineHeight: 14,
    marginTop: 12
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    width: '100%',
    backgroundColor: '#ffffff',
    ..._.ifIphoneX(
      {
        paddingTop: 10,
        paddingBottom: 44
      },
      {
        paddingVertical: 10
      }
    )
  },
  lBtn: {
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderWidth: 1
  },
  btnText: {
    fontSize: 16
  }
});
