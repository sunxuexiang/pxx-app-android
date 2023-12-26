import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Header } from 'wmkit';
import { msg, StoreProvider } from 'plume2';
import EnterpriseApprovalInfo from './components/enterprise-approval-info';

import AppStore from './store';


@StoreProvider(AppStore, { debug: __DEV__ })
export default class EnterpriseApproval extends React.Component{
  store;

  componentDidMount() {
    this.store.init();
  }

  render() {

    return (
      <View style={styles.container}>
        <Header
          title="企业会员认证"
          onLeftMenuPress={() =>
            msg.emit('router: goToNext', {routeName: 'UserCenter'})
          }
        />
        <EnterpriseApprovalInfo/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  }
});
