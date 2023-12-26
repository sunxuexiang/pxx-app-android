import React from 'react';
import { msg, StoreProvider } from 'plume2';
import AppStore from './store';
import EmailList from './component/email-list';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class UserEmail extends React.Component {
  store;

  componentDidMount() {
    msg.on('email-list:refresh', this._refresh);
    this.store.init();
  }

  componentWillUnMount() {
    msg.off('email-list:refresh', this._refresh);
  }

  render() {
    return <EmailList />;
  }

  /**
   * 刷新列表数据
   * @private
   */
  _refresh = () => {
    this.store.init();
  };
}
