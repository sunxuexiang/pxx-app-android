import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class None extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.img} source={require('../img/list-none.png')} />
        <Text allowFontScaling={false} style={styles.text}>
          暂无发货记录
        </Text>
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
  }
});
