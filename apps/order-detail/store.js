import { Store, msg } from 'plume2';
import AsyncStorage from '@react-native-community/async-storage';

import { Confirm } from 'wmkit/modal/confirm';
import * as _ from 'wmkit/common/util';
import { config } from 'wmkit/config';
import { cache } from 'wmkit/cache';
import { fromJS } from 'immutable';
import DetailActor from './actor/detail-actor';
import {
  cancelOrder,
  fetchOrderDetail,
  fetchOrderReturnList,
  getTradeDetail,
  defaultPaylOrder,
  fetchPointsConfig,
  commitTail,
  getTradeDetailList,
  fetchCustomerCenterInfo,
  purchase,update
} from './webapi';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
    if (__DEV__) {
      window._store = this;
    }
  }

  bindActor() {
    return [new DetailActor()];
  }

  /**
   * 初始化订单详情
   */
  init = async (tid) => {
    //加载中
    this.changeLoadingVisible(true);
    this.dispatch('detail-actor:tid', tid);
    const res = await fetchOrderDetail(tid);
    //初始化积分信息
    await this.initPointConfig();
    this.initTotalPoint();

    if (res.code == config.SUCCESS_CODE) {
      this.dispatch('detail-actor:init', res.context);
      this.dispatch('detail-actor:initPresale', res.context);
      this.dispatch(
        'change:initEnclosures',
        res.context.encloses && fromJS(res.context.encloses.split(','))
      );
      let goodsTotalNum = 0;
      if (res.context.gifts) {
        res.context.gifts.map((item) => {
          goodsTotalNum += item.num;
        });
      }
      if (res.context.tradeItems) {
        res.context.tradeItems.map((item) => {
          goodsTotalNum += item.num;
        });
      }
      this.dispatch('detail-actor:initTotalGoodsNum', goodsTotalNum);
    } else if (res.code == 'K-050100') {
      msg.emit('app:tip', '订单不存在');
      msg.emit('router: goToNext', { routeName: 'OrderList',orderPay: true });
    } else {
      msg.emit('app:tip', res.message);
      msg.emit('router: goToNext', {
        routeName: 'OrderList'
      });
    }

    //跳转返回初始化
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
        this.dispatch('detail-actor:changeSwitch');
        this.dispatch('detail-actor:setUsePoint', {
          usePoint,
          integralInput
        });
      }
    }
    this.changeLoadingVisible(false);
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
        this.dispatch('detail-actor:setUsePoint', {
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
    this.dispatch('detail-actor:setUsePoint', {
      usePoint,
      integralInput
    });
  };

  /**
   * 切换是否使用积分
   */
  changeSwitch = (value: boolean) => {
    //如果关闭积分,清除缓存
    if (!value) {
      AsyncStorage.removeItem(cache.ORDER_POINT);
    }
    this.dispatch('detail-actor:changeSwitch');
  };

  /**
   * 初始化积分余额
   */
  initTotalPoint = async () => {
    const { code, context } = await fetchCustomerCenterInfo();
    if (code === config.SUCCESS_CODE) {
      this.dispatch('detail-actor:initTotalPoint', context.pointsAvailable);
    }
  };

  /**
   * 初始化积分余额
   */
  initPointConfig = async () => {
    const { code, context } = await fetchPointsConfig();

    if (code === config.SUCCESS_CODE) {
      this.dispatch('detail-actor:initpointConfig', fromJS(context));
    }
  };

  /**
   * 确认取消订单
   */
  cancelConfirm = async (tid) => {
    const res = await cancelOrder(tid);
    if (res.code == config.SUCCESS_CODE) {
      msg.emit('app:tip', '取消成功');
      msg.emit('router: refresh');
    } else {
      msg.emit('app:tip', res.message);
    }
  };

  /**
   * 取消订单
   * @param tid
   */
  _cancelOrder = (tid) => {
    Confirm({
      title: '取消订单',
      text: '您确定要取消该订单?',
      cancelText: '取消',
      okText: '确定',
      okFn: () => this.cancelConfirm(tid)
    });
  };

  /**
   * 申请退单
   */
  applyRefund = async (tid) => {
    let { message, context } = await getTradeDetail(tid);

    let tradeDetail = context;

    let errMsg;
    let canApply = false;

    if (tradeDetail) {
      const flowState = tradeDetail['tradeState']
        ? tradeDetail['tradeState']['flowState']
        : '';
      const payState = tradeDetail['tradeState']
        ? tradeDetail['tradeState']['payState']
        : '';
      const deliverStatus = tradeDetail['tradeState']
        ? tradeDetail['tradeState']['deliverStatus']
        : '';

      // 获取该订单所有的待处理及已完成的退单列表
      let orderReturnListRes = await fetchOrderReturnList(tid);
      if (orderReturnListRes.code !== config.SUCCESS_CODE) {
        msg.emit('app:tip', '该订单无法退货退款');
        return ;
      }

      if (orderReturnListRes.context) {
        canApply = true;

        // 如果有未处理完的，则不允许再次申请
        orderReturnListRes.context.forEach((v) => {
          if (
            v.returnFlowState != 'REFUNDED' &&
            v.returnFlowState != 'COMPLETED' &&
            v.returnFlowState != 'REJECT_REFUND' &&
            v.returnFlowState != 'REJECT_RECEIVE' &&
            v.returnFlowState != 'VOID'
          ) {
            // 有未处理完的
            canApply = false;
            errMsg = '该订单关联了处理中的退单，不可再次申请';
          }
        });

        // 没有待处理的申请
        if (canApply) {
          // 退款申请，如果有已完成的则不允许再次申请
          if (
            (flowState == 'AUDIT' || flowState == 'TOPICKUP') &&
            payState == 'PAID' &&
            deliverStatus == 'NOT_YET_SHIPPED'
          ) {
            orderReturnListRes.context.forEach((v) => {
              // 已完成申请的
              if (v.returnFlowState == 'COMPLETED') {
                canApply = false;
                errMsg = '无可退商品';
              }
            });
          } else if (
            flowState == 'AUDIT' &&
            payState == 'NOT_PAID' &&
            deliverStatus == 'NOT_YET_SHIPPED'
          ) {
            canApply = false;
            errMsg = '无可退金额';
          } else {
            if (
              tradeDetail['tradeItems'] &&
              tradeDetail['tradeItems'].filter((v) => v.canReturnNum > 0)
                .length == 0
            ) {
              // 退货申请，如果没有可退商品则不允许申请
              canApply = false;
              errMsg = '无可退商品';
            } else if (tradeDetail['payInfo']['payTypeId'] == '0') {
              // 在线支付需判断退款金额
              let totalApplyPrice = 0;
              orderReturnListRes.context.forEach((v) => {
                // 计算已完成的申请单退款总额
                if (v.returnFlowState == 'COMPLETED') {
                  totalApplyPrice = _.add(
                    totalApplyPrice,
                    v.returnPrice.applyStatus
                      ? v.returnPrice.applyPrice
                      : v.returnPrice.totalPrice
                  );
                }
              });

              if (
                totalApplyPrice >= tradeDetail['tradePrice']['totalPrice'] &&
                tradeDetail['tradePrice']['totalPrice'] !== 0
              ) {
                canApply = false;
                errMsg = '无可退金额';
              }
            }
          }
        }
      } else {
        errMsg = '系统异常';
      }
    } else {
      errMsg = message;
    }

    //  可以申请，进入申请页面，否则提示错误信息
    if (canApply) {
      // 已完结订单，则为退货申请，否则认为是退款申请
      let isReturn =
        tradeDetail['tradeState'].flowState == 'COMPLETED' ? true : false;

      // 退货，则进入退货申请页面，否则进入退款申请页面
      if (isReturn) {
        msg.emit('router: goToNext', {
          routeName: 'ReturnFirstStep',
          tid: tid
        });
      } else {
        msg.emit('router: goToNext', {
          routeName: 'RefundFirstStep',
          tid: tid
        });
      }
    } else {
      msg.emit('app:tip', errMsg);
    }
  };

  /**
   * 0元支付
   */
  defaultPay = async (tid) => {
    const res = await defaultPaylOrder(tid);
    if (res.code == 'K-000000') {
      //跳转到付款成功页
      msg.emit('router: goToNext', {
        routeName: 'PaySuccess',
        tid: tid,
        payType: 'online'
      });
    } else {
      msg.emit('app:tip', res.message);
    }
  };

  /**
   * 改变附件弹窗的显示隐藏，对图片对象重新排序
   */
  changeAnnexMask = (index) => {
    this.dispatch('change:changeAnnexMask');
    if (index != 'undefined') {
      let newFileList = this.state().get('enclosures').toJS();
      newFileList = newFileList.splice(index).concat(newFileList);
      this.dispatch('change:newImage', newFileList);
    }
  };

  /**
   * 支付尾款
   */
  payBalance = async (tid) => {
    let { detail, commonCodeId, usePoint, couponCodeId } = this.state().toJS();

    const { consignee, supplier, tailNoticeMobile } = detail;

    const params = {
      baseStoreId: supplier.supplierId,
      commonCodeId, //平台优惠券id
      consigneeAddress: consignee.detailAddress,
      consigneeId: consignee.id,
      forceCommit: 0,
      isBookingSaleGoods: true,
      orderSource: 'APP',
      points: usePoint,
      shopName: supplier.storeName,
      storeCommitInfoList: [
        {
          storeId: supplier.storeId,
          payType: 0,
          invoiceType: -1,
          generalInvoice: {},
          specialInvoice: {},
          specialInvoiceAddress: false,
          invoiceAddressId: '',
          invoiceAddressDetail: '',
          invoiceAddressUpdateTime: null,
          invoiceProjectId: null,
          invoiceProjectName: '',
          invoiceProjectUpdateTime: null,
          buyerRemark: '',
          encloses: '',
          deliverWay: 1,
          couponCodeId //店铺优惠券id
        }
      ],
      tailNoticeMobile,
      tid,
      tradeMarketingList: []
    };
    try {
      const { context } = await commitTail(params);
      if (context && context[0].price == 0) {
        //0元支付
        this.defaultPay(tid);
        return;
      }

      msg.emit('router: goToNext', {
        routeName: 'PayOrder',
        tid
      });
    } catch (err) {
      msg.emit('app:tip', err.message);
    }
  };

  /**
   * 使用优惠券
   */
  useCoupons = () => {
    this.saveSessionStorage('coupon');
    const coupons = this.state().get('coupons');
    const couponPageInfo = this.state().get('couponPageInfo');
    const detail = this.state().get('detail');

    msg.emit('router: goToNext', {
      routeName: 'UseCoupon',
      coupons,
      couponPageInfo,
      storeIds: [detail.get('supplier').get('storeId')]
    });
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

  // 再次购买
  againBuy = async tid => {
    const { context } = await getTradeDetailList(tid);
    let goodsInfos = [];
    if (context) {
      context.tradeItems.map(n => {
        goodsInfos.push({
          goodsInfoId: n.skuId,
          price: n.price,
          buyCount: 1
        });
      });
      const result = await purchase({ goodsInfos });
      console.log(result);
      msg.emit('router: goToNext', {
        routeName: 'PurchaseOrder'
      });
    }
  }

  //自提确认收货
  confirm = async (tid) => {
    const { code, message } = await update({tradeId: tid});
    if (code === config.SUCCESS_CODE) {
      msg.emit('app:tip', '收货成功！');
      init(tid)
    } else {
      msg.emit('app:tip', '操作失败,记录不存在');
    }
  };
  //改变加载中状态
  changeLoadingVisible = (status) => {
    this.dispatch('set: loadingVisible', status);
  };
}
