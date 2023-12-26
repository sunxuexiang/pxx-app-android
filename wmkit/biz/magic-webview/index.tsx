import React from 'react';
import {  Alert, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { msg } from 'plume2';
import Fetch from 'wmkit/fetch';
import * as WMkit from 'wmkit/kit';
import { config } from 'wmkit/config';

import { postPurchase } from 'wmkit/biz/purchase-front';
import { getHashParam } from "@/wmkit";
import { openAccess } from '../../../apps/irouter-config';
export type IMagicWebview = {
  // 魔方组件请求地址
  source: string;
  magicLoad: Function;
  style:any;
};

export default class MagicWebview extends React.Component<IMagicWebview, any> {
  webviewLoaded: false; // webview的初始dom加载完毕后注入魔方首页配置信息
  componentDidMount() { }

  componentWillUnmount() { }

async componentWillReceiveProps(nextPros) {
    if (nextPros.isMagicReload) {
      this.refs.webview.reload();
    await  nextPros.magicReload();
    await  nextPros.magicLoad(true);
    }
  }

  render() {
    // ios模拟器中报postMessage不能被复写问题
    let injectedJavaScript = `(function() {
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

    let { source, magicLoad } = this.props;

    // 如果是首页，因为加载的本地html文件，url后跟参数需要特殊处理，否则ios会报找不到资源错误
    if (source.indexOf('loader.html') > 0) {
      let params = '';
      if (window.token) {
        params += 'token=' + window.token;
      }

      // 注入带参跳转
      injectedJavaScript += `;var link = document.getElementById('loader');
      link.href = 'index.html?${params}';link.click()`;
    }

    return (
      <WebView
        ref="webview"
        style={[{ flex: 1, backgroundColor: '#fff'},this.props.style]}
        source={{ uri: source }}
        javaScriptEnabled={true}
        mixedContentMode="always"
        originWhitelist={['*']}
        dataDetectorTypes="all"
        onMessage={(e) => {
          let data = e.nativeEvent.data as any;
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
        injectedJavaScript={injectedJavaScript}
        onLoadEnd={() => {
          if (!this.webviewLoaded) {
            this.webviewLoaded = true;
            this.refs.webview.postMessage(
              // 没有配置信息也要发一个空的字符串none，让loader.html页面用同一个流程跳转
              JSON.stringify(window.mainPageConfig || 'none')
            );
          }else{
            magicLoad(false);
          }
        }}
      />
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
      // if (await postPurchase(goodsInfoId, num)) {
      //   this._handlePurchaseCount();
      //   msg.emit('app:tip', '加入成功');
      // } else {
      //   msg.emit('app:tip', '加入失败');
      // }
    }
  };

  purchaseNumChange = (goodsInfoId, num) => {
    return Fetch('/site/purchase', {
      method: 'POST',
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
