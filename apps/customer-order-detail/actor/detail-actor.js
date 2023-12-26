import { Action, Actor } from 'plume2';

export default class DetailActor extends Actor {
  defaultState() {
    return {
      detail: {}, //订单详情
      skus: [], // 商品清单
      sortEnclosures: [],
      enclosures: [],
      annexMaskShow: false
    };
  }

  /**
   * 初始化订单
   */
  @Action('detail-actor:init')
  init(state, res) {
    return state.update('detail', (detail) => detail.merge(res));
  }
  /**
   * 初始化附件数组
   */
  @Action('change:initEnclosures')
  initEnclosures(state, value) {
    return state.set('enclosures', value);
  }
  /**
   * 附件预览显示隐藏
   */
  @Action('change:changeAnnexMask')
  changeAnnexMask(state) {
    return state.set('annexMaskShow', !state.get('annexMaskShow'));
  }
  /**
   * 附件预览显示隐藏
   */
  @Action('change:newImage')
  newImage(state, value) {
    return state.set('sortEnclosures', value);
  }
}
