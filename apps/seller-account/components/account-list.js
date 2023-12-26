import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  PixelRatio,
  Image
} from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';

@Relax
export default class AccountList extends React.Component {
  static relaxProps = {
    accountList: 'accountList',
    chooseAccount: noop
  };

  render() {
    let { accountList } = this.props.relaxProps;
    accountList = accountList && accountList.toJS(); //FlatList接受的数据必须是native JavaScript Object

    return accountList ? (
      <FlatList
        data={accountList}
        renderItem={this._renderRow}
        keyExtractor={(item) => item.accountId}
      />
    ) : (
      <View style={styles.container}>
        <Image style={styles.img} source={require('../img/none.png')} />
        <Text allowFontScaling={false} style={styles.text}>
          平台还未配置收款账号~
        </Text>
        <Text allowFontScaling={false} style={styles.tips}>
          提示：您做多可以添加5条银行账户信息
        </Text>
      </View>
    );
  }

  _renderRow = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row' }}
        onPress={() => this.props.relaxProps.chooseAccount(item)}
      >
        <View style={styles.circle} />
        <View style={styles.bankItem}>
          <Text style={styles.firstLine}>{item.bankName}</Text>
          <Text style={styles.secondLine}>{item.accountName}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text style={styles.secondLine}>{item.bankNo}</Text>
          </View>
        </View>
        <View style={styles.circle} />
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  bankItem: {
    flex: 1,
    padding: 10,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    position: 'relative',
    marginBottom: 15,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#ebebeb'
  },
  firstLine: {
    color: '#333',
    fontSize: 17,
    fontWeight: 'bold',
    overflow: 'hidden',
    // lineHeight: 20
  },
  secondLine: {
    width: '60%',
    color: '#333',
    fontSize: 13,
    marginTop: 5,
    lineHeight: 20
  },
  circle: {
    top: -12.5,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#e0e0e0'
  },
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
