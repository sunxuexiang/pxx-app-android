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
    cancelOrder: noop,
    againBuy: noop,
    applyRefund: noop,
    defaultPay: noop,
    isSkeletonShow: noop,
    serverTime: 'serverTime',
    orderListType: 'orderListType',
    confirm: noop,
    deliveryStatus:'deliveryStatus'
  };

  render() {
    const {
      form,
      fetchOrders,
      initToRefresh,
      cancelOrder,
      applyRefund,
      defaultPay,
      serverTime,
      orderListType,
      againBuy,
      confirm,
      deliveryStatus,
      isSkeletonShow
    } = this.props.relaxProps;

    const listViewProps = {
      url: '/trade/page',
      params: form.toJS(),
      columnWrapperStyle: {},
      isPagination: true,
      loadingStatus: (flag) => {
        isSkeletonShow(flag);
      },
      loadingStyle: { marginTop: 300 },
      showRecommendFlag:false,
      noMoreStyle: {backgroundColor: 'transparent'},
      renderRow: (item, _, index) => {
        return (
          <OrderItem
            orderListType={orderListType}
            serverTime={serverTime}
            item={item}
            index={index}
            key={item.id}
            cancelOrder={cancelOrder}
            applyRefund={applyRefund}
            defaultPay={defaultPay}
            againBuy={againBuy}
            confirm={confirm}
            deliveryStatus={deliveryStatus}
          />
        );
      },
      onDataReached: (res) => fetchOrders(res),
      renderEmpty: () => {
        return (
          <WMEmpty
            imgStyle={{ width: 104, height: 104 }}
            tipStyle={{ color: '#999', fontSize: 14 }}
            emptyImg={require('../img/order_null.png')}
            desc="您暂时还没有订单哦"
            isToGoodsList={true}
          />
        );
      },
      keyProps: 'id'
    };

    return (
      <WmListView
        {...listViewProps}
        toRefresh={(_init) => initToRefresh(_init)}
      />
    );
  }
}
