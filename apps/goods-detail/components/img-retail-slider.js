import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Easing } from 'react-native';
import { Relax, msg } from 'plume2';

import Swiper from 'react-native-swiper';
import WMImage from 'wmkit/image/index';
import WMVideo from 'wmkit/video';

import * as _ from '../../../wmkit/common/util'; // added by scx
import { screenWidth, mainColor } from 'wmkit/styles/index';
import * as WMkit from 'wmkit/kit';
import ZoomImage from './ZoomImage';

@Relax
export default class ImgRetailSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //是否手动暂停
      isPaused: false,
      index: 0
    };
  }

  UNSAFE_componentWillMount() {
    //注册事件
    msg.on('goods-detail:closeVideo', this._closeVideo);
  }

  componentWillUnmount() {
    //事件销毁
    msg.off('goods-detail:closeVideo', this._closeVideo);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.relaxProps.goodsInfo.get('goodsInfoId') !=
      nextProps.relaxProps.goodsInfo.get('goodsInfoId')
    ) {
      this.setState({
        index: 0
      });
    }
  }

  static relaxProps = {
    goodsInfo: 'goodsInfo',
    goods: 'goods',
    //是否播放视频
    ifPlay: 'ifPlay',
    //是否显示视频
    showVideo: 'showVideo',
    startPlay: () => {},
    closeVideo: () => {},
    pauseVideo: () => {},
    playVideo: () => {},
    images: 'images'
  };

  render() {
    const {
      goods,
      ifPlay,
      showVideo,
      images,
      goodsInfo
    } = this.props.relaxProps;

    let source2 = [];
    images.map((img,key)=>{

      let i = img.indexOf('aliyuncs') > -1
        ? img+'?x-oss-process=image/format,jpg/interlace,1,image/resize,m_mfit,w_500,h_500' : img;
      let source = {'url':i};
      source2.push(source);
    });

    return (
      <View style={styles.container}>
        {goodsInfo && WMkit.isInvalid(goodsInfo.toJS()) &&(
          <View style={styles.saleWrapper}>
            <View style={styles.saleOutText}>
              <Text style={styles.sellText}>等货中</Text>
            </View>
          </View>
        )}
        {images.isEmpty() ? (
          <View>
            <Image style={styles.img} source={require('../img/none.png')} />
            <TouchableOpacity
              style={goods.get('goodsVideo') ? styles.playBtn : styles.visible}
              onPress={this._doPlay}
              activeOpacity={0.8}
            >
              {goods.get('goodsVideo') ? (
                <Image
                  style={styles.playIcon}
                  source={require('../img/play.png')}
                />
              ) : null}
            </TouchableOpacity>
            {showVideo && (
              <View style={showVideo ? styles.doPlay : styles.videoBox}>
                <WMVideo
                  onPlay={() => this.setState({ isPaused: true })}
                  onPause={() => this.setState({ isPaused: false })}
                  closeVideo={this._closeVideo}
                  paused={!ifPlay && !this.state.isPaused}
                  visible={ifPlay}
                  source={goods.get('goodsVideo')}
                />
              </View>
            )}
          </View>
        ) : (
          <Swiper
            index={this.state.index}
            loop={false}
            showsButtons={false}
            autoplay={false}
            onIndexChanged={(index) => this._changIndex(index)}
            paginationStyle={styles.dot}
            activeDotColor={mainColor}
          >
            {images.toJS().map((img, key) => {
              let i = img.indexOf('aliyuncs') > -1
                ? img+'?x-oss-process=image/format,jpg/interlace,1,image/resize,m_mfit,w_500,h_500' : img;
              return (
                <View key={key}>
                  <ZoomImage
                    source={{uri:i}}
                    source2={source2}
                    showIndex={key}
                    imgStyle={styles.img}
                    style={styles.img}
                    duration={200}
                    enableScaling={false}
                    easingFunc={Easing.ease}
                  />
                  <TouchableOpacity
                    style={key == 0 ? styles.playBtn : styles.visible}
                    onPress={this._doPlay}
                    activeOpacity={0.8}
                  >
                    {goods.get('goodsVideo') ? (
                      <Image
                        style={key == 0 ? styles.playIcon : styles.visible}
                        source={require('../img/play.png')}
                      />
                    ) : null}
                  </TouchableOpacity>
                  {key == 0 &&
                    showVideo && (
                      <View style={showVideo ? styles.doPlay : styles.videoBox}>
                        <WMVideo
                          onPlay={() => this.setState({ isPaused: true })}
                          onPause={() => this.setState({ isPaused: false })}
                          closeVideo={this._closeVideo}
                          paused={!ifPlay && !this.state.isPaused}
                          visible={key == 0 && ifPlay}
                          source={goods.get('goodsVideo')}
                        />
                      </View>
                    )}
                </View>
              );
            })}
          </Swiper>
        )}
      </View>
    );
  }

  //播放视频
  _doPlay = () => {
    this.props.relaxProps.startPlay();
  };

  //关闭视频
  _closeVideo = () => {
    this.props.relaxProps.closeVideo();
  };

  //滑动事件
  _changIndex = (index) => {
    if (index != 0) {
      this.props.relaxProps.pauseVideo();
    } else {
      //滑回来时,如果之前点过视频且没有手动暂停过，则要继续播放
      this.props.relaxProps.playVideo();
    }
  };
}

const styles = StyleSheet.create({
  container: {
    height: screenWidth,
    backgroundColor: '#fff',
    ..._.ifIphoneX(
      {
        marginTop: -8
      },
      {
        marginTop: 0
      }
    )
  },
  img: {
    width: screenWidth,
    height: screenWidth
  },
  dot: {
    bottom: 8
  },
  visible: {
    width: 0,
    height: 0
  },
  videoBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    // backgroundColor: '#000',
    width: 0,
    height: 0
  },
  playBtn: {
    position: 'absolute',
    marginTop: screenWidth / 2 - 35,
    alignSelf: 'center'
  },
  playIcon: {
    width: 70,
    height: 70
  },
  doPlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    // backgroundColor: '#000',
    width: screenWidth,
    height: screenWidth
  },
  saleWrapper: {
    position: 'absolute',
    width: screenWidth,
    height: screenWidth,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 99,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saleOutText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth * 0.3 ,
    height: screenWidth * 0.3 ,
    borderRadius: screenWidth * 0.3 * 0.5,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  sellText: {
    color: 'rgba(0, 0, 0, 0.3)',
    fontSize: 20,
  }
});
