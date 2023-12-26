import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import SkuList from './sku-list';
import Invoice from './invoice';
import Enclosure from './enclosure';
import AmountStatistics from './amount-statistics';
import Remark from './remark';
import Delivery from './delivery';
import BookingDelivery from './booking-delivery';

export default class StoreItem extends Component {
  render() {
    const {
      store,
      index,
      disableF,
      single,
      useCoupons,
      couponTotal,
      totalCommission
    } = this.props;
    return [
      <View style={styles.container}>
        <View style={styles.panel}>
          <SkuList key={1} store={store} index={index} />
          <Invoice
            key={2}
            storeId={store.supplier.storeId}
            supplierId={store.supplier.supplierId}
          />
          <Remark key={3} storeId={store.supplier.storeId} />
          <Enclosure
            key={4}
            storeId={store.supplier.storeId}
            disableF={disableF}
          />
          <Delivery key={6} storeId={store.supplier.storeId}/>
          <BookingDelivery key={7} storeId={store.supplier.storeId}/>
        </View>
        <AmountStatistics
          key={5}
          index={index}
          store={store}
          single={single}
          useCoupons={useCoupons}
          couponTotal={couponTotal}
          totalCommission={totalCommission}
        />
      </View>
    ];
  }
}


const styles=StyleSheet.create({
  container: {
    paddingHorizontal: 12
  },
  panel: {
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
})