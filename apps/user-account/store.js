/**
 * Created by feitingting on 2017/9/12.
 */
import { Store, msg } from 'plume2';
import UserAccountActor from './actor/user-account';
import * as webapi from './webapi';
export default class AppStore extends Store {
  bindActor() {
    return [new UserAccountActor()];
  }

  init = async () => {
    const { context } = await webapi.fetchAccountList();
    this.transaction(() => {
      this.dispatch('customer:accountList', context);
    });
  };

  /**
   * 删除指定的银行账户信息
   * @param accountId
   */
  deleteAccount = async (accountId) => {
    const { code } = await webapi.deleteAccountById(accountId);
    if (code == 'K-000000') {
      msg.emit('app:tip', '删除成功');
      await this.init();
    }
  };

  /**
   * 添加银行账户
   */
  addAccount = () => {
    const accountList = this.state().get('accountList');
    if (accountList.length > 5 || accountList.length == 5) {
      msg.emit('app:tip', '最多只能添加5条银行账户信息');
    } else {
      msg.emit('router: goToNext', {
        routeName: 'UserAccountEdit',
        add: true,
        accountId: '-1'
      });
    }
  };

  /**
   * 重新加载
   */
  refresh = () => {
    this.dispatch('customer: refresh');
  };
}
