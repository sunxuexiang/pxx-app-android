export const BASE = 'Test1_';

export enum Command {
  //通用修改数据方法
  commonChange = 'Test1_commonChange',
  init = 'Test1_INIT',
  clean = 'Test1_CLEAN',

  /*
        修改查询条件数据
    */
  modifyRequest = 'Test1_modifyRequest',

  /*
        清空查询结果
    */
  cleanList = 'Test1_cleanList',

  /*
        
    */
  queryResult = 'Test1_queryResult',
}
