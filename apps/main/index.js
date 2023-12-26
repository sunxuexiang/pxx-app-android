import React from 'react';
import { StyleSheet, Image, Platform, StatusBar, View } from 'react-native';

import { StoreProvider, msg } from 'plume2';
import { config } from 'wmkit/config';
import * as _ from '../../wmkit/common/util'; // added by scx
import AppStore from './store';
import SearchBar from './components/search';
import MagicWebview from '../../wmkit/biz/magic-webview/index';
import { link, fetchModal, setModalShow } from '../../wmkit';
import ModalShow from '../../wmkit/biz/modal-show';
import { screenWidth, screenHeight } from '@/wmkit/styles';
import BigModal from '../../wmkit/modal/BigModel';
const isAndroid = Platform.OS == 'android';
import SkeletonMain from './components/Skeleton-main';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class Main extends React.Component {
  _webview;
  constructor(props) {
    super(props);
    this.state = {
      isModalFlag: false,
      imgUrl: '',
      imgHeight: 0,
      jumpPage: {},
      nextPopupId: '',
      isMagicReload: false,
      showRegisterModel: false,
      isFull: false
    };
  }
  UNSAFE_componentWillMount() {
    ///隐私弹窗
    this.store.showPrivacyPolicyModal().then((result) => {
      if (!result) {
        //升级弹窗
        this.store.upgradeSetting().then((result) => {
          if (!result) {
            //魔方首页弹窗
            this.updateModalStatus('');
          }
        });
      }
    });
    //注册升级弹窗监听
    msg.on('upgradeSetting:show', this.upgradeSetting);
    //魔方首页弹窗监听
    msg.on('isMagicModalFlag:show', this.magicModelShow);
    msg.on('message:refresh', this.update);
  }
  componentDidMount() {
    msg.emit('purchaseNum:refresh');
    this.store.init();
  }

  componentWillUnmount() {
    //注册升级弹窗监听
    msg.off('upgradeSetting:show',this.upgradeSetting);
    //魔方首页弹窗监听
    msg.off('isMagicModalFlag:show',this.magicModelShow);
    msg.off('message:refresh',this.update);
  }

  update = () => {
    this.store.init();
  }

  render() {
    // Loader.html缓存的方式有问题，需要改s
    let source =
      (Platform.OS === 'android' ? 'file:///android_asset/' : '') +
      'Web.bundle/loader.html';
    // let source = config.MAGIC_HOST + '/index';
    const modalVisible = this.store.state().get('modalVisible');
    const geolocationVisible = this.store.state().get('geolocationVisible');
    const loading = this.store.state().get('loading');
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <MagicWebview source={source} magicLoad={this.store.loading} isMagicReload={this.state.isMagicReload} magicReload = {this.magicReload.bind(this)}/>
        {/* 骨架屏 */}
        {loading && <View style={styles.skeleton}><SkeletonMain/></View>}
        <SearchBar />
        <ModalShow
          imgUrl={this.state.imgUrl}
          imgHeight={this.state.imgHeight}
          link={() => link(this.state.jumpPage)}
          handleClose={() => this.handleClose()}
          isModalFlag={this.state.isModalFlag}
          isFull={this.state.isFull}
        />
        <BigModal
          visibility={modalVisible}
          title='暂无收货地址'
          message='请前往个人中心设置收货地址'
          btnText='设置地址'
          onRequestClose={()=>this.store.setModalVisible()}
          onBtnPress={()=>this.btnSuccess()}
        />
        <BigModal
          visibility={geolocationVisible}
          title='定位服务未开启'
          message='请进入系统【设置】》【隐私】[定位服务]中打开开关，并允许超级大白鲸使用定位服务'
          btnText='立即开启'
          onRequestClose={()=>this.store.setGeolocationVisible()}
          onBtnPress={()=>this.store.openSettings()}
        />
      </View>
    );
  }
  magicLoad = (flag) => {
    this.store.loading(flag);
  }


  upgradeSetting = () => {
    this.store.upgradeSetting().then((result) => {
      if (!result){
        //魔方首页弹窗
        this.updateModalStatus('');
      }
    });
  };
  magicReload = () => {
    let { isMagicReload } = this.state;
    this.setState({
      isMagicReload: !isMagicReload
    });
  }
  async updateModalStatus(id) {
    const res = await fetchModal('shoppingIndex');
    let popupId = '';
    if (!id && res && res.length > 0) {
      popupId = res[0].popupId;
    } else {
      popupId = id;
    }
    const flagParams = await setModalShow(res, 'shoppingIndex', popupId);
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


  magicModelShow = async () => {
    //注册赠券则不展示魔方首页弹窗
    const showRegisterModel = this.state.showRegisterModel;
    if(!showRegisterModel){
      const res = await fetchModal('shoppingIndex');
      let popupId = '';
      if (res && res.length > 0) {
        popupId = res[0].popupId;
      }
      const flagParams = await setModalShow(res, 'shoppingIndex', popupId);
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
  };




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

  btnSuccess=()=>{
    this.store.setModalVisible();
    msg.emit('router: goToNext', { routeName: 'UserReceiveAddress' });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    // height:screenHeight,
    ..._.ifIphoneX(
      {
        paddingTop: -44
      },
      {
        paddingTop: isAndroid ? 0 : -20
      }
    )
  },
  loadingIndex: {
    flex: 1,
    justifyContent: 'center'
  },
  skeleton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
