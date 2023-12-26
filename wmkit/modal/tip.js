/**
 * tip组件
 * @type {ReactNative|exports|module.exports}
 */
import React, { Component } from 'react';

import { View, Text, Image, StyleSheet } from 'react-native';

import Overlay from './overlay';
const noop = () => {};

export default class Tip extends Component {
  static defaultProps = {
    //是否显示
    visible: false,
    //显示的消息的内容
    text: '',
    //是否模态
    modal: false,
    //消失时间
    time: 2000,
    //tip消失后的callback
    onTipDisappear: noop,
    //提示图标，目前仅支持success和warning，其他需传入icon图片
    icon: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible
    };
  }

  componentDidMount() {
    //如果当前是显示状态
    if (this.state.visible) {
      //默认2s后关闭
      setTimeout(() => {
        this.setState({
          visible: false
        });

        this.props.onTipDisappear();
      }, this.props.time);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      //如果当前的属性为显示状态，则立刻去显示
      this.setState({
        visible: true
      });

      //默认2s后关闭
      setTimeout(() => {
        this.setState({
          visible: false
        });

        this.props.onTipDisappear();
      }, this.props.time);
    }
  }

  render() {
    //如果不现实直接remove掉
    if (!this.state.visible) {
      return null;
    }

    return (
      <Overlay style={this.props.style} modal={this.props.modal}>
        <View style={styles.tip}>
          {this._renderIcon()}
          <Text style={styles.text} allowFontScaling={false} numberOfLines={3}>
            {this.props.text}
          </Text>
        </View>
      </Overlay>
    );
  }

  _renderIcon() {
    if (this.props.icon === 'success') {
      return <Image style={styles.icon} source={require('./img/ok.png')} />;
    } else if (this.props.icon === 'warning') {
      return (
        <Image style={styles.icon} source={require('./img/warning.png')} />
      );
    } else if (this.props.icon) {
      return <Image style={styles.icon} source={this.props.icon} />;
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  tip: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 5
  },
  text: {
    color: '#FFF',
    fontSize: 16
  }
});
