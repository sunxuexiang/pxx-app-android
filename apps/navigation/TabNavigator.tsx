import React, { useState } from 'react';
import { Image, View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { tabScreens } from '../irouter-config';
import { BottomTabBarOptions } from '@react-navigation/bottom-tabs';
import * as _ from 'wmkit/common/util';
import {mainColor, tabColor} from 'wmkit/styles/index';

const main = require('./img/main.png');
const mainFocused = require('./img/main_focused.png');
const goods = require('./img/goods.png');
const goodsFocused = require('./img/goods_focused.png');
const special = require('./img/special.png');
const specialFocused = require('./img/special-curr.png');
const user = require('./img/user.png');
const userFocused = require('./img/user_focused.png');
const cart = require('./img/cart.png');
const cartFocused = require('./img/cart_focused.png');
const material = require('./img/material.png');
const materialFocused = require('./img/material_focused.png');
const rewardCenter = require('./img/rewardCenter.png');
const rewardCenterFocused = require('./img/rewardCenter_focused.png');
const disCenter = require('./img/disCenter.png');
const disCenterFocused = require('./img/disCenter_focused.png');
import Fetch from 'wmkit/fetch';
import { cache } from 'wmkit/cache';

import { createCustomBottomNavigator } from './CustomTabRouter'
import { queryTabBarConfig } from './webapi';

const Tab = createCustomBottomNavigator();

/**
 * 未登录 或 分销开关关闭 时底部导航
 * @type {{Main: {screen; headerMode: string}; GoodsList: {screen}; PurchaseOrder: {screen}; UserCenter: {screen}}}
 */
const notLoginOrClose = {
  Main: {
    screen: tabScreens.Main,
    tabName: '首页',
    activeIcon: mainFocused,
    inActiveIcon: main,
  },
  ClassifyPage: {
    screen: tabScreens.ClassifyPage,
    tabName: '分类',
    activeIcon: goodsFocused,
    inActiveIcon: goods,
  },
  SpecialGoodsList: {
    screen: tabScreens.VideoPage,
    tabName: '客服',
    activeIcon: specialFocused,
    inActiveIcon: special,
  },

  PurchaseOrder: {
    screen: tabScreens.PurchaseOrder,
    tabName: '购物车',
    activeIcon: cartFocused,
    inActiveIcon: cart,
  },
  UserCenter: {
    screen: tabScreens.UserCenter,
    tabName: '鲸粉',
    activeIcon: userFocused,
    inActiveIcon: user,
  },
};
/**
 * 已登录 且 没有分销员资格 时底部导航
 */
const isNotDistributorTab = {
  Main: {
    screen: tabScreens.Main,
    tabName: '首页',
    activeIcon: mainFocused,
    inActiveIcon: main,
    options: { tabBarLabel: '首页', headerShown: false },
  },
  MaterialCircle: {
    screen: tabScreens.MaterialCircle,
    tabName: '发现',
    activeIcon: materialFocused,
    inActiveIcon: material,
    options: { tabBarLabel: '发现' },
  },
  RewardCenter: {
    screen: tabScreens.RewardCenter,
    tabName: '奖励中心',
    activeIcon: rewardCenterFocused,
    inActiveIcon: rewardCenter,
    options: { tabBarLabel: '奖励中心' },
  },
  PurchaseOrder: {
    screen: tabScreens.PurchaseOrder,
    tabName: '购物车',
    activeIcon: cartFocused,
    inActiveIcon: cart,
    options: { tabBarLabel: '购物车' },
  },
  UserCenter: {
    screen: tabScreens.UserCenter,
    tabName: '我的',
    activeIcon: userFocused,
    inActiveIcon: user,
    options: { tabBarLabel: '我的' },
  },

};
/**
  * 已登录 且 有分销员资格 时底部导航
 */
const isDistributorTab = {
  Main: {
    screen: tabScreens.Main,
    tabName: '首页',
    activeIcon: mainFocused,
    inActiveIcon: main,
    options: { tabBarLabel: '首页', headerShown: false },
  },
  MaterialCircle: {
    screen: tabScreens.MaterialCircle,
    tabName: '发现',
    activeIcon: goodsFocused,
    inActiveIcon: goods,
    options: { tabBarLabel: '发现' },
  },
  DistributionCenter: {
    screen: tabScreens.DistributionCenter,
    tabName: '分销中心',
    activeIcon: disCenterFocused,
    inActiveIcon: disCenter,
    options: { tabBarLabel: '分销中心' },
  },
  PurchaseOrder: {
    screen: tabScreens.PurchaseOrder,
    tabName: '购物车',
    activeIcon: cartFocused,
    inActiveIcon: cart,
    options: { tabBarLabel: '购物车' },
  },
  UserCenter: {
    screen: tabScreens.UserCenter,
    tabName: '我的',
    activeIcon: userFocused,
    inActiveIcon: user,
    options: { tabBarLabel: '我的' },
  },

};

const _tabBarOptions: BottomTabBarOptions = {
  activeTintColor: tabColor,
  inactiveTintColor: '#999999',
  style: {..._.ifIphoneX(
    {
      height: 88
    },
    { height: 55 }
  )}
};
let glob_openFlag = null;
let glob_Distributor = null;
const TabRouters = ({ navigation, route }) => {
  let currentRouters = notLoginOrClose as any;
  // if (route.state && route.state.routeNames) {
  //   if (route.state.routeNames.some((name) => name === 'DistributionCenter')) {
  //     currentRouters = isDistributorTab;
  //   } else if (route.state.routeNames.some((name) => name === 'RewardCenter')) {
  //     currentRouters = isNotDistributorTab;
  //
  //   }
  // }

  const [number, setNumber] = useState(0);
  const [routersconfig, setRouters] = useState(currentRouters);
  const [isDistributor, setIsDistributor] = useState(null);
  const [openFlag, setOpenFlag] = useState(null);

  // 获取购物车数量 设置给角标
  async function changeNum() {
    const numberJson = await AsyncStorage.getItem(cache.PURCHASE_NUM);
    const num1 = (numberJson && JSON.parse(numberJson).purchaseNum) || 0;
    if(num1!==number){ 
      setNumber(num1);
    }
  }
  async function getTabjson() {
    let currTab;
    currTab = {...notLoginOrClose};
     const result = await queryTabBarConfig()
     if(result.code === 'K-000000'){
      result.context.navigationConfigVOList.map((item,index)=>{
        let key;
        switch(index){
        case 0: key="Main"
        break;
        case 1: key="ClassifyPage"
        break;
        case 2: key="SpecialGoodsList"
        break;
        case 3: key="PurchaseOrder"
        break;
        case 4: key="UserCenter"
        break;
        }
        if(item.navName && item.navName.length>0){
          currTab[key].tabName=item.navName
        }
        if(item.iconShow && item.iconShow.length>0){
         currTab[key].inActiveIcon={uri:JSON.parse(item.iconShow)[0].url}
       }
       if(item.iconClick && item.iconClick.length>0){
         currTab[key].activeIcon={uri:JSON.parse(item.iconClick)[0].url}
       }
      })
     }
    setRouters(currTab);
  }
  React.useEffect(() => {
    getTabjson();
    // changeNum();
  },[]);
  changeNum()
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const _source = focused ? routersconfig[route.name].activeIcon : routersconfig[route.name].inActiveIcon;
          return (
            <View style={focused && route.name == 'Main' ? {
              position: 'absolute',
              left: 20,
              top: 8
            } : {}}>
              {
                number > 0 && route.name == 'PurchaseOrder' ?
                  <View style={{
                    width: 18,
                    height: 18,
                    justifyContent: "center",
                    position: 'absolute',
                    zIndex: 9,
                    backgroundColor:tabColor,
                    borderRadius: 9,
                    right: -7,
                    top: -3,
                  }}>
                    <Text style={[{ fontSize: 10, color: "#fff", textAlign: "center", }]}>{number}</Text>
                  </View> : null
              }
              <Image source={_source} style={[{ width: focused && route.name == 'Main' ? 40 : size, height: focused && route.name == 'Main' ? 40 : size }, focused && route.name != 'Main'&& !_source.uri ? {tintColor: mainColor} : {}]} />
            </View>
          )

        },
        tabBarLabel: ({focused, color}) => {
          return !(focused && route.name == 'Main') && (
            <View style={{paddingBottom: 8}}>
              <Text style={[{ fontSize: 10, color: focused ? tabColor : "#999"}]}>{routersconfig[route.name].tabName}</Text>
            </View>
          );
        }
      })}
      backBehavior={'none'}
      tabBarOptions={_tabBarOptions}
    >
      {Object.keys(routersconfig).map((key, i) => {
        const item = routersconfig[key];
        return (
          <Tab.Screen
            name={key}
            component={item.screen}
            options={item.options}
            key={`${i}`}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export {
  TabRouters,
};
