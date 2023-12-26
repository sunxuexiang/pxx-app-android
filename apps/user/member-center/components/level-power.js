import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { msg, Relax } from 'plume2';
import { screenWidth,mainColor } from 'wmkit/styles/index';
import LinearGradient from 'react-native-linear-gradient';
import * as WMkit from 'wmkit/kit';
import * as _ from 'wmkit/common/util';
import ProgressBar from 'wmkit/progress-bar';

@Relax
export default class LevelPower extends React.Component {
  static relaxProps = {
    nowPossessGradeInfo: 'nowPossessGradeInfo',
    notGetGradeList: 'notGetGradeList',
    isLastOne: 'isLastOne',
    nextGradeInfo: 'nextGradeInfo',
    userInfo: 'userInfo',
  };

  render() {
    const { nowPossessGradeInfo, notGetGradeList,  nextGradeInfo,isLastOne, userInfo} = this.props.relaxProps;
    if (
      nowPossessGradeInfo.get('customerLevelRightsVOS') &&
      nowPossessGradeInfo.get('customerLevelRightsVOS').size == 0 &&
      notGetGradeList.size == 0
    ) {
      return null;
    }
    return (
      <LinearGradient
        colors={['#FFEEDB', '#FFDFC7']}
        style={styles.container}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
     >
          <Text allowFontScaling={false} style={styles.title}>
            等级会员权益
          </Text>

          <View style={styles.ProgressBar}>
            <ProgressBar
              percent={
                nextGradeInfo.get('growthValue') -
                  userInfo.get('customerGrowthValue') >
                  0
                  ? (userInfo.get('customerGrowthValue') /
                    nextGradeInfo.get('growthValue')) *
                  100
                  : 99
              }
            />
            <View style={styles.value}>
              <Text style={styles.valueText} allowFontScaling={false}>
                当前成长值&nbsp;
                <Text style={{ color: mainColor }}>
                  {userInfo.get('customerGrowthValue') || 0}
                </Text>
              </Text>
              {!isLastOne ? (
                <Text style={styles.valueText} allowFontScaling={false}>
                  距离&nbsp;
                  {nextGradeInfo.get('customerLevelName')}
                  &nbsp;等级还差&nbsp;
                  {nextGradeInfo.get('growthValue') -
                    userInfo.get('customerGrowthValue') <
                    0
                    ? 1
                    : nextGradeInfo.get('growthValue') -
                    userInfo.get('customerGrowthValue')}
                </Text>
              ) : (
                  <Text style={styles.valueText} allowFontScaling={false}>
                    您已达到最高等级
                </Text>
                )}
            </View>
          </View>

          <ScrollView
            contentContainerStyle={styles.levelBox}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={false}
          >
            {nowPossessGradeInfo.get('customerLevelRightsVOS') &&
              nowPossessGradeInfo.get('customerLevelRightsVOS').map((v, k) => {
                return (
                  <TouchableOpacity
                    key={k}
                    style={styles.levelItem}
                    activeOpacity={0.8}
                    //
                    onPress={() =>
                      msg.emit('router: goToNext', {
                        routeName: 'ClassEquity',
                        id: nowPossessGradeInfo.get('customerLevelId')
                      })
                    }
                  >
                    <Image
                      style={[styles.levelImg]}
                      source={{ uri: v.get('rightsLogo') }}
                    />
                    <Text
                      style={[styles.levelText]}
                      allowFontScaling={false}
                      numberOfLines={1}
                    >
                      {v.get('rightsName')}
                    </Text>
                  </TouchableOpacity>
                );
              })}

            {notGetGradeList.map((v, k) => {
              return (
                <TouchableOpacity
                  key={k}
                  style={styles.levelItem}
                  onPress={() =>
                    msg.emit('router: goToNext', {
                      routeName: 'ClassEquity',
                      id: v.get('customerLevelId')
                    })
                  }
                  activeOpacity={0.8}
                >
                  <Image
                    style={[styles.levelImg, styles.otherImg]}
                    source={{ uri: v.get('rightsLogo') }}
                  />
                  <Text
                    style={[styles.levelText, styles.otherText]}
                    allowFontScaling={false}
                    numberOfLines={1}
                  >
                    {v.get('rightsName')}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    borderRadius: 10,
    paddingHorizontal:16,
    paddingVertical:20,
    marginTop:-48,
    marginBottom:12
  },
  levelBox: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb',
  },
  title: {
    color: '#985B31',
    fontSize: 16,
    marginBottom: 16,
    fontWeight:'bold'
  },
  levelItem: {
    width: 0.22 * (screenWidth - 24),
    paddingHorizontal: 3,
    alignItems: 'center'
  },
  levelImg: {
    width: 32,
    height: 32,
    resizeMode: 'contain'
  },
  otherImg: {
    tintColor: '#ebebeb'
  },
  otherText: {
    color: '#ebebeb'
  },
  levelText: {
    color: '#985B31',
    fontSize: 12,
    marginTop: 10
  },
  ruleBox: {
    marginHorizontal: 10,
    marginTop: 10,
    paddingBottom: 10
  },
  pointsMall: {
    width: screenWidth - 20,
    height: screenWidth * 0.1272
  },
  value: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  valueText: {
    fontSize: 10,
    color: '#985B31'
  },
  ProgressBar: {
    alignSelf: 'stretch',
    width: '100%',
    marginBottom:12
  }
});
