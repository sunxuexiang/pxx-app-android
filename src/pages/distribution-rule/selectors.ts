import {IAllReducerProps} from './types';

export function store2Props({distributionRuleMain}: any): IAllReducerProps {
  return {
    main: distributionRuleMain,
  };
}

//衍生数据使用请参考:  https://github.com/reduxjs/reselect
