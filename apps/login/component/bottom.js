import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Relax } from 'plume2';

import { config } from 'wmkit/config';
import { noop } from 'wmkit/noop';

import * as _ from '../../../wmkit/common/util'; // added by scx
import { isAndroid, screenWidth } from 'wmkit/styles/index';
const { LAST_YEAR, OWNER, START_YEAR } = config;

@Relax
export default class Bottom extends React.Component {
  constructor(props) {
    super(props);
  }
  static relaxProps = {
    wxFlag: 'wxFlag',
    wxLogin: noop
  };

  render() {
    const { wxFlag, wxLogin } = this.props.relaxProps;
    return (
      <View style={styles.copyRight}>
        <View style={styles.choseList}>
          {wxFlag && (
            <TouchableOpacity
              onPress={() => wxLogin()}
              activeOpacity={0.8}
              style={styles.choseItem}
            >
              <Image
                source={require('../img/wechat.png')}
                style={styles.itemImg}
              />
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity activeOpacity={0.8} style={styles.choseItem}>
            <Image source={require('../img/qq.png')} style={styles.itemImg} />
            <Text allowFontScaling={false} style={styles.itemText}>
              QQ登录
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.choseItem}>
            <Image
              source={require('../img/weibo.png')}
              style={styles.itemImg}
            />
            <Text allowFontScaling={false} style={styles.itemText}>
              微博登录
            </Text>
          </TouchableOpacity> */}
        </View>
        <Text style={styles.copyText}>
          ©{' '}
          {START_YEAR === LAST_YEAR
            ? START_YEAR
            : START_YEAR + ' - ' + LAST_YEAR}{' '}
          {OWNER}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  copyRight: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    ..._.ifIphoneX(
      {
        bottom: 30
      },
      {
        bottom: 10
      }
    ),
    width: screenWidth
  },
  copyText: {
    fontSize: 12,
    backgroundColor: 'transparent',
    lineHeight: 14,
    color: '#999'
  },
  choseList: {
    flexDirection: 'row',
    width: screenWidth * 0.7,
    justifyContent: 'space-around',
    marginBottom: 12
  },
  choseItem: {
    alignItems: 'center'
  },
  itemImg: {
    width: 48,
    height: 48,
    marginBottom: 5
  },
  itemText: {
    fontSize: 12,
    color: '#999'
  }
});
