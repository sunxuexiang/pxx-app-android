import React from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { fromJS, List } from 'immutable';
import { Relax } from 'plume2';
import WmListView from 'wmkit/list-view/index';
import { cache } from 'wmkit/cache';
import { noop } from 'wmkit/noop';
import WMEmpty from 'wmkit/empty';
import * as WMkit from 'wmkit/kit';

import SpuItem from './spu-item';
import SkuItem from './sku-item';

/**
 * 商品列表
 */
@Relax
export default class GoodsList extends React.Component {
  static relaxProps = {
    searchState: 'searchState',
    listView: 'listView',
    goodsShowType: 'goodsShowType',
    loading: 'loading',
    selectedCate: 'selectedCate',
    sortType: 'sortType',
    selectSelfCompany: 'selectSelfCompany',
    selectedBrandIds: 'selectedBrandIds',
    specs: 'specs',
    selectedSpecDetails: 'selectedSpecDetails',
    queryString: 'queryString',
    initialEnd: 'initialEnd',
    storeId: 'storeId',
    querySpuAndOpenSpec: noop,
    handleDataReached: noop,
    isShow: 'isShow',
    changeShowShare: noop,
    saveCheckedSku: noop,
    iepInfo:'iepInfo',
    iepSwitch: 'iepSwitch'
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
      listView,
      goodsShowType,
      selectedCate,
      sortType,
      queryString,
      initialEnd,
      selectedBrandIds,
      specs,
      selectedSpecDetails,
      handleDataReached,
      querySpuAndOpenSpec,
      selectSelfCompany,
      storeId,
      isShow,
      changeShowShare,
      saveCheckedSku,
      iepSwitch,
      iepInfo
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
      selectedCate.getIn(['storeCateId', 0]) === 0
        ? null
        : selectedCate.getIn(['storeCateId', 0]);

    // 只展示自营商品
    const companyType = selectSelfCompany ? '0' : '';

    // 排序标识（默认是按照上架时间倒序）
    let sortFlag = 0;
    if (
      sortType.get('type') === 'dateTime' &&
      sortType.get('sort') === 'desc'
    ) {
      //按照上架时间倒序
      sortFlag = 1;
    } else if (
      sortType.get('type') === 'dateTime' &&
      sortType.get('sort') === 'asc'
    ) {
      //按照上架时间升序
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

    // 如果使用关键字搜索，默认排序要传null，为了让更匹配关键字的排在前面(ES默认排序)
    if (
      keyword &&
      (sortType.get('type') === '' || sortType.get('type') === 'default')
    ) {
      sortFlag = null;
    }

    // 品牌
    const brandIds = (selectedBrandIds && selectedBrandIds.toJS()) || null;

    // 规格值
    let selectedSpecs = null;
    if (selectedSpecDetails && selectedSpecDetails.count() > 0) {
      selectedSpecs = List();
      selectedSpecDetails.keySeq().forEach((k, index) => {
        let spec = specs.find(
          (spec) => spec.get('specId').toString() === k.toString()
        );
        selectedSpecs = selectedSpecs.set(
          index,
          fromJS({
            name: spec.get('specName'),
            values: selectedSpecDetails.get(k)
          })
        );
      });
    }

    // 是否是分销员
    let isDistributor = WMkit.isDistributor();

    const extraData = {};
    let skuUrl;
    if (WMkit.isLoginOrNotOpen()) {
      if (goodsShowType == 0) {
        skuUrl = '/goods/skus'; //登陆后的sku列表
      } else {
        skuUrl = '/goods/spus'; //登陆后的spu列表
      }
    } else {
      if (goodsShowType == 0) {
        skuUrl = '/goods/skuListFront'; //开放访问的sku列表
      } else {
        skuUrl = '/goods/spuListFront'; //开放访问的spu列表
      }
    }
    const listViewProps = {
      url: skuUrl,
      params: {
        keywords: keyword,
        storeCateIds: cateId ? [cateId] : [],
        companyType: companyType,
        brandIds: brandIds,
        specs: selectedSpecs,
        sortFlag: sortFlag,
        storeId,
        esGoodsInfoDTOList: this.state.dtoListParam
      },
      columnWrapperStyle: !listView && styles.bigBox,
      isPagination: true,
      dataPropsName:
        goodsShowType === 0
          ? 'context.esGoodsInfoPage.content'
          : 'context.esGoods.content',
      otherProps: [
        'goodsIntervalPrices',
        'appointmentSaleVOList',
        'bookingSaleVOList'
      ],
      renderRow: (item) => {
        if (goodsShowType === 0) {
          return (
            <SkuItem
              goodsItem={item}
              listView={listView}
              key={item.id}
              changeShowShare={() => changeShowShare()}
              saveCheckedSku={(checkedSku) => saveCheckedSku(checkedSku)}
              isShow={isShow}
              isDistributor={isDistributor}
              iepSwitch={iepSwitch}
              iepInfo={iepInfo}
            />
          );
        } else {
          return (
            <SpuItem
              goods={fromJS(item)}
              listView={listView}
              key={item.id}
              spuAddCartFunc={querySpuAndOpenSpec}
              changeShowShare={() => changeShowShare()}
              saveCheckedSku={(checkedSku) => saveCheckedSku(checkedSku)}
              isShow={isShow}
              isDistributor={isDistributor}
              sortFlag={sortFlag}
              iepSwitch={iepSwitch}
              iepInfo={iepInfo}
            />
          );
        }
      },
      extraData: extraData,
      onDataReached: handleDataReached,
      renderEmpty: () => (
        <WMEmpty
          emptyImg={require('../img/empty.png')}
          desc="没有搜到任何商品哦"
          imgStyle={{width:64,height:64}}
          tipStyle={{fontSize:12,lineHeight:20,color:'rgba(0,0,0,0.4)'}}
        />
      ),
      keyProps: 'id'
    };

    return listView ? (
      <WmListView key="smallView" {...listViewProps} />
    ) : (
      <WmListView key="bigView" {...listViewProps} numColumns={2} />
    );
  }
}

const styles = StyleSheet.create({
  bigBox: {
    paddingLeft: 5,
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  }
});
