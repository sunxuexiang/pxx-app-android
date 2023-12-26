/**
 * Created by feitingting on 2017/8/5.
 */
import { Actor, Action } from 'plume2';

export default class RefundRecordActor extends Actor {
  defaultState() {
    return {
      //退款记录
      refundRecord: {
        // 退款状态
        returnFlowState: 'COMPLETED',
        //付款方式
        payType: '',
        //收款账户
        returnAccount: '',
        //收款账户名称
        returnAccountName: '',
        //商家退款账户
        customerAccountName: '',
        //实退金额
        actualReturnPrice: '',
        //退款时间
        refundBillTime: '',
        //备注
        comment: '',
        //流水号
        refundBillCode: '',
        //应退金额
        returnPrice: '',
        // 应退积分
        applyPoints: '',
        // 实退积分
        actualPoints: ''
      },
      //积分是否打开
      pointsIsOpen: false
    };
  }

  @Action('refundrecord:returnFlowState')
  returnFlowState(state, returnFlowState) {
    return state.setIn(['refundRecord', 'returnFlowState'], returnFlowState);
  }

  @Action('refundrecord:init')
  init(state, res) {
    return state
      .setIn(['refundRecord', 'payType'], res.payType)
      .setIn(['refundRecord', 'returnAccount'], res.returnAccount)
      .setIn(['refundRecord', 'returnAccountName'], res.returnAccountName)
      .setIn(['refundRecord', 'customerAccountName'], res.customerAccountName)
      .setIn(['refundRecord', 'actualReturnPrice'], res.actualReturnPrice)
      .setIn(['refundRecord', 'refundBillTime'], res.refundBillTime)
      .setIn(['refundRecord', 'comment'], res.comment)
      .setIn(['refundRecord', 'refundBillCode'], res.refundBillCode)
      .setIn(['refundRecord', 'returnPrice'], res.returnPrice)
      .setIn(['refundRecord', 'applyPoints'], res.returnPoints || 0)
      .setIn(['refundRecord', 'actualPoints'], res.actualReturnPoints || 0
      );
  }

  @Action('refundrecord:empty')
  empty(state, res) {
    return state
      .setIn(['refundRecord', 'payType'], res.payType)
      .setIn(['refundRecord', 'returnPrice'], res.returnPrice.totalPrice)
      .setIn(['refundRecord', 'customerAccountName'], '')
      .setIn(['refundRecord', 'returnAccountName'], '')
      .setIn(['refundRecord', 'refundBillTime'], '')
      .setIn(['refundRecord', 'actualReturnPrice'], '')
      .setIn(['refundRecord', 'applyPoints'], res.returnPoints.applyPoints || 0)
      .setIn(['refundRecord', 'actualPoints'], res.returnPoints.actualPoints || 0);
  }

  /**
   * 是否积分关闭了
   */
  @Action('userInfo:pointsIsOpen')
  pointsIsOpen(state) {
    return state.set('pointsIsOpen', true);
  }
}
