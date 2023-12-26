'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default class CountDown extends Component {
  static defaultProps = {
    timeOffset: 0,
    overHandler: () => { },
    timeStyle: {},
    colonStyle: {},
    timeClock: {},
    time: {},
    timeDaysStyle: {},
    hideSeconds: true, //隐藏秒
    parame: {},
    //倒计时结束的处理
    endHandle: () => { }
  };

  state = {
    //默认倒计时时间，正整数，单位：秒
    timeOffset: this.props.timeOffset
  };
  constructor(props) {
    super(props);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.timeOffset != this.props.timeOffset) {
      this.setState({
        timeOffset: nextProps.timeOffset
      });
    }
  }

  componentDidMount() {
    this._doCount();
  }

  render() {
    return (
      <View {...this.props}>{this._timeFormat(this.state.timeOffset)}</View>
    );
  }

  _timeFormat = (timeOffset) => {
    const hour = Math.floor((timeOffset / 60 / 60) % 24);
    const min = Math.floor((timeOffset / 60) % 60);
    const second = timeOffset % 60;
    let trueHour = hour < 10 ? '0' + hour : hour;
    let truemin = min < 10 ? '0' + min : min;
    let trueSec = second < 10 ? '0' + second : second;
    if (trueHour == '00' && truemin == '00' && trueSec == '59') {
      //只显示时分  基础数据会加上59秒
      //清除定时器
      this.props.endHandle(this.props.parame);
    }
    return (
      <Text allowFontScaling={false} style={styles.timeText}>
        {trueHour}时{truemin}分
      </Text>
    );
  };

  /**
   * 计时器倒计时
   */
  _doCount = () => {
    this.timer = setInterval(() => {
      if (this.state.timeOffset <= 1) {
        clearTimeout(this.timer);
        this.props.overHandler();
      }
      this.setState({
        timeOffset: this.state.timeOffset - 1
      });
    }, 1000);
  };
}

const styles = StyleSheet.create({
  timeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 6
  }
});
