/**
 * Created by hht on 2017/9/4.
 */
import { Actor, Action } from 'plume2';
import { fromJS } from 'immutable';

export default class EnterPriseActor extends Actor {
  defaultState() {
    return {
      //会员的信息
      customer: {},
      form:{
        customerId:'',
        customerRegisterType: 0,
        enterpriseName:'',
        socialCreditCode:'',
        businessLicenseUrl:'',
        customerTag:0,
        enterpriseStatusXyy:0
      },
      images:[]
    };
  }

  /**
   * 初始化数据
   * @param state
   * @param customer
   * @returns {Map<string, V>}
   */
  @Action('userInfo:init')
  init(state, customer) {
    return state.set('customer', fromJS(customer));
  }


  /**
   * 设置会员的企业信息
   * @param state
   * @param customer
   * @returns {Map<string, V>}
   */
  @Action('userInfo:initForm')
  initCustomerEnterprise(state, customer) {
    return state.set('form', fromJS(customer));
  }

  /**
   * 设置会员的企业信息
   * @param state
   * @param filed
   * @param value
   * @returns {Immutable.List<T> | Immutable.Map<K, V> | List<T> | Map<K, V> | __Cursor.Cursor | *}
   */
  @Action('userInfo:setCustomerInfo')
  setCustomerEnterprise(state, {filed, value}){
    return state.setIn(['form', filed], value);
  }

  /**
   * 上传附件
   */
  @Action('return: apply : addImage')
  addImage(state, image) {
    const images = state.get('images').filter((v) => (v!=''));
    return state.set('images', images.push(fromJS(image)))
      .setIn(['form', 'businessLicenseUrl'], image);
  }

  /**
   * 删除附件
   */
  @Action('return: apply : removeImage')
  removeImage(state, index) {
    return state.set('images', state.get('images').remove(index))
                .setIn(['form', 'businessLicenseUrl'], '');
  }
}
