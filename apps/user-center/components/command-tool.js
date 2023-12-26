import React from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { msg, Relax } from 'plume2';
import { screenWidth,mainColor } from 'wmkit/styles/index';
import { noop } from 'wmkit/noop';
import * as WMkit from 'wmkit/kit';
import {debounce} from 'lodash';

@Relax
export default class CommandTool extends React.Component {
  static relaxProps = {
    serviceList: 'serviceList',
    aliUrl: 'aliUrl',
    pointsIsOpen: 'pointsIsOpen',
    handleAliConsult: noop,
    customer: 'customer',
    evaluateIsOpen: 'evaluateIsOpen',
    isInvites: 'isInvites',
    employeeId: 'employeeId',
    jobNo: 'jobNo',
  };

  render() {
    let loginFlag = !WMkit.isLoginOrNotOpen();

    const { serviceList, pointsIsOpen, aliUrl, customer, evaluateIsOpen,isInvites,employeeId,jobNo } = this.props.relaxProps;
    // 判断qq客服是否开启
    let qqService =
      serviceList &&
      serviceList.get('qqOnlineServerItemRopList') &&
      serviceList.get('qqOnlineServerRop').get('effectiveApp') &&
      serviceList.get('qqOnlineServerItemRopList').size > 0;

    const childAccountEnter = customer && customer.get('customerRegisterType') &&
      customer.get('customerRegisterType') > 0
      && WMkit.isLogin()
      && !customer.get('parentId')
      && customer.get('enterpriseStatusXyy') == 2;
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <Text allowFontScaling={false} style={styles.text}>
            常用功能
          </Text>
        </View>
        <View style={styles.row}>
          {/*{pointsIsOpen && (*/}
          {/*<TouchableOpacity*/}
          {/*style={styles.item}*/}
          {/*activeOpacity={0.8}*/}
          {/*onPress={() =>*/}
          {/*msg.emit('router: goToNext', { routeName: 'PointsMall' })*/}
          {/*}*/}
          {/*>*/}
          {/*<Image*/}
          {/*source={require('../img/points-mall.png')}*/}
          {/*style={styles.img}*/}
          {/*/>*/}
          {/*<Text allowFontScaling={false} style={styles.dark}>*/}
          {/*积分商城*/}
          {/*</Text>*/}
          {/*</TouchableOpacity>*/}
          {/*)}*/}

          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.8}
            onPress={debounce(() => {
              if (!WMkit.isLoginOrNotOpen()) {
                msg.emit('loginModal:toggleVisible', {
                  callBack: () => {
                    msg.emit('router: goToNext', {
                      routeName: 'CouponCenter',
                      // whereFrom: 'UserCenter'
                    });
                  }
                });
              } else {
                msg.emit('router: goToNext', {
                  routeName: 'CouponCenter',
                  // whereFrom: 'UserCenter'
                });
              }
            }, 500)}
          >
            <Image source={require('wmkit/theme/coupon.png')} style={[styles.img, {tintColor: mainColor}]} />
            <Text allowFontScaling={false} style={styles.dark}>
              领券中心
            </Text>
          </TouchableOpacity>
          {evaluateIsOpen && <TouchableOpacity
            style={styles.item}
            activeOpacity={0.8}
            onPress={debounce(() => {
              if (!WMkit.isLoginOrNotOpen()) {
                msg.emit('loginModal:toggleVisible', {
                  callBack: () => {
                    msg.emit('router: goToNext', {
                      routeName: 'EvaluateCenter',
                      // whereFrom: 'UserCenter'
                    });
                  }
                });
              } else {
                msg.emit('router: goToNext', {
                  routeName: 'EvaluateCenter',
                  // whereFrom: 'UserCenter'
                });
              }
            }, 500)}
          >
            <Image source={require('wmkit/theme/evaluate.png')} style={[styles.img, {tintColor: mainColor}]} />
            <Text allowFontScaling={false} style={styles.dark}>
              评价中心
            </Text>
          </TouchableOpacity>}

