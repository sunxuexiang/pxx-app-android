import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Clipboard
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import RNFS from 'react-native-fs';
import { msg } from 'plume2';
import moment from 'moment';

import { Const } from 'wmkit/const';
import WMImage from 'wmkit/image/index';

import { isAndroid, mainColor, screenWidth } from 'wmkit/styles/index';

const imgWidth = (screenWidth - 55) / 3;
export default class MatterItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: this.props.matterItem.id,
      textHeight: 0
    };
  }

  componentDidMount() {
    const { key } = this.state;
    setTimeout(() => {
      this.refs[key] &&
        this.refs[key].measure((x, y, width, height, pageX, pageY) => {
          this.setState({
            textHeight: height
          });
        });
    }, 1000);
  }

  render() {
    const { matterItem, visible, onSpread } = this.props;
    return (
      <View style={styles.rowItem}>
        <View style={styles.content}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Image
              style={styles.avatar}
              resizeMode="contain"
              source={{
                uri:
                  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2656778362,978133463&fm=27&gp=0.jpg'
              }}
            />
            <View>
              <Text style={styles.darkText} allowFontScaling={false}>
                官方精选
              </Text>
              <View style={styles.rowText} allowFontScaling={false}>
                <Text style={styles.greyText} allowFontScaling={false}>
                  {moment(matterItem.updateTime).format(Const.DATE_FORMAT)}
                </Text>
                <Text style={styles.greyText} allowFontScaling={false}>
                  {matterItem.recommendNum}
                  次分享
                </Text>
              </View>
            </View>
          </View>
          <Text
            ref={this.state.key}
            style={styles.darkText}
            allowFontScaling={false}
            numberOfLines={this.state.textHeight > 105 && !visible ? 5 : 99}
          >
            {matterItem.recommend}
          </Text>
          <TouchableOpacity
            style={styles.allBox}
            onPress={() => onSpread()}
            activeOpacity={0.8}
          >
            <Text style={[styles.allText, { color: mainColor }]} allowFontScaling={false}>
              {this.state.textHeight > 105
                ? this.props.visible
                  ? '收起'
                  : '全文'
                : null}
            </Text>
          </TouchableOpacity>
          <View style={styles.imgList}>
            {matterItem.matter.split(',').map((v, index) => {
              return (
                <TouchableOpacity
                  style={{ marginBottom: 5 }}
                  key={Math.random()}
                  activeOpacity={0.8}
                  onPress={() => {
                    this.props.saveImageIndex(matterItem.matter, index);
                  }}
                >
                  <WMImage style={styles.img} src={v} />
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.download}>
            <TouchableOpacity
              style={styles.rowFlex}
              activeOpacity={0.8}
              onPress={() => {
                //先复制文案
                Clipboard.setString(matterItem.recommend);
                this.saveImage(matterItem.matter);
                //更新分享次数
                this.props.updateNum(matterItem.id);
              }}
            >
              <Image
                style={styles.downImg}
                source={require('../img/download.png')}
              />
              <Text style={styles.downText} allowFontScaling={false}>
                &nbsp;保存图片
              </Text>
            </TouchableOpacity>
            <View style={styles.rowFlex}>
              <Text style={styles.shareText} allowFontScaling={false}>
                分享到:&nbsp;&nbsp;
              </Text>
              <TouchableOpacity
                style={[styles.shareBox, styles.shareBox1]}
                activeOpacity={0.8}
                onPress={() => {
                  //先复制文案
                  Clipboard.setString(matterItem.recommend);
                  this.props.changeShare();
                  this.props.moments();
                }}
              >
                <Image
                  style={styles.shareImg}
                  source={require('../img/moments.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.shareBox}
                activeOpacity={0.8}
                onPress={() => {
                  //先复制文案
                  Clipboard.setString(matterItem.recommend);
                  this.props.changeShare();
                }}
              >
                <Image
                  style={styles.shareImg}
                  source={require('../img/wechat.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  /**
   * 保存到相册(全部保存)
   */
  saveImage = (matter) => {
    const matterList = matter.split(',');
    matterList.map((v, index) => {
      this.cacheImage(v, index)
        .then(() => {
          return CameraRoll.saveToCameraRoll(this._cachePath(index), 'photo');
        })
        .then(() => {
          msg.emit('app:tip', '文案已复制，图片已保存');
        });
    });
  };

  /**
   * 缓存图片
   */
  cacheImage = (v, index) => {
    const res = RNFS.downloadFile({
      fromUrl: v,
      toFile: this._cachePath(index),
      background: true
    });
    return res.promise;
  };

  /**
   * 统一生成临时文件地址
   * @param index
   * @returns {string}
   * @private
   */
  _cachePath = (index) => {
    return `${RNFS.CachesDirectoryPath}-${index}-matter.png`;
  };
}

const styles = StyleSheet.create({
  rowItem: {
    flexDirection: 'row',
    paddingTop: 12
  },
  content: {
    flex: 1,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 15,
    paddingRight: 15
  },
  imgList: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  img: {
    marginRight: 8,
    width: imgWidth,
    height: imgWidth
  },
  darkText: {
    marginTop: 5,
    fontSize: 14,
    color: '#000',
    lineHeight: 20
  },
  allBox: {
    padding: 10,
    paddingLeft: 0
  },
  allText: {
    fontSize: 13
  },
  rowText: {
    width: screenWidth - 75,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  greyText: {
    color: 'rgba(0,0,0,.4)',
    fontSize: 12,
    marginVertical: 3
  },
  download: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  downImg: {
    width: 20,
    height: 20
  },
  downText: {
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 12
  },
  shareBox: {
    padding: 5
  },
  shareBox1: {
    marginRight: 10
  },
  shareText: {
    fontSize: 13,
    color: '#000'
  },
  shareImg: {
    width: 23,
    height: 23
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8
  }
});
