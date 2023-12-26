import * as React from 'react';
import {
  createNavigatorFactory,
  useNavigationBuilder,
  TabRouter,
  BaseRouter,
} from '@react-navigation/native';
import { BottomTabView } from '@react-navigation/bottom-tabs';
import { generateKey, fetchNeedLogin } from './router-util';
import { msg } from 'plume2';
import { Fetch } from 'wmkit';


const MyTabRouter = options => {
  const router = TabRouter(options);
  const tabNoRefresh = ['Main'];

  return {
    ...router,
    getStateForAction(state, action) {
      msg.emit('video:closeVideo');
      switch (action.type) {
        case 'NAVIGATE': {
          if(!window.token) {
            Fetch('/userSetting/isVisitWithLogin', {
              method: 'POST'
            }).then((res) => {
              if (res.code == 'K-000000') {
                window.needLogin = res.context.audit;
                if(window.needLogin) {
                  msg.emit('router: reset');
                  return null;
                }
              } else {
                msg.emit('app:tip', '您的网络不给力！');
              }
            });
          }

          const index = state.routes.findIndex(
            route => route.name === action.payload.name
          );
          if (index === -1) {
            return null;
          }

          const routes = state.routes.map((route, i) =>
            i === index && tabNoRefresh.indexOf(route.name) == -1
              ? {
                  key: generateKey(route.name),
                  name: route.name,
                  params: route.params
                }
              : route
          )
          return { ...state, index, routes };
        }

        default:
          return BaseRouter.getStateForAction(state, action);
      }
    },

  };
};

function BottomTabNavigator({
  initialRouteName,
  backBehavior,
  children,
  screenOptions,
  ...rest
}) {
  const { state, descriptors, navigation } = useNavigationBuilder(MyTabRouter, {
    initialRouteName,
    backBehavior,
    children,
    screenOptions,
  });
  return (
    <BottomTabView
      {...rest}
      state={state}
      navigation={navigation}
      descriptors={descriptors}
    />
  );
}

export const createCustomBottomNavigator = createNavigatorFactory(BottomTabNavigator);
