import { Store, msg } from 'plume2';
import { config } from 'wmkit/config';
import * as webapi from './webapi';
import StoreActor from './actor/store-actor';

export default class AppStore extends Store {
  bindActor() {
    return [new StoreActor()];
  }

  constructor(props) {
    super(props);
    if (__DEV__) {
      //debug
      window._store = this;
    }
  }

  /**
   * 初始化
   */
  init = async () => {
    //获取优惠券分类
    let storeBagsRes = await webapi.storeBags();
    //分销开关打开且招募开关打开且为购买升级，才能进入该页面
    if (
      storeBagsRes.code === config.SUCCESS_CODE &&
      storeBagsRes.context.applyFlag == 1 &&
      storeBagsRes.context.applyType == 0
    ) {
      let recruitDesc = storeBagsRes.context.recruitDesc;
      let goodsInfos = storeBagsRes.context.goodsInfos;
      let recruitImg = storeBagsRes.context.recruitImg;
      this.dispatch('InvitActor:getGoodsList', goodsInfos);
      this.dispatch('InvitActor:getDetailData', recruitDesc);
      this.dispatch('InvitActor:getDetailImg', recruitImg);
    } else {
      // 返回首页
        () => msg.emit('router: goToNext', { routeName: 'Main' });
    }
  };

  /**
   * 打开详情弹层
   */
  _openDetail = async (val) => {
    this.dispatch('InvitActor:changeDetail', val);
  };

  /**
   * 关闭详情弹层
   */
  closeLayer = async (val) => {
    this.dispatch('InvitActor:changeDetail', val);
  };
}
