import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Relax, msg } from 'plume2';

import { screenWidth, mainColor } from 'wmkit/styles/index';
import * as Button from 'wmkit/button';
import { noop } from 'wmkit/noop';
import * as WMkit from 'wmkit/kit';
import Price from 'wmkit/price';

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
    changeShareModal: noop,
    grouponDetailOptStatus: 'grouponDetailOptStatus',
    grouponActivity: 'grouponActivity',
    tradeGroupon: 'tradeGroupon'
  };

  UNSAFE_componentWillMount() {
    // 商品详情中购物车数量角标更新方法
    msg.on('purchaseNum:refresh', this.props.relaxProps.updatePurchaseCount);
  }

  componentWillUnmount() {
    msg.off('purchaseNum:refresh', this.props.relaxProps.updatePurchaseCount);
  }

  render() {
    const {
      purchaseCount,
      store,
      changeRetailSaleVisible,
      serviceFlag,
      goodsInfo,
      tradeGroupon,
      grouponDetailOptStatus,
      grouponActivity
    } = this.props.relaxProps;
    // 社交电商相关内容显示与否
    // const social = WMkit.isDistributor();
    //划线价
    const lineShowPrice = this._originPriceInfo(goodsInfo);
    return (
      <View style={styles.detailBottom}>
        <View style={styles.bottomBar}>
          {serviceFlag && (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.barItem}
              onPress={() => {
                if (WMkit.isLoginOrNotOpen()) {
                  msg.emit('router: goToNext', {
                    routeName: 'ChoseService',
                    storeId: store.get('storeId')
                  });
                } else {
                  msg.emit('loginModal:toggleVisible', {
                    callBack: () => {
                      msg.emit('router: goToNext', {
                        routeName: 'ChoseService',
                        storeId: store.get('storeId')
                      });
                    }
                  });
                }
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
            <Text allowFontScaling={false} style={styles.barItemText}>
              购物车
            </Text>
          </TouchableOpacity>
          <View style={styles.btnBox}>
            {/* 单独购买 */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.simpleBtn}
              onPress={() => {
                this._go(1, goodsInfo.get('goodsInfoId'));
              }}
            >
              {/*<Price
                price={lineShowPrice}
                buyPoint={goodsInfo.get('buyPoint')}
              />*/}

              {this._renderSimpleHtml(lineShowPrice, goodsInfo.get('buyPoint'))}
            </TouchableOpacity>
            {/* 开团-可以开团 */}
            {grouponDetailOptStatus == 0 && (
              <SubmitButton
                colors={[mainColor, mainColor]}
                text={this._renderGrouponHtml(goodsInfo, grouponActivity)}
                onClick={() => {
                  if (!WMkit.isLoginOrNotOpen()) {
                    msg.emit('loginModal:toggleVisible', {
                      callBack: () => {
                        changeRetailSaleVisible(true);
                      }
                    });
                  } else {
                    changeRetailSaleVisible(true);
                  }
                }}
              />
            )}
            {/* 开团-查看团详情 */}
            {grouponDetailOptStatus == 1 && (
              <SubmitButton
                colors={[mainColor, mainColor]}
                text={'查看团详情'}
                onClick={() => {
                  this._go(2, tradeGroupon.get('grouponNo'));
                }}
              />
            )}
            {/* 开团-活动已结束 */}
            {grouponDetailOptStatus == 4 && (
              <SubmitButton
                btnStyle={{
                  backgroundColor: '#eee',
                  borderColor: '#eee'
                }}
                btnTextStyle={{
                  color: '#666'
                }}
                text={'拼团已结束'}
                onClick={() => {
                  this._go(4, tradeGroupon.get('grouponNo'));
                }}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
  _renderSimpleHtml = (lineShowPrice, point) => {
    return (
      <View style={styles.simpleView}>
        <Price price={lineShowPrice} buyPoint={point} />
        <Text style={[styles.simpleText, { color: mainColor }]}>单独购买</Text>
      </View>
    );
  };
  _go = (type, optid) => {
    // 单独购买
    if (type == 1) {
      msg.emit('router: goToNext', {
        routeName: 'GoodsDetail',
        skuId: optid
      });
    }
    // 查看团详情
    if (type == 2) {
      if (!WMkit.isLoginOrNotOpen()) {
        msg.emit('loginModal:toggleVisible', {
          callBack: () => {
            msg.emit('router: goToNext', {
              routeName: 'GroupBuyDetail',
              grouponNo: optid
            });
          }
        });
      } else {
        msg.emit('router: goToNext', {
          routeName: 'GroupBuyDetail',
          grouponNo: optid
        });
      }
    }
  };
  /**
   * 获取是否展示划线价,以及划线价
   *   b.若划线价不存在
   *     b.1.登录前,展示sku市场价
   *     b.2.登陆后,展示sku会员价
   * @private
   */
  _originPriceInfo = (goodsInfoIm) => {
    if (WMkit.isLoginOrNotOpen()) {
      return goodsInfoIm.get('salePrice');
    } else {
      return goodsInfoIm.get('marketPrice');
    }
  };
  _renderGrouponHtml = (goodsInfo, grouponActivity) => {
    let html = null;
    html = (
      <Text style={styles.simpleView}>
        <Text style={styles.btnText}>
          ￥{_.addZero(goodsInfo.get('grouponPrice'))}
        </Text>
        {'\n'}
        <Text style={[styles.btnText, { fontSize: 10 }]}>
          {grouponActivity.get('grouponNum')}人拼
        </Text>
      </Text>
    );
    return html;
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
    textAlign: 'center',
    fontSize:10
  },
  numTip: {
    position: 'absolute',
    top: -5,
    right: -8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 12,
    height: 12,
    borderRadius: 50,
    zIndex: 999
  },
  numTipText: {
    color: '#fff',
    fontSize: 8,
    backgroundColor: 'transparent'
  },
  img: {
    width: 16,
    height: 16,
    marginBottom: 3
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnText: {
    color: '#fff'
  },
  simpleBtn: {
    width: 92,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#cfe5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  simpleView: {
    justifyContent: 'center',
    alignItems: 'center'
    // marginTop: 10
  },
  simpleText: {
    fontSize: 10
  },
  btnBox: {
    flexDirection: 'row',
    marginRight: 10
  }
});
