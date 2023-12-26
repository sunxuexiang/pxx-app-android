import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { msg, Relax } from 'plume2';

import * as WMkit from 'wmkit/kit';
import * as _ from '../../../wmkit/common/util'; // added by scx
import { screenWidth, mainColor } from 'wmkit/styles/index';
import LinearGradient from 'react-native-linear-gradient';
import HeaderSearch from './headerSearch';
const isAndroid = Platform.OS === 'android';

@Relax
export default class SearchBar extends React.Component {
  static relaxProps = {
    noticeNum: 'noticeNum',
    preferentialNum: 'preferentialNum',
    preKeywords: 'preKeywords',
    cityInfo: 'cityInfo'
  };

  render() {
    const {
      noticeNum,
      preferentialNum,
      preKeywords,
      cityInfo
    } = this.props.relaxProps;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.rowSearch}
        onPress={() => msg.emit('router: goToNext', { routeName: 'Search' })}
      >
        <LinearGradient
          colors={[mainColor, mainColor]}
          style={styles.search}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0, y: 1 }}
        >
          <TouchableOpacity activeOpacity={0.8} style={styles.cityInfo}>
            <Text style={styles.cityInfoText}>
              {cityInfo != '' ? cityInfo : '请选择'}
            </Text>
          </TouchableOpacity>
          <View style={styles.container}>
            <Image style={styles.icon} source={require('../img/search.png')} />
            {preKeywords.length === 0 ? (
              <Text allowFontSacling={false} style={styles.text}>
                {'搜索商品'}
              </Text>
            ) : (
              <HeaderSearch preKeywords={preKeywords} />
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              msg.emit('router: goToNext', { routeName: 'CameraComponent' });
            }}
          >
            <Image
              style={styles.scannIcon}
              source={require('../img/scann.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconBox}
            onPress={() => {
              if (!WMkit.isLoginOrNotOpen()) {
                msg.emit('loginModal:toggleVisible', {
                  callBack: () => {
                    msg.emit('router: goToNext', { routeName: 'PushCenter' });
                  }
                });
              } else {
                msg.emit('router: goToNext', { routeName: 'PushCenter' });
              }
            }}
          >
            <Image
              style={styles.mesIcon}
              source={require('../img/message.png')}
            />
            {(noticeNum !== 0 || preferentialNum !== 0) && (
              <View style={styles.round}>
                <Text style={[styles.roundText, { color: mainColor }]} allowFontScaling={false}>
                  {noticeNum + preferentialNum > 99
                    ? '99+'
                    : noticeNum + preferentialNum}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  headerSearch: {
    paddingVertical: 6,
    position: 'absolute',
    left: 30,
    top: 0
  },
  container: {
    overflow: 'hidden',
    position: 'relative',
    height: 38,
    backgroundColor: '#fff',
    borderRadius: 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 8,
    flex: 1
  },
  cityInfo: {
    marginLeft: 5
  },
  cityInfoText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)'
  },
  rowSearch: {
    position: 'absolute',
    width: screenWidth,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
    ..._.ifIphoneX(
      {
        paddingTop: 38
      },
      { paddingTop: isAndroid ? 8 : 28 }
    )
  },
  icon: {
    marginLeft: 15,
    marginRight: 8,
    width: 16,
    height: 16
  },
  text: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.4)',
    flex: 1,
    textAlign: 'left',
    paddingVertical: 6
  },
  textDefault: {
    paddingLeft: 8,
    textAlign: 'left'
  },
  iconBox: {
    width: 40,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mesIcon: {
    width: 20,
    height: 20
  },
  scannIcon: {
    marginLeft: 12,
    width: 20,
    height: 20
  },
  round: {
    position: 'absolute',
    top: 0,
    right: 5,
    backgroundColor: '#fff',
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  roundText: {
    fontSize: 10
  }
});
