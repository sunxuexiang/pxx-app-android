import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  PixelRatio,
  StatusBar
} from 'react-native';
import { msg } from 'plume2';
import * as _ from '../common/util';
import { isAndroid } from 'wmkit/styles/index';

/**
 * 公共header组件
 */
export default class Header extends Component {
  /**
   * view
   *
   * @returns {XML}
   */
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <StatusBar barStyle={isAndroid ? 'light-content' : 'dark-content'} />
        {this._renderTitle()}
        {this._renderLeft()}
        {this._renderRight()}
      </View>
    );
  }

  /**
   * 渲染左边区域
   *
   * @returns {XML}
   * @private
   */
  _renderLeft() {
    if (this.props.renderLeft) {
      return <View style={styles.leftImg}>{this.props.renderLeft()}</View>;
    } else {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.leftImg]}
          onPress={() => this._handleBack()}
          hitSlop={{left:30,right:30,top:30,bottom:30}}
        >
          {this.props.imgStyle ? (
            <Image
              style={[styles.img, this.props.imgStyle]}
              source={require('./img/backings.png')}
            />
          ) : (
            <Image
              style={[styles.img, this.props.imgStyle]}
              source={require('./img/back.png')}
            />
          )}
        </TouchableOpacity>
      );
    }
  }

  /**
   * 渲染右侧区域
   *
   * @returns {XML}
   * @private
   */
  _renderRight() {
    if (this.props.renderRight) {
      return (
        <View style={styles.rightContainer}>{this.props.renderRight()}</View>
      );
    }
  }

  /**
   * 渲染标题
   *
   * @returns {*}
   * @private
   */
  _renderTitle() {
    if (this.props.renderTitle) {
      return this.props.renderTitle();
    } else {
      return (
        <View style={styles.titleContainer}>
          <Text
            style={[styles.titleText, this.props.titleStyle]}
            allowFontScaling={false}
          >
            {this.props.title}
          </Text>
        </View>
      );
    }
  }

  /**
   * 处理返回
   * 默认pop路由,除非有自定义的处理
   *
   * @private
   */
  _handleBack() {
    if (this.props.onLeftMenuPress) {
      this.props.onLeftMenuPress();
    } else {
      msg.emit('router: back');
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ..._.ifIphoneX(
      {
        paddingTop: 35,
        height: 80
      },
      {
        height: isAndroid ? 50 : 60,
        paddingTop: isAndroid ? 0 : 15
      }
    ),
    backgroundColor: '#fff'
    // borderColor: '#ebebeb',
    // borderWidth: 1 / PixelRatio.get()
  },
  leftImg: {
    height: isAndroid ? 50 : 45,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 4,
    backgroundColor: 'transparent',

    ..._.ifIphoneX(
      {
        top: 35
      },
      {
        top: isAndroid ? 2 : 15
      }
    ),
    paddingLeft: 16,
    paddingRight: 30
  },
  img: {
    width: 20,
    height: 20
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 18,
    fontWeight: '400',
    backgroundColor: 'transparent'
  },
  rightContainer: {
    height: isAndroid ? 50 : 45,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    ..._.ifIphoneX(
      {
        top: 35
      },
      {
        top: isAndroid ? 2 : 15
      }
    )
  }
});
