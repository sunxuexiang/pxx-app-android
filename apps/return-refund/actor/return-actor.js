import { Actor, Action } from 'plume2';
import { fromJS } from 'immutable';

/**
 * 退货Actor
 */
export default class ReturnsActor extends Actor {
  defaultState() {
    return {
      //退货商品
      skus: [],
      // 订单营销活动信息
      tradeMarketings: [],
      // 退货赠品
      gifts: [],
      // 该订单原来的商品
      originTradeItems: [],
      // 已经完成的退单
      returnOrderList: [],
      // 订单编号
      tid: '',
      // 退货原因
      returnReasonList: [],
      // 退货方式
      returnWayList: [],
      // 选中的退货原因
      selectedReturnReason: '',
      // 选中的退货方式
      selectedReturnWay: '',
      // 退货说明
      description: '',
      // 退单附件
      images: [],
      //退货退款金额
      totalPrice: 0,
      //订单使用积分
      tradePoints: 0,
      // 是否为退货，true：退货  false：退款
      isReturn: false,
      //提交退货结果
      returnsResult: {
        // 退单号
        id: '',
        // 退款金额
        returnPrice: {
          totalPrice: 0
        }
      }
    };
  }

  /**
   * 退货商品初始化
   * @param state
   * @param goodsVal
   * @returns { }
   */
  @Action('return: sku: init')
  skusInit(state, goodsVal) {
    return state.set('skus', fromJS(goodsVal));
  }

  /**
   * 订单初始化
   * @param state
   * @param order
   * @returns { }
   */
  @Action('return: init')
  init(
    state,
    {
      tid,
      tradeMarketings,
      gifts,
      totalPrice,
      tradePoints,
      originTradeItems,
      returnOrderList,
      isReturn
    }
  ) {
    return state
      .set('tid', tid)
      .set('tradeMarketings', tradeMarketings)
      .set('gifts', gifts)
      .set('totalPrice', totalPrice)
      .set('tradePoints', tradePoints)
      .set('originTradeItems', originTradeItems)
      .set('returnOrderList', returnOrderList)
      .set('isReturn', isReturn);
  }

  @Action('return: updateGifts')
  updateGifts(state, newGiftItems) {
    return state.set('gifts', newGiftItems);
  }

  /**
   * 全选
   * @param state
   * @param checked
   * @returns { }
   */
  @Action('return: checkAll')
  checkAll(state, checked) {
    const skus = state
      .get('skus')
      .map((sku) => sku.set('skuChecked', !checked));
    return state.set('skus', skus);
  }

  /**
   * 单选
   * @param state
   * @param skuId
   * @returns {Map<K, V>}
   */
  @Action('return: checkOne')
  checkOne(state, skuId) {
    const index = state
      .get('skus')
      .findIndex((sku) => sku.get('skuId') == skuId);
    return state.setIn(
      ['skus', index, 'skuChecked'],
      !state.getIn(['skus', index, 'skuChecked'])
    );
  }

  /**
   * 修改sku数量
   * @param state
   * @param skuId
   * @param skuNum
   * @returns {Map<K, V>}
   */
  @Action('return: changeNum')
  changeNum(state, { skuId, skuNum }) {
    const index = state
      .get('skus')
      .findIndex((sku) => sku.get('skuId') == skuId);
    return state.setIn(['skus', index, 'num'], skuNum);
  }

  /**
   * 修改退货方式
   * @param state
   * @param type
   * @returns {Map<K, V>}
   */
  @Action('return: changeType')
  changeType(state, type) {
    return state.set('selectedReturnWay', type);
  }

  /**
   * 修改退货原因
   * @param state
   * @param reason
   * @returns {Map<K, V>}
   */
  @Action('return: changeReason')
  changeReason(state, reason) {
    return state.set('selectedReturnReason', reason);
  }

  /**
   * 退货退款提交页面初始化
   * @param state
   * @param money
   * @returns {Map<string, number>}
   */
  @Action('return: apply: init')
  applyInit(state, { returnReasonList, returnWayList }) {
    return state
      .set('returnReasonList', returnReasonList)
      .set('returnWayList', returnWayList);
  }

  /**
   * 存储订单备注
   * @param state
   * @returns { }
   */
  @Action('return: save: remark')
  saveRemark(state, remark) {
    return state.set('description', remark.trim());
  }

  /**
   * 退货结果
   * @param state
   * @param returnsResult
   * @returns { }
   */
  @Action('return: apply : result')
  applyResult(state, returnsResult) {
    return state.set('returnsResult', fromJS(returnsResult));
  }

  /**
   * 上传附件
   */
  @Action('return: apply : addImage')
  addImage(state, image) {
    return state.set('images', state.get('images').push(fromJS(image)));
  }

  /**
   * 删除附件
   */
  @Action('return: apply : removeImage')
  removeImage(state, index) {
    return state.set('images', state.get('images').remove(index));
  }
}
