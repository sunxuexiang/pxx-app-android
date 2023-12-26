import React from 'react';
import WMEmpty from 'wmkit/empty';
import WmListView from 'wmkit/list-view/index';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import PointsCouponItem from './points-coupon-item';
import PointsGoodsItem from './points-goods-item';

type IPointsGoodsListProps = T.IProps & T.IPointsGoodsListProps;

@connect<Partial<IPointsGoodsListProps>, T.IPointsGoodsListState>(
  store2Props,
  actions
)
export default class PointsGoodsList extends React.Component<
  Partial<IPointsGoodsListProps>,
  T.IPointsGoodsListState
> {
  constructor(props: IPointsGoodsListProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      main: { cateId, sortType, canExchange, pointsCouponListFlag }
    } = this.props;

    // 排序字段
    let type = sortType.type;
    // 排序方式：升序 降序
    let sort = sortType.sort;

    let sortFlag = null;
    if (type === 'points' && sort === 'asc') {
      sortFlag = 0;
    } else if (type === 'points' && sort === 'desc') {
      sortFlag = 1;
    } else if (type === 'price' && sort === 'asc') {
      sortFlag = 2;
    } else if (type === 'price' && sort === 'desc') {
      sortFlag = 3;
    }

    // 积分商品列表
    const listViewGoodsProps = {
      url: canExchange ? '/pointsMall/pageCanExchange' : '/pointsMall/page',
      params: !canExchange
        ? {
            sortFlag: sortFlag,
            cateId: cateId
          }
        : {
            cateId: cateId
          },
      isPagination: true,
      renderRow: (item, index) => {
        return <PointsGoodsItem pointGoods={item} id={index} />;
      },
      renderEmpty: () => (
        <WMEmpty
          emptyImg={require('../img/empty.png')}
          desc="没有符合您要求的商品~"
        />
      ),
      keyProps: 'pointsGoodsId',
      needRefresh: false
    };

    // // 积分兑换优惠券列表
    const listViewCouponProps = {
      url: canExchange
        ? '/pointsMall/pageCanExchangeCoupon'
        : '/pointsMall/pageCoupon',
      params: !canExchange
        ? {
            sortFlag: sortFlag
          }
        : {},
      isPagination: true,
      renderRow: (item, index) => {
        // PointsCouponItem会造成崩溃
        return <PointsCouponItem pointCoupon={item} id={index} />;
      },
      renderEmpty: () => (
        <WMEmpty
          emptyImg={require('../img/empty.png')}
          desc="没有符合您要求的优惠券~"
        />
      ),
      keyProps: 'couponId',
      needRefresh: false
    };

    return pointsCouponListFlag ? (
      <WmListView key="couponView" {...listViewCouponProps} />
    ) : (
      <WmListView key="goodsView" {...listViewGoodsProps} />
    );
  }
}
