import React from 'react';
import { View } from 'react-native';
import { StoreProvider } from 'plume2';
import AppStore from './store';
import Map from './components/map';
import { screenHeight, screenWidth } from 'wmkit/styles';
import { Provider } from '@ant-design/react-native';
import Header from 'wmkit/header';

/**
 * 商品分类
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class AddressMap extends React.Component {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount(){
    const state = this.props.route;
    const params = (state && state.params) || {}
    const { addressId, lat, lng,consigneeName, consigneeNumber,isDefaltAddress} = params;
    this.store.init( addressId, lat, lng,consigneeName, consigneeNumber,isDefaltAddress);
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
        <Provider>
          <Header
            title="所在地区"
          />
          <Map/>
        </Provider>
      </View>
    );
  }
}
