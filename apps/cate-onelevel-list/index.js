import React, { Component } from 'react';
import {
  ScrollView,
  Platform,
  StatusBar,
  AppState,
  View,
  Animated,
  StyleSheet,
  Text
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { StoreProvider, msg } from 'plume2';
import AppStore from './store';
import SearchBar from './components/search-bar';
import CardCarousel from './components/card-carousel';
import TopNav from './components/top-nav';
import LeftMenu from './components/left-menu';
import FilterBar from './components/filter-bar';
import Filter from './components/filter';
import List from './components/goods-list';
import Swiper from 'react-native-swiper';
import { mainColor, screenWidth, screenHeight } from 'wmkit/styles/index';
import WMWholesaleChoose from 'wmkit/goods-choose/wholesale-choose';
import WMRetailChoose from 'wmkit/goods-choose/retail-choose';
import { Loading } from 'wmkit';
import { Provider } from '@ant-design/react-native';

const isAndroid = Platform.OS === 'android';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class GoodsCateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0), // 透明度初始值设为0
      isCoverCausoul:false   //滚动是否遮盖轮播图
    };
  }

  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const { cateId } = (state && state.params) || {};
    //初始化
    this.store.init(cateId);
  }
  componentWillUnmount(){
    msg.emit('purchaseNum:refresh')
  }
  _open() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start();
    this.setState({isCoverCausoul:false})
  }
  _out() {
    const state = this.store.state();
    const bannerList = state.get('bannerList');
    const isAllHide = bannerList.every((item) => item.get('isShow') == 1);
    const isShowCarousel = bannerList.size > 0 && !isAllHide;
    Animated.timing(this.state.fadeAnim, {
      toValue: isShowCarousel? -212:-72,
      duration: 500,
      useNativeDriver: true
    }).start();
    this.setState({isCoverCausoul:true})
  }
  render() {
    const state = this.store.state();
    const chosenSpu = state.get('chosenSpu');
    const wholesaleVisible = state.get('wholesaleVisible');
    const retailVisible = state.get('retailVisible');
    const iepInfo = state.get('iepInfo');
    const bannerList = state.get('bannerList');
    const {
      loadingVisible,
      secdCateList,
      activitySecondCate
    } = this.store.state().toJS();
    const isAllHide = bannerList.every((item) => item.get('isShow') == 1);
    const isShowCarousel = bannerList.size > 0 && !isAllHide;

    let causoulHeight = this.state.isCoverCausoul ? 160 : 0;

    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <Provider>
          <StatusBar barStyle={isAndroid ? 'light-content' : 'dark-content'} />
          {loadingVisible && <Loading />}
          <SearchBar />
          <View style={{overflow:'hidden', flex: 1}}>
            <Animated.View
              style={{ transform: [{ translateY: this.state.fadeAnim }] }}
              >
              {isShowCarousel && <CardCarousel />}

              <TopNav
                isShowCarousel={isShowCarousel}
                secdCateList={secdCateList}
                activitySecondCate={activitySecondCate}
                setSecdCate={this.store.setSecdCate}
              />
              {/*筛选*/}
              <Filter
                hide={this.store.state().get('tabName') !== 'goodsFilter'}
              />
              {secdCateList.length > 0 && (
                <View style={styles.content}>
                  <LeftMenu isShowCarousel={isShowCarousel} />
                  <View
                    style={[
                      styles.bigBox,
                      {
                        height: isShowCarousel
                          ? screenHeight - 250 + causoulHeight
                          : screenHeight - 180 + causoulHeight
                      }
                    ]}
                  >
                    <FilterBar />
                    <List
                      isShowCarousel={isShowCarousel}
                      isCoverCausoul={this.state.isCoverCausoul}
                      _open={this._open.bind(this)}
                      _out={this._out.bind(this)}
                    />
                  </View>
                </View>
              )}
            </Animated.View>
          </View>
          {/*批发销售类型-规格选择弹框*/}
          <WMWholesaleChoose
            data={chosenSpu}
            visible={wholesaleVisible}
            changeSpecVisible={this.store.changeWholesaleVisible}
          />

          {/*零售销售类型-规格选择弹框*/}
          <WMRetailChoose
            data={chosenSpu}
            visible={retailVisible}
            changeSpecVisible={this.store.changeRetailVisible}
            iepInfo={iepInfo}
          />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  bigBox: {
    width: screenWidth - 84,
    backgroundColor: '#fff'
  }
});
