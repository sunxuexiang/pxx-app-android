import { Store, msg } from 'plume2';

import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import { Confirm } from 'wmkit/modal/confirm';
import * as FindArea from 'wmkit/area/area';
import { Alert } from 'wmkit/modal/alert';
import { cache } from 'wmkit/cache';
import { Const } from 'wmkit/const';
import FormRegexUtil from 'wmkit/form/form-regex';


import PointsOrderConfirmActor from './actor/points-order-confirm-actor';
import * as webApi from './webapi';

export default class AppStore extends Store {


  bindActor() {
    return [new PointsOrderConfirmActor()];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  /**
   * 确认订单初始化
   * @returns {Promise<void>}
   */
  confirmInit = async (params) => {
    //初始化商品信息
    const res = (await webApi.getExchangeItem(params));
    if (res.code == 'K-000000') {
      this.dispatch(
        'points-order-confirm: store: fetch',
        res.context.pointsTradeConfirmItem
      );
      this.dispatch(
        'points-order-confirm: price: fetch',
        res.context.totalPoints
      );
    } else {
      this.clearSessionStorage();
      Alert({
        text: res.message,
        fnText: '确定',
        fn:  () => msg.emit('router: goToNext',{routeName: 'PointsMall'})
      });
    }

    AsyncStorage.getItem(cache.ORDER_CONFIRM).then((res) => {
      if (res) {
        //选择地址页面
        const { defaultAddr, pointsOrderConfirm } = JSON.parse(res);
        this.dispatch('points-order-confirm: back: init', {
          pointsOrderConfirm,
          defaultAddr
        });
        this.clearSessionStorage();
      } else {
        this.dispatch('points-order-confirm: init', params);
        this.initDefaultAddress();
      }
    });
  };

  /**
   * 清除SessionStorage
   */
  clearSessionStorage = () => {
    AsyncStorage.removeItem(cache.ORDER_CONFIRM);
  };

  /**
   * 存储SessionStorage
   * @param comeFrom 来自哪里
   */
  saveSessionStorage = (comeFrom) => {
    const { defaultAddr, pointsOrderConfirm } = this.state().toJS();
    AsyncStorage.setItem(cache.ORDER_CONFIRM,
      JSON.stringify({
      defaultAddr,
      pointsOrderConfirm,
      comeFrom
    })
    );
  };

  /**
   * 保存买家备注
   * @param remark
   */
  saveBuyerRemark = (remark) => {
    this.dispatch('points-order-confirm: remark', remark);
  };

  /**
   * 初始化收货地址
   * @returns {Promise<void>}
   */
  initDefaultAddress = async () => {
    const addrRes = await webApi.fetchCustomerDefaultAddr();
    this.dispatch('points-order-confirm: addr: fetch', addrRes.context);
  };

  /**
   * 提交订单
   * @returns {Promise<void>}
   */
  submit = async () => {
    //校验输入密码
    let payPassword = this.state().get('payPwd');
    if (payPassword == '') {
      msg.emit('app:tip','请输入支付密码！');
      return;
    }
    let checkPayPwd = await this.checkCustomerPayPwd(payPassword);
    if (!checkPayPwd) {
      this.dispatch('points-order-confirm:checkPayPwdRes', false);
      await this.getLoginCustomerInfo();
      return;
    } else {
      this.dispatch('points-order-confirm:checkPayPwdRes', true);
    }
    const { defaultAddr, pointsOrderConfirm } = this.state().toJS();
    if (!defaultAddr || !defaultAddr.deliveryAddressId) {
      msg.emit('app:tip','请选择收货地址！');
      return;
    }
    const addrDetail =
      FindArea.addressInfo(
        defaultAddr ? defaultAddr.provinceId : '',
        defaultAddr ? defaultAddr.cityId : '',
        defaultAddr ? defaultAddr.areaId : ''
      ) + (defaultAddr ? defaultAddr.deliveryAddress : '');

    if (
      !FormRegexUtil(pointsOrderConfirm.buyerRemark.trim(), '订单备注', {
        minLength: 0
      })
    ) {
      return;
    }

    const params = {
      consigneeId: defaultAddr.deliveryAddressId,
      consigneeAddress: addrDetail,
      consigneeUpdateTime: defaultAddr.updateTime
        ? moment(defaultAddr.updateTime).format(Const.SECONDS_FORMAT)
        : null,
      buyerRemark: pointsOrderConfirm.buyerRemark, //订单备注
      pointsGoodsId: pointsOrderConfirm.pointsGoodsId, //积分商品Id
      num: pointsOrderConfirm.num //购买数量
    };

    const { code, message, context } = await webApi.commit(params);
    if (code == 'K-000000') {
      //下单成功,清除
      this.clearSessionStorage();
      msg.emit('router: goToNext', {
        routeName: 'PointsConfirmSuccess',
        result:context
      });
    } else if(code == 'K-010208'){
      Confirm({
        text: '当前积分不足',
        okText: '确定',
        okFn: () => msg.emit('router: goToNext', {routeName: 'PointsMall'})
      });
    } else {
      Confirm({
        text: message,
        okText: '确定',
        okFn: () => msg.emit('router: goToNext', {routeName: 'PointsMall'})
      });
    }
  };

  checkPassword = async () => {
    const { defaultAddr } = this.state().toJS();
    if (!defaultAddr || !defaultAddr.deliveryAddressId) {
      msg.emit('app:tip','请选择收货地址！');
      return;
    }
    //用户支付密码是否可用
    const result = await this.isPayPwdValid();
    if (result) {
      this.showPassword(true);
    }
  };

  /**
   * 支付密码弹框显示
   */
  showPassword = (val) => {
    this.dispatch('points-order-confirm:showPassword', val);
  };

  /**
   * 输入密码修改
   * @param payPwd
   */
  changePayPwd = async (payPwd) => {
    this.dispatch('points-order-confirm:changePayPwd', payPwd);
  };

  /**
   * 校验会员支付密码是否可用
   * @param payPassword
   */
  isPayPwdValid = async () => {
    const res = await webApi.isPayPwdValid();
    if (res.code == 'K-000000') {
      return true;
    } else if (res.code == 'K-010206') {
      Confirm({
        text: '您还没有设置支付密码，暂时无法使用积分支付',
        okText: '设置支付密码',
        okFn: () => msg.emit('router: goToNext', {routeName: 'PayPassword'})
      });
      return false;
    } else if (res.code == 'K-010207'){
      Alert({
        text: res.message,
        time: 1000
      });
      return false;
    }
  };

  /**
   * 校验输入支付密码
   * @param payPassword
   */
  checkCustomerPayPwd = async (payPassword) => {
    const res = await webApi.checkCustomerPayPwd(payPassword);
    if (res.code == 'K-000000') {
      return true;
    } else {
      msg.emit('app:tip', res.message);
      return false;
    }
  };

  /**
   * 获取当前登陆人信息
   */
  getLoginCustomerInfo = async () => {
    const res = (await webApi.getLoginCustomerInfo());
    if (res.code == 'K-000000') {
      this.dispatch(
        'points-order-confirm:countPayPwdTime',
        res.context.payErrorTime
      );
    }
  };
}
