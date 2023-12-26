import { IAllReducerProps } from './types';

export function store2Props({ grouponCenterMain }: any): IAllReducerProps {
  return {
    main: grouponCenterMain
  };
}

//衍生数据使用请参考:  https://github.com/reduxjs/reselect
