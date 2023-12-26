import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';

import { connect } from 'react-redux';
import Header from 'wmkit/header';
import WMGrouponFooter from 'wmkit/groupon-footer';

import GrouponSearch from 'wmkit/biz/groupon/groupon-search';

import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import { registerReducer } from '@/redux/store';
import * as _ from 'wmkit/common/util';
import CateTab from './components/cate-tab';
import GrouponGoodsList from './components/groupon-goods-list';
@connect<Partial<T.IProps>, any>(
  store2Props,
  actions
)
export default class GrouponSelection extends React.Component<
  Partial<T.IProps>,
  any
> {
  componentDidMount() {
    this.props.actions.init();
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      main: { keyWords }
    } = this.props;

    return (
      <View style={styles.index}>
        <View style={styles.box}>
          <ImageBackground
            style={styles.boxs}
            resizeMode="stretch"
            source={require('wmkit/theme/bg.png')}
          >
            <Header
              title="热拼排行"
              style={{backgroundColor:'transparent',zIndex:3}}
              titleStyle={{color:'#fff'}}
              imgStyle={{
                width: 20,
                height: 20
              }}
            />
            <GrouponSearch queryString={keyWords} boxStyle={{paddingTop: 4}}/>
            <CateTab />
          </ImageBackground>
        </View>
        <GrouponGoodsList />
        <WMGrouponFooter currTab="热拼排行" />
      </View>
    );
  }
}

//==动态注入reducer===

import grouponSelectionMain from './reducers/main';

registerReducer({ grouponSelectionMain });

const styles = StyleSheet.create({
  index: {
    backgroundColor: '#f5f5f5',
    flex: 1
  },
  box: {
    marginBottom: -60
  },
  boxs: {
    position: 'relative',
    flexDirection: 'column',
    ..._.ifIphoneX(
      {
        height: 250,
      },
      {
        height: 230,
      }
    ),
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: 'hidden'
  },
});
