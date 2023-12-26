import { Store, msg } from 'plume2';

import * as _ from 'wmkit/common/util';
import { Confirm } from 'wmkit/modal/confirm';
import { config } from 'wmkit/config';
import { fromJS } from 'immutable';
import DetailActor from './actor/detail-actor';

import {
  cancelOrder,
  fetchOrderDetail,
  fetchOrderReturnList,
  getTradeDetail,
  defaultPaylOrder
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
    const res = await fetchOrderDetail(tid);
    if (res.code == config.SUCCESS_CODE) {
      this.dispatch('detail-actor:init', res.context);
      this.dispatch(
        'change:initEnclosures',
        res.context.encloses && fromJS(res.context.encloses.split(','))
      );
    } else if (res.code == 'K-050100') {
      msg.emit('app:tip', '订单不存在');
      msg.emit('router: goToNext', {
        routeName: 'UserCenter'
      });
    } else {
      msg.emit('app:tip', res.message);
      msg.emit('router: goToNext', {
        routeName: 'OrderList'
      });
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
      let newFileList = this.state()
        .get('enclosures')
        .toJS();
      newFileList = newFileList.splice(index).concat(newFileList);
      this.dispatch('change:newImage', newFileList);
    }
  };
}
