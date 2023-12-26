import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
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
import { screenHeight } from 'wmkit/styles/index';
import Drag from './drag';
import Loading from '@/wmkit/loading';
/**
 * 商品列表
 */
@Relax
export default class GoodsList extends React.Component {
  static relaxProps = {
    activitySecondCate: 'activitySecondCate',
    secdCateList: 'secdCateList',
    thirdCateList: 'thirdCateList',
    activityThirdCate: 'activityThirdCate',
    setThirdCate: noop,
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
    setSecdCate: noop,
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
    updatePurchaseCount: noop
  };
  constructor(props) {
    super(props);
    this.state = {
      dtoListParam: null,
      loading: false
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
      secdCateList,
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
      activitySecondCate,
      selectShareProfits,
      changeShowShare,
      saveCheckedSku,
      isIep,
      isShowTop,
      iepSwitch,
      iepInfo,
      pointsUsageFlag,
      activityThirdCate,
      thirdCateList,
      updatePurchaseCount
    } = this.props.relaxProps;

    // 组件刚执行完mount，搜索条件没有注入进来，先不加载WmListView，避免先进行一次无条件搜索，再立刻进行一次有条件搜索
    if (!initialEnd) {
      return null;
    }
    const secdCateListJS = secdCateList.toJS();
    const oriIndex = secdCateListJS.findIndex(
      (item) => item.cateId == activitySecondCate
    );

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
    if (sortType.get('type') === 'default') {
      sortFlag = 10;
    } else if (sortType.get('type') === 'composite') {
      sortFlag = 0;
    } else if (
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

    let causoulHeight = this.props.isCoverCausoul ? 160 : 0;
    const extraData = {};
    const listViewProps = {
      url: dataUrl,
      params: {
        keywords: keyword,
        cateId: activityThirdCate,
        companyType: companyType,
        pointsUsageFlag: pointsUsageFlag,
        brandIds: brandIds,
        propDetails: propDetails,
        sortFlag: sortFlag,
        goodsInfoType: 0,
        esGoodsInfoDTOList: this.state.dtoListParam,
        distributionGoodsAudit: distributionGoodsAudit,
        distributionGoodsStatus: distributionGoodsStatus,
        enterPriseGoodsStatus: enterPriseGoodsStatus,
        sortByCateBrand: true
      },
      loadingStyle: { marginTop: 300 },
      columnWrapperStyle: !listView && styles.bigBox,
      isPagination: true,
      dataPropsName:
        goodsShowType === 0
          ? 'context.esGoodsInfoPage.content'
          : 'context.esGoods.content',
      totalPageName: goodsShowType === 0 ? 'context.esGoodsInfoPage.totalPages' : 'context.esGoods.totalPages',
      otherProps: [
        'goodsIntervalPrices',
        'appointmentSaleVOList',
        'bookingSaleVOList'
      ],
      showRecommendFlag: true,
      noMoreStyle: { backgroundColor: 'transparent' },
      endReachedThreshold: 1,
      renderRow: (item) => {
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
              updatePurchaseCount={updatePurchaseCount}
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
              updatePurchaseCount={updatePurchaseCount}
            />
          );
        }
      },
      extraData: extraData,
      onDataReached: handleDataReached,
      renderEmpty: () => (
        <WMEmpty
          boxStyle={{height: this.props.isShowCarousel
            ? screenHeight - 340 + causoulHeight
            : screenHeight - 200 + causoulHeight, justifyContent: 'flex-start'}}
          imgStyle={{ width: 104, height: 104 }}
          tipStyle={{ color: '#999', fontSize: 14 }}
          emptyImg={require('../img/empty.png')}
          desc="商家还未上架商品，上滑浏览其他分类"
        />
      ),
      keyProps: 'id'
    };


