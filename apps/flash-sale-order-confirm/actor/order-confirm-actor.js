import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';

import * as _ from 'wmkit/common/util';
import { Const } from 'wmkit/const';

/**
 * Created by chenpeng on 2017/7/4.
 */
export default class OrderConfirmActor extends Actor {
  defaultState() {
    return {
      defaultAddr: {}, //默认地址
      payOptions: fromJS([{ id: '1', name: '线下支付' }]), // 可用的支付方式列表 [0：在线支付   1：线下转账]
      delivery : fromJS([]),
      deliveryWaysId: {},
      pickUpMessage : fromJS([]),  //自提点
      //选择的自提信息
      pickUpSelect: {},
      //选择的自提信息（供展示使用）
      pickUpSelectShow: {},
      homeDeliverContent : '', //本地配送
      orderConfirm: [], // 订单确认项目 多个店铺多个确认项目
      stores: [], // 店铺列表
      totalPrice: 0, //订单总价
      goodsTotalPrice: 0, //商品总价
      discountsTotalPrice: 0, //优惠总价
      totalDeliveryPrice: 0, //配送费用总价
      sortEnclosures: [], //排序后的图片新数组
      annexMaskShow: false,
      coupons: [], // 优惠券列表
      couponPageInfo: null, // 使用优惠券页信息
      commonCodeId: null, // 使用的平台优惠券
      couponTotal: null, // 优惠券优惠总额
      pointConfig: fromJS({}), //积分配置
      totalPoint: 0, //会员总积分
      showPoint: false, //打开积分按钮
      usePoint: 0, //使用积分数
      usePointExtra: 0, //使用积分抵扣金额
      integralInput: '', //输入值
      isFlashSaleGoods: false, //是否是秒杀抢购商品
      flashSaleGoodsId: Number, //秒杀抢购商品id
      flashSaleGoodsNum: Number, //秒杀抢购商品数量
      isPostage: false, //秒杀商品是否包邮
      payType: 0, // 支付配送方式
      goodsTotalNum:0,
      deliverModelIsShow:{},
      //快递文案
      homeDeliverExpressContent: null,
      //自提文案
      homeDeliverPickSelfContent: null,
    };
  }

  /**
   * 切换是否使用单独的发票收货地址
   * @param state
   * @param status true:选中
   * @returns {Map<K, V>}
   */
  @Action('order-confirm-actor:switchSperator')
  switchSperator(state, status) {
    return state.set('sperator', status);
  }

  /**
   * 存储会员默认地址,没有则获取第一个
   * @param state
   * @param addr
   * @returns {Map<string, V>}
   */
  @Action('order-confirm-actor: addr: fetch')
  saveAddr(state, addr) {
    return state.set('defaultAddr', fromJS(addr));
  }

  /**
   * 存储增值税专用发票信息
   * @param state
   * @param invoice
   * @returns {Map<string, V>}
   */
  @Action('order-confirm: invoice: fetch')
  fetchInvoice(state, invoice) {
    return state.set('VATInvoice', fromJS(invoice));
  }

  /**
   * 店铺列表
   * @param state
   * @param stores
   * @returns {Map<string, V>}
   */
  @Action('order-confirm: stores: fetch')
  fetchOrderStores(state, { tradeConfirmItems, couponCodes,goodsTotalNum }) {
    return state
      .set('stores', fromJS(tradeConfirmItems))
      .set('coupons', fromJS(couponCodes))
      .set('goodsTotalNum', goodsTotalNum);
  }

