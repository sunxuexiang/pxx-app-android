import React from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import { cache } from 'wmkit/cache';
import WmListView from 'wmkit/list-view/index';
import WMEmpty from 'wmkit/empty';
import * as WMkit from 'wmkit/kit';

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
    pointsUsageFlag: 'pointsUsageFlag'
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
      isShow,
      initialEnd,
      handleDataReached,
      changeShowShare,
      saveCheckedSku,
      iepSwitch,
      iepInfo
    } = this.props.relaxProps;

    // 组件刚执行完mount，搜索条件没有注入进来，先不加载WmListView，避免先进行一次无条件搜索，再立刻进行一次有条件搜索
    if (!initialEnd) {
      return null;
    }

    // 是否是分销员
    let isDistributor = WMkit.isDistributor();

    const extraData = {};
    const listViewProps = {
      loadingStyle: { marginTop: 200 },
      url: '/appointmentsale/appointmentSalePage',
      params: {},
      style: styles.bigBox,
      isPagination: true,
      dataPropsName: 'context.appointmentRecordPage.content',
      otherProps: ['appointmentSaleGoodsInfo'],
      renderRow: (item) => {
        return (
          <SkuItem
            changeShowShare={() => changeShowShare()}
            saveCheckedSku={(checkedSku) => saveCheckedSku(checkedSku)}
            goodsItem={item}
            key={item.id}
            isShow={isShow}
            isDistributor={isDistributor}
            iepInfo={iepInfo}
            iepSwitch={iepSwitch}
          />
        );
      },
      extraData: extraData,
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

const styles = StyleSheet.create({
  bigBox: {}
});
