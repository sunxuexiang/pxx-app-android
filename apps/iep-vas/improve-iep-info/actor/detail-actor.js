import { Actor, Action } from 'plume2';
import { fromJS } from 'immutable';

/**
 * Created by feitingting on 2017/7/17.
 */
export default class DetailActor extends Actor {
  defaultState() {
    return {
      minutes: 5,
      //审核状态,0表示正在审核中
      checked: 0,
      //添加一个用户名，用来决定提示信息（注册时候未填写，state=0，name为空）
      initialName: '',
      customerDetail: {
        customerId: '',
        customerName: '',
        provinceId: '',
        cityId: '',
        areaId: '',
        customerAddress: '',
        contactName: '',
        contactPhone: '',
        //审核未通过原因
        rejectReason: ''
      },
      //是否购买了企业购服务 默认为false
      iepFlag:false,
      //显示企业注册
      showEnterprise:false,
      showImproveInfo: false,
      showEnterpriseMoreInfo:false,
      enterpriseCheckState:'',
      enterpriseCheckTip:'',
      enterpriseButtonFlag:true,
      //显示企业用户注册协议
      showEnterpriseAgreement: false,

      images:[],

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
      openFlag:1, //是否开启社交分销,0:否，1：是
    };
  }

  /**
   * 客户详情
   * @param state
   * @param res
   * @returns {any}
   */
  @Action('detail:customer')
  customerDetail(state, res) {
    return state
      .update('customerDetail', customerDetail => customerDetail.merge(res))
      .set('initialName', res.customerName)
      .set('rejectReason', res.rejectReason);
  }

  @Action('detail:customerId')
  customerId(state, id) {
    return state.setIn(['customerDetail', 'customerId'], id);
  }

  /**
   * 是否已完善账户信息
   * @param state
   * @param complete
   */
  @Action('detail:complete')
  complete(state, complete) {
    return state.set('complete', complete);
  }

  /**
   * 是否正确完善账户信息(是否通过审核或者是否提交成功)
   * @param state
   * @param result
   */
  @Action('detail:result')
  result(state, result) {
    return state.set('result', result);
  }

  /**
   * 初始倒计时，5
   * @param state
   * @param time
   */
  @Action('detail:time')
  time(state, time) {
    return state.set('minutes', time);
  }

  /**
   * 获取省市区
   * @param state
   * @param area
   * @returns {any}
   */
  @Action('detail:area')
  getArea(state, area) {
    const [provinceId, cityId, areaId] = area;
    return state
      .setIn(['customerDetail', 'provinceId'], provinceId)
      .setIn(['customerDetail', 'cityId'], cityId)
      .setIn(['customerDetail', 'areaId'], areaId);
  }

  /**
   * 监听公司名称状态值
   * @param state
   * @param name
   * @returns {any}
   */
  @Action('detail:companyName')
  getCompanyName(state, name) {
    return state.setIn(['customerDetail', 'customerName'], name);
  }

  /**
   * 监听地址状态值
   * @param state
   * @param address
   * @returns {any}
   */
  @Action('detail:address')
  getAddress(state, address) {
    return state.setIn(['customerDetail', 'customerAddress'], address);
  }

  /**
   * 联系人状态值
   * @param state
   * @param contact
   * @returns {any}
   */
  @Action('detail:contact')
  getContact(state, contact) {
    return state.setIn(['customerDetail', 'contactName'], contact);
  }

  /**
   * 联系人电话状态值
   * @param state
   * @param tel
   * @returns {any}
   */
  @Action('detail:contactTel')
  getContactTel(state, tel) {
    return state.setIn(['customerDetail', 'contactPhone'], tel);
  }

  @Action('detail:checked')
  checked(state, checked) {
    return state.set('checked', checked);
  }

  @Action('detail:initialName')
  initialName(state, name) {
    return state.set('initialName', name);
  }

  @Action('field:value')
  setFieldValue(state, { field, value }) {
    return state.set(field, value);
  }

  /**
   * 设置是否显示企业购服务
   */
  @Action('enterprise:iepFlag')
  setWxFlag(state, flag) {
    return state.set('iepFlag', flag);
  }

  @Action('loginModal:initPage')
  initPage(state) {
    return state.set('showEnterprise',false);
  }

  @Action('loginModal:toggleEnterprise')
  toggleEnterprise(state) {
    return state.set('showEnterprise', !state.get('showEnterprise'));
  }

  @Action('loginModal:showEnterpriseMoreInfo')
  showEnterpriseMoreInfo(state) {
    return state.set('showEnterpriseMoreInfo', !state.get('showEnterpriseMoreInfo'));
  }

  //控制部分显示框的值变化
  @Action('field:loginActorValue')
  setLoginActorFieldValue(state, { field, value }) {
    return state.set(field, value);
  }

  @Action('loginModal:toggleShowEnterpriseAgreement')
  toggleShowEnterpriseAgreement(state) {
    return state.set('showEnterpriseAgreement', !state.get('showEnterpriseAgreement'));
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
    return state.set('images', fromJS([image]));
  }

  /**
   * 删除附件
   */
  @Action('enterprise: apply : removeImage')
  removeImage(state, index) {
    state = state.setIn(['enterpriseInfoVO', 'businessLicenseUrl'], '');
    return state.set('images', state.get('images').remove(index));
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
}
