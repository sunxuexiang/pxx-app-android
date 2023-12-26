import React from 'react';
import { Relax } from 'plume2';

import WmListView from 'wmkit/list-view/index';
import { noop } from 'wmkit/noop';
import WMEmpty from 'wmkit/empty';
import * as WMkit from 'wmkit/kit';
import CouponItem from './coupon-item';

@Relax
export default class CouponList extends React.Component {
  static relaxProps = {
    form: 'form',
    toRefresh: 'toRefresh',
    initialEnd: 'initialEnd',
    couponStateChanged: 'couponStateChanged',
    setCouponState: noop,
    fetchCoupon: noop,
    countOver: noop,
    initToRefresh: noop
  };

  render() {
    const {
      couponStateChanged,
      form,
      initToRefresh,
      initialEnd,
      fetchCoupon,
      countOver,
      setCouponState
    } = this.props.relaxProps;
    // 组件刚执行完mount，搜索条件没有注入进来，先不加载WmListView，避免先进行一次无条件搜索，再立刻进行一次有条件搜索
    if (!initialEnd) {
      return null;
    }
    const listViewProps = {
      url: WMkit.isLoginOrNotOpen()
        ? '/coupon-info/center'
        : '/coupon-info/front/center',
      params: form.toJS(),
      columnWrapperStyle: {},
      isPagination: true,
      loadingStyle:{marginTop:200},
      renderRow: (item, _, index, otherProps) => {
        return (
          <CouponItem
            couponStateChanged={couponStateChanged}
            countOver={countOver}
            fetchCoupon={fetchCoupon}
            coupon={item}
            index={index}
            key={index}
            onDataReached={() => {}}
            otherProps={otherProps}
            setCouponState={setCouponState}
          />
        );
      },
      renderEmpty: () => (
        <WMEmpty
          imgStyle={{ width: 104, height: 104 }}
          tipStyle={{ color: '#999', fontSize: 14 }}
          emptyImg={require('../img/empty.png')}
          desc="啊哦，什么券都没有~"
        />
      ),
      keyProps: 'activityConfigId',
      otherProps: ['brandMap', 'storeMap', 'cateMap', 'storeCateMap']
    };

    return (
      <WmListView
        noMoreStyle={{ backgroundColor: 'transparent' }}
        {...listViewProps}
        toRefresh={(_init) => initToRefresh(_init)}
      />
    );
  }
}
