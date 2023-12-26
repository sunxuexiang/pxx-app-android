import React from 'react';
import {
  Image,
  ImageBackground,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { msg, Relax } from 'plume2';
import Header from 'wmkit/header';
import { mainColor, screenWidth } from 'wmkit/styles/index';
import * as _ from '../../../../wmkit/common/util'; // added by scx
import LinearGradient from 'react-native-linear-gradient';
@Relax
export default class BalanceHomeHeader extends React.Component {
  static relaxProps = {
    amount: 'amount'
  };

  render() {
    return (
      <LinearGradient
        colors={[mainColor, mainColor]}
        style={styles.container}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <Header title="余额" style={{backgroundColor: 'transparent'}} imgStyle={{}} titleStyle={{color: '#fff'}}/>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: screenWidth,
    alignItems: 'center',
    ..._.ifIphoneX(
      {
        height: screenWidth * 0.5493
      },
      {
        height: screenWidth * 0.4373
      }
    ),
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: 'hidden'
  }
});
