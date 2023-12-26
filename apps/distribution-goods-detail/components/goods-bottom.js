import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Relax, msg } from 'plume2';

import { screenWidth, mainColor } from 'wmkit/styles/index';
import * as Button from 'wmkit/button';
import * as WMkit from 'wmkit/kit';
import { noop } from 'wmkit/noop';
import * as _ from '../../../wmkit/common/util'; // added by scx 

const SubmitButton = Button.Submit;

@Relax
export default class GoodsBottom extends Component {
  static relaxProps = {
    purchaseCount: 'purchaseCount',
    store: 'store',
    serviceFlag: 'serviceFlag',
    goods: 'goods',
    updatePurchaseCount: noop,
    changeWholesaleVisible: noop,
    changeRetailSaleVisible: noop,
    goodsInfo: 'goodsInfo',
    isDistributor: 'isDistributor',
    changeShareModal: noop
  };

  UNSAFE_componentWillMount() {
    // 商品详情中购物车数量角标更新方法
    msg.on('purchaseNum:refresh', this.props.relaxProps.updatePurchaseCount);
  }

  componentWillUnmount() {
    msg.off('purchaseNum:refresh', this.props.relaxProps.updatePurchaseCount);
  }

  render() {
    const { purchaseCount, store, serviceFlag, goodsInfo, changeShareModal } = this.props.relaxProps;
    // 社交电商相关内容显示与否
    const social = WMkit.isDistributor();

    return (
      <View style={styles.detailBottom}>
        <View style={styles.bottomBar}>
          {serviceFlag && (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.barItem}
              onPress={() => {
                // if (WMkit.isLoginOrNotOpen()) {
                //   msg.emit('router: goToNext', {
                //     routeName: 'ChoseService',
                //     storeId: store.get('storeId')
                //   });
                // } else {
                //   msg.emit('loginModal:toggleVisible', {
                //     callBack: () => {
                //       msg.emit('router: goToNext', {
                //         routeName: 'ChoseService',
                //         storeId: store.get('storeId')
                //       });
                //     }
                //   });
                // }
                msg.emit('router: goToNext', {
                  routeName: 'SobotLink'
                });
              }}
            >
              <Image
                style={styles.img}
                source={require('../img/service.png')}
              />
              <Text allowFontScaling={false} style={styles.barItemText}>
                客服
              </Text>
            </TouchableOpacity>
          )}
         {/* <TouchableOpacity
            activeOpacity={1}
            style={styles.barItem}
            onPress={() =>
              msg.emit('router: goToNext', {
                routeName: 'StoreMain',
                storeId: store.get('storeId')
              })
            }
          >
            <Image style={styles.img} source={require('../img/store.png')} />
            <Text allowFontScaling={false} style={styles.barItemText}>
              店铺
            </Text>
          </TouchableOpacity>*/}
          <TouchableOpacity
            activeOpacity={1}
            style={styles.barItem}
            onPress={() =>
              msg.emit('router: goToNext', {
                routeName: 'PurchaseOrderWithoutBottom'
              })
            }
          >
            <View>
              {purchaseCount ? (
                <View style={[styles.numTip, { backgroundColor: mainColor }]}>
                  <Text allowFontScaling={false} style={styles.numTipText}>
                    {purchaseCount}
                  </Text>
                </View>
              ) : null}
              <Image style={styles.img} source={require('../img/cart.png')} />
            </View>
            <Text allowFontScaling={false} style={{color: mainColor}}>
              购物车
            </Text>
          </TouchableOpacity>
          {social && goodsInfo.get('distributionGoodsAudit') == '2' ? (
            <View style={styles.rowFlex}>
              {/*<SubmitButton*/}
              {/*disabled={false}*/}
              {/*text={'立即购买'}*/}
              {/*onClick={() => this._addPurchase()}*/}
              {/*/>*/}
              <SubmitButton
                disabled={false}
                text="加入购物车"
                onClick={() => this._addPurchase()}
              />
              <SubmitButton
                boxStyle={{ backgroundColor: '#000' }}
                disabled={false}
                text={'分享赚' + '\n' + '赚' + _.addZero(goodsInfo.get('distributionCommission')) + '元'}
                onClick={() => changeShareModal()}
              />
            </View>
          ) : (
              <SubmitButton
                disabled={false}
                text="加入购物车"
                onClick={() => this._addPurchase()}
              />
            )}
        </View>
      </View>
    );
  }

  //加入购物车
  _addPurchase = () => {
    const { goods } = this.props.relaxProps;
    //弹出规格框
    if (goods.get('saleType') == 0) {
      this.props.relaxProps.changeWholesaleVisible(true);
    } else {
      this.props.relaxProps.changeRetailSaleVisible(true);
    }
  };
}

const styles = StyleSheet.create({
  detailBottom: {
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    borderStyle: 'solid',
    backgroundColor: '#fff',
    width: screenWidth,
    position: 'absolute',
    left: 0,
    ..._.ifIphoneX(
      {
        height: 83,
        paddingBottom: 35
      },
      {
        height: 48
      }
    ),
    zIndex: 999
  },
  bottomBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    height: 47
  },
  barItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 46
  },
  barItemText: {
    color: '#333',
    textAlign: 'center'
  },
  numTip: {
    position: 'absolute',
    top: -5,
    right: -8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 18,
    height: 18,
    borderRadius: 50,
    zIndex: 999
  },
  numTipText: {
    color: '#fff',
    fontSize: 12,
    backgroundColor: 'transparent'
  },
  img: {
    width: 24,
    height: 24,
    tintColor: '#000'
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
