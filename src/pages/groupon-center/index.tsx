import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Animated,
  ImageBackground,
  Text,
  Image
} from 'react-native';

import { connect } from 'react-redux';

import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import { registerReducer } from '@/redux/store';
import Header from 'wmkit/header';
import WMGrouponFooter from 'wmkit/groupon-footer';
import GrouponSearch from 'wmkit/biz/groupon/groupon-search';
import * as _ from 'wmkit/common/util';

import AdvBanner from './components/adv-banner';
import HotRecommend from './components/hot-recommend';

import CateTab from './components/cate-tab';

import GrouponGoodsList from './components/groupon-goods-list';

import { link, fetchModal, setModalShow } from '../../../wmkit/adv-modal';

import ModalShow from '../../../wmkit/biz/modal-show';
import LinearGradient from 'react-native-linear-gradient';
import { isAndroid, screenWidth } from 'styles';
@connect<Partial<T.IProps>, any>(
  store2Props,
  actions
)
export default class GrouponCenter extends React.Component<
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
    this.props.actions.init();
    this.updateModalStatus('');
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      main: { keyWords,grouponAdvert }
    } = this.props;
    let adverts = grouponAdvert ? JSON.parse(grouponAdvert) : [];
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          iosautomaticallyAdjustContentInsets={false}
        >
          <ImageBackground
            style={styles.boxs}
            resizeMode="stretch"
            source={require('wmkit/theme/bg.png')}
          >
            <Header
              title="拼购"
              style={{ zIndex: 1000, backgroundColor: 'transparent' }}
              titleStyle={{ color: '#fff' }}
              imgStyle={{
                width: 20,
                height: 20
              }}
            />
            <GrouponSearch queryString={keyWords} boxStyle={{paddingTop: 4}}/>
          </ImageBackground>
          <View style={styles.bottom}>
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
                <View />
                {adverts.length > 0 && <AdvBanner />}
                {/* <HotRecommend /> */}
              </View>
              <View style={{ marginTop: 12 }}>
                <CateTab
                  stickyHeaderY={this.state.headHeight}
                  stickyScrollY={this.state.scrollY}
                />
                <GrouponGoodsList />
              </View>
            </Animated.ScrollView>
          </View>
        </ScrollView>
        <WMGrouponFooter currTab="拼购" />
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
    const res = await fetchModal('groupChannel');
    let popupId = '';
    if (!id && res && res.length > 0) {
      popupId = res[0].popupId;
    } else {
      popupId = id;
    }
    const flagParams = await setModalShow(res, 'groupChannel', popupId);
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

import grouponCenterMain from './reducers/main';
import { f } from 'android/app/build/intermediates/assets/debug/Web.bundle/vendor_base.dll';

registerReducer({ grouponCenterMain });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    position: 'relative'
  },
  index: {
    backgroundColor: '#fafafa',
    flex: 1,
    position: 'relative'
  },
  containers: {
    height: 196,
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    overflow: 'hidden'
  },
  box: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17,
    zIndex: 4
  },
  boxs: {
    height: 196,
  },
  bgImg: {
    paddingTop: 100,
    height: 196,
    width: '100%',
    position: 'absolute',
    zIndex: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  title: {
    color: '#fff',
    fontSize: 18,
    backgroundColor: 'transparent',
    position: 'absolute',
    ..._.ifIphoneX(
      {
        top: 40
      },
      {
        top: isAndroid ? 40 : 30
      }
    )
  },
  bottom: {
  }
});
