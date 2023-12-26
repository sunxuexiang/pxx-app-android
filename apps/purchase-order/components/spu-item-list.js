import React from 'react';
import { View, FlatList, Keyboard, Text, StyleSheet } from 'react-native';
import { Relax } from 'plume2';

import { noop } from 'wmkit/noop';
import { fromJS, is } from 'immutable';

import SpuItem from './spu-item';
import SkuItem from './sku-item';
import Check from 'wmkit/check';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';
import HeadPromotion from './head-promotion';
import { screenWidth } from '@/wmkit/styles';
import { checkAllQL } from '../ql';
import GiftItemList from './gift-item-list';
import InvalidList from './invalid-list';
import StockItemList from './stock-item-list';
import { WMRecommendList } from '@/wmkit';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

@Relax
export default class SpuItemList extends React.Component {
  //当前是不是正在获取更多的数据
  _isLoadingMore;
  static relaxProps = {
    skus: 'skus',
    spus: 'spus',
    edit: 'edit',
    stores: 'stores',
    marketingInit: noop,
    handlePagination: noop,
    checkAllQL: checkAllQL,
    loading: 'loading',
    init: noop,
    checkAll: noop,
    storeMarketingMap: 'storeMarketingMap',
    changeCoupon: noop,
    onSkuChange: noop,
    selectedMarketingGifts: 'selectedMarketingGifts',
    changeLoadingVisible: noop,
    selectWareAddress: noop,
    pageNum: 'pageNum',
    totalPages: 'totalPages',
    checkItemList: 'checkItemList',
    needScrollTop: 'needScrollTop'
  };

  constructor(props) {
    super(props);
    this._isLoadingMore = false;
  }

  render() {
    let { stores, spus, needScrollTop } = this.props.relaxProps;
    //获取店铺
    const store = stores.find(
      (store) => store.get('storeId') === this.props.storeId
    );
    //获取店铺的spu
    const storeSpus = store.get('goodsIds');
    let columnProps = { numColumns: 1 };
    let data = spus.filter((spu) => storeSpus.includes(spu.get('goodsId'))).toJS();
    if (this.refs.listRef && needScrollTop) {
      this.refs.listRef.scrollToOffset({ animated: false, offset: 0 });
    }
    return (
      <FlatList
        ref="listRef"
        data={data}
        renderItem={({ item, index }) => this._renderRow(item)}
        keyExtractor={(item) => item.goodsId}
        numColumns={1}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={this._renderHead}
        ListFooterComponent={this._renderFooter}
        //0.5表示距离内容最底部的距离为当前列表可见长度的一半时触发。
        onEndReachedThreshold={0.3}
        onEndReached={this._handlePagination}
        onScrollBeginDrag={() => {
          Keyboard.dismiss();
        }}
        {...columnProps}
        windowSize={300} //解决快速滑动 出现白屏问题  https://www.jianshu.com/p/656a8e7e489e
      />
    );
  }

  _renderRow = (spu) => {
    this._isLoadingMore = false;
    const { skus } = this.props.relaxProps;
    spu = fromJS(spu);
    let { marketingInit } = this.props.relaxProps;
    const renderSpuStatus = skus && skus.filter(
          (sku) =>
            sku &&
            spu.get('goodsInfoIds').includes(sku.get('goodsInfoId')) &&
            sku.get('goodsStatus') === 0 &&
            sku.get('delFlag') === 0
        )
        .count() > 1;
    if (renderSpuStatus) {
      return (
        <SpuItem
          spu={spu}
          key={spu.get('goodsId')}
          onSkuChange={this.props.onSkuChange}
        />
      );
    } else {
      //取出spu中只有一个sku的skuids
      const skuItems = skus && skus.filter(
        (sku) =>
          sku &&
          spu.get('goodsInfoIds').includes(sku.get('goodsInfoId')) &&
          sku.get('goodsStatus') === 0
      );
      const renderSkuStatus = skuItems && skuItems.count() === 1;
      const sku = skuItems && skuItems.get(0);
      // 营销
      const goodsInfoId = sku && sku.get('goodsInfoId');
      const { selectedMarketing, hasMarketing, hasManyMarketing } = marketingInit(
        goodsInfoId
      );
      return (
        renderSkuStatus && (
          <SkuItem
            sku={sku}
            key={`${sku && sku.get('goodsInfoId')}${selectedMarketing ? selectedMarketing.marketingId : ''}`}
            singleSpecFlag={spu.get('singleSpecFlag')}
            onSkuChange={this.props.onSkuChange}
            selectedMarketing={selectedMarketing}
            hasMarketing={hasMarketing}
            hasManyMarketing={hasManyMarketing}
          />
        )
      );
    }
  };

