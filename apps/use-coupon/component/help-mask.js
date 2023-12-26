import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView
} from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import { screenHeight, screenWidth } from 'wmkit/styles/index';
import AutoHeightWebView from 'react-native-autoheight-webview';

const styleHtml = ` 
 <style type="text/css">
 body{width:calc(100% - 120px)}
  p,li,ul { padding:0 3px; margin: 0; }
  p{font-size:14px;color:#333}
  p.title{margin-bottom:15px;}
 </style> 
 <meta name="format-detection" content="telephone=no" />
 <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
`;

@Relax
export default class HelpMask extends React.Component {
  static relaxProps = {
    changeHelp: noop
  };
  render() {
    const { changeHelp } = this.props.relaxProps;
    return (
      <View style={styles.content}>
        <View style={styles.maskBox} />
        <View style={styles.contentMask}>
          <View style={styles.main}>
            <ScrollView style={styles.mainBox}>
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                style={styles.title}
              >
                优惠券使用说明
              </Text>
              <AutoHeightWebView
                enableBaseUrl={true}
                source={{
                  html:
                    styleHtml +
                    `<p>1、优惠券有使用期限限制，过了有效期不能使用；</p>
                  <p>2、每家店铺只能使用一张店铺券；</p>
                  <p>3、每次提交的订单只能使用一张通用券；</p>
                  <p>4、每次提交的订单只能使用一张运费券；</p>
                  <p>5、商品需在排除满系营销活动的优惠金额后判断是否满足店铺券使用门槛；</p>
                  <p>6、商品需在排除满系营销活动以及店铺券的优惠金额后判断是否满足通用券使用门槛；</p>
                  <p>7、订单需在排除满系营销活动、店铺券以及通用券的优惠金额后判断是否满足运费券使用门槛；</p>`
                }}
                scalesPageToFit={false}
                style={{
                  width: (624 / 750) * screenWidth + 80
                }}
              />
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
    paddingVertical: 20,
    borderRadius: 8,
    overflow: 'hidden'
  },
  title: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: 12
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
    paddingLeft: 13
  }
});
