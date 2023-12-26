import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { msg } from 'plume2';
import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import { registerReducer } from '@/redux/store';
import ShareModal from 'wmkit/goods-share-modal';
import Header from 'wmkit/header';
import WMGrouponChoose from 'wmkit/goods-choose/groupon-choose';
import Loading from 'wmkit/loading';

import { fromJS } from 'immutable';

import Notice from './components/notice';

import GroupBuyTip from './components/group-buy-tip';

import GoodsDetail from './components/goods-detail';

import DetailBottom from './components/detail-bottom';

import PlayWay from './components/play-way';

import JoinGroup from './components/join-group';

import GoodsList from './components/goods-list';

import JoinPeopleModal from './components/join-people-modal';

import WaitGroupModal from './components/wait-group-modal';

@connect<Partial<T.IProps>, any>(
  store2Props,
  actions
)
export default class GroupBuyDetail extends React.Component<
Partial<T.IProps>,
any
> {
  componentDidMount() {
    const state = this.props.route;
    const { grouponNo } = (state && state.params) || {};
    this.props.actions.init(grouponNo);
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: { action },
      activity,

      goods,

      notice,

      otherGroup
    } = this.props;

    return activity.isReady ? (
      <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <Header
          // onLeftMenuPress={() => {
          //   //返回
          //   msg.emit('router: backToLast');
          //   //刷新拼团详情
          //   msg.emit('router: refreshRoute', {
          //     routeName: 'SpellGroupDetail'
          //   });
          // }}
          title="参团详情"
        />
        <Notice />
        {/* <GroupBuyTip /> */}
        <ScrollView
          //ref={(r) => (this.bigView = r)}
          style={{ zIndex: -1 }}
          keyboardShouldPersistTaps="always"
        >
          <GoodsDetail />
          <DetailBottom />
          <PlayWay />
          {activity.grouponDetailOptStatus == 5 &&
            otherGroup.grouponInstanceList.length > 0 && <JoinGroup />}
          <View style={styles.titleBox}>
            <View style={styles.titleLine}/>
            <Text style={styles.titleText}>精选拼团</Text>
            <View style={styles.titleLine}/>
          </View>
          <GoodsList />
        </ScrollView>
        {goods.joinPeopleModal && <JoinPeopleModal />}
        {goods.waitGroupModal && <WaitGroupModal />}
        <WMGrouponChoose
          //开团标识
          openGroupon={
            activity.grouponDetailOptStatus == 5 && goods.targetGroupNo == ''
              ? true
              : false
          }
          grouponData={activity.grouponDetails}
          data={goods.specModal ? goods.spuContext : {}}
          visible={goods.specModal}
          changeSpecVisible={action.toggleSpecModal}
          dataCallBack={() => { }}
          grouponNo={
            activity.grouponDetailOptStatus == 5 && goods.targetGroupNo == ''
              ? null
              : goods.targetGroupNo
          }
        />
        {goods.groupShareModal && (
          <ShareModal
            //团号
            grouponNo={activity.grouponNo}
            addSelfShop={false}
            //商品SKU信息
            goodsInfo={fromJS(
              goods.goodsInfos.filter(
                (info) => info.goodsInfoId == goods.goodsInfoId
              )[0]
            )}
            goods={fromJS(goods.goods)}
            //分享类型
            shareType={3}
            shareModalVisible={goods.groupShareModal}
            //弹窗关闭
            closeVisible={action.toggleGroupShareModal}
          />
        )}
      </View>
    ) : (
        <Loading />
      );
  }
}

//==动态注入reducer===

import groupBuyDetailActivity from './reducers/activity';

import groupBuyDetailGoods from './reducers/goods';

import groupBuyDetailNotice from './reducers/notice';

import groupBuyDetailOtherGroup from './reducers/otherGroup';
import { screenWidth } from 'wmkit/styles/index';

registerReducer({ groupBuyDetailActivity });

registerReducer({ groupBuyDetailGoods });

registerReducer({ groupBuyDetailNotice });

registerReducer({ groupBuyDetailOtherGroup });

const styles = StyleSheet.create({
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
    height: 52
  },
  titleLine: {
    width: 48,
    height: 1,
    backgroundColor: '#939393'
  },
  titleText: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.4)',
    fontWeight: '500',
    paddingHorizontal: 5
  }
});
