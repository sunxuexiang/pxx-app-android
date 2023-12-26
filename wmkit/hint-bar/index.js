import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const DefaultIconImg = require('./img/jinggao.png');

/**
 * 公共提示组件
 */
export default class HintBar extends Component {
  /**
   * view
   *
   * @returns {XML}
   */
  render() {
    let { iconImg, text, style, iconImgStyle, textStyle } = this.props;
    return (
      <View style={[styles.container, style]}>
        <Image
          style={[styles.icon, iconImgStyle]}
          source={iconImg ? iconImg : DefaultIconImg}
        />
        <View style={styles.textBox}>
          <Text style={[styles.text, textStyle]} allowFontScaling={false}>
            {text || ''}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fafafa'
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 13
  },
  textBox: {
    flex: 1
  },
  text: {
    color: '#333',
    fontSize: 12,
    lineHeight: 18
  }
});
