import { Store, msg } from 'plume2';
import AsyncStorage from '@react-native-community/async-storage';

import { cache } from 'wmkit/cache';
import { Alert } from 'wmkit/modal/alert';
import FormRegexUtil from 'wmkit/form/form-regex';

import { fromJS } from 'immutable';

import TabActor from './actor/tab-actor';
import PaperActor from './actor/paper-actor';
import * as webApi from './webapi';

const INVOICE_KEY = {
  '-1': 'no-invoice',
  '0': 'paper',
  '1': 'added-value'
};

export default class AppStore extends Store {
  bindActor() {
    return [new TabActor(), new PaperActor()];
  }

  /**
   * 初始化
   * @returns {Promise<void>}
   */
  init = async companyInfoId => {
    const { code, context } = await webApi.fetchVATInvoice(companyInfoId);
    if (code == 'K-000000') {
      this.dispatch('paper-actor: VAT: fetch', context);
    } else {
      Alert({
        text: '该店铺已不支持开票',
        fnText: '返回',
        fn: () => msg.emit('router: back')
      });
      this.dispatch('paper-actor: VAT: fetch', {
        customerInvoiceResponse: {},
        flag: false,
        configFlag: true
      });
    }
    //跳转初始化
    const confirm = await AsyncStorage.getItem(cache.ORDER_CONFIRM);
    const orderInvoice = await AsyncStorage.getItem(cache.ORDER_INVOICE);
    if (confirm) {
      //选择地址页面
      let { defaultAddr, orderConfirm } = JSON.parse(confirm);
      if (orderInvoice) {
        defaultAddr = JSON.parse(orderInvoice).defaultAddr;
        orderConfirm = JSON.parse(orderInvoice).orderConfirm;
        AsyncStorage.removeItem(cache.ORDER_INVOICE);
      }
      const index = fromJS(orderConfirm).findIndex(
        f => f.get('supplierId') == companyInfoId
      );
      const cInvoice = fromJS(orderConfirm)
        .getIn([index, 'invoice'])
        .toJS();
      const sperator = fromJS(orderConfirm).getIn([index, 'sperator']);
      const storeId = fromJS(orderConfirm).getIn([index, 'storeId']);
      const defaultInvoiceAddr = fromJS(orderConfirm).getIn([
        index,
        'defaultInvoiceAddr'
      ]);
      const invoice = fromJS(orderConfirm).getIn([index, 'invoice']);
      this.dispatch('paper-actor: filed: value', {
        field: 'storeId',
        value: storeId
      });
      this.dispatch('paper-actor: filed: value', {
        field: 'defaultAddr',
        value: fromJS(defaultAddr)
      });
      this.dispatch('paper-actor: filed: value', {
        field: 'defaultInvoiceAddr',
        value: defaultInvoiceAddr
      });
      this.dispatch('paper-actor: filed: value', {
        field: 'invoice',
        value: invoice
      });
      this.onSwitchSperator(sperator);

      const key = INVOICE_KEY[cInvoice.type];
      if (cInvoice.type == '0') {
        await this.invoiceProjectInit(companyInfoId);
      }
      this.transaction(() => {
        this.dispatch('paper-actor: invoice: init', cInvoice);
        this.dispatch('tab:init', key);
      });
    }
  };

  /**
   * 初始化发票类型,如果是普通发票,则每次都要加载开票项目
   * @param tabKey
   * @returns {Promise<void>}
   */
  initTabActive = async ({ tabKey, companyInfoId }) => {
    if (tabKey != this.state().get('key')) {
      let invoiceType = -1;
      if (tabKey == 'paper') {
        await this.invoiceProjectInit(companyInfoId);
        invoiceType = 0;
      } else if (tabKey == 'added-value') {
        invoiceType = 1;
      } else {
        invoiceType = -1;
      }
      this.transaction(() => {
        this.dispatch('tab:init', tabKey);
        this.dispatch('paper-actor: invoice: init', {
          invoiceType: invoiceType,
          flag: '1',
          title: '',
          identification: '',
          projectKey: '00000000000000000000000000000000',
          projectName: '明细'
        });
      });
    }
  };

