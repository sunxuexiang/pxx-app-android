/**
 * Created by feitingting on 2017/8/29.
 */
import React from 'react';
import {
  Dimensions,
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { msg, Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import { Confirm } from 'wmkit/modal/confirm';
import Header from 'wmkit/header';
import Swipeout from 'react-native-swipeout';
import LinearGradient from 'react-native-linear-gradient';
import { mainColor } from 'wmkit/styles/index';

const { height: SCREENHEIGHT } = Dimensions.get('window');
@Relax
export default class UserAccountList extends React.Component {
  static relaxProps = {
    accountList: 'accountList',
    refreshState: 'refreshState',

    refresh: noop,
    deleteAccount: noop
  };

  // 初始化模拟数据
  constructor(props) {
    super(props);
  }

  render() {
    const { accountList, refreshState, refresh } = this.props.relaxProps;
    return (
      <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <Header title="银行账户" />
        <ScrollView
          style={styles.bankContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshState}
              onRefresh={() => {
                refresh();
                msg.emit('account-list:refresh');
                refresh();
              }}
            />
          }
        >
          {accountList.map((account) => {
            return this._renderRow(account);
          })}
        </ScrollView>
        <View style={styles.bottom}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: 'rgba(0,0,0,0.4)'
            }}
          >
            最多可添加5条银行账户信息
          </Text>
          <SafeAreaView style={styles.btnbox}>
            <TouchableOpacity
              onPress={() => {
                if (accountList.length >= 5) {
                  msg.emit('app:tip', '最多可添加5条银行账户信息');
                } else {
                  msg.emit('router: goToNext', {
                    routeName: 'UserAccountEdit',
                    add: true,
                    accountId: -1
                  });
                }
              }}
              style={styles.add}
            >
              <LinearGradient
                colors={[mainColor, mainColor]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[styles.buttonBox, { backgroundColor: mainColor }]}
              >
                <Image style={[styles.img, { tintColor: mainColor }]} source={require('../img/add.png')} />
                <Text style={{ color: '#fff', fontSize: 14 }}>
                  新增银行账户
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </View>
    );
  }

  _renderRow = (item) => {
    return (
      <View style={styles.list} key={item.customerAccountId}>
        <Swipeout
          key={Math.random()}
          buttonWidth={108}
          right={[
            {
              text: '删除',
              onPress: async () => {
                await this._deleteAccount(item.customerAccountId);
              },
              backgroundColor: mainColor
            }
          ]}
          backgroundColor="#fff"
          autoClose={true}
        >
          <View key={item.customerAccountId} style={styles.listItem}>
            {/* <View style={styles.circle} /> */}
            <View style={styles.bankItem}>
              <Text style={styles.firstLine}>{item.customerBankName}</Text>
              <Text style={styles.addition}>{item.customerAccountName}</Text>
              <Text style={styles.secondLine}>
                {item.customerAccountNo
                  ? item.customerAccountNo.substr(0, 4) +
                    ' ' +
                    item.customerAccountNo.substr(4, 4) +
                    ' ' +
                    item.customerAccountNo.substr(8, 4) +
                    ' ' +
                    item.customerAccountNo.substr(12, 4)
                  : null}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                msg.emit('router: goToNext', {
                  routeName: 'UserAccountEdit',
                  add: false,
                  accountId: item.customerAccountId
                });
              }}
            >
              <Image style={styles.icon} source={require('../img/edits.png')} />
            </TouchableOpacity>
            {/* <View style={styles.circle} /> */}
          </View>
        </Swipeout>
      </View>
    );
  };

  _deleteAccount = (accountId) => {
    const { deleteAccount } = this.props.relaxProps;
    Confirm({
      title: '',
      text: '确定删除该银行账户信息吗？',
      okText: '确定',
      cancelText: '取消',
      okFn: async () => {
        await deleteAccount(accountId);
      }
    });
  };
}

const styles = StyleSheet.create({
  bankContent: {
    margin: 12,
    position: 'relative'
  },
  list: {
    marginBottom: 12,
    borderRadius: 6,
    overflow: 'hidden'
  },
  listItem: {
    height: 108,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16
  },
  firstLine: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 16
  },
  secondLine: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 18,
    marginTop: 16,
    lineHeight: 18
  },
  addition: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 12,
    marginTop: 8,
    lineHeight: 12
  },
  tips: {
    color: '#939495',
    fontSize: 12,
    marginLeft: 15
  },
  btn: {
    backgroundColor: '#3d85cc',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: '#fff',
    fontSize: 16
  },
  circle: {
    top: -12.5,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#e0e0e0'
  },
  icon: {
    width: 20,
    height: 20
  },
  bottom: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ebebeb',
    backgroundColor: '#fff',
    paddingTop: 10
  },
  btnbox: {
    position: 'relative',
    padding: 12,
    paddingBottom: 10,
    paddingTop: 10
  },
  buttonBox: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    flexDirection: 'row'
  },
  img: {
    height: 16,
    width: 16,
    marginRight: 8
  },
  add: {
    borderRadius: 18,
    height: 36
  }
});
