import React from 'react';
import {StyleSheet, View, Keyboard} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { msg } from 'plume2';
import { WebView } from 'react-native-webview';
import * as webapi from './webapi';
import { cache } from 'wmkit/cache';
import { config } from 'wmkit/config';
import Header from 'wmkit/header';
import * as _ from 'wmkit/common/util';

export default class SobotLink extends React.Component {
  constructor(props) {
    super(props);
    this.keyboardDidShowListener = null;
    this.keyboardDidHideListener = null;
    this.state = {
      KeyboardShown: false,
      url: '',
      isLink: true,
    };
  }

  UNSAFE_componentWillMount() {
    //监听键盘弹出事件
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShowHandler.bind(this),
    );
    //监听键盘隐藏事件
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHideHandler.bind(this),
    );
  }

  componentDidMount(){
    let customerName = '',customerPhone = '';
    AsyncStorage.getItem(cache.LOGIN_DATA).then((res) => {
      if (res) {
        customerName = JSON.parse(res).customerDetail.customerName;
        customerPhone = JSON.parse(res).customerDetail.contactPhone;
      }
    });
    webapi.sobotDetail().then(res=>{
      if (res.code === config.SUCCESS_CODE) {
        if (res.context.status == 1) {
          if (res.context.effectiveApp == 1) {
            this.setState({url: `https://${res.context.h5Url}&uname=${customerName}&tel=${customerPhone}`, isLink: true});
          } else {
            this.setState({isLink: false});
            msg.emit('app:tip', '客户系统已关闭');
          }
        } else {
          this.setState({isLink: false});
          msg.emit('app:tip', '客户系统已关闭');
        }
      }
    })
  }

  componentWillUnmount() {
    //卸载键盘弹出事件监听
    if (this.keyboardDidShowListener != null) {
      this.keyboardDidShowListener.remove();
    }
    //卸载键盘隐藏事件监听
    if (this.keyboardDidHideListener != null) {
      this.keyboardDidHideListener.remove();
    }
  }
  //键盘弹出事件响应
  keyboardDidShowHandler() {
    this.setState({ KeyboardShown: true });
  }

  //键盘隐藏事件响应
  keyboardDidHideHandler() {
    this.setState({ KeyboardShown: false });
  }

  render() {
    const state = this.props.route;
    const { otherLink, url, hasBottom } = (state && state.params) || {};

    return (
      <View style={[styles.box, this.state.KeyboardShown && styles.contentKeyboard]}>
        {hasBottom && <Header title="客服" />}
        {
          this.state.isLink &&
          <WebView
            style={{marginTop:30}}
            scrollEnabled={false}
            javaScriptEnabled={true}
            // injectedJavaScript={'插入到h5页面中的js代码'}
            // onMessage={event => {'接收h5页面传过来的消息'}}
            source={{uri: otherLink ? url : this.state.url}}
          ></WebView>
        }
      </View>

    )
  }
}
const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor:'#fff'
  },
  contentKeyboard: {
    ..._.ifIphoneX(
      {
        marginBottom: 410,
      },
      {
        marginBottom: 330,
      },
    ),
  }
})
