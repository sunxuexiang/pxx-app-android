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
import * as _ from '../../../wmkit/common/util'; // added by scx 

const isAndroid = Platform.OS === 'android';

@Relax
export default class SearchBar extends React.Component {
  static relaxProps = {};

  render() {
    return (
      <View style={styles.box}>
        <View style={styles.searchBar}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => msg.emit('router: back')}
          >
            <Image
              source={require('../img/backing.png')}
              style={styles.leftImg}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableWithoutFeedback
            onPress={() =>
              msg.emit('router: goToNext', {
                routeName: 'StoreSearch',
                storeId: this.props.storeId
              })
            }
          >
            <View style={styles.content}>
              <Image
                source={require('../img/search.png')}
                style={styles.icon}
              />
              <Text style={styles.input} allowFontScaling={false}>
                搜索本店商品
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
        paddingTop: 35
      },
      {
        paddingTop: isAndroid ? 0 : 20
      }
    )
  },
  searchBar: {
    height: 32,
    padding: 12,
    marginTop: 12,
    marginBottom:6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftImg: {
    height: 20,
    marginLeft: 4,
    width: 20,
    marginRight: 6,
    tintColor: '#000'
  },
  icon: {
    width: 16,
    height: 16
  },
  content: {
    paddingHorizontal:16,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: 16
  },
  input: {
    fontSize: 12,
    paddingLeft: 8,
    color: 'rgba(0,0,0,0.4)',
    textAlign: 'left'
  }
});
