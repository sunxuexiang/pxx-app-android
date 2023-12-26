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

@Relax
export default class Tabs extends React.Component {
  static relaxProps = {
    tabType: 'tabType',
    onTabChange: noop
  };

  render() {
    const { tabType, onTabChange } = this.props.relaxProps;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={
            tabType == '0'
              ? [styles.ViewBox, styles.selectView]
              : styles.ViewBox
          }
          activeOpacity={0.8}
          onPress={() => onTabChange('0')}
        >
          <Text
            style={
              tabType == '0' ? [styles.text, styles.selectText] : styles.text
            }
            allowFontScaling={false}
          >
            全部
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            tabType == '1'
              ? [styles.ViewBox, styles.selectView]
              : styles.ViewBox
          }
          activeOpacity={0.8}
          onPress={() => onTabChange('1')}
        >
          <Text
            style={
              tabType == '1' ? [styles.text, styles.selectText] : styles.text
            }
            allowFontScaling={false}
          >
            收入
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            tabType == '2'
              ? [styles.ViewBox, styles.selectView]
              : styles.ViewBox
          }
          activeOpacity={0.8}
          onPress={() => onTabChange('2')}
        >
          <Text
            style={
              tabType == '2' ? [styles.text, styles.selectText] : styles.text
            }
            allowFontScaling={false}
          >
            支出
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
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb'
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
    borderBottomWidth: 2 / PixelRatio.get(),
    borderBottomColor: '#FF1F4E'
  },
  selectText: {
    color: '#FF1F4E'
  }
});
