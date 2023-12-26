import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { screenWidth, mainColor } from 'wmkit/styles/index';
import { msg } from 'plume2';

const defaultImg = require('../img/default-img.png');

type IPointsTopProps = T.IProps & T.IPointsTopProps;

@connect<Partial<IPointsTopProps>, T.IPointsTopState>(
  store2Props,
  actions
)
export default class PointsTop extends React.Component<
  Partial<IPointsTopProps>,
  T.IPointsTopState
> {
  constructor(props: IPointsTopProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      main: { customerInfo }
    } = this.props;

    return (
      <View style={styles.father}>
        <LinearGradient
          colors={[mainColor, mainColor]}
          style={[styles.container]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <View style={styles.top}>
            <Image
              style={styles.headImg}
              source={
                customerInfo.headImg
                  ? { uri: customerInfo.headImg }
                  : defaultImg
              }
            />
            {customerInfo && customerInfo.customerName ? (
              <View style={styles.nameBox}>
                <Text allowFontScaling={false} style={styles.name}>
                  {customerInfo.customerName}
                </Text>
                <TouchableOpacity
                  style={styles.levelBox}
                  activeOpacity={0.8}
                  onPress={() =>
                    msg.emit('router: goToNext', { routeName: 'GrowthValue' })
                  }
                >
                  <Image
                    style={styles.levelImg}
                    source={{ uri: customerInfo.rankBadgeImg }}
                  />
                  <Text allowFontScaling={false} style={styles.level}>
                    {customerInfo.customerLevelName}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.toLogin}
                activeOpacity={0.8}
                onPress={() =>
                  msg.emit('loginModal:toggleVisible', {
                    callBack: () => {
                      this.props.actions.init();
                    }
                  })
                }
              >
                <Text
                  allowFontScaling={false}
                  allowFontScaling={false}
                  style={styles.toLoginLab}
                >
                  登录/注册&nbsp;>
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>

        <LinearGradient
          colors={['#FFEEDB', '#FFDFC7']}
          style={[styles.downBox]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <View style={styles.pointsBox}>
            <Image
              style={styles.pointsImg}
              source={require('../img/integral.png')}
            />
            <Text allowFontScaling={false} style={styles.points}>
              {customerInfo.pointsAvailable || 0}
            </Text>
            <Text allowFontScaling={false} style={styles.pointsTxt}>
              积分
            </Text>
          </View>
          <View style={styles.goJoin}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (customerInfo && customerInfo.customerName) {
                  msg.emit('router: goToNext', {
                    routeName: 'PointsOrderList'
                  });
                } else {
                  msg.emit('loginModal:toggleVisible', {
                    callBack: () => {
                      this.props.actions.init();
                    }
                  });
                }
              }}
            >
              <LinearGradient
                colors={['#FF8800', '#FF4D00']}
                style={[styles.linearGradient]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              >
                <Text allowFontScaling={false} style={styles.joinTxt}>
                  兑换记录
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  father: {
    flexDirection: 'column'
  },
  container: {
    width: screenWidth,
    height: screenWidth * 0.293,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36
  },
  top: {
    width: screenWidth,
    marginLeft: 12,
    top: screenWidth * 0.065,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headImg: {
    width: 28,
    height: 28,
    borderRadius: 14
  },
  nameBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    fontSize: 18,
    color: '#ffffff',
    paddingHorizontal: 8
  },
  levelBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 18,
    // paddingVertical: 3,
    paddingHorizontal: 6,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 9
  },
  toLogin: {
    paddingHorizontal: 6
  },
  toLoginLab: {
    marginLeft: 5,
    fontSize: 12,
    color: '#fff'
  },
  levelImg: {
    width: 12,
    height: 12
  },
  level: {
    marginLeft: 2,
    fontSize: 10,
    color: '#fff'
  },
  pointsBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pointsImg: {
    height: 16,
    width: 16,
    marginTop: 10
  },
  points: {
    fontSize: 28,
    color: '#FF6600',
    paddingHorizontal: 8
  },
  pointsTxt: {
    fontSize: 12,
    color: '#FF6600',
    paddingTop: 10
  },
  goJoin: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  joinTxt: {
    fontSize: 12,
    color: '#fff'
  },
  linearGradient: {
    height: 28,
    width: 72,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
    // shadowOffset: { width: 1, height: 8 },
    // shadowOpacity: 0.48,
    // shadowRadius: 10,
    // shadowColor: '#FF1F4E'
  },
  downBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 68,
    borderRadius: 8,
    marginTop: -34,
    marginHorizontal: 12,
    paddingHorizontal: 16
  }
});
