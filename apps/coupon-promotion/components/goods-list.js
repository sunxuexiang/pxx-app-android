import React from 'react';
import { StyleSheet } from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import WMEmpty from 'wmkit/empty';
import WmListView from 'wmkit/list-view/index';
import * as _ from '../../../wmkit/common/util'; // added by scx 
import SkuItem from './sku-item';

/**
 * 商品列表
 */
@Relax
export default class GoodsList extends React.Component {
  static relaxProps = {
    //请求参数
    couponId: 'couponId',
    activity: 'activity',
    sortType: 'sortType',
    brandIds: 'brandIds',
    cateIds: 'cateIds',
    toRefresh: 'toRefresh',
    isShow: 'isShow',

    //对请求数据的处理
    dealData: noop,
    initToRefresh: noop
  };

  render() {
    let {
      couponId,
      activity,
      sortType,
      brandIds,
      cateIds,
      dealData,
      toRefresh,
      isShow
    } = this.props.relaxProps;

    // 组件刚执行完mount，搜索条件没有注入进来，先不加载WmListView，避免先进行一次无条件搜索，再立刻进行一次有条件搜索
    if (couponId == '' || activity == '') {
      return null;
    }

    let sortFlag = 10;
    if (
      sortType.get('type') === 'default'
    ) {
      sortFlag = 10;
    }else if (
      sortType.get('type') === 'composite'
    ) {
      sortFlag = 0;
    }else if (
      sortType.get('type') === 'dateTime' &&
      sortType.get('sort') === 'asc'
    ) {
      sortFlag = 1;
    } else if (
      sortType.get('type') === 'price' &&
      sortType.get('sort') === 'desc'
    ) {
      sortFlag = 2;
    } else if (
      sortType.get('type') === 'price' &&
      sortType.get('sort') === 'asc'
    ) {
      sortFlag = 3;
    } else if (sortType.get('type') === 'salesNum') {
      sortFlag = 4;
    } else if (sortType.get('type') === 'evaluateNum') {
      sortFlag = 5;
    } else if (sortType.get('type') === 'praise') {
      sortFlag = 6;
    } else if (sortType.get('type') === 'collection') {
      sortFlag = 7;
    }

    const listViewProps = {
      url: '/coupon-info/coupon-goods',
      params: {
        couponId: couponId,
        activity: activity,
        sortFlag: sortFlag,
        brandIds: brandIds,
        cateIds: cateIds
      },
      columnWrapperStyle: {},
      isPagination: true,
      otherProps: ['esGoodsInfoResponse.goodsIntervalPrices'],
      renderRow: (item) => <SkuItem key={item.id} goodsItem={item} isShow={isShow}/>,
      onDataReached: dealData,
      renderEmpty: () => (
        <WMEmpty
          emptyImg={require('../img/empty.png')}
          desc="没有搜到任何商品"
        />
      ),
      keyProps: 'id',
      // extraData: { toRefresh: toRefresh }
    };

    return (
      <WmListView style={styles.container} key="smallView" {...listViewProps} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ..._.ifIphoneX(
      {
        marginBottom: 75
      },
      {
        marginBottom: 45
      }
    )
  }
});
