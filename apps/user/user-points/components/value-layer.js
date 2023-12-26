import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform
} from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { screenWidth, screenHeight, isAndroid } from 'styles';
const styleHtml = ` 
 <style type="text/css">
  body {font-size: 14px;word-break: break-all;}
	img {max-width: 100%; padding: 0; margin: 0; border: 0}
	p,li,ul { padding:0 3px; margin: 0; }
	li {clear: both;}
 </style> 
 <meta name="format-detection" content="telephone=no" />
 <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
`;

@Relax
export default class ValueLayer extends React.Component {
  static relaxProps = {
    layerVisible: 'layerVisible',
    changeLayer: noop,
    pointsRule: 'pointsRule'
  };

  render() {
    const { layerVisible, changeLayer, pointsRule } = this.props.relaxProps;
    return (
      layerVisible && (
        <View style={styles.mask}>
          <View style={styles.content}>
            <View style={{height: '100%'}}>
              <Text style={styles.title} allowFontScaling={false}>
                积分规则
              </Text>
              <AutoHeightWebView
                enableBaseUrl={true}
                source={{ html: styleHtml + pointsRule }}
                style={{
                  width: '100%'
                }}
                scalesPageToFit={false}
              />
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => changeLayer()}>
            <Image style={styles.close} source={require('../img/close.png')} />
          </TouchableOpacity>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    backgroundColor: '#fff',
    width: screenWidth * 0.82,
    paddingHorizontal: 15,
    maxHeight: screenHeight * 0.72
  },
  title: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 15
  },
  infoText: {
    lineHeight: 16,
    fontSize: 12,
    color: '#000'
  },
  close: {
    width: 40,
    height: 40,
    marginTop: 30
  }
});
