/**
 * Created by hht on 2017/9/6.
 */
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import wrapUrl from './util/wrap-url';

import Lightbox from 'react-native-lightbox';
import { screenWidth } from 'wmkit/styles/index';

const noneSrc = require('./none.png');

export default class WMImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._transformSrc(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState(this._transformSrc(nextProps));
  }

  render() {
    const { src, style, zoom ,resizeMode} = this.props;

    let params = Object.assign({}, StyleSheet.flatten(style || {}), { src });
    let imageSource;
    if (!src) {
      imageSource = noneSrc;
    } else {
      imageSource = { uri: wrapUrl(params) };
    }
    let minHeight = params.height;
    if (zoom) {
      return (
        <Lightbox
          springConfig={{ tension: 15, friction: 7 }}
          swipeToDismiss={false}
          onOpen={() => this._showBig(imageSource)}
          onClose={() => this._showSmall()}
          underlayColor="white"
          backgroundColor="rgba(0,0,0,0.9)"
          style={{ height: minHeight }}
        >
          <Image
            style={this.state.style}
            resizeMode={resizeMode ? resizeMode:"contain"}
            source={this.state.source}
          />
        </Lightbox>
      );
    }

    return (
      <Image
        style={this.state.style}
        resizeMode={resizeMode ? resizeMode:"contain"}
        source={this.state.source}
      />
    );
  }

  /**
   * 根据传入的props参数,转换获得相应的属性
   * @param props
   * @returns {{source: *, style: *}}
   * @private
   */
  _transformSrc = (props) => {
    const { style, src } = props;
    let params = Object.assign({}, StyleSheet.flatten(style || {}), { src });
    let imageSource;
    if (!src) {
      imageSource = noneSrc;
    } else {
      imageSource = { uri: wrapUrl(params) };
    }
    return {
      source: imageSource,
      style: StyleSheet.flatten(style || { flex: 1 })
    };
  };

  /**
   * 展示大图
   * @private
   */
  _showBig = (source) => {
    const { src, style } = this.props;
    let params = Object.assign({}, StyleSheet.flatten(style || {}), { src });
    if (params.width == screenWidth) return;

    //const { source } = this.state
    if (source.uri && source.uri.indexOf('?x-oss-process=image/resize') > 0) {
      params = Object.assign({}, params, { width: screenWidth });
      this.setState({
        source: { uri: wrapUrl(params) },
        style: { height: params.height, flex: 1 }
      });
    }
  };

  /**
   * 展示小图
   * @private
   */
  _showSmall = () => {
    const { src, style } = this.props;
    let params = Object.assign({}, StyleSheet.flatten(style || {}), { src });
    let imageSource;
    if (!src) {
      imageSource = noneSrc;
    } else {
      imageSource = { uri: wrapUrl(params) };
    }
    this.setState({
      source: imageSource,
      style: StyleSheet.flatten(style || { flex: 1 })
    });
  };
}
