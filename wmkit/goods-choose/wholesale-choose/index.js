import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Map, List, fromJS } from 'immutable';
import NumInput from 'wmkit/num-input';
import WMImage from 'wmkit/image/index';
import LevelTag from 'wmkit/level-tag';

import MarketingLabel from 'wmkit/biz/marketing-label';
import {
  createImmutableData,
  calculateSpeInfo,
  changeSpecDetail,
  returnStockFlag,
  changeNum,
  purchase,
  saveGoodsLack,
  purchaseBatchAdd,
  goodsNotificationAll
} from './state-change';
import {
  priceColor,
  screenWidth,
  screenHeight,
  mainColor,
  isAndroid
} from 'wmkit/styles/index';
import * as _ from '../../common/util';
import * as WMkit from '../../kit';
import * as WareUtils from '../../ware-house/matchWare';
import { msg } from 'plume2';
import { cache } from '@/wmkit';

/**
 * 批发商品加入购物车展示
 */
export default class WMWholesaleChoose extends React.PureComponent {
  static defaultProps = {
    data: {},
    visible: false,
    changeSpecVisible: () => {}
  };

  /**
   * 用户改变sku购买数量
   * @param num 数量
   * @param stock 库存
   * @param goodsInfoId sku标识
   * @private
   */
  _changeNum = (savedNum, stock, goodsInfoId, prices) => {
    //savedNum = stock > 0 ? (savedNum < stock ? savedNum : stock) : 0;

    //找到当前购买数量对应的价格
    let goodsPrices = null;
    let goodsPricesMin = prices[0].price;
    prices.forEach((pri) => {
      if (savedNum >= pri.count) {
        goodsPrices = pri.price;
      }
      if (pri.price >= goodsPricesMin) {
        goodsPricesMin = pri.price;
      }
    });
    //若未找到,默认取第一个值作为价格
    if (goodsPrices === null) {
      goodsPrices = goodsPricesMin;
    }
    this.setState(
      changeNum(this.state, { num: savedNum, price: goodsPrices, goodsInfoId })
    );
  };

  /**
   * 用户改变sku购买数量
   * @param num 数量
   * @param stock 库存
   * @param goodsInfoId sku标识
   * @private
   */
  _getCountStockOut = async (count, index, goodsInfoId, goodsInfoNo) => {
    const cityCode = await WareUtils.queryChooseCity();
    const wareStr = await AsyncStorage.getItem(cache.MATCH_WARE_STORE);
    let wareId =JSON.parse(wareStr).wareId;
    let {stockOut} = this.state;
    if (!stockOut){
      stockOut=[];
    }
    let stockOutEntity = {};
    stockOutEntity['goodsInfoId'] = goodsInfoId;
    stockOutEntity['stockoutNum'] = count;
    stockOutEntity['cityCode'] = cityCode;
    stockOutEntity['goodsInfoNo'] = goodsInfoNo;
    stockOutEntity['wareId'] = wareId;
    stockOut[index] = stockOutEntity;

    this.setState({
      stockOut: stockOut,
    });
  };

  /**
   * 批发类型,订货量设价,不允许独立设价时展示spu统一的阶梯价格
   * @private
   */
  _showSpuIntervalPrices = () => {
    const { goodsIntervalPrices } = this.state;
    const prices = goodsIntervalPrices
      .filter((pri) => pri.get('type') === 0)
      .map((interPri) => {
        return {
          id: interPri.get('intervalPriceId'),
          price: interPri.get('price'),
          count: interPri.get('count')
        };
      })
      .sortBy((pri) => pri.count);

    return prices;
  };
  /**
   * 显示阶梯价格弹框
   * @param selfIntervalPrices 阶梯价
   * @private
   */
  _showSkuIntervalPrices = (selfIntervalPrices) => {
    this.setState({ showIntervalFlag: true, selfIntervalPrices });
  };
  /**
   * 切换选中前n-1个规格项的规格值
   * @param specDetailId
   * @param index
   * @private
   */
  _changeSpecDetail = (specDetailId, index) => {
    this.setState(changeSpecDetail(this.state, specDetailId, index));
  };

