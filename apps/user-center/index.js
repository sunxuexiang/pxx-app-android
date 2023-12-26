import React from 'react';
import { View, StyleSheet, Image, ScrollView, Text, SafeAreaView } from 'react-native';

import * as WMkit from 'wmkit/kit';
import { config } from 'wmkit/config';

import { StoreProvider ,msg} from 'plume2';

import AppStore from './store';
import Header from './components/head';
import Collec from './components/collec';
import Order from './components/order';
import Assets from './components/assets';
import UserCenterBottom from './components/bottom';
import CommandTool from './components/command-tool';
import { link, fetchModal, setModalShow, WMRecommendList } from 'wmkit';
import ModalShow from 'wmkit/biz/modal-show';
const { LAST_YEAR, OWNER, START_YEAR } = config;

@StoreProvider(AppStore, { debug: __DEV__ })
export default class UserCenter extends React.Component {
  store;

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
  componentDidMount() {
    if (WMkit.isLoginOrNotOpen()) {
      this.store.init();
    } else {
      this.store.basicRules();
      this.store.initOnLineSerivce();
      this.store.isShow();
    }
    msg.emit('video:closeVideo');

  }
  render() {
    const isShow = this.store.state().get('isShow');
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
          iosautomaticallyAdjustContentInsets={false}
        >
          <Header />
          <View style={styles.bottom}>
            <Collec />
            <Order isShow={isShow} />
            <Assets />
            <CommandTool />
            {/*为你推荐*/}
            <WMRecommendList type={'0'}/>
            {/* <View style={styles.copyRight}>
              <Text allowFontScaling={false} style={styles.copyText}>
                ©
                {START_YEAR === LAST_YEAR
                  ? START_YEAR
                  : START_YEAR + ' - ' + LAST_YEAR}
                {OWNER}
              </Text>
            </View> */}
          </View>
        </ScrollView>
        <UserCenterBottom />
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
    const res = await fetchModal('personalCenter');
    let popupId = '';
    if (!id && res && res.length > 0) {
      popupId = res[0].popupId;
    } else {
      popupId = id;
    }
    const flagParams = await setModalShow(res, 'personalCenter', popupId);
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
  },
  copyRight: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 5
  },
  copyText: {
    fontSize: 12,
    backgroundColor: 'transparent',
    lineHeight: 18,
    color: '#999999'
  },
  bottom: {
    paddingHorizontal: 12,
    marginTop: -40
  }
});
