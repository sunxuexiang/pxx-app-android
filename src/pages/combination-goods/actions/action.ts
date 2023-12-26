import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import api from 'api';
import { extraPathsValue } from '@/redux/util';
import { List, fromJS, Map } from 'immutable';
import { msg } from 'plume2';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    async changeCheck(id) {
      const {
        main,
        main: { currId, combinationList },
      } = getData();

      const newIndex = combinationList.findIndex((item) => item.marketingSuitsGoodsInfoDetailVO.marketingId == id);
      const oldIndex = combinationList.findIndex((item) => item.marketingSuitsGoodsInfoDetailVO.marketingId == currId);

      if (id == currId) {
        let newList = fromJS(main).setIn(['combinationList', newIndex, 'isOpen'], !combinationList[newIndex].isOpen);
        await action.commonChange([{ paths: 'main.combinationList', value: newList.toJS().combinationList }]);
      } else {
        let newList = fromJS(main)
          .setIn(['combinationList', newIndex, 'isOpen'], true)
          .setIn(['combinationList', oldIndex, 'isOpen'], false);
        await action.commonChange([
          { paths: 'main.combinationList', value: newList.toJS().combinationList },
          { paths: 'main.currId', value: id },
        ]);
      }
    },
    /**
  * 组合购购买
  */
    async immediateBuy(id) {
      const res = await api.tradeBaseController.suitBuy({ marketingId: id });
      msg.emit('router: goToNext', {
        routeName: 'OrderConfirm'
      });
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('srcPagesCombinationGoodsMain'),
  };
}
