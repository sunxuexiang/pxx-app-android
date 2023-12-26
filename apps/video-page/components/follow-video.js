import React, { Component } from 'react'
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,ScrollView,
  Image,
} from 'react-native';
import { msg, Relax } from 'plume2';
import { noop } from 'lodash';
import * as _ from 'wmkit/common/util';
import { isAndroid } from 'wmkit/styles/index';
import { screenHeight,screenWidth,mainColor } from 'wmkit/styles/index';
import WmListView from 'wmkit/list-view/index';
import WMVideo from 'wmkit/video';
import * as share from 'wmkit/share';
import WMEmpty from 'wmkit/empty';
import {debounce} from 'lodash'
import * as WMkit from 'wmkit/kit';
import LinearGradient from 'react-native-linear-gradient';

@Relax
export default class FollowVideo extends Component {
  constructor(props) {
    super(props)
    this.state={
      showVideo:false,
      ifPlay:false,
      isPaused:false,
      artworkUrl:null,
      videoLikeNum:0,
      playFew:0,
      videoId:'',
      likeIt:0,
      videoName:''
    }
  }
  
  static relaxProps = {
    h5Url: 'h5Url',
    customerId: 'customerId',
    initVideoList: noop,
    addVideoLike: noop,
    cancelVideoLike: noop,
    getVideoById: noop,
    init: noop,
  };

  componentDidMount(){
    if (!WMkit.isLoginOrNotOpen()) {
      msg.emit('loginModal:toggleVisible', {
        callBack: () => {
          const {init} = this.props.relaxProps;
          init()
        }
      });
    }
  }

