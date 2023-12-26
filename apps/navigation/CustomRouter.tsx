import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  useNavigationBuilder,
  StackRouter,
  createNavigatorFactory
} from '@react-navigation/native';

import { msg } from 'plume2';
import { cache, Fetch, myPvUvStatis } from 'wmkit';
import { getActiveRoute, generateKey, fetchNeedLogin } from './router-util';
import { config } from 'wmkit/config';
import { StackView } from '@react-navigation/stack';

//非授权页面
const unAuthRoutes = {
  Login: 1,
  Register: 2,
  UserPassword: 3,
  Error: 4,
  NetBreak: 5,
  ImproveInformation: 6,
  ImproveResult: 7,
  RegisterAgreement: 8,
  UserPasswordSubmit: 9,
  WechatLogin: 10,
  GoodsEmpty: 11,
  InviteCode: 12,
  GrouponSelection: 13,
  GrouponRule: 14,
  ImproveIepInfo: 15,
  CameraComponent: 16,
  SpecialGoodsList: 17,
};

//依赖开放设置的页面
export const openAccess = {
  Main: true,
  GoodsList: true,
  DistributionGoodsList: true,
  PurchaseOrder: true,
  PurchaseOrderWithoutBottom: true,
  GoodsDetail: true,
  UserCenter: true,
  StoreMain: true,
  StoreSearch: true,
  StoreFile: true,
  StoreGoodsList: true,
  StoreMember: true,
  StoreCateList: true,
  Search: true,
  StoreList: true,
  GoodsListWithoutBottom: true,
  GoodsListPromotion: true,
  CouponCenter: true,
  GoodsDetailEvaluationList: true,
  FlashSale: true,
  AllList: true,
  GrouponCenter: true,
  PointsMall: true,
  SpellGroupDetail: true,
  GrouponSearchList: true,
  CombinationGoods: true,
  CameraComponent: true,
  SpecialGoodsList: true,
  PageLink: true,
  ClassifyPage:true,
  SpecialGoodsListWithoutBottom: true
};

const pageRefreshWhenBack = [
  'OrderConfirm',
  'UserReceiveAddress',
  'UserStore',
  'PurchaseOrder',
  'Login',
  'OrderInvoice',
  'FlashSaleOrderInvoice',
  'FlashSale',
  'GoodsDetail',
  'PointsOrderConfirm',
  'FlashSaleOrderConfirm',
  'EvaluateCenter'
];

/**
 * 从优惠券凑单页返回不用刷新购物车
 * @type {string[]}
 */
const normalBack = ['CouponPromotion', 'GoodsListPromotion'];
const otherBack = ['Main', 'MaterialCircle', 'DistributionCenter','RewardCenter','PurchaseOrder'];

/**
 * 底部菜单
 */
let tabRoutes = {};
const getTabjson = async () => {
  // await Fetch('/distribute/distributor-info').then((res) => {
  //   if (__DEV__) {
  //     // 是否有分销有资格 0：无，1：有
  //     let isDistributor_new;
  //     // 是否开启社交分销 0：关闭，1：开启
  //     if (res.code == config.SUCCESS_CODE) {
  //       if (res.context) {
  //         let distributionCustomerVO = res.context.distributionCustomerVO;
  //         //设置分销员的信息
  //         if (distributionCustomerVO) {
  //           isDistributor_new = distributionCustomerVO.distributorFlag;
  //           window.isDistributor =
  //             isDistributor_new == 1 &&
  //             distributionCustomerVO.forbiddenFlag == 0
  //               ? '1'
  //               : '0';
  //         } else {
  //           isDistributor_new = 0;
  //           window.isDistributor = '';
  //         }
  //       }
  //     }
  //   }
  // });
  //关闭社交分销的查询
  window.isDistributor = false;
};

