import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  PixelRatio
} from 'react-native';

import { noop } from 'wmkit/noop';
import { mainColor } from 'wmkit/styles/index';

export default class RadioHook extends Component {
  static defaultProps = {
    data: [],
    checked: '0',
    onCheck: noop
  };

  render() {
    const { data, checked, onCheck } = this.props;
    return (
      <View style={styles.content}>
        {data.size > 0
          ? data.toJS().map((v, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => onCheck(v.id)}
                  activeOpacity={0.8}
                  style={[
                    styles.nav,
                    i == data.size - 1 ? { borderBottomWidth: 0 } : null
                  ]}
                >
                  <Text style={styles.navText} allowFontScaling={false}>
                    {v.name}
                  </Text>
                  {checked == v.id ? (
                    <Image
                      source={require('./img/right.png')}
                      style={[styles.icon, { tintColor: mainColor }]}
                    />
                  ) : null}
                </TouchableOpacity>
              );
            })
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ebebeb',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    backgroundColor: '#ffffff',
    paddingLeft: 14,
    marginTop: 10
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    height: 50
  },
  navText: {
    color: '#333333',
    fontSize: 14
  },
  icon: {
    width: 21,
    height: 13,
    marginRight: 14
  }
});
