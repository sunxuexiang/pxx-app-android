import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, SafeAreaView } from 'react-native';

import { StoreProvider } from 'plume2';
import {Header} from 'wmkit';

import AppStore from './store';
import List from './components/list';
import { LongButton } from '../../wmkit/button';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class LinkChildAdd extends React.Component {
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
              <TouchableOpacity onPress={()=>this.store.addRecord()}>
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
        <SafeAreaView style={styles.bottom}>
          <LongButton text="提交" onClick={() => this.store.saveAll()}/>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  bottom: {
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ebebeb'
  },
});
