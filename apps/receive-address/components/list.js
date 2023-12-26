/**
 * Created by feitingting on 2017/8/30.
 */
import React from 'react';
import {
  Dimensions,
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { msg, Relax } from 'plume2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setChooseCity,updateLastAddress } from 'wmkit/ware-house/matchWare';


import { cache } from 'wmkit/cache';
import { Confirm } from 'wmkit/modal/confirm';
import * as FindArea from 'wmkit/area/area';
import { noop } from 'wmkit/noop';
import LinearGradient from 'react-native-linear-gradient';
import { fromJS } from 'immutable';
import { screenWidth, mainColor } from 'wmkit/styles/index';

import AddressEmpty from './empty';
import Swipeout from 'react-native-swipeout';
const { height: SCREENHEIGHT } = Dimensions.get('window');
@Relax
export default class ReceiveAddressList extends React.Component {
  static relaxProps = {
    addressList: 'addressList',
    loading: 'loading',
    refreshState: 'refreshState',

    refresh: noop,
    setDefault: noop,
    deleteAddress: noop
  };

  // 初始化模拟数据
  constructor(props) {
    super(props);
  }

  render() {
    const {
      addressList,
      loading,
      refresh,
      refreshState
    } = this.props.relaxProps;

    if (loading) {
      return null;
    }

    if (addressList.isEmpty()) {
      return <AddressEmpty />;
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView
          style={styles.bankContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshState}
              onRefresh={() => {
                // 开始loading
                refresh();
                msg.emit('address-list:refresh');
                // 结束loading
                refresh();
              }}
            />
          }
        >
          {addressList.toJS().map((address) => {
            return this._renderRow(address);
          })}
          {/* <View style={styles.none}>
            <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.4)' }}>
              没有更多了
            </Text>
          </View> */}
        </ScrollView>
        <View style={styles.bottom}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: 'rgba(0,0,0,0.4)'
            }}
          >
            最多可添加20条收货地址
          </Text>
          <View style={styles.btnbox}>
            {addressList.count() < 20 && (
              <TouchableOpacity
                onPress={() =>
                  msg.emit('router: goToNext', {
                    routeName: 'UserAddressEdit'
                  })
                }
                style={styles.add}
              >
                <LinearGradient
                  colors={[mainColor, mainColor]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={[styles.buttonBox, { backgroundColor: mainColor }]}
                >
                  <Image
                    style={styles.img}
                    source={require('../img/add.png')}
                  />
                  <Text style={{ color: '#fff', fontSize: 14 }}>
                    新增收货地址
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }

  _renderRow = (item) => {
    const { setDefault } = this.props.relaxProps;
    console.log(item, 'v.item');
    return (
      <Swipeout
        key={Math.random()}
        buttonWidth={80}
        // right={[
        //   {
        //     text: '设为默认',
        //     backgroundColor: '#EBEBEB',
        //     color: 'rgba(0,0,0,0.8)',
        //     fontSize: 12,
        //     onPress: async () => {
        //       await setDefault(item.deliveryAddressId);
        //     }
        //   },
        //   {
        //     text: '删除',
        //     onPress: async () => {
        //       await this._deleteAddress(item.deliveryAddressId);
        //     },
        //     backgroundColor: mainColor
        //   }
        // ]}
        right={[
          {
            component: [
              <View
                  style={[styles.swipeout,{backgroundColor:'#EBEBEB'}]}
              >
                <Text style={[styles.swipeoutText,{color:'rgba(0,0,0,0.8)'}]}>设为默认</Text>
              </View>
            ],
            onPress: () => {
              setDefault(item.deliveryAddressId);
            }
          },{
            component: [
              <View
                  style={[styles.swipeout, { backgroundColor: mainColor }]}
              >
                <Text style={styles.swipeoutText}>删除</Text>
              </View>
            ],
            onPress: () => {
              this._deleteAddress(item.deliveryAddressId);
            }
          }
        ]}
        backgroundColor="#fff"
        autoClose={true}
      >
        <View style={styles.addressBox}>
          <TouchableOpacity
            style={styles.addressItem}
            activeOpacity={0.8}
            onPress={() => {
              this.props.whereFrom == 'UserCenter'
                ? null
                : this._chooseAddress(item);
            }}
          >
            <View style={styles.addressName}>
              <Text style={styles.text1} allowFontScaling={false}>
                {item.consigneeName}
              </Text>
              <Text style={styles.text} allowFontScaling={false}>
                {item.consigneeNumber
                  ? item.consigneeNumber.substr(0, 3) +
                    '****' +
                    item.consigneeNumber.substr(7, 4)
                  : null}
              </Text>
              {item.isDefaltAddress == 1 && (
                <LinearGradient
                  colors={[mainColor, mainColor]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.default}
                >
                  <Text style={styles.word}>默认</Text>
                </LinearGradient>
              )}
            </View>
            <View style={styles.addressDetail}>
              <Text
                style={styles.text2}
                numberOfLines={2}
                allowFontScaling={false}
              >
                {this._renderText(item)}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this._editAddress(item.deliveryAddressId)}
          >
            <Image style={styles.icon} source={require('../img/edits.png')} />
          </TouchableOpacity>
        </View>
      </Swipeout>
    );
  };

  /**
   * 拼接地址
   * @param address
   * @returns {any}
   * @private
   */
  _renderText = (address) => {
    return (
      <Text key={address.deliveryAddressId}>
        {FindArea.addressInfo(
          address.provinceId,
          address.cityId,
          address.areaId
        ) + address.deliveryAddress}
      </Text>
    );
  };

  /**
   * 编辑收货地址
   * @param addressId
   * @private
   */
  _editAddress = (addressId) => {
    msg.emit('router: goToNext', { routeName: 'UserAddressEdit', addressId });
  };

  /**
   * 删除收货地址
   * @param addressId
   * @private
   */
  _deleteAddress = (addressId) => {
    const { deleteAddress } = this.props.relaxProps;
    Confirm({
      title: '删除收货地址',
      text: '您确定要删除所选收货地址？',
      okText: '确定',
      cancelText: '取消',
      okFn: async () => {
        await deleteAddress(addressId);
      }
    });
  };

  /**
   * 选择地址
   * @param address
   * @private
   */
  _chooseAddress = async (address) => {
    let data = null;
    let dataType = '';
    const loginData = await AsyncStorage.getItem(cache.LOGIN_DATA);
    const customerId = JSON.parse(loginData).customerId;
    if (await AsyncStorage.getItem(cache.ORDER_CONFIRM)) {
      dataType = cache.ORDER_CONFIRM;
      data = await AsyncStorage.getItem(cache.ORDER_CONFIRM);
      let { comeFrom } = JSON.parse(data);
      if (comeFrom == 'invoice') {
        data = await AsyncStorage.getItem(cache.ORDER_INVOICE);
        dataType = cache.ORDER_INVOICE;
      }
      await setChooseCity(address.cityId);
      await updateLastAddress(customerId,address.deliveryAddressId);
    } else if (await AsyncStorage.getItem(cache.ORDER_INVOICE)) {
      data = await AsyncStorage.getItem(cache.ORDER_INVOICE);
      dataType = cache.ORDER_INVOICE;
      await setChooseCity(address.cityId);
      await updateLastAddress(customerId,address.deliveryAddressId);
    } else if (await AsyncStorage.getItem(cache.PURCHASE_ADDRESS)) {
      data = await AsyncStorage.getItem(cache.PURCHASE_ADDRESS);
      dataType = cache.PURCHASE_ADDRESS;
      await setChooseCity(address.cityId);
      await updateLastAddress(customerId,address.deliveryAddressId);
    }  else if(await AsyncStorage.getItem(cache.GOODS_DETAIL)){
      data = await AsyncStorage.getItem(cache.GOODS_DETAIL);
      dataType = cache.GOODS_DETAIL;
      await setChooseCity(address.cityId);
      await updateLastAddress(customerId,address.deliveryAddressId);
      console.log('comeFrom', 333);
      // return;
    } else {
      await setChooseCity(address.cityId);
      await updateLastAddress(customerId,address.deliveryAddressId);
      console.log('comeFrom', 222);
      // return;
    }

    let page = 'OrderConfirm';
    let {
      defaultAddr,
      comeFrom,
      orderConfirm,
      pointsOrderConfirm
    } = JSON.parse(data);
    console.log('comeFrom', JSON.parse(data));
    //始终保持地址数据为最新
    if (comeFrom == 'address' || comeFrom == 'goodsDetail') {
      defaultAddr = address;
      page = 'back';
    } else if (comeFrom == 'pointsAddress') {
      // page = 'PointsOrderConfirm';
      page = 'back';
      defaultAddr = address;
    } else if (comeFrom == 'flashSaleAddress') {
      page = 'FlashSaleOrderConfirm';
      defaultAddr = address;
    } else if (comeFrom == 'PurchaseOrder') {
      page = 'back';
      defaultAddr = address;
    } else if ((comeFrom || '').startsWith('invoiceAddress_')) {
      page = 'back';
      const storeId = comeFrom.substr(comeFrom.indexOf('_') + 1);
      comeFrom = 'invoice';
      orderConfirm = fromJS(orderConfirm)
        .map((o) => {
          if (o.get('storeId') == storeId) {
            o = o.set('defaultInvoiceAddr', address);
          }
          return o;
        })
        .toJS();
    }

    AsyncStorage.setItem(
      dataType,
      JSON.stringify({
        defaultAddr,
        orderConfirm,
        comeFrom,
        pointsOrderConfirm
      })
    );
    if (page == 'back') {
      if(comeFrom == 'PurchaseOrder'){
        msg.emit('purchase:init');
      }
      msg.emit('router: back');
      return;
    }
    msg.emit('router: replace', {
      routeName: page,
      params: comeFrom == 'pointsAddress' && {
        pointsGoodsId: pointsOrderConfirm.pointsGoodsId,
        num: pointsOrderConfirm.num
      }
    });
  };
}

const styles = StyleSheet.create({
  addressBox: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb'
  },
  addressItem: {
    paddingTop: 16,
    paddingBottom: 12,
    flex: 1
  },
  addressName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  addressDetail: {
    marginRight: 16
  },
  tips: {
    color: '#333',
    fontSize: 12,
    marginLeft: 18
  },
  btnText: {
    color: '#fff',
    fontSize: 16
  },
  item: {
    top: -12.5,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#e0e0e0'
  },
  separateLine: {
    height: 4,
    width: screenWidth
  },
  text1: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)',
    paddingRight: 8
  },
  text: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)'
  },
  text2: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.4)',
    lineHeight: 20,
    flexWrap: 'wrap'
  },
  none: {
    alignItems: 'center',
    marginTop: 12
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#000'
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bankContent: {
    backgroundColor: '#fff',
    height: SCREENHEIGHT,
    marginBottom: 15
  },
  bottom: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ebebeb',
    backgroundColor: '#fff',
    paddingTop: 10
  },
  btnbox: {
    position: 'relative',
    padding: 12,
    paddingBottom: 10,
    paddingTop: 10
  },
  buttonBox: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    flexDirection: 'row'
  },
  img: {
    height: 16,
    width: 16,
    marginRight: 8
  },
  word: {
    color: '#fff',
    fontSize: 10
  },
  default: {
    padding: 4,
    paddingBottom: 2,
    paddingTop: 2,
    marginLeft: 12,
    borderRadius: 2
  },
  add: {
    borderRadius: 18,
    height: 36
  },
  swipeout: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  swipeoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500'
  }
});
