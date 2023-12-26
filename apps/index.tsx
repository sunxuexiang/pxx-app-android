import 'react-native-gesture-handler'; //必须是index.tsx的顶部
import React from 'react';
import {
  BackHandler,
  DeviceEventEmitter,
  NativeAppEventEmitter,
  NativeModules,
  Platform,
  StatusBar,
  View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RNExitApp from 'react-native-exit-app';
import { Provider } from 'react-redux';
import store from '@/redux/store';

import { msg } from 'plume2';
import AppNavigator from './navigation/AppNavigator';

import DatePicker from 'wmkit/date-picker';
import Tip from 'wmkit/modal/tip';
import WMLoginModal from 'wmkit/login-modal';
import { NavigationActions, StackActions } from '@react-navigation/compat';
import RegisterCoupon from 'wmkit/biz/coupon-model/register-coupon/index';
import StoreClose from 'wmkit/biz/store-close/index';
import UpdateModal from 'wmkit/biz/update-modal/index';
import DeviceInfo from 'react-native-device-info';
import { cache } from 'wmkit/cache';
import { config } from 'wmkit/config';
import * as WMkit from 'wmkit/kit';
import Fetch from 'wmkit/fetch';
import * as _ from 'wmkit/common/util';
import WMSplashScreen from 'wmkit/splash-screen';
import {
  NavigationContainer,
  useFocusEffect,
  NavigationContainerRef,
  CommonActions
} from '@react-navigation/native';
import PrivacyPolicyModal from '../wmkit/biz/privacy-policy-modal';
import { changeColor } from '@/wmkit/styles';

// 特殊处理的关于特殊型号手机的键盘事件
const KeyBoardPhoneModel = ['OPPO R9m'];
//有拼团倒计时的页面
const timerRoutes = ['SpellGroupDetail', 'GroupOrderList', 'GroupBuyDetail'];
// push消息的类型
const PUSHTYPE = {
  GOODS: 0,
  GOODSINFO: 1,
  GOODSGROUP: 2,
  CATE: 3,
  STORE: 4,
  MARKETING: 5,
  PAGE: 6,
  ACCOUNT: 7,
  PROPERTY: 8,
  ORDER: 9,
  RETUN_ORDER: 10,
  DISTRIBUTE: 11,
  USERPAGE: 12
};

export default class App extends React.Component {
  // 是否展示底部的tab bar
  tabBarVisible = true;
  deviceEventEmitter;

  /**
   * 查询购物车数量
   * @param navigation 路由信息
   * @private
   */
  _fetchPurChaseNum = () => {
    if (WMkit.isLoginOrNotOpen()) {
      Fetch('/site/countGoods').then((res) => {
        const purchaseNum = res.context || 0;
        this._updatePurchaseNum(purchaseNum);
      });
    } else {
      AsyncStorage.getItem(cache.PURCHASE_CACHE).then((res) => {
        const purCache = JSON.parse(res) || [];
        this._updatePurchaseNum(purCache.length);
      });
    }
  };
  _fetchMessageNum = () => {
    console.log('_fetchMessageNum')
  }

  UNSAFE_componentWillMount() {
    //使react-native-debugger的network能查看网络请求
    // global.XMLHttpRequest = global.originalXMLHttpRequest
    //   ? global.originalXMLHttpRequest
    //   : global.XMLHttpRequest;
    // global.FormData = global.originalFormData
    //   ? global.originalFormData
    //   : global.FormData;
    // 修改主题色
    this.getBaseConfig();
    const model = DeviceInfo.getModel();
    window.keyBoardShow =
      KeyBoardPhoneModel.indexOf(model) == -1 ? false : true;
    msg.on('app:tip', this._handleAppTip);
    msg.on('purchaseNum:refresh', this._fetchPurChaseNum);
    msg.on('message:refresh', this._fetchMessageNum);
    msg.on('order:refresh', this._orderRefresh);
    msg.on('router: goToNext', this._goToNext);
    msg.on('router: reset', this.reset);
    msg.on('router: back', this._back);
    msg.on('router: backToTop', this._backToTop);
    msg.on('router: backToLast', this._backToLast);
    msg.on('router: replace', this._replaceRoute);
    msg.on('router: setParams', this._setParams);
    msg.on('router: refresh', this._refresh);
    msg.on('router: refreshRoute', this._refreshRoute);
    msg.on('router: refreshRoutes', this._refreshRoutes);
    msg.on('app:bottomVisible', this._bottomVisible);
    BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);

    // 为提升首页的展示速度，避免长时间空白，把魔方的首页配置信息先拉取到本地缓存中。
    // 代价是闪屏页的展示时间会相应拉长。
    Fetch(
      '/magic/d2cStore/000000/weixin/index',
      {
        method: 'GET'
      },
      config.RENDER_HOST
    )
      .then((res) => {
        if (__DEV__) {
          console.info(res);
        }
        if (res.data) {
          window.mainPageConfig = res.data;
        }

        //访问是否需要登录，开关打开，返回true,表示需要登录，即不开放
        this.checkLogin();
      })
      .catch((e) => {
        if (__DEV__) {
          console.warn(e);
        }
        this.checkLogin();
      });
    this._initMessage();
  }

  async componentDidMount() {
    await this._saveDeviceToken();
  }

  componentWillUnmount() {
    this._unRegister();
  }

  /**
   * 取消注册的事件
   * @private
   */
  _unRegister = () => {
    msg.off('app:tip', this._handleAppTip);
    msg.off('purchaseNum:refresh', this._fetchPurChaseNum);
    msg.off('message:refresh', this._fetchMessageNum);
    msg.off('order:refresh', this._orderRefresh);
    msg.off('router: goToNext', this._goToNext);
    msg.off('router: reset', this.reset);
    msg.off('router: back', this._back);
    msg.off('router: backToTop', this._backToTop);
    msg.off('router: backToLast', this._backToLast);
    msg.off('router: replace', this._replaceRoute);
    msg.off('router: setParams', this._setParams);
    msg.off('router: refresh', this._refresh);
    msg.off('router: refreshRoute', this._refreshRoute);
    msg.off('router: refreshRoutes', this._refreshRoutes);
    msg.off('app:bottomVisible', this._bottomVisible);
    BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid);
    //this.deviceEventEmitter.remove();
  };

  _onBackAndroid = () => {
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      // 解绑监听
      this._unRegister();
      // 退出app
      RNExitApp.exitApp();
    }
    this.lastBackPressed = Date.now();
    msg.emit('app:tip', '再次按下返回键退出');
    return true;
  };
  /**
   * 更新底部购物车角标数量
   * @param purchaseNum
   * @private
   */
  _updatePurchaseNum = (purchaseNum) => {
    // 数量写入缓存
    AsyncStorage.setItem(cache.PURCHASE_NUM, JSON.stringify({ purchaseNum }));

    // 针对商品列表和我的收藏的mini购物车图标，或者所有其他关心这个数字的地方，发送通知
    msg.emit('purchaseNum:num', purchaseNum);

    // 针对Tab里的购物车图标
    const setParamsAction = NavigationActions.setParams({
      params: {
        purchaseNum: purchaseNum,
        routeName: 'PurchaseOrder'
      },
      key: 'PurchaseOrder'
    });
    // this.setState({ num: purchaseNum });
    // this.nav.dispatch(setParamsAction);
    this.nav.setParams(setParamsAction);
  };

  /**
   * 关闭启动页，默认延迟1秒
   */
  _hideSplashScreen = () => {
    setTimeout(() => {
      // 关闭原生的启动页
      WMSplashScreen.hide();
    }, 1000);
  };

  /**
   * 恢复tip的原始状态
   */
  _handleTipDisappear = () => {
    this.setState({
      isTipVisible: false,
      isTipText: '',
      isTipType: '',
      isTipIcon: ''
    });
  };

  /**
   * 处理appTip
   */
  _handleAppTip = (text, icon) => {
    this.setState({
      isTipVisible: true,
      isTipText: text,
      isTipIcon: icon
    });
  };

  /**
   * 判断是否登录, 开关打开，返回true,表示需要登录，即不开放
   * @returns {boolean}
   */
  checkLogin = () => {
    if (window.token) {
      // 关闭原生的启动页
      this._hideSplashScreen();
      return true;
    } else {
      Fetch('/userSetting/isVisitWithLogin', {
        method: 'POST'
      })
        .then((res) => {
          if (res.code == 'K-000000') {
            window.needLogin = res.context.audit;
            AsyncStorage.getItem(cache.LOGIN_DATA, async (err, result) => {
              if (err || !result) {
                this.setState(
                  {
                    isInit: true
                  },
                  () => {
                    this._hideSplashScreen();
                  }
                );
              } else {
                window.token = JSON.parse(result).token;
                this.setState(
                  {
                    isInit: true
                  },
                  () => {
                    this._hideSplashScreen();
                  }
                );
                await Fetch('/customer/check-token')
                  .then((res) => {
                    if (__DEV__) {
                      // 若token过期，清空token的逻辑放在了Fetch中，此处只是调用一下
                      console.log('check-token---->', res);
                    }
                  })
                  .catch((err) => {
                    if (__DEV__) {
                      console.log('check-token err------->', err);
                    }
                  });
              }
            });
          } else {
            WMSplashScreen.hide();
            msg.emit('app:tip', '您的网络不给力!');
          }
        })
        .catch(() => {
          WMSplashScreen.hide();
          msg.emit('app:tip', '您的网络不给力!');
        });
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      //错误tip的显示状态
      isTipVisible: false,
      //tip的text
      isTipText: '',
      //tip的icon
      isTipIcon: '',
      isInit: false
      // fresh: false
    };
  }

  render() {
    if (!this.state.isInit) {
      return (
        <View style={{ flex: 1 }}>
          <Tip
            modal={false}
            text={this.state.isTipText}
            icon={this.state.isTipIcon}
            visible={this.state.isTipVisible}
            onTipDisappear={this._handleTipDisappear}
          />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        {AppNavigator && (
          <Provider store={store}>
            <NavigationContainer ref={(ref) => (this.nav = ref)}>
              <AppNavigator />
            </NavigationContainer>
          </Provider>
        )}
        <DatePicker />
        <WMLoginModal />
        <StoreClose />
        <RegisterCoupon />
        <UpdateModal />
        <PrivacyPolicyModal />

        <Tip
          modal={false}
          text={this.state.isTipText}
          icon={this.state.isTipIcon}
          visible={this.state.isTipVisible}
          onTipDisappear={this._handleTipDisappear}
        />
      </View>
    );
  }

  /**
   * 刷新订单页面
   * @param navigation
   * @private
   */
  _orderRefresh = () => {
    this.nav.dispatch({
      type: 'refreshRoutes',
      routeNames: ['OrderDetail', 'Tab']
    });
    this.nav.dispatch({
      type: 'refreshRoutes',
      routeNames: ['PointsOrderDetail', 'Tab']
    });
  };

  /**
   * 跳转下一路由
   * @param route
   * @private
   */
  _goToNext = (route) => {
    if (__DEV__) {
      console.log('goToNext.....', route);
    }
    const { routeName, ...others } = route;
    //存储当前路由名称
    window.currentRouteName = routeName;
    //清除通知定时
    msg.emit('group-buy-detail:clearNotice');
    const { name: currentName } = this.nav.getCurrentRoute();
    if (currentName == routeName) {
      //兼容同名路由跳转 例如从商品详情点击推荐的商品跳转到另一个商品详情
      this.nav.dispatch(StackActions.push({
        routeName,
        params: others
      }));
    } else {
      const navigateAction = NavigationActions.navigate({
        routeName: routeName,
        params: others
      });
      this.nav.dispatch(navigateAction);
    }
  };

  /**
   * 重置路由
   * 涉及开放访问功能, 谨慎修改
   */
  reset = () => {
    this.nav.resetRoot({
      index: 1,
      routes: [{ name: 'Main' },{ name: 'Login' }],
    });
  }

  /**
   * 返回
   * @param route
   * @private
   */
  _back = (route) => {
    // this.nav.goBack()
    if (__DEV__) {
      console.log('back.....', route);
    }
    let backAction = NavigationActions.back();
    if (route) {
      const { key, routeName } = route;
      if (__DEV__) {
        console.log('key...', key);
      }
      backAction = NavigationActions.back({
        key: key
      });
      //如果指定了返回的页面，则将全局currentRouteName替换成当前的，为了防止当前页面有倒计时，
      //能够顺利触发倒计时的回调事件
      if (timerRoutes.includes(routeName)) {
        window.currentRouteName = routeName;
      }
    }
    if (__DEV__) {
      console.log('backAction...', backAction);
    }
    this.nav.dispatch(backAction);
  };

  /**
   * 返回路由首位
   * @private
   */
  _backToTop = () => {
    if (__DEV__) {
      console.log('backToTop...', this.nav);
    }
    this.nav.dispatch({
      type: 'backToTop'
    });
  };

  /**
   * 返回路由末位
   * @private
   */
  _backToLast = () => {
    if (__DEV__) {
      console.log('backToLast----->');
    }
    const { routes } = this.nav.state.nav;
    this._back(routes[routes.length - 1]);
  };

  /**
   * 替换路由
   * @param route
   * @private
   */
  _replaceRoute = (route) => {
    if (__DEV__) {
      console.log('replace router---->', route);
    }
    const { routeName, ...others } = route;
    this.nav.dispatch(
      StackActions.replace({ routeName: routeName, params: others })
    );
  };

  /**
   * 刷新当前页(栈顶)
   * @private
   */
  _refresh = () => {
    this.nav.dispatch({ type: 'refresh' });
  };

  /**
   * 刷新指定页面
   * @private
   */
  _refreshRoute = (route) => {
    this.nav.dispatch({
      type: 'refreshRoute',
      routeName: route.routeName
    });
  };

  /**
   * 刷新指定多个页面
   * @private
   */
  _refreshRoutes = (route) => {
    this.nav.dispatch({
      type: 'refreshRoutes',
      routeNames: route.routeNames
    });
  };

  /**
   * 设置参数
   * @param params
   * @private
   */
  _setParams = (params) => {
    // const { routeName, ...others } = route;
    // this.nav.setParams(
    //   params
    // );

    const { routes } = this.nav.getRootState();
    if (__DEV__) {
      console.log('params...', params);
      console.log('backToTop...', routes);
    }

    let key = routes[routes.length - 1].key;

    // 取最后一个路由
    let route = routes[routes.length - 1];
    // 如果是Tab，需要把params设置到对应的子路由上
    if (route.name === 'Main') {
      const subIndex = route.state.index;
      // route.routes[subIndex].params = params
      key = route.state.routes[subIndex].key;
    }

    if (__DEV__) {
      console.log('key...', key);
    }
    const setParamsAction = NavigationActions.setParams({
      params: params,
      key: key
    });
    this.nav.dispatch(setParamsAction);
    // this.nav.setParams(setParamsAction);
  };

  _bottomVisible = (tabParams) => {
    if (tabParams) {
      this.tabBarVisible = tabParams.visible;

      const setParamsAction = NavigationActions.setParams({
        params: {
          key: tabParams.key,
          tabBarVisible: this.tabBarVisible
        },
        key: tabParams.key
      });
      this.nav.setParams(setParamsAction);
    }
  };

  /**
   * 解决从优惠券凑单页返回到购物车底部tabBar不显示问题
   * @private
   */
  _setBottomVisible = () => {
    this.tabBarVisible = true;
    const setParamsAction = NavigationActions.setParams({
      params: {
        key: 'CouponPromotion',
        tabBarVisible: this.tabBarVisible
      },
      key: 'CouponPromotion'
    });
    this.nav.dispatch(setParamsAction);
  };

  /**
   *  注册友盟推送监听事件
   * @private
   */
  _saveDeviceToken = async () => {
    //监听原生推送来的消息
    if (Platform.OS === 'ios') {
      NativeAppEventEmitter.addListener('deviceToken', (data) => {
        // this._setDeviceToken(data.deviceToken);
        AsyncStorage.setItem('sbc@deviceToken', data.deviceToken);
      });
      NativeAppEventEmitter.addListener('umengMsg', (data) => {
        _.pageReplace(JSON.parse(data.router));
      });
    } else {
      NativeModules.UMPushModule.getDeviceToken(async (deviceToken) => {
        AsyncStorage.setItem('sbc@deviceToken', deviceToken);
      });

      NativeModules.UMPushModule.getPageParams(async (pageParams) => {
        if (pageParams) {
          _.pageReplace(JSON.parse(pageParams));
        }
      });

      this.deviceEventEmitter = DeviceEventEmitter.addListener(
        'PUSH_MESSAGE',
        (data) => {
          _.pageReplace(JSON.parse(data));
        }
      );
    }
  };

  /**
   * 友盟消息推送只能真机调试
   * 初始化友盟消息推送相关信息
   */
  async _initMessage() {
    // let { res } = await Fetch(`${config.BFF_HOST}/umengConfig/getKey`);
    // if (__DEV__) {
    //   console.log('umeng key---->', res);
    // }
    // if (Platform.OS === 'ios') {
    //   // 获取AppKey和AppSecret
    //   console.log("scx====res2===", res);
    //   if (res.code === config.SUCCESS_CODE) {
    //     msg.emit('app:tip', '验证码已发送，请注意查收！');
    //   } else {
    //     console.error('友盟参数获取失败！');
    //     msg.emit('app:tip', res.message);
    //   }
    //   let appKey = res && res.appKey;
    //   if (appKey) {
    //     if (NativeModules.MessagePush) {
    //       NativeModules.MessagePush.initMessage(appKey);
    //     }
    //   }
    // } else {
    //   NativeModules.MessagePush.getDeviceToken(deviceToken => {
    //     this.getDeviceToken({
    //       deviceToken: deviceToken
    //     });
    //   });
    // }
  }

  /**
   * 修改主题色
   */
  getBaseConfig = async () => {
    Fetch('/system/baseConfig', {
      method: 'GET'
    }).then((res) => {
      if (res.code === config.SUCCESS_CODE) {
        console.log('aaaa1', res.context)
        changeColor(res.context.allSubjectColor || '#f7f7f7', res.context.tagButtonColor || '#f7f7f7');
      }
    });
  }
}
