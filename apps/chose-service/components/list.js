import React from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Platform
} from 'react-native';
import { Relax, msg } from 'plume2';
import { Confirm } from 'wmkit/modal/confirm';
@Relax
export default class List extends React.Component {
  static relaxProps = {
    serviceList: 'serviceList'
  };

  render() {
    const { serviceList } = this.props.relaxProps;
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <View style={styles.title}>
          {/* <Text allowFontScaling={false} style={styles.titleText}>
            选择客服
          </Text> */}
        </View>
        <View style={styles.container}>
          {serviceList &&
            serviceList.get('qqOnlineServerItemRopList') &&
            serviceList.get('qqOnlineServerItemRopList').map((item) => {
              return (
                <TouchableOpacity
                  key={item.get('serviceItemId')}
                  activeOpacity={0.8}
                  style={styles.nav}
                  onPress={() => {
                    this._openQQ(item.get('customerServiceAccount'));
                  }}
                >
                  <Image source={require('../img/qqserve.png')} style={styles.img} />
                  <Text allowFontScaling={false} style={styles.text}>
                    {item.get('customerServiceName')}
                  </Text>
                  <Image
                    source={require('../img/arrow.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
    );
  }

  /**
   * 调用本地qq客户端
   * 1.是否安装qq
   * 2.唤起qq客户端
   */
  _openQQ(qqNum) {
    Linking.canOpenURL('mqq://').then((supported) => {
      if (supported) {
        const downloadUrl =
          'mqqwpa://im/chat?chat_type=wpa&uin=' +
          qqNum +
          '&version=1&src_type=web';
        return Linking.openURL(downloadUrl);
      } else {
        if (Platform.OS === 'ios') {
          Confirm({
            title: '在线客服',
            text: '暂未安装手机QQ，无法打开，请先安装?',
            cancelText: '取消',
            okText: '确定',
            okFn: () =>
              Linking.openURL(
                'https://itunes.apple.com/cn/app/qq/id444934666?mt=8'
              )
          });
        } else {
          msg.emit('app:tip', '暂未安装手机QQ，无法打开，请先安装');
        }
      }
    });
  }
}

const styles = StyleSheet.create({
  title: {
    // height: 40,
    // justifyContent: 'center',
    // paddingHorizontal: 10,
    // backgroundColor: '#fafafa'
  },
  titleText: {
    color: '#666',
    fontSize: 12
  },
  container: {
    // borderTopWidth: 1 / PixelRatio.get(),
    // borderTopColor: '#ebebeb'
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    paddingVertical:14
  },
  text: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14,
    flex: 1
  },
  icon: {
    width: 12,
    height: 12
  },
  img: {
    width: 20,
    height: 20,
    marginRight: 12
  }
});
