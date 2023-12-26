import React from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';

import { connect } from 'react-redux';

import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import { registerReducer } from '@/redux/store';
import * as WMkit from 'wmkit/kit';

import Head from './components/head';

import InvitFriend from './components/invit-friend';

import MyCustomer from './components/my-customer';

import SellwellGoods from './components/sellwell-goods';

@connect<Partial<T.IProps>, any>(
  store2Props,
  actions
)
export default class RewardCenter extends React.Component<
  Partial<T.IProps>,
  any
> {
  static navigationOptions = ({ _navigation }) => ({
    title: '奖励中心',
    tabBarIcon: ({ focused }) => (
      <Image
        source={focused ? require('./img/30.png') : require('./img/29.png')}
        style={{ width: 24, height: 24 }}
      />
    )
  });

  componentDidMount() {
    if (WMkit.isLoginOrNotOpen()) {
      this.props.actions.init();
    }
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          automaticallyAdjustContentInsets={false}
        >
          <Head />

          <MyCustomer />
          <InvitFriend />
          <SellwellGoods />
        </ScrollView>
      </View>
    );
  }
}

//==动态注入reducer===

import rewardCenterMain from './reducers/main';

registerReducer({ rewardCenterMain });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  }
});
