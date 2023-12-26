import { fromJS } from 'immutable';

import { Store, msg } from 'plume2';

import { Confirm } from 'wmkit/modal/confirm';
import * as _ from 'wmkit/common/util';
import { config } from 'wmkit/config';
import * as WMkit from 'wmkit/kit';

import OrderListTopActor from './actor/order-list-top-actor';
import FormActor from './actor/order-list-form-actor';

import * as webapi from './webapi';
import { defaultPaylOrder } from '../order-detail/webapi';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
    if (__DEV__) {
      window._store = this;
    }
  }

  bindActor() {
    return [new OrderListTopActor(), new FormActor()];
  }

  init = (tabKey) => {
    // console.log('tabKey:' + tabKey);
    this.getServerTime();
    this.transaction(() => {
      // this.dispatch('top:active', tabKey)
      this.changeTopActive(tabKey);
    });
    this.getOrderShowType();
  };

  /**
   * 初始化订单列表显示类型
   */
  getOrderShowType = async () => {
    const res = await webapi.getOrderShowType();
    if (res && res.code === config.SUCCESS_CODE) {
      this.dispatch('order-list:orderListType', res.context.status);
    }
  };
  // 判断骨架屏是否展示
  isSkeletonShow = (flag) => {
    this.dispatch('goodSkeleton:show', flag);
  };
  /**
   * 初始话刷新method
   * @param toRefresh
   */
  initToRefresh = (toRefresh) => {
    this.dispatch('order-list:toRefresh', toRefresh);
  };

  /**
   * 点击顶部tab
   * @param key tab的key值
   */
  changeTopActive = (key) => {
    if (this.state().get('key') === key) {
      return;
    }

    const [state, value] = key.split('-');
    let form = {};
    form[state] = value;

    this.transaction(() => {
      this.dispatch('top:active', key);
      this.dispatch('order-list-form:clearOrders');
      this.dispatch('order-list-form:setForm', fromJS(form));
    });
  };

  /**
   * 确认取消订单
   * @param tid 订单号
   */
  cancelConfirm = async (tid) => {
    const { code, message } = await webapi.cancelOrder(tid);
    if (code === config.SUCCESS_CODE) {
      msg.emit('app:tip', '取消成功');
      this.state().get('toRefresh')();
    } else {
      msg.emit('app:tip', message);
    }
  };

  /**
   * 取消订单
   * @param tid 订单号
   */
  cancelOrder = (tid) => {
    Confirm({
      title: '取消订单',
      text: '您确定要取消该订单?',
      okFn: () => this.cancelConfirm(tid),
      okText: '确定',
      cancelText: '取消'
    });
  };

  /**
   * 设置订单列表
   * @param res
   */
  fetchOrders = (res) => {
    if (res.context) {
      this.dispatch('order-list-form:setOrders', fromJS(res.context.content));
    }
  };

  /**
   * 申请退单
   * @param tid 订单号
   */
  applyRefund = async (tid) => {
    //检验当前订单是否可退
    const res = await webapi.isAbleReturn(tid);
    if (res.code != config.SUCCESS_CODE) {
      msg.emit('app:tip', res.message);
      return;
    }

    let { message, context } = await webapi.getTradeDetail(tid);
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

      // 获取该订单所有的待处理及已完成的退单列表a
      let { context,code } = await webapi.fetchOrderReturnList(tid);
      if (code !== config.SUCCESS_CODE) {
        msg.emit('app:tip', '该订单无法退货退款');
        return ;
      }

      if (context) {
        canApply = true;

        // 如果有未处理完的，则不允许再次申请
        context.forEach((v) => {
          if (
            v.returnFlowState !== 'REFUNDED' &&
            v.returnFlowState !== 'COMPLETED' &&
            v.returnFlowState !== 'REJECT_REFUND' &&
            v.returnFlowState !== 'REJECT_RECEIVE' &&
            v.returnFlowState !== 'VOID'
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
            payState === 'PAID' &&
            deliverStatus === 'NOT_YET_SHIPPED'
          ) {
            context.forEach((v) => {
              // 已完成申请的
              if (v.returnFlowState === 'COMPLETED') {
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
                .length === 0
            ) {
              // 退货申请，如果没有可退商品则不允许申请
              canApply = false;
              errMsg = '无可退商品';
            } else if (tradeDetail['payInfo']['payTypeId'] === '0') {
              // 在线支付需判断退款金额
              let totalApplyPrice = 0;
              context.forEach((v) => {
                // 计算已完成的申请单退款总额
                if (v.returnFlowState === 'COMPLETED') {
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
      let isReturn = tradeDetail['tradeState'].flowState === 'COMPLETED';

      // 退货，则进入退货申请页面，否则进入退款申请页面
      if (isReturn) {
        msg.emit('router: goToNext', { routeName: 'ReturnFirstStep', tid });
      } else {
        msg.emit('router: goToNext', { routeName: 'RefundFirstStep', tid });
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
   * 获取服务时间
   */
  getServerTime = async () => {
    //获取服务时间
    const serverTime = await WMkit.queryServerTime();
    //存储服务时间
    this.dispatch('order-list-form:serverTime', serverTime.context);
  };

  /**
   * 弹框隐藏
   */
  changeCateMask = () => {
    const showCateMask = this.state().get('showCateMask');
    if (!showCateMask) {
      // 查询积分设置开关
      this.pointsRules();
    }
    this.dispatch('top:changeCateMask', !showCateMask);
  };

  /**
   * 订单筛选
   */
  tabsChange = (key) => {
    let url = '';
    if (!key) {
      this.init('');
    } else {
      switch (key) {
        case 'assemble-order':
          url = 'GroupOrderList';
          break;
        case 'points-order':
          url = 'PointsOrderList';
          break;
      }
      msg.emit('router: goToNext', { routeName: url });
    }
  };

  /**
   * 搜索订单
   */
  handleQueryString = (key, flowState) => {
    const [state, value] = flowState.split('-');
    this.transaction(() => {
      this.dispatch('order-list-form:clearOrders');
      let form = {};
      form['keywords'] = key;
      form[state] = value;
      this.dispatch('order-list-form:setForm', fromJS(form));
    });
  };

  /**
   * 查询平台积分开关配置
   * @returns {Promise<void>}
   */
  pointsRules = async () => {
    // 积分开关是否打开
    let res = await webapi.basicRules();
    if (res && res.code === config.SUCCESS_CODE && res.context.status === 1)
      this.dispatch('order:list:pointsIsOpen');
  };

  // 再次购买
  againBuy = async tid => {
    const { context } = await webapi.getTradeDetailList(tid);
    let goodsInfos = [];
    if (context) {
      context.tradeItems.map(n => {
        goodsInfos.push({
          goodsInfoId: n.skuId,
          price: n.price,
          buyCount: 1
        });
      });
      const result = await webapi.purchase({ goodsInfos });
      console.log(result);
      msg.emit('router: goToNext', {
        routeName: 'PurchaseOrder'
      });
    }
  }
  //自提确认收货
  confirm = async (tid) => {
    const { code, message } = await webapi.update({tradeId: tid});
    if (code === config.SUCCESS_CODE) {
      msg.emit('app:tip', '收货成功！');
      this.dispatch('order:list:deliveryStatus');
    } else {
      msg.emit('app:tip', '操作失败,记录不存在');
    }
  }

}
