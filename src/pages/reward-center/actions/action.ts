import { Command } from '../constant';
import { Dispatch } from 'typings';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments)
      });
    }
  };
  return action;
};
