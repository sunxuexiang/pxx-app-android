export const BASE = 'SrcPagesFlashSale_';

export enum Command {
  //通用修改数据方法
  commonChange = 'SrcPagesFlashSale_commonChange',
  init = 'SrcPagesFlashSale_INIT',
  clean = 'SrcPagesFlashSale_CLEAN',

  /*
        秒杀商品分类
    */
  setCateList = 'SrcPagesFlashSale_setCateList',

  /*
        秒杀商品场次
    */
  setSceneList = 'SrcPagesFlashSale_setSceneList',

  /*
        设置分类
    */
  setCateId = 'SrcPagesFlashSale_setCateId',

  /*
        设置场次
    */
  setScene = 'SrcPagesFlashSale_setScene',

  /*
  设置场次
   */
  setActivityStatus = 'SrcPagesFlashSale_setActivityStatus'
}
