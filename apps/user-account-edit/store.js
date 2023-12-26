/**
 * Created by feitingting on 2017/9/12.
 */
import { msg, Store } from 'plume2';
import FormRegexUtil from 'wmkit/form/form-regex';
import { fromJS } from 'immutable';
import * as webapi from './webapi';
import UserAccountEditActor from './actor/user-account-edit';
import { NavigationActions } from '@react-navigation/compat';

export default class AppStore extends Store {
  bindActor() {
    return [new UserAccountEditActor()];
  }

  init = async (accountId) => {
    if (accountId) {
      const { code, context } = await webapi.fetchAccountById(accountId);
      if (code == 'K-000000') {
        this.dispatch('customer:account', fromJS(context));
      }
    }
  };

  doSave = async (accountId) => {
    const {
      customerBankName,
      customerAccountName,
      customerAccountNo,
    } = this.state()
      .get('account')
      .toJS();
    if (
      !FormRegexUtil(customerBankName, '开户行', {
        required: true,
        maxLength: 50,
      })
    ) {
      return;
    }
    if (
      !FormRegexUtil(customerAccountName, '账户名称', {
        required: true,
        maxLength: 50,
      })
    ) {
      return;
    }
    if (
      !FormRegexUtil(customerAccountNo, '账号', {
        required: true,
        maxLength: 30,
      })
    ) {
      return;
    }
    //-1表示是新增银行账户
    if (accountId == '-1') {
      const { code, message } = await webapi.insertAccountInfo(
        this.state()
          .get('account')
          .toJS(),
      );
      if (code == 'K-000000') {
        msg.emit('app:tip', '新增成功');
        // 通知银行列表刷新
        NavigationActions.back({
          routeName: 'UserAccount',
          params: { refresh: true },
        });
        msg.emit('account-list:refresh');
        // 返回上一页
        msg.emit('router: back');
      } else {
        msg.emit('app:tip', message);
      }
    } else {
      //修改（编辑）账户，将Id赋给对象
      this.dispatch('customer:accountId', accountId);
      const { code, message } = await webapi.updateAccountInfo(
        this.state()
          .get('account')
          .toJS(),
      );
      if (code == 'K-000000') {
        msg.emit('app:tip', '编辑成功');
        // 通知银行列表刷新
        NavigationActions.back({
          routeName: 'UserAccount',
          params: { refresh: true },
        });
        msg.emit('account-list:refresh');
        // 返回上一页
        msg.emit('router: back');
      } else {
        msg.emit('app:tip', message);
      }
    }
  };

  /**
   * 监控表单状态值变化
   * @param key
   * @param value
   */
  changeValue = (key, value) => {
    this.dispatch('accountEdit:setValue', { key: key, value: value });
  };
}
