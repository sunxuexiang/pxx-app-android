import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WMkit from 'wmkit/kit';
import { noop } from 'wmkit/noop';

import * as _ from '../../../wmkit/common/util'; // added by scx
import { msg, Relax } from 'plume2';
import LinearGradient from 'react-native-linear-gradient';
import { isAndroid, screenWidth, mainColor } from 'wmkit/styles/index';
import {BoxShadow} from 'react-native-shadow';
import {debounce} from 'lodash';

@Relax
export default class Header extends React.Component {
  static relaxProps = {
    customer: 'customer',
    init: noop,
    growthValueIsOpen: 'growthValueIsOpen',
    pointsIsOpen: 'pointsIsOpen',
    noticeNum: 'noticeNum',
    signFlag: 'signFlag',
    preferentialNum: 'preferentialNum'
  };

  render() {
    const {
      customer,
      init,
      preferentialNum,
      noticeNum,
      signFlag
    } = this.props.relaxProps;
    const account = customer.get('customerAccount');
    const visible = WMkit.isLoginOrNotOpen();

    //企业会员
    let isIepCustomer = this._isIepCustomer(customer.get('customerLabelList'));
    const enterpriseCustomerLogo =
      customer.get('enterpriseCustomerLogo') &&
      JSON.parse(customer.get('enterpriseCustomerLogo'))[0].url;
      const shadowOpt = {
        width: 62,
        height: 62,
        color: '#a0d8ff',
        border: 6,
        radius: 31,
        opacity: 0.2,
        x: 0,
        y: 1,
        style: {}};
    return (
      <LinearGradient
        colors={[mainColor, mainColor]}
        style={styles.container}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <SafeAreaView style={styles.box}>
          <Text allowFontScaling={false} style={styles.title}>
            我的
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.iconBox, styles.iconMes]}
            onPress={debounce(() => {
              if (!WMkit.isLoginOrNotOpen()) {
                msg.emit('loginModal:toggleVisible', {
                  callBack: () => {
                    msg.emit('router: goToNext', { routeName: 'PushCenter' });
                  }
                });
              } else {
                msg.emit('router: goToNext', { routeName: 'PushCenter' });
              }
            }, 500)}
          >
            <Image style={styles.icon} source={require('../img/message.png')} />
            {(noticeNum !== 0 || preferentialNum !== 0) && (
              <View style={styles.round}>
                <Text style={[styles.roundText, { color: mainColor }]}>
                  {noticeNum + preferentialNum > 99
                    ? '99+'
                    : noticeNum + preferentialNum}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconBox}
            onPress={debounce(() => {
              if (!WMkit.isLoginOrNotOpen()) {
                msg.emit('loginModal:toggleVisible', {
                  callBack: () => {
                    msg.emit('router: goToNext', { routeName: 'Settings' });
                  }
                });
              } else {
                msg.emit('router: goToNext', { routeName: 'Settings' });
              }
            }, 500)}
          >
            <Image style={styles.icon} source={require('../img/setting.png')} />
          </TouchableOpacity>
          <View style={styles.row}>
            <BoxShadow setting={shadowOpt}>
              <Image
                style={styles.defaultImg}
                source={
                  customer.get('headImg')
                    ? { uri: customer.get('headImg') }
                    : require('wmkit/theme/beluga.png')
                }
              />
            </BoxShadow>
            <View style={styles.rightBox}>
              <View style={styles.rowFlex}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.touchUserName}
                  onPress={debounce(() => {
                    if (visible) {
                      return null;
                    }
                    msg.emit('loginModal:toggleVisible', {
                      callBack: init
                    });
                  }, 500)}
                >
                  <Text
                    style={styles.UserName}
                    allowFontScaling={false}
                    numberOfLines={1}
                  >
                    {visible ? customer.get('customerName') : '登录/注册 >'}
                  </Text>
                </TouchableOpacity>
              </View>

