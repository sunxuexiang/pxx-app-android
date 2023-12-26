import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AutoHeightWebView from 'react-native-autoheight-webview';

import Check from 'wmkit/check';
import { screenWidth, mainColor, isAndroid } from 'wmkit/styles/index';
import { msg } from 'plume2';
import { cache } from '../../index';
import LinearGradient from 'react-native-linear-gradient';
const updateBg = require('./img/update.png');
const styleHtml = ` 
 <style type="text/css">
  body{width: 100%}
  * { padding:0 3px; margin: 0; }
  li{clear: both;}
  p{font-size:14px;color:#000;}
  p.title{font-size: 17px;}
 </style> 
 <meta name="format-detection" content="telephone=no" />
 <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
`;

/**
 * 版本升级弹窗
 */
export default class UpdateModal extends React.PureComponent {
  UNSAFE_componentWillMount() {
    msg.on('upgrade-modal:visible', this._initModel);
  }

  componentWillUnmount() {
    msg.off('upgrade-modal:visible', this._initModel);
  }

  constructor(props) {
    super(props);
    this.state = {
      //版本升级弹框可见性
      modalVisible: false,
      //版本配置信息
      upgradeInfo: {},
      // 版本升级描述
      upgradeDesc: '',
      //不再提醒
      noticeChecked: false
    };
  }

  render() {
    const {
      modalVisible,
      upgradeInfo,
      noticeChecked,
      upgradeDesc
    } = this.state;

    if (!upgradeInfo) {
      return null;
    }
    return (
      modalVisible && (
        <View style={styles.mask}>
          <Image style={styles.updateHeader} source={updateBg} />
          <View style={styles.updateContent}>
            <View style={styles.mainBox}>
              <ScrollView style={styles.main}>
                <AutoHeightWebView
                  enableBaseUrl={true}
                  source={{
                    html:
                      styleHtml +
                      `<p class="title">新版本更新！</p>
                  <p>${upgradeDesc}</p>`
                  }}
                  scalesPageToFit={isAndroid ? true : false}
                  style={{ width: '100%' }}
                />
              </ScrollView>
            </View>

            <View style={styles.bottom}>
              {/* {upgradeInfo.get('forceUpdateFlag') == 0 && (
                <TouchableOpacity
                  style={[styles.flexBottom, styles.borderRight]}
                  activeOpacity={0.8}
                  onPress={() =>
                    this._notUpgrade(upgradeInfo.get('latestVersion'))
                  }
                >
                  <Text style={styles.cancleText} allowFontScaling={false}>
                    暂不更新
                  </Text>
                </TouchableOpacity>
              )} */}

              <TouchableOpacity
                onPress={() => this._upgradeImmediately(upgradeInfo)}
                activeOpacity={0.8}
              >
                <LinearGradient
                    colors={[mainColor, mainColor]}
                    style={styles.flexBottom}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                  >
                    <Text style={styles.submitText} allowFontScaling={false}>
                      立即更新
                    </Text>
                </LinearGradient>

              </TouchableOpacity>
            </View>

            {upgradeInfo.get('forceUpdateFlag') == 0 && (
                <View style={styles.checkItem}>
                  <Check
                    disable={false}
                    checked={noticeChecked}
                    onCheck={() => this._noticeLess()}
                  />
                  <Text style={styles.tips} allowFontScaling={false}>
                    不再提醒
                  </Text>
                </View>
              )}
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={()=> this._notUpgrade(upgradeInfo.get('latestVersion'))} style={styles.closeBox}>
          <Image source={require('./img/close.png')} style={styles.close} />
        </TouchableOpacity>
        </View>
      )
    );
  }

  /**
   * 初始化弹框
   * @param upgradeInfo
   * @private
   */
  _initModel = (params) => {
    const { upgradeInfo, modalVisible, upgradeDesc } = params;
    this.setState({
      upgradeInfo,
      modalVisible: modalVisible,
      upgradeDesc: upgradeDesc,
      noticeChecked: false
    });
  };

  /**
   * 立即更新，跳转相应的下载地址
   * @param upgradeInfo
   * @private
   */
  _upgradeImmediately = (upgradeInfo) => {
    Linking.openURL(
      isAndroid
        ? upgradeInfo.get('androidAddress')
        : `itms-services://?action=download-manifest&url=${upgradeInfo.get(
            'appAddress'
          )}`
    );
  };

  /**
   * 不再提醒
   * @private
   */
  _noticeLess = () => {
    this.setState({ noticeChecked: !this.state.noticeChecked });
  };

  /**
   * 暂不更新
   * @private
   */
  _notUpgrade = (latestVersion) => {
    let noticeChecked = this.state.noticeChecked;
    //不再提醒
    if (noticeChecked) {
      //不再提醒 false  提醒 true
      AsyncStorage.setItem(
        cache.DO_NOT_NOTICE_AGAIN,
        JSON.stringify({ cacheVersion: latestVersion })
      );
    }
    //关闭弹窗
    this.setState({ modalVisible: !this.state.modalVisible });
    msg.emit('isMagicModalFlag:show');
  };
}

const imgWidth = Number.parseInt(screenWidth * 0.78 + '');
const imgHeight = Number.parseInt(imgWidth * 0.445 + '');
const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  updateHeader: {
    width: imgWidth,
    height: imgWidth / 2.692,
    position:'relative',
    top:12,
    zIndex:9
  },
  updateContent: {
    width: imgWidth,
    // minHeight: imgWidth * 0.5,
    // maxHeight: imgWidth * 0.76,
    height:imgWidth / 0.921,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fdfdfd',
    borderBottomLeftRadius:6,
    borderBottomRightRadius:6,
    paddingTop:24
    // paddingTop: imgWidth * 0.445
  },
  mainBox: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20
  },
  main: {
    width: '100%'
  },
  checkItem: {
    width: '100%',
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center'
  },
  tips: {
    marginLeft: 5,
    color: '#999',
    fontSize: 14
  },
  bottom: {
    flexDirection: 'row',
    justifyContent:'center',
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: '#eee'
  },
  borderRight: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#eee'
  },
  flexBottom: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    width:240,
    borderRadius:18,
    marginBottom:10
  },
  cancelText: {
    color: '#333',
    fontSize: 16
  },
  submitText: {
    color: '#fff',
    fontSize: 16
  },
  closeBox:{
    width:40,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    marginTop:16
  },
  close:{
    width:40,
    height:40,
  },
});
