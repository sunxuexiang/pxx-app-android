import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from 'wmkit/progress-bar';

import * as _ from '../../../../wmkit/common/util'; // added by scx
import { msg, Relax } from 'plume2';

import { mainColor, screenWidth } from 'wmkit/styles/index';
import LinearGradient from 'react-native-linear-gradient';
// const defaultImg = require('../img/default-img.png');
@Relax
export default class Header extends React.Component {
  static relaxProps = {
    customer: 'customer',
    userInfo: 'userInfo',
    isLastOne: 'isLastOne',
    nextGradeInfo: 'nextGradeInfo',
    pointsAvailable: 'pointsAvailable',
    pointsIsOpen: 'pointsIsOpen'
  };

  render() {
    const {
      userInfo,
      nextGradeInfo,
      isLastOne,
      pointsAvailable,
      pointsIsOpen
    } = this.props.relaxProps;
    return (

      <LinearGradient
        colors={[mainColor, mainColor]}
        style={styles.container}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
     >
        <View style={styles.box}>
          <View style={styles.row}>
            <View style={styles.imgBox}>
              <Image
                style={styles.defaultImg}
                source={userInfo.get('headImg') ? { uri: userInfo.get('headImg') } : require('../img/default-img.png')}
              />
            </View>

            <View style={styles.rightBox}>
              <View style={styles.rowFlex}>
                <Text style={styles.UserName} allowFontScaling={false}>
                  {userInfo.get('customerName')}
                </Text>
                <TouchableOpacity
                  style={styles.levelBox}
                  activeOpacity={0.8}
                  onPress={() =>
                    msg.emit('router: goToNext', { routeName: 'GrowthValue' })
                  }
                >
                  <Image
                    style={styles.LevelImg}
                    source={{ uri: userInfo.get('rankBadgeImg') }}
                  // source={require('../img/level.png')}
                  />
                  <Text style={styles.levelText} allowFontScaling={false}>
                    {userInfo.get('customerLevelName')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rowFlex}>
                <TouchableOpacity
                  style={styles.growthValue}
                  activeOpacity={0.8}
                  onPress={() =>
                    msg.emit('router: goToNext', { routeName: 'GrowthValue' })
                  }
                >
                  <Text style={styles.growthText} allowFontScaling={false}>
                    成长值:
                    {userInfo.get('customerGrowthValue') || 0}
                  </Text>
                  <View style={styles.triangleRight} />
                </TouchableOpacity>
                {pointsIsOpen && (
                  <TouchableOpacity
                    style={styles.growthValue}
                    activeOpacity={0.8}
                    onPress={() =>
                      msg.emit('router: goToNext', { routeName: 'PointsList' })
                    }
                  >
                    <Text style={styles.growthText} allowFontScaling={false}>
                      积分值:
                      {pointsAvailable}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 160,
    width: screenWidth,
    borderBottomLeftRadius:36,
    borderBottomRightRadius:36,
    paddingTop:26,
    paddingHorizontal:14
  },
  box: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  back: {
    width: 10,
    height: 19
  },
  imgBox: {
    width: 56,
    height: 56,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 28,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  defaultImg: {
    width: 56,
    height: 56,
    resizeMode: 'contain'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchUserName: {
    borderColor: 'transparent',
    borderWidth: 10,
    borderLeftWidth: 0,
    borderRightWidth: 0
  },
  UserName: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 18
  },
  num: {
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginBottom: 8
  },
  rightBox: {
    alignItems: 'flex-start'
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  levelBox: {
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height:18,
    paddingHorizontal: 6,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 9
  },
  LevelImg: {
    width: 12,
    height: 12
  },
  levelText: {
    marginLeft: 2.5,
    fontSize: 10,
    color: '#fff'
  },
  growthValue: {
    height: 20,
    marginRight: 7,
    borderRadius: 10,
    paddingHorizontal: 8,
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7.5
  },
  growthText: {
    color: '#fff',
    fontSize: 12
  },
  triangleRight: {
    marginLeft: 5,
    width: 0,
    height: 0,
    borderTopWidth: 3,
    borderTopColor: 'transparent',
    borderRightWidth: 0,
    borderRightColor: 'transparent',
    borderLeftWidth: 4,
    borderLeftColor: '#fff',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent'
  },
  value: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  valueText: {
    fontSize: 10,
    color: '#fff'
  },
  ProgressBar: {
    position: 'absolute',
    left: 30,
    bottom: 20,
    alignSelf: 'stretch',
    width: '100%'
  }
});
