import React from 'react';
import { Image, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fromJS, is, List, Map } from 'immutable';
import * as WMkit from 'wmkit/kit';
import NumInput from 'wmkit/num-input';
import WMImage from 'wmkit/image/index';

import MarketingLabel from 'wmkit/biz/marketing-label';
import {
  calculateSpeInfo,
  changeNum,
  changePurchase,
  changeSpecDetail,
  createImmutableData,
  purchase,
  returnCartStockFlag,
  returnStockFlag,
  rushToBuyingFlashSaleGoodsInfo,
  saveGoodsLack
} from './state-change';
import { isIOS, mainColor, priceColor, screenHeight, screenWidth } from 'wmkit/styles/index';
import * as _ from '../../common/util';
import * as Button from 'wmkit/button';
import moment from 'moment';
import { msg } from 'plume2';
import * as WareUtils from '../../ware-house/matchWare';


const SubmitButton = Button.Submit;
/**
 * 零售销售类型的商品-规格选择弹框
 */
export default class WMRetailChoose extends React.PureComponent {
  static defaultProps = {
    data: {},
    visible: false,
    isGoodsDetail: false, //是否从商品详情页打开
    changeSpecVisible: () => {
    },
    dataCallBack: () => {
    },
  };

  constructor(props) {
    super(props);
    this.keyboardDidShowListener = null;
    this.keyboardDidHideListener = null;
    this.state = {
      KeyboardShown: false,
    };
  }

