import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';

import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import { registerReducer } from '@/redux/store';
import Header from 'wmkit/header';
import Good from './components/good';

@connect<Partial<T.IProps>, any>(
  store2Props,
  actions
)
export default class FlashSaleGoodsPanicBuying extends React.Component<
  Partial<T.IProps>,
  any
> {
  componentDidMount() {
    const state = this.props.route;
    const { flashSaleGoodsId, flashSaleGoodsNum } = state && state.params;

    this.props.actions.init(flashSaleGoodsId, flashSaleGoodsNum);
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: { action },
      main
    } = this.props;

    const goodsInfo: any = main.goodsInfo;
    if (JSON.stringify(goodsInfo)=='{}') {
      return <View/>;
    }
    return (
      <View style={{ backgroundColor: '#f5f5f5', flex: 1 }}>
        <Header title={'抢购中'} />
        <Good
          goodImage={goodsInfo.goodImage}
          goodName={goodsInfo.goodName}
          goodIntro={goodsInfo.goodIntro}
          goodPrice={goodsInfo.goodPrice}
        />
      </View>
    );
  }
}

//==动态注入reducer===

import flashSaleGoodsPanicBuyingMain from './reducers/main';

registerReducer({ flashSaleGoodsPanicBuyingMain });

const styles = StyleSheet.create({
  index: {}
});
