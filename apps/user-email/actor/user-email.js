import { Action, Actor } from 'plume2';

export default class UserEmail extends Actor {
  defaultState() {
    return {
      // 用户财务邮箱列表
      emailList: [],
      // 弹窗邮箱内容
      emailInfo: {
        customerEmailId: '',
        customerId: '',
        emailAddress: ''
      },
      // 刷新状态
      refreshState: false,
      // 弹窗显示状态
      emailModelVisible: false,
      // 邮箱错误信息
      errorInfo: ''
    };
  }

  /**
   * 邮箱列表
   */
  @Action('customer:emailList')
  emailList(state, res) {
    return state.set('emailList', res);
  }

  /**
   * 刷新财务邮箱列表
   * @param {*} state
   */
  @Action('customer: refresh')
  refresh(state) {
    return state.set('refreshState', !state.get('refreshState'));
  }

  /**
   * 修改表单值
   */
  @Action('customer:email:edit')
  setParameter(state, { key, value }) {
    return state.setIn(['emailInfo', key], value);
  }

  /**
   * 修改弹窗是否显示
   * @param state
   * @param flag
   * @returns {*}
   */
  @Action('email:model:show')
  setEmailModelVisible(state, flag) {
    return state.set('emailModelVisible', flag);
  }

  /**
   * 修改错误信息
   * @param state
   * @param errorInfo
   * @returns {*}
   */
  @Action('email:errorInfo:edit')
  setErrorInfo(state, errorInfo) {
    return state.set('errorInfo', errorInfo);
  }
}
