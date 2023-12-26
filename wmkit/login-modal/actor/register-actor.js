import { Actor, Action } from 'plume2';
import { fromJS } from 'immutable';
export default class RegisterActor extends Actor {
  defaultState() {
    return {
      //注册密码
      registerPass: '',
      //注册验证码
      registerCode: '',
      //注册账号
      registerAccount: '',
      //注册时是否显示密码
      showRegisterPass: false,
      //显示完善账户信息
      showAgreement: false,
      //显示企业用户注册协议
      showEnterpriseAgreement: false,
      //显示隐私政策弹窗
      toggleShowPrivacyPolicyAgreement: false,
      //切换用户注册协议
      showUserRegistrationAgreement:false,
      images:[

      ],
      enterpriseInfoVO:{
        enterpriseId:'',
        enterpriseName:'',
        socialCreditCode:'',
        businessNatureType:'',
        businessIndustryType:'',
        businessLicenseUrl:'',
        inviteCode:''
      },
      registerLimitType: 0, //注册限制，0：不限，1：邀请码
      openFlag:0, //是否开启社交分销,0:否，1：是

      customerEnterprise:{
        customerId:'',
        customerRegisterType: 0,
        enterpriseName:'',
        socialCreditCode:'',
        businessLicenseUrl:'',
        customerTag:0,
        enterpriseStatusXyy:0,
        employeeCode: ''
      }
    };
  }

  @Action('field:value')
  setFieldValue(state, { field, value }) {
    return state.set(field, value);
  }

  @Action('loginModal:toggleShowAgreement')
  toggleShowAgreement(state) {
    return state.set('showAgreement', !state.get('showAgreement'));
  }

  @Action('loginModal:toggleShowPrivacyPolicyAgreement')
  toggleShowPrivacyPolicyAgreement(state) {
    return state.set('showPrivacyPolicyAgreement', !state.get('showPrivacyPolicyAgreement'));
  }

  @Action('loginModal:toggleShowEnterpriseAgreement')
  toggleShowEnterpriseAgreement(state) {
    return state.set('showEnterpriseAgreement', !state.get('showEnterpriseAgreement'));
  }

  @Action('loginModal:userRegistrationAgreement')
  userRegistrationAgreement(state){
    return state.set('showUserRegistrationAgreement',!state.get('showUserRegistrationAgreement'))
  }

  @Action('field:setEnterpriseFieldValue')
  setEnterpriseFieldValue(state, { field, value }) {
    return state.setIn(['enterpriseInfoVO', field], value);
  }

  /**
   * 上传附件
   */
  @Action('enterprise: apply : addImage')
  addImage(state, image) {
    return state.set('images', fromJS([image]))
      .setIn(['customerEnterprise', 'businessLicenseUrl'], image);
  }

  /**
   * 删除附件
   */
  @Action('enterprise: apply : removeImage')
  removeImage(state, index) {
    return state.set('images', state.get('images').remove(index))
      .setIn(['customerEnterprise', 'businessLicenseUrl'], '');
  }

  @Action('enterprise: registerType : init')
  registerType(state) {
    return state.setIn(['customerEnterprise', 'customerRegisterType'], 0);
  }

  @Action('modal:clear:register')
  clearRegister(state) {
    return state
      .set('registerAccount', '')
      .set('registerPass', '')
      .set('registerCode', '')
      .set('showRegisterPass', false)
      .set('showAgreement', false);
  }

  /**
   * 注册限制，0：不限，1：邀请码
   * @param state
   * @param reisterLimitType
   */
  @Action('set:registerLimitType')
  setRegisterLimitType(state, data) {
    return state.set('registerLimitType', fromJS(data).get('registerLimitType')).set('openFlag', fromJS(data).get('openFlag'));
  }

  /**
   * 设置会员的企业信息
   * @param state
   * @param customer
   * @returns {Map<string, V>}
   */
  @Action('customer:initCustomerEnterprise')
  initCustomerEnterprise(state, customer) {
    return state.set('customerEnterprise', fromJS(customer));
  }

  /**
   * 设置会员的企业信息
   * @param state
   * @param filed
   * @param value
   * @returns {Immutable.List<T> | Immutable.Map<K, V> | List<T> | Map<K, V> | __Cursor.Cursor | *}
   */
  @Action('userInfo:setCustomerEnterprise')
  setCustomerEnterprise(state, {filed, value}){
    return state.setIn(['customerEnterprise', filed], value);
  }
}
