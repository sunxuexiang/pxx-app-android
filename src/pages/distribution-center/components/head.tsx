import React from 'react';
import {
  Clipboard,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PixelRatio
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { screenWidth, isAndroid ,mainColor} from 'wmkit/styles/index';
import { msg } from 'plume2';
import * as _ from 'wmkit/common/util';
import LinearGradient from 'react-native-linear-gradient';
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
      actions: { action },
      main: {
        customerInfo,
        distributor,
        customerBalance,
        inviteInfo,
        distributeSetting,
        noticeNum,
        preferentialNum
      }
    } = this.props;

    // 分销员是否禁用 0: 启用中  1：禁用中
    let forbidFlag = distributor.forbiddenFlag;
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.box}>
          {/* <Text allowFontScaling={false} style={styles.title}>
            分销中心
          </Text> */}
          <View style={styles.row}>
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
                <Text allowFontScaling={false} style={styles.userName}>
                  {customerInfo.customerName}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    msg.emit('router: goToNext', {
                      routeName: 'DistributionRule'
                    })
                  }
                >
                  <LinearGradient
                    colors={['#FFD119', '#FFA200']}
                    style={styles.levelBtn}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                  >
                    <Text
                      allowFontScaling={false}
                      style={
                        forbidFlag == 0
                          ? styles.levelName
                          : styles.levelNameDisable
                      }
                    >
                      {distributor.distributorLevelName ||
                        distributeSetting.distributorName}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                {forbidFlag == 1 && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      action.shopClosedTip(distributor.forbiddenReason)
                    }
                  >
                    <LinearGradient
                      colors={['#FF3838', '#EE0000']}
                      style={styles.disableBtn}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                    >
                      <Text
                        allowFontScaling={false}
                        style={styles.levelDisable}
                      >
                        已禁用
                      </Text>
                      <Image
                        source={require('../img/r-arrow.png')}
                        style={styles.rArrow}
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </View>
              {forbidFlag == 1 && (
                <TouchableOpacity
                  style={styles.disableReason}
                  activeOpacity={0.8}
                  onPress={() =>
                    action.shopClosedTip(distributor.forbiddenReason)
                  }
                >
                  <Text
                    allowFontScaling={false}
                    style={styles.disableReasonTxt}
                    numberOfLines={1}
                  >
                    禁用原因：
                    {distributor.forbiddenReason}
                  </Text>
                </TouchableOpacity>
              )}
              {inviteInfo.customerName && (
                <Text allowFontScaling={false} style={styles.inviteName}>
                  邀请人：
                  {inviteInfo.customerName}
                </Text>
              )}
              <View style={styles.inviteInfo}>
                <Text allowFontScaling={false} style={styles.inviteCode}>
                  我的邀请码：
                  {distributor.inviteCode}
                </Text>
                <TouchableOpacity
                  style={styles.inviteCodeCopy}
                  activeOpacity={0.8}
                  onPress={() => this.copyCode(distributor.inviteCode)}
                >
                  <Text
                    style={styles.inviteCodeCopyTxt}
                    allowFontScaling={false}
                  >
                    复制
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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
              <View style={styles.round}>
                <Text style={[styles.roundText, { color: mainColor }]} allowFontScaling={false}>
                  {noticeNum + preferentialNum > 99
                    ? '99+'
                    : noticeNum + preferentialNum}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </SafeAreaView>
        {/* <View style={styles.balanceBox}>
          <View style={styles.balanceLeft}>
            <Text allowFontScaling={false} style={styles.balanceLeftLabel}>
              账户余额
            </Text>
            <Text allowFontScaling={false} style={styles.balanceLeftValue}>
              {customerBalance && customerBalance.accountBalanceTotal
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
            <Text allowFontScaling={false} style={styles.balanceRightText}>
              立即提现&gt;
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }

  /**
   * 复制链接
   */
  copyCode = (inviteCode: string) => {
    Clipboard.setString(inviteCode);
    msg.emit('app:tip', '已复制邀请码');
  };
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    flexDirection: 'column',
    paddingHorizontal: 12,
    paddingTop: isAndroid?10:20,
    paddingBottom: 50,
    backgroundColor: '#FF4D00'
  },
  box: {
    // flex: 1,
    width: '100%'
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 65
  },
  imgBox: {
    width: 56,
    height: 56,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 28,
    marginRight: 12
  },
  defaultImg: {
    width: 52,
    height: 52,
    borderRadius: 26
    // resizeMode: 'contain'
  },
  levelBox: {
    marginBottom: 10,
    flexDirection: 'column'
  },
  levelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  userName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  levelBtn: {
    height: 18,
    paddingHorizontal: 8,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8
  },
  disableBtn: {
    height: 18,
    paddingHorizontal: 8,
    borderRadius: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8
  },
  levelName: {
    fontSize: 10,
    color: '#993D00'
  },
  levelNameDisable: {
    fontSize: 10,
    color: '#993D00'
  },
  levelDisable: {
    fontSize: 10,
    color: '#fff'
  },
  rArrow: {
    width: 10,
    height: 10
  },
  disableReason: {
    marginTop: 6,
    marginBottom: 6,
    width: screenWidth - 50
  },
  disableReasonTxt: {
    fontSize: 12,
    color: '#bcbcbc',
    textAlign: 'center'
  },
  inviteName: {
    fontSize: 10,
    marginBottom: 2.5,
    marginTop: 4,
    color: '#ffffff'
  },
  inviteInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
    // paddingTop: 7.5
  },
  inviteCode: {
    fontSize: 10,
    color: '#ffffff'
  },
  inviteCodeCopy: {
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#fff',
    borderRadius: 10,
    width: 28,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4
  },
  inviteCodeCopyTxt: {
    fontSize: 8,
    color: '#ffffff'
  },
  balanceBox: {
    position: 'absolute',
    bottom: screenWidth * 0.09,
    left: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 35,
    paddingRight: 35,
    alignItems: 'center'
  },
  balanceLeft: {},
  balanceLeftLabel: {
    color: '#ffffff',
    fontSize: 12
  },
  balanceLeftValue: {
    color: '#ffffff',
    fontSize: 18
  },
  balanceRight: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#d3994e',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  balanceRightText: {
    color: '#ffffff',
    fontSize: 13
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
    backgroundColor: '#FFF',
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  roundText: {
    fontSize: 10
  }
});
