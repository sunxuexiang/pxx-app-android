import { Action, Actor } from 'plume2';

export default class MarketingActor extends Actor {
  defaultState() {
    return {
      // 营销信息
      marketing: {},
      // 计算结果
      calc: {},
      // 赠品信息
      gift: [],
      // 优惠是否叠加（0/否，1/是）
      isOverlap: 0
    };
  }

  /**
   * 获取开始结束时间
   */
  @Action('marketing: detail')
  fetchTime(state, marketing) {
    return state.set('marketing', marketing);
  }

  /**
   * 获取营销计算价格
   * @param {*} state
   * @param {*} result
   */
  @Action('marketing: calc')
  calc(state, result) {
    return state.set('calc', result);
  }

  /**
   * 获取赠品详情
   * @param {*} state
   * @param {*} gift
   */
  @Action('marketing: gift')
  gift(state, gift) {
    return state.set('gift', gift);
  }

  /**
   * 营销类型
   * @param {*} state
   * @param {*} type
   */
  @Action('marketing: type')
  marketingType(state, type) {
    return state.set('type', type);
  }
  /**
   * 叠加类型
   * @param {*} state
   * @param {*} type
   */
  @Action('marketing: overlap')
  overlap(state, type) {
    return state.set('isOverlap', type);
  }
}
