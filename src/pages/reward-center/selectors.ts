import { IAllReducerProps } from './types';

export function store2Props({ rewardCenterMain }: any): IAllReducerProps {
  return {
    main: rewardCenterMain
  };
}

//衍生数据使用请参考:  https://github.com/reduxjs/reselect
