import {createSelector} from 'reselect';
import {IAllReducerProps} from './types';

export function store2Props({test1Main}: any): IAllReducerProps {
  return {
    main: test1Main,
  };
}

//衍生数据使用请参考:  https://github.com/reduxjs/reselect
