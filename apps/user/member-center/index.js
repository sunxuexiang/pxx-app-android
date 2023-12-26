import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { StoreProvider } from 'plume2';
import AppStore from './store';
import WMIntegralFooter from 'wmkit/integral-footer';
import Head from './components/head';
import LevelPower from './components/level-power';
import List from './components/list';
import HotRecommend from './components/hot-recommend';
import { link, fetchModal, setModalShow, Header } from '../../../wmkit';
import ModalShow from '../../../wmkit/biz/modal-show';
/**
 * 会员中心
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class MemberCenter extends React.Component {
  store;

  componentDidMount() {
    this.store.init();
    this.store.getPointsInfo();
    this.store.basicRules();
  }
  constructor(props) {
    super(props);
    this.state = {
      isModalFlag: false,
      imgUrl: '',
      imgHeight: 0,
      jumpPage: {},
      nextPopupId: '',
      isFull: false
    };
  }
  UNSAFE_componentWillMount() {
    this.updateModalStatus('');
  }
  render() {
    return (
      <View style={styles.container}>
        <Header title="会员中心" />
        <ScrollView
            style={{flexGrow:1}}
          contentContainerStyle={{ flexGrow: 1 }}
          iosautomaticallyAdjustContentInsets={false}
        >
          <Head/>
          <LevelPower />
          <HotRecommend />
          <List />
        </ScrollView>
        <WMIntegralFooter currTab="会员中心" />
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
    const res = await fetchModal('memberCenter');
    let popupId = '';
    if (!id && res && res.length > 0) {
      popupId = res[0].popupId;
    } else {
      popupId = id;
    }
    const flagParams = await setModalShow(res, 'memberCenter', popupId);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    position: 'relative'
  }
});
