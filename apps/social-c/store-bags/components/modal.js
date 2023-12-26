import React from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image
} from 'react-native';
import { Relax, msg } from 'plume2';
import AutoHeightWebView from 'react-native-autoheight-webview';

import SelfSalesLabel from 'wmkit/biz/selfsales-label';
import { screenWidth, isAndroid } from 'wmkit/styles/index';

const styleHtml = ` 
 <style type="text/css">
  body{width: 100%;padding: 10px}
  * { padding: 0; margin: 0; }
  li{clear: both;}
  p{font-size:14px;color:#000;}
  img{max-width: 100%;vertical-align: middle}
 </style> 
 <meta name="format-detection" content="telephone=no" />
`;

@Relax
export default class List extends React.Component {
  static relaxProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    const {} = this.props.relaxProps;
    let noneStock = true;
    return (
      <View style={styles.modal}>
        <View style={styles.content}>
          <ScrollView style={styles.main}>
            <AutoHeightWebView
              enableBaseUrl={true}
              source={{
                html:
                  styleHtml +
                  `<p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>
                    <p >12321321312312332</p>`
              }}
              scalesPageToFit={false}
              style={{ width: '100%' }}
            />
          </ScrollView>
        </View>

        <TouchableOpacity activeOpacity={0.8} style={styles.closeBox}>
          <Image style={styles.close} source={require('../img/close.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
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
    width: '80%',
    maxHeight: '80%',
    backgroundColor: '#fff'
  },
  main: {
    width: '100%'
  },
  closeBox: {
    padding: 15
  },
  close: {
    width: 40,
    height: 40
  }
});
