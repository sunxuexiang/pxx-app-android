/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { AppRegistry } from 'react-native';

import App from './apps';

AppRegistry.registerComponent('b2bapp', () => {
  //去warning
  console.disableYellowBox = true;
  return App;
});