  render() {
    const {showVideo,ifPlay,isPaused,} = this.state;
    const {customerId,initVideoList} = this.props.relaxProps;

    return (
      <>
      <WmListView
        url="/videomanagement/getLikeVideo"
        style={{ flex: 1,backgroundColor:'#fff' }}
        isPagination={true}
        numColumns={3}
        params={{
          customerId:customerId
        }}
        pageSize={12}
        renderRow={(item, extraData) => {
          return (
            <TouchableOpacity
              style={styles.followPicBox}
              onPress={()=>{this._doPlay(item)}}
              activeOpacity={0.8}
            >
              {
                item.artworkUrl ? 
                <Image
                  style={styles.followPic}
                  source={{
                    uri: `${item.artworkUrl}?x-oss-process=video/snapshot,t_0,f_jpg,w_800,h_600,m_fast`
                  }}
                /> : 
                <Image style={styles.followPic} source={require('../images/none.png')} />
              }
              <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.78)', 'rgba(0,0,0,1)']}
                style={styles.bottom}
                locations={[0,0.5,1.0]}
              >
                <View style={styles.followIcon}>
                  <Image
                    style={[styles.img, { tintColor: '#FFFFFFCC' }]}
                    source={require('../images/brokenheart.png')}
                  />
                  <Text style={styles.followTxt}>{this._playFewCalc(item.videoLikeNum)}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          );
        }}
        // extraData={extraData}
        // onDataReached={(res) => initVideoList(res)}
        // keyProps="goodsInfoId"
        noMoreStyle={{backgroundColor:'transparent'}}
        forceRefresh={!this.state.showVideo}
        renderEmpty= {() => (
          <View style={styles.noDataInner}>
            <Image style={styles.noDataImg} source={require('../images/whiteNodata.png')}/>
            <Text style={styles.noDataText}>暂时没有视频哦</Text>
          </View>
        )}
      />
      {
        showVideo && (
          <View style={showVideo ? styles.doPlay : styles.videoBox}>
            <WMVideo
              videoStyle={{height:screenHeight}}
              onPlay={() => this.setState({ isPaused: true })}
              onPause={() => this.setState({ isPaused: false })}
              closeVideo={this._closeVideo}
              paused={!showVideo && !this.state.isPaused}
              visible={showVideo}
              source={this.state.artworkUrl}
              closeIcon={styles.closeIcon}
              repeat={true}
              showOnStart={false}
            />
            {/*信息*/}
            <View column style={styles.toolsInfo}>
              <View style={{flexDirection:'row'}}>
                <Image source={require('../images/play.png')} resizeMode={'contain'} style={styles.playFewIcon}/>
                <Text style={styles.followTip}>{this._playFewCalc(this.state.playFew)}次播放</Text>
              </View>
                <Text style={styles.followTittle} numberOfLines={2}>{this.state.videoName}</Text>
            </View>
            {/*右侧（点赞，转发）*/}
            <View column style={styles.tools}>
              <TouchableOpacity column center onPress={debounce(()=>this._cancelOradd(this.state.likeIt == 1,this.state.videoId),500)}>
                  <Image source={this.state.likeIt == 1?require('../images/likeHeart.png'):require('../images/heart.png')} resizeMode={'contain'}  style={styles.bottomRightImage}/>
                  <Text style={{color:'#FFFFFF99',textAlign:'center',width:30}}>{this._playFewCalc(this.state.videoLikeNum)}</Text>
              </TouchableOpacity>
              <TouchableOpacity column center style={styles.bottomRightBn} onPress={()=>this.shareToFriends(this.state.videoId)}>
                  <Image source={require('../images/share.png')} resizeMode={'contain'} style={styles.bottomRightImage}/>
              </TouchableOpacity>
            </View>
          </View>
        )
      } 
    </>
    )
  }

  _cancelOradd=(isLike,videoId)=>{
    const {addVideoLike,cancelVideoLike} = this.props.relaxProps;
    if (isLike) {
      this.setState({likeIt:0,videoLikeNum:this.state.videoLikeNum - 1})
        cancelVideoLike(videoId)
    }else{
      this.setState({likeIt:1,videoLikeNum:this.state.videoLikeNum + 1})
        addVideoLike(videoId)
    }
  }

  _doPlay = (item) =>{
    const {getVideoById} = this.props.relaxProps;
    const {artworkUrl,videoLikeNum,playFew,videoId,likeIt,videoName} = item;
    if (artworkUrl) {
      getVideoById(videoId)
      this.setState({showVideo:true,artworkUrl,videoLikeNum,playFew:playFew + 1,videoId,likeIt,videoName})
    }else{
      msg.emit('app:tip', '视频链接无效');
    }
  }
  _closeVideo = () =>{
    this.setState({showVideo:false})
  }

  /**
   * 分享到朋友
   */
  shareToFriends = (videoId) => {
    const { h5Url } = this.props.relaxProps;
    share.shareToFriends({
      url: `${h5Url}/pages/package-D/video-play/index?videoId=${videoId}`,
      title: '我在超级大白鲸厂家直卖平台找到了靠谱的货源',
      description: '特别低价的平台分享给你，让生活变得更简单哦～',
      imgUrl: 'https://m.cjdbj.cn/static/images/beluga.jpg'
    });
  };

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
  },
  noDataInner:{
    paddingTop:screenHeight/3,
    alignItems: 'center',
  },
  noDataText:{
    color:'#00000066'
  },
  followPicBox:{
    
  },
  followPic:{
    width:screenWidth / 3,
    height:200,
    position:"relative",
  },
  followIcon:{
    position:'absolute',
    bottom:5,
    left:10,
    flexDirection:'row'
  },
  img:{
    width:15,
    height:15,
  },
  followTxt:{
    fontSize:12,
    color:'#FFFFFFCC',
    marginLeft:3
  },
  doPlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    // backgroundColor: '#000',
    width: screenWidth,
    height: screenHeight,
    paddingBottom:80
  },
  videoBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    // backgroundColor: '#000',
    width: 0,
    height: 0
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
  closeIcon: {
    position: 'absolute',
    // ..._.ifIphoneX(
    //   {
    //     top: 80
    //   },
    //   {
    //     top: isAndroid ? 50 : 60
    //   }
    // ),
    top:80,
    left: 10
  },
  playFewIcon:{
    width:15,
    height:15,
    marginRight:5,
    marginTop:1
  },
  bottom:{
    position:'absolute',
    bottom:0,
    left:0,
    height:30,
    width:'100%'
  }
});
