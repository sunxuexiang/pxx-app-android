import React from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
// import { WMkit } from 'wmkit';
import * as WMkit from 'wmkit/kit';
import { msg } from 'plume2';
import { mainColor } from 'styles';
import { Relax } from 'plume2';
import {debounce} from 'lodash';

@Relax
export default class Collec extends React.Component {
  static relaxProps = {
    goodsFollow: 'goodsFollow',
    storeFollow: 'storeFollow'
  };

  render() {
    const { goodsFollow, storeFollow } = this.props.relaxProps;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.8}
          onPress={debounce(() => {
            this._dealNotLogin('UserStore');
          }, 500)}
        >
          <Text allowFontScaling={false} style={[styles.num, { color: mainColor }]}>
            {goodsFollow}
          </Text>
          <Text allowFontScaling={false} style={styles.text}>
            收藏商品
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.8}
          onPress={debounce(() => {
            if (!WMkit.isLoginOrNotOpen()) {
              msg.emit('loginModal:toggleVisible', {
                callBack: () => {
                  msg.emit('router: goToNext', {
                    routeName: 'StoreAttention',
                    whereFrom: 'UserCenter'
                  });
                }
              });
            } else {
              msg.emit('router: goToNext', {
                routeName: 'StoreAttention',
                whereFrom: 'UserCenter'
              });
            }
          }, 500)}
        >
          <Text allowFontScaling={false} style={[styles.num, { color: mainColor }]}>
            {storeFollow}
          </Text>
          <Text allowFontScaling={false} style={styles.text}>
            关注店铺
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  /**
   * 需要登录但未登录时
   * @param url
   * @private
   */
  _dealNotLogin = (url) => {
    if (!WMkit.isLoginOrNotOpen()) {
      msg.emit('loginModal:toggleVisible', {
        callBack: () => {
          msg.emit('router: goToNext', { routeName: url });
        }
      });
    } else {
      msg.emit('router: goToNext', { routeName: url });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    height: 76,
    borderRadius: 6,
    marginBottom: 12
  },
  item: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  num: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
  },
  text: {
    color: '#999',
    fontSize: 12
  }
});
