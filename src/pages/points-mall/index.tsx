import React from 'react';
import {StyleSheet, View, Animated, Image} from 'react-native';

import { connect } from 'react-redux';

import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import { registerReducer } from '@/redux/store';
import WMIntegralFooter from 'wmkit/integral-footer';
import Header from 'wmkit/header';
import * as WMkit from 'wmkit/kit';

import PointsTop from './components/points-top';

import HotExchange from './components/hot-exchange';

import CateTab from './components/cate-tab';

// import Search from './components/search';

import PaymentModal from './components/payment-modal';

import PointsGoodsList from './components/points-goods-list';

import { link, fetchModal, setModalShow } from '../../../wmkit/adv-modal';

import ModalShow from '../../../wmkit/biz/modal-show';

@connect<Partial<T.IProps>, any>(
  store2Props,
  actions
)
export default class PointsMall extends React.Component<
  Partial<T.IProps>,
  any
> {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      headHeight: -1,
      isModalFlag: false,
      imgUrl: '',
      imgHeight: 0,
      jumpPage: {},
      nextPopupId: '',
      isFull: false
    };
  }
  componentDidMount() {
    if (WMkit.isLoginOrNotOpen()) {
      this.props.actions.init();
    }
    this.props.actions.getCenterData();
  }
  UNSAFE_componentWillMount() {
    this.updateModalStatus('');
  }
  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="积分商城" />
        <Animated.ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          automaticallyAdjustContentInsets={false}
          onScroll={
            Animated.event(
              [
                {
                  nativeEvent: { contentOffset: { y: this.state.scrollY } } // 记录滑动距离
                }
              ],
              { useNativeDriver: true }
            ) // 使用原生动画驱动
          }
          scrollEventThrottle={1}
        >
          <View
            onLayout={(e) => {
              let { height } = e.nativeEvent.layout;
              this.setState({ headHeight: height }); // 给头部高度赋值
            }}
          >
            <PointsTop />
            <HotExchange />
          </View>

          <CateTab
            stickyHeaderY={this.state.headHeight}
            stickyScrollY={this.state.scrollY}
          />
          <PointsGoodsList />
        </Animated.ScrollView>
        <WMIntegralFooter currTab="积分商城" />
        <ExchangeCouponModal />
        <PaymentModal />
        <ModalShow
          imgUrl={this.state.imgUrl}
          imgHeight={this.state.imgHeight}
          link={() => link(this.state.jumpPage)}
          handleClose={() => this.handleClose()}
          isModalFlag={this.state.isModalFlag}
          isFull={this.state.isFull}
        />
      </View>
    );
  }
  async updateModalStatus(id) {
    const res = await fetchModal('integralMall');
    let popupId = '';
    if (!id && res && res.length > 0) {
      popupId = res[0].popupId;
    } else {
      popupId = id;
    }
    const flagParams = await setModalShow(res, 'integralMall', popupId);
    if (flagParams && flagParams.imgUrl) {
        Image.getSize(
            flagParams.imgUrl,
            (width, height) => {
                // 用最大宽度280算img的最大的高度
                let imgHeight = Math.floor((280 / width) * height);
                this.setState({
                    imgHeight: imgHeight > 400 ? 400 : imgHeight
                });
            },
            (error) => console.log(error)
        );
    }
    this.setState(
      {
        isModalFlag: flagParams.showFlag,
        imgUrl: flagParams.imgUrl,
        jumpPage:
          (flagParams.jumpPage && JSON.parse(flagParams.jumpPage)) || '',
        nextPopupId: flagParams.nextPopupId,
        isFull: flagParams.isFull
      },
      () => {
        if (this.state.nextPopupId && !this.state.isModalFlag) {
          this.isGo(this.state.nextPopupId);
        }
      }
    );
  }

  async isGo(id) {
    await this.updateModalStatus(id);
  }
  handleClose() {
    this.setState({ isModalFlag: false }, async () => {
      if (this.state.nextPopupId) {
        await this.updateModalStatus(this.state.nextPopupId);
      }
    });
  }
}

//==动态注入reducer===

import pointsMallMain from './reducers/main';
import ExchangeCouponModal from '@/pages/points-mall/components/exchange-coupon-modal';

registerReducer({ pointsMallMain });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    position: 'relative'
  }
});
