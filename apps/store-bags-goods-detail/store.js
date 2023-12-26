import { Store, msg } from 'plume2';
import { fromJS } from 'immutable';
import { Confirm } from 'wmkit/modal/confirm';
import { config } from 'wmkit/config';
import { myPvUvStatis } from 'wmkit/wm_sta';
import * as WMkit from 'wmkit/kit';

import * as webApi from './webapi';
import DescActor from './actor/desc-actor';
import GoodsActor from './actor/goods-actor';

export default class AppStore extends Store {
  bindActor() {
    return [new DescActor(), new GoodsActor()];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  //;;;;;;;;;;;;;action;;;;;;;;;;;;;;;;;;;;;;;
  init = async (skuId) => {
    // 检查开店礼包有效状态
    if (!(await this.verify(skuId))) {
      return;
    }

    let spuRes = await webApi.init(skuId);

    if (spuRes.code === config.SUCCESS_CODE) {
      const isDistributor = WMkit.isDistributor();
      this.dispatch('goods-detail:setIsDistributor', isDistributor);
      spuRes.context.skuId = skuId;
      /**商品详情pv/uv埋点*/
      myPvUvStatis('GoodsDetail', skuId, spuRes.context.goods.companyInfoId);
      //无内容的storeGoodsTabs需要过滤出来
      let storeGoodsTabs = [];
      spuRes.context.storeGoodsTabs.map((v) => {
        if (
          spuRes.context.goodsTabRelas.length > 0 &&
          spuRes.context.goodsTabRelas.find((item) => item.tabId == v.tabId) &&
          spuRes.context.goodsTabRelas.find((item) => item.tabId == v.tabId)
            .tabDetail
        ) {
          storeGoodsTabs.push(v);
        }
      });

      this.transaction(() => {
        this.dispatch('goods-detail: info', spuRes.context);
        this.dispatch('desc:data', spuRes.context.goods.goodsDetail);

        //图文详情tab
        this.dispatch('goods-detail:storeGoodsTabs', storeGoodsTabs);
        //tab关联内容
        if (spuRes.context.goodsTabRelas) {
          this.dispatch(
            'goods-detail:storeGoodsTabContent',
            spuRes.context.goodsTabRelas
          );
        }
        this._initProps(spuRes.context.goods.cateId);
        this._initBrand(spuRes.context.goods.brandId);
        this.dispatch('goods-detail: loading');
      });
      this.fetchBaseConfig();
    } else {
      msg.emit('router: replace', {
        routeName: 'GoodsEmpty'
      });
    }
  };

  /**
   * 初始化属性信息
   */
  _initProps = async (cateId) => {
    if (cateId) {
      const goodsPropsRes = await webApi.fetchPropList(cateId);
      if (goodsPropsRes.code == config.SUCCESS_CODE) {
        this.dispatch('goods-detail:props', fromJS(goodsPropsRes.context));
      }
    }
  };

  /**
   * 初始化品牌信息
   */
  _initBrand = async (brandId) => {
    if (brandId) {
      const { code, context } = await webApi.fetchBrand(brandId);
      if (code == config.SUCCESS_CODE) {
        this.dispatch('goods-detail:brand', fromJS(context));
      }
    }
  };

  /**
   * 移除/加入 收藏
   * @param status
   * @param id
   */
  changeFollow = async (status, id) => {
    let res = {};
    if (status) {
      res = await webApi.intoFollow(id);
    } else {
      res = await webApi.outFollow(id);
    }
    if (res.code == 'K-000000') {
      this.dispatch('goods-detail: follow', status);
    } else {
      msg.emit('app:tip', res.message);
    }
  };

  startPlay = () => {
    this.dispatch('goods-detail:startPlay');
  };

  //关闭视频
  closeVideo = () => {
    this.dispatch('goods-detail:closeVideo');
  };

  //视频暂停
  pauseVideo = () => {
    this.dispatch('goods-detail:pauseVideo');
  };

  //视频播放
  playVideo = () => {
    this.dispatch('goods-detail:playVideo');
  };

  //图文详情tab切换
  changeTabKey = (index) => {
    this.dispatch('goods-detail:changeTabKey', index);
  };

  /**
   * 检查开店礼包有效状态
   */
  verify = async (id) => {
    const { code, context } = await webApi.verify(id);
    if (code != config.SUCCESS_CODE) {
      Confirm({
        text: '很抱歉，商品已失效,请重新选择',
        okBtn: '确定',
        confirmCb: () =>
          msg.emit('router: goToNext', {
            routeName: 'UserCenter'
          })
      });
      return false;
    }
    return true;
  };

  /**
   * 立即购买
   */
  immediateBuy = async (id) => {
    // 检查开店礼包有效状态
    if (!(await this.verify(id))) {
      return;
    }
    const { code } = await webApi.immediateBuy(id);
    if (code === config.SUCCESS_CODE) {
      msg.emit('router: replace', {
        routeName: 'OrderConfirm'
      });
      window.y = '';
    } else {
      Confirm({
        text: '很抱歉，商品已失效,请重新选择',
        okBtn: '确定',
        confirmCb: () =>
          msg.emit('router: goToNext', {
            routeName: 'UserCenter'
          })
      });
    }
  };
}
