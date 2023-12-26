import React from 'react';
import { StyleSheet, View, Text, PixelRatio } from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';

import FriendList from './friend-list';
import main from '../reducers/main';

type IContentProps = T.IProps & T.IContentProps;

/**
 * tab
 */
const TAP = {
  1: '邀新人数',
  2: '有效邀新',
  3: '我的顾客'
};

@connect<Partial<IContentProps>, T.IContentState>(
  store2Props,
  actions
)
export default class Content extends React.Component<
  Partial<IContentProps>,
  T.IContentState
> {
  constructor(props: IContentProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: { action },
      main: { totalNum, tab }
    } = this.props;

    return (
      <View>
        <View>
          <View style={styles.friendListTotal}>
            <Text allowFontScaling={false} style={styles.friendListTotalNum}>{totalNum}</Text>
            <Text allowFontScaling={false} style={styles.friendListTotalText}>{TAP[tab]}</Text>
          </View>
          <View>
            {/* 好友列表 */}
            {tab == '1' && <FriendList />}
            {/* 好友列表 */}
            {tab == '2' && <FriendList />}
            {/* 好友列表 */}
            {tab == '3' && <FriendList />}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {},

  friendListTotal: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb'
  },
  friendListTotalNum: {
    fontSize: 27,
    color: '#ff1f4e',
    fontWeight: '700'
  },
  friendListTotalText: {
    marginTop: 12,
    fontSize: 12,
    color: '#ff1f4e'
  }
});
