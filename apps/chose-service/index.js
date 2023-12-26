import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { msg, StoreProvider } from 'plume2';
import Header from 'wmkit/header';

import AppStore from './store';
import List from './components/list';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class ChoseService extends React.Component {
  store;

  componentDidMount() {
    const state = this.props.route;
    const { storeId } = (state && state.params) || {};
    this.store.init(storeId);
  }

  render() {
    const state = this.props.route;

    return (
      <View style={styles.container}>
        <Header
          title="选择客服"
          onLeftMenuPress={() => {
            state.params.whereFrom == 'UserCenter' ?
              msg.emit('router: goToNext', { routeName: 'UserCenter' })
              :
              msg.emit('router: back');
          }
          }
        />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          iosautomaticallyAdjustContentInsets={false}
        >
          <List />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
