import AsyncStorage from '@react-native-community/async-storage';
import { Store, msg } from 'plume2';
import AccountActor from './actor/account-actor';
import { config } from 'wmkit/config';
import { cache } from 'wmkit/cache';
import { fetchSellerAccounts } from './webapi';

export default class AppStore extends Store {
  bindActor() {
    return [new AccountActor()];
  }

  constructor(props) {
    super(props);
  }

  init = async () => {
    const { code, context, message } = await fetchSellerAccounts();
    if (code === config.SUCCESS_CODE) {
      this.dispatch('accountActor:init', context);
    } else {
      msg.emit('app:tip', message);
    }
  };

  /**
   * 选择收款账号
   */
  chooseAccount = async (account) => {
    let accountInfo = await AsyncStorage.getItem(cache.FILL_PAYMENT_INFO);
    accountInfo = JSON.parse(accountInfo);

    accountInfo.accountId = account.accountId;
    accountInfo.accountNm = account.bankName + account.bankNo; //银行名称+银行账号

    await AsyncStorage.setItem(
      cache.FILL_PAYMENT_INFO,
      JSON.stringify(accountInfo)
    );

    // 更新填写付款单页面的付款账号信息
    msg.emit('router: refreshRoute', { routeName: 'FillPayment' });
    // 返回填写付款单页面(必须使用返回的方式,不然用户点击返回会有重复的页面)
    msg.emit('router: back');
  };
}