  /**
   * 提交确认项初始化
   * @param state
   */
  @Action('order-confirm: init')
  orderConfirmInit(state, stores) {
    const tradeConfirmItems = stores.tradeConfirmItems;
    return state.set(
      'orderConfirm',
      fromJS(
        tradeConfirmItems.map((m) => {
          return {
            storeId: m.supplier.storeId, //店铺Id
            supplierId: m.supplier.supplierId, //商家Id
            deliverWay: '1', //配送方式 0：其他   1：快递
            payType: -1, //支付方式 0：在线支付   1：线下转账
            buyerRemark: '', //买家备注
            iSwitch: 0, // 是否允许开票 0:不允许  1:允许
            invoice: {
              type: -1, //类型 0：普通发票 1：增值税专用发票 -1：无
              flag: '1', //0:个人 1:单位
              title: '', //抬头
              identification: '', //纳税人识别号
              projectKey: '00000000000000000000000000000000', //开票项目
              projectName: '明细' //开票项目名称
            },
            bookingDeliveryFlag: false,   //是否预约发货
            bookingDate: '',  //预约发货时间
            sperator: false, //是否使用单独发票收货地址
            enclosures: [], //订单附件
            defaultInvoiceAddr: {}, //默认发票收货地址
            VATInvoice: {} //增值税专用发票
          };
        })
      )
    );
  }

  /**
   * 存储待购买商品集合
   * @param state
   * @param orderSkus
   * @returns {Map<string, V>}
   */
  @Action('order-confirm: skus: fetch')
  fetchOrderSkus(state, orderSkus) {
    return state.set('orderSkus', fromJS(orderSkus));
  }

  /**
   * 存储买家备注
   * @param state
   * @param remark
   * @returns { }
   */
  @Action('order-confirm-actor: remark')
  saveRemark(state, { remark, storeId }) {
    const index = state
      .get('orderConfirm')
      .findIndex((f) => f.get('storeId') == storeId);
    return state.setIn(['orderConfirm', index, 'buyerRemark'], remark);
  }

  /**
   * 返回初始化
   * @param state
   * @param defaultAddr
   * @param orderConfirm
   * @returns { }
   */
  @Action('order-confirm-actor: back: init')
  backInit(state, { defaultAddr, orderConfirm }) {
    return state
      .set('defaultAddr', fromJS(defaultAddr))
      .set('orderConfirm', fromJS(orderConfirm || []));
  }

  /**
   * 修改各店铺运费/应付金额,修改所有订单总运费/总应付金额
   * @param state
   * @param freightList
   * @returns {Map<string, any>}
   */
  @Action('order-confirm-actor:changeDeliverFee')
  changeDeliverFee(state, freightList) {
    const totalDeliveryPrice = freightList.reduce(
      (a, b) => _.add(a, b.deliveryPrice),
      0
    );

    return state
      .set(
        'stores',
        state.get('stores').map((st, i) => {
          let discountsTotalPrice = 0;
          const discountsPriceList = st.get('discountsPrice');
          if (discountsPriceList && discountsPriceList.size) {
            discountsTotalPrice = discountsPriceList.reduce(
              (a, b) => _.add(a, b.get('amount')),
              0
            );
          }
          const deliveryPrice = freightList[i].deliveryPrice;
          return st.update('tradePrice', (tradePrice) =>
            tradePrice
              .set('deliveryPrice', deliveryPrice)
              .set(
                'totalPrice',
                _.add(
                  _.sub(tradePrice.get('goodsPrice'), discountsTotalPrice),
                  deliveryPrice
                )
              )
          );
        })
      )
      .set(
        'totalPrice',
        _.sub(
          _.add(
            _.sub(
              state.get('goodsTotalPrice'),
              state.get('discountsTotalPrice')
            ),
            totalDeliveryPrice
          ),
          state.get('usePointExtra')
        )
      )
      .set('totalDeliveryPrice', totalDeliveryPrice);
  }

  /**
   * 上传附件
   */
  @Action('order-confirm-actor: addImage')
  addImage(state, { image, storeId }) {
    const index = state
      .get('orderConfirm')
      .findIndex((f) => f.get('storeId') == storeId);
    return state.setIn(
      ['orderConfirm', index, 'enclosures'],
      state.getIn(['orderConfirm', index, 'enclosures']).push(fromJS(image))
    );
  }

