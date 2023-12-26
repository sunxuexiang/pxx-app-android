import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { StoreProvider, msg } from 'plume2';
import { SafeAreaView } from 'react-native-safe-area-context';

import RadioBox from 'wmkit/radio-box';
import Header from 'wmkit/header';
import * as Button from 'wmkit/button';
import { cache } from 'wmkit/cache';

import {mainColor, screenWidth} from 'wmkit/styles/index';

import AppStore from './store';
import LinearGradient from 'react-native-linear-gradient';
const check = require('wmkit/theme/check.png');
const IconThree = require('./img/icon-three.png');
const LongButton = Button.LongButton;
const delivery = [{ id: '1', name: '快递' }];
@StoreProvider(AppStore, { debug: __DEV__ })
export default class PayDelivery extends Component {
  UNSAFE_componentWillMount() {
    this.store.init();
  }

  render() {
    const state = this.props.route;
    const { storeId } = (state && state.params) || {};

    return (
      <View style={{ backgroundColor: '#fafafa', flex: 1 }}>
        <Header title="支付方式" />
        <View style={styles.payWays}>
          <Text allowFontScaling={false} style={styles.payText}>
            支付方式
          </Text>
          <View style={{ width: '100%' }}>
            <RadioBox
              data={this.store.state().get('payOptions').toJS()}
              checked={this.store.state().get('payType')}
              isSelectPay={true}
              onCheck={(v) => this.store.onSelectPayInfo({ payId: v, storeId })}
            />
          </View>
        </View>
        {/*<View style={styles.payWays}>
          <Text allowFontScaling={false} style={styles.payText}>
            配送方式
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.deliveryItem}
            onPress={() => this.store.onSelectPayInfo({ payId: 0, storeId })}
          >
            <View style={styles.deliveryLeft}>
              <Image source={IconThree} style={styles.payIcon} />
              <Text style={styles.payText1}>快递</Text>
            </View>
            <Image source={check} style={styles.payIcon} />
          </TouchableOpacity>
        </View>*/}
        <SafeAreaView style={styles.bottom}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              this._save(storeId);
            }}
          >
            <LinearGradient
              colors={[mainColor, mainColor]}
              style={styles.btn}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Text style={styles.btnText}>确定</Text>
            </LinearGradient>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }

  /**
   * 保存
   */
  _save = async () => {
    const payType = this.store.state().get('payType');
    AsyncStorage.setItem(
      cache.ORDER_CONFIRM_PAYTYPE,
      JSON.stringify({
        payType
      })
    );
    msg.emit('router: back', {
      routeName: 'OrderConfirm'
    });
  };

  delivery() {}
}

const styles = StyleSheet.create({
  payWays: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    backgroundColor: '#ffffff',
    marginBottom: 10,
    width: '100%'
  },
  payText: {
    fontSize: 12,
    color: '#999',
    margin: 0,
    paddingLeft: 5,
    marginBottom: 5
  },
  bottom: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: screenWidth,
    backgroundColor: '#fff',
    padding: 12
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingHorizontal: 4
  },
  deliveryLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  payIcon: {
    width: 18,
    height: 18
  },
  payText1: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8
  },
  btn: {
    borderRadius: 18,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 14,
    color: '#fff'
  }
});
