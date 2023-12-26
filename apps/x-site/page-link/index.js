import React from 'react';
import { StyleSheet, Platform, StatusBar, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {  WebView } from 'react-native-webview';

import { msg } from 'plume2';
import { SafeAreaView } from 'react-native-safe-area-context';

import Loading from 'wmkit/loading';
import { config } from 'wmkit/config';
import Fetch from 'wmkit/fetch';

import * as _ from 'wmkit/common/util'; // added by scx
import { screenWidth, screenHeight } from 'wmkit/styles/index';
import PageHeader from './header';
import { WMkit } from 'wmkit';
import { openAccess } from '../../irouter-config.tsx';
const isAndroid = Platform.OS == 'android';

// ios模拟器中报postMessage不能被复写问题
const patchPostMessageJsCode = `(function() {
  var originalPostMessage = window.postMessage;

  var patchedPostMessage = function(message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };

  patchedPostMessage.toString = function() {
    return String(Object.hasOwnProperty).replace(
      'hasOwnProperty',
      'postMessage'
    );
  };

  window.postMessage = patchedPostMessage;
})();`;

export default class PageLink extends React.Component {
  static navigationOptions = () => ({
    title: '专题页'
  });

  constructor(props) {
    super(props);
  }

  render() {
    const state = this.props.route;
    const params = (state && state.params) || {};
    // 类型, id
    const { pageType, pageCode, storeId } = params;

    let source = `${config.MAGIC_HOST}/${pageType}/${pageCode}`;
    if (storeId) {
      source = `${source}/${storeId}?isApp=true`;
    } else if (window.token) {
      source = `${source}?token=${window.token}&isApp=true`;
    } else {
      source = `${source}?isApp=true`;
    }

    return (
      <SafeAreaView style={styles.container}>
        <PageHeader />
        <StatusBar barStyle="light-content" />
        <WebView
          style={{ width: screenWidth, height: screenHeight }}
          javaScriptEnabled={true}
          mixedContentMode="always"
          source={{
            uri: source
          }}
          onMessage={(e) => {
            let data = e.nativeEvent.data;
            if (data != '[object Object]' && data) {
              if (typeof data == 'string') {
                data = JSON.parse(data);
              }
              if (data.type) {
                if (data.type == 'cartNum') {
                  // 更新购物车数量
                  this.handleNumChange(data.content.goodsId, data.content.num);
                } else if (data.type == 'goLink') {
                  // 跳转某个路由
                  const { app } = data.content;
                  let { routeName, params } = app;
                  if (routeName != '#') {
                    if (routeName == 'StoreMain') {
                      const { wechat } = data.content;
                      const { pathname } = wechat;
                      params.storeId = getHashParam<any>(pathname).storeId;
                    } else if (routeName == 'GoodsList') {
                      params.showGoBack = true;
                    } else if (routeName == 'SpecialGoodsList') {
                      params.showGoBack = true;
                      routeName = 'SpecialGoodsListWithoutBottom';
                    }
                    if (WMkit.isLoginOrNotOpen()||openAccess[routeName]) {
                      msg.emit('router: goToNext', {
                        routeName,
                        ...params
                      });
                    } else {
                      msg.emit('loginModal:toggleVisible', {
                        callBack: () => {
                          msg.emit('router: goToNext', {
                            routeName,
                            ...params
                          });
                        }
                      });
                    }
                  } else {
                    
                  }
                }
              }
            }
          }}
          injectedJavaScript={patchPostMessageJsCode}
          renderLoading={() => (
            <View style={styles.loadingIndex}>
              <Loading />
            </View>
          )}
        //startInLoadingState={true}
        />
      </SafeAreaView>
    );
  }
  /**
   * 处理商品采购数量变化
   * @param goodsInfoId
   * @param num
   */
  handleNumChange = async (goodsInfoId, num) => {
    if (WMkit.isLoginOrNotOpen()) {
      // 已登录加入购物车场景
      const res = await this.purchaseNumChange(goodsInfoId, num);
      if (res.code == config.SUCCESS_CODE) {
        this._handlePurchaseCount();
      } else if (res.code === 'K-050121') {
        msg.emit('app:tip', '购物车容量达到100种上限！');
      } else {
        msg.emit('router: goToNext', {
          routeName: 'GoodsDetail',
          skuId: goodsInfoId
        });
      }
    } else {
      msg.emit('router: goToNext', {
        routeName: 'GoodsDetail',
        skuId: goodsInfoId
      })
      // 未登录加入购物车场景
      // if (await putPurchase(goodsInfoId, num)) {
      //   this._handlePurchaseCount();
      //   msg.emit('app:tip', '加入成功');
      // } else {
      //   msg.emit('app:tip', '加入失败');
      // }
    }
  };

  purchaseNumChange = (goodsInfoId, num) => {
    return Fetch('/site/purchase', {
      method: 'PUT',
      body: JSON.stringify({
        goodsInfoId: goodsInfoId,
        goodsNum: num
      })
    });
  };

  /**
   * 获取并更新购物车总数量
   * @private
   */
  _handlePurchaseCount = () => {
    msg.emit('purchaseNum:refresh');
    msg.emit('app:tip', '加入成功');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
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
  }
});
