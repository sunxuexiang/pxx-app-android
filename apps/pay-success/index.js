import React from 'react';
import { StoreProvider, msg } from 'plume2';
import {
  StyleSheet,
  View,
  Image,
  Text,
  PixelRatio,
  TouchableOpacity, ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';

import * as _ from 'wmkit/common/util';
import Header from 'wmkit/header';

import AppStore from './store';

import { mainColor, screenWidth } from 'wmkit/styles/index';
import { WMRecommendList } from '@/wmkit';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class PaySuccess extends React.Component {
  store;

  componentDidMount() {
    // 获取传过来的订单编号 与 支付方式(线下offline,线上online)
    const state = this.props.route;
    const params = (state && state.params) || {}
    const { tid, parentTid } = params;
    this.store.init(tid, parentTid);
  }

  render() {
    const payOrder = this.store.state().get('payOrder');
    const state = this.props.route;
    const params = (state && state.params) || {}
    const { payType } = params;

    return (
      <View style={styles.container}>
        <Header title="付款单提交成功"
        renderLeft={() => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                msg.emit('router: goToNext', {
                  routeName: 'PurchaseOrder'
                })
              }
            >
              <Image style={styles.back} source={require('./img/back.png')} />
            </TouchableOpacity>
          );
        }}
        />
        <View style={styles.box}>
          <ScrollView>
            <View style={styles.imgBox}>
              <Image
                style={styles.img}
                source={require('./img/result-suc.png')}
              />
              {payType == 'online' && (
                <Text allowFontScaling={false} style={styles.text}>
                  订单支付成功！
                </Text>
              )}
              {payType == 'offline' && (
                <Text allowFontScaling={false} style={styles.text}>
                  付款单提交成功！
                </Text>
              )}
              {payType == 'offline' && (
                <Text allowFontScaling={false} style={styles.grey}>
                  请等待商家确认。
                </Text>
              )}
            </View>
            {payOrder &&
            payOrder.map((item) => {
              return (
                <View key={item.get('orderCode')} style={styles.orderBox}>
                  <View style={styles.storeRow}>
                    {item.get('isSelf') ? <SelfSalesLabel/> : null}
                    <Text style={styles.store} allowFontScaling={false}>
                      {item.get('storeName')}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.dark} allowFontScaling={false}>
                      订单编号：
                    </Text>
                    <Text style={styles.dark} allowFontScaling={false}>
                      {item.get('orderCode')}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.dark} allowFontScaling={false}>
                      订单金额：
                    </Text>
                    <Text style={[styles.price, { color: mainColor }]} allowFontScaling={false}>
                      ¥{_.addZero(item.get('payOrderPrice'))}
                    </Text>
                  </View>
                  {payType != 'online' && item.get('payOrderPrice') !=0&&(
                    <View style={styles.row}>
                      <Text style={styles.dark} allowFontScaling={false}>
                        付款流水号：
                      </Text>
                      <Text style={styles.dark} allowFontScaling={false}>
                        {item.get('receivableNo')}
                      </Text>
                    </View>
                  )
                  }
                </View>
              );
            })}
            <View style={{margin:10}} >
              <Text style={{color: '#999999',marginTop:10}}>
                温馨提示 <Image style={{width: 15, height: 15}} source={require('./img/warning.png')} />
              </Text>
              <View>
                <Text style={{color: '#999999', marginTop: 4}}>1.所有商品非质量问题，概不退货;</Text>
              </View>
              <View>
                <Text style={{color: '#999999'}}>
                  2.自提及送货上门客户，请当面核对商品品类及数量，并签字确认；物流客户在提货时请检查外包装，如物流公司损坏造成损失，平台概不负责;
                </Text>
              </View>
              <View>
                <Text style={{color: '#999999', marginTop: 4}}> 3.裸散无售后;</Text>
              </View>
            </View>
            {/*为你推荐*/}
            <WMRecommendList type={'3'}/>
          </ScrollView>
        </View>
        <SafeAreaView style={styles.button}>
          <TouchableOpacity
            style={[styles.btn, { borderColor: mainColor }]}
            activeOpacity={0.8}
            onPress={() => {
              msg.emit('purchaseNum:refresh');
              const payOrder = this.store.state().get('payOrder');
              if (payOrder.size > 1) {
                // 多笔订单跳列表
                msg.emit('router: goToNext', {
                  routeName: 'OrderList'
                });
              } else {
                // 单笔订单跳详情
                msg.emit('router: goToNext', {
                  routeName: 'OrderDetail',
                  oId: payOrder.getIn([0, 'orderCode'])
                });
              }
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
    marginBottom: 15
  },
  back: {
    width: 20,
    height: 20,
  },
  text: {
    color: '#333333',
    fontSize: 15
  },
  box: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40
    // justifyContent: 'center'
  },
  grey: {
    color: '#939495',
    fontSize: 13,
    marginTop: 10
  },
  orderBox: {
    backgroundColor: '#fff',
    width: screenWidth,
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
  price: {
    fontSize: 14,
    fontWeight: 'bold'
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
