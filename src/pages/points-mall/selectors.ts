import {createSelector} from 'reselect';
import {IAllReducerProps} from './types';

export function store2Props({pointsMallMain}: any): IAllReducerProps {
  return {
    main: pointsMallMain,
  };
}

//衍生数据使用请参考:  https://github.com/reduxjs/reselect