  /**
   * 选择开票项目
   * @param projectKey
   */
  initProjectActive = projectKey => {
    this.dispatch('paper-actor:initProjectKey', projectKey);
  };

  /**
   * 选择普通发票类型
   * @param flag
   */
  initPaperFlag = flag => {
    this.dispatch('paper-actor:selectFlag', flag);
  };

  /**
   * 保存抬头
   * @param val
   */
  saveInvoiceTitle = val => {
    this.dispatch('paper-actor: title', val);
  };

  /**
   * 初始化开票项目
   * @returns {Promise<void>}
   */
  invoiceProjectInit = async companyInfoId => {
    const { code, context } = await webApi.fetchProjects(companyInfoId);
    if (code == 'K-000000') {
      this.dispatch('paper-actor: projects: init', context);
    }
  };

  /**
   * 切换是否使用单独的发票收货地址
   */
  onSwitchSperator = sperator => {
    this.dispatch('paper-actor: switchSperator', sperator);
  };

  /**
   * 保存纳税人识别号
   * @param val
   */
  saveIdentification = val => {
    this.dispatch('paper-actor: identification', val);
  };

  /**
   * 存储当前页面值
   */
  save = async ({ companyInfoId, page, comeFroms }) => {
    if (await AsyncStorage.getItem(cache.ORDER_CONFIRM)) {
      const key = this.state().get('key');
      const cInvoice = this.state().get('cInvoice');
      const cVATInvoice = this.state().get('VATInvoice');
      const sperator = this.state().get('sperator');
      let { defaultAddr, orderConfirm, comeFrom } = JSON.parse(
        await AsyncStorage.getItem(cache.ORDER_CONFIRM)
      );
      const index = fromJS(orderConfirm).findIndex(
        f => f.get('supplierId') == companyInfoId
      );
      const defaultInvoiceAddr = this.state().get('defaultInvoiceAddr');
      //始终保持地址数据为最新
      if (comeFrom == 'invoice') {
        switch (key) {
          case 'no-invoice':
            orderConfirm = fromJS(orderConfirm)
              .setIn([index, 'invoice', 'type'], -1)
              .setIn([index, 'defaultInvoiceAddr'], {})
              .setIn([index, 'sperator'], false)
              .toJS();
            break;
          case 'paper':
            if (
              'OrderConfirm' == page &&
              cInvoice.get('flag') == 1 &&
              (!FormRegexUtil(cInvoice.get('title').trim(), '发票抬头', {
                required: true,
                minLength: 1,
                maxLength: 100
              }) ||
                !FormRegexUtil(
                  cInvoice.get('identification').trim(),
                  '纳税人识别号',
                  { minLength: 15, maxLength: 20, regexType: 'number&letter' }
                ))
            ) {
              return;
            }
            orderConfirm = fromJS(orderConfirm)
              .setIn([index, 'invoice', 'type'], 0)
              .setIn([index, 'invoice', 'flag'], cInvoice.get('flag'))
              .setIn([index, 'invoice', 'title'], cInvoice.get('title'))
              .setIn(
                [index, 'invoice', 'identification'],
                cInvoice.get('identification')
              )
              .setIn(
                [index, 'invoice', 'projectKey'],
                cInvoice.get('projectKey')
              )
              .setIn(
                [index, 'invoice', 'projectName'],
                cInvoice.get('projectName')
              )
              .setIn(
                [index, 'invoice', 'projectUpdateTime'],
                cInvoice.get('projectUpdateTime')
              )
              .setIn([index, 'sperator'], sperator)
              .setIn([index, 'defaultInvoiceAddr'], defaultInvoiceAddr)
              .toJS();
            break;
          case 'added-value':
            orderConfirm = fromJS(orderConfirm)
              .setIn([index, 'invoice', 'type'], 1)
              .setIn(
                [index, 'invoice', 'projectKey'],
                cInvoice.get('projectKey')
              )
              .setIn(
                [index, 'invoice', 'projectName'],
                cInvoice.get('projectName')
              )
              .setIn([index, 'invoice', 'projectUpdateTime'], null)
              .setIn([index, 'VATInvoice'], cVATInvoice)
              .setIn([index, 'sperator'], sperator)
              .setIn([index, 'defaultInvoiceAddr'], defaultInvoiceAddr)
              .toJS();
            break;
        }
      }
      await AsyncStorage.setItem(
        cache.ORDER_CONFIRM,
        JSON.stringify({
          defaultAddr,
          orderConfirm,
          comeFrom: comeFroms || comeFrom
        })
      );
      msg.emit('router: goToNext', {
        routeName: page
      });
    }
  };