  _renderHead = () => {
    const {
      checkAll,
      stores,
      storeMarketingMap,
      edit,
      skus,
      checkAllQL
    } = this.props.relaxProps;
    return stores &&
      stores.map((store) => {
        //获取店铺的spu
        const storeSpus = store.get('goodsIds');
        // 店铺商品是否需要展示
        const showStoreGoodsFlag = skus && skus.some((sku) => {
          return (
            sku.get('goodsStatus') !== 2 &&
            storeSpus.includes(sku.get('goodsId'))
          );
        });
        return showStoreGoodsFlag && (
            <View style={styles.storeItem} key={store.get('storeId')}>
              <View style={styles.header}>
                <Check
                  checked={checkAllQL}
                  style={styles.check}
                  onCheck={() =>
                    checkAll(checkAllQL)
                  }
                />
                { //店铺是否自营
                  store.get('companyType') === 0 && (
                      <SelfSalesLabel />
                )}
                <View style={styles.titBox}>
                  <Text
                    style={styles.tit}
                    allowFontScaling={false}
                    numberOfLines={1}
                  >
                    {store.get('storeName')}
                  </Text>
                </View>
              </View>
              {!edit && storeMarketingMap && storeMarketingMap.get(store.get('storeId').toString()) ? (
                <HeadPromotion
                  marketings={storeMarketingMap.get(
                    store.get('storeId').toString()
                  )}
                />
              ) : null}
            </View>
          );
      });
  }

  _renderFooter = () => {
    const {
      stores,
      edit,
      pageNum,
      totalPages,
      checkItemList,
      skus
    } = this.props.relaxProps;
    const totalSkus = checkItemList && checkItemList.size > 0 && checkItemList.filter(sku => sku.get('goodsStatus') === 0);
    const renderSkus = skus && skus.size > 0 && skus.filter(sku => sku.get('goodsStatus') === 0);
    if ((pageNum == totalPages - 1) || (totalSkus.size > 0 && totalSkus.size == renderSkus.size)) {
      return stores &&
        stores.map((store) => {
          const giftList = this._mergeSelects(store.toJS());
          return (
            <View style={{paddingTop: 12}} key={store.get('storeId')}>
              {!edit && <GiftItemList list={giftList} allowCheck={false}/>}
              <StockItemList />
              <InvalidList />
              {/*为你推荐*/}
              <WMRecommendList type={'5'} />
            </View>
          );
        });
    } else {
      return null;
    }
  }

  _handlePagination = async () => {
    //防止重复获取数据
    if (this._isLoadingMore) {
      return;
    }
    this._isLoadingMore = true;
    let { handlePagination } = this.props.relaxProps;
    const res = await handlePagination();
    this._isLoadingMore = false;
  };
  //正常可选的商品
  getCollecrtGoods = (goodsInfos, storeSpus) => {
    if (!goodsInfos || goodsInfos.size <= 0) {
      return;
    }
    const { edit } = this.props.relaxProps;
    let correctGoodsInfos = goodsInfos.toJS().filter((item) => {
      return edit ? item.goodsStatus !== 2 && storeSpus.includes(item.goodsId) : item.goodsStatus === 0 && storeSpus.includes(item.goodsId);
    });
    return correctGoodsInfos;
  };
  _mergeSelects = (store) => {
    const {
      selectedMarketingGifts
    } = this.props.relaxProps;
    const selectedGifts = selectedMarketingGifts ? selectedMarketingGifts.toJS().filter((item) => item.storeId === store.storeId) : [];

    let mergeSelectedGifts = this._groupBy(selectedGifts, (item) => {
      return [item.goodsInfoId];
    });

    return mergeSelectedGifts.reduce((a, b) => {
      let goodsNum = 0;
      b.forEach((gift) => {
        goodsNum += gift.goodsNum;
      });
      b[0].goodsNum = goodsNum;
      a.push(b[0]);
      return a;
    }, []);
  };

  _groupBy = (array, f) => {
    let groups = {};
    array.forEach(function(o) {
      let group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function(group) {
      return groups[group];
    });
  };
}


const styles = StyleSheet.create({
  storeItem: {
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingRight: 12
  },
  check: {
    width: screenWidth <= 320 ? 39 : 42,
    height: screenWidth <= 320 ? 39 : 42,
  },
  tit: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14,
    fontWeight: '500'
  },
  titBox: {
    paddingLeft: 5,
    maxWidth: screenWidth - 132
    // marginRight: 5
  },
  clearBtn: {
    width: 115,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
    alignSelf: 'center'
  },
  clearText: {
    color: '#3d85cc',
    fontSize: 14
  }
});
