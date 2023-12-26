import { IAllReducerProps } from './types';

export function store2Props({
  goodsDetailEvaluationListMain,
}: any): IAllReducerProps {
  return {
    main: goodsDetailEvaluationListMain,
  };
}

//衍生数据使用请参考:  https://github.com/reduxjs/reselect
