import { Store, msg } from 'plume2';
import FormRegexUtil from 'wmkit/form/form-regex';

import * as webapi from './webapi';
import UserInvoiceActor from './actor/user-invoice-actor';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
  }

  bindActor() {
    return [new UserInvoiceActor()];
  }

  init = async () => {
    const { code, context } = await webapi.fetchCustomerInvoice();
    if (code == 'K-000000') {
      this.dispatch('customer:invoice', context);
    }
  };

  /**
   * 上传图片组装图片json并放入store
   * @param imagePath
   * @param imageBase64
   * @param imageType
   */
  addImg = (imagePath, imageType) => {
    this.setValue(
      imageType,
      '[{"uid":0,"status":"done","url":"' + imagePath + '"}]'
    );
  };

  /**
   * 文本框获取值
   * @param key
   * @param value
   */
  setValue = (key, value) => {
    this.dispatch('invoiceEdit:setValue', { key: key, value: value });
  };

  /**
   * 点击提交方法
   * @returns {Promise<void>}
   */
  submitInvoice = async () => {
    let invoiceBean = this.state().get('invoice');
    if (
      !FormRegexUtil(invoiceBean.get('companyName'), '单位全称', {
        required: true,
        maxLength: 50
      })
    )
      return;
    if (
      !FormRegexUtil(invoiceBean.get('taxpayerNumber'), '纳税人识别号', {
        required: true,
        regexType: 'number&letter',
        minLength: 15,
        maxLength: 20
      })
    )
      return;
    if (
      !FormRegexUtil(invoiceBean.get('companyPhone'), '注册电话', {
        required: true,
        regexType: 'number&-',
        maxLength: 20
      })
    )
      return;
    if (
      !FormRegexUtil(invoiceBean.get('companyAddress'), '注册地址', {
        required: true,
        maxLength: 60
      })
    )
      return;
    if (
      !FormRegexUtil(invoiceBean.get('bankNo'), '银行基本户号', {
        required: true,
        maxLength: 30,
        regexType: 'number'
      })
    )
      return;
    if (
      !FormRegexUtil(invoiceBean.get('bankName'), '开户行', {
        required: true,
        maxLength: 50
      })
    )
      return;
    if (!invoiceBean.get('businessLicenseImg')) {
      msg.emit('app:tip', '请上传营业执照复印件');
      return;
    }
    if (!invoiceBean.get('taxpayerIdentificationImg')) {
      msg.emit('app:tip', '请上传一般纳税人认证资格复印件');
      return;
    }
    const { code, message } = await webapi.submitCustomerInvoice(invoiceBean);
    if (code == 'K-000000') {
      msg.emit('app:tip', '提交成功，请等待商家审核');
      this.init();
    } else {
      msg.emit('app:tip', message);
    }
  };

  toEditStatus = () => {
    this.dispatch('account:toEditStatus');
  };
}
