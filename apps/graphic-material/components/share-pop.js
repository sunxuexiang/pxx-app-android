import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import { Relax, msg } from 'plume2';
import { noop } from 'wmkit/noop';
import WMImage from 'wmkit/image/index';
import Check from 'wmkit/check';

import * as _ from '../../../wmkit/common/util'; // added by scx
import { screenWidth, screenHeight, isAndroid } from 'wmkit/styles/index';
import RNFS from 'react-native-fs';
import { share } from '@wanmi/react-native-share';

@Relax
export default class SharePop extends React.Component {
  static relaxProps = {
    shareVisible: 'shareVisible',
    changeShare: noop,
    changeMoments: noop,
    currentMatterList: 'currentMatterList',
    changeCheck: noop,
    moments: 'moments',
    currentMatterId: 'currentMatterId',
    updateNum: noop
  };

  render() {
    const {
      shareVisible,
      changeShare,
      changeMoments,
      currentMatterList,
      changeCheck,
      moments
    } = this.props.relaxProps;

    return (
      shareVisible && (
        <View style={styles.panelBottom}>
          <TouchableOpacity
            style={styles.mask}
            activeOpacity={0.8}
            onPress={() => changeShare()}
          />
          <View style={styles.panelBody}>
            {/*弹窗关闭按钮*/}
            <TouchableOpacity
              style={styles.closeBox}
              activeOpacity={0.8}
              onPress={() => changeShare()}
            >
              <Image
                style={styles.close}
                source={require('../img/close.png')}
              />
            </TouchableOpacity>
            <View style={styles.titleBox}>
              <Text style={styles.title} allowFontScaling={false}>
                文案已复制，分享时请粘贴
              </Text>
            </View>
            <View style={styles.content}>
              {currentMatterList.toJS().map((item, index) => {
                return (
                  <View style={styles.imgBox} key={index}>
                    <WMImage
                      //style={styles.img}
                      src={item.img}
                    />
                    <Check
                      style={styles.check}
                      disable={false}
                      checked={item.checked}
                      onCheck={(value) => changeCheck(index, value)}
                    />
                  </View>
                );
              })}
            </View>
            <Text style={styles.shareText} allowFontScaling={false}>
              请选择分享的图片
            </Text>
            {moments ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.bottom}
                onPress={() => {
                  this.shareImageToMoments();
                }}
              >
                <Image
                  source={require('../img/moments.png')}
                  style={{ width: 46, height: 46 }}
                />
                <Text style={styles.text} allowFontScaling={false}>
                  分享至朋友圈
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.bottom}
                onPress={() => this.shareImageToFriends()}
              >
                <Image
                  source={require('../img/wechat.png')}
                  style={{ width: 46, height: 46 }}
                />
                <Text style={styles.text} allowFontScaling={false}>
                  分享给微信好友
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )
    );
  }

  /**
   * 分享到朋友圈(朋友圈不支持多图唤起，所以点击的分享到朋友圈的时候只是将选择的图片下载到本地相册)
   */
  shareImageToMoments = async () => {
    let {
      currentMatterList,
      updateNum,
      currentMatterId,
      changeMoments
    } = this.props.relaxProps;
    if (currentMatterList.filter((v) => v.get('checked') == true).count() > 0) {
      currentMatterList
        .filter((v) => v.get('checked') == true)
        .map((item, index) => {
          this.cacheImage(item.get('img'), index)
            .then(() => {
              return CameraRoll.saveToCameraRoll(
                this._cachePath(index),
                'photo'
              );
            })
            .then(() => {
              changeMoments();
              //msg.emit('app:tip', '保存成功');
            });
        });
      //更新分享次数
      updateNum(currentMatterId);
    } else {
      msg.emit('app:tip', '请选择分享的图片');
    }
  };

  /**
   * 分享到朋友
   */
  shareImageToFriends = () => {
    let { currentMatterList } = this.props.relaxProps;
    if (
      currentMatterList.filter((v) => v.get('checked') == true).count() == 0
    ) {
      msg.emit('app:tip', '请选择分享的图片');
    } else {
      let remoteImages = currentMatterList
        .filter((v) => v.get('checked') == true)
        .map((item) => {
          return item.get('img');
        });
      let options = { remoteImages: remoteImages };
      share(options, this.callBack);
    }
  };

  callBack = (result) => {
    const { updateNum, currentMatterId } = this.props.relaxProps;
    if (result) {
      //更新分享次数
      updateNum(currentMatterId);
      //分享次数更新
      msg.emit('app:tip', '分享成功');
    } else {
      msg.emit('app:tip', '分享失败');
    }
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
    return `${RNFS.CachesDirectoryPath}-${index}-moments-matter.png`;
  };
}

const imgWidth = (screenWidth - 55) / 3;

const styles = StyleSheet.create({
  panelBottom: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    zIndex: 1000
  },
  mask: {
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  panelBody: {
    position: 'absolute',
    bottom: isAndroid ? 24 : 0,
    left: 0,
    width: screenWidth,
    maxHeight: screenHeight * 0.8,
    backgroundColor: '#fff'
  },
  closeBox: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 20,
    zIndex: 100
  },
  close: {
    width: 16,
    height: 16
  },
  titleBox: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    textAlign: 'center'
  },
  title: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center'
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    //justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingBottom: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb'
  },
  imgBox: {
    width: imgWidth,
    height: imgWidth,
    marginBottom: 5,
    marginRight: 8
  },
  check: {
    position: 'absolute',
    right: 5,
    top: 5
  },
  shareText: {
    marginTop: 10,
    fontSize: 13,
    color: '#333',
    textAlign: 'center'
  },
  bottom: {
    width: screenWidth,
    ..._.ifIphoneX(
      {
        height: 90,
        paddingBottom: 30
      },
      {
        height: 75
      }
    ),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 12,
    color: '#333'
  }
});
