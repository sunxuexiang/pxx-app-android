import {createSelector} from 'reselect';
import {IAllReducerProps} from './types';

export function store2Props({srcPagesFlashSaleMain}: any): IAllReducerProps {
  return {
    main: srcPagesFlashSaleMain,
  };
}

//衍生数据使用请参考:  https://github.com/reduxjs/reselect
