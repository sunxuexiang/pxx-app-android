import React from 'react';
import { Relax } from 'plume2';

import WmListView from 'wmkit/list-view/index';
import { noop } from 'wmkit/noop';
import WMEmpty from 'wmkit/empty';

import OrderItem from './order-item';

@Relax
export default class Orders extends React.Component {
  static relaxProps = {
    form: 'form',
    fetchOrders: noop,
    toRefresh: 'toRefresh',
    initToRefresh: noop,
    defaultPay: noop
  };

  render() {
    const {
      form,
      fetchOrders,
      initToRefresh,
      defaultPay
    } = this.props.relaxProps;

    const listViewProps = {
      url: '/trade/customer/page',
      params: form.toJS(),
      columnWrapperStyle: {},
      isPagination: true,
      renderRow: (item, _, index) => {
        return (
          <OrderItem
            item={item}
            index={index}
            key={item.id}
            defaultPay={defaultPay}
          />
        );
      },
      onDataReached: (res) => fetchOrders(res),
      renderEmpty: () => (
        <WMEmpty
          emptyImg={require('../img/order_null.png')}
          desc="您暂时还没有订单哦"
          btnText="逛逛商品"
        />
      ),
      keyProps: 'id'
    };

    return (
      <WmListView
        noMoreStyle={{ backgroundColor: '#f5f5f5' }}
        {...listViewProps}
        toRefresh={(_init) => initToRefresh(_init)}
      />
    );
  }
}
