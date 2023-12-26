'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { mainColor } from '../styles';

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
    endHandle: () => {},
    //时间文本样式
    timeTextStyle: {},
    //前缀文字
    label: '',
    //前缀文字样式
    labelText: {},
    //是否展示剩余天数
    showTimeDays: false,
    //当前路由名称
    timerName: 'default',
    //拼团秒杀倒计时样式专用
    groupFlag: false,
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

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    return this.state.timeOffset >= 0 ? (
      <View {...this.props}>
        {!!this.props.label && (
          <Text allowFontScaling={false} style={this.props.labelText}>{this.props.label}</Text>
        )}
        {!this.props.groupFlag ? this._timeFormat(this.state.timeOffset) : this._Grouptime(this.state.timeOffset)}
      </View>
    ) : null;
  }

  _Grouptime = (timeOffset) => {
    const day = Math.floor(timeOffset / (24 * 3600));
    const hour = Math.floor((timeOffset / 60 / 60) % 24);
    const min = Math.floor((timeOffset / 60) % 60);
    let trueDay = day < 10 ? '0' + day : day;
    const second = timeOffset % 60;
    let trueHour = hour < 10 ? '0' + hour : hour;
    let truemin = min < 10 ? '0' + min : min;
    let trueSec = second < 10 ? '0' + second : second;
    if (trueDay == '00' && trueHour == '00' && truemin == '00' && trueSec == '59') {
      //只显示时分  基础数据会加上59秒
      //清除定时器
      this.props.endHandle(this.props.parame);
    }

    return (
      <View style={[styles.groupTime,this.props.theme === 'black' && styles.black]}>
        {this.props.showTimeDays && <View style={styles.hour}><Text style={[styles.text, { color: mainColor }]} allowFontScaling={false}>{trueDay}</Text></View>}
        {this.props.showTimeDays && <Text style={styles.symbol} allowFontScaling={false}>天</Text>}
        <View style={styles.hour}><Text style={[styles.text, { color: mainColor }]} allowFontScaling={false}>{trueHour}</Text></View>
        <Text style={styles.unit} allowFontScaling={false}>:</Text>
        <View style={styles.min}><Text style={[styles.text, { color: mainColor }]} allowFontScaling={false}>{truemin}</Text></View>
        <Text style={styles.unit} allowFontScaling={false}>:</Text>
        <View style={styles.secound}><Text style={[styles.text, { color: mainColor }]} allowFontScaling={false}>{trueSec}</Text></View>
      </View>
    );
  };

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
      trueSec == '00'
    ) {
      //执行定时器timerName与当前页面名称一致的倒计时方法
      if (
        this.props.endHandle &&
        this.props.timerName == window.currentRouteName
      ) {
        this.props.endHandle();
      }
    }
    return (
      <Text
        allowFontScaling={false}
        style={
          this.props.timeTextStyle ? this.props.timeTextStyle : styles.timeText
        }
      >
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
    //将定时器统一赋给window全局对象，便于清除
    this.timer = setInterval(() => {
      if (this.state.timeOffset <= 1) {
        clearInterval(this.timer);
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
  },
  groupTime:{
    flexDirection:'row',
    alignItems:'center'
  },
  hour:{
    width:24,
    height:20,
    borderRadius:4,
    backgroundColor:'rgba(255,255,255,0.8)',
    alignItems:'center',
    justifyContent:'center',
  },
  symbol:{
    fontSize:12,
    color:'#fff',
    marginHorizontal:4
  },
  min:{
    width:24,
    height:20,
    borderRadius:4,
    backgroundColor:'rgba(255,255,255,0.8)',
    alignItems:'center',
    justifyContent:'center',

  },
  secound:{
    width:24,
    height:20,
    borderRadius:4,
    backgroundColor:'rgba(255,255,255,0.8)',
    alignItems:'center',
    justifyContent:'center',

  },
  text:{
    fontSize:12
  },
  unit:{
    fontSize:12,
    color:'#fff',
    marginHorizontal:4
  },
});
