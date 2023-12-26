/**
 * Created by hht on 2017/9/4.
 */
import { msg, Store } from 'plume2';
import { fromJS } from 'immutable';
import * as evaluateWebapi from 'wmkit/biz/evaluateIs-show-webapi';

import * as webapi from './webapi';
import * as VAS from 'wmkit/vas';
import { cache } from 'wmkit/cache';
import { config } from 'wmkit/config';


import UserStoreActor from './actor/user-store-actor';
import AsyncStorage from '@react-native-community/async-storage';

export default class AppStore extends Store {
  bindActor() {
    return [new UserStoreActor()];
  }

  /**
   * 我的收藏初始化数据
   */
  init = async (toRefresh) => {
    // const goodsInfo = await this.getGoodsFollowList(1 , 20);
    this.getIfHasInvalid();
    evaluateWebapi
      .isShow()
      .then((result) => this.dispatch('userStore:isShow', result));
    this.transaction(() => {
      if (toRefresh) {
        msg.emit('router: setParams', {
          isEdit: false
        });
        this.dispatch('userStore:setRefresh', true);
      }
      this.dispatch('userStore:changeEditStatus', false);
      this.dispatch('userStore:setCheckedItems', []);
      this.dispatch('userStore:getGoodsList', null);
    });
    await this._initVAS();
  };

    // 判断骨架屏是否展示
    isSkeletonShow = (flag) => {
      this.dispatch('goodSkeleton:show', flag);
    };

  /**
   * 增值服务信息
   */
  _initVAS = async () => {
    // 企业购业务-开关|配置信息
    // 获取登录信息
    const loginData = await AsyncStorage.getItem(cache.LOGIN_DATA);
    this.dispatch('goods-list:setIepSwitch', await VAS.checkIepAuth());
    this.dispatch('customer:setCustomerType', JSON.parse(loginData).enterpriseCheckState);
  };

  initFollowList = ({ code, context, message }) => {
    if (code == config.SUCCESS_CODE) {
      this.getIfHasInvalid();
      const nowGoodsJson = this.state()
        .get('goodsJson')
        .toJS(); //之前的收藏JSON
      if (nowGoodsJson['content']) {
        context['goodsInfos']['content'] = nowGoodsJson['content'].concat(
          context['goodsInfos']['content']
        );
      }
      if (context['goodsInfos']['first']) {
        this.dispatch('userStore:setRefresh', false);
      }
      this.transaction(() => {
        this.dispatch('userStore:getGoodsList', context);
        this.dispatch('userStore:checkAllStatus', false);
      });
    } else {
      msg.emit('app:tip', message);
    }
  };

  /**
   * 修改isEdit状态
   * @param isEdit
   */
  changeEditStatus = (isEdit) => {
    this.dispatch('userStore:changeEditStatus', isEdit);
  };

  /**
   * 获取收藏商品数据 -- 使用了WMListView，暂时不需要自主调用
   * @returns {Promise.<null>}
   */
  getGoodsFollowList = async (current, pageSize) => {
    const { context, code, message } = await webapi.getGoodsFollowList(
      current,
      pageSize
    );
    if (code == config.SUCCESS_CODE) {
      return context;
    } else {
      msg.emit('app:tip', message);
      return null;
    }
  };

  /**
   * 获取是否有失效商品
   * @returns {Promise.<null>}
   */
  getIfHasInvalid = async () => {
    const { context, code, message } = await webapi.invalidGoodsFollow();
    if (code == config.SUCCESS_CODE) {
      this.dispatch('userStore:ifHasInvalid', context);
    } else {
      msg.emit('app:tip', message);
    }
  };

  /**
   * 勾选全部方法
   * @param checkAll
   */
  changeCheckAllStatus = (checkAll) => {
    let checkedItems = [];
    this.transaction(() => {
      if (checkAll) {
        //全部勾选，添加所有元素的id入store
        const totalItems = this.state().get('goodsJson');
        if (
          totalItems &&
          totalItems.get('content') &&
          totalItems.get('content').size > 0
        ) {
          totalItems
            .get('content')
            .toJS()
            .map((v) => {
              checkedItems.push(v['goodsInfoId']);
            });
        }
        checkedItems = [...new Set(checkedItems)];
        this.dispatch('userStore:checkAllStatus', checkAll);
        this.dispatch('userStore:setCheckedItems', checkedItems);
      } else {
        this.dispatch('userStore:checkAllStatus', checkAll);
        this.dispatch('userStore:setCheckedItems', checkedItems);
      }
    });
  };

  /**
   * 勾选单个元素
   * @param checked
   * @param id
   */
  checkSingleItem = (checked, id) => {
    let checkedItems = this.state()
      .get('checkedItems')
      .toJS();
    let followCount = this.state()
      .get('followCount');
    if (checked) {
      if (checkedItems.indexOf(id) == -1) {
        checkedItems.push(id);
      }
      if(checkedItems.length===followCount){
        this.dispatch('userStore:checkAllStatus', true);
      }
    } else {
      this.dispatch('userStore:checkAllStatus', false);
      checkedItems.splice(checkedItems.indexOf(id), 1);
    }
    this.dispatch('userStore:setCheckedItems', fromJS(checkedItems));
  };

  /**
   * 删除收藏
   */
  deleteFollows = async () => {
    let checkedItems = this.state()
      .get('checkedItems')
      .toJS();
    const { code, message } = await webapi.deleteGoodsFollow(checkedItems);
    if (code == config.SUCCESS_CODE) {
      msg.emit('app:tip', '删除成功');
      this.init(true);
    } else {
      msg.emit('app:tip', message);
    }
  };

  /**
   * 删除收藏
   */
  deleteSku = async (skuId) => {
    const { code, message } = await webapi.deleteGoodsFollow([skuId]);
    if (code == config.SUCCESS_CODE) {
      msg.emit('app:tip', '删除成功');
      this.init(true);
    } else {
      msg.emit('app:tip', message);
    }
  };

  /**
   * 清除失效商品
   * @returns {Promise.<void>}
   */
  deleteInvalidGoods = async () => {
    const { code, message } = await webapi.deleteInvalidGoodsFollow();
    if (code == config.SUCCESS_CODE) {
      msg.emit('app:tip', '清除成功');
      this.init(true);
    } else {
      msg.emit('app:tip', message);
    }
  };

  saveCheckedSku = (sku) => {
    this.dispatch('user-store:saveCheckedSku', fromJS(sku));
  };
}
