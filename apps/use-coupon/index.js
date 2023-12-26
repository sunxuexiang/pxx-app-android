import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StoreProvider } from 'plume2';
import Header from 'wmkit/header';
import AppStore from './store';
import CouponTab from './component/coupon-tab';
import CouponList from './component/coupon-list';
import HelpMask from './component/help-mask.js';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class UseCoupon extends React.Component {
  store;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const params = this.props.route.params;
    this.store.init(params.coupons, params.couponPageInfo, params.storeIds);
  }

  render() {
    const showHelp = this.store.state().get('showHelp');
    return (
      <View style={styles.container}>
        <Header
          title="使用优惠券"
          renderRight={() => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ padding: 10 }}
                onPress={() => {
                  this.store.changeHelp();
                }}
              >
                <Text style={{ fontSize: 13, color: '#000', marginRight: 10 }}>
                  使用说明
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <CouponTab />
        <CouponList />
        {showHelp && <HelpMask />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
