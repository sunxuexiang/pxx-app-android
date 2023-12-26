import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    View
} from 'react-native';

import { msg, StoreProvider } from 'plume2';
import { screenWidth,isAndroid } from 'wmkit/styles/index';
import styled from "styled-components/native/dist/styled-components.native.esm";
import { mainColor } from 'wmkit/styles/index';
import RNExitApp from "react-native-exit-app";
import {cache} from "../../cache";
import PrivacyPolicyPop from './components/privacy-policy-pop';
import AppStore from './store';
import * as _ from '/wmkit/common/util';
import PrivacyPolicyAgreement from './components/agreement';
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
const BtnText = styled.Text`
  color: ${mainColor}
  font-size: 14
  line-height: 26
`;
const Mask = styled.View`
  background-color: rgba(0,0,0,.5)
  position: absolute
  top: 0
  left: 0
  flex: 1
  align-items: center
  justify-content: center
  width: 100%
  height: 100%
`;


/**
 * 隐私政策弹窗
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class PrivacyPolicyModal extends React.PureComponent {


  UNSAFE_componentWillMount() {
    msg.on('privacy-policy-modal:visible', this._initModel);
  }

  componentWillUnmount() {
    msg.off('privacy-policy-modal:visible', this._initModel);
  }

  constructor(props) {
    super(props);
    this.state = {
      //隐私政策可见性
      privacyModalVisible: false,
      //协议
      showAgreement: false,

      showPrivacyModal: false,

    };
  }

  render() {
    const {
      showAgreement,
      showPrivacyModal,
    } = this.state;
    return  showPrivacyModal && (
      <View style={styles.mask}>
        <PrivacyPolicyPop />
        {showAgreement && <PrivacyPolicyAgreement />}
      </View>
  )
  }

  /**
   * 初始化弹框
   * @param upgradeInfo
   * @private
   */
  _initModel = (params) => {
    const {  showPrivacyModal} = params;
    this.store.init(showPrivacyModal);
  };

}

const imgWidth = Number.parseInt(screenWidth * 0.78 + '');
const imgHeight = Number.parseInt(imgWidth * 0.445 + '');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    // height:screenHeight,
    ..._.ifIphoneX(
      {
        paddingTop: -44
      },
      {
        paddingTop: isAndroid ? 0 : -20
      }
    )
  },
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
  // updateHeader: {
  //   width: imgWidth,
  //   height: imgWidth / 2.692,
  // },
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
    paddingVertical: 20,
    // flex:1

  },
  // checkItem: {
  //   width: '100%',
  //   paddingVertical: 16,
  //   flexDirection: 'row',
  //   justifyContent:'center',
  //   alignItems: 'center'
  // },
  // tips: {
  //   marginLeft: 5,
  //   color: '#999',
  //   fontSize: 14
  // },
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
    borderRadius:18
  },
  // tipDetailBtn: {

  // }
});
