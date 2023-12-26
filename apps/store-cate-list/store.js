import { fromJS } from 'immutable';
import { Store, msg } from 'plume2';
import { myPvUvStatis } from 'wmkit/wm_sta';
import CateActor from './actor/cate-actor';
import * as webApi from './webapi';

export default class AppStore extends Store {
  bindActor() {
    return [new CateActor()];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  /**
   * 初始化分类数据
   */
  init = async (id) => {
    const { code, context } = await webApi.getAllCates(id);
    if (code === 'K-000000') {
      const storeRes = await webApi.getStoreInfo(id);
      if (storeRes.code == 'K-000000') {
        /**店铺pv/uv埋点*/
        myPvUvStatis('StoreCateList', null, storeRes.context.companyInfoId);
        this.dispatch('cateActor:init', {
          cateList: fromJS(context),
          storeId: id
        });
      } else {
        msg.emit('store-close:visible', true);
      }
    }
  };
}
