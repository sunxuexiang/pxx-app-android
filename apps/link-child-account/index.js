import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';

import { msg, StoreProvider } from 'plume2';
import {Header} from 'wmkit';

import AppStore from './store';
import List from './components/list';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class LinkChildAccount extends React.Component {
  store;

  UNSAFE_componentWillMount() {
    this.store.init();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="关联账号"  renderRight={()=>{
          return (
            <View>
              <TouchableOpacity onPress={()=> msg.emit('router: goToNext', { routeName: 'LinkChildAdd' })}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 13,
                    paddingRight: 15
                  }}
                  allowFontScaling={false}
                >
                  新增
                </Text>
              </TouchableOpacity>
            </View>);
        }}/>
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
