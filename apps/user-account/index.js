/**
 * Created by feitingting on 2017/8/29.
 */
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { StoreProvider, msg } from 'plume2';
import AppStore from './store';
import UserAccountList from './component/list';
import Header from 'wmkit/header';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class UserAccount extends React.Component {
  store;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    msg.on('account-list:refresh', this._refresh);
    //按钮事件绑定
    msg.emit('router: setParams', {
      handleAdd: this.store.addAccount
    });
    this.store.init();
  }

  componentWillUnMount() {
    msg.off('account-list:refresh', this._refresh);
  }

  render() {
    const count = this.store.state().get('accountList').length;
    const state = this.props.route;
    return count == 0 ? (
      <View style={{ height: '100%' }}>
        <Header
          title="银行卡"
          renderRight={() => {
            return (
              <View>
                <TouchableOpacity onPress={() => state.params.handleAdd()}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 13,
                      paddingRight: 15
                    }}
                    allowFontScaling={false}
                  >
                    新增
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <View style={styles.container}>
          <Image style={styles.img} source={require('./img/none.png')} />
          <Text allowFontScaling={false} style={styles.text}>还没有银行账户，快去新增吧</Text>
          <Text allowFontScaling={false} style={styles.tips}>提示：您做多可以添加5条银行账户信息</Text>
        </View>
      </View>
    ) : (
      <UserAccountList />
    );
  }

  /**
   * 刷新列表数据
   * @private
   */
  _refresh = () => {
    this.store.init();
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  img: {
    width: 200,
    height: 200,
    marginBottom: 15
  },
  text: {
    color: '#333333',
    fontSize: 15,
    marginBottom: 5
  },
  tips: {
    color: '#939495',
    fontSize: 12
  }
});