const MyStackRouter = (options) => {
  let tabState = null;
  const router = StackRouter(options);
  getTabjson();
  return {
    ...router,
    getStateForAction(state, action, options) {
      // 记录底部路由state
      if (state.routes.length == 1 && state.routes[0].name === 'Main') {
        tabState = state.routes[0];
        let tabRouters = state.routes[0].state.routes;
        for (let i = 0; i < tabRouters.length; i++) {
          let tabName = tabRouters[i].name;
          tabRoutes[tabName] = i + 1;
        }
      }

      const result = router.getStateForAction(state, action, options);
      // 当前路由
      let currentRoute = getActiveRoute(state);
      fetchNeedLogin();
      msg.emit('goods-detail:closeVideo');
      //pv/uv埋点采集
      if (
        action.type == 'INIT' ||
        action.type == 'NAVIGATE' ||
        action.type == 'replace' ||
        action.type == 'backToTop' ||
        action.type == 'refresh'
      ) {
        let url = action.payload ? action.payload.name : null;
        //商品详情,店铺主页,店铺分类,店铺档案,店铺会员,店铺搜索页,店铺商品列表
        const urlArr = [
          'GoodsDetail',
          'StoreMain',
          'StoreCateList',
          'StoreFile',
          'StoreMember',
          'StoreSearch',
          'StoreGoodsList'
        ];
        //非商品相关页面的pv,uv推送
        if (!(urlArr.findIndex((singleUrl) => singleUrl == url) > -1)) {
          myPvUvStatis(url);
        }
      }
      if (
        state &&
        action.type === 'NAVIGATE' &&
        action.payload.name === currentRoute.name &&
        JSON.stringify(action.payload.params) ===
          JSON.stringify(currentRoute.params)
      ) {
        return result;
      }
      //初始化token为空时，进入登录页，路由在授权页面（需要通过登录的页面）中切换时，token非空，仍然要回到登录页
      //加一个名为back的路由类型，防止在非授权页面之间进行返回时，直接回到了登录页
      if (
        ((action.type != 'refresh' &&
          action.type != 'INIT' &&
          action.type != 'SET_PARAMS' &&
          action.type != 'GO_BACK' &&
          action.payload &&
          !unAuthRoutes[action.payload.name] &&
          state) ||
          action.type == 'INIT') &&
        !window.token
      ) {
        //需要登录或者手动回到登录的或者不需要登录但是未配置开放的
        if (
          window.needLogin ||
          (action && action.type == 'backToTop') ||
          (action.payload &&
            action.payload.name &&
            !window.needLogin &&
            !openAccess[action.payload.name])
        ) {
          if (action.payload.name === 'OrderList') {
            msg.emit('loginModal:toggleVisible', {
              callBack: () => {
                if (action.payload.params && action.payload.params.tabKey) {
                  msg.emit('router: goToNext', {
                    routeName: 'OrderList',
                    tabKey: action.payload.params.tabKey
                  });
                } else {
                  msg.emit('router: goToNext', {
                    routeName: 'OrderList'
                  });
                }
              }
            });
            return null;
          }

          AsyncStorage.setItem(cache.TARGET_PAGES, JSON.stringify(action));
          //登录判断
          //未登录且未开放，跳转至登录页
          const routes = state.routes.concat({
            name: 'Login',
            key: generateKey('Login')
          });
          return {
            ...state,
            routes,
            index: routes.length - 1
          };
        }
        if (
          state &&
          tabRoutes[action.payload.name] &&
          action.type == 'NAVIGATE'
        ) {
          //已登录或已开放并且属于开放页面，正常跳转
          if (
            window.token ||
            (!window.needLogin && openAccess[action.payload.name])
          ) {
            const tabIndex = tabRoutes[action.payload.name] - 1;
            return {
              ...state,
              index: 0,
              routes: state.routes
                .map((route, i) => {
                  if (i === 0) {
                    const { key: routeKey, state, ...routeOther } = route;
                    const { key, index, ...stateOther } = state;
                    return {
                      key: generateKey(route.name),
                      state: {
                        index: tabIndex >= 0 ? tabIndex : index,
                        key: generateKey('tab'),
                        ...stateOther
                      },
                      ...routeOther
                    };
                  } else {
                    return route;
                  }
                })
                .slice(0, 1)
            };
          } else {
            //未登录且未开放，跳转至登录页
            const routes = state.routes.concat({
              name: 'Login',
              key: generateKey('Login')
            });

            return {
              ...state,
              routes,
              index: routes.length - 1
            };
          }
        }
      } else if (state && action.type === 'replace') {
        return router.getStateForAction(
          state,
          {
            type: 'REPLACE',
            payload: action.payload
          },
          options
        );
      } else if (state && action.type === 'refresh') {
        const index = state.routes.length - 1;

        const routes = state.routes.map((route, i) =>
          i === index
            ? {
                key: generateKey(route.name),
                name: route.name,
                params: route.params
              }
            : route
        );
        return {
          ...state,
          routes,
          index: routes.length - 1
        };
      } else if (state && action.type === 'backToTop') {
        if (state.routes[0].name === 'Main') {
          return {
            ...state,
            routes: state.routes
              .map((route, i) => {
                if (i === 0) {
                  const { key: stackKey, state, ...routeOther } = route;
                  const { key: tabKey, ...stateOther } = state;
                  return {
                    key: generateKey(route.name),
                    state: {
                      key: generateKey('tab'),
                      ...stateOther
                    },
                    ...routeOther
                  };
                } else {
                  return route;
                }
              })
              .slice(0, 1),
            index: 0
          };
        } else {
          return {
            ...state,
            index: 0,
            routes: state.routes
              .filter((r, i) => i === 0)
              .map((route, i) => ({
                key: generateKey('Main'),
                name: 'Main'
              }))
          };
        }
      } else if (state && action.type === 'refreshRoute') {
        //刷新栈中指定名称路由,如果不存在,则不进行任何操作
        const index = state.routes.findIndex((r) => r.name == action.routeName);
        const routes = state.routes.map((route, i) =>
          i === index
            ? {
                key: generateKey(route.name),
                name: route.name,
                params: route.params
              }
            : route
        );
        return {
          ...state,
          routes,
          index: routes.length - 1
        };
      } else if (state && action.type === 'refreshRoutes') {
        //刷新栈中指定名称路由,如果不存在,则不进行任何操作
        const names = action.routeNames;
        const routes = state.routes.map((route, i) => {
          if (names.some((n) => n == route.name)) {
            return {
              key: generateKey(route.name),
              name: route.name,
              params: route.params
            };
          } else {
            return route;
          }
        });
        return {
          ...state,
          routes,
          index: routes.length - 1
        };
      } else if (
        state &&
        action.type === 'NAVIGATE' &&
        tabRoutes[action.payload.name]
      ) {
        //已登录或已开放并且属于开放页面，正常跳转
        if (
          window.token ||
          (!window.needLogin && openAccess[action.payload.name])
        ) {
          const tabIndex = tabRoutes[action.payload.name] - 1;
          return {
            ...state,
            index: 0,
            routes: state.routes
              .map((route, i) => {
                if (i === 0) {
                  const { key: routeKey, state, ...routeOther } = route;
                  const { key, index, ...stateOther } = state;
                  return {
                    key: generateKey(route.name),
                    state: {
                      index: tabIndex >= 0 ? tabIndex : index,
                      key: generateKey('tab'),
                      ...stateOther
                    },
                    ...routeOther
                  };
                } else {
                  return route;
                }
              })
              .slice(0, 1)
          };
        } else {
          //未登录且未开放，跳转至登录页
          const routes = state.routes.concat({
            name: 'Login',
            key: generateKey('Login')
          });
          return {
            ...state,
            routes,
            index: routes.length - 1
          };
        }
      } else if (
        state &&
        action.type === 'GO_BACK' &&
        state.routes.length > 1
      ) {
        const routes = state.routes.slice(0, state.routes.length - 1);
        const routeName = state.routes.length > 2 ? '' : state.routes[state.routes.length - 2].state.routeNames[state.routes[state.routes.length - 2].state.index];
        const noRefresh =
          normalBack.indexOf(state.routes[state.routes.length - 1].name) !=
            -1 ||
          (state.routes[state.routes.length - 2].name === 'Main' &&
            otherBack.indexOf(routeName) > -1);
        //优惠券凑单页正常返回上一个页面
        if (noRefresh) {
          // do nothing
          result.routes[0] = tabState;
        } else if (
          pageRefreshWhenBack.indexOf(routes[routes.length - 1].name) != -1 ||
          (routes.length == 1 && routes[0].index == 2)
        ) {
          // 解决收藏页面，右上角按钮变化之后，点击跳转到其他页面，再back的时候，按钮未初始化，放在业务里面按钮会闪动，所以放在这
          const name = routes[routes.length - 1].name;

          return {
            ...state,
            index: state.routes.length - 2,
            routes: state.routes
              .map((route, i) => {
                let params = {};
                if (
                  route.name == 'UserStore' &&
                  i === state.routes.length &&
                  route.params
                ) {
                  const { isEdit, ...otherParams } = route.params;
                  params = {
                    isEdit: false,
                    ...otherParams
                  };
                } else {
                  params = route.params;
                }

                return route.name === name
                  ? {
                      key: generateKey(name),
                      name: route.name,
                      params: params
                    }
                  : route;
              })
              .slice(0, state.routes.length - 1)
          };
        } else {
          const routeLength = state.routes.length;
          return {
            ...state,
            index: routeLength - 2,
            routes: state.routes
              .map((route, i) => {
                if (i === 0) {
                  const { key: routeKey, state, ...routeOther } = route;
                  const { key, ...stateOther } = state;
                  return {
                    key: generateKey(route.name),
                    state: {
                      key: generateKey('tab'),
                      ...stateOther
                    },
                    ...routeOther
                  };
                } else {
                  return route;
                }
              })
              .slice(0, routeLength - 1)
          };
        }
      }
      return result;
    },

    getStateForRouteNamesChange(state, { routeNames }) {
      const routes = state.routes.filter((route) =>
        routeNames.includes(route.name)
      );

      return {
        ...state,
        routeNames,
        routes,
        index: Math.min(state.index, routes.length - 1)
      };
    },

    getStateForRouteFocus(state, key) {
      const index = state.routes.findIndex((r) => r.key === key);

      if (index === -1 || index === state.index) {
        return state;
      }

      return { ...state, index };
    }
  };
};

function StackNavigator({
  initialRouteName,
  children,
  screenOptions,
  ...rest
}) {
  const { state, navigation, descriptors } = useNavigationBuilder(
    MyStackRouter,
    {
      children,
      initialRouteName,
      screenOptions
    }
  );
  return (
    <StackView
      {...rest}
      state={state}
      navigation={navigation}
      descriptors={descriptors}
    />
  );
}

export const createCustomNavigator = createNavigatorFactory(StackNavigator);
