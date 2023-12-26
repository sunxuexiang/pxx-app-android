import React from 'react';
import { routersConfig } from '../irouter-config';
import { TabRouters } from './TabNavigator';
import { createCustomNavigator } from './CustomRouter';
import { fetchNeedLogin } from './router-util';
const CustomStack = createCustomNavigator();

const AppNavigator = () => {

  fetchNeedLogin();
  let initialRouteName = 'Main';
  if(!window.token && window.needLogin) {
    initialRouteName = 'Login'
  }
  
  return (
      <CustomStack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={({ route, navigation }) => ({
          headerShown: false,
          animationTypeForReplace: 'pop'
        })}
      >
        <CustomStack.Screen
          name={'Main'}
          component={TabRouters}
        />
        {Object.keys(routersConfig).map((key, i) => {
          const item = routersConfig[key];
          return (
            <CustomStack.Screen
              name={item.name}
              component={item.component}
              key={`${i}`}
            />
          );
        })}
      </CustomStack.Navigator>
  );
};

export default AppNavigator;
