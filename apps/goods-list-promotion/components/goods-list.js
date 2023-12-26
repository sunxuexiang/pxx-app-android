import React from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Relax } from 'plume2';

import { cache } from 'wmkit/cache';
import { noop } from 'wmkit/noop';
import WMEmpty from 'wmkit/empty';
import * as WMkit from 'wmkit/kit';
import WmListView from 'wmkit/list-view/index';

import * as _ from '../../../wmkit/common/util'; // added by scx
import SkuItem from './sku-item';

/**
 * 商品列表
 */
@Relax
export default class GoodsList extends React.Component {
  static relaxProps = {
    marketingId: 'marketingId',
    initialEnd: 'initialEnd',
    cateIds: 'cateIds',
    brandIds: 'brandIds',
    sortType: 'sortType',
    subType: 'subType',
    calcMarketing: noop,
    query: noop,

    changeGoodsNum: noop,
    goodsMarketing: 'goodsMarketing',
    //评价相关信息是否展示
    isShow: 'isShow',
    //用于填充SkuItem列表的商品购买量
    calc: 'calc'
  };

  constructor(props) {
    super(props);
    this.state = {
      dtoListParam: null
    };
    AsyncStorage.getItem(cache.PURCHASE_CACHE).then((res) => {
      this.setState({
        // 防止修改商品数量,引起参数变化,重新查询商品列表(刷新页面,体验不好)
        dtoListParam: JSON.parse(res) || []
      });
    });
  }

  render() {
    // 若参数未初始化好,则不请求后端
    if (!this.state.dtoListParam) {
      return null;
    }
    let {
      changeGoodsNum,
      goodsMarketing,
      marketingId,
      cateIds,
      brandIds,
      sortType,
      query,
      isShow,
      calc,
      subType
    } = this.props.relaxProps;

    // 排序标识
    let sortFlag = 0;
    if (sortType.get('type') == 'dateTime' && sortType.get('sort') == 'desc') {
      sortFlag = 1;
    } else if (
      sortType.get('type') == 'dateTime' &&
      sortType.get('sort') == 'asc'
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
    } else if (sortType.get('type') == 'salesNum') {
      sortFlag = 4;
    } else if (sortType.get('type') == 'evaluateNum') {
      sortFlag = 5;
    } else if (sortType.get('type') == 'praise') {
      sortFlag = 6;
    } else if (sortType.get('type') == 'collection') {
      sortFlag = 7;
    }
    let marketingTypeTmp = subType && subType === 6 ? '' : marketingId;

    let skuUrl = '/goods/skuListFront';
    if (WMkit.isLoginOrNotOpen()) {
      skuUrl = '/goods/skus';
    }
    const extraData = {};
    const listViewProps = {
      url: skuUrl,
      params: {
        cateIds: cateIds,
        brandIds: brandIds,
        sortFlag: sortFlag,
        pageNum: 0,
        pageSize: 10,
        marketingId:marketingTypeTmp,
        cateAggFlag: true,
        esGoodsInfoDTOList: this.state.dtoListParam
      },
      isPagination: true,
      otherProps: ['goodsIntervalPrices'],
      renderRow: (item) => (
        <SkuItem
          key={item.id}
          goodsItem={item}
          changeGoodsNum={changeGoodsNum}
          goodsMarketing={goodsMarketing}
          marketingId={marketingId}
          isShow={isShow}
          calc={calc}
        />
      ),
      extraData: extraData,
      onDataReached: query,
      renderEmpty: () => (
        <WMEmpty
          emptyImg={require('../img/empty.png')}
          desc="没有搜到任何商品"
        />
      ),
      keyProps: 'id'
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
