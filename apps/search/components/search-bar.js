import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  TouchableOpacity
} from 'react-native';
import { Relax, msg } from 'plume2';
import { noop } from 'wmkit/noop';
import * as _ from '../../../wmkit/common/util'; // added by scx
const isAndroid = Platform.OS === 'android';

@Relax
export default class SearchBar extends React.Component {
  static relaxProps = {
    key: 'key',
    queryString: 'queryString',
    handleQueryString: noop,
    goSearch: noop,
    preKeywords: 'preKeywords'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      key,
      handleQueryString,
      queryString,
      goSearch,
      preKeywords
    } = this.props.relaxProps;
    let placeholder;

    if (key === 'goods'|| key==='distribute' || key === 'special') {
      placeholder = preKeywords ? preKeywords : '搜索商品';
    } else if (key === 'groupon') {
      placeholder = '爱拼才会赢';
    } else {
      placeholder = '搜索商家';
    }
    return (
      <View style={styles.box}>
        <View style={styles.searchBar}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => msg.emit('router: back')}
          >
            <Image
              source={require('../img/arrow.png')}
              style={styles.leftImg}
            />
          </TouchableOpacity>
          <View style={styles.content}>
            <TextInput
              allowFontScaling={false}
              key={key}
              autoFocus={window.keyBoardShow}
              style={styles.input}
              maxLength={100}
              placeholder={placeholder}
              value={queryString}
              onChangeText={(text) => handleQueryString(text || '')}
              onSubmitEditing={goSearch}
              clearButtonMode="while-editing"
              underlineColorAndroid="transparent"
              placeholderTextColor="rgba(0,0,0,.4)"
            />
            <Image source={require('../img/search.png')} style={styles.icon} />
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.btn}
            onPress={goSearch}
          >
            <Text allowFontScaling={false} style={styles.btnText}>
              搜索
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    paddingTop: isAndroid ? 0 : 20
  },
  searchBar: {
    padding: 10,
    ..._.ifIphoneX(
      {
        paddingTop: 20,
        height: 58
      },
      {
        height: 48
      }
    ),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftImg: {
    width: 20,
    height: 20,
    marginRight: 14,
    marginLeft: 4
  },
  icon: {
    width: 16,
    height: 16,
    position: 'absolute',
    left: 16,
    right: 8
  },
  content: {
    height: 28,
    paddingVertical: 5,
    paddingLeft: 40,
    // paddingRight: 8,
    marginRight:16,
    backgroundColor: '#f5f5f5',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden'
  },
  input: {
    height: 32,
    textAlign: 'left',
    fontSize: 12,
    paddingVertical: 0,
    flex: 1,
    color: 'rgba(0,0,0,0.8)',
    overflow: 'hidden'
  },
  btn: {
    marginRight:2
  },
  btnText: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14
  }
});
