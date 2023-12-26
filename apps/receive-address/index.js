/**
 * Created by feitingting on 2017/8/30.
 */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { msg, StoreProvider } from 'plume2';
import Header from 'wmkit/header';

import AppStore from './store';
import ReceiveAddressList from './components/list';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class UserReceiveAddress extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    msg.on('address-list:refresh', this._refresh);
    this.store.init();
  }

  componentWillUnMount() {
    msg.off('address-list:refresh', this._refresh);
  }

  /**
   * 更新添加按钮的展示状态
   */
  componentDidUpdate() {
    const state = this.props.route;
    const showAdd = state && state.params && state.params.showAdd;
    const shouldShow = this.store.state().get('addressList').count() < 20;
    if (showAdd !== shouldShow) {
      msg.emit('router: setParams', {
        showAdd: shouldShow
      });
    }
  }

  render() {
    // 是否展示添加按钮
    const state = this.props.route;
    const whereFrom = state && state.params && state.params.whereFrom;
    return (
      <View style={styles.container}>
        <Header title="收货地址" onLeftMenuPress={()=>{msg.emit('router: back');msg.emit('purchase:init');}}/>
        <ReceiveAddressList whereFrom={whereFrom} />
      </View>
    );
  }

  /**
   * 刷新列表数据
   * @private
   */
  _refresh = () => {
    this.store.init();
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  }
});
