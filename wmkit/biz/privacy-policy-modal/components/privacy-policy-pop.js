import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { Relax } from 'plume2';
import { isAndroid, screenWidth, mainColor } from 'wmkit/styles/index';

const styleHtml = ` 
 <style type="text/css">
	img {width: 100%; padding: 0; margin: 0; border: 0}
	p,li,ul { padding:0 3px; margin: 0; }
 </style> 
 <meta name="format-detection" content="telephone=no" />
 <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
`;

@Relax
export default class PrivacyPolicyPop extends React.Component {
  static relaxProps = {
    privacyPolicyPop: 'privacyPolicyPop',
    privacyPolicyId: 'privacyPolicyId',
    showPrivacyPolicy: () => {},
    refuse: () => {},
    readAndAgree: () => {},


  };

  componentDidMount() {}

  render() {
    const { privacyPolicyPop,showPrivacyPolicy,refuse,readAndAgree,privacyPolicyId } = this.props.relaxProps;
    return (
      <View style={styles.mask}>
        <View style={styles.updateContent}>
          <View style={styles.mainBox}>
            <View style={{alignItems:'center'}}>
              <Text style={styles.tip}>温馨提示</Text>
            </View>
            <ScrollView style={styles.main}>
              <AutoHeightWebView
                enableBaseUrl={true}
                source={{
                  html:
                    styleHtml + privacyPolicyPop
                }}
                scalesPageToFit={isAndroid ? true : false}
                style={{ width: '100%' }}
              />
            </ScrollView>
          </View>
          <View style={[styles.flexBottom,{paddingHorizontal:52,height:12}]}>
            <TouchableOpacity onPress={() => showPrivacyPolicy(1)} >
              <Text
                allowFontScaling={false}
                style={[styles.smallText, { color: mainColor,position:'relative',right:13  }]}
              >
                《用户协议》
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showPrivacyPolicy(2)} >
              <Text
                allowFontScaling={false}
                style={[styles.smallText, { color: mainColor,position:'relative',left:14 }]}
              >
                《隐私政策》
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.flexBottom}>
            <TouchableOpacity onPress={() => refuse()} style={[styles.opreationBtn,{backgroundColor:'#f5f5f5'}]}>
              <Text
                allowFontScaling={false}
                style={[styles.smallText,{color:'#000'}]}
              >
                拒绝
              </Text>
            </TouchableOpacity>
            <LinearGradient
              colors={[mainColor, mainColor]}
              style={{borderRadius:18}}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
            <TouchableOpacity onPress={() => readAndAgree(privacyPolicyId)} style={[styles.opreationBtn]} >
              <Text
                allowFontScaling={false}
                style={[styles.smallText, { color: '#fff' }]}
              >
                我已阅读并同意
              </Text>
            </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
    );
  }


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
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  updateContent: {
    width:screenWidth*0.853,
    // width: imgWidth,
    // minHeight: imgWidth * 0.5,
    // maxHeight: imgWidth * 0.76,
    // height:imgWidth / 0.921,
    // flex:1,
    minHeight:202,
    maxHeight:480,
    // justifyContent: 'center',
    backgroundColor: '#fdfdfd',
    borderRadius:8,
    // borderBottomLeftRadius:8,
    // borderBottomRightRadius:8,
    // paddingTop:24,
    // padding:20
    paddingHorizontal:20
    // paddingTop: imgWidth * 0.445
  },
  mainBox: {
    // flex: 1,
    width: '100%',
    paddingTop:32,
    // paddingBottom:20

  },
  main: {
    // width: '100%',
    // marginTop: 20
    minHeight:26,
    marginVertical: 20,
    maxHeight: 224,
    // backgroundColor: '#000',
    // flex:1

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

  tip:{
    // marginLeft: 100
    // flexDirection:'row',
    // justifyContent:'center',
    // alignItems:'center',
    // margin:
    fontSize:16
  },
  smallText: {
    fontSize: 12,
    color: '#999',
  },
  flexBottom: {
    flexDirection: 'row',
    height: 36,
    // alignItems: 'center',
    justifyContent: 'space-between',
    // width:240,
    // borderRadius:18,
    marginBottom:20
  },
  opreationBtn: {
    width:screenWidth*0.36,
    height:36,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:18,
    fontSize:14
  },
  // tipDetailBtn: {

  // }
});
