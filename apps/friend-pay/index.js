import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { StoreProvider } from 'plume2';
import AppStore from './store';
import { mainColor, screenHeight } from '@/wmkit/styles';
import { _, Header, WMRecommendList } from 'wmkit';
import GoodsList from './component/goods-list';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class FriendPay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: ''
    };
  }

  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const { tid, results, type } = (state && state.params) || {};
    this.store.init(type, tid, results);
    this.setState({ type });
  }

  render() {
    const orderInfo = this.store.state().get('orderInfo');
    const { tradePrice, tradeItems } = orderInfo;
    const { type } = this.state;
    return (
      <ScrollView>
        <View style={styles.friendPayContainer}>
          <Header title='好友代付'/>
          <View style={styles.infoWrapper}>
            <Image source={require('./img/avatar.png')} style={styles.avatar}/>
            <Text style={styles.infoText}>代付订单已创建成功，发给好友帮你付款</Text>
          </View>
          <View style={styles.moveContainer}>
            <View style={styles.moneyControl}>
              <Text style={{ color: '#848484', fontWeight: '400' }}>代付金额</Text>
              <Text style={[styles.money, { color: mainColor }]}>{_.addZero(tradePrice && tradePrice.totalPrice)}</Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  this.store.handleShareToFriend(orderInfo, type);
                }}
                style={styles.sendBtn}
              >
                <Text style={{
                  color: '#fff',
                  textAlign: 'center'
                }}>发送给{type === 'ReplaceWechat' ? '微信' : type === 'ReplaceAlipay' ? '支付宝' : ''}好友</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.tipInfo}>如订单申请退款，已支付金额将原路退还给您的好友</Text>
            {/* 订单商品列表 */}
            <GoodsList tradeItems={tradeItems}/>
            {/* 为你推荐 */}
            <WMRecommendList type={'2'}/>
          </View>
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  friendPayContainer: {
    flex: 1,
    minHeight: screenHeight,
    backgroundColor: '#F8F8F8',
    alignItems: 'center'
  },
  infoWrapper: {
    width: '100%',
    height: 160,
    backgroundColor: '#FF5500',
    alignItems: 'center'
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 50,
    marginBottom: 20,
    marginTop: 20
  },
  infoText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '400'
  },
  moveContainer: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20
  },
  moneyControl: {
    height: 180,
    backgroundColor: '#fff',
    alignItems: 'center',
    position: 'relative',
    top: -20,
    borderRadius: 10,
    paddingTop: 15
  },
  money: {
    fontSize: 28,
    fontWeight: '400',
    marginTop: 20,
    marginBottom: 20
  },
  sendBtn: {
    width: '95%',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FF5700',
    borderRadius: 20,
    position: 'absolute',
    bottom: 10
  },
  tipInfo: {
    color: '#ACACAC',
    textAlign: 'left',
    fontSize: 14
  }
});