  /**
   * 删除附件
   */
  @Action('order-confirm-actor: removeImage')
  removeImage(state, { index, storeId }) {
    const i = state
      .get('orderConfirm')
      .findIndex((f) => f.get('storeId') == storeId);
    return state.setIn(
      ['orderConfirm', i, 'enclosures'],
      state.getIn(['orderConfirm', i, 'enclosures']).remove(index)
    );
  }

  /**
   * 设置支付方式
   * @param state
   * @param status true:选中
   * @returns {Map<K, V>}
   */
  @Action('order-confirm-actor: options')
  payOptions(state, options) {
    return state.set('payOptions', options);
  }

  /**
   * 设置支付方式
   * @param state
   * @returns {Map<K, V>}
   */
  @Action('order-confirm-actor: payment')
  payType(state, { payId, storeId }) {
    if (storeId) {
      const index = state
        .get('orderConfirm')
        .findIndex((f) => f.get('storeId') == storeId);
      state = state.setIn(['orderConfirm', index, 'payType'], payId);
    } else {
      let pId = state.get('payOptions').count() > 1 ? '0' : '1';
      if (payId == 1 || payId == 0) {
        pId = payId;
      }
      const orderConfirm = state
        .get('orderConfirm')
        .map((o) => o.set('payType', pId));
      state = state.set('orderConfirm', orderConfirm);
    }
    return state;
  }

  /**
   * 设置配送方式
   * @param state
   * @param storeId
   * @param deliveryType
   * @returns {*}
   */
  @Action('order-confirm-actor: deliverWay')
  setDeliveryType(state,{storeId,deliveryType,pickUpWareId}){
    const index = state
      .get('orderConfirm')
      .findIndex((f) => f.get('storeId') == storeId);
    if(deliveryType == 3 && pickUpWareId !=-1){
      state=state.setIn(['orderConfirm', index, 'pickUpWareId'], pickUpWareId);
    }
    state=state.setIn(['orderConfirm', index, 'deliverWay'], deliveryType)
    return state;
  }

  /**
   * 设置预约
   * @param state
   * @param storeId
   * @param deliveryType
   * @returns {*}
   */
  @Action('order-confirm-actor: booking')
  setBookingDeliveryFlag(state,{storeId,bookingDeliveryFlag}){
    const index = state
      .get('orderConfirm')
      .findIndex((f) => f.get('storeId') == storeId);
    return state.setIn(['orderConfirm', index, 'bookingDeliveryFlag'], bookingDeliveryFlag);
  }

  /**
   * 设置预约发货时间
   * @param state
   * @param storeId
   * @param deliveryType
   * @returns {*}
   */
  @Action('order-confirm-actor: bookingDate')
  setBookingDate(state,{storeId,bookingDate}){
    const index = state
      .get('orderConfirm')
      .findIndex((f) => f.get('storeId') == storeId);
    return state.setIn(['orderConfirm', index, 'bookingDate'], bookingDate);
  }


  /**
   * 初始化是否支持开票
   */
  @Action('order-confirm-actor: invoice: switch')
  initInvoiceSwitch(state, params) {
    const orderConfirm = state.get('orderConfirm').map((o) => {
      const index = params.findIndex(
        (p) => p.get('companyInfoId') == o.get('supplierId')
      );
      if (index >= 0) {
        o = o.set('iSwitch', params.getIn([index, 'supportInvoice']));
      }
      return o;
    });
    return state.set('orderConfirm', orderConfirm);
  }

  /**
   * 初始化自提点
   */
  @Action('order-confirm-actor: pickUpMessage')
  setPickUpMessage(state,value){
    return state.set('pickUpMessage', fromJS(value));
  }

  /**
   * 选择自提点
   */
  @Action('order-confirm-actor: pickUpSelect')
  setPickUpSelect(state,param){
    const {pickUpSelect, pickUpSelectShow}=param;
    return state.set('pickUpSelect', pickUpSelect)
        .set('pickUpSelectShow', pickUpSelectShow);
  }

