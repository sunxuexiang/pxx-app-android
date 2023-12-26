import { Actor, Action } from 'plume2';
/**
 * Created by feitingting on 2017/8/3.
 */
export default class ReturnLogisticsInfoActor extends Actor {
  defaultState() {
    return {
      //是否获取相关物流信息，有为true,没有为false
      result: true,
      companyInfo: {
        //物流公司标准编码
        code: '',
        //公司名称
        company: '',
        //创建日期
        createTime: '',
        //运单号
        no: ''
      },
      detail: []
    };
  }

  @Action('logistics:init')
  init(state, res) {
    return state.set('detail', res);
  }

  @Action('logistics:info')
  info(state, params) {
    return state
      .setIn(['companyInfo', 'code'], params.code)
      .setIn(['companyInfo', 'company'], params.company)
      .setIn(['companyInfo', 'createTime'], params.createTime)
      .setIn(['companyInfo', 'no'], params.no);
  }

  @Action('logistics:result')
  result(state) {
    return state.set('result', false);
  }
}