              {account && (
                <Text style={styles.num} allowFontScaling={false}>
                  {account.substr(0, 3) + '****' + account.substr(7, 4)}
                </Text>
              )}
              {/*{account && this.checkIsOpen()}*/}
            </View>
            {account && (
              <TouchableOpacity
                onPress={debounce(() => {
                  if (!WMkit.isLoginOrNotOpen()) {
                    msg.emit('loginModal:toggleVisible', {
                      callBack: () => {
                        msg.emit('router: goToNext', { routeName: 'Sign' });
                      }
                    });
                  } else {
                    msg.emit('router: goToNext', { routeName: 'Sign' });
                  }
                }, 500)}
                style={styles.signBox}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['rgba(255,255,255,.8)', '#fefffe']}
                  style={styles.signBtn}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                >
                  <Image
                    style={[styles.singIcon, {tintColor: mainColor}]}
                    source={require('wmkit/theme/sign-in.png')}
                  />
                  <Text
                    style={[styles.signText, { color: mainColor }]}
                    allowFontScaling={false}
                  >
                    {signFlag ? '已签到' : '签到'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  /**
   * 是否企业会员
   * @param customerLabelList
   * @private
   */
  _isIepCustomer = (customerLabelList) => {
    if (customerLabelList) {
      return (
        customerLabelList.size > 0 &&
        customerLabelList.indexOf('enterprise-customer') > -1
      );
    }
    return false;
  };

  checkIsOpen = () => {
    const { customer, growthValueIsOpen, pointsIsOpen } = this.props.relaxProps;

    if (growthValueIsOpen && pointsIsOpen) {
      return (
        <TouchableOpacity style={styles.growthValue} activeOpacity={0.8}>
          <Text
            style={styles.growthText}
            allowFontScaling={false}
            onPress={debounce(() =>
              msg.emit('router: goToNext', {
                routeName: 'MemberCenter'
              })
            , 500)}
          >
            成长值:
            {customer.get('growthValue') || 0}
          </Text>
          {/* <Text
            style={styles.growthText}
            allowFontScaling={false}
            onPress={() =>
              msg.emit('router: goToNext', {
                routeName: 'PointsList'
              })
            }
          >
            积分值:
            {customer.get('pointsAvailable') || 0}
          </Text> */}
        </TouchableOpacity>
      );
    } else if (!growthValueIsOpen && pointsIsOpen) {
      //成长值关闭，积分开启
      return (
        <TouchableOpacity
          style={styles.growthValue}
          activeOpacity={0.8}
          onPress={debounce(() =>
            msg.emit('router: goToNext', {
              routeName: 'PointsList'
            })
          , 500)}
        >
          <Text style={styles.growthText} allowFontScaling={false}>
            积分值:
            {customer.get('pointsAvailable') || 0}
          </Text>
        </TouchableOpacity>
      );
    } else if (growthValueIsOpen && !pointsIsOpen) {
      return (
        <TouchableOpacity
          style={styles.growthValue}
          activeOpacity={0.8}
          onPress={debounce(() =>
            msg.emit('router: goToNext', {
              routeName: 'MemberCenter'
            })
          , 500)}
        >
          <Text style={styles.growthText} allowFontScaling={false}>
            成长值:
            {customer.get('growthValue') || 0}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };
}

const styles = StyleSheet.create({
  container: {
    height: 248,
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: 'hidden'
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
    fontSize: 16,
    backgroundColor: 'transparent',
    position: 'absolute',
    ..._.ifIphoneX(
      {
        top: 40
      },
      {
        top: isAndroid ? 40 : 30
      }
    )
  },
  iconBox: {
    position: 'absolute',
    paddingVertical: 10,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    right: 2,
    ..._.ifIphoneX(
      {
        top: 30
      },
      {
        top: isAndroid ? 30 : 20
      }
    ),
    ..._.ifIphoneXR({
      top: 30
    })
  },
  iconMes: {
    right: 36
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#fff'
  },
  imgBox: {
    width: 62,
    height: 62,
    shadowColor: '#a0d8ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  defaultImg: {
    width: 62,
    height: 62,
    // resizeMode: 'contain'
    borderRadius:50
  },
  row: {
    paddingLeft: 20,
    flexDirection: 'row',
    marginTop: isAndroid ? 20 : 0,
    alignItems: 'center',
    width: '100%'
  },
  touchUserName: {
    borderColor: 'transparent',
    borderWidth: 10,
    borderLeftWidth: 0,
    borderRightWidth: 0
  },
  UserName: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 16,
    maxWidth: 130
  },
  num: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 12,
    marginBottom: 4,
    marginTop: -8
  },
  rightBox: {
    alignItems: 'flex-start',
    marginLeft: 12
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  growthValue: {
    height: 21,
    borderRadius: 10.5,
    paddingHorizontal: 8,
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center'
  },
  growthText: {
    color: '#fff',
    fontSize: 12
  },
  signBox: {
    position: 'absolute',
    right: 15,
  },
  signBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 68,
    height: 28,
    borderRadius: 14
  },
  singIcon: {
    width: 12,
    height: 12,
    marginRight: 4
  },
  signText: {
    fontSize: 12
  },
  round: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginLeft: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  roundText: {
    fontSize: 10
  },
  labelType: {
    marginLeft: 4,
    height: 18,
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: 'black',
    alignItems: 'center',
    paddingHorizontal: 7,
    justifyContent: 'center',
    paddingBottom: 0
  },
  labelLogo: {
    width: 14,
    height: 14,
    marginRight: 1
  },
  labelName: {
    fontSize: 10,
    fontWeight: '700',
    // marginLeft:2,
    color: '#fff'
  }
});
