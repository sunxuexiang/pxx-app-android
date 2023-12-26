/**
 * Created by feitingting on 2017/7/17.
 */
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Store, msg } from 'plume2';

import * as WMkit from 'wmkit/kit';
import { cache } from 'wmkit/cache';
import * as _ from 'wmkit/common/util';
import ValidConst from 'wmkit/validate';

import DetailActor from './actor/detail-actor';
import * as webapi from './webapi';
import { fromJS } from 'immutable';
import { mergePurchase } from '../../../wmkit/biz';

/**校验名称和联系人*/
function _testName(name) {
  if (name == '') {
    msg.emit('app:tip', '请填写名称');
    return false;
  } else if (name.length < 2 || name.length > 15) {
    msg.emit('app:tip', '名称为2-15个字符');
    return false;
  }
  return true;
}

function _testContact(contact) {
  if (contact == '') {
    msg.emit('app:tip', '请填写常用联系人');
    return false;
  } else if (contact.length < 2 || contact.length > 15) {
    msg.emit('app:tip', '联系人名称为2-15个字符');
    return false;
  }
  return true;
}

/**校验地址详情*/
function _testAddress(address) {
  if (address == '') {
    msg.emit('app:tip', '请填写详细地址');
    return false;
  } else if (address.length < 5 || address.length > 60) {
    msg.emit('app:tip', '地址长度为5-60个字符');
    return false;
  }
  return true;
}

function _testEnterpriseName(name){
  if (name.trim() === '') {
    msg.emit('app:tip', '请填写公司名称！');
    return false;
  } else if (name.trim().length < 2 || name.trim().length > 60) {
    msg.emit('app:tip', '公司名称为2-60个字符！');
    return false;
  }else if (!ValidConst.companyName.test(name)){
    msg.emit('app:tip', '公司名称仅支持中文、英文、数字及“_”、“-”、()、（）');
    return false;
  }
  return true;
}

function _testSocialCreditCode(code) {
  if (code.trim() === '') {
    msg.emit('app:tip', '请填写统一社会信用代码！');
    return false;
  } else if (code.trim().length < 8 || code.trim().length > 30) {
    msg.emit('app:tip', '统一社会信用代码为8-30个字符！');
    return false;
  }else if (!ValidConst.enterpriseSocialCreditCode.test(code)){
    msg.emit('app:tip', '统一社会信用代码仅支持大写英文和数字！');
    return false;
  }
  return true;
}

function _testBusinessLicenseUrl(url) {
  if (url === '') {
    msg.emit('app:tip', '请上传营业执照！');
    return false;
  }
  return true;
}

function _testInviteInfo(inviteCode,registerLimitType,openFlag) {
  //分销开启、设置邀请码必填时
  if (openFlag && registerLimitType === 1) {
    if (inviteCode.trim() === '') {
      msg.emit('app:tip', '请填写邀请码！');
      return false;
    }
    if (inviteCode.trim().length > 8) {
      msg.emit('app:tip', '请填写正确的邀请码！');
      return false;
    }
    return true;
  }

  if (openFlag && registerLimitType !== 1) {
    if (inviteCode.trim().length > 8) {
      msg.emit('app:tip', '请填写正确的邀请码！');
      return false;
    }
    return true;
  }
  return false;
}

function  _testBusinessNatureType(businessNatureType) {
  if (businessNatureType === ''){
    msg.emit('app:tip', '请选择公司性质！');
    return false;
  }
  return true;
}



export default class AppStore extends Store {
  bindActor() {
    return [new DetailActor()];
  }

  /**
   * 初始化，查询会员基本信息
   * @returns {Promise<void>}
   */
  init = async (id) => {
    const {code ,context} = await webapi.getCustomerInfo(id);
    console.log('con=====>'+JSON.stringify(context));
    if (code === config.SUCCESS_CODE){
      this.switchEnterpriseLogin(context);
      this.dispatch('detail:customerId', id);
    }
  };

  /**
   * 完善信息
   * @returns {Promise.<boolean>}
   */
  doPerfect = async () => {
    const customer = this.state()
      .get('customerDetail')
      .toJS();
    /**先校验必填项*/
    if (
      _testName(customer.customerName) &&
      _testContact(customer.contactName) &&
      WMkit.testTel(customer.contactPhone)
    ) {
      //不为空，且不是不限
      if (customer.provinceId) {
        if (!_testAddress(customer.customerAddress)) {
          return false;
        }
      }
      if (customer.customerAddress != '') {
        //未选择省份或者选择不限时，都视为未选择
        if (customer.provinceId == '' || customer.provinceId == null) {
          msg.emit('app:tip', '请选择所在地区');
          return false;
        }
      }
      const { code, message, context } = await webapi.doPerfect(customer);
      if (code == 'K-000000') {
        //清除缓存
        AsyncStorage.removeItem(cache.PENDING_AND_REFUSED);
        //是否直接可以登录 0 否 1 是
        if (!context.isLoginFlag) {
          msg.emit('app:tip', '提交成功，将会尽快为您审核');
          msg.emit('router: replace', {
            routeName: 'ImproveResult'
          });
          _.showRegisterModel(context.couponResponse, false);
        } else {
          //直接跳转到主页
          AsyncStorage.setItem(cache.LOGIN_DATA, JSON.stringify(context));
          window.token = context.token;
          msg.emit('app:tip', '登录成功');
          msg.emit('router: goToNext', { routeName: 'Main' });
          _.showRegisterModel(context.couponResponse, true);
        }
      } else {
        msg.emit('app:tip', message);
        return false;
      }
    }
  };