  /**
   * 存储当前页面值
   */
  saveTemp = async ({ companyInfoId, page, comeFroms }) => {
    if (await AsyncStorage.getItem(cache.ORDER_CONFIRM)) {
      const key = this.state().get('key');
      const cInvoice = this.state().get('cInvoice');
      const cVATInvoice = this.state().get('VATInvoice');
      const sperator = this.state().get('sperator');
      const defaultInvoiceAddr = this.state().get('defaultInvoiceAddr');

      let { defaultAddr, orderConfirm, comeFrom } = JSON.parse(
        await AsyncStorage.getItem(cache.ORDER_CONFIRM)
      );

      const index = fromJS(orderConfirm).findIndex(
        f => f.get('supplierId') == companyInfoId
      );
      //始终保持地址数据为最新
      if (comeFrom == 'invoice') {
        switch (key) {
          case 'no-invoice':
            orderConfirm = fromJS(orderConfirm)
              .setIn([index, 'invoice', 'type'], -1)
              .setIn([index, 'defaultInvoiceAddr'], {})
              .setIn([index, 'sperator'], false)
              .toJS();
            break;
          case 'paper':
            orderConfirm = fromJS(orderConfirm)
              .setIn([index, 'invoice', 'type'], 0)
              .setIn([index, 'invoice', 'flag'], cInvoice.get('flag'))
              .setIn([index, 'invoice', 'title'], cInvoice.get('title'))
              .setIn(
                [index, 'invoice', 'identification'],
                cInvoice.get('identification')
              )
              .setIn(
                [index, 'invoice', 'projectKey'],
                cInvoice.get('projectKey')
              )
              .setIn(
                [index, 'invoice', 'projectName'],
                cInvoice.get('projectName')
              )
              .setIn(
                [index, 'invoice', 'projectUpdateTime'],
                cInvoice.get('projectUpdateTime')
              )
              .setIn([index, 'sperator'], sperator)
              .setIn([index, 'defaultInvoiceAddr'], defaultInvoiceAddr)
              .toJS();
            break;
          case 'added-value':
            orderConfirm = fromJS(orderConfirm)
              .setIn([index, 'invoice', 'type'], 1)
              .setIn(
                [index, 'invoice', 'projectKey'],
                cInvoice.get('projectKey')
              )
              .setIn(
                [index, 'invoice', 'projectName'],
                cInvoice.get('projectName')
              )
              .setIn([index, 'invoice', 'projectUpdateTime'], null)
              .setIn([index, 'VATInvoice'], cVATInvoice)
              .setIn([index, 'sperator'], sperator)
              .setIn([index, 'defaultInvoiceAddr'], defaultInvoiceAddr)
              .toJS();
            break;
        }
      }
      await AsyncStorage.setItem(
        cache.ORDER_INVOICE,
        JSON.stringify({
          defaultAddr,
          orderConfirm,
          comeFrom: comeFroms || comeFrom
        })
      );
      msg.emit('router: goToNext', {
        routeName: page
      });
    }
  };
}
