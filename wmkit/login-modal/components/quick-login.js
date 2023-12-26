import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { msg, Relax } from 'plume2';
import { config } from 'wmkit/config';
import * as _ from '../../common/util';

/**
 * 微信登录
 */
@Relax
export default class QuickLogin extends React.Component {
  static relaxProps = {
    wxLogin: () => {}
  };

  render() {
    const { LAST_YEAR, OWNER, START_YEAR } = config;
    const { wxLogin } = this.props.relaxProps;
    const { isCheckQuickLogin } = this.props
    return (
      <View style={styles.copyRight}>
        <View style={styles.choseList}>
          <TouchableOpacity
            onPress={() => {
              if(!isCheckQuickLogin){
                msg.emit('app:tip', '请先阅读并同意相关协议');
                return
              }
              wxLogin()
            }}
            activeOpacity={0.8}
            style={styles.choseItem}
          >
            <Image
              source={require('../img/wechat.png')}
              style={styles.itemImg}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.copyText} allowFontScaling={false}>
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
    flex: 1,
    // width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    ..._.ifIphoneX(
      {
        marginBottom: 30
      },
      {
        marginBottom: 10
      }
    ),
    ..._.ifIphoneXR(
      {
        marginBottom: 30
      },
      {
      }
    )
  },
  choseList: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 15
  },
  choseItem: {
    alignItems: 'center'
  },
  itemImg: {
    width: 60,
    height: 60
  },
  copyText: {
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 16,
    color: '#999'
  }
});
