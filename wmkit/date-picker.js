import React, { Component } from 'react';
import {
  DatePickerAndroid,
  DatePickerIOS,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import { msg } from 'plume2';
import { noop } from 'wmkit/noop';

import { mainColor } from 'wmkit/styles/index';

const isAndroid = Platform.OS === 'android';

/**
 * 调用系统原生组件的日期组件
 * 参数：{
 *   date: Date类型，默认展示的时间
 *   minDate: Date类型，可选的最小日期
 *   maxDate: Date类型，可选的最大日期
 *   confirm: 确认按钮的回调方法，回调的参数为选中的日期，Date类型
 * }
 */
export default class DatePicker extends Component {
  state = {
    visible: false,
    date: new Date(), // 默认选中的日期
    minDate: null, // 可选的最小日期，默认不限制
    maxDate: null, // 可选的最大日期，默认不限制
    confirm: noop
  };

  componentDidMount() {
    msg.on('datePicker:show', this._showDatePicker);
  }

  componentWillUnMount() {
    msg.off('datePicker:show', this._showDatePicker);
  }

  render() {
    // ios 日期选择
    if (!isAndroid && this.state.visible) {
      return (
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback
              onPress={() => this.setState({ visible: false })}
            >
              <View style={{ flex: 1 }} />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.box}>
            <View style={styles.buttonContainer}>
              <Text allowFontScaling={false} style={[styles.text, { color: mainColor }]} onPress={this._cancel}>
                取消
              </Text>
              <Text allowFontScaling={false} style={[styles.text, { color: mainColor }]} onPress={this._confirm}>
                确定
              </Text>
            </View>
            <DatePickerIOS
              date={this.state.date}
              minimumDate={this.state.minDate}
              maximumDate={this.state.maxDate}
              mode="date"
              onDateChange={(date) => this.setState({ date: date })}
            />
          </View>
        </View>
      );
    }

    return null;
  }

  /**
   * 接收参数，展示日期选择
   * @param props
   * @private
   */
  _showDatePicker = (props) => {
    let state = { ...props, visible: true };

    this.setState(state, async () => {
      // android 日期选择
      if (isAndroid) {
        try {
          let params = { date: this.state.date };
          if (this.state.minDate) {
            params.minDate = this.state.minDate;
          }
          if (this.state.maxDate) {
            params.maxDate = this.state.maxDate;
          }

          const { action, year, month, day } = await DatePickerAndroid.open(
            params
          );

          if (action !== DatePickerAndroid.dismissedAction) {
            //回调
            this.state.confirm &&
              this.state.confirm(new Date(year, month, day));
          }
        } catch ({ code, message }) {
          if (__DEV__) {
            console.error('Cannot open date picker', code, message);
          }
        }
      }
    });
  };

  // 确定
  _confirm = () => {
    this.setState({ visible: false });
    // 执行回调
    this.state.confirm && this.state.confirm(this.state.date);
  };

  // 取消
  _cancel = () => {
    this.setState({ visible: false });
  };
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  box: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#ffffff'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    margin: 10,
    fontSize: 14
  }
});
