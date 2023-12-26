/**
 * https://github.com/itsnubix/react-native-video-controls
 * 中文文档 https://www.jianshu.com/p/2db4e3e2c343
 */
import React, { Component } from 'react';
import Video from '@wanmi/react-native-video';
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
  ImageBackground,
  PanResponder,
  StyleSheet,
  Animated,
  Easing,
  Image,
  View,
  Text
} from 'react-native';
import * as countTime from 'lodash';
import * as _ from './../common/util';
import { mainColor, isAndroid } from 'wmkit/styles/index';

export default class WMVideo extends Component {
  static defaultProps = {
    toggleResizeModeOnFullscreen: true,
    playInBackground: false,
    playWhenInactive: false,
    showOnStart: true,
    resizeMode: 'contain',
    paused: true,
    repeat: false,
    volume: 0.5,
    muted: false,
    rate: 1,
    visible: false,
    closeVideo: () => {}
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.source != this.props.source) {
      this.setState({
        source: nextProps.source
      });
    }
  }

  constructor(props) {
    super(props);

    /**
     * All of our values that are updated by the
     * methods and listeners in this class
     */
    this.state = {
      // Video
      resizeMode: this.props.resizeMode,
      paused: this.props.paused,
      muted: this.props.muted,
      volume: this.props.volume,
      rate: this.props.rate,
      repeat: this.props.repeat,
      // Controls

      showTimeRemaining: true,
      lastScreenPress: 0,
      volumeFillWidth: 0,
      seekerFillWidth: 0,
      showControls: this.props.showOnStart,
      seekerPosition: 0,
      seekerOffset: 0,
      seeking: false,
      loading: false,
      currentTime: 0,
      error: false,
      duration: 0,
      //视频来源
      source: this.props.source
    };

    /**
     * Any options that can be set at init.
     */
    this.opts = {
      playWhenInactive: this.props.playWhenInactive,
      playInBackground: this.props.playInBackground
    };

    /**
     * Our app listeners and associated methods
     */
    this.events = {
      onError: this.props.onError || this._onError.bind(this),
      onEnd: this.props.onEnd || this._onEnd.bind(this),
      onControlTouch: this._onControlTouch.bind(this),
      onLoadStart: this._onLoadStart.bind(this),
      onProgress: this._onProgress.bind(this),
      onLoad: this._onLoad.bind(this),
      onPause: this.props.onPause,
      onPlay: this.props.onPlay
    };

    /**
     * Functions used throughout the application
     */
    this.methods = {
      togglePlayPause: this._togglePlayPause.bind(this),
      closeVideo: this._closeVideo.bind(this),
      toggleControls: this._toggleControls.bind(this),
      Timer: this._Timer.bind(this)
    };

    /**
     * Player information
     */
    this.player = {
      controlTimeoutDelay: this.props.controlTimeout || 15000,
      volumePanResponder: PanResponder,
      seekPanResponder: PanResponder,
      controlTimeout: null,
      volumeWidth: 150,
      iconOffset: 7,
      seekWidth: 0,
      ref: Video
    };

    /**
     * Various animations
     */
    const initialValue = this.props.showOnStart ? 1 : 0;

    this.animations = {
      bottomControl: {
        marginBottom: new Animated.Value(0),
        opacity: new Animated.Value(initialValue)
      },
      topControl: {
        marginTop: new Animated.Value(0),
        opacity: new Animated.Value(initialValue)
      },
      video: {
        opacity: new Animated.Value(1)
      },
      loader: {
        rotate: new Animated.Value(0),
        MAX_VALUE: 360
      }
    };

    /**
     * Various styles that be added...
     */
    this.styles = {
      videoStyle: this.props.videoStyle || {},
      containerStyle: this.props.style || {}
    };
  }

  /**
   | -------------------------------------------------------
   | Events
   | -------------------------------------------------------
   |
   | These are the events that the <Video> component uses
   | and can be overridden by assigning it as a prop.
   | It is suggested that you override onEnd.
   |
   */

  /**
   * When load starts we display a loading icon
   * and show the controls.
   */
  _onLoadStart() {
    let state = this.state;
    state.loading = true;
    this.loadAnimation();
    this.setState(state);

    if (typeof this.props.onLoadStart === 'function') {
      this.props.onLoadStart(...arguments);
    }
  }

  /**
   * When load is finished we hide the load icon
   * and hide the controls. We also set the
   * video duration.
   *
   * @param {object} data The video meta data
   */
  _onLoad(data = {}) {
    let state = this.state;

    state.duration = data.duration;
    state.loading = false;
    this.setState(state);

    if (state.showControls) {
      this.setControlTimeout();
    }

    if (typeof this.props.onLoad === 'function') {
      this.props.onLoad(...arguments);
    }
  }

  /**
   * For onprogress we fire listeners that
   * update our seekbar and timer.
   *
   * @param {object} data The video meta data
   */
  _onProgress(data = {}) {
    let state = this.state;
    state.currentTime = data.currentTime;

    if (!state.seeking) {
      const position = this.calculateSeekerPosition();
      this.setSeekerPosition(position);
    }

    if (typeof this.props.onProgress === 'function') {
      this.props.onProgress(...arguments);
    }

    this.setState(state);
  }

  /**
   * It is suggested that you override this
   * command so your app knows what to do.
   * Either close the video or go to a
   * new page.
   */
  _onEnd() {
    this.setState({
      paused: !this.props.repeat
    });
  }

  /**
   * Set the error state to true which then
   * changes our renderError function
   *
   * @param {object} err  Err obj returned from <Video> component
   */
  _onError(err) {
    let state = this.state;
    state.error = true;
    state.loading = false;

    this.setState(state);
  }

  /**
   * This is a single and double tap listener
   * when the user taps the screen anywhere.
   * One tap toggles controls
   */
  _onControlTouch() {
    let state = this.state;
    this.methods.toggleControls();
    this.setState(state);
  }

  /**
   | -------------------------------------------------------
   | Methods
   | -------------------------------------------------------
   |
   | These are all of our functions that interact with
   | various parts of the class. Anything from
   | calculating time remaining in a video
   | to handling control operations.
   |
   */

  /**
   * Set a timeout when the controls are shown
   * that hides them after a length of time.
   * Default is 15s
   */
  setControlTimeout() {
    this.player.controlTimeout = setTimeout(() => {
      this._hideControls();
    }, this.player.controlTimeoutDelay);
  }

  /**
   * Clear the hide controls timeout.
   */
  clearControlTimeout() {
    clearTimeout(this.player.controlTimeout);
  }

  /**
   * Reset the timer completely
   */
  resetControlTimeout() {
    this.clearControlTimeout();
    this.setControlTimeout();
  }

  /**
   * Animation to hide controls. We fade the
   * display to 0 then move them off the
   * screen so they're not interactable
   */
  hideControlAnimation() {
    Animated.parallel([
      Animated.timing(this.animations.topControl.opacity, { toValue: 0 ,useNativeDriver:true}),
      Animated.timing(this.animations.topControl.marginTop, { toValue: -100 ,useNativeDriver:true}),
      Animated.timing(this.animations.bottomControl.opacity, { toValue: 0 ,useNativeDriver:true}),
      Animated.timing(this.animations.bottomControl.marginBottom, {
        toValue: -100,useNativeDriver:true
      })
    ]).start();
  }

  /**
   * Animation to show controls...opposite of
   * above...move onto the screen and then
   * fade in.
   */
  showControlAnimation() {
    Animated.parallel([
      Animated.timing(this.animations.topControl.opacity, { toValue: 1 ,useNativeDriver:true}),
      Animated.timing(this.animations.topControl.marginTop, { toValue: 0 ,useNativeDriver:true}),
      Animated.timing(this.animations.bottomControl.opacity, { toValue: 1 ,useNativeDriver:true}),
      Animated.timing(this.animations.bottomControl.marginBottom, {
        toValue: 0,useNativeDriver:true
      })
    ]).start();
  }

  /**
   * Loop animation to spin loader icon. If not loading then stop loop.
   */
  loadAnimation() {
    if (this.state.loading) {
      Animated.sequence([
        Animated.timing(this.animations.loader.rotate, {
          toValue: this.animations.loader.MAX_VALUE,
          duration: 1500,
          easing: Easing.linear
          ,useNativeDriver:true
        }),
        Animated.timing(this.animations.loader.rotate, {
          toValue: 0,
          duration: 0,
          easing: Easing.linear,
          useNativeDriver:true
        })
      ]).start(this.loadAnimation.bind(this));
    }
  }

  /**
   * Function to hide the controls. Sets our
   * state then calls the animation.
   */
  _hideControls() {
    if (this.mounted) {
      let state = this.state;
      state.showControls = false;
      this.hideControlAnimation();

      this.setState(state);
    }
  }

  /**
   * Function to toggle controls based on
   * current state.
   */
  _toggleControls() {
    let state = this.state;
    state.showControls = !state.showControls;

    if (state.showControls) {
      this.showControlAnimation();
      this.setControlTimeout();
    } else {
      this.hideControlAnimation();
      this.clearControlTimeout();
    }

    this.setState(state);
  }

  /**
   * Toggle playing state on <Video> component
   */
  _togglePlayPause() {
    let state = this.state;
    if (state.paused) {
      typeof this.events.onPause === 'function' && this.events.onPause();
    } else {
      typeof this.events.onPlay === 'function' && this.events.onPlay();
    }
    this.setState({
      paused: !state.paused
    });
  }

  /**
   * 关闭视频方法
   */
  _closeVideo() {
    if (this.props.closeVideo) {
      this.props.closeVideo();
    }
  }

  /**
   * 视频时间方法
   */
  _Timer() {
    // let state = this.state;
    // state.showTimeRemaining = !state.showTimeRemaining;
    // this.setState(state);
  }

  /**
   * Calculate the time to show in the timer area
   * based on if they want to see time remaining
   * or duration. Formatted to look as 00:00.
   */
  calculateTime() {
    if (this.state.showTimeRemaining) {
      const time = this.state.duration - this.state.currentTime;
      return `-${this.formatTime(time)}`;
    }

    return this.formatTime(this.state.currentTime);
  }

  /**
   * Format a time string as mm:ss
   *
   * @param {int} time time in milliseconds
   * @return {string} formatted time string in mm:ss format
   */
  formatTime(time = 0) {
    const symbol = this.state.showRemainingTime ? '-' : '';
    time = Math.min(Math.max(time, 0), this.state.duration);

    const formattedMinutes = countTime.padStart(
      Math.floor(time / 60).toFixed(0),
      2,
      0
    );
    const formattedSeconds = countTime.padStart(
      Math.floor(time % 60).toFixed(0),
      2,
      0
    );

    return `${symbol}${formattedMinutes}:${formattedSeconds}`;
  }

  /**
   * Set the position of the seekbar's components
   * (both fill and handle) according to the
   * position supplied.
   *
   * @param {float} position position in px of seeker handle}
   */
  setSeekerPosition(position = 0) {
    let state = this.state;
    position = this.constrainToSeekerMinMax(position);

    state.seekerFillWidth = position;
    state.seekerPosition = position;

    if (!state.seeking) {
      state.seekerOffset = position;
    }

    this.setState(state);
  }

  /**
   * Contrain the location of the seeker to the
   * min/max value based on how big the
   * seeker is.
   *
   * @param {float} val position of seeker handle in px
   * @return {float} contrained position of seeker handle in px
   */
  constrainToSeekerMinMax(val = 0) {
    if (val <= 0) {
      return 0;
    } else if (val >= this.player.seekerWidth) {
      return this.player.seekerWidth;
    }
    return val;
  }

  /**
   * Calculate the position that the seeker should be
   * at along its track.
   *
   * @return {float} position of seeker handle in px based on currentTime
   */
  calculateSeekerPosition() {
    const percent = this.state.currentTime / this.state.duration;
    return this.player.seekerWidth * percent;
  }

  /**
   * Return the time that the video should be at
   * based on where the seeker handle is.
   *
   * @return {float} time in ms based on seekerPosition.
   */
  calculateTimeFromSeekerPosition() {
    const percent = this.state.seekerPosition / this.player.seekerWidth;
    return this.state.duration * percent;
  }

  /**
   * Seek to a time in the video.
   *
   * @param {float} time time to seek to in ms
   */
  seekTo(time = 0) {
    let state = this.state;
    state.currentTime = time;
    this.player.ref.seek(time);
    this.setState(state);
  }

  /**
   | -------------------------------------------------------
   | React Component functions
   | -------------------------------------------------------
   |
   | Here we're initializing our listeners and getting
   | the component ready using the built-in React
   | Component methods
   |
   */

  /**
   * Before mounting, init our seekbar and volume bar
   * pan responders.
   */
  UNSAFE_componentWillMount() {
    this.initSeekPanResponder();
  }

  /**
   * To allow basic playback management from the outside
   * we have to handle possible props changes to state changes
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    //视频显示出来，让其自动播放
    if (nextProps.paused != this.props.paused) {
      this.setState({
        paused: nextProps.paused
      });
    }
  }

  /**
   * Upon mounting, calculate the position of the volume
   * bar based on the volume property supplied to it.
   */
  componentDidMount() {
    let state = this.state;
    this.mounted = true;

    this.setState(state);
  }

  /**
   * When the component is about to unmount kill the
   * timeout less it fire in the prev/next scene
   */
  componentWillUnmount() {
    this.mounted = false;
    this.clearControlTimeout();
  }

  /**
   * Get our seekbar responder going
   */
  initSeekPanResponder() {
    this.player.seekPanResponder = PanResponder.create({
      // Ask to be the responder.
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      /**
       * When we start the pan tell the machine that we're
       * seeking. This stops it from updating the seekbar
       * position in the onProgress listener.
       */
      onPanResponderGrant: (evt, gestureState) => {
        let state = this.state;
        this.clearControlTimeout();
        state.seeking = true;
        this.setState(state);
      },

      /**
       * When panning, update the seekbar position, duh.
       */
      onPanResponderMove: (evt, gestureState) => {
        const position = this.state.seekerOffset + gestureState.dx;
        this.setSeekerPosition(position);
      },

      /**
       * On release we update the time and seek to it in the video.
       * If you seek to the end of the video we fire the
       * onEnd callback
       */
      onPanResponderRelease: (evt, gestureState) => {
        const time = this.calculateTimeFromSeekerPosition();
        let state = this.state;
        if (time >= state.duration && !state.loading) {
          state.paused = true;
          this.events.onEnd();
        } else {
          this.seekTo(time);
          this.setControlTimeout();
          state.seeking = false;
        }
        this.setState(state);
      }
    });
  }

  /**
   | -------------------------------------------------------
   | Rendering
   | -------------------------------------------------------
   |
   | This section contains all of our render methods.
   | In addition to the typical React render func
   | we also have all the render methods for
   | the controls.
   |
   */

  /**
   * Standard render control function that handles
   * everything except the sliders. Adds a
   * consistent <TouchableHighlight>
   * wrapper and styling.
   */
  renderControl(children, callback, style = {}) {
    return (
      <TouchableHighlight
        underlayColor="transparent"
        activeOpacity={0.8}
        onPress={() => {
          this.resetControlTimeout();
          callback();
        }}
        style={[styles.controls.control, style]}
      >
        {children}
      </TouchableHighlight>
    );
  }

  /**
   * Renders an empty control, used to disable a control without breaking the view layout.
   */
  renderNullControl() {
    return <View style={[styles.controls.control]} />;
  }

  /**
   * Render bottom control group and wrap it in a holder
   */
  renderBottomControls() {
    const seekbarControl = this.props.disableSeekbar
      ? this.renderNullControl()
      : this.renderSeekbar();
    const playPauseControl = this.props.disablePlayPause
      ? this.renderNullControl()
      : this.props.visible
      ? this.renderPlayPause()
      : null;
    const closeVideoControl = this.props.disableCloseVideo
      ? this.renderNullControl()
      : this.renderCloseVideo();
    const leftTimerControl = this.props.disableLeftTime
      ? this.renderNullControl()
      : this.renderLeftTime();
    const rightTimerControl = this.props.disableRightTime
      ? this.renderNullControl()
      : this.renderRightTime();

    return (
      <Animated.View
        style={[
          styles.controls.controlGroup,
          {
            opacity: this.animations.bottomControl.opacity,
            // marginBottom: this.animations.bottomControl.marginBottom
          },
          this.props.controlStyle
        ]}
      >
        {/*占位元素保持播放按钮居中*/}
        <View
          style={
            this.props.visible
              ? { height: 28, marginTop: this.props.pauseMarginTopStyle?this.props.pauseMarginTopStyle:10 }
              : { height: 0, width: 0 }
          }
        />
        {closeVideoControl}
        {playPauseControl}
        <ImageBackground
          source={require('./img/bottom-vignette.png')}
          style={[styles.controls.column]}
          imageStyle={[styles.controls.vignette]}
        >
          <View
            style={[
              styles.controls.row,
              {
                marginBottom: 10
              }
            ]}
          >
            {leftTimerControl}
            {seekbarControl}
            {rightTimerControl}
          </View>
        </ImageBackground>
      </Animated.View>
    );
  }

  /**
   * Render the seekbar and attach its handlers
   */
  renderSeekbar() {
    return (
      <View style={styles.seekbar.container}>
        <View
          style={styles.seekbar.track}
          onLayout={(event) =>
            (this.player.seekerWidth = event.nativeEvent.layout.width)
          }
        >
          <View
            style={[
              styles.seekbar.fill,
              { backgroundColor: mainColor },
              {
                width: this.state.seekerFillWidth,
                backgroundColor: this.props.seekColor || mainColor
              }
            ]}
          />
        </View>
        <View
          style={[styles.seekbar.handle, { left: this.state.seekerPosition }]}
          {...this.player.seekPanResponder.panHandlers}
        >
          <View
            style={[
              styles.seekbar.circle,
              { backgroundColor: this.props.seekColor || '#FFF' }
            ]}
          />
        </View>
      </View>
    );
  }

  /**
   * Render the play/pause button and show the respective icon
   */
  renderPlayPause() {
    let source =
      this.state.paused === true
        ? require('./img/play.png')
        : require('./img/pause.png');
    return this.renderControl(
      <Image style={styles.controls.playPauseIcon} source={source} />,
      this.methods.togglePlayPause,
      styles.controls.playPause
    );
  }

  /**
   * 关闭视频dom按钮
   */
  renderCloseVideo() {
    return this.renderControl(
      <Image
        style={styles.controls.closeVideoIcon}
        source={require('./img/close.png')}
      />,
      this.methods.closeVideo,
      this.props.closeIcon?this.props.closeIcon: styles.controls.closeVideoBox
    );
  }

  /**
   * Show our leftTimer.
   */
  renderLeftTime() {
    return this.renderControl(
      <Text allowFontScaling={false} style={styles.controls.timerText}>
        {this.formatTime(this.state.currentTime)}
      </Text>,
      this.methods.Timer,
      styles.controls.leftTimer
    );
  }

  /**
   * Show our rightTimer.
   */
  renderRightTime() {
    return this.renderControl(
      <Text allowFontScaling={false} style={styles.controls.timerText}>
        {this.formatTime(this.state.duration)}
      </Text>,
      this.methods.closeVideo,
      styles.controls.rightTimer
    );
  }

  /**
   * Show loading icon
   */
  renderLoader() {
    if (this.state.loading) {
      return (
        <View style={styles.loader.container}>
          <Animated.Image
            source={require('./img/loader-icon.png')}
            style={[
              styles.loader.icon,
              {
                transform: [
                  {
                    rotate: this.animations.loader.rotate.interpolate({
                      inputRange: [0, 360],
                      outputRange: ['0deg', '360deg']
                    })
                  }
                ]
              }
            ]}
          />
        </View>
      );
    }
    return null;
  }

  renderError() {
    if (this.state.error) {
      return (
        <View style={styles.error.container}>
          <Image
            source={require('./img/error-icon.png')}
            style={styles.error.icon}
          />
          <Text allowFontScaling={false} style={styles.error.text}>
            暂不支持播放此格式的视频
          </Text>
        </View>
      );
    }
    return null;
  }

  /**
   * Provide all of our options and render the whole component.
   */
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.events.onControlTouch}
        // onPress={() => this.setState({ paused: !this.state.paused })}
        style={
          this.props.visible
            ? [styles.player.container, this.styles.containerStyle]
            : styles.visible
        }
      >
        <View
          style={
            this.props.visible
              ? [styles.player.container, this.styles.containerStyle]
              : styles.visible
          }
        >
          <Video
            {...this.props}
            ref={(videoPlayer) => (this.player.ref = videoPlayer)}
            resizeMode={this.state.resizeMode}
            volume={this.state.volume}
            paused={this.state.paused}
            muted={this.state.muted}
            rate={this.state.rate}
            repeat={this.state.repeat}
            onLoadStart={this.events.onLoadStart}
            onProgress={this.events.onProgress}
            onError={this.events.onError}
            onLoad={this.events.onLoad}
            onEnd={this.events.onEnd}
            style={[styles.player.video, this.styles.videoStyle]}
            source={{ uri: this.state.source }}
          />
          {this.renderError()}
          {this.renderLoader()}
          {this.props.visible ? this.renderBottomControls() : null}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

