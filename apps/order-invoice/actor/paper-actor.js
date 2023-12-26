import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';

export default class PaperActor extends Actor {
  defaultState() {
    return {
      cInvoice: {
        type: -1,
        flag: '1', //0:个人 1:单位
        title: '', //抬头
        identification: '', // 纳税人识别号
        projectKey: '00000000000000000000000000000000', //开票项目
        projectName: '明细', //项目名称
        projectUpdateTime: null //修改时间
      },
      //增值税专用发票
      VATInvoice: {},
      //是否开启增值税专用发票
      configFlag: false,
      //是否存在增值税专用发票
      invoiceFlag: false,
      //发票项目
      projects: [],
      //发票选项卡
      tabs: [],
      // 是否使用单独的收货地址
      sperator: false,
      // 店铺Id
      storeId: null,
      // 发票默认收货地址
      defaultInvoiceAddr: {},
      // 默认收货地址
      defaultAddr: {},
      // 发票信息
      invoice: {
        type: -1, //类型 0：普通发票 1：增值税专用发票 -1：无
        flag: '0', //0:个人 1:单位
        title: '', //抬头
        identification: 'identification',
        projectKey: '00000000000000000000000000000000', //开票项目
        projectName: '明细' //开票项目名称
      }
    };
  }

  /**
   * 选择开票项目
   * @param state
   * @param key
   * @returns {Map<K, V>}
   */
  @Action('paper-actor:initProjectKey')
  init(state, key) {
    const projects = state.get('projects');
    const project = projects.find((p) => p.get('id') == key);
    if (project) {
      return state
        .setIn(['cInvoice', 'projectKey'], key)
        .setIn(['cInvoice', 'projectName'], project.get('name'))
        .setIn(['cInvoice', 'projectUpdateTime'], project.get('updateTime'));
    } else {
      return state
        .setIn(['cInvoice', 'projectKey'], '00000000000000000000000000000000')
        .setIn(['cInvoice', 'projectName'], '明细')
        .setIn(['cInvoice', 'projectUpdateTime'], null);
    }
  }

  /**
   * 选择普通发票类型
   * @param state
   * @param flag
   * @returns {Map<K, V>}
   */
  @Action('paper-actor:selectFlag')
  selectFlag(state, flag) {
    return state.setIn(['cInvoice', 'flag'], flag);
  }

  /**
   * 存储增值税专用发票信息
   * @param state
   * @param invoice
   * @returns { }
   */
  @Action('paper-actor: VAT: fetch')
  fetchVATInvoice(state, invoice) {
    let data = [{ name: '不需要发票', id: 'no-invoice' }];
    let flag = invoice.flag && invoice.configFlag;
    if (invoice.paperInvoice) {
      data.push({ name: '普通发票', id: 'paper' });
    }
    if (flag) {
      data.push({ name: '增值税专用发票', id: 'added-value' });
    }
    return state
      .set('VATInvoice', invoice.customerInvoiceResponse)
      .set('configFlag', invoice.configFlag)
      .set('invoiceFlag', invoice.flag)
      .set('tabs', data);
  }

  /**
   * 保存发票抬头
   * @param state
   * @param title
   * @returns {Map<K, V>}
   */
  @Action('paper-actor: title')
  saveTitle(state, title) {
    return state.setIn(['cInvoice', 'title'], title);
  }

  /**
   * 保存发票纳税人识别号
   * @param state
   * @param identification
   * @returns {Map<K, V>}
   */
  @Action('paper-actor: identification')
  saveIdentification(state, identification) {
    return state.setIn(['cInvoice', 'identification'], identification);
  }

  /**
   * 发票信息初始化
   * @param state
   * @param invoice
   * @returns {Map<string, V>}
   */
  @Action('paper-actor: invoice: init')
  invoiceInit(state, invoice) {
    return state.set('cInvoice', fromJS(invoice));
  }

  /**
   * 开票项目初始化
   * @param state
   * @param projects
   * @returns {Map<string, V>}
   */
  @Action('paper-actor: projects: init')
  projectInit(state, projects) {
    return state.set(
      'projects',
      fromJS(projects).map((c) => {
        return fromJS({
          id: c.get('projectId'),
          name: c.get('projectName'),
          updateTime: c.get('projectUpdateTime')
        });
      })
    );
  }

  /**
   * 更改存储字段
   * @param state
   */
  @Action('paper-actor: filed: value')
  fieldValue(state, { field, value }) {
    return state.set(field, value);
  }

  /**
   * 开/关 使用单独的发票收货地址
   * @param state
   */
  @Action('paper-actor: switchSperator')
  speratorSwitch(state, sperator) {
    return state.set('sperator', sperator);
  }
}
