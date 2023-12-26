import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { msg, Store } from 'plume2';
import * as _ from 'wmkit/common/util';
import { cache } from 'wmkit/cache';
import { config } from 'wmkit/config';
import * as thirdLogin from 'wmkit/third-login';
import ValidConst from 'wmkit/validate';
import * as WMkit from 'wmkit/kit';
import * as VAS from 'wmkit/vas';
import { fromJS } from 'immutable';
import { mergePurchase } from 'wmkit/biz/purchase-front';
import LoginActor from './actor/login-actor';
import RegisterActor from './actor/register-actor';
import InfoActor from './actor/info-actor';
import AgreeActor from './actor/agree-actor';
import EnterpriseActor from './actor/enterprise-actor';
import EnterpriseAgreeActor from './actor/enterprise-agree-actor';
import * as webapi from './webapi';

export default class AppStore extends Store {
  bindActor() {
    return [
      new LoginActor(),
      new RegisterActor(),
      new InfoActor(),
      new AgreeActor(),
      new EnterpriseActor(),
      new EnterpriseAgreeActor()
    ];
  }

  constructor(props) {
    super(props);
    //debug
    window._store = this;
  }

  /**校验名称和联系人*/
  _testName = (name) => {
    if (name === '') {
      msg.emit('app:tip', '请填写名称！');
      return false;
    } else if (name.length < 2 || name.length > 15) {
      msg.emit('app:tip', '名称为2-15个字符！');
      return false;
    }
    return true;
  };

  _testContact = (contact) => {
    if (contact === '') {
      msg.emit('app:tip', '请填写常用联系人！');
      return false;
    } else if (contact.length < 2 || contact.length > 15) {
      msg.emit('app:tip', '联系人名称为2-15个字符！');
      return false;
    }
    return true;
  };

  /**校验地址详情*/
  _testAddress = (address) => {
    if (address === '') {
      msg.emit('app:tip', '请填写详细地址！');
      return false;
    } else if (address.length < 5 || address.length > 60) {
      msg.emit('app:tip', '地址长度为5-60个字符！');
      return false;
    }
    return true;
  };

  /**校验手机号码*/
  _testTel = (tel) => {
    const regex = ValidConst.phone;
    if (tel === '') {
      msg.emit('app:tip', '请填写联系人手机号！');
      return false;
    } else if (!regex.test(tel)) {
      msg.emit('app:tip', '无效的手机号！');
      return false;
    } else {
      return true;
    }
  };

  _testEnterpriseName = (name) => {
    if (name.trim() === '') {
      msg.emit('app:tip', '请填写公司名称！');
      return false;
    } else if (name.trim().length < 2 || name.trim().length > 60) {
      msg.emit('app:tip', '公司名称为2-60个字符！');
      return false;
    } else if (!ValidConst.companyName.test(name)) {
      msg.emit('app:tip', '公司名称仅支持中文、英文、数字及“_”、“-”、()、（）');
      return false;
    }
    return true;
  };

  _testSocialCreditCode = (code) => {
    if (code.trim() === '') {
      msg.emit('app:tip', '请填写统一社会信用代码！');
      return false;
    } else if (code.trim().length < 8 || code.trim().length > 30) {
      msg.emit('app:tip', '统一社会信用代码为8-30个字符！');
      return false;
    } else if (!ValidConst.enterpriseSocialCreditCode.test(code)) {
      msg.emit('app:tip', '统一社会信用代码仅支持大写英文和数字！');
      return false;
    }
    return true;
  };

  _testBusinessLicenseUrl = (url) => {
    if (url === '') {
      msg.emit('app:tip', '请上传营业执照！');
      return false;
    }
    return true;
  };

