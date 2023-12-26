export const BASE = 'GoodsDetailEvaluationList_';

export enum Command {
  //通用修改数据方法
  commonChange = 'GoodsDetailEvaluationList_commonChange',
  init = 'GoodsDetailEvaluationList_INIT',
  clean = 'GoodsDetailEvaluationList_CLEAN',

  /*
        修改查询条件数据
    */
  modifyRequest = 'GoodsDetailEvaluationList_modifyRequest',

  /*
        清空查询结果
    */
  cleanList = 'GoodsDetailEvaluationList_cleanList',


  openCloseModal = 'GoodsDetailEvaluationList_openCloseModal',

  /*
        
    */
  setBigImgList = 'GoodsDetailEvaluationList_setBigImgList',

  setGoodsEvaluate = 'GoodsDetailEvaluationList_setGoodsEvaluate',

  bigImgIndex = 'GoodsDetailEvaluationList_bigImgIndex',

  setZanGoodsEvaluateList = 'GoodsDetailEvaluationList_setZanGoodsEvaluateList',

  changeText = 'GoodsDetailEvaluationList_changeText',

  iepInfo = 'GoodsDetailEvaluationList_iepInfo',
  checkEnterpriseEnable = 'GoodsDetailEvaluationList_checkEnterpriseEnable',
}