  constructor(props) {
    super(props);
    this.keyboardDidShowListener = null;
    this.keyboardDidHideListener = null;
    this.state = {
      showIntervalFlag: false,
      selfIntervalPrices: [],
      KeyboardShown: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data.skuId) {
      // 组装层级结构的规格数据
      const dataIm = createImmutableData(nextProps.data);
      // 计算前n-1个规格与最后一个规格内容
      this.setState({
        ...dataIm,
        ...calculateSpeInfo(dataIm)
      });
    }
  }

  UNSAFE_componentWillMount() {
    //监听键盘弹出事件
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShowHandler.bind(this)
    );
    //监听键盘隐藏事件
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHideHandler.bind(this)
    );
  }

  componentWillUnmount() {
    //卸载键盘弹出事件监听
    if (this.keyboardDidShowListener != null) {
      this.keyboardDidShowListener.remove();
    }
    //卸载键盘隐藏事件监听
    if (this.keyboardDidHideListener != null) {
      this.keyboardDidHideListener.remove();
    }
  }

  //键盘弹出事件响应
  keyboardDidShowHandler() {
    this.setState({ KeyboardShown: true });
  }

  //键盘隐藏事件响应
  keyboardDidHideHandler() {
    this.setState({ KeyboardShown: false });
  }

  render() {
    const { visible, changeSpecVisible, source, isPay } = this.props;
    const {
      minPrice = 0,
      maxPrice = 0,
      noSpecPrices = [],
      noSpecStockFlag = true,
      goods = Map(),
      goodsInfo = Map(),
      buyGoodsInfos = List(),
      images = List(),
      calGoodsSpecs = List(),
      stockOut=[],
    } = this.state;
    // 设价方式, 是否允许独立设价
    const priceType = goods.get('priceType');
    const allowPriceSet = goods.get('allowPriceSet');
    // 当前规格页已购买几件
    const goodsCount = buyGoodsInfos.reduce(
      (sumCount, info) => sumCount + info.get('buyCount'),
      0
    );
    const stockCount = stockOut ? stockOut.reduce((sumCount, info) => sumCount + info.stockoutNum, 0) : 0;
    //营销标签
    const marketingLabels = (
      goodsInfo.get('marketingLabels') || fromJS([])
    ).toJS();
    //优惠券标签
    const couponLabels = (goodsInfo.get('couponLabels') || fromJS([])).toJS();
    // 是否登录
    const loginFlag = window.token != undefined && window.token != '';

    let stockOutflag = false;
    if ( calGoodsSpecs&&calGoodsSpecs.size > 0) {
      let goodsInfoStock=calGoodsSpecs.get( calGoodsSpecs.size - 1).get('specDetails');
      goodsInfoStock.forEach((param) => {
        if (param.get('stock') <= 0) {
          stockOutflag = true;
          return;
        }
      });
    }
    const linePrice = goods.get('linePrice');
    
    return (
      <View
        style={[
          styles.panelBottom,
          (!visible || !goods) && { width: 0, height: 0 }
        ]}
      >
        {visible && goods && (
          <TouchableOpacity
            style={styles.mask}
            activeOpacity={0.8}
            onPress={() => {
              changeSpecVisible(false);
              Keyboard.dismiss();
            }}
          />
        )}
        <View
          style={[
            styles.panelBody,
            this.state.KeyboardShown && styles.contentKeyboard
          ]}
        >
          {/*弹窗关闭按钮*/}
          <TouchableOpacity
            style={styles.closeBox}
            activeOpacity={0.8}
            onPress={() => {
              changeSpecVisible(false);
              Keyboard.dismiss();
            }}
          >
            <Image style={styles.close} source={require('../img/close.png')} />
          </TouchableOpacity>

          {/*sku图文信息*/}
          <View style={styles.topBox}>
            <WMImage style={styles.img} src={images.get(0)&&`${images.get(0)}?x-oss-process=image/format,jpg/interlace,1,image/resize,m_mfit,w_120,h_120`} />
            <View style={styles.titleBox}>
              <Text
                style={styles.title}
                allowFontScaling={false}
                numberOfLines={2}
              >
                {goods ? goods.get('goodsName') : ' '}
              </Text>
              <Text
                style={styles.subTitle}
                allowFontScaling={false}
                numberOfLines={1}
              >
                {goods ? goods.get('goodsSubtitle') : ' '}
              </Text>
              <View style={[styles.tagCon]}>
                {/*若无规格时,在此处展示促销标签*/}
                {/* {(!calGoodsSpecs || calGoodsSpecs.size == 0) && ( */}
                  <MarketingLabel
                    marketingLabels={marketingLabels}
                    couponLabels={couponLabels}
                  />
                {/* )} */}
                {priceType == 1 && <LevelTag text="阶梯价2" />}
                {/*
                    因为spu与sku可能设价不一致等问题,暂时不展示会员权益
                    <LevelTag text="SVIP8.5折" />
                  */}
              </View>
              {/* 阶梯价 且 (不允许独立设价 或 无规格商品)*/}
              {priceType === 1 &&
              (allowPriceSet === 0 ||
                !calGoodsSpecs ||
                calGoodsSpecs.size === 0) ? (
                <ScrollView
                  horizontal={true}
                  alwaysBounceHorizontal={false}
                  contentContainerStyle={styles.rowFlex}
                >
                  {this._showSpuIntervalPrices().map((inter) => {
                    return (
                      <View style={styles.stepBox} key={inter.id}>
                        <Text style={[styles.price, { color: priceColor }]} allowFontScaling={false}>
                          <Text style={[styles.unit, { color: priceColor }]} allowFontScaling={false}>
                            ¥
                          </Text>
                          {inter.price}
                        </Text>
                        <Text style={styles.numText} allowFontScaling={false}>
                          ≥&nbsp;
                          {inter.count}
                        </Text>
                      </View>
                    );
                  })}
                </ScrollView>
              ) : (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {minPrice == maxPrice
                      ? <Text style={[styles.price, { color: priceColor }]} allowFontScaling={false}>
                          <Text style={[styles.unit, { color: priceColor }]} allowFontScaling={false}>
                            ¥
                          </Text>
                          {_.addZero(minPrice)}
                        </Text>
                      : (
                        <Text style={[styles.price, { color: priceColor }]} allowFontScaling={false}>
                          <Text style={[styles.unit, { color: priceColor }]} allowFontScaling={false}>
                            ¥
                          </Text>
                          {_.addZero(minPrice)}
                          <Text style={[styles.unit, { color: priceColor }]} allowFontScaling={false}>
                            ~¥
                          </Text>
                          {_.addZero(maxPrice)}
                        </Text>
                      )
                    }
                  {linePrice != null ? (
                    <Text allowFontScaling={false} style={styles.orPrice}>
                      ¥{_.addZero(linePrice)}
                    </Text>
                  ) : null}
                </View>
              )}


            </View>
          </View>

          {/*sku中间滚动区域*/}
          <ScrollView style={[styles.content]} alwaysBounceVertical={false}>
            {/*sku选择规格*/}
            {calGoodsSpecs && calGoodsSpecs.size > 0
              ? calGoodsSpecs.toJS().map((spec, index) => {
                  // 最后一个规格,展开展示
                  if (index === calGoodsSpecs.size - 1) {
                    return (
                      <View key={spec.specId}>
                        <Text style={styles.skuTitle} allowFontScaling={false}>
                          {spec.specName}
                        </Text>
                        {spec.specDetails.map((det,index) => {
                          const noStock = returnStockFlag(
                            det.stock,
                            det.minCount
                          );
                          return (
                            <View style={styles.skuItem} key={det.specDetailId}>
                              <View style={styles.skuTop}>
                                <Text
                                  style={styles.skuName}
                                  allowFontScaling={false}
                                >
                                  {det.detailName}
                                </Text>
                                <Text
                                  style={styles.otherText}
                                  allowFontScaling={false}
                                >
                                  {det.minCount && det.minCount + '起订1'}
                                  {det.maxCount && '，' + '可购' + det.maxCount}
                                  &nbsp;&nbsp;&nbsp;
                                  {det.stock<=0&&'库存不足'}
                                </Text>
                              </View>
                              <View style={styles.skuBottom}>
                                <View style={styles.tagCon}>
                                  <Text
                                    style={[styles.skuPrice, { color: priceColor }]}
                                    allowFontScaling={false}
                                  >
                                    ¥ { _.addZero(det.price)}
                                  </Text>
                                  {!!linePrice && (
                                    <Text allowFontScaling={false} style={styles.orPrice}>
                                      ¥{_.addZero(linePrice)}
                                    </Text>
                                  )}
                                  {/* <MarketingLabel
                                    marketingLabels={det.marketingLabels}
                                    couponLabels={det.couponLabels}
                                  /> */}
                                  {/*订货量设价*/}
                                  {priceType === 1 && allowPriceSet === 1 && (
                                    <TouchableOpacity
                                      onPress={() =>
                                        this._showSkuIntervalPrices(
                                          det.intervalPrices
                                        )
                                      }
                                      activeOpacity={0.8}
                                    >
                                      <Text
                                        style={styles.normalText}
                                        allowFontScaling={false}
                                      >
                                        阶梯价&gt;
                                      </Text>
                                    </TouchableOpacity>
                                  )}
                                </View>
                                {det.stock<=0?(
                                  <NumInput
                                    // disableNumberInput={noStock}
                                    value={ det.num}
                                    max={99999}
                                    onChange={(value) =>
                                      this._getCountStockOut(
                                        value,
                                        index,
                                        det.goodsInfoId,
                                        det.goodsInfoNo
                                      )
                                    }
                                    min={0}
                                    addStep={1}
                                    error={det.error}
                                  />
                                ):(
                                  <NumInput
                                    disableNumberInput={noStock}
                                    value={noStock ? 0 : det.num}
                                    max={det.stock || 0}
                                    onChange={(value) =>
                                      this._changeNum(
                                        value,
                                        det.stock,
                                        det.goodsInfoId,
                                        det.intervalPrices
                                      )
                                    }
                                    min={0}
                                    addStep={1}
                                    error={det.error}
                                  />
                                )}
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    );
                  } else {
                    return (
                      <View style={styles.specBox} key={spec.specId}>
                        <Text style={styles.specTitle} allowFontScaling={false}>
                          {spec.specName}
                        </Text>
                        <ScrollView
                          horizontal={true}
                          alwaysBounceHorizontal={false}
                          contentContainerStyle={styles.rowFlex}
                        >
                          {spec.specDetails.map((det) => {
                            return (
                              <TouchableOpacity
                                key={det.specDetailId}
                                style={[
                                  styles.specItem,
                                  spec.defaultVal === det.specDetailId
                                    ? {
                                        borderColor: mainColor,
                                        borderWidth: StyleSheet.hairlineWidth,
                                        backgroundColor: 'rgba(255, 102, 0, 0.06)'
                                      }
                                    : det.disabled
                                    ? styles.invalidItem
                                    : {}
                                ]}
                                onPress={
                                  spec.defaultVal !== det.specDetailId &&
                                  det.disabled
                                    ? () => {}
                                    : () => {
                                        this._changeSpecDetail(
                                          spec.defaultVal === det.specDetailId
                                            ? null
                                            : det.specDetailId,
                                          index
                                        );
                                      }
                                }
                                activeOpacity={0.8}
                              >
                                <Text
                                  style={[
                                    styles.specText,
                                    spec.defaultVal === det.specDetailId
                                      ? {
                                          color: mainColor,
                                          fontWeight: 'bold'
                                        }
                                      : det.disabled
                                      ? styles.invalidText
                                      : {}
                                  ]}
                                  allowFontScaling={false}
                                >
                                  {det.detailName}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                        </ScrollView>
                      </View>
                    );
                  }
                })
              : source != '1' && (
                  <View style={styles.numItem}>
                    <View style={styles.skuBottom}>
                      <Text style={styles.normalText} allowFontScaling={false}>
                        数量
                      </Text>
                      <View style={styles.retailNum}>
                        <Text style={styles.otherText} allowFontScaling={false}>
                          {goodsInfo.get('count') &&
                            goodsInfo.get('count') + '起订'}
                          {goodsInfo.get('maxCount') != undefined &&
                            '，' + '可购' + goodsInfo.get('maxCount')}
                          {goodsInfo.get('stock')<=0&&'库存不足'}
                          &nbsp;&nbsp;
                        </Text>
                        <NumInput
                          /*disableNumberInput={noSpecStockFlag}*/
                          value={ goodsInfo.get('num')>0?goodsInfo.get('num'):0}
                          max={goodsInfo.get('stock')>0 ? goodsInfo.get('stock') :9999 }
                          onChange={(value) =>
                            this._changeNum(
                              value,
                              goodsInfo.get('stock'),
                              goodsInfo.get('goodsInfoId'),
                              [{price: goodsInfo.get('specialPrice') || 0}]
                            )
                          }
                          min={0}
                          addStep={1}
                          error={goodsInfo.get('error')}
                        />
                      </View>
                    </View>
                  </View>
                )}
          </ScrollView>

          {calGoodsSpecs &&calGoodsSpecs.size >0?
            stockOutflag?(
              <View style={styles.bottom}>
                <TouchableOpacity
                  onPress={() =>
                    buyGoodsInfos && buyGoodsInfos.size > 0 &&
                    (isPay ? this._pay() : this._purchase())
                  }
                  style={[
                    styles.buttonBoxHalf,
                    { backgroundColor: mainColor },
                    (!buyGoodsInfos || buyGoodsInfos.size === 0) &&
                    styles.disabledBtnHalf
                  ]}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.button,
                      (!buyGoodsInfos || buyGoodsInfos.size === 0) &&
                      styles.disabledText
                    ]}
                    allowFontSacling={false}
                  >
                    {isPay ? '立即购买' : '加入购物车'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={(e) => this._goodsNotificationList(e)}

                  style={[
                    styles.buttonBoxHalf,
                    { backgroundColor: mainColor },
                    stockCount <= 0 &&
                    styles.disabledBtnHalf
                  ]}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.button,
                      (goodsInfo.get('num') <= 0 && stockCount <= 0) &&
                      styles.disabledText
                    ]}
                    allowFontSacling={false}
                  >
                    到货通知
                  </Text>
                </TouchableOpacity>
              </View>

            ):(
              <View style={styles.bottom}>
                <TouchableOpacity
                  onPress={() =>
                    buyGoodsInfos && buyGoodsInfos.size > 0 &&
                    (isPay ? this._pay() : this._purchase())
                  }
                  style={[
                    styles.buttonBox,
                    { backgroundColor: mainColor },
                    (!buyGoodsInfos || buyGoodsInfos.size === 0) &&
                    styles.disabledBtn
                  ]}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.button,
                      (!buyGoodsInfos || buyGoodsInfos.size === 0) &&
                      styles.disabledText
                    ]}
                    allowFontSacling={false}
                  >
                    {isPay ? '立即购买' : '加入购物车'}
                  </Text>
                </TouchableOpacity>
              </View>
              )
          :goodsInfo.get('stock')>0?(
            <View style={styles.bottom}>
              <TouchableOpacity
                onPress={() =>
                  buyGoodsInfos && buyGoodsInfos.size > 0 &&
                  (isPay ? this._pay() : this._purchase())
                }
                style={[
                  styles.buttonBox,
                  { backgroundColor: mainColor },
                  (!buyGoodsInfos || buyGoodsInfos.size === 0) &&
                  styles.disabledBtn
                ]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.button,
                    (!buyGoodsInfos || buyGoodsInfos.size === 0) &&
                    styles.disabledText
                  ]}
                  allowFontSacling={false}
                >
                  {isPay ? '立即购买' : '加入购物车'}
                </Text>
              </TouchableOpacity>
            </View>
          ):(
              <View style={styles.bottom}>
                <TouchableOpacity
                  onPress={() =>
                    buyGoodsInfos && buyGoodsInfos.size > 0 &&
                    this._goodsLackAdvise(goodsInfo)
                  }
                  style={[
                    styles.buttonBox,
                    { backgroundColor: mainColor },
                    (!buyGoodsInfos || buyGoodsInfos.size === 0) &&
                    styles.disabledBtn
                  ]}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.button,
                      (goodsInfo.get('num') <= 0 && !buyGoodsInfos || buyGoodsInfos.size === 0) &&
                      styles.disabledText
                    ]}
                    allowFontSacling={false}
                  >
                    到货通知
                  </Text>
                </TouchableOpacity>
              </View>

          )}
        </View>

        {/*点击后价格后的阶梯价是否显示阶梯价弹窗*/}
        {this.state.showIntervalFlag && (
          <View style={styles.stepPrice}>
            <TouchableOpacity
              style={styles.mask}
              activeOpacity={0.8}
              onPress={() => this.setState({ showIntervalFlag: false })}
            />
            <ScrollView
              horizontal={true}
              alwaysBounceHorizontal={false}
              style={styles.stepBody}
            >
              {this.state.selfIntervalPrices.map((inter) => {
                return (
                  <View style={styles.stepBox} key={inter.id}>
                    <Text style={[styles.price, { color: priceColor }]} allowFontScaling={false}>
                      ¥{inter.price}
                    </Text>
                    {/*<Text style={styles.delPrice} allowFontScaling={false}>
                      ¥132.00
                    </Text>*/}
                    <Text style={styles.numText} allowFontScaling={false}>
                      ≥&nbsp;
                      {inter.count}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>
    );
  }

  /**
   * 加入购物车
   * @private
   */
  _purchase = async () => {

    // if (!WMkit.isLoginOrNotOpen()) {
    //   msg.emit('loginModal:toggleVisible', {
    //     callBack: () => {
    //       msg.emit('router: replace', {
    //         routeName: 'GoodsListWithoutBottom'
    //       });
    //     }
    //   });
    // } else {
      const result = await purchase(this.state);
      if (result) {
        // 成功返回后,关闭弹框
        this.setState(result);
        this.props.changeSpecVisible(false);
      }
    // }
  };

  _goodsLackAdvise =async (info)=>{
    if (WMkit.isLoginOrNotOpen()) {
      const cityCode = await WareUtils.queryChooseCity();
      await saveGoodsLack(info,cityCode);
      this.props.changeSpecVisible(false);
    }else {
      msg.emit('loginModal:toggleVisible', {
        callBack: () =>{
          msg.emit('router: goToNext', {
            routeName: 'GoodsDetail',
            skuId: this.state().get('goodsInfoId')
          });
        }
      });
    }
  }
  _goodsNotificationList = async (e) => {
    if (WMkit.isLoginOrNotOpen()) {
      let {stockOut} = this.state;
      let stockRequest = [];
      if(stockOut){
        for (let i = 0; i < stockOut.length; i++) {
          if (stockOut[i]) {
            stockRequest.push(stockOut[i]);
          }
        }
      }
      let request = {};
      if (stockRequest.length === 0) {
        msg.emit('app:tip', '请选择需要到货通知的商品');
        return
      }
      request['stockOutList'] = stockRequest;
      await goodsNotificationAll(request);
      this.setState({
        stockOut: [],
      });
      this.props.changeSpecVisible(false);
    }else {
      //未登录
      msg.emit('loginModal:toggleVisible', {
        callBack: () =>{
          msg.emit('router: goToNext', {
            routeName: 'GoodsDetail',
            skuId: this.state().get('goodsInfoId')
          });
        }
      });
    }
  }
  /**
   * 立即购买
   */
  _pay = async () => {
    const { goodsInfo } = this.state;

    await purchaseBatchAdd(this.state);
    this.props._didConfirm(goodsInfo);
  };
}

const styles = StyleSheet.create({
  panelBottom: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    zIndex: 1000
  },
  mask: {
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
    height: '100%'
  },
  panelBody: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: screenWidth,
    maxHeight: screenHeight * 0.8,
    paddingTop: 49,
    ..._.ifIphoneX(
      {
        paddingBottom: 34,
      },
      {
        paddingBottom: 0,
      },
    ),
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  closeBox: {
    position: 'absolute',
    top: 14,
    right: 17,
    zIndex: 100
  },
  close: {
    width: 20,
    height: 20
  },
  topBox: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingBottom: 10
  },
  img: {
    width: 96,
    height: 96,
    borderRadius:10
  },
  titleBox: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 12,
    justifyContent: 'space-between'
  },
  title: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 12,
    // marginBottom: 6
  },
  subTitle: {
    color: '#898989',
    fontSize: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: '500'
  },
  unit: {
    fontSize: 10
  },
  orPrice: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 10,
    textDecorationLine: 'line-through',
    marginLeft:6
  },
  tagCon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    flex: 1
  },
  contentKeyboard: {
    backgroundColor: '#fff',
    ..._.ifIphoneX(
      {
        maxHeight: screenHeight * 0.8 + 210,
        paddingBottom: 210
      },
      {
        maxHeight: screenHeight * 0.8 + 180,
        paddingBottom: 100
      }
    )
  },
  specBox: {
    marginTop: 10
  },
  specTitle: {
    color: '#333',
    fontSize: 14,
    marginRight: 10,
    fontWeight: '500',
    marginBottom: 10
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  specText: {
    color: '#333',
    fontSize: 12
  },
  specItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 14
  },
  invalidItem: {
    backgroundColor: '#ebebeb'
  },
  invalidText: {
    color: '#999'
  },
  skuTitle: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 15,
    color: '#333'
  },
  skuItem: {
    paddingRight: 10,
    paddingBottom: 20
  },
  numItem: {
  },
  skuTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  skuName: {
    color: '#333',
    fontSize: 13,
    maxWidth: 108
  },
  otherText: {
    color: '#999',
    fontSize: 10,
    marginRight: 30,
  },
  skuBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5
  },
  retailNum: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  skuPrice: {
    fontSize: 15,
    marginRight: 5
  },
  normalText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)',
    fontWeight: '500'
  },
  bottom: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonBox: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 25,
    width: screenWidth - 20
  },
  button: {
    color: '#fff',
    fontSize: 14
  },
  disabledBtn: {
    backgroundColor: '#ebebeb',
    width: screenWidth - 20,
    borderRadius: 25,
    height: 36
  },

  buttonBoxHalf: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 25,
    width: screenWidth/2 - 10
  },
  disabledBtnHalf: {
    backgroundColor: '#ebebeb',
    width: screenWidth/2 - 10,
    borderRadius: 25,
    height: 36
  },
  disabledText: {
    color: '#fff'
  },
  stepPrice: {
    width: screenWidth,
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000
  },
  stepPriceBox: {},
  stepBody: {
    position: 'absolute',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    ..._.ifIphoneX(
      {
        bottom: 75
      },
      {
        bottom: isAndroid ? 69 : 45
      }
    ),
    left: 0,
    width: screenWidth
  },
  stepBox: {
    marginRight: 36
  },
  delPrice: {
    fontSize: 13,
    color: '#999',
    textDecorationLine: 'line-through',
    marginTop: 10,
    marginBottom: 5
  },
  numText: {
    fontSize: 13,
    color: '#333'
  }
});
