'use strict';
import { Dimensions, Platform } from 'react-native';

let mainColor = '#f08300'; // 主题色  3d85cc
let priceColor = '#f08300'; // 价格颜色
let tabColor = '#f08300'; // tab颜色
let panelColor = '#fdebd7'; //块背景

const { width: screenWidth, height: screenHeight } = Dimensions.get('window'); // 屏幕宽高

const isAndroid = Platform.OS == 'android';
const isIOS = Platform.OS == 'ios';

const changeColor = (themeColor, tagBgColor) => {
  mainColor = themeColor;
  priceColor = themeColor;
  tabColor = themeColor;
  panelColor = tagBgColor;
};

export { mainColor, priceColor, tabColor, panelColor, screenWidth, screenHeight, isAndroid, isIOS, changeColor };
