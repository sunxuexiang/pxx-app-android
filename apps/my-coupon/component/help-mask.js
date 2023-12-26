import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  ScrollView
} from 'react-native';
import { Relax } from 'plume2';

import { noop } from 'wmkit/noop';
import { screenHeight, screenWidth } from 'wmkit/styles/index';
import AutoHeightWebView from 'react-native-autoheight-webview';

import { couponDescQL } from '../ql';

const styleHtml = ` 
 <style type="text/css">
 body{width:calc(100% - 120px);}
 div,p,a,ul,li,span,h1,h2,h3,h4 { padding:0 3px; margin: 0; }
  div,p,a,ul,li,span,h1,h2,h3,h4{word-break:break-all;word-wrap:break-word}
 </style> 
 <meta name="format-detection" content="telephone=no" />
 <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
`;

@Relax
export default class HelpMask extends React.Component {
  static relaxProps = {
    couponDesc: couponDescQL,
    changeHelp: noop
  };
  render() {
    const { changeHelp, couponDesc } = this.props.relaxProps;
    return (
      <View style={styles.content}>
        <View style={styles.maskBox} />
        <View style={styles.contentMask}>
          <View style={styles.main}>
            <ScrollView style={styles.mainBox}>
              {couponDesc !== '' && (
                <AutoHeightWebView
                  enableBaseUrl={true}
                  source={{
                    html: styleHtml + couponDesc
                  }}
                  scalesPageToFit={false}
                  style={{
                    width: (624 / 750) * screenWidth + 80
                  }}
                />
              )}
            </ScrollView>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.close}
            onPress={() => changeHelp()}
          >
            <Image
              style={styles.closeImg}
              source={require('../img/close.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  maskBox: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#000',
    opacity: 0.5
  },
  contentMask: {
    width: (624 / 750) * screenWidth,
    position: 'absolute'
  },
  main: {
    backgroundColor: '#fff',
    paddingVertical: 20
  },

  close: {
    alignItems: 'center',
    marginTop: 30
  },
  closeImg: {
    width: 43,
    height: 43
  },
  mainBox: {
    maxHeight: screenHeight - 220,
    paddingHorizontal: 20,
    paddingLeft: 12
  }
});
