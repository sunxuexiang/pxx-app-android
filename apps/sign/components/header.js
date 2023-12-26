import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import { mainColor } from 'wmkit/styles/index';
import { msg, Relax } from 'plume2';
import LinearGradient from 'react-native-linear-gradient';
/**
 * 每日签到模块
 */
@Relax
export default class Header extends React.Component {
  static relaxProps = {
    userInfo: 'userInfo'
  };
  render() {
    const { userInfo } = this.props.relaxProps;
    const date = new Date(Date.now());
    return (
      <SafeAreaView>
        <LinearGradient
          colors={[mainColor, mainColor]}
          style={styles.container}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <StatusBar barStyle={'light-content'} />

          <View style={styles.box}>
            <View style={styles.hd}>
              <Text style={styles.num1} allowFontScaling={false}>
                {date.getMonth() + 1}月{' '}
                {date.getDate() < 10 ? '0' + date.getDate() : date.getDate()} 日
              </Text>
              <Text style={styles.info1} allowFontScaling={false}>
                已连续签到
                {userInfo.get('signContinuousDays')}天
              </Text>
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: 160,
    position: 'relative',
    paddingTop: 20,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36
  },
  leftImg: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    top: 20
  },
  img: {
    width: 10,
    height: 18
  },
  titleText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  },
  rightText: {
    flexDirection: 'row',
    marginRight: 30
  },
  text: {
    color: '#fff',
    fontSize: 14
  },
  hd: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12
  },
  num1: {
    color: '#ffffff',
    fontSize: 14
  },
  info1: {
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 12
  }
});
