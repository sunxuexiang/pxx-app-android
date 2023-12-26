import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PixelRatio,
  ImageBackground
} from 'react-native';
import { Relax, msg } from 'plume2';
import CountDown from 'wmkit/count-down';
import { noop } from 'wmkit/noop';
import WmListView from 'wmkit/list-view/index';
import * as WMkit from 'wmkit/kit';

import {mainColor, screenWidth} from 'wmkit/styles/index';
import moment from 'moment';
const defaultImg = require('../img/default-img.png');

@Relax
export default class WaitGroupModal extends Component {
  static relaxProps = {
    grouponActivity: 'grouponActivity',
    toggleWaitGroupModal: noop,
    serverTime: 'serverTime',
  };
  render() {
    const { toggleWaitGroupModal, grouponActivity,serverTime } = this.props.relaxProps;
    const listViewProps = {
      url: '/groupon/instance/page',
      params: {
        grouponActivityId: grouponActivity.get('grouponActivityId')
      },
      getServerTime: true,
      dataPropsName: 'context.grouponInstanceVOS.content',
      isPagination: true,
      renderRow: (item, index, otherPropsObject) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            style={styles.groupItem}
            onPress={() => {
              if (!WMkit.isLoginOrNotOpen()) {
                msg.emit('loginModal:toggleVisible', {
                  callBack: () => {
                  msg.emit('router: goToNext', {
                  routeName: 'GroupBuyDetail', grouponNo: item.grouponNo
                })
              }
              });
              } else {
                msg.emit('router: goToNext', {
                  routeName: 'GroupBuyDetail', grouponNo: item.grouponNo
                })
              }
            }}
          >
            <View style={styles.itemLeft}>
              <Image style={styles.itemImg} source={item.headimgurl ? { uri: item.headimgurl } : defaultImg} />
              <Text style={styles.itemAccount} allowFontScaling={false}>{item.customerName}</Text>
            </View>
            <View style={styles.itemRight}>
              <View style={styles.rightInfo}>
                <Text style={styles.rightText} allowFontScaling={false}>还差<Text style={{color: mainColor}}>{item.grouponNum - item.joinNum}人</Text>成团</Text>
                <CountDown
                  showTimeDays={true}
                  visible={moment(item.endTime) && serverTime}
                  timeTextStyle={[styles.timeText, {color: mainColor}]}
                  timeOffset={moment
                    .duration(moment(item.endTime).diff(serverTime))
                    .asSeconds()
                    .toFixed(0)}
                  timerName="SpellGroupDetail"
                />
              </View>
              <View style={[styles.joinBtn, {backgroundColor: mainColor}]}>
                <Text allowFontScaling={false} style={styles.nowJoin}>立即参团</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      },
      keyProps: 'grouponNo'
    };
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.head} source={require('../img/head1.png')} />
        <View style={styles.mainBox}>
          <View style={styles.groupList}>
            <WmListView {...listViewProps} />

          </View>
        </View>
        <TouchableOpacity
          style={styles.btnClose}
          activeOpacity={0.8}
          onPress={() => { toggleWaitGroupModal() }}
        >
          <Image style={styles.close} source={require('../img/close-circle.png')} />
        </TouchableOpacity>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  head: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.9 * 0.25
  },
  mainBox: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.9,
    backgroundColor: '#fff',
    paddingHorizontal: 10,

  },
  groupTitle: {
    paddingVertical: 10,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center'
  },
  titleText: {
    flex: 1,
    fontSize: 13,
    color: '#333'

  },
  titleRight: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center'
  },
  more: {
    fontSize: 13,
    color: '#333'
  },
  arrow: {
    width: 7,
    height: 13,
    marginLeft: 8
  },
  btnClose: {
    marginTop: 25
  },
  close: {
    width: 43,
    height: 43
  },
  groupItem: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  itemImg: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
  },
  itemAccount: {
    fontSize: 14,
    color: '#333'
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightText: {
    textAlign: 'right',
    fontSize: 12,
    color: '#333',
    marginBottom: 5
  },
  rightInfo: {
    marginRight: 10
  },
  time: {
    fontSize: 10,
    color: '#999'
  },
  joinBtn: {
    width: 65,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  nowJoin: {
    fontSize: 10,
    color: '#fff'
  }
});
