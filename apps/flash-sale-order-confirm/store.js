import { Store, msg } from 'plume2';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import { Alert } from 'wmkit/modal/alert';
import * as FindArea from 'wmkit/area/area';
import { cache } from 'wmkit/cache';
import { config } from 'wmkit/config';
import { Const } from 'wmkit/const';
import FormRegexUtil from 'wmkit/form/form-regex';
import { Confirm } from 'wmkit/modal/confirm';
import * as WMkit from 'wmkit/kit';
import * as _ from 'wmkit/common/util';
import ValidConst from 'wmkit/validate';
import { fromJS } from 'immutable';

import OrderConfirmActor from './actor/order-confirm-actor';
import * as webApi from './webapi';
import * as api from '../../wmkit/delivery-address/webapi';
import * as WareUtils from '../../wmkit/ware-house/matchWare';
import { getMatchFlag } from '../../wmkit/ware-house/matchWare';

export default class AppStore extends Store {
  freightFunc = WMkit.delayFunc(() => {
    this._calcFreight();
  }, 500);

  bindActor() {
    return [new OrderConfirmActor()];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  /**
   * 选择支付方式
   * @param payId
   */
  onSelectPayInfo = (params) => {
    const { storeId, payId } = params;
    if (storeId) {
      const orderConfirm = this.state().get('orderConfirm');
      const index = orderConfirm.findIndex((f) => f.get('storeId') == storeId);
      const payType = orderConfirm.getIn([index, 'payType']);
      if (payId == payType) return;
    }
    this.dispatch('order-confirm-actor: payment', { payId, storeId });
  };

  /**
   * 切换是否使用单独的发票收货地址
   * @param status
   */
  onSwitchSperator = (status) => {
    this.dispatch('order-confirm-actor:switchSperator', status);
  };

  /**
   * 选择支付方式
   * @param payId
   */
  onSelectPayInfo = (params) => {
    const { storeId, payId } = params;
    if (storeId) {
      const orderConfirm = this.state().get('orderConfirm');
      const index = orderConfirm.findIndex((f) => f.get('storeId') == storeId);
      const payType = orderConfirm.getIn([index, 'payType']);
      if (payId == payType) return;
    }
    this.dispatch('order-confirm-actor: payment', { payId, storeId });
  };


  /**
   * 设置配送方式
   */
  onSelectDeliveryType =(storeId,deliveryType,openModal=true)=>{
    //存储缓存
    AsyncStorage.setItem(
      cache.ORDER_CONFIRM_DELIVERY_WAY,
      JSON.stringify({
        deliveryType: deliveryType
      })
    );
    this.dispatch('order-confirm-actor: deliverWay',{storeId,deliveryType});
    if(deliveryType == 2 || deliveryType ==3){
      this.onSelectBooking(storeId,false);
    }
    this.setDeliveryWay(storeId, deliveryType);
    if(openModal && (deliveryType == 2 || deliveryType == 4)){
      this.openModel(storeId, true);
    }
    // 计算运费
    this._calcFreight();
  };

  /**
   * 设置预约发货
   */
  onSelectBooking =(storeId,bookingDeliveryFlag)=>{
    this.dispatch('order-confirm-actor: booking',{storeId,bookingDeliveryFlag});
    if( !bookingDeliveryFlag){
      this.onSelectBookingDate(storeId,'');
    }
  };

  /**
   * 设置预约发货时间
   */
  onSelectBookingDate =(storeId,bookingDate)=>{
    this.dispatch('order-confirm-actor: bookingDate',{storeId,bookingDate});
  };



  /**
   * 确认订单初始化
   * @returns {Promise<void>}
   */
  confirmInit = async (storeId,deliveryType,pickUpWareId )=> {
    // this.changeLoadingVisible(true);// 选中的物流公司
    let deliverSite = await AsyncStorage.getItem(cache.DELIVER_SITE);
    deliverSite = (deliverSite && JSON.parse(deliverSite)) || null;
    await this.getPayOptions();
    //初始化积分信息
    await this.initPointConfig();

    //初始化商品信息
    const storeRes = await webApi.fetchWillBuyGoodsList();
    if (storeRes.code == 'K-000000') {
      this.dispatch('set: logisticsAddress', (deliverSite && deliverSite.logisticsAddress) || '');
      this.dispatch('order-confirm: stores: fetch', storeRes.context);
      this.dispatch('order-confirm: price: fetch', {
        totalPrice: storeRes.context.totalPrice,
        goodsTotalPrice: storeRes.context.goodsTotalPrice,
        discountsTotalPrice: storeRes.context.discountsTotalPrice
      });
      if (
        storeRes.context.tradeConfirmItems[0].tradeItems[0].isFlashSaleGoods &&
        storeRes.context.tradeConfirmItems[0].tradeItems[0].flashSaleGoodsId
      ) {
        this.dispatch(
          'order-confirm-actor:setIsFlashSaleGoodsId',
          storeRes.context.tradeConfirmItems[0].tradeItems[0].isFlashSaleGoods
        );
        this.dispatch(
          'order-confirm-actor:setFlashSaleGoodsId',
          storeRes.context.tradeConfirmItems[0].tradeItems[0].flashSaleGoodsId
        );
        this.dispatch(
          'order-confirm-actor:setFlashSaleGoodsNum',
          storeRes.context.tradeConfirmItems[0].tradeItems[0].num
        );
        let param = {
          flashSaleGoodsId:
          storeRes.context.tradeConfirmItems[0].tradeItems[0].flashSaleGoodsId
        };
        let flashSaleInfoRes = await webApi.getFlashSaleInfo(param);
        if (flashSaleInfoRes.code == config.SUCCESS_CODE) {
          let isPostage = true;
          if (flashSaleInfoRes.context.postage != 1) {
            isPostage = false;
          }
          this.dispatch('order-confirm-actor:setIsPostage', isPostage);
        }
      }
    } else {
      this.clearSessionStorage();
      Alert({
        text: storeRes.message,
        fnText: '确定',
        fn: () => msg.emit('router: goToNext', { routeName: 'PurchaseOrder' })
      });
    }

    //自提点
    this._pickUpInit();
    const purchaseAddress = await AsyncStorage.getItem(cache.PURCHASE_ADDRESS);
    let addr;
    if(purchaseAddress){
      //选择地址页面
      const { defaultAddr } = JSON.parse(purchaseAddress);
      addr = defaultAddr;
    }
    //跳转返回初始化
    if (await AsyncStorage.getItem(cache.ORDER_CONFIRM)) {
      //选择地址页面
      const { defaultAddr, orderConfirm } = JSON.parse(
        await AsyncStorage.getItem(cache.ORDER_CONFIRM)
      );
      this.dispatch('order-confirm-actor: back: init', {
        defaultAddr,
        orderConfirm
      });
      //判断是否包邮
      if (!this.state().get('isPostage')) {
        this.freightFunc();
      }
    } else if(addr && addr.deliveryAddressId){
      this.dispatch('order-confirm: init', storeRes.context);
      this.dispatch('order-confirm-actor: addr: fetch', addr);
      this.freightFunc();
      this.onSelectPayInfo({});
    } else {
      this.dispatch('order-confirm: init', storeRes.context);
      await this.initDefaultAddress();
      this.onSelectPayInfo({});
    }
    let couponPageInfo = null;
    // 使用优惠券页返回初始化
    if (await AsyncStorage.getItem(cache.ORDER_CONFIRM_COUPON)) {
      // 选择优惠券页
      couponPageInfo = JSON.parse(
        await AsyncStorage.getItem(cache.ORDER_CONFIRM_COUPON)
      );
      this.dispatch('set:coupon:page:info', fromJS(couponPageInfo));
      AsyncStorage.removeItem(cache.ORDER_CONFIRM_COUPON);
    }

    // 跳转后处理优惠券信息
    this.dispatch('calc:coupon:info');
    this.fetchInvoiceSwitch(
      storeRes.context.tradeConfirmItems.map((m) => m.supplier.supplierId)
    );
    this.initTotalPoint();
    if (await AsyncStorage.getItem(cache.ORDER_POINT)) {
      const { usePoint, integralInput, deductionAmount } = JSON.parse(
        await AsyncStorage.getItem(cache.ORDER_POINT)
      );
      //如果选择了优惠券并且抵扣之后的金额大于订单支付最大金额(不包括运送费)
      if (
        couponPageInfo &&
        _.sub(couponPageInfo.couponTotalPrice, deductionAmount) > 0
      ) {
        AsyncStorage.removeItem(cache.ORDER_POINT);
      } else {
        this.dispatch('order-confirm-actor:changeSwitch');
        this.dispatch('order-confirm-actor:setUsePoint', {
          usePoint,
          integralInput
        });
      }
    }

    api.doInitAddressList().then(res => {
      let { context } = res;
      let list=context.filter((item)=>(item.chooseFlag));
      if(list.length==0){
        list=context.filter((item)=>(item.isDefaltAddress && item.isDefaltAddress==1));
        if(list.length!=0){
          context = list;
        }
      }else{
        context = list;
      }
      if(context.length !=0){
        context.map(n => {
          const { provinceId, cityId, areaId, deliveryAddress } = n;
          n.addressInfo = FindArea.addressInfo(provinceId, cityId, areaId)+deliveryAddress;
          return n;
        });
      }
      this.dispatch('order-confirm-actor: addr: fetch', context[0]);
      this._homeDelivery(context[0]);
    });

    this.clearSessionStorage();
  };

  /**
   * 自提点初始化
   */
  _pickUpInit =async ()=>{
    //初始化自提配送方式
    const pickUpRes=await webApi.queryPickUpStoresLimit();
    if(pickUpRes.code == config.SUCCESS_CODE){
      const list=this.state().get('orderConfirm').toJS().map(v=>{
        const data={
          storeId: v.storeId,
          pickUpList: pickUpRes.context.wareHouseStore[v.storeId]
        };
        return data;
      });
      this.dispatch('order-confirm-actor: pickUpMessage',list);
      let pickUpSelect={};
      let pickUpSelectShow = {};
      this.state().get('orderConfirm').toJS().map(v=>{
        if (pickUpRes.context.wareHouseStore[v.storeId].size != 0) {
          if (pickUpRes.context.wareHouseStore[v.storeId][0].stockOutFlag == 0) {
            pickUpSelect[v.storeId] = pickUpRes.context.wareHouseStore[v.storeId][0].wareId;
            pickUpSelectShow[v.storeId] = pickUpRes.context.wareHouseStore[v.storeId][0];
          }
        }
      });
      this.dispatch('order-confirm-actor: pickUpSelect',{pickUpSelect,pickUpSelectShow});
    }
  }

  _homeDelivery=async (address)=>{
    const matchFlag = await getMatchFlag();
    let delivery= [];
    if (matchFlag){
      const wareStr = await AsyncStorage.getItem(cache.MATCH_WARE_STORE);
      let request={};
      request.customerDeliveryAddressId=address && address.deliveryAddressId;
      request.wareId=JSON.parse(wareStr).wareId;
      let res = {code:'K-000001'};
      if (address) {
        res=await webApi.checkDeliveryHomeFlag(request);
      }
      if(res.code==config.SUCCESS_CODE){
        if(res.context.flag ==0){
          delivery = [
            { id: '1', name: '第三方物流' },
            { id: '2', name: '顺丰快递' }];
        }else{
          delivery = [
            { id: '4', name: '免费店配'},
            { id: '2', name: '顺丰快递' }];

        }
      }else{
        delivery = [
          { id: '1', name: '第三方物流' },
          { id: '2', name: '顺丰快递' },
          { id: '4', name: '免费店配'}];
      }
    } else {
      delivery = [{ id: '', name: '' }];
      // this.dispatch('order: init: storesOnlyPickUp');
    }
    const param = await AsyncStorage.getItem(cache.ORDER_CONFIRM_DELIVERY_WAY);
    let isExit = false;
    let deliveryType;
    if (param) {
      deliveryType = JSON.parse(param).deliveryType
      isExit = delivery.some((item) => {
        return item.id == deliveryType;
      });
    }

    this.onSelectDeliveryType(this.state().get('stores').get(0).get('supplier').get('storeId'),isExit ? deliveryType : delivery[0].id,false)
    const homeDelivery=await webApi.getHomeDeliveryList();
    let homeDeliveryVO = homeDelivery.context.homeDeliveryVOList[0];
    let homeDeliverContent=homeDeliveryVO.content;
    let homeDeliverExpressContent=homeDeliveryVO.expressContent;
    let homeDeliverPickSelfContent=homeDeliveryVO.pickSelfContent;
    this.dispatch('order-confirm-actor: homeDelivery', {homeDeliverContent, homeDeliverExpressContent, homeDeliverPickSelfContent});
    this.dispatch('order-confirm-actor: delivery', {delivery});
  }

  /**
   * 计算运费
   */
  _calcFreight = () => {
    //1.组装收货地址
    const defaultAddr = this.state().get('defaultAddr');
    if (!defaultAddr || !defaultAddr.get('provinceId')) {
      return;
    }
    let consignee = {
      provinceId: defaultAddr.get('provinceId'),
      cityId: defaultAddr.get('cityId')
    };
    const orderConfirm = this.state().get('orderConfirm');

    let checkGoodsInfos = this.state().getIn([
      'couponPageInfo',
      'checkGoodsInfos'
    ]);

    //2.组装完整的请求参数(用于计算运费)
    const tradeParamsList = this.state()
      .get('stores')
      .map((st, i) => {
        const amountList = st.get('discountsPrice');
        let amountTotal = 0;
        if (amountList && amountList.size) {
          amountTotal = amountList.reduce(
            (a, b) => _.add(a, b.get('amount')),
            0
          );
        }

        if (checkGoodsInfos) {
          st = st.update('tradeItems', (skus) => {
            return skus.map((sku) => {
              const checkGoodsInfo = checkGoodsInfos.find(
                (item) => item.get('goodsInfoId') == sku.get('skuId')
              );
              // 优惠总价追加优惠券金额
              amountTotal = _.add(
                amountTotal,
                _.sub(sku.get('splitPrice'), checkGoodsInfo.get('splitPrice'))
              );
              // sku修改为优惠券后的均摊价
              return sku.set('splitPrice', checkGoodsInfo.get('splitPrice'));
            });
          });
        }

        return {
          supplier: {
            storeId: st.get('supplier').get('storeId'),
            freightTemplateType: st.get('supplier').get('freightTemplateType')
          },
          consignee,
          deliverWay: orderConfirm.get(i).get('deliverWay'),
          tradePrice: {
            totalPrice: _.sub(
              st.get('tradePrice').get('goodsPrice'),
              amountTotal
            )
          },
          oldTradeItems: st.get('tradeItems').toJS(),
          oldGifts: st.get('gifts') ? st.get('gifts').toJS() : [],
          // 是否是秒杀
          isSeckill: true
        };
      });
    //3.根据返回的各店铺运费结果,更新状态
    webApi.fetchFreight(tradeParamsList).then((r) => {
      this.dispatch('order-confirm-actor:changeDeliverFee', r.context);
    });
  };

  /**
   * 清除SessionStorage
   */
  clearSessionStorage = () => {
    AsyncStorage.removeItem(cache.ORDER_CONFIRM);
    AsyncStorage.removeItem(cache.ORDER_CONFIRM_COUPON);
    AsyncStorage.removeItem(cache.ORDER_POINT);
  };

  /**
   * 存储SessionStorage
   * @param comeFrom 来自哪里
   */
  saveSessionStorage = (comeFrom) => {
    const { defaultAddr, orderConfirm, couponPageInfo } = this.state().toJS();
    AsyncStorage.setItem(
      cache.ORDER_CONFIRM,
      JSON.stringify({
        defaultAddr,
        orderConfirm,
        comeFrom
      })
    );
    AsyncStorage.setItem(
      cache.ORDER_CONFIRM_COUPON,
      JSON.stringify(couponPageInfo)
    );
    this.savePointCache();
  };

  /**
   * 保存买家备注
   * @param remark
   */
  saveBuyerRemark = ({ remark, storeId }) => {
    this.dispatch('order-confirm-actor: remark', { remark, storeId });
  };

  /**
   * 初始化收货地址
   * @returns {Promise<void>}
   */
  initDefaultAddress = async () => {
    const addrRes = await webApi.fetchCustomerDefaultAddr();
    this.dispatch('order-confirm-actor: addr: fetch', addrRes.context);
    if (!this.state().get('isPostage')) {
      this.freightFunc();
    }
  };

  /**
   * 提交订单
   * @returns {Promise<void>}
   */
  submit = async (forceCommit) => {
    const {
      defaultAddr,
      orderConfirm,
      commonCodeId,
      usePoint,
      integralInput,
      stores
    } = this.state().toJS();
    //判断是否为抢购商品订单
    if (
      this.state().get('isFlashSaleGoods') &&
      this.state().get('flashSaleGoodsId')
    ) {
      //是抢购商品订单判断是否具有抢购资格
      if (!(await this.getFlashSaleGoodsQualifications())) {
        return;
      }
    }

    let storeCommitInfoList = [];
    if (!defaultAddr || !defaultAddr.deliveryAddressId) {
      msg.emit('app:tip', '请选择收货地址!');
      return;
    }
    const addrDetail =
      FindArea.addressInfo(
        defaultAddr ? defaultAddr.provinceId : '',
        defaultAddr ? defaultAddr.cityId : '',
        defaultAddr ? defaultAddr.areaId : ''
      ) + (defaultAddr ? defaultAddr.deliveryAddress : '');
    let deliverSite = await AsyncStorage.getItem(cache.DELIVER_SITE);
    deliverSite = (deliverSite && JSON.parse(deliverSite)) || null;
    //验证:如果是自提方式验证是否已选择
    for (const i in stores) {
      const storeId = stores[i].supplier.storeId;
      const tradeItems = stores[i].tradeItems;
      const gifts = stores[i].gifts;
      //每个店铺购买商品件数
      let totalNum = 0;
      tradeItems.forEach((tradeItem) => {
        totalNum += tradeItem.num;
      });
      if (gifts != '') {
        gifts.forEach((gift) => {
          totalNum += gift.num;
        });
      }
      for (const i in orderConfirm){
        let o = orderConfirm[i];
        if(o.bookingDeliveryFlag){
          if(!o.bookingDate){
            msg.emit('app:tip','请选择预约发货时间');
            return;
          }
        }
        if (o.deliverWay == '3') {
          if (!pickUpSelect[storeId]) {
            msg.emit('app:tip', "请选择自提地址");
            return;
          }
        }
        if(o.deliverWay == '1') {
          if (!deliverSite) {
            msg.emit('app:tip', "请选择物流公司");
            return;
          }
          if (totalNum < 5) {
            msg.emit('app:tip', "第三方物流起送数量不得少于5件");
            return;
          }
        }
        if (o.deliverWay == '4') {
          if (totalNum < 5) {
            msg.emit('app:tip', "免费店配起送数量不得少于5件");
            return;
          }
        }
        if (o.deliverWay == '' ) {
          msg.emit('app:tip','该地址不支持配送，请重新选择！');
          return;
        }
      }
    }

    orderConfirm.forEach((o, i) => {
      if (
        !FormRegexUtil(o.buyerRemark.trim(), `订单${i}订单备注`, {
          minLength: 0
        })
      ) {
        return;
      }
      if (o.payType === -1) {
        msg.emit('app:tip', '请选择支付方式!');
        return;
      }
      if (
        o.invoice.type != -1 &&
        o.sperator &&
        (!o.defaultInvoiceAddr || !o.defaultInvoiceAddr.deliveryAddressId)
      ) {
        msg.emit('app:tip', '请选择发票收货地址!');
        return;
      }
      const deliveryAddress = defaultAddr ? addrDetail : '';
      const invoiceAddrDetail = o.defaultInvoiceAddr
        ? FindArea.addressInfo(
            o.defaultInvoiceAddr ? o.defaultInvoiceAddr.provinceId : '',
            o.defaultInvoiceAddr ? o.defaultInvoiceAddr.cityId : '',
            o.defaultInvoiceAddr ? o.defaultInvoiceAddr.areaId : ''
          ) + (o.defaultInvoiceAddr ? o.defaultInvoiceAddr.deliveryAddress : '')
        : '';

      storeCommitInfoList.push({
        storeId: o.storeId, // 店铺Id
        payType: o.payType, //支付类型，必传
        invoiceType: o.invoice.type, //开票类型，必传 0：普通发票 1：增值税专用发票 -1：无
        generalInvoice:
          o.invoice.type == 0
            ? {
                flag: o.invoice.flag,
                title: o.invoice.title,
                identification: o.invoice.identification
              }
            : {}, //普通发票与增票参数至少一项必传
        specialInvoice:
          o.invoice.type == 1
            ? {
                id: o.VATInvoice.customerInvoiceId
              }
            : {}, //增值税专用发票与普票至少一项必传
        specialInvoiceAddress: o.sperator, //是否单独的收货地址
        invoiceAddressId:
          o.invoice.type != '-1' && o.sperator
            ? o.defaultInvoiceAddr.deliveryAddressId
            : defaultAddr.deliveryAddressId, //发票的收货地址ID,必传
        invoiceAddressDetail:
          o.invoice.type != '-1' && o.sperator
            ? invoiceAddrDetail
            : deliveryAddress, //收货地址详细信息（不包含省市区）
        invoiceAddressUpdateTime:
          o.invoice.type != '-1' && o.sperator
            ? o.defaultInvoiceAddr.updateTime
              ? moment(o.defaultInvoiceAddr.updateTime).format(
                  Const.SECONDS_FORMAT
                )
              : null
            : defaultAddr.updateTime
              ? moment(defaultAddr.updateTime).format(Const.SECONDS_FORMAT)
              : null,
        invoiceProjectId: o.invoice.type != '-1' ? o.invoice.projectKey : '', //开票项目id，必传
        invoiceProjectName: o.invoice.type != '-1' ? o.invoice.projectName : '', //开票项目名称，必传
        invoiceProjectUpdateTime: o.invoice.projectUpdateTime
          ? moment(o.invoice.projectUpdateTime).format(Const.SECONDS_FORMAT)
          : null, //开票项目修改时间
        buyerRemark: o.buyerRemark, //订单备注
        encloses: o.enclosures
          .filter((v) => v.status == 'done')
          .map((v) => v.image)
          .join(','), //附件, 逗号隔开
        deliverWay: o.deliverWay, //配送方式，默认快递
        bookingDate:(o.deliverWay == 1 || o.deliverWay == 4) && o.bookingDeliveryFlag
          ? o.bookingDate : null, //预约发货时间
        wareId: o.deliverWay == 3 ? o.pickUpWareId : null,
        couponCodeId: o.couponCodeId, // 选择的店铺优惠券id
        logisticsInfo: {
          id: (deliverSite && deliverSite.id) || '',
          logisticsCompanyName: (deliverSite && deliverSite.logisticsName) || '',
          logisticsCompanyPhone: (deliverSite && deliverSite.logisticsPhone) || '',
          logisticsAddress: (deliverSite && deliverSite.logisticsAddress) || '',
          receivingPoint: (deliverSite && deliverSite.receivingPoint) || '',
          insertFlag: (deliverSite && deliverSite.insertFlag != -1) ? deliverSite.insertFlag : ''
        },
      });
    });
    if (integralInput && integralInput != '') {
      let reg = /^\d+$/;
      if (!reg.test(integralInput)) {
        msg.emit('app:tip', '请填写正确的积分!');
        return;
      }
    }
    let cityCode = await WareUtils.queryChooseCity();
    let params = {
      consigneeId: defaultAddr.deliveryAddressId, //收货地址id，必传
      consigneeAddress: addrDetail, //收货地址详细信息(包含省市区)，必传
      consigneeUpdateTime: defaultAddr.updateTime
        ? moment(defaultAddr.updateTime).format(Const.SECONDS_FORMAT)
        : null, //收货地址修改时间
      storeCommitInfoList,
      commonCodeId,
      // 需要校验营销活动
      forceCommit,
      cityCode,
      //订单来源
      orderSource: 'APP',
      isFlashSaleGoods: true
    };
    if (_.sub(usePoint, 0) > 0) {
      params['points'] = usePoint;
    }
    const { code, message, context } = await webApi.commit(params);
    if (code == 'K-000000') {
      //下单成功,清除
      this.clearSessionStorage();
      //下单成功删除抢购资格信息
      if (
        this.state().get('isFlashSaleGoods') &&
        this.state().get('flashSaleGoodsId')
      ) {
        await webApi.delFlashSaleGoodsQualifications({
          flashSaleGoodsId: this.state().get('flashSaleGoodsId')
        });
      }

      // 当订单为已审核、先款后货时，直接支付
      const commitRes = context[0];
      if (
        commitRes.tradeState.auditState === 'CHECKED' &&
        commitRes.paymentOrder === 'PAY_FIRST'
      ) {
        msg.emit('router: goToNext', {
          routeName: 'PayOrder',
          results: context
        });
        return;
      }

      msg.emit('router: replace', {
        routeName: 'OrderSuccess',
        results: context
      });
    } else if (code == 'K-999999') {
      Confirm({
        text: message,
        cancelText: '重新下单',
        okText: '继续下单',
        okFn: () => this.submit(true),
        cancelFn: () =>
          msg.emit('router: goToNext', { routeName: 'PurchaseOrder' })
      });
    } else if (code == 'K-031407'){
      AsyncStorage.removeItem(cache.MATCH_WARE_STORE);
      Confirm({
        title: '',
        text: message,
        okText: '确定',
        okFn: () =>{}
      });
    } else if(code === 'K-050509'){
      Alert({
        text: '订单推送异常，请稍后重试',
        fnText: '确定',
        fn: () => msg.emit('router: back')
      });
    } else if(code === 'K-050510'){
      Alert({
        text: '网络请求超时，请稍后重试',
        fnText: '确定',
        fn: () => msg.emit('router: back')
      });
    } else {
      Alert({
        text: message,
        fnText: '确定',
        fn: () => msg.emit('router: goToNext', { routeName: 'PurchaseOrder' })
      });
    }
  };

  /**
   * 上传附件
   */
  addImage = ({ image, storeId }) => {
    this.dispatch('order-confirm-actor: addImage', { image, storeId });
  };

  /**
   * 删除附件
   */
  removeImage = ({ index, storeId }) => {
    this.dispatch('order-confirm-actor: removeImage', { index, storeId });
  };

  /**
   * 获取可用支付选项
   */
  getPayOptions = async () => {
    const { code, context } = await webApi.fetchOnlinePayStatus();
    if (code === config.SUCCESS_CODE && context == true) {
      const data = [
        { id: '0', name: '在线支付' },
        { id: '1', name: '线下支付' }
      ];
      this.dispatch('order-confirm-actor: options', fromJS(data));
    }
  };

  /**
   * 查询是否支持开票
   */
  fetchInvoiceSwitch = async (companyInfoIds) => {
    const { code, message, context } = await webApi.fetchInvoiceSwitch(
      companyInfoIds
    );
    if (code == 'K-000000') {
      this.dispatch('order-confirm-actor: invoice: switch', fromJS(context));
    } else {
      message.error(message);
    }
  };
  /**
   * 改变附件弹窗的显示隐藏，对图片对象重新排序
   */
  changeAnnexMask = (index, storeId) => {
    this.dispatch('change:changeAnnexMask', { index, storeId });
  };

  /**
   * 使用优惠券
   */
  useCoupons = () => {
    this.saveSessionStorage('coupon');
    const coupons = this.state().get('coupons');
    const couponPageInfo = this.state().get('couponPageInfo');
    const orderConfirm = this.state().get('orderConfirm');
    msg.emit('router: goToNext', {
      routeName: 'UseCoupon',
      coupons,
      couponPageInfo,
      storeIds: orderConfirm.map((item) => item.get('storeId'))
    });
  };
  savePointCache = () => {
    //当前按钮选中的状态的时候
    if (this.state().get('showPoint')) {
      //存储缓存
      AsyncStorage.setItem(
        cache.ORDER_POINT,
        JSON.stringify({
          usePoint: this.state().get('usePoint'),
          integralInput: this.state().get('integralInput'),
          deductionAmount: _.sub(
            this.state().get('totalPrice'),
            this.state().get('totalDeliveryPrice')
          )
        })
      );
    }
  };

  /**
   * 保存使用积分
   *
   * @param integralInput 输入的积分
   * @param pointWorth 积分转换单位
   */
  setUsePoint = (integralInput, maxPoint) => {
    // 使用的积分
    let usePoint = 0;
    if (integralInput != '') {
      let reg = /^\d+$/;
      if (!reg.test(integralInput)) {
        Alert({
          text: '请填写正确的积分'
        });
        this.dispatch('order-confirm-actor:setUsePoint', {
          usePoint,
          integralInput
        });
        return;
      }
    }
    usePoint = integralInput;
    // 如果大于最大限制，自动已最大计算
    if (integralInput > maxPoint) {
      usePoint = maxPoint;
      integralInput = maxPoint.toString();
    }
    this.dispatch('order-confirm-actor:setUsePoint', {
      usePoint,
      integralInput
    });
  };
  /**
   * 订单提交页切换是否使用积分
   */
  changeSwitch = (value) => {
    //如果关闭积分,清除缓存
    if (!value) {
      AsyncStorage.removeItem(cache.ORDER_POINT);
    }
    this.dispatch('order-confirm-actor:changeSwitch');
  };
  /**
   * 初始化积分余额
   */
  initPointConfig = async () => {
    const { code, context } = await webApi.fetchPointsConfig();
    if (code === config.SUCCESS_CODE) {
      this.dispatch('order-confirm-actor:initpointConfig', fromJS(context));
    }
  };

  /**
   * 初始化积分余额
   */
  initTotalPoint = async () => {
    const { code, context } = await webApi.fetchCustomerCenterInfo();
    if (code === config.SUCCESS_CODE) {
      this.dispatch(
        'order-confirm-actor:initTotalPoint',
        context.pointsAvailable
      );
    }
  };

  /**
   * 是否获取抢购资格定时任务查询
   * @param flashSaleGoodsId
   */
  getFlashSaleGoodsQualifications = async () => {
    let res = {};
    res = await webApi.getFlashSaleGoodsQualifications({
      flashSaleGoodsId: this.state().get('flashSaleGoodsId'),
      flashSaleGoodsNum:this.state().get('flashSaleGoodsNum')
    });
    if (res.code == 'K-000000') {
      if (res.context != null) {
        return true;
      } else {
        Alert({
          text: '抢购失败！'
        });
        return false;
      }
    } else {
      Alert({
        text: res.message
      });
      return false;
    }
  };

  /**
   * 打开或关闭配送文案弹窗
   */
  openModel =(storeId,flag)=>{
    let deliverModelIsShow ={};
    deliverModelIsShow[storeId] = flag;
    this.dispatch('order-confirm-actor: setDeliverModelIsShow',deliverModelIsShow);
  };

  //设置配送方式
  setDeliveryWay =(storeId, val)=> {
    let deliveryWaysId={};
    deliveryWaysId[storeId] = val;
    this.dispatch('order-confirm-actor: setDeliveryWaysId',deliveryWaysId);
  };
}
