import { msg, Store } from 'plume2';

import * as webapi from './webapi';
import UserEmail from './actor/user-email';
import { config } from 'wmkit/config';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
  }

  bindActor() {
    return [new UserEmail()];
  }

  /**
   * 初始化数据
   */
  init = async () => {
    const { context, code, message } = await webapi.fetchCustomerEmailList();
    if (code === config.SUCCESS_CODE) {
      this.dispatch('customer:emailList', context);
    } else {
      msg.emit('app:tip', message);
    }
  };

  /**
   * 保存邮箱
   * @returns {Promise<void>}
   */
  doSaveCustomerEmail = async () => {
    // 控制按钮只可点击一次,只有等请求返回后才可以继续点击
    if (this.emailFlag) {
      return;
    }
    this.emailFlag = true;
    const formData = this.state().get('emailInfo');
    const checkRes = this.checkParameter(formData.get('emailAddress'));
    if (checkRes) {
      let msgStr = '操作成功!';
      let result;
      if (formData.get('customerEmailId')) {
        result = await webapi.updateCustomerEmail(formData);
        msgStr = '编辑成功!';
      } else {
        result = await webapi.addCustomerEmail(formData);
        msgStr = '新增成功!';
      }
      this.onCancelModal();
      if (result.code === config.SUCCESS_CODE) {
        msg.emit('app:tip', msgStr);
        this.init();
      } else {
        msg.emit('app:tip', result.message);
      }
    }
    this.emailFlag = false;
  };

  /**
   * 删除会员财务邮箱
   */
  deleteCustomerEmailById = async (customerEmailId) => {
    const { code } = await webapi.deleteCustomerEmailById(customerEmailId);
    if (code == config.SUCCESS_CODE) {
      msg.emit('app:tip', '删除成功');
      this.init();
    }
  };

  /**
   * 获取会员财务邮箱的数量
   */
  getEmailCount = () => {
    if (this.state().get('emailList')) {
      return this.state().get('emailList').length;
    } else {
      return 0;
    }
  };

  /**
   * 重新加载
   */
  refresh = () => {
    this.dispatch('customer: refresh');
  };

  /**
   * 显示弹窗
   */
  onShowModal = (emailInfo) => {
    this.setParameter('customerEmailId', emailInfo.customerEmailId);
    this.setParameter('customerId', emailInfo.customerId);
    this.setParameter('emailAddress', emailInfo.emailAddress);
    this.dispatch('email:model:show', true);
  };

  /**
   * 弹框取消
   */
  onCancelModal = () => {
    this.setParameter('customerEmailId', '');
    this.setParameter('customerId', '');
    this.setParameter('emailAddress', '');
    this.setErrorInfo('');
    this.dispatch('email:model:show', false);
  };

  /**
   * 修改错误信息
   * @param errorInfo
   */
  setErrorInfo = (errorInfo) => {
    this.dispatch('email:errorInfo:edit', errorInfo);
  };

  /**
   * 值改变
   * @param key
   * @param value
   */
  setParameter = (key, value) => {
    this.dispatch('customer:email:edit', { key, value });
  };

  checkParameter = (emailAddress) => {
    // 正则校验邮箱格式
    const re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if (emailAddress.trim() == '') {
      this.setErrorInfo('请输入邮箱地址');
      return false;
    } else if (!re.test(emailAddress)) {
      this.setErrorInfo('您填写的邮箱格式有误，请检查后重新输入');
      return false;
    } else {
      this.setErrorInfo('');
      return true;
    }
  };
}
