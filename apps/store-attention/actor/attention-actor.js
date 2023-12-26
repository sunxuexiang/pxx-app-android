/**
 * Created by feitingting on 2017/12/19.
 */
import { Actor, Action } from 'plume2';

export default class AttentionActor extends Actor {
  defaultState() {
    return {
      isEdit: false,
      storeIds: [], //当前展示的所有店铺id列表
      checkedStoreIds: [], // 已勾选的店铺id列表
      attentionNum: 0, //关注数量
      toRefresh: () => {}
    };
  }

  /**
   * 关注店铺列表
   * @param state
   * @param res
   */
  @Action('attention:store:change')
  change(state, res) {
    return state.set('allAttentionStores', res);
  }

  /**
   * 全选or反全选
   * @param state
   * @returns {void | * | boolean}
   */
  @Action('attention:store:checkAll')
  checkAll(state, checkAll) {
    return state.set('checkAll', checkAll);
  }

  /**
   * 编辑店铺
   *
   */
  @Action('store:edit')
  changeEditStatus(state) {
    return state.set('isEdit', !state.get('isEdit'));
  }

  /**
   * 设置显示的店铺id
   */
  @Action('store:mergeStoreIds')
  mergeStoreIds(state, storeIds) {
    return state.update('storeIds', (s) => s.concat(storeIds));
  }

  /**
   * 设置关注数量
   */
  @Action('store:size')
  setAttentionNum(state, attentionNum) {
    return state.set('attentionNum', attentionNum);
  }

  /**
   * 设置勾选的店铺id
   */
  @Action('store:setCheckedStore')
  setCheckedStore(state, checkedStoreIds) {
    return state.set('checkedStoreIds', checkedStoreIds);
  }

  @Action('store:toRefresh')
  toRefresh(state, toRefresh) {
    return state.set('toRefresh', toRefresh);
  }

  @Action('store:setEdit')
  setEdit(state) {
    return state.set('isEdit', false);
  }
}
