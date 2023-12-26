import React from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import { mainColor } from '@/wmkit/styles';

@Relax
export default class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  static relaxProps = {
    key: 'key',
    onTabChange: noop
  };

  render() {
    const { key, onTabChange } = this.props.relaxProps;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={
            key == 0 ? [styles.ViewBox, styles.selectView, { borderBottomColor: mainColor }] : styles.ViewBox
          }
          activeOpacity={0.8}
          onPress={() => onTabChange(0)}
        >
          <Text
            allowFontScaling={false}
            style={key == 0 ? [styles.text, { color: mainColor }] : styles.text}
          >
            全部
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            key == 1 ? [styles.ViewBox, styles.selectView, { borderBottomColor: mainColor }] : styles.ViewBox
          }
          activeOpacity={0.8}
          onPress={() => onTabChange(1)}
        >
          <Text
            allowFontScaling={false}
            style={key == 1 ? [styles.text, { color: mainColor }] : styles.text}
          >
            待审核
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            key == 2 ? [styles.ViewBox, styles.selectView, { borderBottomColor: mainColor }] : styles.ViewBox
          }
          activeOpacity={0.8}
          onPress={() => onTabChange(2)}
        >
          <Text
            allowFontScaling={false}
            style={key == 2 ? [styles.text, { color: mainColor }] : styles.text}
          >
            已打回
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            key == 3 ? [styles.ViewBox, styles.selectView, { borderBottomColor: mainColor }] : styles.ViewBox
          }
          activeOpacity={0.8}
          onPress={() => onTabChange(3)}
        >
          <Text
            allowFontScaling={false}
            style={key == 3 ? [styles.text, { color: mainColor }] : styles.text}
          >
            已完成
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  ViewBox: {
    height: 40,
    paddingHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 12,
    color: '#666'
  },
  selectView: {
    borderBottomWidth: 2 / PixelRatio.get()
  }
});
