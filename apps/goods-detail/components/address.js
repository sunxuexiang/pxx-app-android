import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

import { Relax, msg } from 'plume2';
import { screenWidth } from '@/wmkit/styles';
import { cache } from 'wmkit/cache';

@Relax
export default class Address extends Component {
  static relaxProps = {
    cityInfo: 'cityInfo',
  };

  render() {
    const { cityInfo } = this.props.relaxProps;
    return (
      <View style={styles.container}>
        <View style={styles.spec}>
          <Text allowFontScaling={false} style={styles.specLabel}>
            送至
          </Text>
          <TouchableOpacity
            style={styles.specTextBox}
            activeOpacity={0.8}
            onPress={()=>{
              this._goToNext();
            }}
          >
            <Text allowFontScaling={false}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                  style={styles.specText}
            >
              {cityInfo !='' ? cityInfo : '请选择'}
            </Text>
            <Image
              source={require('../img/more.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  /**
   * 下一步
   * @private
   */
  _goToNext = () => {
    AsyncStorage.setItem(cache.GOODS_DETAIL,
      JSON.stringify({ comeFrom : 'goodsDetail'})
    );
    msg.emit('router: goToNext', { routeName: 'UserReceiveAddress' });
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 10
  },
  spec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 48,
    paddingHorizontal: 12
  },
  specLabel: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)',
    fontWeight: '500'
  },
  specTextBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    flex: 1
  },
  specText: {
    width: screenWidth - 90,
    fontSize: 14,
    color: 'rgba(0,0,0,0.4)',
  },
  icon: {
    width: 24,
    height: 24
  },
});
