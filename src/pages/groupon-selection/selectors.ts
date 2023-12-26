import { IAllReducerProps } from './types';

export function store2Props({ grouponSelectionMain }: any): IAllReducerProps {
  return {
    main: grouponSelectionMain
  };
}

//衍生数据使用请参考:  https://github.com/reduxjs/reselect
