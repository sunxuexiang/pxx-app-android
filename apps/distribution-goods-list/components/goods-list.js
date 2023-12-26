import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { fromJS } from 'immutable';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import WmListView from 'wmkit/list-view/index';
import * as WMkit from 'wmkit/kit';
import { cache } from 'wmkit/cache';
import WMEmpty from 'wmkit/empty';

import SkuItem from './sku-item';

/**
 * 商品列表
 */
@Relax
export default class GoodsList extends React.Component {
  static relaxProps = {
    selectedCate: 'selectedCate',
    sortType: 'sortType',
    isShow: 'isShow',
    selectSelfCompany: 'selectSelfCompany',
    selectedBrandIds: 'selectedBrandIds',
    queryString: 'queryString',
    initialEnd: 'initialEnd',
    handleDataReached: noop,
    isNotEmpty: 'isNotEmpty',
    goodsProps: 'goodsProps',
    changeShowShare: noop,
    saveCheckedSku: noop
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
      isShow,
      queryString,
      initialEnd,
      selectedBrandIds,
      handleDataReached,
      selectSelfCompany,
      goodsProps,
      changeShowShare,
      saveCheckedSku
    } = this.props.relaxProps;

    // 组件刚执行完mount，搜索条件没有注入进来，先不加载WmListView，避免先进行一次无条件搜索，再立刻进行一次有条件搜索
    if (!initialEnd) {
      return null;
    }

    // 是否是分销员
    let isDistributor = WMkit.isDistributor();

    // 搜索条件
    // 关键字
    const keyword = queryString;

    // 目录编号
    const cateId =
      selectedCate.get('cateId') === 0 ? null : selectedCate.get('cateId');

    // 只展示自营商品
    const companyType = selectSelfCompany ? '0' : '';

    // 排序标识，默认为按时间倒序
    let sortFlag = 1;
    if (sortType.get('type') === 'dateTime') {
      sortFlag = 1;
    } else if (sortType.get('type') === 'salesNum') {
      sortFlag = 4;
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
    } else if (
      sortType.get('type') === 'commission' &&
      sortType.get('sort') === 'desc'
    ) {
      sortFlag = 8;
    } else if (
      sortType.get('type') === 'commission' &&
      sortType.get('sort') === 'asc'
    ) {
      sortFlag = 9;
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
        brandIds: brandIds,
        propDetails: propDetails,
        sortFlag: sortFlag,
        esGoodsInfoDTOList: this.state.dtoListParam
      },
      dataPropsName: 'context.esGoodsInfoPage.content',
      otherProps: ['goodsIntervalPrices'],
      renderRow: (item) => {
        return (
          <SkuItem
            changeShowShare={() => changeShowShare()}
            saveCheckedSku={(checkedSku) => saveCheckedSku(checkedSku)}
            goodsItem={item}
            key={item.id}
            isDistributor={isDistributor}
            isShow={isShow}
          />
        );
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
