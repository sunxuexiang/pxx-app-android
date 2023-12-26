import { Action, Actor } from 'plume2';
import moment from 'moment';
import { Const } from 'wmkit/const';

export default class LoginActor extends Actor {
  defaultState() {
    return {
      form: {
        tid: '', //订单id
        accountId: '', //账户id
        accountNm: '', //账户信息
        time: new Date(), //付款时间
        createTime: moment(this.time).format(Const.DATE_FORMAT), //付款时间 - 年月日
        formatTime: moment(this.time).format(Const.DATE_FORMAT + ' 00:00:00'), //付款显示时间 - 年月日 00:00:00
        remark: '', //备注
        encloses: '' //附件
      }
    };
  }

  /**
   * 修改提交form的内容
   */
  @Action('formActor:changeForm')
  changeForm(state, fillForm) {
    return state.update('form', form => form.mergeDeep(fillForm));
  }

  /**
   * 修改备注
   *
   * @param {any} state
   * @param {any} remark
   * @returns
   * @memberof LoginActor
   */
  @Action('formActor:changeRemark')
  changeRemark(state, remark) {
    return state.setIn(['form', 'remark'], remark);
  }

  /**
   * 添加附件
   * @param state
   * @param remark
   * @returns {List<T> | Map<K, V> | __Cursor.Cursor | *}
   */
  @Action('formActor:addImg')
  addImg(state, url) {
    return state.setIn(['form', 'encloses'], url);
  }
}