  /**
   * 初始化本地配送
   */
  @Action('order-confirm-actor: homeDelivery')
  setHomeDelivery(state, param){
    const {homeDeliverContent, homeDeliverExpressContent, homeDeliverPickSelfContent}=param;
    return state.set('homeDeliverContent', homeDeliverContent)
        .set('homeDeliverExpressContent', homeDeliverExpressContent)
        .set('homeDeliverPickSelfContent', homeDeliverPickSelfContent);
  }

  /**
   * 初始化配送方式
   */
  @Action('order-confirm-actor: delivery')
  setDelivery(state, param){
    const {delivery}=param;
    return state.set('delivery', fromJS(delivery));
  }

  /**
   * 配送文案弹窗是否展示
   * @param state
   * @param flag
   * @returns {*}
   */
  @Action('order-confirm-actor: setDeliverModelIsShow')
  setDeliverModelIsShow(state, deliverModelIsShow) {
    return state.set('deliverModelIsShow', deliverModelIsShow);
  }


  /**
   * 订单/商品/优惠 总价
   * @param state
   * @param param1
   */
  @Action('order-confirm: price: fetch')
  fetchPrice(state, { totalPrice, goodsTotalPrice, discountsTotalPrice }) {
    return state
      .set('totalPrice', totalPrice)
      .set('goodsTotalPrice', goodsTotalPrice)
      .set('discountsTotalPrice', discountsTotalPrice);
  }

  /**
   * 附件预览显示隐藏
   */
  @Action('change:changeAnnexMask')
  changeAnnexMask(state, { index, storeId }) {
    //取对应id下的 图片  再取对应下标下 重新排序， 最终赋值给新的变量
    if (index != undefined) {
      let newFileList = [];
      const indexs = state
        .get('orderConfirm')
        .findIndex((f) => f.get('storeId') == storeId);
      state
        .getIn(['orderConfirm', indexs, 'enclosures'])
        .toJS()
        .map((source) => newFileList.push(source.image));
      newFileList = newFileList.splice(index).concat(newFileList);
      return state
        .set('sortEnclosures', newFileList)
        .set('annexMaskShow', !state.get('annexMaskShow'));
    } else {
      return state.set('annexMaskShow', !state.get('annexMaskShow'));
    }
  }

  /**
   * 接收使用订单页的数据
   */
  @Action('set:coupon:page:info')
  setCouponPageInfo(state, pageInfo) {
    return state.set('couponPageInfo', pageInfo);
  }

  /**
   * 根据优惠券页信息设置优惠券相关信息
   */
  @Action('calc:coupon:info')
  calcCouponInfo(state) {
    const pageInfo = state.get('couponPageInfo');
    let stores = state.get('stores');
    if (!pageInfo) return state;

    // 设置平台券id
    const chosenCommon = pageInfo
      .getIn(['enableCoupons', 'commonCoupons'])
      .find((c) => c.get('chosen') == true);
    if (chosenCommon) {
      state = state.set('commonCodeId', chosenCommon.get('couponCodeId'));
    }

    // 设置店铺券id
    state = state.update('orderConfirm', (items) =>
      items.map((item) => {
        const store = pageInfo
          .getIn(['enableCoupons', 'stores'])
          .find((store) => store.get('storeId') == item.get('storeId'));
        if (!store) return item;
        const chosenCoupon = store
          .get('coupons')
          .find((coupon) => coupon.get('chosen') == true);
        item = item.set('couponCodeId', null);
        if (!chosenCoupon) return item;
        return item.set('couponCodeId', chosenCoupon.get('couponCodeId'));
      })
    );

    // 设置优惠总金额
    const couponTotalPrice = pageInfo.get('couponTotalPrice');
    if (couponTotalPrice) {
      const discountsPrice = state.get('discountsTotalPrice');
      state = state
        .set('couponTotal', couponTotalPrice)
        .set('discountsTotalPrice', discountsPrice + couponTotalPrice);
      // 先计算一次总价，如果有运费的话还会再计算一次
      state = state.set(
        'totalPrice',
        _.sub(
          _.sub(state.get('goodsTotalPrice'), state.get('discountsTotalPrice')),
          state.get('usePointExtra')
        )
      );
    }
    return state.set('stores', stores);
  }

