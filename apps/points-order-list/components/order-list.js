import React from 'react';
import { Relax } from 'plume2';

import WmListView from 'wmkit/list-view/index';
import { noop } from 'wmkit/noop';
import WMEmpty from 'wmkit/empty';

import PointOrderItem from './order-item';
import PointOrderCouponItem from './order-coupon-item';
@Relax
export default class Orders extends React.Component {
  static relaxProps = {
    form: 'form',
    fetchOrders: noop,
    toRefresh: 'toRefresh',
    initToRefresh: noop,
    cancelOrder: noop,
    applyRefund: noop,
    defaultPay: noop
  };

  render() {
    const {
      form,
      fetchOrders,
      initToRefresh,
      cancelOrder,
      applyRefund,
      defaultPay
    } = this.props.relaxProps;

    const listViewProps = {
      url: '/points/trade/page',
      params: form.toJS(),
      columnWrapperStyle: {},
      isPagination: true,
      renderRow: (item, _, index) => {
        if (item.pointsOrderType == 'POINTS_COUPON') {
          return <PointOrderCouponItem item={item} />;
        } else {
          return (
            <PointOrderItem
              item={item}
              index={index}
              key={item.id}
              cancelOrder={cancelOrder}
              applyRefund={applyRefund}
              defaultPay={defaultPay}
            />
          );
        }
      },
      onDataReached: (res) => fetchOrders(res),
      renderEmpty: () => (
        <WMEmpty
          emptyImg={require('../img/order_null.png')}
          desc="您暂时还没有订单哦"
          btnText="逛逛商品"
          isToGoodsList={true}
          goUrl="PointsMall"
        />
      ),
      keyProps: 'id'
    };

    return (
      <WmListView
        noMoreStyle={{backgroundColor:'#f5f5f5'}}
        {...listViewProps}
        toRefresh={(_init) => initToRefresh(_init)}
      />
    );
  }
}
