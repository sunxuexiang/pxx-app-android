import Store from '@/redux/store';
import { Command } from '../constant';
import { Dispatch } from 'typings';
import { getActionProxy } from '@/redux/action-util';
import api from 'api';
import AsyncStorage  from '@react-native-community/async-storage';
import * as WMkit from 'wmkit/kit';
import { config } from 'wmkit/config';
import { cache } from 'wmkit/cache';
import Fetch from 'wmkit/fetch';

import { msg } from 'plume2';
import moment from 'moment';
import Action from './action';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(gid) {
      //获取服务时间
      await this.queryServerTime();
      const res = await api.goodsBaseController.grouponDetailByGrouponNo(gid);
      //获取拼团信息
      const grouponDetails = res.grouponDetails;
      //如果团长的SKU在团实例goodsInfos里面不存在，直接进入错误页面
      if (
        res.grouponDetails &&
        res.goodsInfos.filter(
          (info) => info.goodsInfoId == grouponDetails.goodInfoId
        ).length == 0
      ) {
        msg.emit('router: replace', {
          routeName: 'GoodsEmpty'
        });
      } else {
        //存储团编号
        dispatch({
          type: Command.saveGrouponNo,
          payload: {
            grouponNo: gid
          }
        });
        //团详情
        dispatch({
          type: Command.initGrouponDetails,
          payload: {
            grouponDetails: grouponDetails
          }
        });
        //团长的skuId
        dispatch({
          type: Command.initGoodsInfoId,
          payload: {
            goodsInfoId: grouponDetails.goodInfoId
          }
        });
        //团活动
        dispatch({
          type: Command.initActivityInfo,
          payload: {
            grouponActivity: grouponDetails.grouponActivity
          }
        });
        //spu信息
        dispatch({
          type: Command.initGoods,
          payload: {
            goods: res.goods
          }
        });
        //sku信息
        dispatch({
          type: Command.initGoodsInfos,
          payload: {
            goodsInfos: res.goodsInfos
          }
        });
        //参团人员
        dispatch({
          type: Command.initCustomerVOList,
          payload: {
            customerVOList: grouponDetails.customerVOList
          }
        });
        //其他团信息
        dispatch({
          type: Command.grouponInstanceList,
          payload: {
            grouponInstanceList: res.grouponInstanceList
          }
        });
        //赋予skuId
        res.skuId = grouponDetails.goodInfoId;
        //spu信息
        dispatch({
          type: Command.initSpuContext,
          payload: {
            spuContext: res
          }
        });
        //loading
        dispatch({
          type: Command.init,
          payload: {}
        });
      }
    },

    async doGroup(grouponNo, goodsInfoId, status) {
      if (status == 4 || status == 5) {
        //已登录
        if (WMkit.isLogin()) {
          //先校验
          this.immediateJoin(grouponNo, goodsInfoId, status);
          //我要参团或者我也开个团
          //this.action.toggleSpecModal();
        } else {
          msg.emit('loginModal:toggleVisible', {
            callBack: () => {
              msg.emit('router: goToNext', {
                routeName: 'GroupBuyDetail',
                grouponNo: grouponNo
              });
            }
          });
        }
      }
      //邀请参团，弹出分享框
      if (status == 8) {
        this.action.toggleGroupShareModal();
      }
      //查看其它团购，跳转至拼团首页
      if (status == 2 || status == 7) {
        msg.emit('router: goToNext', { routeName: 'GrouponCenter' });
      }
    },

    async queryServerTime() {
      //获取服务时间
      const serverTime = await api.systemController.queryServerTime();
      //存储服务时间
      dispatch({
        type: Command.saveServerTime,
        payload: {
          serverTime: serverTime
        }
      });
    },

    async immediateJoin(grouponNo, goodsInfoId, status) {
      const loginData = await AsyncStorage.getItem(cache.LOGIN_DATA);
      const customerId = JSON.parse(loginData).customerId;
      //已登录,status==4,表示参团，status==5，表示开团
      Fetch('/groupon/vaildateGrouponStatusForOpenOrJoin', {
        method: 'POST',
        body: JSON.stringify({
          customerId: customerId,
          grouponNo: status == 5 ? null : grouponNo,
          goodsInfoId: goodsInfoId,
          openGroupon: status == 5
        })
      }).then((res) => {
        if (res.code != config.SUCCESS_CODE) {
          if (res.code == 'K-050402' || res.code == 'K-050403') {
            msg.emit('app:tip', '已参与该团!');
          }
          if (res.code == 'K-050401' || res.code == 'K-050404') {
            msg.emit('app:tip', res.message);
            //团状态改变了，要刷页面
            this.action.init(grouponNo);
          } else {
            msg.emit('app:tip', res.message);
          }
        } else {
          //弹出规格框
          if (status == 5) {
            //我要开团，存储的团号为空
            this.action.openSpecModal('');
          } else {
            this.action.openSpecModal(grouponNo);
          }
        }
      });
    },

    /**
     * 重置
     */
    async clean() {
      dispatch({ type: Command.clean });
    },

    async getGrouponLatestInstanceByActivityId(grouponActivityId) {
      Fetch('/groupon/latest/instance', {
        method: 'POST',
        body: JSON.stringify({
          grouponActivityId: grouponActivityId,
          //待成团
          grouponStatus: 1
        })
      }).then((res) => {
        //返回成功，且不是当前的团，且与上一次获取到的不一致
        if (
          res.code == config.SUCCESS_CODE &&
          res.context.grouponInstance &&
          res.context.grouponInstance.grouponNo !=
            Store.getState().groupBuyDetailActivity.grouponNo
        ) {
          dispatch({
            type: Command.grouponLatest,
            payload: res.context
          });
        } else {
          //获取失败，则置空
          dispatch({
            type: Command.grouponLatest,
            payload: {}
          });
        }
      });
    }
  };

  return { actions };
};
