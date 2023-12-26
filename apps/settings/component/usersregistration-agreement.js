import React from 'react';
import {
  View,
  ScrollView,
  Platform,
  StyleSheet,
} from 'react-native';

import AutoHeightWebView from 'react-native-autoheight-webview';
import { Relax } from 'plume2';
import { isAndroid } from 'wmkit/styles/index';
import * as _ from 'wmkit/common/util';
import Header from 'wmkit/header';

const styleHtml = ` 
 <style type="text/css">
  html {font-size:12px;font-family: Helvetica Neue For Number, -apple-system, BlinkMacSystemFont, Segoe UI;}
	img {width: 100%; padding: 0; margin: 0; border: 0}
	p,li,ul { padding:0 3px; margin: 0; }
 </style> 
 <meta name="format-detection" content="telephone=no" />
 <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
`;

/**
 * 用户注册协议
 */
@Relax
export default class registerContentAgreement extends React.Component {
  static relaxProps = {
    userRegistrationAgreement: () => { },
    registerContent: 'registerContent',
  };
 
  componentDidMount() {
   }

  render() {
    const { userRegistrationAgreement, registerContent} = this.props.relaxProps;
    return (
      <View style={styles.agreeContent}>
        {/*关闭注册协议，保留注册弹窗*/}
        <Header
          title="用户协议"
          onLeftMenuPress={() => {
            userRegistrationAgreement();
          }}
        />
        <ScrollView>
          <AutoHeightWebView
            key={10}
            enableBaseUrl={true}
            source={{
              html: styleHtml + registerContent
            }}
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
    backgroundColor: '#fff',
    zIndex:999
  },
  leftImgBox: {
    position: 'absolute',
    left: 0
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
      },
    ),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ececec'
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
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

});
