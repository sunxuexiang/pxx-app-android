import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PixelRatio,
  TextInput
} from 'react-native';
import { Relax } from 'plume2';

@Relax
export default class CouponSearch extends React.Component {
  constructor(props) {
    super(props);
  }
  static relaxProps = {};

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {}}
        style={styles.searchBox}
      >
        <TextInput
          autoFocus={window.keyBoardShow}
          style={styles.input}
          placeholder="请输入优惠码"
          placeholderTextColor="#999"
          underlineColorAndroid="transparent"
          onChangeText={() => {}}
        />
        <View style={styles.searchBtn}>
          <Text allowFontScaling={false} style={styles.searchText}>
            兑换
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  searchBox: {
    padding: 12,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1 / PixelRatio.get(),
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  input: {
    flex: 1,
    borderColor: '#ebebeb',
    borderWidth: 1 / PixelRatio.get(),
    height: 35,
    paddingHorizontal: 10,
    fontSize: 14
  },
  searchBtn: {
    width: 158 / 2,
    height: 35,
    backgroundColor: '#000',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchText: {
    fontSize: 14,
    color: '#fff'
  }
});
