import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import { Relax, msg } from 'plume2';
import { noop } from 'wmkit/noop';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavItem from './nav-item';

import { mainColor } from 'wmkit/styles/index';
import * as _ from 'wmkit/common/util';

@Relax
export default class Container extends React.Component {
  static relaxProps = {
    customer: 'customer',
    shareInfo: 'shareInfo',
    changeModelVisible: noop,
    upgradeInfo: 'upgradeInfo',
    logout: noop,
    userRegistrationAgreement: noop,
    toggleShowPrivacyPolicyAgreement: noop
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      customer,
      shareInfo,
      changeModelVisible,
      upgradeInfo,
      logout,
      userRegistrationAgreement,
      toggleShowPrivacyPolicyAgreement
    } = this.props.relaxProps;

    const account = customer.get('customerAccount');

    //是否企业会员
    let isIepCustomer = this._isIepCustomer(customer.get('customerLabelList'));

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          alwaysBounceVertical={false}
        >
          <View style={styles.avatarBox}>
            <Image
              style={styles.avatar}
              source={
                customer.get('headImg')
                  ? { uri: customer.get('headImg') }
                  : require('wmkit/theme/beluga.png')
              }
            />
            <View style={{ flex: 1 }}>
              <Text
                style={styles.useName}
                numberOfLines={1}
                allowFontScaling={false}
              >
                {customer.get('customerName')}
              </Text>
              <Text style={styles.useNum} allowFontScaling={false}>
                {account
                  ? account.substr(0, 3) + '****' + account.substr(7, 4)
                  : null}
              </Text>
            </View>
          </View>
          <NavItem
            style={styles.basis}
            title="基础信息"
            onPress={() =>
              msg.emit('router: goToNext', { routeName: 'UserInfo' })
            }
          />
          <View style={styles.column}>
            {isIepCustomer && (
              <NavItem
                title="公司信息"
                onPress={() =>
                  msg.emit('router: goToNext', { routeName: 'IepInfo' })
                }
              />
            )}
            <NavItem
              title="财务信息"
              onPress={() =>
                msg.emit('router: goToNext', { routeName: 'UserFinance' })
              }
            />
            <NavItem
              title="收货地址"
              onPress={() =>
                msg.emit('router: goToNext', {
                  routeName: 'UserReceiveAddress',
                  whereFrom:'UserCenter'
                })
              }
            />
            <NavItem
              title="账户安全"
              onPress={() =>
                msg.emit('router: goToNext', { routeName: 'UserSafe' })
              }
            />
          </View>

          {/* <View style={styles.column}>
            <NavItem
              title="关于我们"
              onPress={() => {
                msg.emit('router: goToNext', {
                  routeName: 'AboutUs'
                });
              }}
            />
          </View> */}
          <View style={styles.margin}>
            <NavItem
              title="关于我们"
              onPress={() => {
                msg.emit('router: goToNext', {
                  routeName: 'AboutUs'
                });
              }}
            />
            {shareInfo &&
              shareInfo.get('enabled') && (
                <NavItem
                  title="分享APP"
                  onPress={() => changeModelVisible(true)}
                />
              )}
            <NavItem
              title="消息推送设置"
              onPress={() => {
                msg.emit('router: goToNext', {
                  routeName: 'PushSetting'
                });
              }}
            />
            <NavItem
              title="版本号"
              onPress={() =>
                upgradeInfo
                  ? msg.emit('router: goToNext', {
                      routeName: 'Version',
                      upgradeInfo: upgradeInfo
                    })
                  : null
              }
              renderRight={() => {
                return (
                  <View style={styles.version}>
                    {upgradeInfo &&
                      upgradeInfo.get('dotShow') && (
                        <Image
                          style={styles.round}
                          source={require('../img/new.png')}
                        />
                      )}
                    <Text style={styles.versionText} allowFontScaling={false}>
                      {upgradeInfo && upgradeInfo.get('latestVersion')}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.bottom}>
          <View style={styles.textBtnRow}>
            <TouchableOpacity
              style={[styles.textBtn, {borderRightWidth: 1, borderRightColor: mainColor}]}
              activeOpacity={0.8}
              onPress={() => userRegistrationAgreement()}
            >
              <Text allowFontScaling={false} style={[styles.text, { color: mainColor }]}>
                用户协议
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.textBtn}
              activeOpacity={0.8}
              onPress={() => toggleShowPrivacyPolicyAgreement()}
            >
              <Text allowFontScaling={false} style={[styles.text, { color: mainColor }]}>
                隐私政策
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={() => logout()}
          >
            <Text allowFontScaling={false} style={styles.btnText}>
              退出账号
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    paddingBottom: 12
  },
  basis: {
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8
  },
  column: {
    // flexDirection: 'column',
    marginTop: 12,
    overflow: 'hidden',
    borderRadius: 8
  },
  avatarBox: {
    padding: 12,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb',
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    marginRight: 12,
    width: 52,
    height: 52,
    borderRadius: 25,
    borderColor: '#ebebeb',
    borderWidth: StyleSheet.hairlineWidth
  },
  useName: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 18,
    // lineHeight: 18,
    marginBottom: 8
  },
  useNum: {
    fontSize: 14,
    lineHeight: 14,
    color: 'rgba(0,0,0,0.4)'
  },
  margin: {
    marginTop: 12,
    borderRadius: 8,
    overflow: 'hidden'
  },
  version: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  versionText: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 12
  },
  round: {
    // position: 'absolute',
    // left: 0,
    width: 26,
    height: 12
  },
  bottom: {
    paddingBottom: 10
  },
  textBtnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12
  },
  textBtn: {
    paddingHorizontal: 8
  },
  text: {
    fontSize: 12
  },
  btn: {
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  btnText: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14
  }
});
