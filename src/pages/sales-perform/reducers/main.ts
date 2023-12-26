import { Command } from '../constant';
import { IMainReducer } from '../types';
import { Action } from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,

  salesTab: 'day',

  dateTab: '0',

  // 选择的月份
  month: null,
  // 是否显示月份下拉
  monthFlag: false,

  // 销售业绩数据
  saleData: {
    dataList: [],
    totalCommission: 0,
    totalSaleAmount: 0
  },

  // 销售业绩弹框状态
  ruleFlag: false,

  // 销售业绩说明
  rule: '',

  // 月份下拉数据
  monthData: []
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

      //改变销售业绩列表
      case Command.changeSalesList:
        draftState.saleData = payload.main.saleData;
        return draftState;

      //重置
      case Command.clean:
        for (let propKey in INITIAL_STATE) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = INITIAL_STATE[propKey];
        }
        return draftState;
    }
  });
}
