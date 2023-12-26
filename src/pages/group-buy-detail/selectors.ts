import {createSelector} from 'reselect';
import {IAllReducerProps} from './types';

export function store2Props({
  groupBuyDetailActivity,

  groupBuyDetailGoods,

  groupBuyDetailNotice,

  groupBuyDetailOtherGroup,
}: any): IAllReducerProps {
  return {
    activity: groupBuyDetailActivity,

    goods: groupBuyDetailGoods,

    notice: groupBuyDetailNotice,

    otherGroup: groupBuyDetailOtherGroup,
  };
}

//衍生数据使用请参考:  https://github.com/reduxjs/reselect
