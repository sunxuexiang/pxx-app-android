import React from 'react';
import { ScrollView, View, StyleSheet, PixelRatio } from 'react-native';
import { StoreProvider } from 'plume2';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from 'wmkit/header';

import Tips from './components/tips';
import Tabs from './components/tab';
import Tax from './components/tax';
import PaperInvoice from './components/paper';
import AppStore from './store';
import Save from './components/save';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class FlashSaleOrderInvoice extends React.Component {
  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const { supplierId } = (state && state.params) || {};
    this.store.init(supplierId);
  }

  render() {
    const state = this.props.route;
    const { supplierId } = (state && state.params) || {};
    const configFlag = this.store.state().get('configFlag');
    return (
      <View style={styles.container}>
        <Header title="索取发票" />
        <ScrollView style={{ flex: 1 }}>
          {configFlag ? <Tips /> : null}
          <Tabs companyInfoId={supplierId} />
          <PaperInvoice companyInfoId={supplierId} />
          <Tax companyInfoId={supplierId} />
        </ScrollView>
        <SafeAreaView>
          <Save companyInfoId={supplierId} />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  header: {
    backgroundColor: '#fafafa',
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb'
  },
  tips: {
    color: '#999999',
    fontSize: 12
  }
});
