import React from 'react';
import { Image, PixelRatio, StyleSheet, Text, View } from 'react-native';
import { priceColor } from 'wmkit/styles';

/**
 * 不带可点击按钮的FormSelect样式
 */
export default class FormSelectBase extends React.Component {
  static defaultProps = {
    iconVisible: true
  };

  render() {
    const {
      label,
      selected,
      placeholder,
      iconVisible,
      itemStyle,
      textStyle,
      required,
      labelStyle
    } = this.props;

    return (
      <View style={styles.container}>
        {required && (
          <Text
            allowFontScaling={false}
            style={{
              color: required ? priceColor : 'transparent',
              marginRight: 2
            }}
          >
            *
          </Text>
        )}
        <View style={[styles.item, itemStyle]}>
          <Text style={[styles.text, labelStyle]} allowFontScaling={false}>
            {label}
          </Text>
          <View style={styles.right}>
            <Text
              style={selected && selected.value ? [styles.selected, textStyle] : [styles.textRight, textStyle]}
              allowFontScaling={false}
            >
              {selected && selected.value ? selected.value : placeholder}
            </Text>
            {iconVisible ? (
              <Image source={require('./img/arrow.png')} style={styles.img} />
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  item: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#ffffff'
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  textRight: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.4)',
    flex: 1,
    textAlign: 'right',
    marginLeft: 12
  },
  selected: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)',
    flex: 1,
    textAlign: 'right',
    marginLeft: 12
  },
  img: {
    width: 12,
    height: 12
  },
  text: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)'
  }
});
