import React, { Component } from 'react';
import { StoreProvider, msg } from 'plume2';
import { View, ScrollView ,TouchableOpacity,StyleSheet,Text} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from 'wmkit/header';
import * as _ from '../../wmkit/common/util'; // added by scx
import AppStore from './store';
import Address from './component/address';
import ToolBar from './component/tool-bar';
import StoreList from './component/store-list';
import AllAmount from './component/all-amount';
import AnnexMask from './component/annex-mask';
import Presale from './component/presale';
import DeliverType from './component/deliver-type';
import { Provider } from '@ant-design/react-native';
import Loading from 'wmkit/loading';
import TipModal from '../../wmkit/modal/tipModal';
import { mainColor } from 'wmkit/styles';
@StoreProvider(AppStore, { debug: __DEV__ })
export default class OrderConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: false
    };
  }

  UNSAFE_componentWillMount() {
    this.store.confirmInit();
  }

  componentDidMount() {
    const { loadingVisible } = this.store.state().toJS();
    if (!loadingVisible && (window.y || window.y == 0)) {
      this._scroll.scrollToPosition(0, window.y);
    }
  }

  render() {
    const state = this.props.route;
    const { isPresale,deliverModelIsShow,pickUpMessage,stores, loadingVisible,changeMarketingFlag,popWareId,popStoreId } = this.store.state().toJS();
    const storeId = stores[0]&&stores[0].supplier.storeId;
    let commitAgianFlag=this.store.state().get('commitAgianFlag');
    let tipText = '订单中以下商品库存不足或缺货，提交后按照实际库存计算支付金额',
      confirmText = '返回购物车',
      cancleText = '取消',
      useExtraTipText = false;
    if (changeMarketingFlag){
      useExtraTipText = true
      tipText = <TouchableOpacity
                  onPress={() => {
                    this.store.setCloseTipVisible()
                    msg.emit('router: goToNext', {
                      routeName: 'MarketingModify',
                      wareId: popWareId,
                      storeId: popStoreId,
                    })
                  }}
                >
              <Text style={styles.modalMessage}>订单中以下商品库存不足或缺货，提交后按照实际库存计算支付金额,由于库存问题导致优惠信息不可使用。
                  <Text style={[styles.modalMessage, {color: mainColor, padding: 0}]}>查看优惠变更&gt;</Text>
              </Text>
            </TouchableOpacity>
    }
    if (commitAgianFlag) {
      confirmText = '继续提交';
      cancleText = '取消';
    }
    return (
      <Provider>
        <View style={{ backgroundColor: '#f5f5f5', flex: 1 }}>
          <Header
            title="确认订单"
            onLeftMenuPress={() => {
              state.params && state.params.skuId
                ? msg.emit('router: goToNext', {
                  routeName: 'GoodsDetail',
                  skuId: state.params.skuId
                })
                : msg.emit('router: back');
            }}
          />
          {loadingVisible ?
            <Loading /> :
            <KeyboardAwareScrollView
              ref={(ref) => (this._scroll = ref)}
              onScroll={(event) => {
                window.y = event.nativeEvent.contentOffset.y;
              }}
            >
              <ScrollView
                contentContainerStyle={{
                  ..._.ifIphoneX(
                    {
                      paddingBottom: 85
                    },
                    {
                      paddingBottom: 50
                    }
                  )
                }}
              >
                {isPresale && <Presale />}
                <Address/>
                <StoreList disableF={this._disableButton}/>
                {this.store.state().get('stores').count() > 1 && <AllAmount/>}
              </ScrollView>
            </KeyboardAwareScrollView>
          }
          {!loadingVisible && <ToolBar btnDisabled={this.state.btnDisable}/>}
          <AnnexMask/>
          {/*配送方式弹窗*/}
          {deliverModelIsShow[storeId] && (
            <DeliverType
              key={storeId}
              storeId={storeId}
              pickUpMessage={pickUpMessage[storeId]}
            />
          )}
          <TipModal
            visibility={this.store.state().get('stockOutOpen')}
            useExtraTipText={useExtraTipText}
            title='温馨提示'
            message={tipText}
            btnText={confirmText}
            onRequestClose={()=>this.store.setCloseTipVisible()}
            onBtnPress={()=>this._tipCommit()}
            cancelText={cancleText}
            content={this.store.state().get('stockOutGroupByStoreId')}
          />
        </View>
      </Provider>
    );
  }

  /**
   * 禁用/启用 提交按钮
   * @private
   */
  _disableButton = () => {
    this.setState({
      btnDisable: !this.state.btnDisable
    });
  };

  _tipCommit = async () => {
    if (this.store.state().get('commitAgianFlag')) {
      await this.store.updateUnStock(true);
    } else {
       msg.emit('router: goToNext', { routeName: 'PurchaseOrder' });
    }
  };
}
const styles = StyleSheet.create({
  modalMessage:{
    color:'rgba(0, 0, 0, 0.5)',
    fontSize:12,
    margin:10,
  },
})