  /**
   * 订单确认页切换是否使用积分
   * @param state
   */
  @Action('order-confirm-actor:changeSwitch')
  changeSwitch(state) {
    //切换时重置订单总额
    const totalPrice = _.add(
      _.sub(state.get('goodsTotalPrice'), state.get('discountsTotalPrice')),
      state.get('totalDeliveryPrice')
    );
    state = state.set('totalPrice', totalPrice);
    return state
      .set('showPoint', !state.get('showPoint'))
      .set('usePoint', 0)
      .set('usePointExtra', 0)
      .set('integralInput', '');
  }
  /**
   * 修改积分抵扣金额(使用两个,一个用来数值计算,一个用来切换时候默认值是空字符串,值都是一样的)
   *
   * @param state
   * @param usePoint
   * @returns {*}
   */
  @Action('order-confirm-actor:setUsePoint')
  setUsePoint(state, { usePoint, integralInput }) {
    const usePointExtra = _.div(usePoint, Const.pointRatio);
    const totalPrice = _.sub(
      _.add(
        _.sub(state.get('goodsTotalPrice'), state.get('discountsTotalPrice')),
        state.get('totalDeliveryPrice')
      ),
      usePointExtra
    );
    return state
      .set('totalPrice', totalPrice)
      .set('usePoint', usePoint)
      .set('usePointExtra', usePointExtra)
      .set('integralInput', integralInput);
  }

  /**
   * 初始化用户总积分
   *
   * @param state
   * @param totalPoint
   * @returns {*}
   */
  @Action('order-confirm-actor:initTotalPoint')
  initTotalPoint(state, totalPoint) {
    return state.set('totalPoint', totalPoint);
  }

  /**
   * 初始化积分设置
   */
  @Action('order-confirm-actor:initpointConfig')
  initPointSet(state, pointConfig) {
    return state.set('pointConfig', pointConfig);
  }


  /**
   * 是否是秒杀抢购商品
   * @param state
   * @param flashSaleGoodsId
   */
  @Action('order-confirm-actor:setIsFlashSaleGoodsId')
  setIsFlashSaleGoodsId(state, isFlashSaleGoods) {
    return state.set('isFlashSaleGoods', isFlashSaleGoods);
  }

  /**
   * 秒杀抢购商品id
   * @param state
   * @param flashSaleGoodsId
   */
  @Action('order-confirm-actor:setFlashSaleGoodsId')
  setFlashSaleGoodsId(state, flashSaleGoodsId) {
    return state.set('flashSaleGoodsId', flashSaleGoodsId);
  }

  /**
   * 设置抢购商品数量
   * @param state
   * @param flashSaleGoodsNum
   */
  @Action('order-confirm-actor:setFlashSaleGoodsNum')
  setFlashSaleGoodsNum(state, flashSaleGoodsNum) {
    return state.set('flashSaleGoodsNum', flashSaleGoodsNum);
  }

  /**
   * 秒杀抢购商品是否包邮
   * @param state
   * @param isPostage
   */
  @Action('order-confirm-actor:setIsPostage')
  setIsPostage(state,isPostage){
    return state.set('isPostage', isPostage);
  }

  /**
   * 设置配送方式
   * @param state
   * @param deliveryWaysId
   * @returns {*}
   */
  @Action('order-confirm-actor: setDeliveryWaysId')
  setDeliveryWaysId(state, deliveryWaysId) {
    return state.set('deliveryWaysId', deliveryWaysId);
  }

  @Action('set: logisticsAddress')
  setLogisticsAddress(state, logisticsAddress) {
    return state.set('logisticsAddress', logisticsAddress);
  }
}
