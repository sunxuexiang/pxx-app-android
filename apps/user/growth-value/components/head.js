import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { noop } from 'wmkit/noop';
import ProgressBar from 'wmkit/progress-bar';
import * as _ from '../../../../wmkit/common/util'; // added by scx
import { Relax, msg } from 'plume2';

import { mainColor } from 'wmkit/styles/index';
import LinearGradient from 'react-native-linear-gradient';
@Relax
export default class Header extends React.Component {
  static relaxProps = {
    changeLayer: noop,
    levelInfo: 'levelInfo',
    isLastOne: 'isLastOne'
  };

  render() {
    const { changeLayer, levelInfo, isLastOne } = this.props.relaxProps;
    return (
      <LinearGradient
        colors={[mainColor, mainColor]}
        style={styles.container}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <SafeAreaView style={styles.box}>
          <View style={styles.growthValue}>
            <Text style={styles.growthText} allowFontScaling={false}>
              当前成长值
            </Text>
            <TouchableOpacity
              style={styles.ruleBox}
              activeOpacity={0.8}
              onPress={() => changeLayer()}
            >
              <Text style={styles.rule} allowFontScaling={false}>
                成长值规则
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.nums}>{levelInfo.get('nowHaveGrowthValue')}</Text>

          <View style={styles.ProgressBar}>
            <ProgressBar
              barStyle={{borderColor:'#fff'}}
              percent={
                levelInfo.get('needGrowthValue') > 0
                  ? (levelInfo.get('nowHaveGrowthValue') /
                      levelInfo.get('nextGrowthValue')) *
                    100
                  : 99
              }
            />
            <View style={styles.value}>
              <Text style={styles.valueText} allowFontScaling={false}>
                当前等级&nbsp;
                <Text style={{ color: '#fff' }}>
                  {levelInfo.get('atPresentLevelName')}
                </Text>
              </Text>
              {!isLastOne ?
                <Text style={styles.valueText} allowFontScaling={false}>
                  距离&nbsp;
                  {levelInfo.get('nextLevelName')}
                  &nbsp;等级还差&nbsp;
                  {levelInfo.get('needGrowthValue') > 0
                    ? levelInfo.get('needGrowthValue')
                    : 1}
                </Text>:
                <Text style={styles.valueText} allowFontScaling={false}>
                  您已达到最高等级
                </Text>
              }
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 160,
    marginHorizontal:12,
    borderRadius:8,
    paddingHorizontal:16,
    paddingVertical:24,
    marginBottom:12
  },
  box: {
    width: '100%',
    flexDirection: 'column',
  },
  back: {
    width: 10,
    height: 19
  },
  ruleBox: {
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 8,
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rule: {
    color: '#fff',
    fontSize: 10
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  levelBox: {
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(178,14,46,0.9)',
    borderRadius: 8.5
  },
  LevelImg: {
    width: 11,
    height: 11
  },
  levelText: {
    marginLeft: 2.5,
    fontSize: 10,
    color: '#e4c137'
  },
  growthValue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginBottom: 0
  },
  growthText: {
    color: '#fff',
    fontSize: 12,
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
    alignSelf: 'stretch',
    width: '100%',
    marginTop:6
  },
  nums:{
    fontSize:28,
    color:'#fff',
    fontWeight:'bold'
  }
});
