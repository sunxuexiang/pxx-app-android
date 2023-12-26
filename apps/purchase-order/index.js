import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform
} from 'react-native';

import { StoreProvider, msg, Action } from 'plume2';
import Header from 'wmkit/header';
import { noop } from 'wmkit/noop';

import PurchaseContainer from './components/purchase-container';
import Tips from './components/tips';
import Bottom from './components/bottom';
import PanelBottom from './components/panel-bottom';
import NotLogin from './components/not-login';
import AppStore from './store';
import { link, fetchModal, setModalShow, WMRetailChoose } from 'wmkit';
import ModalShow from '../../wmkit/biz/modal-show';
import WMDeliveryAddress from 'wmkit/delivery-address';
import BigModal from '../../wmkit/modal/BigModel';
import TipModal from '../../wmkit/modal/tipModal';
import { fromJS } from 'immutable';
import Loading from 'wmkit/loading';
const isAndroid = Platform.OS === 'android';
const majorVersionIOS = parseInt(Platform.Version);

@StoreProvider(AppStore, { debug: __DEV__ })
export default class PurchaseOrder extends React.Component {
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
  async UNSAFE_componentWillMount() {
    await this.store.selectWareAddress();
    this.store.init();
    msg.on('purchase:refresh', this.store.init);
    this.updateModalStatus('');
    msg.on('purchase:init', this.store.selectWareAddress);
    msg.emit('video:closeVideo');
  }

  componentWillUnmount() {
    msg.off('purchase:init', this.store.selectWareAddress);
  }

  render() {
    const {edit, loginFlag, show, cityInfo, spuContext,
      showRetailSaleVisible, iepDetail, geolocationVisible,
      addressModalVisible, isConfirmClick, outStockGoodsList,
      checkItemList, loadingVisible} = this.store.state().toJS();
    const state = this.props.route;
    let tipText = '以下商品库存不足或缺货，点击“知道了”系统将自动调整加购库存。',
      confirmText = '知道了',
      cancleText = null;
    if (isConfirmClick) {
      tipText = '以下商品库存不足或缺货，点击“结算”系统将自动按照当前库存计算。';
      confirmText = '结算';
      cancleText = '取消';
    }
    let goBackFlag = false;
    if (outStockGoodsList && outStockGoodsList.length > 0) {
      let checkSkus = checkItemList.filter((sku) => sku.checked);
      if (outStockGoodsList.filter((param) => param.stock <= 0).length == checkSkus.length) {
        goBackFlag = true;
        tipText = '以下商品库存不足或缺货，点击“调整购物车”系统将自动调整购物车库存。';
        confirmText = '调整购物车';
        cancleText = null;
      }
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Header
          title="购物车"
          renderLeft={
            state.name === 'PurchaseOrderWithoutBottom' ? '' : noop
          }
          renderRight={() => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ padding: 10 }}
                onPress={() => {
                  state.params && state.params._changeEdit();
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={{ fontSize: 12, color: 'rgba(0,0,0,0.8)', fontWeight: '500' }}
                >
                  {state.params && state.params.buttonName}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        {/* 地址 */}
        {!loadingVisible&&<WMDeliveryAddress cityInfo={cityInfo} sourceType={'PurchaseOrder'}/>}
         {/*<Address />*/}
        {!loginFlag && <NotLogin />}
        {loadingVisible && <Loading />}
        <PurchaseContainer />
        {/* {countInvalid > 0 && !edit && <Tips />} */}
        <Bottom />
        {show && <PanelBottom />}
        {/* 零售销售类型-规格选择弹框 */}
        <WMRetailChoose
          // key="10"
          source="1"
          data={spuContext}
          visible={showRetailSaleVisible}
          goodsInfoId={this.store.state().get('goodsInfoId')}
          changeSpecVisible={this.store.changeRetailSaleVisible}
          dataCallBack={this.store.changeSpecVisibleAndRender}
          iepInfo={fromJS(iepDetail)}
        />
        <ModalShow
          imgUrl={this.state.imgUrl}
          imgHeight={this.state.imgHeight}
          link={() => link(this.state.jumpPage)}
          handleClose={() => this.handleClose()}
          isModalFlag={this.state.isModalFlag}
          isFull={this.state.isFull}
        />
        <BigModal
          visibility={geolocationVisible}
          title='定位服务未开启'
          message='请进入系统【设置】》【隐私】[定位服务]中打开开关，并允许超级大白鲸使用定位服务'
          btnText='立即开启'
          onRequestClose={()=>this.store.setGeolocationVisible()}
          onBtnPress={()=>this.store.openSettings()}
        />
        <BigModal
          visibility={addressModalVisible}
          title='暂无收货地址'
          message='请前往个人中心设置收货地址'
          btnText='设置地址'
          onRequestClose={()=>this.store.setModalVisible()}
          onBtnPress={()=>this.btnSuccess()}
        />
        <TipModal
          visibility={this.store.state().get('isShowOutStock')}
          title='订单中存在缺货商品'
          message={tipText}
          btnText={confirmText}
          onRequestClose={()=>this.store.setTipVisible()}
          onBtnPress={()=>this._tipEvent(goBackFlag)}
          cancelText={cancleText}
          content={this.store.state().get('outStockGoodsList').toJS()}
        />
      </View>
    );
  }

  _tipEvent = (goBack) => {
    if (this.store.state().get('isConfirmClick')) {
      if (goBack) {
        this.store.toPressConfirm()
      } else {
        this.store.toConfirm(true);
      }
    } else {
      this.store.toPressConfirm()
    }
  };

  async updateModalStatus(id) {
    const res = await fetchModal('shoppingCart');
    let popupId = '';
    if (!id && res && res.length > 0) {
      popupId = res[0].popupId;
    } else {
      popupId = id;
    }
    const flagParams = await setModalShow(res, 'shoppingCart', popupId);
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

  btnSuccess=()=>{
    this.store.setModalVisible();
    msg.emit('router: goToNext', { routeName: 'UserReceiveAddress' });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    position: 'relative',
    // ..._.ifIphoneXR(
    //   {
    //     bottom: 78
    //   },
    //   {
    //     bottom: 48
    //   }
    // ),
  },
  header:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  cartCon: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
