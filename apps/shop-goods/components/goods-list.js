import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { fromJS } from 'immutable';
import { Relax } from 'plume2';
import WMEmpty from 'wmkit/empty';
import { noop } from 'wmkit/noop';
import WmListView from 'wmkit/list-view/index';
import * as WMkit from 'wmkit/kit';
import { cache } from 'wmkit/cache';

import SkuItem from './sku-item';

/**
 * 商品列表
 */
@Relax
export default class GoodsList extends React.Component {
  static relaxProps = {
    selectedCate: 'selectedCate',
    sortType: 'sortType',
    selectSelfCompany: 'selectSelfCompany',
    selectHideGoods: 'selectHideGoods',
    selectedBrandIds: 'selectedBrandIds',
    queryString: 'queryString',
    initialEnd: 'initialEnd',
    handleDataReached: noop,
    isNotEmpty: 'isNotEmpty',
    goodsProps: 'goodsProps'
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
      selectedCate,
      sortType,
      queryString,
      initialEnd,
      selectedBrandIds,
      handleDataReached,
      selectSelfCompany,
      selectHideGoods,
      goodsProps
    } = this.props.relaxProps;

    // 组件刚执行完mount，搜索条件没有注入进来，先不加载WmListView，避免先进行一次无条件搜索，再立刻进行一次有条件搜索
    if (!initialEnd) {
      return null;
    }

    // 搜索条件
    // 关键字
    const keyword = queryString;

    // 目录编号
    const cateId =
      selectedCate.get('cateId') === 0 ? null : selectedCate.get('cateId');

    // 只展示自营商品
    const companyType = selectSelfCompany ? '0' : '';

    // 排序标识，默认为按时间倒序
    let sortFlag = 0;
    if (
      sortType.get('type') === 'dateTime' &&
      sortType.get('sort') === 'desc'
    ) {
      sortFlag = 0;
    } else if (
      sortType.get('type') === 'dateTime' &&
      sortType.get('sort') === 'asc'
    ) {
      sortFlag = 1;
    }

    // 品牌
    const brandIds = (selectedBrandIds && selectedBrandIds.toJS()) || null;

    // 属性值
    let propDetails = [];
    if (goodsProps && goodsProps.count() > 0) {
      propDetails = goodsProps
        .map((v) => {
          let prop = fromJS({});
          const detailIds = v
            .get('goodsPropDetails')
            .filter((de) => de.get('checked') === true)
            .map((de) => de.get('detailId'));
          return prop
            .set('propId', v.get('propId'))
            .set('detailIds', detailIds);
        })
        .filter((v) => v.get('detailIds') && v.get('detailIds').size > 0)
        .toJS();
    }

    let dataUrl;
    if (WMkit.isLoginOrNotOpen()) {
      dataUrl = '/goods/shop/add-distributor-goods';
    }
    const listViewProps = {
      url: dataUrl,
      params: {
        keywords: keyword,
        cateId: cateId,
        companyType: companyType,
        hideSelectedDistributionGoods: selectHideGoods,
        brandIds: brandIds,
        propDetails: propDetails,
        sortFlag: sortFlag,
        esGoodsInfoDTOList: this.state.dtoListParam
      },
      dataPropsName: 'context.esGoodsInfoPage.content',
      otherProps: ['goodsIntervalPrices'],
      renderRow: (item) => {
        return <SkuItem goodsItem={item} key={item.id} isShow={true} />;
      },
      onDataReached: handleDataReached,
      renderEmpty: () => (
        <WMEmpty
          emptyImg={require('../img/empty.png')}
          desc="没有搜到任何商品"
        />
      ),
      keyProps: 'id'
    };

    return <WmListView key="smallView" {...listViewProps} />;
  }
}