/**
 * This object houses our styles. There's player
 * specific styles and control specific ones.
 * And then there's volume/seeker styles.
 */
const styles = {
  player: StyleSheet.create({
    container: {
      backgroundColor: '#000',
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'space-between'
    },
    video: {
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  }),
  error: StyleSheet.create({
    container: {
      backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    icon: {
      marginBottom: 16
    },
    text: {
      backgroundColor: 'transparent',
      color: '#f27474'
    }
  }),
  loader: StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
  }),
  controls: StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: null,
      width: null
    },
    column: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: null,
      width: null
    },
    vignette: {
      resizeMode: 'stretch'
    },
    control: {
      // padding: 16,
      alignItems: 'center'
    },
    text: {
      backgroundColor: 'transparent',
      color: '#FFF',
      fontSize: 14,
      textAlign: 'center'
    },
    pullRight: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    top: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start'
    },
    controlGroup: {
      alignItems: 'stretch',
      flex: 1,
      justifyContent: 'space-between'
    },
    playPause: {
      width: 70,
      height: 70,
      alignSelf: 'center'
    },
    playPauseIcon: {
      width: 70,
      height: 70
    },
    leftTimer: {
      width: 60,
      paddingLeft: 10,
      paddingRight: 10,
      marginRight: 5
    },
    rightTimer: {
      width: 60,
      paddingLeft: 10,
      paddingRight: 10,
      marginLeft: 10
    },
    timerText: {
      backgroundColor: 'transparent',
      color: '#fff',
      fontSize: 13,
      textAlign: 'left'
    },
    closeVideoBox: {
      position: 'absolute',
      ..._.ifIphoneX(
        {
          top: 36
        },
        {
          top: isAndroid ? 8 : 28
        }
      ),
      left: 10
    },
    closeVideoIcon: {
      width: 30,
      height: 30
    }
  }),
  seekbar: StyleSheet.create({
    container: {
      flex: 1,
      height: 28
    },
    track: {
      backgroundColor: 'rgba(255,255,255,0.3)',
      height: 2,
      position: 'relative',
      top: 14,
      width: '100%'
    },
    fill: {
      height: 2,
      width: '100%'
    },
    handle: {
      position: 'absolute',
      marginLeft: -7,
      height: 28,
      width: 28
    },
    circle: {
      borderRadius: 12,
      position: 'relative',
      top: 8,
      left: 8,
      height: 12,
      width: 12
    },
    visible: {
      width: 0,
      height: 0
    }
  })
};
