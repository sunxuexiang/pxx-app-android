import React, { Component } from 'react'
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,FlatList,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import WMVideo from 'wmkit/video';
import { screenHeight,screenWidth,mainColor,isAndroid } from 'wmkit/styles/index';
import { msg, Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import * as share from 'wmkit/share';
import {debounce} from 'lodash'
import * as WMkit from 'wmkit/kit';
import * as _ from 'wmkit/common/util';

const STATUSBAR_HEIGHT=88+27+60;

@Relax
export default class VideoShow extends Component {


  constructor(props){
    super(props)
    this.state={
      isPause:false, //控制播放器是否播放，下面的代码有解释一个列表只需要一个state控制，而不用数组
      current:0,//表示当前item的索引，通过这个实现一个state控制全部的播放器
      _isPause:false
    }
    this.renderItem = this.renderItem.bind(this)
    this._onViewableItemsChanged = this._onViewableItemsChanged.bind(this)
    this._pageNum = 0;
  }

  static relaxProps = {
    videoPage: 'videoPage',
    addVideoLike: noop,
    cancelVideoLike: noop,
    getVideoById: noop,
    refreshPage: noop,
    init: noop,
    loading: 'loading',
    h5Url: 'h5Url',
  };

  _onViewableItemsChanged({viewableItems, changed}) {
    //这个方法为了让state对应当前呈现在页面上的item的播放器的state
    //也就是只会有一个播放器播放，而不会每个item都播放
    //可以理解为，只要不是当前再页面上的item 它的状态就应该暂停
    //只有100%呈现再页面上的item（只会有一个）它的播放器是播放状态
        if(viewableItems.length === 1){
            this.setState({
                current:viewableItems[0].index,
            })
          const {getVideoById} = this.props.relaxProps;
          const videoId = viewableItems[0].item.videoId
          getVideoById(videoId)
        }
  }

  UNSAFE_componentWillMount() {
    //注册事件
    msg.on('video:closeVideo', this._closeVideo);
  }

  componentWillUnmount() {
    //事件销毁
    msg.off('video:closeVideo', this._closeVideo);
  }


  render() {
    const VIEWABILITY_CONFIG = {
      viewAreaCoveragePercentThreshold: 80,//item滑动80%部分才会到下一个
    };

    const {videoPage,loading} = this.props.relaxProps;
    if (loading || this.state._isPause) {
      return <View style={{backgroundColor:'#000',height:screenHeight}}></View>
    }

    if(videoPage.size == 0){
      return <View style={styles.noDataBox}>
        <View style={styles.noDataInner}>
          <Image style={styles.noDataImg} source={require('../images/blackNodata.png')}/>
          <Text style={styles.noDataText}>暂时没有视频哦</Text>
        </View>
      </View>
    }

    return (
      <View style={{height:screenHeight}}>
          <FlatList
              data={videoPage.toJS()}
              renderItem={this.renderItem}
              horizontal={false}
              pagingEnabled={true}
            //   getItemLayout={(data, index) => {
            //       return {length: screenHeight, offset: (screenHeight) * index, index}
            //   }}
              keyExtractor={(item, index) => index.toString()}
            //   viewabilityConfig={VIEWABILITY_CONFIG}
              showsVerticalScrollIndicator={false}
              onViewableItemsChanged={this._onViewableItemsChanged}
              onEndReachedThreshold={0.05}
              onEndReached={this._handlePagination}
          />
      </View>
    )
  }

  renderItem({item,index}){
    const styleBottom = _.isIphoneX() ? 45 : isAndroid ? 75 : 55;
    const styleTop = _.isIphoneX() ? 20 : 60;
    const bottomDistance = _.isIphoneX() ? 65 : isAndroid ? 140 : 110;

    return(
        <View style={{width:screenWidth,height:screenHeight}}> 
            <TouchableWithoutFeedback style={{flex:1}} onPress={()=>{
                this.setState({
                    isPause:!this.state.isPause,
                })
            }}>
                <WMVideo
                    videoStyle={{backgroundColor:'#000',marginTop:styleTop,height:screenHeight - bottomDistance}}
                  disableCloseVideo={true}
                  paused={index===this.state.current?this.state.isPause:true}
                  repeat={true}
                  visible={true}
                  showOnStart={false}
                  pauseMarginTopStyle={-80}
                  source={item.artworkUrl}
                  controlStyle={{paddingBottom:80}}
                />
            </TouchableWithoutFeedback>
            {/*信息*/}
            <View column style={styles.toolsInfo}>
              <View style={{flexDirection:'row'}}>
                <Image source={require('../images/play.png')} resizeMode={'contain'} style={styles.playFewIcon}/>
                  <Text style={styles.followTip}>{this._playFewCalc(item.playFew)}次播放</Text>
                </View>
              <Text style={styles.followTittle} numberOfLines={2}>{item.videoName}</Text>
            </View>
            {/*右侧（点赞，转发）*/}
            <View column style={styles.tools}>
                <TouchableOpacity column center onPress={debounce(()=>this._cancelOradd(item.likeIt == 1,item.videoId), 500)}>
                    <Image source={item.likeIt == 1?require('../images/likeHeart.png'):require('../images/heart.png')} resizeMode={'contain'}  style={styles.bottomRightImage}/>
                    <Text style={{color:'#FFFFFF99',textAlign:'center',width:30,fontSize:12}}>{this._playFewCalc(item.videoLikeNum)}</Text>
                </TouchableOpacity>
                <TouchableOpacity column center style={styles.bottomRightBn} onPress={()=>this.shareToFriends(item.videoId)}>
                    <Image source={require('../images/share.png')} resizeMode={'contain'} style={styles.bottomRightImage}/>
                </TouchableOpacity>
            </View>
        </View>
      )
    }

    _closeVideo=()=>{
      this.setState({_isPause:true})
    }

  /**
   * 分享到朋友
   */
  shareToFriends = (videoId) => {
    if (!WMkit.isLoginOrNotOpen()) {
      msg.emit('loginModal:toggleVisible', {
        callBack: () => {
          const {init} = this.props.relaxProps;
          init()
        }
      });
    }else{
      const { h5Url} = this.props.relaxProps;
      share.shareToFriends({
        url: `${h5Url}/pages/package-D/video-play/index?videoId=${videoId}`,
        title: '我在超级大白鲸厂家直卖平台找到了靠谱的货源',
        description: '特别低价的平台分享给你，让生活变得更简单哦～',
        imgUrl: 'https://m.cjdbj.cn/static/images/beluga.jpg'
      });
    }
  };

    _handlePagination = async () => {
      const {refreshPage} = this.props.relaxProps;
      refreshPage(++this._pageNum)
    }

    _cancelOradd=(isLike,videoId)=>{
        if (!WMkit.isLoginOrNotOpen()) {
          msg.emit('loginModal:toggleVisible', {
            callBack: () => {
              const {init} = this.props.relaxProps;
              init()
            }
          });
        } else {
          const {addVideoLike,cancelVideoLike} = this.props.relaxProps;
          if (isLike) {
              cancelVideoLike(videoId)
          }else{
              addVideoLike(videoId)
          }
        }
        
    }

    _playFewCalc=(num)=>{
        // if (!num) return null
        if (num < 1000) {
            return num
        }else if(num >= 1000 && num < 10000){
            return (num/1000).toFixed(1) + 'k'
        }else if(num >= 10000){
            return (num/10000).toFixed(1) + 'w'
        }
    }

}

const styles = StyleSheet.create({
    noDataBox:{
      width:screenWidth,
      height:screenHeight,
      backgroundColor:'#000'
    },
    noDataInner:{
      position:'absolute',
      right:0,
      left:0,
      top:0,
      bottom:0,
      justifyContent:'center',
      alignItems: 'center',
    },
    noDataText:{
      color:'#FFFFFFCC'
    },
    toolsInfo:{
        position:'absolute',
        bottom:150,
        left:0,
        paddingLeft:10
    },
    followTip:{
        color:'#FFFFFF99',
        // marginBottom:10
    },
    followTittle:{
        color:'#fff',
        paddingTop:10
    },
    tools:{
        position:'absolute',
        bottom:200,
        right:0,
    },
    bottomRightBn:{
        width:40,
        height:40,
        marginTop:10,
    },
    bottomRightImage:{
        width:30,
        height:30,
    },
    bottomRightText:{
        fontSize:14,
        color:'#fff',
        marginTop:5,
    },
    playFewIcon:{
      width:15,
      height:15,
      marginRight:5,
      marginTop:1
    }
})