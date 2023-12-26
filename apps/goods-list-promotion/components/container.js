import React from 'react';
import { View } from 'react-native';
import { Relax } from 'plume2';

import Header from 'wmkit/header';

import PromotionGift from './promotion-gift';
import PromotionDiscount from './promotion-discount';
import FilterBar from './filter-bar';
import Cate from './cate';
import Sort from './sort';
import Brand from './brand';
import List from './goods-list';
import PromotionBottom from './promotion-botttom';
import PanelBottom from './panel-bottom';

/**
 * 商品列表顶级组件
 */
@Relax
export default class Container extends React.Component {
  static relaxProps = {
    tabName: 'tabName',
    marketing: 'marketing',
    giftShow: 'giftShow',
    type: 'type'
  };

  render() {
    const { tabName, giftShow,marketing, type } = this.props.relaxProps;
    console.log(this.props.relaxProps, '1111');
    let title = '';
    if (type == 0) {
      title = '满减活动';
      if(marketing.subType===1&&marketing.fullReductionLevelList.length===1&&marketing.fullReductionLevelList[0].fullCount===1){
      title = '立减活动';
      }
    } else if (type == 1) {
      title = '买折活动';
    } else if (type == 2) {
      title = '买赠活动';
    } else if (type == 3) {
      title = '打包一口价';
    } else if (type == 4) {
      title = '多买多惠';
    }

    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <Header title={title} />
        {/*头部促销活动*/}
        {type === 2 ? <PromotionGift /> : <PromotionDiscount />}

        <FilterBar />
        <List />
        <PromotionBottom />
        {/* 分类*/}
        <Cate hide={tabName !== 'goodsCate'} />
        {/*品牌*/}
        <Brand hide={tabName !== 'goodsBrand'} />
        {/*排序*/}
        {tabName === 'goodsSort' && <Sort />}
        {giftShow && <PanelBottom />}
      </View>
    );
  }
}