  _testInviteInfo(inviteCode, registerLimitType, openFlag) {
    //分销未开启
    if (!openFlag) {
      return true;
    }
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

  _testBusinessNatureType = (businessNatureType) => {
    if (businessNatureType === '') {
      msg.emit('app:tip', '请选择公司性质！');
      return false;
    }
    return true;
  };

  init = async () => {
    // 1.获取pc logo
    webapi
      .fetchBaseConfig()
      .then((res) => {
        const { code, context } = res;
        if (code == config.SUCCESS_CODE) {
          this.dispatch(
            'login:init',
            context.pcLogo
              ? JSON.parse(context.pcLogo)[0]
              : {
                  url: ''
                }
          );
        }
      })
      .catch((res) => {
        const { message } = res;
        msg.emit('app:tip', message);
      });

    // 2.获取授权登录状态
    webapi.fetchWxLoginStatus().then((res) => {
      const { code, context } = res;
      if (code === config.SUCCESS_CODE) {
        this.dispatch('login:wxFlag', context);
      }
    });
    // 初始化基本信息和微信授权登录开关
    const res = await Promise.all([
      webapi.fetchBaseConfig(),
      webapi.fetchWxLoginStatus(),
      await VAS.checkIepAuth()
    ]);
    if (
      res[0].code == config.SUCCESS_CODE &&
      res[1].code == config.SUCCESS_CODE
    ) {
      this.dispatch(
        'login:init',
        res[0].context.pcLogo
          ? JSON.parse(res[0].context.pcLogo)[0]
          : {
              url: ''
            }
      );
      // 注册协议
      this.dispatch('agree:registerContent', res[0].context);
      this.dispatch('login:wxFlag', res[1].context);
      //设置企业购信息
      this.dispatch('enterprise:iepFlag', res[2]);
      //初始化企业注册协议
      if (res[2]) {
        this.dispatch(
          'agree:registerEnterpriseContent',
          fromJS(await VAS.fetchIepInfo()).getIn([
            'iepInfo',
            'enterpriseCustomerRegisterContent'
          ])
        );
      }
    }

    const { code, context } = await webapi.getRegisterLimitType();
    if (code == config.SUCCESS_CODE) {
      this.dispatch('set:registerLimitType', context);
    }
  };

  showPass = () => {
    const showpass = this.state().get('isShowpwd');
    this.dispatch('login:showPass', showpass);
  };

  doLogin = async () => {
    // true：账号密码登录  false：验证码登录
    const isALogin = this.state().get('isALogin');
    let result = null;
    if (isALogin) {
      /**获取用户名和密码，并去除所有空格*/
      const account = this.state().get('account').trim();
      const password = this.state().get('password').trim();
      if (WMkit.testTel(account) && WMkit.testPass(password)) {
        const base64 = new WMkit.Base64();
        let encaccount = base64.urlEncode(account);
        let encpass = base64.urlEncode(password);
        const res = await webapi.login(encaccount, encpass);
        result = res;
      } else {
        return null;
      }
    } else {
      /**获取用户名和验证码，并去除所有空格*/
      const account = this.state().get('account').trim();
      const verificationCode = this.state().get('verificationCode').trim();
      if (
        WMkit.testTel(account) &&
        WMkit.testVerificationCode(verificationCode)
      ) {
        const res = await webapi.loginWithVerificationCode(
          account,
          verificationCode
        );
        result = res;
      } else {
        return null;
      }
    }
    const { context } = result;
    if (result.code == config.SUCCESS_CODE) {
      this.switchLogin(context);
      // msg.emit('purchase:refresh');
    } else if (result.code == 'K-010004') {
      //密码输错5次，按钮设灰色
      this.transaction(() => {
        this.dispatch('login:buttonstate');
        this.dispatch('login:buttonvalue', result.message);
      });
      msg.emit('app:tip', result.message);
      return;
    } else {
      msg.emit('app:tip', result.message);
      return;
    }
  };

  setAccount = (account) => {
    this.transaction(() => {
      //登录按钮恢复可点击状态
      this.dispatch('login:enableButton');
      this.dispatch('login:account', account);
      this.dispatch('login:accountChange', this.state().get('accountChange'));
    });
  };

  setPressError = (errorPress) => {
    this.dispatch('login:errorPress', errorPress);
  };

  setPassword = (pass) => {
    this.dispatch('login:password', pass);
  };

  /**
   * 输入验证码
   * @param code
   */
  setVerificationCode = (code) => {
    this.dispatch('login:verificationCode', code);
  };

  /**忘记密码*/
  forgetPass = () => {
    //清除token
    WMkit.logout();
    msg.emit('router: goToNext', {
      routeName: 'UserPassword'
    });
    this.toggleVisible({
      visible: false,
      callBack: null
    });
  };

  /*切换登录方式*/
  loginChange = () => {
    this.dispatch('login:loginChange');
  };

  /**
   * 发送验证码给手机号码
   * @returns {Promise<Result<ReturnResult>>}
   */
  sendCode = (mobile) => {
    //登录发送验证码还是注册发送验证码
    const showLogin = this.state().get('showLogin');
    return webapi.sendCode(mobile, showLogin).then((res) => {
      if (res.code === config.SUCCESS_CODE) {
        msg.emit('app:tip', '验证码已发送，请注意查收！');
      } else {
        msg.emit('app:tip', res.message);
        return Promise.reject(res.message);
      }
    });
  };

  /**
   * 发送验证码给手机号码
   * @returns {Promise<Result<ReturnResult>>}
   */
  sendEnterpriseRegisterCode = (mobile) => {
    return webapi
      .sendEnterpriseRegisterCode(mobile, '990090-998', '')
      .then((res) => {
        if (res.code === config.SUCCESS_CODE) {
          msg.emit('app:tip', '验证码已发送，请注意查收！');
        } else {
          msg.emit('app:tip', res.message);
          return Promise.reject(res.message);
        }
      });
  };

  //弹框显示隐藏
  toggleVisible = ({ visible, callBack }) => {
    this.dispatch('loginModal:toggleVisible', {
      visible,
      callBack
    });
  };

  toggleLogin = () => {
    this.dispatch('loginModal:toggleLogin');
  };

  //改变指定的state值
  setFieldValue = ({ field, value }) => {
    this.dispatch('field:value', {
      field,
      value
    });
  };

  doRegister1 = () => {
    msg.emit('router: goToNext', {
      routeName: 'InviteCode'
    });

    this.toggleVisible({
      visible: false,
      callBack: null
    });
  };

  //注册
  doRegister = async () => {
    //参数准备
    const mobile = this.state().get('registerAccount');
    const sendCode = this.state().get('registerCode');
    const password = this.state().get('registerPass');
    const employeeId = this.state().get('employeeId');
    const customerEnterprise = this.state().get('customerEnterprise');
    const socialCreditCode = customerEnterprise.get('socialCreditCode');
    const enterpriseName = customerEnterprise.get('enterpriseName');
    const employeeCode = customerEnterprise.get('employeeCode');
    if (
      WMkit.testTel(mobile) &&
      WMkit.testPass(password) &&
      WMkit.testVerificationCode(sendCode) /*&&
      this._testEnterpriseName(enterpriseName) &&
      this._testSocialCreditCode(socialCreditCode)*/
    ) {

      //1. 验证推荐业务员
      if(employeeCode){
        const { code ,context } = await webapi.validateEmployeeExist(employeeCode);
        if(code == config.SUCCESS_CODE){
          if(!context.exists){
            msg.emit('app:tip', '该业务员不存在！');
            return false;
          }
        }
      }

      const fromPage = 1;
      const { code, message } = await webapi.checkRegister(
        mobile,
        sendCode,
        fromPage
      );
      if (code == config.SUCCESS_CODE) {
        const registerInfo = {
          customerAccount: mobile,
          customerPassword: password,
          verifyCode: sendCode,
          fromPage: fromPage //0:注册页面，1：注册弹窗
        };
        window.registerInfo = registerInfo;
        this.dispatch('loginModal:toggleVisible', {
          visible: false,
          callBack: null
        });
        msg.emit('router: goToNext', {
          routeName: 'InviteCode'
        });
        return true;
      } else {
        msg.emit('app:tip', message);
      }

    } else {
      return false;
    }
  };

  //注册
  doEnterpriseRegister = async () => {
    //清空企业用户注册信息
    this.removeEnterpriseInfo();

    //参数准备
    const mobile = this.state().get('registerAccount');
    const sendCode = this.state().get('registerCode');
    const password = this.state().get('registerPass');
    const employeeId = this.state().get('employeeId');
    const shareUserId = '';
    const inviteeId = '';
    if (
      WMkit.testTel(mobile) &&
      WMkit.testPass(password) &&
      WMkit.testVerificationCode(sendCode)
    ) {
      const fromPage = 1;

      const registerInfo = {
        customerAccount: mobile,
        customerPassword: password,
        verifyCode: sendCode,
        inviteeId: inviteeId,
        shareUserId: shareUserId,
        fromPage: fromPage //0:注册页面，1：注册弹窗
      };

      //调用首次注册接口
      const { code, message } = await webapi.doRegisterEnterprise({
        firstRegisterFlag: true,
        customerAccount: registerInfo.customerAccount,
        customerPassword: registerInfo.customerPassword,
        verifyCode: registerInfo.verifyCode
      });
      if (code === config.SUCCESS_CODE) {
        AsyncStorage.setItem(cache.REGISTER_INFO, JSON.stringify(registerInfo));
        this.dispatch('loginModal:showEnterpriseMoreInfo');
        return true;
      } else {
        msg.emit('app:tip', message);
      }
    } else {
      return false;
    }
  };

  //填写会员信息
  changeCustomerDetailField = ({ field, value }) => {
    this.dispatch('change:customerDetailField', {
      field,
      value
    });
  };

  getArea = (value) => {
    this.dispatch('detail:area', value);
  };

  /**完善账户信息*/
  doPerfect = async () => {
    const customer = this.state().get('customerDetail').toJS();
    /**先校验必填项*/
    if (
      this._testName(customer.customerName) &&
      this._testContact(customer.contactName) &&
      this._testTel(customer.contactPhone)
    ) {
      //不为空，且不是不限
      if (customer.provinceId) {
        if (!this._testAddress(customer.customerAddress)) {
          return false;
        }
      }
      if (customer.customerAddress !== '') {
        //未选择省份或者选择不限时，都视为未选择
        if (customer.provinceId === '' || customer.provinceId == null) {
          msg.emit('app:tip', '请选择所在地区！');
          return false;
        }
      }
      const { code, message, context } = await webapi.doPerfect(customer);
      if (code == config.SUCCESS_CODE) {
        //清除缓存
        AsyncStorage.removeItem(cache.PENDING_AND_REFUSED);
        //是否直接可以登录 0 否 1 是
        if (!context.isLoginFlag) {
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
      } else {
        msg.emit('app:tip', message);
        return false;
      }
    }
  };

  /**
   * 登录后的通用逻辑(账户存在的情况下)
   */
  switchLogin = (context) => {
    //企业会员登录
    if (context.customerDetail && context.enterpriseCheckState !== 0) {
      this.switchEnterpriseLogin(context);
    } else {
      //普通会员登录
      this.switchCommonLogin(context);
    }
  };

  switchCommonLogin = (context) => {
    const customerId = context.customerId;
    //登录成功时，获取审核状态
    switch (context.checkState) {
      //待审核
      case 0:
        WMkit.logout();
        //在完善信息开关打开的时候，且注册了以后没有完善账户信息
        if (!context.isLoginFlag && !context.customerDetail.customerName) {
          //存储customerId
          this.dispatch('change:customerDetailField', {
            field: 'customerId',
            value: context.customerId
          });
          //关闭登录弹框
          this.toggleLogin();
          //显示完善信息的弹框
          this.dispatch('show:showImproveInfo');
        } else {
          //将审核中的账户信息存入本地缓存
          AsyncStorage.setItem(
            cache.PENDING_AND_REFUSED,
            JSON.stringify(context)
          ).then(() => {
            //弹框关闭
            this.dispatch('loginModal:toggleVisible', {
              visible: false,
              callBack: null
            });
            //跳转至提交页面
            msg.emit('router: goToNext', {
              routeName: 'ImproveInformation',
              customerId
            });
          });
        }
        break;
      //审核通过，成功登录，跳转至主页
      case 1:
        // 上传友盟设备devlceToken
        AsyncStorage.getItem('sbc@deviceToken').then((token) => {
          webapi.addToken({
            devlceToken: token,
            platform: Platform.OS === 'ios' ? 0 : 1
          });
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
      //审核未通过
      default:
        WMkit.logout();
        //弹框关闭
        this.dispatch('loginModal:toggleVisible', {
          visible: false,
          callBack: null
        });
        //将审核未通过的账户信息存入本地缓存
        AsyncStorage.setItem(
          cache.PENDING_AND_REFUSED,
          JSON.stringify(context)
        ).then(() => {
          msg.emit('router: goToNext', {
            routeName: 'ImproveInformation',
            customerId
          });
        });
    }
  };
  /**
   * 登录时初始化企业购会员信息
   * @param context
   */
  switchEnterpriseLogin = (context) => {
    console.log('context9======' + JSON.stringify(context));
    console.log('context10======' + JSON.stringify(context.inviteCode));

    this.transaction(() => {
      this.dispatch('change:customerDetailField', {
        field: 'customerId',
        value: context.customerId
      });
      this.dispatch('field:loginActorValue', {
        field: 'showLogin',
        value: false
      });
      this.dispatch('field:loginActorValue', {
        field: 'showEnterprise',
        value: true
      });
      this.dispatch('field:loginActorValue', {
        field: 'showImproveInfo',
        value: false
      });
      this.dispatch('field:loginActorValue', {
        field: 'showEnterpriseMoreInfo',
        value: true
      });
      this.dispatch('field:loginActorValue', {
        field: 'enterpriseCheckState',
        value: context.enterpriseCheckState
      });
      //赋值会员信息
      this.dispatch('field:value', {
        field: 'enterpriseInfoVO',
        value: fromJS(context.enterpriseInfoVO)
      });
      this.dispatch('enterprise: apply : removeImage', 0);
      this.dispatch(
        'enterprise: apply : addImage',
        context.enterpriseInfoVO.businessLicenseUrl
      );
    });
    this.dispatch('field:setEnterpriseFieldValue', {
      field: 'inviteCode',
      value: context.inviteCode
    });

    switch (context.enterpriseCheckState) {
      //待审核中 tip初始化  页面置灰   customer信息赋值  注册按钮隐藏
      case 1:
        this.dispatch('field:loginActorValue', {
          field: 'enterpriseCheckTip',
          value: ''
        });
        this.dispatch('field:loginActorValue', {
          field: 'enterpriseButtonFlag',
          value: false
        });
        break;
      //审核不通过 走重新提交流程  tip初始化  customer赋值 reason 赋值
      case 3:
        this.dispatch('field:loginActorValue', {
          field: 'enterpriseCheckTip',
          value: context.enterpriseCheckReason
        });
        this.dispatch('field:loginActorValue', {
          field: 'enterpriseButtonFlag',
          value: true
        });
        break;
      case 2:
        // 上传友盟设备devlceToken
        AsyncStorage.getItem('sbc@deviceToken').then((token) => {
          webapi.addToken({
            devlceToken: token,
            platform: Platform.OS === 'ios' ? 0 : 1
          });
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

  //还原设置
  initPage = () => {
    this.dispatch('loginModal:initPage');
  };

  //切换注册协议登录显示
  toggleShowAgreement = () => {
    this.dispatch('loginModal:toggleShowAgreement');
  };

  //微信授权登录
  wxLogin = async () => {
    const { code, appId, appSecret } = await thirdLogin.wxLogin();
    const res = await webapi.wechatAuth({
      code,
      appId,
      appSecret
    });
    if (res.code == config.SUCCESS_CODE) {
      //弹框关闭
      this.dispatch('loginModal:toggleVisible', {
        visible: false,
        callBack: this.state().get('callBack')
      });
      const { loginFlag, login, info } = res.context;
      if (loginFlag) {
        // 1.微信已经关联了账户，走正常登录流程
        this.switchLogin(login);
      } else {
        // 2.微信还没有关联账户，跳填写手机号页
        msg.emit('router: goToNext', {
          routeName: 'WechatLogin',
          id: info.id
        });
      }
    } else {
      msg.emit('app:tip', res.message);
      //弹框关闭
      this.dispatch('loginModal:toggleVisible', {
        visible: false,
        callBack: null
      });
      return;
    }
  };

  toggleEnterprise = () => {
    this.dispatch('loginModal:toggleEnterprise');
    this.setFieldValue({
      field: 'registerAccount',
      value: ''
    });
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
    let registerInfo = JSON.parse(
      await AsyncStorage.getItem(cache.REGISTER_INFO)
    );
    if (registerInfo == null) {
      registerInfo = {
        customerAccount: '1',
        customerPassword: '1',
        verifyCode: '1'
      };
    }
    const registerLimitType = this.state().get('registerLimitType');
    const openFlag = this.state().get('openFlag');

    /**先校验必填项*/
    if (
      this._testBusinessNatureType(enterpriseInfoVO.businessNatureType) &&
      this._testEnterpriseName(enterpriseInfoVO.enterpriseName) &&
      this._testSocialCreditCode(enterpriseInfoVO.socialCreditCode) &&
      this._testBusinessLicenseUrl(enterpriseInfoVO.businessLicenseUrl) &&
      this._testInviteInfo(
        enterpriseInfoVO.inviteCode,
        registerLimitType,
        openFlag
      )
    ) {
      const customerDetail = this.state().get('customerDetail').toJS();
      const { code, message, context } = await webapi.doRegisterEnterprise({
        customerId: customerDetail.customerId,
        firstRegisterFlag: false,
        customerAccount: registerInfo.customerAccount,
        customerPassword: registerInfo.customerPassword,
        verifyCode: registerInfo.verifyCode,
        inviteCode: enterpriseInfoVO.inviteCode,
        businessNatureType: enterpriseInfoVO.businessNatureType,
        enterpriseName: enterpriseInfoVO.enterpriseName,
        socialCreditCode: enterpriseInfoVO.socialCreditCode,
        businessLicenseUrl: enterpriseInfoVO.businessLicenseUrl
      });
      if (code === config.SUCCESS_CODE) {
        //清空企业用户注册信息
        this.removeEnterpriseInfo();
        //是否直接可以登录 0 否 1 是
        if (
          fromJS(await VAS.fetchIepInfo()).getIn([
            'iepInfo',
            'enterpriseCustomerAuditFlag'
          ]) === 1
        ) {
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
      } else {
        msg.emit('app:tip', message);
        return false;
      }
    }
  };

  //清空企业用户注册信息
  removeEnterpriseInfo = () => {
    this.dispatch('field:value', {
      field: 'enterpriseInfoVO',
      value: fromJS({
        enterpriseId: '',
        enterpriseName: '',
        socialCreditCode: '',
        businessNatureType: '',
        businessIndustryType: '',
        businessLicenseUrl: '',
        inviteCode: ''
      })
    });
    this.dispatch('field:value', { field: 'images', value: fromJS({}) });
    this.dispatch('change:customerDetailField', {
      field: 'customerId',
      value: ''
    });
    this.dispatch('field:loginActorValue', {
      field: 'enterpriseCheckState',
      value: ''
    });
    //赋值会员信息
    this.dispatch('enterprise: apply : removeImage', 0);
    this.dispatch('field:loginActorValue', {
      field: 'enterpriseCheckTip',
      value: ''
    });
    this.dispatch('field:loginActorValue', {
      field: 'enterpriseButtonFlag',
      value: true
    });
  };

  //切换
  toggleBackLogin = () => {
    this.transaction(() => {
      this.dispatch('modal:clear:register');
      this.dispatch('modal:clear:info');
      this.dispatch('field:loginActorValue', {
        field: 'showLogin',
        value: true
      });
      this.dispatch('field:loginActorValue', {
        field: 'showEnterprise',
        value: false
      });
      this.dispatch('field:loginActorValue', {
        field: 'showImproveInfo',
        value: false
      });
      this.dispatch('field:loginActorValue', {
        field: 'showEnterpriseMoreInfo',
        value: false
      });
      this.dispatch('field:loginActorValue', {
        field: 'enterpriseCheckState',
        value: ''
      });
      //赋值会员信息
      this.dispatch('field:value', {
        field: 'enterpriseInfoVO',
        value: fromJS({
          enterpriseId: '',
          enterpriseName: '',
          socialCreditCode: '',
          businessNatureType: '',
          businessIndustryType: '',
          businessLicenseUrl: '',
          inviteCode: ''
        })
      });
      this.dispatch('enterprise: apply : removeImage', 0);
      this.dispatch('field:loginActorValue', {
        field: 'enterpriseCheckTip',
        value: ''
      });
      this.dispatch('field:loginActorValue', {
        field: 'enterpriseButtonFlag',
        value: true
      });
    });
  };

  /**
   * 上传附件
   */
  addImage = (image) => {
    this.dispatch('field:setEnterpriseFieldValue', {
      field: 'businessLicenseUrl',
      value: image
    });
    this.dispatch('enterprise: apply : addImage', image);
  };

  /**
   * 删除附件
   */
  removeImage = (index) => {
    this.dispatch('field:setEnterpriseFieldValue', {
      field: 'businessLicenseUrl',
      value: ''
    });
    this.dispatch('enterprise: apply : removeImage', index);
  };

  /**
   * 喜吖吖企业会员信息
   * @param key
   * @param value
   */
  setCustomerEnterprise = ({filed,value}) => {
    this.dispatch('userInfo:setCustomerEnterprise',{filed,value});
  };

  _testEnterpriseName=(name)=> {
    const customerEnterprise = this.state().get('customerEnterprise');
    const customerRegisterType = customerEnterprise.get('customerRegisterType');
    if(customerRegisterType) {
      if (!ValidConst.xyyCompanyName.test(name)) {
        msg.emit('app:tip', '请输入正确的企业名称');
        return false;
      }
    }
    return true;
  };

  _testSocialCreditCode=(code)=> {
    const customerEnterprise = this.state().get('customerEnterprise');
    const customerRegisterType = customerEnterprise.get('customerRegisterType');
    if(customerRegisterType) {
      if (code && !ValidConst.enterpriseSocialCreditCode.test(code)) {
        msg.emit('app:tip', '请输入正确统一社会信用代码');
        return false;
      }
    }
    return true;
  };

  _testBusinessLicenseUrl=(url)=> {
    const customerEnterprise = this.state().get('customerEnterprise');
    const customerRegisterType = customerEnterprise.get('customerRegisterType');
    if(customerRegisterType) {
      if (url === '') {
        msg.emit('app:tip', '请上传营业执照！');
        return false;
      }
    }
    return true;
  };

  /**
   * 弹窗注册-注册
   * @param registerInfo
   * @returns {Promise<void>}
   */
  registerInfo = async (registerInfo) => {
    const customerEnterprise = registerInfo.customerEnterprise.toJS();
    const { code, message, context } = await webapi.registerModal(
      registerInfo.customerAccount,
      registerInfo.customerPassword,
      registerInfo.verifyCode,
      registerInfo.inviteCode,
      customerEnterprise.customerRegisterType,
      customerEnterprise.enterpriseName,
      customerEnterprise.socialCreditCode,
      customerEnterprise.businessLicenseUrl,
      customerEnterprise.customerTag,
      customerEnterprise.enterpriseStatusXyy,
      customerEnterprise.employeeCode
    );
    if (code == config.SUCCESS_CODE) {
      //清除本地缓存的审核未通过的或者正在审核中的账户信息
      await AsyncStorage.removeItem(cache.PENDING_AND_REFUSED);
      window.registerInfo = null;
      //存储token
      window.token = context.token;
      AsyncStorage.setItem(cache.LOGIN_DATA, JSON.stringify(context));
      // b.登陆成功,需要合并登录前和登陆后的购物车,传入回调函数
      this.toggleVisible({
        visible: false,
        callBack: null
      });
      mergePurchase(()=> msg.emit('router: goToNext', { routeName: 'LoginSuccessDefault' }));
    }else{
      msg.emit('app:tip',message);
    }
  };
}