  UNSAFE_componentWillMount() {
    //监听键盘弹出事件
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShowHandler.bind(this),
    );
    //监听键盘隐藏事件
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHideHandler.bind(this),
    );
  }

  componentWillUnmount() {
    const { flashsaleGoods, flashsaleGoodsFlag } = this.props;
    if (flashsaleGoodsFlag) {
      this._changeNum(
        flashsaleGoods.get('minNum'),
        flashsaleGoods.get('stock'),
        flashsaleGoods.get('goodsInfoId'),
      );
    }
    //卸载键盘弹出事件监听
    if (this.keyboardDidShowListener != null) {
      this.keyboardDidShowListener.remove();
    }
    //卸载键盘隐藏事件监听
    if (this.keyboardDidHideListener != null) {
      this.keyboardDidHideListener.remove();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const visible = nextProps.visible;
    const goods = nextProps.data || {};
    const thisGoods = this.props.data || {};
    if (this.state.goodsInfo) {
      const flashsaleGoods = nextProps.flashsaleGoods || {};
      const flashsaleGoodsFlag = nextProps.flashsaleGoodsFlag;
      if (flashsaleGoodsFlag) {
        this._changeNum(
          flashsaleGoods.get('minNum'),
          flashsaleGoods.get('stock'),
          flashsaleGoods.get('goodsInfoId'),
        );
      }
    }
    // if (nextProps.data && nextProps.data.skuId) {
    if (
      !is(fromJS(goods), fromJS(thisGoods)) &&
      nextProps.data &&
      nextProps.data.skuId
    ) {
      // 组装层级结构的规格数据
      const dataIm = createImmutableData(nextProps.data);
      // 主要是计算每个规格值是否灰化不可点击, 以及计算得出当前的sku
      this.setState(
        {
          ...dataIm,
          ...calculateSpeInfo(dataIm),
        },
        () => {
          const flashsaleGoods = nextProps.flashsaleGoods || {};
          const flashsaleGoodsFlag = nextProps.flashsaleGoodsFlag;
          if (flashsaleGoodsFlag) {
            this._changeNum(
              flashsaleGoods.get('minNum'),
              flashsaleGoods.get('stock'),
              flashsaleGoods.get('goodsInfoId'),
            );
          }
        },
      );
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
    const {
      visible,
      changeSpecVisible,
      flashsaleGoods,
      flashsaleGoodsFlag,
      iepInfo,
      source,
      isPay,
      isGoodsDetail,
    } = this.props;
    const {
      goods = Map(),
      goodsInfo = Map(),
      goodsInfoCache = Map(), //缓存之前选择的sku,防止用户取消选中规格时,无信息展示的问题
      goodsSpecs = List(),
    } = this.state;

    // 社交电商相关内容显示与否
    const social = goodsInfo.get('distributionGoodsAudit') == '2';

    // 企业购处理
    let iepSwitch = false;
    let info = {};
    let enterprisePriceName = '';
    if (iepInfo) {
      // iep属性
      iepSwitch = iepInfo.toJS().isIepAuth;
      info = iepInfo.toJS().iepInfo;
      enterprisePriceName = info ? info.enterprisePriceName : '';
    }

    //企业购商品的判断
    const iepGoodsShowFlag =
      iepSwitch &&
      goodsInfo.get('enterPriseAuditState') == 2 &&
      !social &&
      !flashsaleGoodsFlag;

    let noSpecStockFlag = returnStockFlag(
      goodsInfo.get('stock'),
      goodsInfo.get('count'),
    );
    let noCartStockFlag = returnCartStockFlag(goodsInfo.get('stock'));
    let goodsStock = goodsInfo.get('stock');
    if (flashsaleGoodsFlag) {
      noSpecStockFlag = false;
      goodsStock = flashsaleGoods.get('stock');
    }

    const flashsalePrice = flashsaleGoodsFlag
      ? flashsaleGoods.get('price')
      : null;
    //营销标签
    const marketingLabels = (
      goodsInfo.get('marketingLabels') || fromJS([])
    ).toJS();
    //优惠券标签
    const couponLabels = (goodsInfo.get('couponLabels') || fromJS([])).toJS();
    const buyPoint = goodsInfo.get('buyPoint');

    const bookingSale = goodsInfo?.get('bookingSaleVO')?.toJS() || null;
    const appointmentSale = goodsInfo?.get('appointmentSaleVO')?.toJS() || null;

    // 预售
    let isBooking = false;
    // 是否是全款预售
    let isAllMoneySale = false;
    /*    if (goodsInfo.get('bookingSaleVO') && !buyPoint) {
      let bookingSaleVO = goodsInfo.get('bookingSaleVO').toJS();
      isBooking = this._isBooking(bookingSaleVO);
      isAllMoneySale = bookingSaleVO.bookingType == 1 ? false : true;
    }*/

    // 预约
    let isAppointmentSale = false;

    let price = buyPoint
      ? goodsInfo.get('salePrice')
      : social
        ? goodsInfo.get('marketPrice')
        : flashsaleGoodsFlag
          ? _.addZero(flashsalePrice)
          : goodsInfo.get('priceType') === '1'
            ? _.addZero(goodsInfo.get('intervalMinPrice'))
            : goodsInfo.get('goodsInfoType')=='1'?
              _.addZero(goodsInfo.get('specialPrice')):
            _.addZero(goodsInfo.get('salePrice'));
    if (!buyPoint) {
      if (appointmentSale) {
        isAppointmentSale = true;
        price = goodsInfo.get('appointmentPrice')
          ? _.addZero(goodsInfo.get('appointmentPrice'))
          : goodsInfo.get('marketPrice');
      }

      if (bookingSale) {
        isAllMoneySale = bookingSale.bookingType == 1 ? false : true;
        isBooking = this._isBooking(bookingSale);
        if (isBooking) {
          price = bookingSale.bookingSaleGoods.bookingPrice
            ? _.addZero(bookingSale.bookingSaleGoods.bookingPrice)
            : goodsInfo.get('marketPrice');
        } else {
          if (goodsInfo.get('goodsInfoType')==1){
            price=goodsInfo.get('specialPrice')
          } else {
            price = goodsInfo.get('marketPrice');
          }

        }
      }
    }

    // 预售商品确定按钮单独处理
    let isGoodsDetailBooking = isGoodsDetail && isBooking;
    let disableFlag = noSpecStockFlag;
    let disableCartFlag = noCartStockFlag;

    //划线价
    const linePrice = goods.get('linePrice');

    let showMatketingFlag = true;
    if(isAppointmentSale || isBooking ){
      showMatketingFlag = false;
    }
    // 是否登录
    const loginFlag = window.token != undefined && window.token != '';

    return (
      <View
        style={[
          styles.panelBottom,
          (!visible || !goods) && { width: 0, height: 0 },
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

        <View style={styles.panelBody}>
          {/*弹窗关闭按钮*/}
          <TouchableOpacity
            style={styles.closeBox}
            activeOpacity={0.8}
            onPress={() => {
              changeSpecVisible(false);
              Keyboard.dismiss();
            }}
          >
            <Image style={styles.close} source={require('../img/close.png')}/>
          </TouchableOpacity>

          {/*sku图文信息*/}
          <View style={styles.topBox}>
            <WMImage
              style={styles.img}
              src={goodsInfoCache ? `${goodsInfoCache.get('goodsInfoImg')}?x-oss-process=image/format,jpg/interlace,1,image/resize,m_mfit,w_120,h_120` : null}
            />
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
              {(goodsInfo.get('distributionGoodsAudit') != '2' ||
                !flashsaleGoodsFlag) && (
                <View style={[styles.tagCon, { marginBottom: 5 }]}>
                  <MarketingLabel
                    marketingLabels={showMatketingFlag ? marketingLabels : []}
                    couponLabels={couponLabels}
                    isSocial={social}
                  />
                </View>
              )}
              {/*价格*/}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.priceBox}>
                  <Text style={[styles.price, { color: priceColor }]}>
                    {/* 积分价格 */}
                    {buyPoint ? (
                      <Text style={[styles.price, { color: priceColor }]}>
                        {buyPoint}
                        <Text style={[styles.pointTitle, { color: priceColor }]}>积分</Text>
                        {price > 0 ? '+' : ''}
                      </Text>
                    ) : null}
                    {((buyPoint && price > 0) || !buyPoint) && (
                      <Text style={[styles.price, { color: priceColor }]} allowFontScaling={false}>
                        <Text style={[styles.unit, { color: priceColor }]} allowFontScaling={false}>
                          ¥
                        </Text>
                        { Number(price).toFixed(2)}
                      </Text>
                    )}
                  </Text>
                  {iepGoodsShowFlag && !buyPoint && (
                    <View style={styles.qygPriceBox}>
                      <Text style={styles.qygPrice}>
                        ￥{_.addZero(goodsInfo.get('enterPrisePrice'))}
                      </Text>
                      <View style={[styles.qygPriceNameBox, { backgroundColor: mainColor }]}>
                        <Text style={styles.qygPriceName}>
                          {enterprisePriceName}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
                <View style={[styles.price, { color: priceColor, position:'relative', bottom:-3}]} allowFontScaling={false}>
                  {!!linePrice && (
                    <Text allowFontScaling={false} style={styles.orPrice}>
                      ¥{_.addZero(linePrice)}
                    </Text>
                  )}
                  {WMkit.isDistributor() && social && !buyPoint
                    ? !isAppointmentSale &&
                    !isBooking &&
                    !flashsaleGoodsFlag &&
                    !iepGoodsShowFlag && (
                      <Text
                        style={styles.commission}
                        allowFontScaling={false}
                      >
                        &nbsp;/&nbsp;赚
                        {_.addZero(goodsInfo.get('distributionCommission'))}
                      </Text>
                    )
                    : null}
                </View>
              </View>
            </View>
          </View>

          {/* 拼团信息 */}
          {
            goodsInfo.get('grouponLabel') ?
              <View style={styles.groupInfo}>
                <View style={styles.leftInfo}>
                  <Text allowFontScaling={false} style={styles.infoTitle}>该商品正在进行</Text>
                  <Text allowFontScaling={false} style={[styles.infoText, { color: mainColor }]}>拼团</Text>
                </View>
                <TouchableOpacity activeOpacity={0.6}
                                  onPress={() =>
                                    msg.emit('router: goToNext', {
                                      routeName: 'SpellGroupDetail',
                                      skuId: goodsInfo.get('goodsInfoId'),
                                    })
                                  }>
                  <View style={styles.rightInfo}>
                    <Text allowFontScaling={false} style={styles.infoTitle}>点击查看</Text>
                    <Image style={styles.rArrow} source={require('./img/arrow.png')}/>
                  </View>
                </TouchableOpacity>
              </View>
              : null
          }

          {/*sku中间滚动区域*/}
          <ScrollView
            style={[
              styles.content,
              isIOS && this.state.KeyboardShown && styles.contentKeyboard,
            ]}
            alwaysBounceVertical={false}
          >
            {/*sku选择规格*/}
            {goodsSpecs &&
            goodsSpecs.size > 0 &&
            goodsSpecs.toJS().map((spec, index) => {
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
                                  backgroundColor: 'rgba(255, 102, 0, 0.06)',
                                }
                              : det.disabled
                              ? styles.invalidItem
                              : {},
                          ]}
                          onPress={
                            spec.defaultVal !== det.specDetailId &&
                            det.disabled
                              ? () => {
                              }
                              : () => {
                                this._changeSpecDetail(
                                  spec.defaultVal === det.specDetailId
                                    ? null
                                    : det.specDetailId,
                                  index,
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
                                : {},
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
            })}

            {/*sku选择数量*/}
            {source != '1' && (
              <View style={styles.skuBottom}>
                <Text style={styles.normalText} allowFontScaling={false}>
                  数量
                </Text>
                <View style={styles.retailNum}>
                  {!flashsaleGoodsFlag && (
                    <Text style={styles.otherText} allowFontScaling={false}>
                      {goodsInfo.get('count') &&
                      goodsInfo.get('count') + '起订'}
                      {goodsInfo.get('maxCount') != undefined &&
                      '，' + '可购' + goodsInfo.get('maxCount')}
                      &nbsp;&nbsp;
                      {this._stock()}
                      &nbsp;&nbsp;
                    </Text>
                  )}
                  {flashsaleGoodsFlag && flashsaleGoods && (
                    <Text style={styles.otherText} allowFontScaling={false}>
                      {`${flashsaleGoods.get('minNum')}${flashsaleGoods.getIn(['goods','goodsUnit'])}起订，限订${flashsaleGoods.get('maxNum')}${flashsaleGoods.getIn(['goods','goodsUnit'])},库存${flashsaleGoods.get('stock')}${flashsaleGoods.getIn(['goods','goodsUnit'])}`}
                      &nbsp;&nbsp;
                      {this._stock()}
                      &nbsp;&nbsp;
                    </Text>
                  )}
                  {isPay ? (
                    <NumInput
                      disableNumberInput={disableFlag}
                      value={disableFlag ? 0 : goodsInfo.get('num')}
                      max={this._numberInputMax()}
                      onDelayChange={(value) =>
                        this._changeNum(
                          value,
                          goodsStock,
                          goodsInfo.get('goodsInfoId'),
                        )
                      }
                      addStep={1}
                      min={this._numberInputMin()}
                      error={goodsInfo.get('error')}
                    />
                  ) : (
                    <NumInput
                      /*disableNumberInput={disableCartFlag}*/
                      value={ goodsInfo.get('num')>0?goodsInfo.get('num'):0}
                      max={this._numberInputMax()}
                      onDelayChange={(value) =>
                        this._changeNum(
                          value,
                          goodsStock,
                          goodsInfo.get('goodsInfoId'),
                        )
                      }
                      addStep={1}
                      min={this._numberInputMin()}
                      error={goodsInfo.get('error')}
                    />
                  )}
                </View>
              </View>
            )}
          </ScrollView>

          {/*sku底部加入购物车*/}
          {flashsaleGoodsFlag ? (
            <View style={styles.bottom}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.normalText} allowFontScaling={false}>
                  已选
                  {goodsInfo.get('num') || 0}
                  {goods.get('goodsUnit')}
                </Text>
              </View>
              {
                this.props.stockEnough ?
              <TouchableOpacity
                onPress={() =>
                  flashsaleGoods.get('stock') &&
                  goodsInfo.get('num') &&
                  this._rushToBuyingFlashSaleGoodsInfo(
                    flashsaleGoods.get('id'),
                    goodsInfo.get('num'),
                  )
                }
                style={[
                  styles.buttonBox,
                  {backgroundColor: mainColor},
                  (!flashsaleGoods.get('stock') || !goodsInfo.get('num')) &&
                  styles.disabledBtn,
                ]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.button,
                    (!flashsaleGoods.get('stock') || !goodsInfo.get('num')) &&
                    styles.disabledText,
                  ]}
                  allowFontSacling={false}
                >
                  立即抢购
                </Text>
              </TouchableOpacity> :
              <View style={[styles.bottom, styles.socialBottom]}>
              <SubmitButton
                disabled={false}
                boxStyle={{ width: screenWidth - 20 }}
                text="到货通知"
                colors={[mainColor, mainColor]}
                isLinear={true}
                onClick={() => {
                  this._goodsLackAdvise(goodsInfo);
                }}
              />
            </View>
          }
            </View>
          ) : source == '1' ? (
            <View style={[styles.bottom, styles.socialBottom]}>
              <SubmitButton
                disabled={false}
                boxStyle={{ width: screenWidth - 20 }}
                colors={[mainColor, mainColor]}
                isLinear={true}
                text="确定"
                onClick={() => this._confirm()}
              />
            </View>
          ) : isPay ? (
              <View style={[styles.bottom, styles.socialBottom]}>
                {/* 立即购买 */}
                <SubmitButton
                  disabled={false}
                  boxStyle={{ width: screenWidth - 20 }}
                  text="立即购买"
                  colors={[mainColor, mainColor]}
                  isLinear={true}
                  onClick={() => goodsInfo.get('num') && this._pay(true)}
                />
              </View>
            ) :
           goodsStock>0?(
              <View style={[styles.bottom, styles.socialBottom]}>
                {/*{ 加入购物车 }*/}
                <SubmitButton
                  disabled={false}
                  boxStyle={{ width: screenWidth - 20 }}
                  text="加入购物车"
                  colors={[mainColor, mainColor]}
                  isLinear={true}
                  onClick={() => {
                    // if (noSpecStockFlag) return;
                    // 预售商品在商品详情切换规格时直接确认订单
                    isGoodsDetailBooking
                      ? goodsInfo.get('num') && this._pay(true)
                      : goodsInfo.get('num') && this._purchase();
                  }}
                />
              </View>
            ):goodsInfo.get('goodsInfoType') == 1?
            <View style={[styles.bottom, styles.socialBottom]}>
              <SubmitButton
                disabled={false}
                boxStyle={{ width: screenWidth - 20 }}
                text="加入购物车"
                colors={goodsInfo.get('num') > 0 ? [mainColor, mainColor] : ['#e6e6e6', '#ccc']}
                isLinear={true}
                
              />
             </View>:(
             <View style={[styles.bottom, styles.socialBottom]}>
              <SubmitButton
                disabled={false}
                boxStyle={{ width: screenWidth - 20 }}
                text="到货通知"
                colors={goodsInfo.get('num') > 0 ? [mainColor, mainColor] : ['#e6e6e6', '#ccc']}
                isLinear={true}
                onClick={() => {
                  this._goodsLackAdvise(goodsInfo);
                }}
              />
             </View>
            )
          }
        </View>
      </View>
    );
  }

  /**
   * 购物车切换规格
   */
  _confirm = async () => {
    if (!WMkit.isLoginOrNotOpen()) {
      msg.emit('loginModal:toggleVisible', {
        callBack: () => {
          msg.emit('router: replace', {
            routeName: 'GoodsDetail',
            skuId:this.state().get('goodsInfoId')
          });
        }
      });
    } else {
      //删除原先规格
      // await deletePurchase([this.props.goodsInfoId]);
      // await purchase(this.state);
      await changePurchase([this.props.goodsInfoId], this.state.goodsInfo);
      this.props.changeSpecVisible(false);
    }
  };

  /**
   * 获取是否展示划线价,以及划线价
   *   a.若划线价存在,则展示
   *   b.若划线价不存在
   *     b.1.登录前,不展示
   *     b.2.登陆后,展示sku市场价
   * @private
   */
  _originPriceInfo = (linePrice, goodsInfoIm, goodsInfoCache) => {
    if (linePrice) {
      return linePrice;
    } else {
      /*if (WMkit.isLoginOrNotOpen()) {
        return (
          goodsInfoIm.get('marketPrice') || goodsInfoCache.get('marketPrice')
        );
      } else {
        return null;
      }*/
      return null;
    }
  };

  /**
   * 切换选中前n-1个规格项的规格值
   * @param specDetailId
   * @param index
   * @private
   */
  _changeSpecDetail = (specDetailId, index) => {
    this.setState(changeSpecDetail(this.state, specDetailId, index), () => {
      if (this.props.dataCallBack) {
        this.props.dataCallBack(this.state.goodsInfo);
      }
    });
  };

  /**
   * 用户改变sku购买数量
   * @param num 数量
   * @param stock 库存
   * @param goodsInfoId sku标识
   * @private
   */
  _changeNum = (savedNum, stock, goodsInfoId) => {
    //savedNum = stock > 0 ? (savedNum < stock ? savedNum : stock) : 0;
    this.setState(changeNum(this.state, { num: savedNum, goodsInfoId }));
  };

  /**
   * 立即购买
   */
  _pay = async () => {
    const { goodsInfo } = this.state;
    if (WMkit.isLoginOrNotOpen()) {
      this.props._didConfirm(goodsInfo);
    } else {
      msg.emit('loginModal:toggleVisible', {
        callBack: () => {
          msg.emit('router: goToNext', {
            routeName: 'GoodsDetail',
            skuId: goodsInfo.get('goodsInfoId'),
          });
        },
      });
    }
  };

  _goodsLackAdvise =async (info)=>{
    if (WMkit.isLoginOrNotOpen()) {
      const cityCode = await WareUtils.queryChooseCity();
      const result =await saveGoodsLack(info,cityCode);
      // if (result) {
        // 成功返回后,关闭弹框
        this.setState(result);
        this.props.changeSpecVisible(false);
      // }
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

  /**
   * 加入购物车
   * @private
   */
  _purchase = async () => {
    // if (!WMkit.isLoginOrNotOpen()) {
    //   msg.emit('loginModal:toggleVisible', {
    //     callBack: () => {
    //       msg.emit('router: goToNext', {
    //         routeName: 'GoodsListWithoutBottom'
    //       });
    //     }
    //   });
    // } else {
      await purchase(this.state);
      this.props.changeSpecVisible(false);
    // }
  };
  /**
   * 库存数
   */
  _stock = () => {
    const { flashsaleGoods, flashsaleGoodsFlag } = this.props;
    const { goodsInfo = Map() } = this.state;

    let stock = 0;
    if (flashsaleGoodsFlag) {
      stock = flashsaleGoods.get('stock');
    } else {
      stock = goodsInfo.get('stock') || 0;
    }
    return  stock<=0?'库存不足':'';
  };

  /**
   * 起售量
   */
  _numberInputMin = () => {
    const { flashsaleGoods, flashsaleGoodsFlag } = this.props;
    let min = 0;
    if (flashsaleGoodsFlag) {
      min = flashsaleGoods.get('minNum');
    } else {
      min = 1;
    }
    return min;
  };

  /**
   * 限售量
   */
  _numberInputMax = () => {
    const { goodsInfo = Map() } = this.state;
    const { flashsaleGoods, flashsaleGoodsFlag } = this.props;
    let max = 0;
    if (flashsaleGoodsFlag) {
      const maxNum = flashsaleGoods.get('maxNum');
      const stock = flashsaleGoods.get('stock');
      max = stock > maxNum ? maxNum : stock;
    } else {
      max = goodsInfo.get('stock')>0 ? goodsInfo.get('stock') :9999;
    }
    return max;
  };

  _rushToBuyingFlashSaleGoodsInfo = WMkit.onceFunc(
    async (flashSaleGoodsId, num) => {
      await rushToBuyingFlashSaleGoodsInfo(flashSaleGoodsId, num);
    },
    1000,
  );

  /**
   * 预售
   * @private
   */
  _isBooking = (bookingSaleVO) => {
    const {
      bookingStartTime,
      bookingEndTime,
      bookingType,
      handSelStartTime,
      handSelEndTime,
    } = bookingSaleVO;

    //全款支付起止时间内
    let isBooking = false;
    if (bookingType == 0) {
      isBooking = moment(new Date()).isBetween(
        bookingStartTime,
        bookingEndTime,
      );
    }
    //定金支付起止时间内
    if (bookingType == 1) {
      isBooking = moment(new Date()).isBetween(
        handSelStartTime,
        handSelEndTime,
      );
    }
    return isBooking;
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
    zIndex: 1000,
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
    height: screenHeight
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
    paddingBottom: 10,
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
    justifyContent: 'space-between',
  },
  title: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 12,
    marginBottom: 6
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
  },
  pointTitle: {
    fontSize: 16,
  },
  tagCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  contentKeyboard: {
    ..._.ifIphoneX(
      {
        marginBottom: 295,
      },
      {
        marginBottom: 245,
      },
    ),
  },
  specBox: {
    marginTop: 10,
    marginBottom: 20,
  },
  specTitle: {
    color: '#333',
    fontSize: 14,
    marginRight: 10,
    fontWeight: '500',
    marginBottom: 10,
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specText: {
    color: '#333',
    fontSize: 12,
  },
  specItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 14,
  },
  invalidItem: {
    backgroundColor: '#ebebeb',
  },
  invalidText: {
    color: '#999',
  },
  otherText: {
    color: '#999',
    fontSize: 10,
    marginRight: 30,
    lineHeight:20,
  },
  skuBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5
  },
  retailNum: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  normalText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)',
    fontWeight: '500'
  },
  bottom: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center'
  },
  socialBottom: {
    justifyContent: 'flex-end',
  },
  buttonBox: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    borderRadius:18
  },
  button: {
    color: '#fff',
    fontSize: 14,
  },
  disabledBtn: {
    backgroundColor: '#ebebeb',
  },
  disabledText: {
    color: '#999',
  },
  commission: {
    color: '#333',
    fontSize: 12,
  },
  qygPriceBox: {
    flexDirection: 'row',
    marginLeft: 20,
    alignItems: 'center',
  },
  qygPrice: {
    color: '#333',
    marginRight: 20,
  },
  qygPriceNameBox: {
    borderRadius: 2,
    height: 18,
    paddingHorizontal: 4,
    justifyContent: 'center',
  },
  qygPriceName: {
    fontSize: 10,
    color: '#fff',
  },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  //该商品正在进行。。。
  groupInfo: {
    height: 28,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#333',
    marginHorizontal: 12,
    marginVertical: 10,
  },
  leftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    marginLeft: 4
  },
  rightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 10,
    color: '#fff',
  },
  rArrow: {
    width: 12,
    height: 12,
    marginLeft: 2,
  },
});
