import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import Friend from './friend';
import WmListView from 'wmkit/list-view/index';
import WMEmpty from 'wmkit/empty';

type IFriendListProps = T.IProps & T.IFriendListProps;

@connect<Partial<IFriendListProps>, T.IFriendListState>(
  store2Props,
  actions
)
export default class FriendList extends React.Component<
  Partial<IFriendListProps>,
  T.IFriendListState
> {
  constructor(props: IFriendListProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: { action },
      main: { tab, url }
    } = this.props;
    console.log('tab', tab);
    let tipMsg = '您还没有邀请好友哦';
    // 分页查询我邀请的客户url
    let keyProps = 'recordId';
    if ('2' == tab) {
      // 分页查询我的有效邀请客户url
      keyProps = 'recordId';
      tipMsg = '您还没有有效邀新哦';
    } else if ('3' == tab) {
      // 分页查询我的客户url
      tipMsg = '您还没有顾客哦';
      keyProps = 'customerId';
    }
    const listViewProps = {
      loadingStyle: {marginTop: 200},
      url: url,
      params: { tab: tab },
      columnWrapperStyle: {},
      isPagination: true,
      renderRow: (friend) => {
        return <Friend friend={friend} />;
      },
      renderEmpty: () => (
        <WMEmpty
          emptyImg={require('../img/list-none.png')}
          // style={{ width: 200, height: 200 }}
          desc={tipMsg}
        />
      ),
      onDataReached: (res) => action.fetchFriends(res),
      keyProps: keyProps
    };

    return <WmListView {...listViewProps} />;
  }
}

const styles = StyleSheet.create({
  friendList: {}
});
