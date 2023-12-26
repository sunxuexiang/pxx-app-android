export const BASE = 'SalesPerform_';

export enum Command {
  //通用修改数据方法
  commonChange = 'SalesPerform_commonChange',
  init = 'SalesPerform_INIT',
  clean = 'SalesPerform_CLEAN',

  /*
        改变销售业绩列表
    */
  changeSalesList = 'SalesPerform_changeSalesList'
}
