import { IAllReducerProps } from './types';

export function store2Props({evaluateSubmitMain}: any): IAllReducerProps {
  return {
    main: evaluateSubmitMain,
  };
}

//衍生数据使用请参考:  https://github.com/reduxjs/reselect
