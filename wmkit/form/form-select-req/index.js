import React from 'react';
import { Image, PixelRatio, StyleSheet, Text, View } from 'react-native';

/**
 * 不带可点击按钮的FormSelect样式
 */
export default class FormSelectReq extends React.Component {
  static defaultProps = {
    iconVisible: true
  };

  render() {
    const { label, selected, placeholder, iconVisible, itemStyle, labelStyle, textStyle } = this.props;

    return (
      <View style={[styles.item, itemStyle]}>
        <Text style={{color:'red'}} allowFontScaling={false}>
          *
        </Text>
        <Text style={[styles.text, labelStyle]} allowFontScaling={false}>
          {label}
        </Text>
        <View style={styles.right}>
          <Text style={[styles.textRight, textStyle]} allowFontScaling={false}>
            {selected && selected.value ? selected.value : placeholder}
          </Text>
          {iconVisible ? (
            <Image source={require('./img/arrow.png')} style={styles.img} />
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 15,
    backgroundColor: '#ffffff'
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  textRight: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)',
    flex: 1,
    textAlign: 'right'
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
