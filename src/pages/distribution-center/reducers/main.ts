import { Command } from '../constant';
import _ from 'lodash';
import { IMainReducer } from '../types';
import { Action } from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,

  // 显示在会员中心的数据
  customerInfo: {},
  // 分销员信息
  distributor: {},
  // 分销设置信息
  distributeSetting: {},
  // 邀请人信息
  inviteInfo: {},
  // 会员余额
  customerBalance: {},
  // 分销员昨天销售业绩
  yesterdayPerformance: {},
  // 分销员本月销售业绩
  monthPerformance: {},
  // 我的客户 - 邀新人数
  inviteCustomer: {},
  // 热销前十分销商品
  hotGoodsList: [],
  // 分享赚选中的sku
  checkedSku: {},
  // 分享弹出显示与否
  shareVisible: false,
  // 分享赚弹出
  goodsShareVisible: false,
  // 分享赚弹出
  shareModalVisible: false,
  addSelfShop: true,
  // 消息数量
  noticeNum: 0,
  preferentialNum: 0,
};

export default function main(
  state = INITIAL_STATE,
  action: Action
): IMainReducer {
  const { type, payload } = action;

  return produce<IMainReducer>(state, (draftState) => {
    switch (type) {
      //通用改变数据
      case Command.commonChange:
        return immerUtil.commonChange(draftState, { ...payload, key: 'main' });

      //初始化
      case Command.init:
        draftState.isReady = true;
        for (let propKey in payload.main) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = payload.main[propKey];
        }
        return draftState;

      //重置
      case Command.clean:
        for (let propKey in INITIAL_STATE) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = INITIAL_STATE[propKey];
        }
        return draftState;

      case Command.saveCheckedSku:
        draftState.checkedSku = payload;
        return draftState;

      case Command.changeAddSelfShop:
        draftState.addSelfShop = !draftState.addSelfShop;
        return draftState;

      case Command.setAddSelfShop:
        draftState.addSelfShop = payload;
        return draftState;

      //切换显示分享赚弹框
      case Command.toggleGoodsShare:
        draftState.goodsShareVisible = payload;
        return draftState;

      //切换显示分享赚弹框
      case Command.toggleImgShare:
        draftState.shareModalVisible = payload;
        return draftState;
    }
  });
}
