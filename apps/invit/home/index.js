import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StoreProvider } from 'plume2';

import AppStore from './store';
import InvitBanner from './components/invit-banner';
import InvitList from './components/invit-list';
import DetailDesc from './components/detail-desc';
import InvitPop from './components/invit-pop';

import Header from 'wmkit/header';
import WmListView from 'wmkit/list-view/index';
import WMEmpty from 'wmkit/empty';

/**
 * 商品列表模块
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class Home extends React.Component {
  store: AppStore;

  UNSAFE_componentWillMount() {
    this.store.init();
  }

  render() {
    const detailVisible = this.store.state().get('detailVisible');
    const invitPop = this.store.state().get('invitPop');
    let fetchFriends = this.store.fetchFriends;
    const listViewProps = {
      url: '/customer/page-invite-customer',
      isPagination: true,
      renderRow: (item, index) => {
        return <InvitList friend={item} index={index} key={item.id} />;
      },
      renderEmpty: () => (
        <WMEmpty
          emptyImg={require('./img/list-none.png')}
          desc="您还没有邀请好友哦"
        />
      ),
      onDataReached: (res) => fetchFriends(res),
      keyProps: 'recordId'
    };
    return (
      <View style={styles.container}>
        <Header title="邀请好友" />
        <InvitBanner />
        <View style={styles.inviteList}>
          <WmListView {...listViewProps} />
        </View>

        {/* 详细说明 */}
        {detailVisible && <DetailDesc />}
        {/* 邀请好友 */}
        {invitPop && <InvitPop />}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  inviteList: {
    marginTop: 12,
    backgroundColor: '#fafafa'
  }
});
