import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  Linking
} from 'react-native';
import { StoreProvider } from 'plume2';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import AppStore from './store';
import Header from 'wmkit/header';
import { config } from 'wmkit/config';

import { screenWidth, isAndroid, mainColor } from 'wmkit/styles/index';

/**
 * 版本号
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class Version extends React.PureComponent {
  render() {
    const state = this.props.route;
    const { upgradeInfo } = (state && state.params) || {};
    const { LAST_YEAR, OWNER, START_YEAR } = config;

    if (!upgradeInfo) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Header title="版本号" />
        <View style={styles.content}>
          <View style={styles.versionBox}>
            <ImageBackground
              style={styles.version}
              source={require('./img/version.png')}
            >
              <View>
                <Text style={styles.title} allowFontScaling={false}>
                  当前版本号
                </Text>
                <Text style={styles.num} allowFontScaling={false}>
                  {upgradeInfo.get('oldVersion')}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <SafeAreaView
            style={{ marginBottom: 10, justifyContent: 'flex-end' }}
          >
            {upgradeInfo.get('dotShow') && (
              <View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btn}
                  onPress={() => this._upgradeImmediately(upgradeInfo)}
                >
                  <LinearGradient
                    colors={[mainColor, mainColor]}
                    style={[styles.linearGradient, { shadowColor: mainColor }]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                  >
                    <Text allowFontScaling={false} style={styles.whiteText}>
                      立即更新
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <Text style={styles.normalText} allowFontScaling={false}>
                  最新版本号
                  {upgradeInfo.get('latestVersion')}
                </Text>
              </View>
            )}
            {/* <Text style={styles.copyText} allowFontScaling={false}>
              ©
              {START_YEAR === LAST_YEAR
                ? START_YEAR
                : START_YEAR + ' - ' + LAST_YEAR}{' '}
              {OWNER}
            </Text> */}
          </SafeAreaView>
        </View>
      </View>
    );
  }

  /**
   * 立即更新，跳转相应的下载地址
   * @param upgradeInfo
   * @private
   */
  _upgradeImmediately = (upgradeInfo) => {
    Linking.openURL(
      isAndroid
        ? upgradeInfo.get('androidAddress')
        : `itms-services://?action=download-manifest&url=${upgradeInfo.get(
            'appAddress'
          )}`
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    justifyContent: 'space-between'
  },
  versionBox: {
    width: screenWidth,
    height: screenWidth,
    alignItems: 'center',
    justifyContent: 'center'
  },
  version: {
    width: screenWidth * 0.92,
    height: screenWidth * 0.92,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  num: {
    color: '#fff',
    fontSize: 36,
    textAlign: 'center',
    marginTop: 5
  },
  btn: {
    marginLeft: '20%',
    width: '60%'
  },
  linearGradient: {
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 1, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10
  },
  whiteText: {
    color: '#fff',
    fontSize: 16
  },
  normalText: {
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: screenWidth < 361 ? 25 : 40
  },
  copyText: {
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 16,
    color: '#999'
  }
});
