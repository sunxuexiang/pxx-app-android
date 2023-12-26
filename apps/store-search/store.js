import { Keyboard } from 'react-native';
import { msg, Store } from 'plume2';
import { fromJS } from 'immutable';
import * as WMkit from 'wmkit/kit';
import { config } from 'wmkit/config';
import { myPvUvStatis } from 'wmkit/wm_sta';

import * as webapi from './webapi';
import SearchActor from './actor/search-actor';

export default class AppStore extends Store {
  bindActor() {
    return [new SearchActor()];
  }

  constructor(props) {
    super(props);
    if (__DEV__) {
      //debug
      window._store = this;
    }
  }

  init = async (id) => {
    // 只有登录后,才可以查询 店铺搜索历史
    if (WMkit.isLoginOrNotOpen()) {
      const res = await webapi.getHistory(id);
      if (res.code === config.SUCCESS_CODE) {
        const storeRes = await webapi.getStoreInfo(id);
        if (storeRes.code == 'K-000000') {
          /**店铺pv/uv埋点*/
          myPvUvStatis('StoreSearch', null, storeRes.context.companyInfoId);
          this.dispatch('search:history', fromJS(res.context).reverse());
        } else {
          msg.emit('store-close:visible', true);
        }
      }
    }
  };

  /**
   * 清除搜索记录
   * @returns {Promise<void>}
   */
  clearHistory = async (id) => {
    if (WMkit.isLoginOrNotOpen()) {
      // tab当前选中的是商品还是商家
      const res = await webapi.clearHistory(id);
      if (res.code === config.SUCCESS_CODE) {
        this.dispatch('search:history', fromJS([]));
      }
    }
  };

  /**
   * queryString变化
   * @param queryString
   */
  handleQueryString = (queryString) => {
    this.dispatch('search:queryString', queryString.trim());
  };

  /**
   * 跳转商品列表
   */
  goSearch = (storeId) => {
    // 收起键盘
    Keyboard.dismiss();
    const queryString = this.state().get('queryString');
    const showGoBack = true;
    if (queryString.trim() === '') {
      // 不带搜索参数跳转商品列表页
      msg.emit('router: goToNext', {
        routeName: 'StoreGoodsList',
        showGoBack,
        storeId
      });
    } else {
      if (WMkit.isLoginOrNotOpen()) {
        // 处理历史搜索记录
        webapi.addHistory({ queryString, storeId });
      }
      // 带搜索参数跳转商品列表页
      msg.emit('router: goToNext', {
        routeName: 'StoreGoodsList',
        queryString,
        showGoBack,
        storeId
      });
      msg.emit('router: refreshRoute', {routeName: 'StoreGoodsList'});
    }
    
  };
}