          {/* <TouchableOpacity
            style={styles.item}
            activeOpacity={0.8}
            onPress={() => {
              if (!WMkit.isLoginOrNotOpen()) {
                msg.emit('loginModal:toggleVisible', {
                  callBack: () => {
                    msg.emit('router: goToNext', {
                      routeName: 'UserReceiveAddress',
                      // whereFrom: 'UserCenter'
                    });
                  }
                });
              } else {
                msg.emit('router: goToNext', {
                  routeName: 'UserReceiveAddress',
                  // whereFrom: 'UserCenter'
                });
              }
            }}
          >
            <Image source={require('../img/location.png')} style={styles.img} />
            <Text allowFontScaling={false} style={styles.dark}>
              收货信息
            </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={styles.item}
            activeOpacity={0.8}
            onPress={() =>
              msg.emit('router: goToNext', { routeName: 'GrouponCenter' })
            }
          >
            <Image
              source={require('../img/group-buy.png')}
              style={styles.img}
            />
            <Text allowFontScaling={false} style={styles.dark}>
              拼团购
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.8}
            onPress={debounce(() => {
              if (!WMkit.isLoginOrNotOpen()) {
                msg.emit('loginModal:toggleVisible', {
                  callBack: () => {
                    msg.emit('router: goToNext', {
                      routeName: 'EnterpriseApproval'
                    });
                  }
                });
              } else{
                msg.emit('router: goToNext', { routeName: 'EnterpriseApproval' })
              }
            }, 500)}
          >
            <Image
              source={require('wmkit/theme/enterprise.png')}
              style={[styles.img, {tintColor: mainColor}]}
            />
            <Text allowFontScaling={false} style={styles.dark}>
              企业认证
            </Text>
          </TouchableOpacity>
          {childAccountEnter ? (
            <TouchableOpacity
              style={styles.item}
              activeOpacity={0.8}
              onPress={debounce(() =>
                msg.emit('router: goToNext', { routeName: 'LinkChildAccount' }), 500)}
            >
              <Image
                source={require('wmkit/theme/child-account.png')}
                style={[styles.img, {tintColor: mainColor}]}
              />
              <Text allowFontScaling={false} style={styles.dark}>
                采购子账户
              </Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.item}
            onPress={debounce(async () => {
              // await this._choseService();
              msg.emit('router: goToNext', {
                routeName: 'SobotLink'
              });
            }, 500)}
          >
            <Image
              source={require('wmkit/theme/customer.png')}
              style={[styles.img, {tintColor: mainColor}]}
            />
            <Text allowFontScaling={false} style={styles.dark}>
              客服
            </Text>
          </TouchableOpacity>
          {isInvites && <TouchableOpacity
            activeOpacity={0.8}
            style={styles.item}
            onPress={debounce(async () => {
              msg.emit('router: goToNext', {
                routeName: 'GuideInvites',
                employeeId
              });
            }, 500)}
          >
            <Image
              source={require('wmkit/theme/guide-invites.png')}
              style={[styles.img, {tintColor: mainColor}]}
            />
            <Text allowFontScaling={false} style={styles.dark}>
              导购邀新
            </Text>
          </TouchableOpacity>}
          {/*<TouchableOpacity*/}
          {/*style={styles.item}*/}
          {/*activeOpacity={0.8}*/}
          {/*onPress={() => {*/}
          {/*if (!WMkit.isLoginOrNotOpen()) {*/}
          {/*msg.emit('loginModal:toggleVisible', {*/}
          {/*callBack: () => {*/}
          {/*msg.emit('router: goToNext', {*/}
          {/*routeName: 'PreBuy'});*/}
          {/*}*/}
          {/*});*/}
          {/*} else {*/}
          {/*msg.emit('router: goToNext', {*/}
          {/*routeName: 'PreBuy'*/}
          {/*});*/}
          {/*}*/}
          {/*}}*/}
          {/*>*/}
          {/*<Image*/}
          {/*source={require('../img/reservation-buy.png')}*/}
          {/*style={styles.img}*/}
          {/*/>*/}
          {/*<Text allowFontScaling={false} style={styles.dark}>*/}
          {/*预约购买*/}
          {/*</Text>*/}
          {/*</TouchableOpacity>*/}
        </View>
      </View>
    );
  }


  // 选择客服
  _choseService = async () => {
    const { aliUrl, handleAliConsult } = this.props.relaxProps;
    // 如果阿里云客服开启
    //@ts-ignore
    if (!!aliUrl) {
      if (WMkit.isLoginOrNotOpen()) {
        // 获取H5端url
        msg.emit('router: goToNext', {
          routeName: 'OnlineService',
          aliChatUrl: aliUrl
        });
      } else {
        msg.emit('loginModal:toggleVisible', {
          callBack: async () => {
            // 未登录先获取登陆后信息再获取H5端url
            const aliChatUrl = await handleAliConsult();
            msg.emit('router: goToNext', {
              routeName: 'OnlineService',
              aliChatUrl: aliChatUrl
            });
          }
        });
      }
    } else {
      if (!WMkit.isLoginOrNotOpen()) {
        msg.emit('loginModal:toggleVisible', {
          callBack: () => {
            msg.emit('router: goToNext', {
              routeName: 'ChoseService',
              // whereFrom: 'UserCenter'
            });
          }
        });
      } else {
        msg.emit('router: goToNext', {
          routeName: 'ChoseService',
          // whereFrom: 'UserCenter'
        });
      }
    }
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 12
  },
  nav: {
    // height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    paddingHorizontal: 12,
    paddingTop: 15
    // backgroundColor: '#ffffff'
  },
  text: {
    color: '#333',
    fontSize: 14
  },
  icon: {
    width: 7,
    height: 13,
    tintColor: '#000'
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    flexWrap: 'wrap'
  },
  img: {
    width: 22,
    height: 21,
    marginBottom: 8
  },
  item: {
    width: (screenWidth - 24) / 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginBottom: 15
  },
  dark: {
    color: '#999',
    fontSize: 12
  }
});
