import React from 'react';

import { Relax } from 'plume2';
import { fromJS } from 'immutable';

import GoodItem from './good-item';
import { screenHeight, screenWidth } from 'wmkit/styles/index';
import WmListView from 'wmkit/list-view/index';
import { noop } from 'wmkit/noop';
import * as _ from '../../../wmkit/common/util'; // added by scx
import { isAndroid } from 'wmkit/styles/index';

@Relax
export default class GoodsList extends React.Component {
  static relaxProps = {
    goodsJson: 'goodsJson',
    checkedItems: 'checkedItems',
    checkAll: 'checkAll',
    isEdit: 'isEdit',
    checkSingleItem: noop,
    deleteInvalidGoods: noop,
    initFollowList: noop,
    toRefresh: 'toRefresh',
    //评价相关信息是否展示
    isShow: 'isShow',
    iepSwitch: 'iepSwitch',
    iepCustomerFlag: 'iepCustomerFlag',
    isSkeletonShow: noop,
    saveCheckedSku: noop,
    deleteSku: noop
  };

  render() {
    const {
      isEdit,
      checkedItems,
      initFollowList,
      toRefresh,
      isShow,
      iepSwitch,
      deleteSku,
      isSkeletonShow,
      saveCheckedSku
    } = this.props.relaxProps;
    const extraData = {
      isEdit: isEdit,
      checkedItems: checkedItems,
      toRefresh: toRefresh
    };

    return (
      <WmListView
        needRefresh={toRefresh}
        loadingStyle={{ marginTop: 200 }}
        url="/goods/goodsFollows"
        style={{ flex: 1, marginBottom: isEdit ? (_.isIphoneX() ? 90 : 56) : 0 }}
        isPagination={true}
        otherProps={[
          'goodsIntervalPrices',
          'appointmentSaleVOList',
          'bookingSaleVOList',
          'goodses'
        ]}
        loadingStatus={(flag) => {
          isSkeletonShow(flag);
        }}
        renderRow={(item, extraData) => {
          const checked =
            extraData.checkedItems.toJS().indexOf(item.goodsInfoId) != -1;
          return (
            <GoodItem
              saveCheckedSku={(sku) => saveCheckedSku(sku)}
              checked={checked}
              goodItem={fromJS(item)}
              isEdit={extraData.isEdit}
              key={item.goodsInfoId}
              checkedBackFun={this.checkedBackFun}
              isShow={isShow}
              iepFlag={iepSwitch}
              deleteSku={deleteSku}
            />
          );
        }}
        extraData={extraData}
        onDataReached={(res) => initFollowList(res)}
        keyProps="goodsInfoId"
        noMoreStyle={{backgroundColor:'transparent'}}
      />
    );
  }

  checkedBackFun = (checked, id) => {
    this.props.relaxProps.checkSingleItem(checked, id);
  };
}
