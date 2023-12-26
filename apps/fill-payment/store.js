import AsyncStorage from '@react-native-community/async-storage';
import { Store, msg } from 'plume2';
import moment from 'moment';
import { config } from 'wmkit/config';
import { cache } from 'wmkit/cache';
import FormRegexUtil from 'wmkit/form/form-regex';
import { applyAccount } from './webapi';
import FormActor from './actor/form-actor';

export default class AppStore extends Store {
  bindActor() {
    return [new FormActor()];
  }

  constructor(props) {
    super(props);
    //debug
    window._store = this;
  }

  /**
   * 初始化
   */
  init = async (tid) => {
    if (!tid) {
      return;
    }

    let form = this.state().get('form'); //获取form的默认属性
    form = form.set('tid', tid); //订单号

    let paymentForm = await AsyncStorage.getItem(cache.FILL_PAYMENT_INFO); //获取跨页面缓存中的数据,session中只能存string格式数据

    if (paymentForm) {
      paymentForm = JSON.parse(paymentForm);
      form = form.set('accountId', paymentForm.accountId); //付款账号
      form = form.set('accountNm', paymentForm.accountNm); //付款账户信息
      form = form.set('time', moment(paymentForm.createTime).toDate()); //付款时间 - Date格式
      form = form.set('createTime', paymentForm.createTime); //付款时间 - 年月日 时分秒
      form = form.set('formatTime', paymentForm.formatTime); //付款显示时间 - 年月日 00:00:00
      form = form.set('remark', paymentForm.remark); //备注
      form = form.set('encloses', paymentForm.encloses); //附件
    }

    this.dispatch('formActor:changeForm', form);

    // 删除，避免下次再进入时还存在
    AsyncStorage.removeItem(cache.FILL_PAYMENT_INFO);
  };

  /**
   * 提交付款单信息
   */
  save = async () => {
    const form = this.state().get('form');

    if (
      !FormRegexUtil(form.get('accountId'), '收款账号', { required: true }) ||
      !FormRegexUtil(form.get('createTime'), '付款时间', { required: true }) ||
      !FormRegexUtil(form.get('encloses'), '付款单附件', {
        required: true,
        pic: true
      })||!FormRegexUtil(form.get('remark'), '备注', { required: true })
    ) {
      return;
    }

    const { code, message } = await applyAccount(form); //提交付款单

    if (code === config.SUCCESS_CODE) {
      msg.emit('app:tip', '提交成功！');
      AsyncStorage.removeItem(cache.FILL_PAYMENT_INFO); //提交成功后,清空跨页面缓存中的数据

      // 跳转付款单提交成功页面
      msg.emit('router: replace', {
        routeName: 'PaySuccess',
        tid: form.get('tid'),
        payType: 'offline'
      });
      // 刷新订单列表页面和订单详情页面
      msg.emit('order:refresh');
    } else {
      msg.emit('app:tip', message);
    }
  };

  /**
   * 修改form
   */
  changeForm = (form) => {
    this.dispatch('formActor:changeForm', form);
  };

  /**
   * 修改备注
   *
   * @memberof AppStore
   */
  changeRemark = (remark) => {
    this.dispatch('formActor:changeRemark', remark);
  };

  /**
   * 上传附件
   * @param url
   */
  addImg = (url) => {
    this.dispatch('formActor:addImg', url);
  };

  /**
   * 选择商家账号
   */
  chooseAccount = () => {
    const form = this.state().get('form');

    let paymentForm = {
      tid: form.get('tid'),
      accountId: form.get('accountId'),
      accountNm: form.get('accountNm'),
      createTime: form.get('createTime'),
      formatTime: form.get('formatTime'),
      remark: form.get('remark'),
      encloses: form.get('encloses')
    };

    AsyncStorage.setItem(cache.FILL_PAYMENT_INFO, JSON.stringify(paymentForm));

    msg.emit('router: goToNext', { routeName: 'SellerAccount' });
  };
}
