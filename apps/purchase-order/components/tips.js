import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Relax } from 'plume2';

import {mainColor, screenWidth} from 'wmkit/styles/index';
import { disableCountQL } from '../ql';
import LinearGradient from 'react-native-linear-gradient';
import * as _ from 'wmkit/common/util';

@Relax
export default class Tips extends React.Component {
  static relaxProps = {
    edit: 'edit',
    totalBuyPoint: 'totalBuyPoint',
    distributeCommission: 'distributeCommission',
    disableCountQL: disableCountQL
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { edit, disableCountQL, totalBuyPoint, distributeCommission } = this.props.relaxProps;
    console.log();
    return disableCountQL > 0 &&
      !edit && (
        <LinearGradient
          colors={[mainColor, mainColor]}
          style={totalBuyPoint && distributeCommission ? styles.shadowCommission : totalBuyPoint || distributeCommission ? styles.shadowPoint : styles.shadow}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          {/* <Image source={require('../img/warning.png')} style={styles.img} /> */}
          <Text style={styles.white} allowFontSacling={false}>
            有{disableCountQL}
            种商品不符合下单条件，无法下单
          </Text>
        </LinearGradient>
      );
  }
}

const styles = StyleSheet.create({
  shadowCommission: {
    position: 'absolute',
    left: 0,
    ..._.ifIphoneX(
      {
        bottom: 78
      },
      {
        bottom: 68
      }
    ),
    ..._.ifIphoneXR(
      { bottom: 78 }
    ),
    //bottom: 48,
    width: screenWidth,
    // backgroundColor: 'rgba(0,0,0,0.7)',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 14
  },
  shadowPoint: {
    position: 'absolute',
    left: 0,
    ..._.ifIphoneX(
      {
        bottom: 78
      },
      {
        bottom: 58
      }
    ),
    ..._.ifIphoneXR(
      { bottom: 78 }
    ),
    //bottom: 48,
    width: screenWidth,
    // backgroundColor: 'rgba(0,0,0,0.7)',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 14
  },
  shadow: {
    position: 'absolute',
    left: 0,
    ..._.ifIphoneX(
      {
        bottom: 78
      },
      {
        bottom: 45
      }
    ),
    ..._.ifIphoneXR(
      { bottom: 78 }
    ),
    //bottom: 48,
    width: screenWidth,
    // backgroundColor: 'rgba(0,0,0,0.7)',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 14
  },
  img: {
    width: 15,
    height: 15,
    marginRight: 14
  },
  white: {
    color: '#ffffff',
    fontSize: 12,
    backgroundColor: 'transparent'
  }
});
