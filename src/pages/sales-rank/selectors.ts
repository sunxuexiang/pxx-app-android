import {IAllReducerProps} from './types';

export function store2Props({salesRankMain}: any): IAllReducerProps {
  return {
    main: salesRankMain,
  };
}

//衍生数据使用请参考:  https://github.com/reduxjs/reselect
