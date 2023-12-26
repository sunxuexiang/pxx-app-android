/**
 * Created by feitingting on 2017/8/30.
 */
import React from 'react';
import { StoreProvider } from 'plume2';

import AppStore from './store';
import { Provider } from '@ant-design/react-native';
import { StyleSheet, View } from 'react-native';
import AddressEdit from './components/address-edit';
import AddressEditNew from './components/address-edit-new';
import Header from 'wmkit/header'
@StoreProvider(AppStore, { debug: __DEV__ })
export default class UserAddressEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // 是否是编辑状态
    const state = this.props.route;
    const params = (state && state.params) || {}
    const { addressId, lat, lng, name, addr,consigneeName, consigneeNumber,isDefaltAddress} = params;
    this.store.init(addressId, lat, lng, name, addr,consigneeName, consigneeNumber,isDefaltAddress);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="收货地址" />
        <Provider style={{ width: 600 }}>
          <AddressEditNew />
        </Provider>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});
