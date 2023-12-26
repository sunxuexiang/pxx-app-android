import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { mainColor } from 'wmkit/styles/index';
import Header from 'wmkit/header';
import { msg } from 'plume2';

export default class Error extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header title="页面不见了" />
        <Image style={styles.img} source={require('./img/none.png')} />
        <Text allowFontScaling={false} style={styles.text}>
          啊哦，页面不见了
        </Text>
        <TouchableOpacity style={[styles.btn, { borderColor: mainColor }]}
                          onPress={() => {
                            msg.emit('router: goToNext', {
                              routeName: 'Main'
                            });
                          }}>
          <Text allowFontScaling={false} style={[styles.btnText, { color: mainColor }]}>
            去首页
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    fontSize: 15
  },
  btn: {
    height: 45,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: 30
  },
  btnText: {
    fontSize: 16
  }
});
