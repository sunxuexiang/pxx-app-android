import React from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { Relax, msg } from 'plume2';
import { noop, _ } from 'wmkit';

@Relax
export default class SearchBar extends React.Component {
  static relaxProps = {
    handleQueryString: noop,
    form: 'form',
    key: 'key'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { handleQueryString, form, key } = this.props.relaxProps;
    return (
      <View style={styles.box}>
        <View style={styles.searchBar}>
          <View style={styles.content}>
            <TextInput
              autoFocus={window.keyBoardShow}
              style={styles.input}
              maxLength={100}
              placeholder={'输入商品名称搜索订单'}
              value={form.get('keywords')}
              onChangeText={(text) => handleQueryString(text || '', key)}
              clearButtonMode="while-editing"
              underlineColorAndroid="transparent"
              placeholderTextColor="#939495"
            />
            <Image source={require('../img/search.png')} style={styles.icon} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    marginBottom: 1
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  icon: {
    width: 18,
    height: 18,
    position: 'absolute',
    left: 10,
    top: 5
  },
  content: {
    height: 28,
    paddingVertical: 5,
    paddingLeft: 35,
    paddingRight: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden'
  },
  input: {
    height: 18,
    textAlign: 'left',
    fontSize: 14,
    paddingVertical: 0,
    flex: 1,
    overflow: 'hidden'
  },
  btn: {
    marginLeft: 8
  },
  btnText: {
    color: '#000',
    fontSize: 14
  }
});
