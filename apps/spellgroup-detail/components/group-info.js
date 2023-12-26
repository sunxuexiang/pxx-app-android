import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Relax, msg } from 'plume2';
import moment from 'moment';
import CountDown from 'wmkit/count-down';
import { noop } from 'wmkit/noop';
import * as _ from 'wmkit/common/util';
import * as WMkit from 'wmkit/kit';

import LinearGradient from 'react-native-linear-gradient';
import {mainColor} from '@/wmkit/styles';
@Relax
export default class GroupInfo extends Component {
  static relaxProps = {
    grouponActivity: 'grouponActivity',
    goodsInfo: 'goodsInfo',
    serverTime: 'serverTime',
    countOver: noop,
    loading: 'loading'
  };

  render() {
    const { grouponActivity, goodsInfo, serverTime, countOver, loading } = this.props.relaxProps;
    const endTime = moment(grouponActivity.get('endTime'));
    // const endTime = moment('2019-08-22 13:37:50');
    return (
      !loading ? <LinearGradient colors={[mainColor, mainColor]} locations={[0.3, 0.9]} start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }} style={styles.container}>
        <View style={styles.left}>
          <View style={styles.groupInfo}>
            <View style={styles.groupNumBox}>
              <Text style={styles.groupNum} allowFontScaling={false}><Text style={styles.num} allowFontScaling={false}>{grouponActivity.get('grouponNum')}</Text>人团</Text>
            </View>
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.row}>
            <Text style={styles.text} allowFontScaling={false}>距离开团结束</Text>
            <CountDown
              showTimeDays={true}
              allowFontScaling={false}
              numberOfLines={1}
              //倒计时结束，刷新页面
              endHandle={() => {
                // msg.emit('router: refreshRoute', {
                //   routeName: 'SpellGroupDetail'
                // });
                msg.emit('router: goToNext', {
                  routeName: 'Main'
                });
              }}
              timeTextStyle={styles.time}
              timeOffset={moment
                .duration(endTime.diff(serverTime))
                .asSeconds()
                .toFixed(0)}
              timerName="SpellGroupDetail"
              groupFlag={true}
              showTimeDays={true}
            />
          </View>
          {/* <Text style={styles.allNum} allowFontScaling={false}>{grouponActivity.get('alreadyGrouponNum')}人已拼团</Text> */}
        </View>
      </LinearGradient> : null
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 13,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderTopLeftRadius:8,
    borderTopRightRadius:8,
  },
  left: {
    flex: 1
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  groupNumBox: {

  },
  groupNum: {
    fontSize: 14,
    color: '#fff',
  },
  num:{
    fontSize: 32,
  },
  allNum: {
    color: '#fff',
    fontSize:12
  },
  right: {
    alignItems: 'flex-end'
  },
  row:{
    flexDirection:'row',
    marginBottom:6
  },
  text: {
    fontSize: 10,
    color: '#fff',
    marginRight:6,
    marginTop:4
  },
  time: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold'
  }
});
