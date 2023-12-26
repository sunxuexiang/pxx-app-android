import React from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';

@Relax
export default class List extends React.Component {
  static relaxProps = {
    wxFlag: 'wxFlag',
    wxBind: noop,
    wxUnBind: noop
  };

  render() {
    const { wxFlag, wxBind, wxUnBind } = this.props.relaxProps;
    return (
      <View style={{ backgroundColor: '#f5f5f5' }}>
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.nav}
            onPress={() => {
              if (wxFlag) {
                wxUnBind();
              } else {
                wxBind();
              }
            }}
          >
            <Image source={require('../img/weixin.png')} style={styles.img} />
            <Text allowFontScaling={false} style={styles.text}>
              微信
            </Text>
            <Text allowFontScaling={false} style={styles.rightText}>
              {wxFlag == null ? (
                ''
              ) : wxFlag ? (
                <Text style={{ color: 'rgba(0,0,0,0.8)' }}>已绑定</Text>
              ) : (
                <Text>未绑定</Text>
              )}
            </Text>
            <Image source={require('../img/arrow.png')} style={styles.icon} />
          </TouchableOpacity>
          {/* <TouchableOpacity
            activeOpacity={0.8}
            style={styles.nav}
            onPress={() => {}}
          >
            <Image source={require('../img/qq.png')} style={styles.img} />
            <Text allowFontScaling={false} style={styles.text}>
              QQ
            </Text>
            <Text allowFontScaling={false} style={styles.rightText}>
              未绑定
            </Text>
            <Image source={require('../img/arrow.png')} style={styles.icon} />
          </TouchableOpacity> */}
        </View>
        <View style={styles.tipBox}>
          <Text style={styles.tipText1} allowFontScaling={false}>
            提示：
          </Text>
          <Text style={styles.tipText} allowFontScaling={false}>
            账号关联之后，用户可使用快捷登录进入商城。为了您的账号安全，30天内不可解除绑定账号
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12
  },
  nav: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#ffffff'
  },
  text: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14,
    flex: 1
  },
  icon: {
    width: 12,
    height: 12,
    marginLeft: 8
  },
  img: {
    width: 24,
    height: 24,
    marginRight: 13
  },
  rightText: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.4)'
  },
  tipText: {
    fontSize: 12,
    color: '#rgba(0,0,0,0.4)',
    lineHeight: 20,
    marginTop: 8
  },
  tipText1: {
    fontSize: 14,
    lineHeight: 14,
    color: 'rgba(0,0,0,0.4)'
  },
  tipBox: {
    paddingHorizontal: 12,
    marginTop: 20
  }
});
