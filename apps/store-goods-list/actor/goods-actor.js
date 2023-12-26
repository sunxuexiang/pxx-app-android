import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';

export default class GoodsActor extends Actor {
  defaultState() {
    return {
      // 列表/大图视图模式(true:小图 false:大图)
      listView: true,
      // sku/spu视图模式(0:sku 1:spu)
      goodsShowType: 0,
      // 批发类型-规格选择弹框显示与否
      wholesaleVisible: false,
      // 零售类型-规格选择弹框显示与否
      retailVisible: false,
      // 用于记录点击打开过规格弹框的的spu信息
      chosenSpu: {},

      //分享赚弹框
      showShare: false,
      checkedSku: fromJS({}),
      //是否加入店铺
      addSelfShop: true,
      //分享赚--图文分享弹窗
      shareModalVisible: false,
      //是否展示评价相关信息
      isShow: false,
      // 企业购服务开关
      iepSwitch: false,
      // 企业够配置信息
      iepInfo: {}
    };
  }

  /**
   * 切换商品列表视图模式
   */
  @Action('goodsActor:changeLayout')
  changeLayout(state) {
    return state.set('listView', !state.get('listView'));
  }

  /**
   * 切换商品列表-大图/小图
   * (true:小图 false:大图)
   */
  @Action('goodsActor:changeImageShowType')
  changeImageShowType(state, bool) {
    return state.set('listView', bool);
  }

  /**
   * 切换商品列表-sku/spu
   * (0:sku 1:spu)
   */
  @Action('goodsActor:changeGoodsShowType')
  changeGoodsShowType(state, value) {
    return state.set('goodsShowType', value);
  }

  /**
   * 切换批发类型-规格选择框显示与否
   */
  @Action('goodsActor:changeWholesaleVisible')
  changeWholesaleVisible(state, value) {
    return state.set('wholesaleVisible', value);
  }

  /**
   * 切换零售类型-规格选择框显示与否
   */
  @Action('goodsActor:changeRetailVisible')
  changeRetailVisible(state, value) {
    return state.set('retailVisible', value);
  }

  /**
   * 设置选中的spu信息
   * @param state
   * @param context
   * @returns {any}
   */
  @Action('goodsActor:setSpuContext')
  setSpuContext(state, context) {
    return state.set('chosenSpu', context);
  }

  @Action('goods-list:changeShowShare')
  changeShowShare(state) {
    return state.set('showShare', !state.get('showShare'));
  }

  @Action('goods-list:saveCheckedSku')
  saveCheckedSku(state, sku) {
    return state.set('checkedSku', sku);
  }

  @Action('goods-list:changeAddSelfShop')
  changeAddSelfShop(state, value) {
    return state.set('addSelfShop', value);
  }

  @Action('goods-list:toggleShareVisible')
  toggleShareVisible(state) {
    return state.set('shareModalVisible', !state.get('shareModalVisible'));
  }

  @Action('goods:isShow')
  setIsShow(state, flag) {
    return state.set('isShow', flag);
  }

  @Action('goodsActor:isShow')
  setIsShow(state, context) {
    return state.set('isShow', context);
  }

  /**
   * 企业购信息
   * @param state
   * @param context
   * @returns {any}
   */
  @Action('goods-list:iep-info')
  setIepInfo(state, context) {
    return state.set('iepInfo', context);
  }

  /**
   * 企业购鉴权
   * @param state
   * @param iepSwitch
   * @returns {*}
   */
  @Action('goods-list:setIepSwitch')
  setIepSwitch(state, iepSwitch) {
    return state.set('iepSwitch', iepSwitch);
  }
}
