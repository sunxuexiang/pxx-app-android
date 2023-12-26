import React, { Component } from 'react';
import SkuList from './sku-list';
import Invoice from './invoice';
import AmountStatistics from './amount-statistics';
import Remark from './remark';
import { Relax } from 'plume2';

@Relax
export default class StoreItem extends Component {
  static relaxProps = {
    store : 'store'
  }

  render() {
    const store = this.props.relaxProps.store.toJS();
    return [
      <SkuList key={1} store={store}  />,
      <Invoice key={2}/>,
      <Remark key={3} />,
      <AmountStatistics
        key={4}
        store={store}
      />
    ];
  }
}
