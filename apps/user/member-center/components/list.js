//会员最爱买这边只放
//商品大图列表 大图列表分为SKU和SPU商品列表

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Relax } from 'plume2';
import WmListView from 'wmkit/list-view/index';
import SkuItem from '../components/sku-item';

@Relax
export default class GoodsList extends React.Component {
  static relaxProps = {
    nowPossessGradeInfo: 'nowPossessGradeInfo',
    notGetGradeList: 'notGetGradeList'
  };

  /**
   * 店铺信息
   */
  _infoRow = (item) => {
    return <SkuItem goodsItem={item} listView={false} key={item.id} />;
  };

  render() {
    const { nowPossessGradeInfo, notGetGradeList } = this.props.relaxProps;
    const isShow =
      nowPossessGradeInfo.get('customerLevelRightsVOS') &&
        nowPossessGradeInfo.get('customerLevelRightsVOS').size == 0 &&
        notGetGradeList.size == 0
        ? false
        : true;
    return (
      <View>
        {/* {
          isShow && <View style={{height: 144}}></View>

        } */}
        <View style={styles.nav}>
          <Text allowFontScaling={false} style={styles.text}>
            会员最爱买
          </Text>
        </View>
        <WmListView
          keyProps="id"
          url="/goods/skus"
          isPagination={false}
          pageSize={20}
          numColumns={2}
          otherProps={['goodsIntervalPrices']}
          renderRow={this._infoRow}
          columnWrapperStyle={styles.bigBox}
          params={{
            keywords: '',
            brandIds: [],
            sortFlag: 0,
            esGoodsInfoDTOList: [],
            stockFlag: 1
          }}
        />
      </View>
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
  },
  nav: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb'
  },
  text: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center'
  }
});
