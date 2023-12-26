import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
/**
 * 公共等级标签组件
 */
export default class LevelTag extends Component {
  state = {
    text: this.props.text,
    style: this.props.style
  };

  render() {
    const { text, style } = this.props;
    return (
      <View style={[styles.levelBox, style]}>
        <Image
          style={styles.borderLeft}
          source={require('./img/borderLeft.png')}
        />
        <View style={styles.vip}>
          <Text style={styles.vipText} allowFontScaling={false}>
            {text}
          </Text>
        </View>
        <Image
          style={styles.borderRight}
          source={require('./img/borderLeft.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  levelBox: {
    flexDirection: 'row',
    marginRight: 5
  },
  vip: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    paddingHorizontal: 4,
    borderColor: '#000',
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  vipText: {
    fontSize: 11,
    color: '#000'
  },
  borderLeft: {
    width: 7.5,
    height: 20,
    transform: [{ rotate: '180deg' }]
  },
  borderRight: {
    width: 7.5,
    height: 20
  }
});
