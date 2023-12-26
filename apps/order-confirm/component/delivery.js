import { msg, Relax } from 'plume2';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert, Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RadioBox, noop,cache } from 'wmkit';
import {debounce} from 'lodash';
import { mainColor } from '@/wmkit/styles';

@Relax
export default class Delivery extends Component {
  static relaxProps = {
    orderConfirm: 'orderConfirm',
    delivery: 'delivery',
    pickUpMessage: 'pickUpMessage',
    pickUpSelect: 'pickUpSelect',
    addressNameShow: 'addressNameShow',
    homeDeliverContent: 'homeDeliverContent',
    payType: 'payType',
    onSelectDeliveryType: Function,
    logisticsAddress: 'logisticsAddress'
  };

  render(){
    const {delivery,orderConfirm,pickUpMessage,pickUpSelect, addressNameShow, onSelectDeliveryType} = this.props.relaxProps;
    const {storeId}=this.props;
    let deliverWay;
    if(orderConfirm && orderConfirm.size !=0){
      deliverWay=orderConfirm.toJS().filter((f) => f.storeId == storeId)[0].deliverWay;
    }
    const pickUpList = pickUpMessage && pickUpMessage.toJS().filter((f) => f.storeId == storeId)[0];
    const pickUpWare = pickUpList && pickUpList.pickUpList.filter((v)=>v.wareId == pickUpSelect[storeId])[0];
    //4个配送方式显示2行
    const deliveryWays1 = delivery && delivery.size > 3 ? delivery.toJS().slice(0, 2) : delivery.toJS();
    const deliveryWays2 = delivery && delivery.size > 3 ? delivery.toJS().slice(2, delivery.size) : [];
    const isShow = (delivery && delivery.size > 1) && delivery.toJS()[0].id != '';
    let {logisticsAddress} = this.props.relaxProps
    if(logisticsAddress=='true'){
      logisticsAddress=""
    }
    const index = orderConfirm.findIndex(
      (f) => f.get('storeId') == this.props.storeId
    );
    const enclosures = orderConfirm.getIn([index, 'enclosures']) || fromJS([]);
    const buyerRemark = orderConfirm.getIn([index, 'buyerRemark']);
    return(
      <View>
        <View style={styles.container}>
          <Text allowFontScaling={false} style={styles.title}>
            配送方式
          </Text>
          {isShow && <View style={{flexDirection:'column', alignItems: 'flex-end',position:'relative',right:-10}}>
            <RadioBox
              data={deliveryWays1}
              checked={deliverWay}
              onCheck={(v) => onSelectDeliveryType(storeId, v)}
              style={{flex: 1, justifyContent: 'flex-end', marginVertical: 4}}
              itemStyle={{width: 'auto', marginRight: 0}}
              textStyle={{marginLeft: 0, marginRight: 6, fontSize: 12}}
              checkIconBefore={true}
            />
            {deliveryWays2 && deliveryWays2.length > 0 && (
              <RadioBox
                data={deliveryWays2}
                checked={deliverWay}
                onCheck={(v) => onSelectDeliveryType(storeId, v)}
                style={{flex: 1, justifyContent: 'flex-end', marginVertical: 4}}
                itemStyle={{width: 'auto', marginRight: 0}}
                textStyle={{marginLeft: 0, marginRight: 6, fontSize: 12}}
                checkIconBefore={true}
              />
            )}
          </View>}
        </View>
        {deliverWay == 1 &&
          <TouchableOpacity
            style={[styles.container,{paddingTop:4}]}
            activeOpacity={0.8}
            onPress={debounce(() => {
              AsyncStorage.setItem(cache.CONFIRM_ORDER_FILE_RMK, JSON.stringify({
                orderFiles:enclosures.toJS(),
                rmk:buyerRemark,
                storeId
              }));
              msg.emit('router: goToNext', { routeName: 'OrderConfirmDeliver'})
            }, 500)}
          >
            <Text allowFontScaling={false} style={styles.title}>
            选择物流信息
            </Text>
            <View style={styles.rightContext}>
              <Text allowFontScaling={false} style={[styles.payText, {color: addressNameShow && !logisticsAddress ? mainColor : '#333332'}]}>
                {logisticsAddress || '请选择'}
              </Text>
              <Image
                style={styles.arrow}
                source={require('../img/arrow.png')}
              />
            </View>
          </TouchableOpacity>
        }
        { deliverWay == 3 && pickUpWare && (
          <View>
            <View style={styles.container}>
              <Text allowFontScaling={false} style={styles.title}>
                自提点
              </Text>
              <View style={styles.rightContext}>
                <Text allowFontScaling={false} style={styles.payText}>
                  {pickUpWare && pickUpWare.wareName}
                </Text>
              </View>
            </View>
            <View style={styles.container}>
              <Text allowFontScaling={false} style={styles.title}>
                自提地址
              </Text>
              <View style={styles.rightContext}>
                <Text allowFontScaling={false} style={styles.payText} numberOfLines={1}>
                  {pickUpWare && pickUpWare.addressDetail}
                </Text>
              </View>
            </View>
          </View>
        )}

      </View>
    );
  }
}


const styles=StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    paddingBottom:15
  },
  rightContext: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    paddingLeft: 20
  },
  title: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 12
  },
  payText: {
    flex: 1,
    color: 'rgba(0,0,0,0.8)',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'right'
  },
  arrow: {
    width: 12,
    height: 12,
    marginLeft: 4
  },
})
