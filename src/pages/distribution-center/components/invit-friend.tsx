import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';

import { screenWidth } from 'wmkit/styles/index';
import * as WMkit from 'wmkit/kit';
import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { msg } from 'plume2';

type IInvitFriendProps = T.IProps & T.IInvitFriendProps;

@connect<Partial<IInvitFriendProps>, T.IInvitFriendState>(
  store2Props,
  actions
)
export default class InvitFriend extends React.Component<
  Partial<IInvitFriendProps>,
  T.IInvitFriendState
> {
  constructor(props: IInvitFriendProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      main: { distributeSetting }
    } = this.props;

    // 是否开启社交分销 0：关闭，1：开启
    const openFlag = distributeSetting.openFlag;
    // 是否开启申请入口  0：关闭  1：开启
    const applyFlag = distributeSetting.applyFlag;
    // 是否开启邀请奖励 0：关闭，1：开启
    const inviteFlag = distributeSetting.inviteFlag;

    return (
      <View style={styles.container}>
        {openFlag == 1 &&
          applyFlag == 1 &&
          inviteFlag == 1 && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (!WMkit.isLoginOrNotOpen()) {
                  msg.emit('loginModal:toggleVisible', {
                    callBack: () => {
                      msg.emit('router: goToNext', { routeName: 'InvitHome' });
                    }
                  });
                } else {
                  msg.emit('router: goToNext', { routeName: 'InvitHome' });
                }
              }}
            >
              <Image
                source={{ uri: distributeSetting.inviteEnterImg }}
                style={styles.img}
              />
            </TouchableOpacity>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: screenWidth - 20,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    position: 'relative'
  },
  img: {
    width: screenWidth * 0.947,
    height: screenWidth * 0.213,
    borderRadius: 8
  }
});
