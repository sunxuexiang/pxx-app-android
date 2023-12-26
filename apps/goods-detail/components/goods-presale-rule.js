import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Relax } from 'plume2';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { screenWidth, screenHeight, isAndroid } from 'wmkit/styles/index';
import { noop } from 'wmkit/noop';

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

@Relax
export default class preSaleRuleVisible extends Component {
  static relaxProps = {
    ruleContent: 'ruleContent',
    changePreSaleRuleVisible: noop
  };

  render() {
    let { ruleContent, changePreSaleRuleVisible } = this.props.relaxProps;

    let ruleInfo = ruleContent[1] ? ruleContent[1].content : '';

    return (
      <View style={styles.mask}>
        <View style={styles.mainBox}>
          <ScrollView style={styles.main}>
            <AutoHeightWebView
              enableBaseUrl={true}
              source={{
                html: styleHtml + `<p>${ruleInfo}</p>`
              }}
              scalesPageToFit={isAndroid ? true : false}
              style={{ width: '100%' }}
            />
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.close}
          activeOpacity={0.8}
          onPress={() => changePreSaleRuleVisible()}
        >
          <Image
            style={styles.closeImg}
            source={require('../img/rule-close.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const imgWidth = Number.parseInt(screenWidth * 0.8 + '');
const imgHeight = Number.parseInt(screenHeight * 0.6 + '');
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
  mainBox: {
    flex: 1,
    padding: 20,
    width: imgWidth,
    minHeight: imgHeight * 0.5,
    maxHeight: imgHeight,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fdfdfd'
  },
  main: {
    width: '100%'
  },
  close: {
    marginTop: 20
  },
  closeImg: {
    width: 43,
    height: 43
  }
});
