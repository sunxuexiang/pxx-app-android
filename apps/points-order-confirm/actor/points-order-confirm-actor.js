import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';

export default class PointsOrderConfirmActor extends Actor {
  defaultState() {
    return {
      defaultAddr: {}, //默认地址
      pointsOrderConfirm: {}, // 积分订单确认项目
      store: {}, // 店铺
      totalPoints: 0, //订单积分
      visible: false, //支付密码弹框展示
      payPwd: '', //支付密码
      checkPayPwdRes: true,
      payPwdTime: 0
    };
  }

  /**
   * 存储会员默认地址,没有则获取第一个
   * @param state
   * @param addr
   * @returns {Map<string, V>}
   */
  @Action('points-order-confirm: addr: fetch')
  saveAddr(state, addr) {
    return state.set('defaultAddr', fromJS(addr));
  }

  /**
   * 订单积分数
   * @param state
   * @param totalPoints
   */
  @Action('points-order-confirm: price: fetch')
  fetchPrice(state, totalPoints) {
    return state.set('totalPoints', totalPoints);
  }

  /**
   * 店铺
   * @param state
   * @param pointsTradeConfirmItem
   * @returns {Map<string, V>}
   */
  @Action('points-order-confirm: store: fetch')
  fetchOrderStores(state, pointsTradeConfirmItem) {
    return state.set('store', fromJS(pointsTradeConfirmItem));
  }

  /**
   * 提交确认项初始化
   * @param state
   */
  @Action('points-order-confirm: init')
  orderConfirmInit(state, params) {
    return state.set(
      'pointsOrderConfirm',
      fromJS({
        pointsGoodsId: params.pointsGoodsId, //积分商品Id
        num: params.num, //积分商品数量
        buyerRemark: '' //买家备注
      })
    );
  }

  /**
   * 存储买家备注
   * @param state
   * @param remark
   * @returns {IMap}
   */
  @Action('points-order-confirm: remark')
  saveRemark(state, remark) {
    return state.setIn(['pointsOrderConfirm', 'buyerRemark'], remark);
  }

  /**
   * 返回初始化
   * @param state
   * @param defaultAddr
   * @param pointsOrderConfirm
   * @returns {IMap}
   */
  @Action('points-order-confirm: back: init')
  backInit(state, { defaultAddr, pointsOrderConfirm }) {
    return state
      .set('defaultAddr', fromJS(defaultAddr))
      .set('pointsOrderConfirm', fromJS(pointsOrderConfirm));
  }

  /**
   * 支付密码输入框是否显示
   */
  @Action('points-order-confirm:showPassword')
  showPassword(state, val) {
    return state.set('visible', val);
  }

  /**
   * 支付密码改变
   */
  @Action('points-order-confirm:changePayPwd')
  changePayPwd(state, val) {
    return state.set('payPwd', val);
  }

  /**
   * 校验密码结果
   */
  @Action('points-order-confirm:checkPayPwdRes')
  checkPayPwdRes(state, checkPayPwdRes) {
    return state.set('checkPayPwdRes', checkPayPwdRes);
  }

  /**
   * 密码错误次数
   */
  @Action('points-order-confirm:countPayPwdTime')
  countPayPwdTime(state, payPwdTime) {
    return state.set('payPwdTime', payPwdTime);
  }
}
