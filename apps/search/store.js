import { Keyboard } from 'react-native';
import { msg, Store } from 'plume2';
import { fromJS } from 'immutable';
import * as WMkit from 'wmkit/kit';
import { config } from 'wmkit/config';

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

  init = (initKey,queryString) => {
    this.getHistory();
    this.getHotSearchList();
    if(initKey&&initKey==='home'){
      this.setPrewords(queryString);
    }else{
      this.setPrewords();
    }
    this.getAssociationalWord('');
  };

  /**
   * 查询搜索历史
   * @returns {Promise<void>}
   */
  getHistory = async () => {
    if (WMkit.isLoginOrNotOpen()) {
      // tab当前选中的是商品还是商家
      const key = this.state().get('key');
      if (key === 'goods'|| key === 'special') {
        //查询商品历史
        const res = await webapi.getHistory();
        if (res.code === config.SUCCESS_CODE) {
          this.dispatch('search:history', fromJS(res.context).reverse());
        }
      } else if (key === 'supplier') {
        // 查询商家历史
        const res = await webapi.getStoreHistory();
        if (res.code === config.SUCCESS_CODE) {
          this.dispatch('search:history', fromJS(res.context).reverse());
        }
      } else if (key === 'distribute') {
        //查询分销员选品搜索历史
        const res = await webapi.getDistributeHistory();
        if (res.code === config.SUCCESS_CODE) {
          this.dispatch('search:history', fromJS(res.context).reverse());
        }
      } else if (key === 'groupon') {
        //查询拼团商品搜索历史
        const res = await webapi.getGrouponHistory();
        if (res.code === config.SUCCESS_CODE) {
          this.dispatch('search:history', fromJS(res.context).reverse());
        }
      } else if (key === 'distributeGoods') {
        //查询分销推广商品搜索历史
        const res = await webapi.getDistributeGoodsHistory();
        if (res.code === config.SUCCESS_CODE) {
          this.dispatch('search:history', fromJS(res.context));
        }
      }
    }
  };
  //获取热搜
  getHotSearchList = async () => {
    const key = this.state().get('key');
    if (key === 'goods' || key === 'special') {
      const result = await webapi.getHotSearchList();
      this.dispatch('search:hot', result.context.popularSearchTermsVO);
    }
  };
  /**
   * 设置预置词
   *
   */
  setPrewords = async (text) => {
    if(text){
    this.dispatch('searcher:setPre', text);
    return
    }
    const result = await webapi.getPresetSearchTerms();
    let preWords =
      result?.context?.presetSearchTermsVO[0]?.presetSearchKeyword || '';
    this.dispatch('searcher:setPre', preWords);
  };

  /**
   * 添加搜索记录
   * @param {string} queryString
   */
  addHistory = async (queryString) => {
    if (WMkit.isLoginOrNotOpen()) {
      const key = this.state().get('key');
      if (key === 'goods' || key === 'special') {
        //如果是添加商品历史
        await webapi.addHistory(queryString);
      } else if (key === 'supplier') {
        //如果是添加店铺历史
        await webapi.addStoreHistory(queryString);
      } else if (key === 'distribute') {
        //添加 分销员选品 搜索历史
        await webapi.addDistributeHistory(queryString);
      } else if (key === 'groupon') {
        //添加 拼团商品 搜索历史
        await webapi.addGrouponHistory(queryString);
      } else if (key === 'distributeGoods') {
        //添加 分销推广商品 搜索历史
        await webapi.addDistributeGoodsHistory(queryString);
      }
    }
  };

  /**
   * 清除搜索记录
   * @returns {Promise<void>}
   */
  clearHistory = async () => {
    if (WMkit.isLoginOrNotOpen()) {
      // tab当前选中的是商品还是商家
      const key = this.state().get('key');
      if (key === 'goods' || key==='special') {
        //如果是清除商品历史
        const res = await webapi.clearHistory();
        if (res.code === config.SUCCESS_CODE) {
          this.dispatch('search:history', fromJS([]));
        }
      } else if (key === 'supplier') {
        //如果是清除店铺历史
        const res = await webapi.clearStoreHistory();
        if (res.code === config.SUCCESS_CODE) {
          this.dispatch('search:history', fromJS([]));
        }
      } else if (key === 'distribute') {
        //清除分销员选品搜索历史
        const res = await webapi.clearDistributeHistory();
        if (res.code === config.SUCCESS_CODE) {
          this.dispatch('search:history', fromJS([]));
        }
      } else if (key === 'groupon') {
        //清除拼团商品搜索历史
        const res = await webapi.clearGrouponHistory();
        if (res.code === config.SUCCESS_CODE) {
          this.dispatch('search:history', fromJS([]));
        }
      } else if (key === 'distributeGoods') {
        //清除分销推广商品搜索历史
        const res = await webapi.clearDistributeGoodsHistory();
        if (res.code === config.SUCCESS_CODE) {
          this.dispatch('search:history', fromJS([]));
        }
      }
    }
  };

  /**
   * queryString变化
   * @param queryString
   */
  handleQueryString = (queryString) => {
    if(queryString) {
      //获取联想词
      this.getAssociationalWord(queryString);
    }
    this.dispatch('search:queryString', queryString);
  };

  /**
   * 获取联想词
   *
   */

  getAssociationalWord = async (queryString) => {
    let result = await webapi.likeAssociationalWord({
      associationalWord: queryString
    });
    result=result.context.associationLongTailLikeWordList;
    // 去重
    var hash = {};
    result = result.reduce(function(item, next) {
      hash[next.associationalWord] ? '' : hash[next.associationalWord] = true && item.push(next);
      return item
    }, [])
    this.dispatch(
      'searcher:associationalWordList',
      result
    );
  };

  /**
   * 跳转商品列表
   */
  goSearch = () => {
    // 收起键盘
    Keyboard.dismiss();
    // 搜索词
    const queryValue = this.state().get('queryString');
    // 预置搜索词
    const preKeywords = this.state().get('preKeywords');
    // 搜索词不为空则搜索字符为搜索词，否则为预置词
    let queryString = queryValue ? queryValue : preKeywords;
    const key = this.state().get('key');
    // 根据搜索关键字
    let requestUrl = '';
    let showGoBack = true;
    if (key === 'supplier') {
      // 不带搜索参数跳转商家列表页
      requestUrl = 'StoreList';
      showGoBack = false;
    } else if (key === 'goods') {
      // 不带搜索参数跳转商品列表页
      requestUrl = 'GoodsListWithoutBottom';
    } else if (key === 'distribute') {
      //跳转分销员选品页面
      requestUrl = 'ShopGoods';
    } else if (key === 'groupon') {
      // 跳转 拼团活动商品 搜索页面
      requestUrl = 'GrouponSearchList';
      queryString = queryValue ? queryValue :"爱拼才会赢"
      showGoBack = false;
    } else if (key === 'distributeGoods') {
      // 跳转 分销推广商品 搜索页面
      requestUrl = 'DistributionGoodsList';
    } else if (key === 'special'){
      requestUrl = 'SpecialGoodsListWithoutBottom';
      queryString = queryString?queryString:"NONE"
    }

    if (!queryString) {
      msg.emit('router: goToNext', {
        routeName: requestUrl,
        showGoBack
      });
      return;
    }

    // 处理历史搜索记录
    this._handleSearchHistory(queryString);

    // 带搜索参数跳转
    msg.emit('router: goToNext', {
      routeName: requestUrl,
      queryString,
      showGoBack
    });
    msg.emit('router: refreshRoute', { routeName: requestUrl });
  };

  /**
   * 处理搜索历史
   * @param queryString
   * @private
   */
  _handleSearchHistory = (queryString) => {
    this.addHistory(queryString);
  };

  /**
   * tab切换
   */
  tabActive = async (tabKey) => {
    this.dispatch('tab:history', tabKey);
    // 先清除搜索纪录，防止后端响应时间过长导致tab已切换，但是搜索内容还没切换
    this.dispatch('search:history', fromJS([]));
    this.getHistory();
    this.dispatch('search:queryString', '');
    if (tabKey == 'supplier') {
      this.dispatch('searcher:associationalWordList', []);
    }
  };
}
