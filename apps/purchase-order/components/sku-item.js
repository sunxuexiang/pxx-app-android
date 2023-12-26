import React from 'react';
import { Relax, msg } from 'plume2';
import {
  StyleSheet,
  View,
  Text,
  PixelRatio,
  TouchableOpacity,
  Image
} from 'react-native';
import * as WMkit from 'wmkit/kit';
import NumInput from 'wmkit/num-input';
import { noop } from 'wmkit/noop';
import Check from 'wmkit/check';
import WMImage from 'wmkit/image/index';
import Swipeout from 'react-native-swipeout';
import { screenWidth, panelColor } from 'wmkit/styles/index';
import { _calculateGoodsPrice } from '../kit';
import { mainColor } from 'wmkit/styles/index';
import Price from 'wmkit/price';
@Relax
export default class SkuItem extends React.Component {
  static relaxProps = {
    edit: 'edit',
    checkSku: noop,
    changeSkuNum: noop,
    init: noop,
    intervalPrices: 'intervalPrices',
    skuMarketingDict: 'skuMarketingDict',
    showModal: noop,
    showDistributeCommission: 'showDistributeCo,mmission',
    iepSwitch: 'iepSwitch',
    marketingInit: noop,
    validSku: noop,
    deleteSku: noop,
    loginFlag: 'loginFlag',
  };

