import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  AppState,
  PixelRatio
} from 'react-native';

import * as T from '../types';
import { msg } from 'plume2';
import CountDown from 'wmkit/count-down';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { mainColor, screenWidth } from 'wmkit/styles/index';
import moment from 'moment';
import activity from '../reducers/activity';
import LinearGradient from 'react-native-linear-gradient';

type IDetailBottomProps = T.IProps & T.IDetailBottomProps;
const buttonText = {
  //活动已结束
  2: '快去看看其他团吧~',
  4: '我要参团',
  5: '我也开个团',
  //已经参团，拼团成功，等待收货
  7: '看看其他团购',
  8: '邀请好友'
};

@connect<Partial<IDetailBottomProps>, T.IDetailBottomState>(
  store2Props,
  actions
)
export default class DetailBottom extends React.Component<
  Partial<IDetailBottomProps>,
  T.IDetailBottomState
> {
  constructor(props: IDetailBottomProps) {
    super(props);
  }

  componentDidMount() {
    //监听状态改变事件
    AppState.addEventListener('change', this.handleAppStateChange.bind(this));
  }

  UNSAFE_componentWillUpdate(nextProps, nextStates) {
    if (this.state && AppState.currentState != this.state.currentAppState) {
      //重新获取服务时间
      this.props.actions.queryServerTime();
    }
  }

  componentWillUnMount() {
    //移除监听
    AppState.addEventListener('change', this.handleAppStateChange.bind(this));
  }

  /**

*/
  render() {
    let {
      actions: { action },
      activity,

      goods,

      notice,

      otherGroup
    } = this.props;

    const endTime = moment(activity.activityInfo.endTime);
    return (
      <View style={styles.detailBottom}>
        <View style={styles.top}>
          {otherGroup.customerVOList.length > 0 &&
            otherGroup.customerVOList.slice(0, 5).map((item, index) => {
              return (
                <View style={styles.avatarBox}>
                  <Image
                    source={
                      item.headimgurl
                        ? {
                            uri: item.headimgurl
                          }
                        : require('../img/default-img.png')
                    }
                    style={[styles.avatar, index === 0 && { borderWidth: 1, borderColor: mainColor }]}
                  />
                  {index === 0 && (
                    <LinearGradient
                      colors={[mainColor, mainColor]}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                      style={styles.tuanBox}
                    >
                      <Text style={styles.tuanText}>团长</Text>
                    </LinearGradient>
                  )}
                </View>
              );
            })}
          {otherGroup.customerVOList.length > 5 && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.avatarBox}
              onPress={() => action.toggleJoinPeopleModal()}
            >
              <Image source={require('../img/add.png')} style={styles.avatar} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.middle}>
          {activity.grouponDetailOptStatus == 2 ? (
            <Text allowFontScaling={false} style={[styles.info, { color: mainColor }]}>
              活动已结束，你来晚了!
            </Text>
          ) : activity.grouponDetailOptStatus == 5 ? (
            <Text allowFontScaling={false} style={[styles.info, { color: mainColor }]}>
              来晚一步，已成功组团!
            </Text>
          ) : activity.grouponDetailOptStatus == 7 ? (
            <Text allowFontScaling={false} style={[styles.info, { color: mainColor }]}>
              拼团成功，等待收货吧！
            </Text>
          ) : (
            <Text allowFontScaling={false} style={styles.info}>
              还差{activity.activityInfo.waitGrouponNum}人即可拼团成功
            </Text>
          )}
          {activity.grouponDetailOptStatus == 4 ||
          activity.grouponDetailOptStatus == 8 ? (
            <View style={{ flexDirection: 'row'}}>
              <Text allowFontScaling={false} style={styles.info}>
                ，
              </Text>
              <CountDown
                timerName="GroupBuyDetail"
                showTimeDays={true}
                allowFontScaling={false}
                numberOfLines={1}
                //倒计时结束，刷新页面
                endHandle={() => {
                  //刷新拼团详情
                  msg.emit('router: refreshRoute', {
                    routeName: 'GroupBuyDetail'
                  });
                }}
                timeTextStyle={[styles.timeText, {color: mainColor}]}
                timeOffset={moment
                  .duration(endTime.diff(goods.serverTime))
                  .asSeconds()
                  .toFixed(0)}
              />
              <Text allowFontScaling={false} style={styles.info}>
                后结束
              </Text>
            </View>
          ) : null}
        </View>
        <LinearGradient
          colors={[mainColor, mainColor]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.bottom}
        >
          <TouchableOpacity
            onPress={() =>
              this.props.actions.doGroup(
                activity.grouponNo,
                goods.goodsInfoId,
                activity.grouponDetailOptStatus
              )
            }
          >
            <Text allowFontScaling={false} style={styles.bottomText}>
              {buttonText[activity.grouponDetailOptStatus]}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }

  //状态改变响应
  handleAppStateChange(nextAppState) {
    this.setState({ currentAppState: nextAppState });
  }
}

const styles = StyleSheet.create({
  detailBottom: {
    width: screenWidth,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 12,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  avatarBox: {
    position: 'relative',
    width: 68,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  tuanBox: {
    position: 'absolute',
    bottom: 4,
    left: 14,
    width: 40,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tuanText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '500'
  },
  middle: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.8)'
  },
  bottom: {
    marginTop: 16,
    width: 80,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomText: {
    fontWeight: '500',
    color: '#fff',
    fontSize: 12
  },
  timeText: {
    color: '#FF1F4E',
    fontSize: 13,
    marginLeft: 10
  }
});
