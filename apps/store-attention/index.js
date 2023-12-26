import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { msg, StoreProvider } from 'plume2';
import Header from 'wmkit/header';

import AppStore from './store';
import Head from './components/head';
import StoreList from './components/list';
import Bottom from './components/bottom';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class StoreAttention extends Component {
  store;

  constructor(props) {
    super(props);
  }

  render() {
    const isEdit = this.store.state().get('isEdit');
    const attentionNum = this.store.state().get('attentionNum');
    const state = this.props.route;
    const { whereFrom } = (state && state.params) || {};
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          title="关注店铺"
          renderRight={() => {
            return attentionNum > 0 ? (
              <TouchableOpacity
                style={{ padding: 5 }}
                activeOpacity={0.8}
                onPress={() => {
                  this.store.changeEditStatus(isEdit);
                }}
              >
                <Text style={styles.headText} allowFontScaling={false}>
                  {isEdit ? '完成' : '编辑'}
                </Text>
              </TouchableOpacity>
            ) : null;
          }}
          onLeftMenuPress={() => {
            whereFrom == 'UserCenter' ?
              msg.emit('router: goToNext', { routeName: 'UserCenter' })
              :
              msg.emit('router: back');
          }
          }
        />
        <Head />
        <StoreList isEdit={isEdit} />
        {isEdit && <Bottom />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headText: {
    color: '#000',
    fontSize: 13,
    marginRight: 10
  }
});
