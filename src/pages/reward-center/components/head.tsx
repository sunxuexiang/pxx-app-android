import React from 'react';
import {
  Clipboard,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { isAndroid, screenWidth, mainColor } from 'wmkit/styles/index';
import { msg } from 'plume2';
import * as _ from 'wmkit/common/util';

const defaultImg = require('../img/default-img.png');

type IHeadProps = T.IProps & T.IHeadProps;

@connect<Partial<IHeadProps>, T.IHeadState>(
  store2Props,
  actions
)
export default class Head extends React.Component<
  Partial<IHeadProps>,
  T.IHeadState
> {
  constructor(props: IHeadProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      main: { customerInfo, customerBalance, inviteInfo, noticeNum, preferentialNum }
    } = this.props;

    return (
      <View style={styles.distributionTop}>
        <ImageBackground
          style={styles.container}
          source={require('../img/reward-top-bg.png')}
        >
          <SafeAreaView style={styles.box}>
            <Text allowFontScaling={false} style={styles.title}>
              奖励中心
            </Text>
            <View style={styles.imgBox}>
              <Image
                style={styles.defaultImg}
                source={
                  customerInfo.headImg
                    ? { uri: customerInfo.headImg }
                    : defaultImg
                }
              />
            </View>
            <View style={styles.levelBox}>
              <View style={styles.levelInfo}>
                <Text allowFontScaling={false} style={styles.userName}>{customerInfo.customerName}</Text>
              </View>
              {inviteInfo.customerName && (
                <Text allowFontScaling={false} style={styles.inviteName}>
                  邀请人：
                  {inviteInfo.customerName}
                </Text>
              )}
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.iconBox}
              onPress={() => {
                msg.emit('router: goToNext', { routeName: 'PushCenter' });
              }}
            >
              <Image
                style={styles.mesIcon}
                source={require('../img/message.png')}
              />
              {(noticeNum !== 0 || preferentialNum !== 0) && (
                <View style={[styles.round, { backgroundColor: mainColor }]}>
                  <Text style={styles.roundText} allowFontScaling={false}>
                    {noticeNum + preferentialNum > 99
                      ? '99+'
                      : noticeNum + preferentialNum}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </SafeAreaView>
          <View style={styles.balanceBox}>
            <View style={styles.balanceLeft}>
              <Text allowFontScaling={false} style={styles.balanceLeftLabel}>账户余额</Text>
              <Text allowFontScaling={false} style={styles.balanceLeftValue}>
                {customerBalance.accountBalanceTotal
                  ? _.fmoney(customerBalance.accountBalanceTotal, 2)
                  : '0.00'}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.balanceRight}
              onPress={() =>
                msg.emit('router: goToNext', { routeName: 'BalanceCash' })
              }
            >
              <Text allowFontScaling={false} style={styles.balanceRightText}>立即提现&gt;</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  distributionTop:{
  },

  container: {
    height: 245,
    paddingTop:20,

    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    paddingBottom: 70,
    position: 'relative'
  },
  box: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#ffffff',
    fontSize: 16
  },
  imgBox: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 30,
    marginTop: 14,
    marginBottom: 9
  },
  defaultImg: {
    width: 56,
    height: 56,
    borderRadius: 28
    // resizeMode: 'contain'
  },
  levelBox: {
    marginBottom: 10,
    alignItems: 'center'
  },
  levelInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userName: {
    color: '#ffffff',
    fontSize: 15
  },
  levelName: {
    fontSize: 12,
    color: '#e6b980',
    paddingLeft: 7.5,
    paddingRight: 7.5,
    paddingTop: 3,
    paddingBottom: 3,
    marginLeft: 12.5,
    borderColor: '#e6b980',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10
  },
  levelNameDisable: {
    fontSize: 12,
    color: '#bcbcbc',
    paddingLeft: 7.5,
    paddingRight: 7.5,
    paddingTop: 3,
    paddingBottom: 3,
    marginLeft: 12.5,
    borderColor: '#bcbcbc',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10
  },
  levelDisable: {
    fontSize: 12,
    color: '#bcbcbc',
    paddingLeft: 7.5,
    paddingRight: 7.5,
    paddingTop: 3,
    paddingBottom: 3,
    marginLeft: 1
  },
  disableReason: {
    marginTop: 6,
    marginBottom: 6,
    width: screenWidth - 50
  },
  disableReasonTxt: {
    fontSize: 12,
    color: '#bcbcbc',
    overflow: 'hidden'
  },
  inviteName: {
    fontSize: 13,
    marginBottom: 2.5,
    marginTop: 8,
    color: '#ffffff'
  },
  inviteInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 7.5
  },
  inviteCode: {
    fontSize: 13,
    color: '#ffffff'
  },
  inviteCodeCopy: {
    backgroundColor: '#596587',
    paddingTop: 2.5,
    paddingBottom: 2.5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10
  },
  inviteCodeCopyTxt: {
    fontSize: 13,
    color: '#ffffff'
  },
  balanceBox: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 35,
    paddingRight: 35,
    alignItems: 'center'
  },
  balanceLeft: {
    flexDirection: 'column'
  },
  balanceLeftLabel: {
    color: '#ffffff',
    fontSize: 12,
    marginBottom: 5
  },
  balanceLeftValue: {
    color: '#ffffff',
    fontSize: 18
  },
  balanceRight: {
    paddingTop: 5.5,
    paddingBottom: 7.5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#d3994e',
    borderRadius: 50,
    alignItems: 'center'
  },
  balanceRightText: {
    color: '#ffffff',
    fontSize: 13,
    marginTop: 4
  },
  iconBox: {
    position: 'absolute',
    top: isAndroid ? 10 : 22,
    right: 5,
    width: 40,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mesIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff'
  },
  round: {
    position: 'absolute',
    top: 0,
    right: 5,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  roundText: {
    color: '#fff',
    fontSize: 10
  }
});