  /**
   * 倒计时每次事件减1秒
   */
  setTime = () => {
    const time = this.state().get('minutes');
    this.dispatch('detail:time', time - 1);
  };

  getCompanyName = (name) => {
    this.dispatch('detail:companyName', name);
  };

  getAddressDetail = (address) => {
    this.dispatch('detail:address', address);
  };

  getContact = (contact) => {
    this.dispatch('detail:contact', contact);
  };

  getContactTel = (tel) => {
    this.dispatch('detail:contactTel', tel);
  };

  getArea = (value) => {
    this.dispatch('detail:area', value);
  };

  toggleEnterprise = () => {
    this.dispatch('loginModal:toggleEnterprise');
  };

  //切换注册协议登录显示
  toggleShowAgreement = () => {
    this.dispatch('loginModal:toggleShowAgreement');
  };

  //切换企业用户注册协议登录显示
  toggleShowEnterpriseAgreement = () => {
    this.dispatch('loginModal:toggleShowEnterpriseAgreement');
  };

  //切换
  toggleBackEnterprise = () => {
    this.dispatch('modal:clear:register');
    this.dispatch('loginModal:showEnterpriseMoreInfo');
  };

  //改变指定的state值
  setEnterpriseFieldValue = ({ field, value }) => {
    if (field === 'businessNatureType') {
      value = Number(value[0]);
    }
    this.dispatch('field:setEnterpriseFieldValue', { field, value });
  };


  /**完善企业用户信息*/
  doEnterpriseSubmit = async () => {

    const enterpriseInfoVO = this.state().get('enterpriseInfoVO').toJS();
    let registerInfo = JSON.parse(await AsyncStorage.getItem(cache.REGISTER_INFO));
    if (registerInfo == null){
      registerInfo = {
        customerAccount:'1',
        customerPassword:'1',
        verifyCode:'1'
      };
    }
    const registerLimitType = this.state().get('registerLimitType');
    const openFlag =  this.state().get('openFlag');

    /**先校验必填项*/
    if (
      _testBusinessNatureType(enterpriseInfoVO.businessNatureType) &&
      _testEnterpriseName(enterpriseInfoVO.enterpriseName) &&
      _testSocialCreditCode(enterpriseInfoVO.socialCreditCode) &&
      _testBusinessLicenseUrl(enterpriseInfoVO.businessLicenseUrl) &&
      _testInviteInfo(enterpriseInfoVO.inviteCode,registerLimitType,openFlag)
    ) {

      const customerDetail =  this.state().get('customerDetail').toJS();
      const { code, message, context } = await webapi.doRegisterEnterprise({
        customerId:customerDetail.customerId,
        firstRegisterFlag:false,
        customerAccount:(registerInfo.customerAccount),
        customerPassword:(registerInfo.customerPassword),
        verifyCode:(registerInfo.verifyCode),
        inviteCode:enterpriseInfoVO.inviteCode,
        businessNatureType:enterpriseInfoVO.businessNatureType,
        enterpriseName:enterpriseInfoVO.enterpriseName,
        socialCreditCode:enterpriseInfoVO.socialCreditCode,
        businessLicenseUrl:enterpriseInfoVO.businessLicenseUrl
      });
      if (code === config.SUCCESS_CODE) {
        //清空企业用户注册信息
        this.removeEnterpriseInfo();
        //是否直接可以登录 0 否 1 是
        const enterpriseCustomerAuditFlag = fromJS(await VAS.fetchIepInfo()).getIn(['iepInfo', 'enterpriseCustomerAuditFlag']);
        if (enterpriseCustomerAuditFlag === 1) {
          msg.emit('app:tip', '提交成功，将会尽快给您审核！');
          //弹框关闭
          this.dispatch('loginModal:toggleVisible', {
            visible: false,
            callBack: null
          });
          _.showRegisterModel(context.couponResponse, false);
        } else {
          // a.设置登陆后token以及登陆信息缓存
          window.token = context.token;
          AsyncStorage.setItem(cache.LOGIN_DATA, JSON.stringify(context));
          // b.登陆成功,需要合并登录前和登陆后的购物车,传入回调函数
          mergePurchase(this.state().get('callBack'));
          // c.登陆成功,关闭弹框
          msg.emit('app:tip', '登录成功!');
          //关闭弹框
          this.dispatch('loginModal:toggleVisible', {
            visible: false,
            callBack: null
          });
          _.showRegisterModel(context.couponResponse, true);
        }
        msg.emit('router: goToNext', { routeName: 'UserCenter' });
      } else {

        msg.emit('app:tip', message);
        return false;
      }
    }
  };

