import React, { Component } from 'react';
import { Relax } from 'plume2';

import StoreItem from './store-item';

@Relax
export default class StoreList extends Component {
  static relaxProps = {
    stores: 'stores',
    couponTotal: 'couponTotal',
    useCoupons: Function,
    pickUpSelect: 'pickUpSelect',
    pickUpMessage: 'pickUpMessage'
  };

  render() {
    const { stores, couponTotal, useCoupons ,pickUpSelect, pickUpMessage} = this.props.relaxProps;
    return [
      stores
        .toJS()
        .map((store, index) => (
          <StoreItem
            disableF={this.props.disableF}
            key={index}
            store={store}
            single={stores.size == 1}
            index={index}
            useCoupons={useCoupons}
            couponTotal={couponTotal}
            pickUpSelect={pickUpSelect}
            pickUpMessage={pickUpMessage}
          />
        ))
    ];
  }
}