    return (
      <View style={{ overflow: 'hidden', flex: 1 }}>
        <Drag secCateLen={secdCateList.size} secIndex={oriIndex} _onIndexChanged={this._onIndexChanged.bind(this)} _last={this._last.bind(this)} _next={this._next.bind(this)}>
          <WmListView
            _open={this.props._open}
            _out={this.props._out}
            _last={this._last.bind(this)}
            _next={this._next.bind(this)}
            _changeIsShowTop={this._changeisShowTop.bind(this)}
            logoLoading={true}
            needRefresh={false}
            isShowTop={this.state.isShowTop}
            oneCateloadingStyle={true}
            key="bigView"
            {...listViewProps}
            numColumns={2}
            showRecommendFlag={false}
            style={{
              height: this.props.isShowCarousel
                ? screenHeight - 250 + causoulHeight
                : screenHeight - 200 + causoulHeight
            }}
            needToTop={true}
          />
        </Drag>
        {this.state.loading && (
          <View style={styles.loading}>
            <Loading loadingStyle={{ marginTop: -200, marginLeft: -42 }} />
          </View>
        )}
      </View>
    );
  }
  _changeisShowTop(item) {
    this.setState({ isShowTop: item });
    !item ? this.props._open() : this.props._out();
  }
  async _onIndexChanged(type) {
    const {
      secdCateList,
      setSecdCate,
      activitySecondCate
    } = this.props.relaxProps;
    const secdCateListJS = secdCateList.toJS();
    const oriIndex = secdCateListJS.findIndex(
      (item) => item.cateId == activitySecondCate
    );
    let index = oriIndex;
    if (type == 'add' && index < secdCateListJS.length - 1) {
      index += 1;
    } else if (type == 'reduce' && index > 0) {
      index -= 1;
    } else if (
      (type == 'reduce' && index == 0) ||
      (type == 'add' && index == secdCateListJS.length)
    ) {
      return;
    }
    if(oriIndex !== index) {
      this.setState({ loading: true, autoReplace: false });
      await setSecdCate(secdCateListJS[index].cateId);
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);
    }
  }
  // 加载前一个类目
  _last() {
    let {
      thirdCateList,
      activityThirdCate,
      setThirdCate,
      secdCateList,
      activitySecondCate,
      setSecdCate
    } = this.props.relaxProps;
    secdCateList = secdCateList.toJS();
    // 当前选中的二级类目的下标
    const activeSecIndex = secdCateList.findIndex((item) => item.cateId === activitySecondCate);
    // 当前选中的三级类目的下标
    const activeThirdIndex = thirdCateList.findIndex((item) => item.cateId === activityThirdCate);
    // 当前为第一个三级类目
    if (activeThirdIndex === 0) {
      // 当前不是第一个二级类目
      if (activeSecIndex > 0) {
        // 切换到前一个二级类目
        setSecdCate(secdCateList[activeSecIndex - 1].cateId);
      }
    } else {
      thirdCateList.map((item, index) => {
        if (item.cateId === activityThirdCate && index > 0) {
          setThirdCate(thirdCateList[index - 1].cateId);
        }
      });
    }
  }
  // 加载后一个类目
  _next() {
    let {
      thirdCateList,
      activityThirdCate,
      setThirdCate,
      secdCateList,
      activitySecondCate,
      setSecdCate
    } = this.props.relaxProps;
    secdCateList = secdCateList.toJS();
    // 当前选中的二级类目的下标
    const activeSecIndex = secdCateList.findIndex((item) => item.cateId === activitySecondCate);
    // 当前选中的三级类目的下标
    const activeThirdIndex = thirdCateList.findIndex((item) => item.cateId === activityThirdCate);
    // 当前为最后一个三级类目
    if (activeThirdIndex === thirdCateList.length - 1) {
      // 当前不是最后一个二级类目
      if (activeSecIndex < secdCateList.length - 1) {
        // 切换到前一个二级类目
        setSecdCate(secdCateList[activeSecIndex + 1].cateId);
      }
    } else {
      thirdCateList.map((item, index) => {
        if (
          item.cateId === activityThirdCate &&
          index < thirdCateList.length - 1
        ) {
          setThirdCate(thirdCateList[index + 1].cateId);
        }
      });
    }
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
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 200,
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff'
  }
});
