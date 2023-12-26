import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { msg, StoreProvider } from 'plume2';

import Header from 'wmkit/header';

import AppStore from './store';
import CouponTab from './component/coupon-tab';
import CouponList from './component/coupon-list';
import DropDown from './component/drop-down';
import CateMask from './component/cate-mask';
import * as WMkit from 'wmkit/kit';
import ModalShow from 'wmkit/biz/modal-show';
import { link, fetchModal, setModalShow } from '../../wmkit';
@StoreProvider(AppStore, { debug: __DEV__ })
export default class CouponCenter extends React.Component {
  componentDidMount() {
    this.store.init();
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
    const showDrapMenu = this.store.state().get('showDrapMenu');
    const showCateMask = this.store.state().get('showCateMask');
    return (
      <View style={styles.container}>
        <Header
          renderTitle={() => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.headerBox}
                onPress={() => {
                  this.store.changeDrapMenu();
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={{ fontSize: 14, color: '#333', marginRight: 5 }}
                >
                  全部券类型
                </Text>
                <Image
                  style={[
                    styles.arrowImg,
                    showDrapMenu && {
                      transform: [
                        {
                          rotate: '180deg'
                        }
                      ]
                    }
                  ]}
                  source={require('./img/down-arrow.png')}
                />
              </TouchableOpacity>
            );
          }}
          renderRight={() => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ padding: 10 }}
                onPress={() => {
                  if (!WMkit.isLoginOrNotOpen()) {
                    msg.emit('loginModal:toggleVisible', {
                      callBack: () => {
                        msg.emit('router: goToNext', { routeName: 'MyCoupon' });
                      }
                    });
                  } else {
                    msg.emit('router: goToNext', { routeName: 'MyCoupon' });
                  }
                }}
              >
                <Text style={{ fontSize: 13, color: '#000', marginRight: 10 }}>
                  我的优惠券
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <CouponTab />
        <CouponList />
        {showDrapMenu && <DropDown />}
        {showCateMask && <CateMask />}
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
    const res = await fetchModal('securitiesCenter');
    let popupId = '';
    if (!id && res && res.length > 0) {
      popupId = res[0].popupId;
    } else {
      popupId = id;
    }
    const flagParams = await setModalShow(res, 'securitiesCenter', popupId);
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
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  arrowImg: {
    width: 13,
    height: 7
  }
});
