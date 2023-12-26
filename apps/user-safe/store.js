import { Store } from 'plume2';
import { config } from 'wmkit/config';
import { cache } from 'wmkit/cache';
import AsyncStorage from '@react-native-community/async-storage';
import UserSafeActor from './actor/user-safe-actor';
import actionType from './action-type';
import * as webapi from './webapi';

export default class AppStore extends Store {
  bindActor() {
    return [new UserSafeActor()];
  }

  /**
   * 初始化
   */
  init = async () => {
    const { code, context } = await webapi.fetchWxLoginStatus();
    if (code === config.SUCCESS_CODE) {
      this.dispatch(actionType.SET_WX_FLAG, context);
    }

    AsyncStorage.getItem(cache.LOGIN_DATA, (_err, result) => {
      this.dispatch(
        actionType.SET_ACCOUNT_NAME,
        JSON.parse(result).accountName
      );
    });
  };
}
