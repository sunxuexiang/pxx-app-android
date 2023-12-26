import React from 'react';
import {
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';

import AutoHeightWebView from 'react-native-autoheight-webview';
import { Relax } from 'plume2';
import { isAndroid } from 'wmkit/styles/index';
import * as _ from '../../common/util';

const styleHtml = ` 
 <style type="text/css">
 body {font-size: 14px;word-break: break-all;}
	img {width: 100%; padding: 0; margin: 0; border: 0}
	p,li,ul { padding:0 3px; margin: 0; }
 </style> 
 <meta name="format-detection" content="telephone=no" />
 <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
`;

@Relax
export default class Agreement extends React.Component {
  static relaxProps = {
    toggleShowEnterpriseAgreement: () => {},
    registerEnterpriseContent: 'registerEnterpriseContent'
  };

  componentDidMount() {}

  render() {
    const { toggleShowEnterpriseAgreement, registerEnterpriseContent } = this.props.relaxProps;
    return (
      <View style={styles.agreeContent}>
        <View style={styles.container}>
          {/*关闭注册协议，保留注册弹窗*/}
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ paddingLeft: 10, paddingRight: 30 }}
            onPress={() => toggleShowEnterpriseAgreement()}
          >
            <Image style={styles.img} source={require('../img/back.png')} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <AutoHeightWebView
            enableBaseUrl={true}
            source={{
              html: styleHtml + registerEnterpriseContent
            }}
            scalesPageToFit={Platform.OS === 'android'}
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
