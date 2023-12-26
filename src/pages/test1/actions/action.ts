import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    /**
         * 
              普通条件查询可以走,commonChange
              
         */
    async modifySearch(
      param,
      options: {
        isQuery: boolean;
        isResetPage: boolean;
      } = {isQuery: true, isResetPage: false},
    ) {
      dispatch({type: Command.modifyRequest, payload: param});
      //修改完直接查询;
      if (options.isQuery) {
        await this.query(options.isResetPage);
      }
    },

    /**
     * 查询下一页
     */
    async nextPage() {
      let {request} = getData().main;
      request.pageNum = request.pageNum + 1;
      dispatch({type: Command.modifyRequest, payload: request});
      await this.query();
    },

    /**
     * 以当前查询条件查询
     */
    async query(isResetPage: boolean = false) {
      if (isResetPage) {
        await dispatch({type: Command.modifyRequest, payload: {pageNum: 0}});
      }

      let {request} = getData().main;
      //TODO 接口缺失
      // let {} = await api..XXapi();

      dispatch({
        type: Command.queryResult,
        payload: {
          total: 0,
          list: [],
        },
      });
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('test1Main'),
  };
}
