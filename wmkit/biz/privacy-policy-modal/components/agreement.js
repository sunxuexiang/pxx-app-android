import React from 'react';
import {
  View,
  ScrollView,
  Platform,
  StyleSheet, TouchableOpacity, Image
} from 'react-native';

import AutoHeightWebView from 'react-native-autoheight-webview';
import { Relax } from 'plume2';
import { isAndroid, screenWidth } from 'wmkit/styles/index';
import * as _ from 'wmkit/common/util';
import { Header } from '@/wmkit';

const styleHtml = ` 
 <style type="text/css">
	img {width: 100%; padding: 0; margin: 0; border: 0}
	p,li,ul { padding:0 3px; margin: 0; }
 </style> 
 <meta name="format-detection" content="telephone=no" />
 <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
`;

@Relax
export default class PrivacyPolicyAgreement extends React.Component {
  static relaxProps = {
    closeAgreement: () => {},
    registerContent: 'registerContent',
    privacyPolicyContent: 'privacyPolicyContent',
    showFlag: 'showFlag',

  };

  componentDidMount() {}

  render() {
    const {  registerContent,privacyPolicyContent,showFlag,closeAgreement } = this.props.relaxProps;
    let showContent = '';
    let title = '';
    if(showFlag === 1){
      showContent = registerContent;
      title = '会员注册协议';
    }else if (showFlag === 2){
      showContent = privacyPolicyContent;
      title = '隐私政策';
    }
    return (
      <View style={styles.agreeContent}>
        {/*关闭注册协议，保留注册弹窗*/}
        <Header
          title={title}
          onLeftMenuPress={() => {
            closeAgreement();
          }}
        />
        <ScrollView>
          <AutoHeightWebView
            enableBaseUrl={true}
            source={{
              html: styleHtml + showContent
            }}
            style={{ width: screenWidth - 24, marginLeft: 12 }}
            scalesPageToFit={Platform.OS === 'android' ? true : false}
          />
        </ScrollView>
      </View>
    );
  }


}


const styles = StyleSheet.create({
  agreeContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#fff'
  },
  container: {
    ..._.ifIphoneX(
      {
        paddingTop: 35,
        height: 80
      },
      {
        height: isAndroid ? 50 : 60,
        paddingTop: isAndroid ? 0 : 15
      }
    ),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ececec'
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '400'
  },
  img: {
    tintColor: '#000',
    width: 10,
    height: 18
  }
});
