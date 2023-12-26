import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps } from '../types';
import Store from '@/redux/store';
import { getReducerData } from '@/redux/store';
import api from 'api';
import { extraPathsValue } from '@/redux/util';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments)
      });
    },

    //存储方法体
    async toRefresh(param) {
      dispatch({
        type: Command.toRefresh,
        payload: param
      });
    },

    //倒计时结束处理，执行之前保存的方法体
    async endHandle() {
      Store.getState().groupOrderListMain.toRefresh();
    }
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('groupOrderListMain')
  };
}
