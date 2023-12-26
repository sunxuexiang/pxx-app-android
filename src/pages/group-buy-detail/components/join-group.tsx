import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import CountDown from 'wmkit/count-down';
import * as T from '../types';
import { msg } from 'plume2';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { screenWidth, mainColor } from 'wmkit/styles/index';
import moment from 'moment';
type IJoinGroupProps = T.IProps & T.IJoinGroupProps;

@connect<Partial<IJoinGroupProps>, T.IJoinGroupState>(
  store2Props,
  actions
)
export default class JoinGroup extends React.Component<
  Partial<IJoinGroupProps>,
  T.IJoinGroupState
> {
  constructor(props: IJoinGroupProps) {
    super(props);
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

    return (
      <View style={styles.joinGroup}>
        <View style={styles.tip}>
          <Text allowFontScaling={false} style={styles.tipLeft}>直接参与下面的团</Text>
          <TouchableOpacity
            style={styles.tipRight}
            activeOpacity={0.8}
            onPress={() => action.toggleWaitGroupModal()}
          >
            <Text allowFontScaling={false} style={styles.tipLeft}>查看更多</Text>
            <Image style={styles.icon} source={require('../img/arrow.png')} />
          </TouchableOpacity>
        </View>

        {otherGroup.grouponInstanceList.map((group, index) => {
          const endTime = moment(group.endTime);
          return (
            <View style={styles.info} key={index}>
              <View style={styles.leftPointer}>
                <Image
                  style={styles.avatar}
                  source={
                    group.headimgurl
                      ? { uri: group.headimgurl }
                      : require('../img/default-img.png')
                  }
                />
                <Text allowFontScaling={false} style={styles.name}>{group.customerName}</Text>
              </View>
              <View style={styles.rightPointer}>
                <View>
                  <Text allowFontScaling={false} style={styles.num}>
                    还差
                    <Text allowFontScaling={false} style={[styles.num, {color: mainColor}]}>
                      {group.grouponNum - group.joinNum}人
                    </Text>
                    成团
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Text allowFontScaling={false} style={styles.time}>距结束</Text>
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
                      timeTextStyle={[styles.time, styles.timeText, {color: mainColor}]}
                      timeOffset={moment
                        .duration(endTime.diff(goods.serverTime))
                        .asSeconds()
                        .toFixed(0)}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.btn, {backgroundColor: mainColor}]}
                  onPress={() => action.openSpecModal(group.grouponNo)}
                >
                  <Text allowFontScaling={false} style={styles.btnText}>立刻参团</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  joinGroup: {
    width: screenWidth,
    height: 155,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  tip: {
    width: screenWidth - 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tipLeft: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16,
    color: '#333333'
  },
  tipRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 7,
    height: 13,
    marginLeft: 9
  },
  info: {
    marginTop: 21,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftPointer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightPointer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  name: {
    marginLeft: 11,
    fontSize: 14,
    lineHeight: 16
  },
  btn: {
    marginLeft: 12,
    width: 63,
    height: 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11
  },
  btnText: {
    fontSize: 10,
    color: '#fff'
  },
  num: {
    fontSize: 12,
    color: '#333333',
    textAlign: 'right'
  },
  time: {
    fontSize: 10,
    color: '#999999',
    textAlign: 'right'
  },
  timeText: {
    marginLeft: 5
  }
});
