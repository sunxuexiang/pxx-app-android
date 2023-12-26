import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';
import moment from 'moment';
import { any } from 'prop-types';

export default class SkuActor extends Actor {
  defaultState() {
    return {
      //商品列表
      skus: [],
      show: false,
      popoverParam: {},
      couponShow: false,
      checkItemList: fromJS([]),
      numSkus: fromJS({})
    };
  }

  /**
   * 设置选中状态的skuId集合
   * @param state
   * @param checkSku
   * @returns {*}
   */
  @Action('purchase:checkItemList')
  chooseCheckItemList(state, checkItemList) {
    return state.set('checkItemList', fromJS(checkItemList));
  }

  /**
   * 初始化sku数据
   * @param state
   * @param skus
   * @returns { }
   */
  @Action('purchase:skus')
  skus(state, skus) {
    return state.set('skus', fromJS(skus));
  }

  /**
   * 选中sku
   * @param state
   * @param skuId
   * @returns {Map<K, V>}
   */
  @Action('purchase:check')
  check(state, skuId) {
    const skuIndex = state
      .get('skus')
      .findIndex((sku) => sku.get('goodsInfoId') === skuId);
    const checkItemIndex = state
      .get('checkItemList')
      .findIndex((sku) => sku.get('goodsInfoId') === skuId);
    return state.setIn(
        ['skus', skuIndex, 'checked'],
        !state.getIn(['skus', skuIndex, 'checked']),
    ).setIn(
        ['checkItemList', checkItemIndex, 'checked'],
        !state.getIn(['checkItemList', checkItemIndex, 'checked']),
    );
  }

  /**
   * 选中多个sku
   * @param state
   * @param skuIds
   * @returns {Map<K, V>}
   */
  @Action('purchase:checkSpu')
  checkSkuIds(state, { skuIds, checked }) {
    return state.withMutations((state) => {
      skuIds.forEach((id) => this.checkSkuById(state, id, checked));
    });
  }

  /**
   * 全部选中
   * @param state
   * @param checked
   * @returns {Map<K, V>}
   */
  @Action('purchase:checkAll')
  checkAll(state, { checked, edit }) {
    return state.withMutations((state) => {
      state.set(
        'skus',
        state.get('skus').map((sku) => {
          if (
            (edit && sku.get('goodsStatus') !== 2) ||
            sku.get('goodsStatus') === 0
          ) {
            return sku.set('checked', !checked);
          }
          return sku;
        }),
      );
    }).withMutations((state) => {
      state.set(
        'checkItemList',
        state.get('checkItemList').map((sku) => {
          if (
              (edit && sku.get('goodsStatus') !== 2) ||
              sku.get('goodsStatus') === 0
          ) {
            return sku.set('checked', !checked);
          }
          return sku;
        }),
      );
    });
  }

  /**
   *
   * @param state
   * @param skuId
   * @returns {any}
   */
  checkSkuById(state, skuId, checked) {
    const skuIndex = state
      .get('skus')
      .findIndex((sku) => sku.get('goodsInfoId') === skuId);
    const checkItemIndex = state
        .get('checkItemList')
        .findIndex((sku) => sku.get('goodsInfoId') === skuId);
    let numSkus = state.get('numSkus').toJS();
    return state.setIn(['skus', skuIndex, 'checked'], !checked).
      setIn(['skus', skuIndex, 'buyCount'], numSkus[skuId]).
      setIn(['checkItemList', checkItemIndex, 'checked'], !checked).
      setIn(['checkItemList', checkItemIndex, 'buyCount'], numSkus[skuId]);
  }

  /**
   * 设置sku message
   * @param state
   * @param skuId
   * @param message
   * @returns {Map<K, V>}
   */
  @Action('purchase:setMessage')
  setMessge(state, { skuId, message }) {
    const skuIndex = state
      .get('skus')
      .findIndex((sku) => sku.get('goodsInfoId') === skuId);
    return state.setIn(['skus', skuIndex, 'error'], message);
  }

  /**
   * 批量设置sku message
   */
  @Action('purchase:setMessages')
  setMessges(state, skuMessages) {
    return state.update('skus', (skus) => {
      return skus.map((sku) => {
        const skuMessage = skuMessages.find(
          (item) => item.skuId === sku.get('goodsInfoId')
        );
        if (skuMessage) {
          return sku.set('error', skuMessage.message);
        }
        return sku;
      });
    });
  }

  /**
   * 修改sku数量
   * @param state
   * @param skuId
   * @param number
   * @returns {Map<K, V>}
   */
  @Action('purchase:skuNum')
  changeSkuNum(state, { skuId, number }) {
    const skuIndex = state
      .get('skus')
      .findIndex((sku) => sku.get('goodsInfoId') === skuId);
    const checkItemIndex = state
      .get('checkItemList')
      .findIndex((sku) => sku.get('goodsInfoId') === skuId);
    return state.setIn(['skus', skuIndex, 'buyCount'], number).setIn(['checkItemList', checkItemIndex, 'buyCount'], number);
  }

  /**
   * 显示弹窗
   * @param state
   * @param skuId
   * @param number
   * @returns {Map<K, V>}
   */
  @Action('purchase:popover:open')
  open(state, param) {
    return state.set('show', true).set('popoverParam', fromJS(param));
  }

  /**
   * 关闭弹窗
   * @param state
   * @param skuId
   * @param number
   * @returns {Map<K, V>}
   */
  @Action('purchase:popover:close')
  close(state) {
    return state.set('show', false);
  }
  /**
   * 领券弹窗的显示隐藏
   */
  @Action('change:changeCoupon')
  changeCoupon(state) {
    return state.set('couponShow', !state.get('couponShow'));
  }

  @Action('change:numSkus')
  changeNumSkus(state, numSkus) {
    return state.set('numSkus', fromJS(numSkus));
  }
}
