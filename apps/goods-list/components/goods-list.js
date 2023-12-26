import React from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { fromJS } from 'immutable';
import { Relax } from 'plume2';

import { cache } from 'wmkit/cache';
import { noop } from 'wmkit/noop';
import WMEmpty from 'wmkit/empty';
import * as WMkit from 'wmkit/kit';
import WmListView from 'wmkit/list-view/index';

import SpuItem from './spu-item';
import SkuItem from './sku-item';

/**
 * 商品列表
 */
@Relax
export default class GoodsList extends React.Component {
  static relaxProps = {
    searchState: 'searchState',
    listView: 'listView', // 小图,大图
    goodsShowType: 'goodsShowType', // sku列表,spu列表
    isShow: 'isShow',
    loading: 'loading',
    selectedCate: 'selectedCate',
    sortType: 'sortType',
    selectSelfCompany: 'selectSelfCompany',
    selectShareProfits: 'selectShareProfits',
    selectedBrandIds: 'selectedBrandIds',
    queryString: 'queryString',
    initialEnd: 'initialEnd',
    querySpuAndOpenSpec: noop,
    handleDataReached: noop,
    isNotEmpty: 'isNotEmpty',
    goodsProps: 'goodsProps',
    changeShowShare: noop,
    saveCheckedSku: noop,
    // 是否选筛选企业价商品
    isIep: 'isIep',
    iepInfo: 'iepInfo',
    iepSwitch: 'iepSwitch',
    pointsUsageFlag: 'pointsUsageFlag',
    isSkeletonShow: noop,  //接收骨架屏展示的状态
    isNextPageLoading: noop,  //下一页loading状态
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
      isShow,
      selectedCate,
      sortType,
      queryString,
      initialEnd,
      selectedBrandIds,
      handleDataReached,
      querySpuAndOpenSpec,
      selectSelfCompany,
      goodsProps,
      selectShareProfits,
      changeShowShare,
      saveCheckedSku,
      isIep,
      iepSwitch,
      iepInfo,
      pointsUsageFlag,
      isSkeletonShow,
      isNextPageLoading
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

    //只展示积分

    // 排序标识
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
      sortType.get('sort') === 'desc'
    ) {
      sortFlag = 1;
    } else if (
      sortType.get('type') === 'dateTime' &&
      sortType.get('sort') === 'asc'
    ) {
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
    } else if (sortType.get('type') === 'salesNum') {
      sortFlag = 4;
    } else if (sortType.get('type') === 'evaluateNum') {
      sortFlag = 5;
    } else if (sortType.get('type') === 'praise') {
      sortFlag = 6;
    } else if (sortType.get('type') === 'collection') {
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
      if (goodsShowType === 0) {
        dataUrl = '/goods/skus'; //登陆后的sku列表
      } else {
        dataUrl = '/goods/spus'; //登陆后的spu列表
      }
    } else {
      if (goodsShowType === 0) {
        dataUrl = '/goods/skuListFront'; //开放访问的sku列表
      } else {
        dataUrl = '/goods/spuListFront'; //开放访问的spu列表
      }
    }

    const distributionGoodsAudit = selectShareProfits ? '2' : '';
    const distributionGoodsStatus =
      distributionGoodsAudit && distributionGoodsAudit == '2' ? '' : '';
    const enterPriseGoodsStatus = isIep ? '2' : '';

    // 是否是分销员
    let isDistributor = WMkit.isDistributor();

    const extraData = {};
    const listViewProps = {
      url: dataUrl,
      params: {
        keywords: keyword,
        cateId: cateId,
        companyType: companyType,
        pointsUsageFlag: pointsUsageFlag,
        brandIds: brandIds,
        propDetails: propDetails,
        sortFlag: sortFlag ,
        goodsInfoType: 0,
        esGoodsInfoDTOList: this.state.dtoListParam,
        distributionGoodsAudit: distributionGoodsAudit,
        distributionGoodsStatus: distributionGoodsStatus,
        enterPriseGoodsStatus: enterPriseGoodsStatus,
        sortByCateBrand: cateId?true:false,
      },
      loadingStyle: { marginTop: 300 },
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
      showRecommendFlag:true,
      endReachedThreshold: 2,
      renderRow: (item) => {
        if(!item) return
        if (goodsShowType === 0) {
          return (
            <SkuItem
              changeShowShare={() => changeShowShare()}
              saveCheckedSku={(checkedSku) => saveCheckedSku(checkedSku)}
              goodsItem={item}
              listView={listView}
              key={item.id}
              isShow={isShow}
              isDistributor={isDistributor}
              iepInfo={iepInfo}
              iepSwitch={iepSwitch}
            />
          );
        } else {
          return (
            <SpuItem
              goods={fromJS(item)}
              listView={listView}
              key={item.id}
              isShow={isShow}
              isDistributor={isDistributor}
              spuAddCartFunc={querySpuAndOpenSpec}
              changeShowShare={() => changeShowShare()}
              saveCheckedSku={(checkedSku) => saveCheckedSku(checkedSku)}
              sortFlag={sortFlag}
              iepInfo={iepInfo}
              iepSwitch={iepSwitch}
            />
          );
        }
      },
      extraData: extraData,
      onDataReached: handleDataReached,
      noMoreStyle:{backgroundColor:'transparent'},
      loadingStatus:(flag)=>{
        isSkeletonShow(flag)
      },
      renderEmpty: () => (
        <WMEmpty
          imgStyle={{ width: 104, height: 104 }}
          tipStyle={{ color: '#999', fontSize: 14 }}
          emptyImg={require('../img/empty.png')}
          desc="没有搜到任何商品"
        />
      ),
      keyProps: 'id',
      nextPageLoading:(flag)=>{
        isNextPageLoading(flag)
      },
    };
      return listView ? (
        <WmListView key="smallView" needToTop={true} needRefresh={false} {...listViewProps} />
      ) : (
        <WmListView key="bigView" needToTop={true} needRefresh={false} {...listViewProps} style={{backgroundColor: '#f5f5f5'}} numColumns={2} />
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
