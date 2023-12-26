import { msg, Relax } from 'plume2';
import React, { Component } from 'react';
import { Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RadioBox, noop } from 'wmkit';

@Relax
export default class Delivery extends Component {
  static relaxProps = {
    orderConfirm: 'orderConfirm',
    delivery: 'delivery',
    pickUpMessage: 'pickUpMessage',
    pickUpSelect: 'pickUpSelect',
    homeDeliverContent: 'homeDeliverContent',
    payType: 'payType',
    onSelectDeliveryType: Function,
    logisticsAddress: 'logisticsAddress'
  };

  render(){
    const {delivery,orderConfirm,pickUpMessage,pickUpSelect, onSelectDeliveryType, logisticsAddress} = this.props.relaxProps;
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
            onPress={() => msg.emit('router: goToNext', { routeName: 'OrderConfirmDeliver'})}
          >
            <Text allowFontSacling={false} style={styles.title}>
            选择物流信息
            </Text>
            <View style={styles.rightContext}>
              <Text allowFontSacling={false} style={styles.payText} numberOfLines={1}>
                {logisticsAddress || ''}
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
              <Text allowFontSacling={false} style={styles.title}>
                自提点
              </Text>
              <View style={styles.rightContext}>
                <Text allowFontSacling={false} style={styles.payText}>
                  {pickUpWare && pickUpWare.wareName}
                </Text>
              </View>
            </View>
            <View style={styles.container}>
              <Text allowFontSacling={false} style={styles.title}>
                自提地址
              </Text>
              <View style={styles.rightContext}>
                <Text allowFontSacling={false} style={styles.payText} numberOfLines={1}>
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
    flex: 1
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
