import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { msg, Relax } from 'plume2';
import { noop } from 'wmkit/noop';

@Relax
export default class LoginTab extends React.Component {
  constructor(props) {
    super(props);
  }
  static relaxProps = {
    isALogin: 'isALogin',
    loginChange: noop
  };

  render() {
    const { isALogin, loginChange } = this.props.relaxProps;
    return (
      <View style={styles.tab}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            loginChange();
          }}
        >
          <Text allowFontScaling={false} style={styles.tabText}>
            {isALogin ? '短信验证码登录' : '账号密码登录'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.link}
          onPress={() =>
            msg.emit('router: goToNext', { routeName: 'Register' })
          }
        >
          <Text allowFontScaling={false} style={styles.tabText}>
            新用户注册
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  tabText: {
    fontSize: 14,
    color: '#999'
  },
  tabItem: {
    paddingBottom: 6
  },
  line: {
    borderRightColor: '#ddd',
    borderRightWidth: 1,
    marginHorizontal: 30
  }
});
