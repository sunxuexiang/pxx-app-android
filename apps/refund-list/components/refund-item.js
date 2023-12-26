import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PixelRatio
} from 'react-native';
import { Relax, msg } from 'plume2';

import { Const } from 'wmkit/const';
import { noop } from 'wmkit/noop';
import { Confirm } from 'wmkit/modal/confirm';

import SelfSalesLabel from 'wmkit/biz/selfsales-label';
import { priceColor, screenWidth, mainColor } from 'wmkit/styles/index';

const noneImg = require('../img/none.png');

@Relax
export default class RefundItem extends React.Component {
  static relaxProps = {
    cancel: noop
  };

  render() {
    let { refundOrder } = this.props;

    let returnFlowState = refundOrder.returnFlowState;
    let applyPrice = refundOrder.returnPrice.applyStatus
      ? refundOrder.returnPrice.applyPrice
      : refundOrder.returnPrice.totalPrice;

    //退货赠品
    const returnGifts = refundOrder.returnGifts || [];
    //所有商品
    let items = refundOrder.returnItems.concat(returnGifts);
    let itemCount = items.length;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            msg.emit('router: goToNext', {
              routeName: 'StoreMain',
              storeId: refundOrder.company.storeId
            });
          }}
        >
          <View style={styles.lineItem}>
            <View style={styles.codeContainer}>
              {!(refundOrder && refundOrder.platform == 'CUSTOMER') && (
                  <Image style={styles.bg} source={require('../img/dai.png')} />
                )}
             {/* <Image
                style={styles.bg}
                source={
                  refundOrder.platform == 'CUSTOMER'
                    ? require('../img/tag.png')
                    : require('../img/dai.png')
                }
              /> */}
              {refundOrder.company &&
                refundOrder.company.companyType == 0 && <SelfSalesLabel />}
              <TouchableOpacity
                /*onPress={() => this._goStore(refundOrder.company.storeId)}*/
              >
                <View style={styles.itemCount}>
                  <Text
                    style={styles.code}
                    allowFontScaling={false}
                    numberOfLines={2}
                  >
                    {refundOrder.company && refundOrder.company.storeName}
                  </Text>
                  <Image
                    source={require('../img/arrow.png')}
                    style={styles.arrow}
                  />
                </View>
              </TouchableOpacity>


            </View>
            <Text
              style={[
                styles.status,
                refundOrder.returnType == 'RETURN'
                  ? Const.returnGoodsState[returnFlowState] == '已作废' ||
                    Const.returnGoodsState[returnFlowState] == '已完成'
                    ? { color: '#999' }
                    : Const.returnGoodsState[returnFlowState] == '拒绝收货' ||
                      Const.returnGoodsState[returnFlowState] == '拒绝退款'
                      ? { color: mainColor }
                      : { color: mainColor }
                  : Const.returnMoneyState[returnFlowState] == '已作废' ||
                    Const.returnMoneyState[returnFlowState] == '已完成'
                    ? { color: '#999' }
                    : Const.returnGoodsState[returnFlowState] == '拒绝收货' ||
                      Const.returnMoneyState[returnFlowState] == '拒绝退款'
                      ? { color: mainColor }
                      : { color: mainColor }
              ]}
              allowFontScaling={false}
            >
              {refundOrder.returnType == 'RETURN'
                ? Const.returnGoodsState[returnFlowState]
                : Const.returnMoneyState[returnFlowState] || ''}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.lineItem, styles.itemContainer]}
          onPress={() => {
            msg.emit('router: goToNext', {
              routeName: 'ReturnDetail',
              rid: refundOrder.id
            });
          }}
        >
          <View style={styles.imgContainer}>
            {items.map((item, index) => {
              return index < 4 ? (
                <Image
                  key={index + item.pic}
                  style={styles.img}
                  source={item.pic ? { uri: item.pic } : noneImg}
                />
              ) : null;
            })}
          </View>
          <View style={styles.itemCount}>
            <Text style={styles.grey} allowFontScaling={false}>
              {itemCount}
            </Text>
            <Image source={require('../img/arrow.png')} style={styles.icon} />
          </View>
        </TouchableOpacity>
        <View style={styles.lineItem}>
          <View style={styles.bottom}>
            <Text style={[styles.price, { color: priceColor }]} allowFontScaling={false}>
              ¥{applyPrice.toFixed(2)}
            </Text>
            {returnFlowState === 'INIT' && (
              <TouchableOpacity activeOpacity={0.8} style={[styles.btn, { borderColor: mainColor }]}>
                <Text
                  allowFontScaling={false}
                  style={[styles.text, { color: mainColor }]}
                  onPress={() => {
                    Confirm({
                      title: '取消退货退款',
                      text: '您确定要取消该退货退款？',
                      okFn: () => {
                        this.props.relaxProps.cancel(refundOrder.id);
                      },
                      cancelFn: () => {},
                      okText: '确定',
                      cancelText: '取消'
                    });
                  }}
                >
                  取消退单
                </Text>
              </TouchableOpacity>
            )}
            {/*退货单的已审核状态*/}
            {returnFlowState === 'AUDIT' &&
              refundOrder.returnType == 'RETURN' && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.btn, { borderColor: mainColor }]}
                  onPress={() =>
                    msg.emit('router: goToNext', {
                      routeName: 'LogisticsInput',
                      rid: refundOrder.id,
                      storeId: refundOrder.company.storeId
                    })
                  }
                >
                  <Text allowFontScaling={false} style={[styles.text, { color: mainColor }]}>
                    填写物流
                  </Text>
                </TouchableOpacity>
              )}
          </View>
        </View>
        {/* <Image style={styles.boline} source={require('../img/line.png')} /> */}
      </View>
    );
  }
  /**
   * 跳转至店铺首页
   * @private
   */
  _goStore = (storeId) => {
    msg.emit('router: goToNext', { routeName: 'StoreMain', storeId });
  };
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginTop: 12,
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingBottom: 16
  },
  lineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  img: {
    width: 56,
    height: 56,
    marginRight: 10,
    borderRadius: 4
    // borderColor: '#ebebeb',
    // borderWidth: 1 / PixelRatio.get()
  },
  itemCount: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemContainer: {
    // borderTopWidth: 1 / PixelRatio.get(),
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderColor: '#ebebeb'
  },
  bg: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 3
  },
  white: {
    color: '#ffffff',
    fontSize: 10,
    backgroundColor: 'transparent'
  },
  code: {
    fontSize: 15,
    color: '#333333',
    maxWidth: screenWidth - 200,
    marginLeft: 2
  },
  arrow:{
    width:12,
    height:12
  },
  status: {
    fontSize: 14
  },
  grey: {
    fontSize: 12,
    color: '#333'
  },
  icon: {
    width: 12,
    height: 12,
    marginLeft: 4
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1
  },
  price: {
    fontSize: 14
  },
  boline: {
    width: screenWidth - 11,
    height: 2,
    marginLeft: -10
  },
  btn: {
    width: 64,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  },
  text: {
    fontSize: 10
  }
});
