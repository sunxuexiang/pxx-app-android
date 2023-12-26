import React from 'react';
import { StoreProvider, msg } from 'plume2';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Header from 'wmkit/header';
import * as WMkit from 'wmkit/kit';
import AppStore from './store';
import FormItem from './component/safepass-form-item';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class UserSafePassword extends React.Component {
  componentDidMount() {
    //判断是忘记密码还是设置密码
    const state = this.props.route;
    const { forget } = (state && state.forget) || false;

    this.store.init(forget);
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={'手机号验证'}
          renderRight={() => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ padding: 10 }}
                onPress={() => {
                  if (!WMkit.isLogin()) {
                    msg.emit('loginModal:toggleVisible', {
                      callBack: () => {
                        this.store.doNext();
                      }
                    });
                  } else {
                    this.store.doNext();
                  }
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={{ fontSize: 14, color: '#000', marginRight: 2 }}>
                  下一步
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <FormItem />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  arrowImg: {
    width: 13,
    height: 7
  }
});
