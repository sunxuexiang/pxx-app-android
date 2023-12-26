import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import { extraPathsValue } from '@/redux/util';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments)
      });
    },

    /**
     * 选中拼团分类事件
     *  @param {string} cateId 选中的分类ID
     *  @param {number} defaultCate 是否是精选拼团
     *  @param {number} index 选中的分类ID索引
     */

    chooseGrouponCate(cateId: string, defaultCate: number, index: number) {
      dispatch({
        type: Command.chooseCate,
        payload: {
          cate: {
            cateId: cateId,
            defaultCate: defaultCate,
            index: index,
            toRefresh: true
          }
        }
      });
    },

    /**
     * 对请求数据的处理
     * @param result
     */
    dealData(result) {
      const { context } = result;
      if (
        context['grouponCenterVOList'] &&
        context['grouponCenterVOList']['first']
      ) {
        dispatch({
          type: Command.init,
          payload: {
            main: {
              toRefresh: false
            }
          }
        });
      }
    }
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('grouponSelectionMain')
  };
}
