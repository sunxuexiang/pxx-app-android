import { Actor, Action, IMap } from 'plume2';

export default class DrawCashActor extends Actor {
  defaultState() {
    return {
      // 选中的tab key
      key: 0,
      // 列表查询条件
      form: {
        //审核状态 2个
        auditStatus: null,
        //完成状态 1个
        finishStatus: null,
        //用户操作状态 1个
        customerOperateStatus: null
      },
      // 是否初始化解析参数完毕
      initialEnd: false
    };
  }

  /**
   * 解析参数完毕
   */
  @Action('cash: list: initial')
  initialEnd(state, flag) {
    return state.set('initialEnd', flag);
  }

  /**
   * 设置tab
   */
  @Action('top:active')
  topActive(state: IMap, key: string) {
    return state.set('key', key);
  }

  /**
   * 审核状态
   * @param state
   * @param value
   * @returns {Immutable.Map<string, any>}
   */
  @Action('form:audit:status')
  changeAuditStatus(state: IMap, value) {
    return state.setIn(['form', 'auditStatus'], value);
  }

  /**
   * 完成状态
   * @param state
   * @param value
   * @returns {Immutable.Map<string, any>}
   */
  @Action('form:finish:status')
  changeFinishStatus(state: IMap, value) {
    return state.setIn(['form', 'finishStatus'], value);
  }

  /**
   * 用户操作状态
   * @param state
   * @param value
   * @returns {Immutable.Map<string, any>}
   */
  @Action('form:customer:operate:status')
  changeCustomerOperateStatus(state: IMap, value) {
    return state.setIn(['form', 'customerOperateStatus'], value);
  }
}
