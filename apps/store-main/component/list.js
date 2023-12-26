import React from 'react';
import { Relax } from 'plume2';
import { fromJS } from 'immutable';
import { RefreshControl, Text, View } from 'react-native';

import WMEmpty from 'wmkit/empty';
import { noop } from 'wmkit/noop';

import * as _ from '../../../wmkit/common/util'; // added by scx
import Styled from 'styled-components/native';
import GoodsItem from './goods-item';
import * as WMkit from 'wmkit/kit';

const ListBox = Styled.ScrollView`
  flex: 1
  background-color: #fff
`;
const TitleBox = Styled.View`
  padding-left: 10
  padding-top: 10
  padding-bottom: 10
  background-color: #fafafa
`;
const Title = Styled.Text`
  color: #666
  font-size: 12
`;

@Relax
export default class List extends React.Component {
  static relaxProps = {
    skus: 'skus',
    refreshState: 'refreshState',
    refreshSku: noop,
    refresh: noop,
    changeShowShare: noop,
    saveCheckedSku: noop,
    isShow: 'isShow',
    iepInfo: 'iepInfo',
    iepSwitch: 'iepSwitch',
    appointmentSaleVOList: 'appointmentSaleVOList',
    bookingSaleVOList: 'bookingSaleVOList'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      skus,
      refresh,
      refreshSku,
      refreshState,
      isShow,
      changeShowShare,
      saveCheckedSku,
      iepInfo,
      iepSwitch,
      appointmentSaleVOList,
      bookingSaleVOList
    } = this.props.relaxProps;

    // 是否是分销员
    let isDistributor1 = WMkit.isDistributor();

    return (
      <ListBox
        contentContainerStyle={{
          ..._.ifIphoneX(
            {
              paddingBottom: 85
            },
            {
              paddingBottom: 50
            }
          )
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshState}
            onRefresh={() => {
              refresh();
              refreshSku(this.props.storeId);
              refresh();
            }}
          />
        }
      >
        <TitleBox>
          <Title allowFontScaling={false}>店铺上新</Title>
        </TitleBox>
        {skus.count() > 0 ? (
          skus
            .toJS()
            .map((sku) => (
              <GoodsItem
                key={sku.id}
                goodsItem={fromJS(sku)}
                isDistributor={isDistributor1}
                isShow={isShow}
                changeShowShare={() => changeShowShare()}
                saveCheckedSku={(checkedSku) => saveCheckedSku(checkedSku)}
                iepInfo={iepInfo}
                iepSwitch={iepSwitch}
                appointmentSaleVOList={appointmentSaleVOList}
                bookingSaleVOList={bookingSaleVOList}
              />
            ))
        ) : (
          <WMEmpty
            emptyImg={require('../img/empty.png')}
            desc="店铺首页还没有装修哦"
          />
        )}
        {skus.count() > 0 && (
          <View
            key={4}
            style={{
              height: 60,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{ color: '#999' }}>没有更多了</Text>
          </View>
        )}
      </ListBox>
    );
  }
}
