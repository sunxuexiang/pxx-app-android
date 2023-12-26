import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { mainColor } from 'styles';
import * as WMkit from 'wmkit/kit';
import * as _ from 'wmkit/common/util';
import { msg } from 'plume2';



const arrowDowm = require('../img/arrow-down.png');
const arrowUp = require('../img/arrow-up.png');
const plus = require('../img/plus.png');
const defaultImg = require('../img/default-img.png');
import LinearGradient from 'react-native-linear-gradient';


type ICombinationItemProps = T.IProps & T.ICombinationItemProps;

@connect<Partial<ICombinationItemProps>, T.ICombinationItemState>(
  store2Props,
  actions,
)
export default class CombinationItem extends React.Component<
Partial<ICombinationItemProps>,
T.ICombinationItemState
> {
  constructor(props: ICombinationItemProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: { action: { changeCheck, immediateBuy } },
      main,
      orderItem
    } = this.props;
    const mainGoods = orderItem.marketingSuitsGoodsInfoDetailVO;

    // const mainImg = mainGoods.mainImage ? mainGoods.mainImage : defaultImg;
    const suitsRelationList = orderItem.suitsRelationGoodsInfoVOList;
    return (
      <View style={styles.combinationItem}>
        <View style={styles.cbMain}>
          <View style={styles.cbBlock}>
            <Image
              source={mainGoods.mainImage ? { uri: mainGoods.mainImage } : defaultImg}
              style={styles.cbImg} />
            <View style={styles.cbInfo}>
              <Text style={styles.cbInfoName} numberOfLines={2}>{mainGoods.marketingName}</Text>
              <Text style={{ color: mainColor }}>￥{_.addZero(mainGoods.suitsPrice)}</Text>
              <Text style={styles.bottomPrice}>
                最高省
                <Text style={[styles.yellow, { color: mainColor }]}>￥{_.addZero(mainGoods.suitsNoNeedPrice)}</Text>
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => {
            changeCheck(mainGoods.marketingId);
          }}>
            <Image
              source={orderItem.isOpen ? arrowUp : arrowDowm}
              style={styles.arrow}
            />
          </TouchableOpacity>
        </View>
        {
          orderItem.isOpen ?
            <View >
              {
                suitsRelationList.map((item) => {
                  return (
                      <TouchableOpacity onPress={() =>
                        msg.emit('router: goToNext', {
                        routeName: 'GoodsDetail',
                        skuId: item.goodInfoId
                      })
                      }>
                    <View style={styles.cbMainOpen}  >
                      <View style={styles.cbBlockOpen}>
                        <Image
                          source={item.mainImage ? { uri: item.mainImage } : defaultImg}
                          style={styles.cbImg}
                        />
                        <View style={styles.cbInfo}>
                          <Text style={styles.cbInfoName} numberOfLines={2}>{item.goodsInfoName}</Text>
                          <Text style={styles.cbInfoSpec}>{item.specDetail ? item.specDetail : ''}</Text>
                          <Text style={styles.cbInfoNum}>×{item.goodsInfoNum ? item.goodsInfoNum : 0}</Text>
                        </View>
                      </View>
                    </View></TouchableOpacity>
                  )
                })
              }
              <TouchableOpacity activeOpacity={0.8} onPress={() => {
                WMkit.isLoginOrNotOpen() ?
                  immediateBuy(mainGoods.marketingId) :  //显示登录弹框
                  msg.emit('loginModal:toggleVisible', {
                    callBack: () => {
                      msg.emit('router: refresh');
                    }
                  });;
              }}>
                <LinearGradient
                  colors={[mainColor, mainColor]}
                  style={[styles.bugBtnBox]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                >
                  <Text style={styles.bugBtn}>立即购买</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            :
            <View style={styles.closeList}>
              {
                suitsRelationList.map((item, index) => {
                  return (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={item.mainImage ? { uri: item.mainImage } : defaultImg}
                        style={styles.mainImg} />
                      {
                        ((index + 1) % 4 == 0 && index != 0) || suitsRelationList.length - 1 == index ? null : <Image source={plus} style={styles.plusImg} />
                      }
                    </View>
                  )
                })
              }
            </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  combinationItem: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    marginBottom: 12
  },
  cbMain: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cbBlock: {
    flexDirection: 'row',
    flex: 1,
    // width: 1
  },
  cbImg: {
    width: 72,
    height: 72,
    borderRadius: 3,
    marginRight: 12
  },
  cbInfo: {
    flex: 1
  },
  cbInfoName: {
    fontWeight: '500',
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 16,
    // .text-overflow(2);
  },
  bottomPrice: {
    fontSize: 10,
    color: '#999999',
    marginTop: 2
  },
  yellow: {
    fontSize: 10,
  },
  arrow: {
    width: 24,
    height: 24,
    marginLeft: 12
  },
  closeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  mainImg: {
    width: 72,
    height: 72,
    borderRadius: 4,
    marginTop: 16
  },
  plusImg: {
    width: 12,
    height: 12,
    marginHorizontal: 4,
    marginTop: 16,
  },
  bugBtn: {
    fontSize: 14,
    color: '#ffffff',
  },
  cbMainOpen: {
    marginTop: 16
  },
  cbInfoSpec: {
    color: '#999999',
    fontSize: 10
  },
  cbInfoNum: {
    color: '#999999',
    fontSize: 10,
    // align-items: flex-end;
    textAlign: 'right',
    marginTop: 10
  },
  cbBlockOpen: {
    flexDirection: 'row',
    // flex: 1,
    // width: 1
  },
  bugBtnBox: {
    width: '100%',
    height: 36,
    marginTop: 16,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center'
  }






  // .open-list {
  //   .cb-main {
  //     margin-top: 32px;

  //     .cb-info-spec {
  //       color: #999999;
  //       font-size: 20px;
  //     }

  //     .cb-info-num {
  //       color: #999999;
  //       font-size: 20px;
  //       // align-items: flex-end;
  //       text-align: right;
  //       margin-top: 20px;
  //     }
  //   }
  // }
}

);