  render() {
    const { sku, selectedMarketing, hasMarketing, hasManyMarketing } = this.props;
    const {
      edit,
      checkSku,
      changeSkuNum,
      intervalPrices,
      showModal,
      showDistributeCommission,
      iepSwitch,
      deleteSku,
      loginFlag
    } = this.props.relaxProps;
    const buyPoint = sku.toJS().buyPoint;
    const stock = sku.get('stock');
    const min = sku.get('buyCount');
    //缺货状态显示
    let noStock = sku.get('goodsStatus') == 1 && !edit;
    let goodsInfoId = sku.get('goodsInfoId');
    // 社交电商相关内容显示与否
    const social = showDistributeCommission && sku.get('distributionGoodsAudit') == 2;
    // 企业价
    const iepShowFlag =
      iepSwitch &&
      !noStock &&
      !social &&
      sku.get('enterPriseAuditStatus') == 2;
    const iepGoodsPrice = sku.get('enterPrisePrice');
    let price =
      social || buyPoint
        ? sku.get('marketPrice')
        : iepShowFlag
          ? iepGoodsPrice
          : sku.get('priceType') == 1
            ? _calculateGoodsPrice(sku, intervalPrices)
            : sku.get('marketPrice');
    //特价商品
    if (sku.get('goodsInfoType')==1 && !loginFlag){
      price=sku.get('specialPrice')
    }
    return (
      <View style={styles.container}>
        <Swipeout
          key={Math.random()}
          buttonWidth={80}
          right={[
            {
              component: [
                <View
                    style={[styles.swipeout, { backgroundColor: mainColor }]}
                >
                  <Text style={styles.swipeoutText}>删除</Text>
                </View>
              ],
              onPress: () => {
                deleteSku([sku.get('goodsInfoId')]);
              }
            }
          ]}
          backgroundColor="#fff"
          autoClose={true}
        >
        <View>
            <View style={styles.rowItem}>
              <Check
                disable={noStock}
                checked={WMkit.isLoginOrNotOpen() && sku.get('checked')}
                onCheck={() => {
                  checkSku(sku.get('goodsInfoId'));
                }}
                style={styles.check}
              />
              <TouchableOpacity
                activeOpacity={noStock ? 1 : 0.8}
                style={styles.item}
                onPress={() => {
                  msg.emit('router: goToNext', {
                    routeName: 'GoodsDetail',
                    skuId: sku.get('goodsInfoId')
                  });
                }}
              >
                <View>
                  <View style={styles.imgContent}>
                    <WMImage style={styles.img} src={sku.get('goodsInfoImg') && `${sku.get('goodsInfoImg')}?x-oss-process=image/format,jpg/interlace,1,image/resize,m_mfit,w_150,h_150`} />
                    {sku.get('goodsStatus') > 0 && (
                      <View style={styles.notGoods}>
                        <View style={styles.whiteBox}>
                          <Text style={styles.notGoodsText} allowFontScaling={false}>
                          {sku.get('goodsStatus') === 2 ? '失效' : '等货中'}
                        </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.content}>
                  <Text
                    style={styles.title}
                    allowFontSacling={false}
                    numberOfLines={2}
                  >
                    {sku.get('goodsInfoName').trim()}
                  </Text>
                  <Text
                    style={styles.gec}
                    allowFontSacling={false}
                    numberOfLines={1}
                  >
                    {sku.get('goodsSubtitle') || ''}
                  </Text>

                  <View style={styles.row}>
                    <View style={styles.lackItem}>
                      <Price
                        buyPoint={buyPoint}
                        price={price}
                        bigPriceStyle={{ fontSize: 16, marginBottom: -2 }}
                      />
                      {!edit && (
                        <NumInput
                          tipShow={true}
                          disableNumberInput={noStock}
                          defaultValue={noStock ? 0 : sku.get('buyCount')}
                          max={stock}
                          min={noStock ? 0 : 1}
                          minCount={sku.get('count')}
                          maxCount={sku.get('maxCount')}
                          delFlag={sku.get('delFlag')}
                          addedFlag={sku.get('addedFlag')}
                          addStep={1}
                          onDelayChange={(value) => {
                            changeSkuNum(
                              value,
                              sku.get('goodsInfoId'),
                              sku.get('stock')
                            );
                          }}
                          showStateError={sku.get('checked')}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            {hasMarketing && selectedMarketing && !edit ? (
              <View style={styles.editItems}>
                <Image
                  style={styles.arrowUp}
                  source={require('../img/arrow-up.png')}
                />
                <View style={[styles.couponItem, { backgroundColor: panelColor }]}>
                  <View style={styles.couponLeft}>
                    <Text style={[styles.couponTitle, { color: mainColor }]} allowFontSacling={false}>
                      促销
                    </Text>
                    <Text
                      style={styles.couponInfo}
                      allowFontSacling={false}
                      numberOfLines={1}
                    >
                      {selectedMarketing.marketingType===0&&selectedMarketing.alllevelDesc.includes('满1件')?selectedMarketing.alllevelDesc.replace('满1件','立'):selectedMarketing.alllevelDesc}
                    </Text>
                  </View>
                  {hasManyMarketing ? (
                    <TouchableOpacity
                      style={styles.couponRight}
                      activeOpacity={0.8}
                      onPress={() => {
                        let param = {
                          type: 'chooseGoodsMarketing',
                          goodsInfoId: goodsInfoId,
                          hasBottom: false
                        };

                        showModal(param);
                      }}
                    >
                      <Text style={[styles.rightText, { color: mainColor }]} allowFontScaling={false}>
                        修改
                      </Text>
                      <Image
                        style={[styles.arrow, { tintColor: mainColor }]}
                        source={require('wmkit/theme/d-arrow-s.png')}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            ) : null}
          </View>
        </Swipeout>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingRight: 12,
    paddingBottom: 8
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
  check: {
    width: screenWidth <= 320 ? 39 : 42,
    height: screenWidth <= 320 ? 39 : 42,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 12
  },
  title: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 12,
    lineHeight: 16
  },
  gec: {
    color: '#898989',
    fontSize: 10,
    lineHeight: 18
  },
  lackPrice: {
    color: '#cccccc'
  },
  imgContent: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 6
  },
  notGoods: {
    position: 'absolute',
    width: 80,
    height: 80,
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(000,000,000,0.3)',
    borderRadius: 6
  },
  whiteBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notGoodsText: {
    fontSize: 14,
    color: '#fff'
  },
  lackItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  lack: {
    width: 42,
    height: 16,
    backgroundColor: '#cccccc',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lackText: {
    fontSize: 12,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  row: {
    width: '100%',
    alignSelf: 'flex-end'
  },
  editItems: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginLeft: screenWidth <= 320 ? 39 : 42
  },
  arrowUp: {
    width: 11.5,
    height: 5,
    position: 'absolute',
    top: -5,
    left: 12
  },
  couponItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 5,
    borderRadius: 6,
    marginTop: 4,
    paddingTop: 5
  },
  couponLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  couponRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  couponTitle: {
    fontSize: 10,
    fontWeight: '500'
  },
  couponInfo: {
    paddingHorizontal: 8,
    color: 'rgba(0,0,0,0.8)',
    fontSize: 10,
    maxWidth: screenWidth - 155
  },
  rightText: {
    fontSize: 10,
    marginRight: 2
  },
  arrow: {
    width: 10,
    height: 10
  },
  spec: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 7,
    height: 14,
    alignItems: 'center',
    paddingHorizontal: 6,
    // paddingVertical: 3,
    marginTop: 4
  },
  gecText: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.8)'
  },
  perBuy: {
    position: 'absolute',
    bottom: 0,
    width: 80,
    height: 18,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: '#ff8400',
    justifyContent: 'center',
    alignItems: 'center'
  },
  perBuyStatus: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center'
  },
  commission: {
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.8)',
    // position: 'absolute'
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
