'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class CountDown extends Component {
  static defaultProps = {
    timeOffset: 0,
    overHandler: () => {},
    timeStyle: {},
    colonStyle: {},
    timeClock: {},
    time: {},
    timeDaysStyle: {},
    hideSeconds: true, //隐藏秒
    parame: {},
    //倒计时结束的处理
    endHandle: () => {}
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
    const day = Math.floor(timeOffset / (24 * 3600));
    const hour = Math.floor((timeOffset / 60 / 60) % 24);
    const min = Math.floor((timeOffset / 60) % 60);
    const second = timeOffset % 60;
    let trueDay = day < 10 ? '0' + day : day;
    let trueHour = hour < 10 ? '0' + hour : hour;
    let truemin = min < 10 ? '0' + min : min;
    let trueSec = second < 10 ? '0' + second : second;
    if (
      trueDay == '00' &&
      trueHour == '00' &&
      truemin == '00' &&
      trueSec == '59'
    ) {
      //只显示时分  基础数据会加上59秒
      //清除定时器
      if (
        this.props.endHandle &&
        this.props.timerName == window.currentRouteName
      )
        this.props.endHandle(this.props.parame);
    }
    return (
      <Text allowFontScaling={false} style={styles.timeText}>
        {this.props.showTimeDays && trueDay != '00'
          ? `${trueDay}天 ${trueHour}:${truemin}:${trueSec}`
          : `${trueHour}:${truemin}:${trueSec}`}
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
    color: '#ff8400',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 6
  }
});
