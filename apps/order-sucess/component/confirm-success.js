import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  PixelRatio,
  StyleSheet,
  ScrollView
} from 'react-native';
import { msg } from 'plume2';
import { SafeAreaView } from 'react-native-safe-area-context';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';

import * as _ from 'wmkit/common/util';
import Header from 'wmkit/header';

import { mainColor, screenWidth } from 'wmkit/styles/index';
import { WMRecommendList } from '@/wmkit';

export default class SuccessContent extends Component {
  render() {
    const { results } = this.props;
    const resultesLength = results.length;
    const checked = results.every(
      (res) => res.tradeState.auditState === 'CHECKED'
    );

    return (
      <View style={styles.container}>
        <Header title="订单提交成功" />
        <View style={styles.box}>
          <ScrollView alwaysBounceVertical={false}>
            <View style={styles.imgBox}>
              <Image
                style={styles.img}
                source={(results &&results[0] && results[0].img)?{uri:results[0].img}:require('../img/none.png')}
              />
              <Text allowFontScaling={false} style={styles.text}>
                订单提交成功！
              </Text>
              {!checked ? (
                <>
                  <Text allowFontScaling={false} style={styles.grey}>
                    您的订单已提交审核
                  </Text>
                  <Text allowFontScaling={false} style={styles.grey}>
                    您可在订单列表查看处理进度。
                  </Text>
                </>
              ) : (
                <Text allowFontScaling={false} style={styles.grey}>
                  线下付款后，到“待付款订单”中提交相关凭证
                </Text>
              )}
            </View>
            {results.map((r, i) => {
              return [
                <View key={i} style={styles.orderBox}>
                  <View style={styles.storeRow}>
                    {r.isSelf ? <SelfSalesLabel/> : null}
                    <Text style={styles.store} allowFontScaling={false}>
                      {r.storeName}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.dark} allowFontScaling={false}>
                      订单
                      {resultesLength > 1 ? i + 1 : ''}
                      编号：
                    </Text>
                    <Text style={styles.dark} allowFontScaling={false}>
                      {r.tid}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.dark} allowFontScaling={false}>
                      订单金额：
                    </Text>
                    <Text style={[styles.price, { color: mainColor }]} allowFontScaling={false}>
                      ¥{_.addZero(r.price)}
                    </Text>
                  </View>
                  {/* <Image
                    source={require('../img/transparentline.png')}
                    style={styles.line}
                  /> */}
                </View>
              ];
            })}
            <WMRecommendList type={'3'}/>
          </ScrollView>
        </View>
        <SafeAreaView>
          <View style={styles.button}>
            <TouchableOpacity
              style={[styles.btn, { borderColor: mainColor }]}
              activeOpacity={0.8}
              onPress={() => {
                msg.emit('purchaseNum:refresh');
                msg.emit('router: goToNext', {
                  routeName: 'OrderList'
                });
              }}
            >
              <Text allowFontScaling={false} style={[styles.btnText, { color: mainColor }]}>
                查看订单
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
        </SafeAreaView>
      </View>
    );
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
    marginBottom: 15,
    marginTop: 40
  },
  text: {
    color: '#000',
    fontSize: 15
  },
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  grey: {
    color: '#333',
    fontSize: 13,
    marginTop: 10
  },
  orderBox: {
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
  price: {
    fontSize: 14
  },
  imgBox: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    width: screenWidth * 0.7,
    height: 2
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
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
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
    paddingHorizontal: 10,
    lineHeight:14
  },
  store: {
    marginLeft: 4,
    color: '#000000',
    fontSize: 14,
    fontWeight: '500'
  }
});
