/**
 * Created by feitingting on 2017/7/31.
 */
import { Actor, Action } from 'plume2';
export default class InvoiceActor extends Actor {
  defaultState() {
    return {
      invoiceInfo: {
        // 订单开票id
        orderInvoiceId: '',
        //发票类型，0：普通发票 1：增值税专用发票 -1：无
        type: '',
        // 0:个人 1:单位，必传
        flag: 0,
        //发票的收货地址
        address: '',
        //联系人
        contacts: '',
        //联系电话
        phone: '',
        //开票项目
        projectName: '',
        //发票抬头
        title: '',
        //纳税人识别号
        identification: '',
        //单位名称
        companyName: '',
        //注册电话
        phoneNo: '',
        //开户行
        bank: '',
        //银行账户
        account: '',
        //注册地址
        companyAddress: '',
        // 省
        provinceId: '',
        // 市
        cityId: '',
        // 区
        areaId: ''
      }
    };
  }

  /**
   * 通用状态值，地址联系人电话类型
   * @param state
   * @param res
   * @returns {Map<K, V>}
   */
  @Action('invoice:common')
  common(state, res) {
    return state
      .setIn(['invoiceInfo', 'address'], res.address)
      .setIn(['invoiceInfo', 'contacts'], res.contacts)
      .setIn(['invoiceInfo', 'phone'], res.phone)
      .setIn(['invoiceInfo', 'type'], res.type)
      .setIn(['invoiceInfo', 'projectName'], res.projectName)
      .setIn(['invoiceInfo', 'provinceId'], res.provinceId)
      .setIn(['invoiceInfo', 'cityId'], res.cityId)
      .setIn(['invoiceInfo', 'areaId'], res.areaId);
  }

  /**
   * 普票名称
   * @param state
   * @param res
   * @returns {Map<K, V>}
   */
  @Action('invoice:general')
  general(state, res) {
    return state
      .setIn(['invoiceInfo', 'title'], res.generalInvoice.title)
      .setIn(['invoiceInfo', 'flag'], res.generalInvoice.flag)
      .setIn(
        ['invoiceInfo', 'identification'],
        res.generalInvoice.identification
      );
  }

  /**
   * 增票专用
   * @param state
   * @param res
   * @returns {Map<K, V>}
   */
  @Action('invoice:special')
  special(state, res) {
    return state
      .setIn(['invoiceInfo', 'companyName'], res.specialInvoice.companyName)
      .setIn(['invoiceInfo', 'phoneNo'], res.specialInvoice.phoneNo)
      .setIn(['invoiceInfo', 'bank'], res.specialInvoice.bank)
      .setIn(['invoiceInfo', 'account'], res.specialInvoice.account)
      .setIn(['invoiceInfo', 'companyAddress'], res.specialInvoice.address)
      .setIn(
        ['invoiceInfo', 'identification'],
        res.specialInvoice.identification
      );
  }
}
