/**
 * Created by hht on 2017/9/4.
 */

import { Store, msg } from 'plume2';
import AsyncStorage from '@react-native-community/async-storage';
import { config, cache, ValidConst } from 'wmkit';

import * as webapi from './webapi';
import EnterPriseActor from './actor/enter-prise-actor';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  bindActor() {
    return [new EnterPriseActor()];
  }

  setData = (field, value) => {
    this.dispatch('set:state', { field, value });
  };

  /**
   * 企业会员认证的数据初始化
   */
  init = async () => {
    const { context, code, message } = await webapi.fetchCustomerInfo();
    if (code == config.SUCCESS_CODE) {
      this.dispatch('userInfo:init', context);
      this.dispatch('userInfo:initForm',context);
      if(!context.customerRegisterType){
        this.setFormInfo({ filed:'customerRegisterType', value: 1})
      }
      this.dispatch('return: apply : removeImage',0);
      this.dispatch('return: apply : addImage',context.businessLicenseUrl ? context.businessLicenseUrl : '');
    } else {
      msg.emit('app:tip', message);
      //token过期或者校验错误,将token清除
      AsyncStorage.setItem(cache.LOGIN_DATA, '');
      window.token = '';
    }
  };

  /**
   * 修改表单
   * @param key
   * @param value
   */
  setFormInfo = ({filed,value}) => {
    this.dispatch('userInfo:setCustomerInfo',{filed,value});
  };


  /**
   * 修改会员的企业信息
   * @returns {Promise<void>}
   */
  modifyCustomerEnterprise = async () => {
    const form = this.state().get('form');
    const customerId = form.get('customerId');
    //校验信用代码
    const socialCreditCode = form.get('socialCreditCode');
    const enterpriseName = form.get('enterpriseName');
    const businessLicenseUrl = form.get('businessLicenseUrl');
    const customerRegisterType = form.get('customerRegisterType');
    //判空和条件校验
    if(!(
      this._testCustomerRegisterType(customerRegisterType) &&
      this._testEnterpriseName(enterpriseName) &&
      this._testSocialCreditCode(socialCreditCode)
      && this._testBusinessLicenseUrl(businessLicenseUrl)
      )){
      return;
    }
    //校验工单处理
    const { code, context } = await webapi.validateCustomerWorkOrder({customerId:customerId});
    if(code == config.SUCCESS_CODE){
      if(context.existFlag == true){
        msg.emit('app:tip', '您还在工单中，不可修改信息');
        return false;
      }
    }
    const res  = await webapi.modifyEnterpriseInfo(form);
    if(res.code == config.SUCCESS_CODE){
      msg.emit('app:tip', '提交成功');
      await this.init();
    }
  };

  /**
   * 上传附件
   */
  addImage = (image) => {
    this.dispatch('return: apply : addImage', image);
  };

  /**
   * 删除附件
   */
  removeImage = (index) => {
    this.dispatch('return: apply : removeImage', index);
  };

  isNull = ( str ) => {
    if ( str == "" ) return true;
    const regu = "^[ ]+$";
    const re = new RegExp(regu);
    return re.test(str);
  }

  _testEnterpriseName=(name)=> {
    if (this.isNull(name)) {
      msg.emit('app:tip', '请填写企业名称！');
      return false;
    }
    if (!this.isNull(name) && !ValidConst.xyyCompanyName.test(name)){
      msg.emit('app:tip', '请输入正确的企业名称');
      return false;
    }
    return true;
  };

  _testSocialCreditCode=(code)=> {
    if (this.isNull(code)) {
      msg.emit('app:tip', '请输入统一社会信用代码！');
      return false;
    }
    if (!this.isNull(code) && !ValidConst.enterpriseSocialCreditCode.test(code)){
      msg.emit('app:tip', '请输入正确统一社会信用代码！');
      return false;
    }
    return true;
  };

  _testBusinessLicenseUrl=(url)=> {
    if (url === '') {
      msg.emit('app:tip', '请上传营业执照！');
      return false;
    }
    return true;
  };

  _testCustomerRegisterType = (customerRegisterType) => {
    if(!customerRegisterType){
      msg.emit('app:tip', '请选择会员类型');
      return false;
    }
    return true;
  }

}
