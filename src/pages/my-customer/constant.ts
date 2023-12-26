export const BASE = 'MyCustomer_';

export enum Command {
  //通用修改数据方法
  commonChange = 'MyCustomer_commonChange',
  init = 'MyCustomer_INIT',
  clean = 'MyCustomer_CLEAN',

  // tab点击
  changeTab = 'MyCustomer_changeTab',
  // 列表回调
  changeTotalNum = 'MyCustomer_changeTotalNum'
  // 列表刷新
  // initToRefresh = 'MyCustomer_initToRefresh'
}
