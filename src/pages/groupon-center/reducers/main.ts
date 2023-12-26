import { Command } from '../constant';
import { IMainReducer } from '../types';
import { Action } from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,

  // 拼团广告
  grouponAdvert: '',

  // 拼团分类
  grouponCates: [],

  // 热门推荐
  grouponHotList: [],

  // 搜索关键字
  keyWords: '',

  // 选择的拼团分类ID
  chooseCateId: '',

  // 是否是精选分类
  sticky: true,

  // 选中的拼团分类索引
  chooseCateIndex: 0,

  // 是否刷新列表
  toRefresh: false
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

      // 选中拼团分类事件
      case Command.chooseCate:
        let cateInfo = payload.cate;
        if (cateInfo.cateId !== draftState.chooseCateId) {
          draftState.chooseCateIndex = cateInfo.index;
          draftState.keyWords = '';
          // 精选分类下的设值
          if (cateInfo.defaultCate == 1) {
            // 精选 = true
            draftState.chooseCateId = '';
            draftState.sticky = true;
          } else {
            // 精选 = false
            draftState.chooseCateId = cateInfo.cateId;
            draftState.sticky = false;
          }
        }
        return draftState;
    }
  });
}
