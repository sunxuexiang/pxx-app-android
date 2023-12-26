import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  Linking,
  NativeModules
} from 'react-native';
import api from 'api';
import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { mainColor, isAndroid } from 'wmkit/styles/index';
import { msg } from 'plume2';

type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, T.IInfoState>(
  store2Props,
  actions
)
export default class Info extends React.Component<
Partial<IInfoProps>,
T.IInfoState
> {
  constructor(props: IInfoProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: { action },
      main
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.tipsBox}>
          <Image source={require('../img/warning.png')} style={[styles.img, { tintColor: mainColor }]} />
          <Text style={[styles.tipsText, { color: mainColor }]} allowFontScaling={false}>
            为了您的夜间休息，在22:00至7:00之间不会推送以下消息
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.leftText} allowFontScaling={false}>
            新消息通知
          </Text>
          {main.isShow ? (
            <Text style={styles.rightText} allowFontScaling={false}>
              已开启 可在设置-通知中关闭
            </Text>
          ) : isAndroid ? (
            <Switch
              trackColor={{ true: mainColor }}
              thumbColor={main.initShow ? mainColor : '#eee'}
              value={main.initShow}
              onValueChange={(e) => {
                // await this.switchNotice(e);
                NativeModules.MessageModule.setMessageSetting();
              }}
            />
          ) : (
                <TouchableOpacity
                  style={styles.rowFlex}
                  onPress={() => Linking.openURL('app-settings:')}
                >
                  <Text style={styles.rightText} allowFontScaling={false}>
                    已关闭 点击开启
              </Text>
                  <Image
                    source={require('../img/arrow.png')}
                    style={styles.arrow}
                  />
                </TouchableOpacity>
              )}
        </View>
        {(main.isShow || main.initShow) && (
          <View style={styles.marginT}>
            {main.pushState.orderProgressRate !== null && (
              <View style={styles.item}>
                <Text style={styles.leftText} allowFontScaling={false}>
                  订单进度通知
                </Text>
                <Switch
                  thumbTintColor={true ? '#fff' : '#f4f3f4'}
                  value={!!main.pushState.orderProgressRate}
                  trackColor={{ true: mainColor }}
                  thumbColor={!!main.pushState.orderProgressRate ? mainColor : '#eee'}
                  onValueChange={(e) =>
                    this.changeSwitch('orderProgressRate', e)
                  }
                />
              </View>
            )}
            {main.pushState.returnOrderProgressRate !== null && (
              <View style={styles.item}>
                <Text style={styles.leftText} allowFontScaling={false}>
                  退单进度通知
                </Text>
                <Switch
                  thumbTintColor={true ? '#fff' : '#f4f3f4'}
                  value={!!main.pushState.returnOrderProgressRate}
                  trackColor={{ true: mainColor }}
                  thumbColor={!!main.pushState.returnOrderProgressRate ? mainColor : '#eee'}

                  onValueChange={(e) =>
                    this.changeSwitch('returnOrderProgressRate', e)
                  }
                />
              </View>
            )}
            {main.pushState.distribution !== null && (
              <View style={styles.item}>
                <Text style={styles.leftText} allowFontScaling={false}>
                  分销业务通知
                </Text>
                <Switch
                  thumbTintColor={true ? '#fff' : '#f4f3f4'}
                  value={!!main.pushState.distribution}
                  trackColor={{ true: mainColor }}
                  thumbColor={!!main.pushState.distribution ? mainColor : '#eee'}

                  onValueChange={(e) => this.changeSwitch('distribution', e)}
                />
              </View>
            )}
            {main.pushState.accountAssets !== null && (
              <View style={styles.item}>
                <Text style={styles.leftText} allowFontScaling={false}>
                  账户资产通知
                </Text>
                <Switch
                  thumbTintColor={true ? '#fff' : '#f4f3f4'}
                  value={!!main.pushState.accountAssets}
                  trackColor={{ true: mainColor }}
                  thumbColor={!!main.pushState.accountAssets ? mainColor : '#eee'}

                  onValueChange={(e) => this.changeSwitch('accountAssets', e)}
                />
              </View>
            )}
            {main.pushState.accountSecurity !== null && (
              <View style={styles.item}>
                <Text style={styles.leftText} allowFontScaling={false}>
                  账号安全通知
                </Text>
                <Switch
                  thumbTintColor={true ? '#fff' : '#f4f3f4'}
                  value={main.pushState.accountSecurity === 1}
                  trackColor={{ true: mainColor }}
                  thumbColor={main.pushState.accountSecurity === 1 ? mainColor : '#eee'}

                  onValueChange={(e) => this.changeSwitch('accountSecurity', e)}
                />
              </View>
            )}
          </View>
        )}
      </View>
    );
  }

  switchNotice = async (e) => {
    let {
      actions: { action },
      main
    } = this.props;
    await action.commonChange([
      {
        paths: 'main.initShow',
        value: e
      }
    ]);
    await api.umengConfigController.modifyConfig({
      enableStatus: !main.initShow ? 1 : 0
    });
    msg.emit('app:tip', '操作成功');
  };

  changeSwitch = async (key, e) => {
    let {
      actions: { action },
      main
    } = this.props;
    await action.commonChange([
      {
        paths: `main.pushState.${key}`,
        value: e ? 1 : 0
      }
    ]);
    await api.umengConfigController.modifyConfig({
      [key]: e ? 1 : 0
    });
    msg.emit('app:tip', '操作成功');
  };
}

const styles = StyleSheet.create({
  container: {},
  tipsBox: {
    backgroundColor: '#cfe5f5',
    padding: 12,
    alignItems: 'center',
    flexDirection: 'row'
  },
  img: {
    width: 16,
    height: 16,
    marginRight: 8
  },
  tipsText: {
    fontSize: 12,
    lineHeight: 20
  },
  item: {
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  marginT: {
    marginTop: 12
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftText: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14
  },
  rightText: {
    color: '#999',
    fontSize: 12
  },
  arrow: {
    width: 12,
    height: 12,
    marginLeft: 8
  }
});