  //清空企业用户注册信息
  removeEnterpriseInfo = () =>{
    this.dispatch('field:value',{ field: 'enterpriseInfoVO', value: fromJS({})});
    this.dispatch('field:value',{ field: 'images', value: fromJS({})});
    this.dispatch(
      'field:loginActorValue',
      { field: 'enterpriseCheckState', value: ''}
    );
    //赋值会员信息
    this.dispatch('field:value',{ field: 'enterpriseInfoVO', value: fromJS({})});
    this.dispatch('enterprise: apply : removeImage', 0);
    this.dispatch('field:loginActorValue', { field: 'enterpriseCheckTip', value: ''});
    this.dispatch('field:loginActorValue', { field: 'enterpriseButtonFlag', value: true});
  };


  //切换
  toggleBackLogin = () => {
    this.transaction(() => {
      this.dispatch('modal:clear:register');
      this.dispatch('modal:clear:info');
      this.dispatch('field:loginActorValue', { field: 'showLogin', value: true });
      this.dispatch('field:loginActorValue', { field: 'showEnterprise', value: false });
      this.dispatch('field:loginActorValue', { field: 'showImproveInfo', value: false });
      this.dispatch('field:loginActorValue', { field: 'showEnterpriseMoreInfo', value: false });
      this.dispatch(
        'field:loginActorValue',
        { field: 'enterpriseCheckState', value: ''}
      );
      //赋值会员信息
      this.dispatch('field:value',{ field: 'enterpriseInfoVO', value: fromJS({})});
      this.dispatch('enterprise: apply : removeImage', 0);
      this.dispatch('field:loginActorValue', { field: 'enterpriseCheckTip', value: ''});
      this.dispatch('field:loginActorValue', { field: 'enterpriseButtonFlag', value: true});
    });
  };

  /**
   * 上传附件
   */
  addImage = (image) => {
    this.dispatch('field:setEnterpriseFieldValue', { field:'businessLicenseUrl', value:image });
    this.dispatch('enterprise: apply : addImage', image);
  };

  /**
   * 删除附件
   */

  removeImage = (index) => {
    this.dispatch('field:setEnterpriseFieldValue', { field:'businessLicenseUrl', value:'' });
    this.dispatch('enterprise: apply : removeImage', index);
  };

  /**
   * 登录时初始化企业购会员信息
   * @param context
   */
  switchEnterpriseLogin = (context) =>{

    this.transaction(() => {
      this.dispatch('change:customerDetailField', { field: 'customerId', value: context.customerId});
      this.dispatch('field:loginActorValue', { field: 'showLogin', value: false });
      this.dispatch('field:loginActorValue', { field: 'showEnterprise', value: true });
      this.dispatch('field:loginActorValue', { field: 'showImproveInfo', value: false });
      this.dispatch('field:loginActorValue', { field: 'showEnterpriseMoreInfo', value: true });
      this.dispatch(
        'field:loginActorValue',
        { field: 'enterpriseCheckState', value: context.enterpriseCheckState}
      );
      //赋值会员信息
      this.dispatch('field:value',{ field: 'enterpriseInfoVO', value: fromJS(context.enterpriseInfoVO)});
      this.dispatch('enterprise: apply : removeImage', 0);
      this.dispatch('enterprise: apply : addImage', context.enterpriseInfoVO.businessLicenseUrl);
      this.dispatch('field:setEnterpriseFieldValue', { field:'businessLicenseUrl', value:context.enterpriseInfoVO.businessLicenseUrl });

    });
    this.dispatch('field:setEnterpriseFieldValue', { field:'inviteCode', value:context.inviteCode });


    switch (context.enterpriseCheckState) {
      //待审核中 tip初始化  页面置灰   customer信息赋值  注册按钮隐藏
      case 1:
        this.dispatch('field:loginActorValue', { field: 'enterpriseCheckTip', value: ''});
        this.dispatch('field:loginActorValue', { field: 'enterpriseButtonFlag', value: false});
        break;
      //审核不通过 走重新提交流程  tip初始化  customer赋值 reason 赋值
      case 3:
        this.dispatch('field:loginActorValue', { field: 'enterpriseCheckTip', value: context.enterpriseCheckReason});
        this.dispatch('field:loginActorValue', { field: 'enterpriseButtonFlag', value: true});
        break;
      case 2:
        // 上传友盟设备devlceToken
        AsyncStorage.getItem('sbc@deviceToken').then((token)=>{
          webapi.addToken({devlceToken: token, platform: Platform.OS === 'ios'? 0 : 1});
        });
        // a.设置登陆后token以及登陆信息缓存
        window.token = context.token;
        AsyncStorage.setItem(cache.LOGIN_DATA, JSON.stringify(context));
        msg.emit('app:tip', '登录成功');
        WMkit.setIsDistributor();
        // b.登陆成功,需要合并登录前和登陆后的购物车
        mergePurchase(this.state().get('callBack'));
        //弹框关闭
        this.dispatch('loginModal:toggleVisible', {
          visible: false,
          callBack: null
        });
        break;
    }
  };
}
