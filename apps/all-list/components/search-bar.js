import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { msg, Relax } from 'plume2';
import { screenWidth } from 'wmkit/styles/index';
import * as _ from '../../../wmkit/common/util'; // added by scx 
const isAndroid = Platform.OS === 'android';

@Relax
export default class SearchBar extends React.Component {
  static relaxProps = {preKeywords:'preKeywords'};

  render() {
    let { preKeywords } = this.props.relaxProps;
    return (
      <View style={styles.box}>
        <View style={styles.searchBar}>
          {/* <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => msg.emit('router: back')}
          >
            <Image
              source={require('../img/arrow-left.png')}
              style={styles.leftImg}
            />
          </TouchableOpacity> */}
          <TouchableWithoutFeedback
            onPress={() =>
              msg.emit('router: goToNext', {
                routeName: 'Search'
              })
            }
          >
            <View style={styles.content}>
              <Image
                source={require('../img/search.png')}
                style={styles.icon}
              />
              <Text style={styles.input} allowFontScaling={false}>
                {preKeywords?preKeywords:'搜索商品'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    ..._.ifIphoneX(
      {
        paddingTop: 30
      },
      { paddingTop: isAndroid ? 0 : 20 }
    )
  },
  searchBar: {
    height: 48,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftImg: {
    height: 19,
    width: 11,
    marginRight: 20,
    tintColor: '#000'
  },
  icon: {
    width: 18,
    height: 18,
  },
  content: {
    height: 28,
    paddingRight: 8,
    paddingLeft: 5,
    paddingVertical: 5,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: 15
  },
  input: {
    fontSize: 12,
    paddingLeft: 6,
    color: '#939495',
    textAlign: 'left',
    width: screenWidth - 110
  },
  btn: {
    marginLeft: 8
  },
  btnText: {
    color: '#000',
    fontSize: 14
  }
});
