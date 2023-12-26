import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Platform
} from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import { screenWidth, isAndroid } from 'wmkit/styles/index';
import AutoHeightWebView from 'react-native-autoheight-webview';

const styleHtml = ` 
 <style type="text/css">
  body{width: 100%;}
  * { padding:0 3px; margin: 0; }
  li{clear: both;}
  p{font-size:14px;color:#000;}
  img{max-width: 100%;vertical-align: middle}
 </style> 
 <meta name="format-detection" content="telephone=no" />
 <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
`;

@Relax
export default class DetailDesc extends React.Component {
  static relaxProps = {
    closeDetailLayout: noop,
    detailList: 'detailList',
    detailVisible: 'detailVisible'
  };

  render() {
    const {
      closeDetailLayout,
      detailList,
      detailVisible
    } = this.props.relaxProps;
    return (
      detailVisible && (
        <View style={styles.modal}>
          <View style={styles.content}>
            <ScrollView style={styles.main}>
              <AutoHeightWebView
                enableBaseUrl={true}
                source={{ html: styleHtml + detailList }}
                style={{
                  width: screenWidth * 0.8 - 20
                }}
                scalesPageToFit={false}
              />
            </ScrollView>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.closeBox}
            onPress={closeDetailLayout}
          >
            <Image style={styles.close} source={require('../img/close.png')} />
          </TouchableOpacity>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex:1,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    width: '80%',
    maxHeight: '80%',
    backgroundColor: '#fff'
  },
  main: {
    width: '100%',
    padding: 10
  },
  closeBox: {
    padding: 15
  },
  close: {
    width: 40,
    height: 40
  }
});
