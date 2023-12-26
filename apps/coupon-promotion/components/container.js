import React from 'react';
import { View } from 'react-native';
import { Relax, msg } from 'plume2';

import Header from 'wmkit/header';
import PromotionCoupon from './promotion-coupon';
import FilterBar from './filter-bar';
import Cate from './cate';
import Sort from './sort';
import Brand from './brand';
import List from './goods-list';
import PromotionBottom from './promotion-botttom';

/**
 * 商品列表顶级组件
 */
@Relax
export default class Container extends React.Component {
  static relaxProps = {
    tabName: 'tabName'
  };

  render() {
    const { tabName } = this.props.relaxProps;

    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <Header title="优惠券活动" />
        {/*优惠券活动*/}
        <PromotionCoupon />

        {/*过滤筛选条件bar*/}
        <FilterBar />

        {/*符合条件的商品列表*/}
        <List />

        {/*凑单页底部*/}
        <PromotionBottom />

        {/* 分类*/}
        <Cate hide={tabName !== 'goodsCate'} />

        {/*品牌*/}
        <Brand hide={tabName !== 'goodsBrand'} />

        {/*排序*/}
        {tabName === 'goodsSort' && <Sort />}
      </View>
    );
  }
}
