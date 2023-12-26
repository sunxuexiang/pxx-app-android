import React, { Component } from 'react';
import { PixelRatio, StyleSheet, Text, View } from 'react-native';

import { screenWidth } from 'wmkit/styles/index';

/**
 * form中普通展示项
 */
export default class FormItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { labelName, placeholder, textStyle, itemStyle, labelStyle
     } = this.props;
    return (
      <View style={[styles.form_item, itemStyle]}>
        <Text allowFontScaling={false} style={[styles.form_text, labelStyle]}>{labelName}</Text>
        <View style={[styles.form_context]}>
          {typeof placeholder === 'string' ? (
            <Text
              textAlignVertica="top"
              allowFontScaling={false}
              style={[styles.select_text, { ...textStyle }]}
            >
              {placeholder}
            </Text>
          ) : (
            <View style={styles.rightCon}>{placeholder}</View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form_item: {
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderStyle: 'solid',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  form_text: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14
  },
  form_context: {
    marginLeft: 20,
    flex: 1
  },
  select_text: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.4)',
    textAlign: 'right',
    width: screenWidth * 0.6,
    alignSelf: 'flex-end'
  },
  rightCon: {
    alignItems: 'flex-end'
  }
});
