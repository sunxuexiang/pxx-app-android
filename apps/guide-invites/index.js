import React from 'react';
import { StyleSheet, View, StatusBar,Text,Image } from 'react-native';
import { msg, StoreProvider } from 'plume2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isAndroid } from 'wmkit/styles/index';
import AppStore from './store';
import Header from 'wmkit/header';
import QRCode from './components/qr-code';
import InviteFriends from './components/invite-friends';
import { screenWidth,screenHeight } from 'wmkit/styles/index';
import * as _ from 'wmkit/common/util';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class GuideInvites extends React.Component {
  store;
  componentDidMount(){
    const state = this.props.route;
    const { employeeId } = (state && state.params) || {};

    this.store.init(employeeId);
  }

  render() {

    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <StatusBar barStyle={isAndroid ? 'light-content' : 'dark-content'} />
        <Header
            title="导购邀新"
            onLeftMenuPress={() => {
              msg.emit('router: goToNext', {
                routeName: 'UserCenter'
              })
            }}
        />
        <Image source={require('./img/invites-bg.png')} style={styles.img} resizeMode="stretch"/>
        <View style={styles.boxTitle}>
          <Image source={require('./img/title.png')} style={styles.imgTitle} resizeMode="stretch"/>
        </View>
        <View style={styles.boxLogo}>
          <Image source={require('./img/logo-bg.png')} style={styles.imgLogo} resizeMode="stretch"/>
        </View>
        
        <QRCode />
        <InviteFriends />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  img:{
    flex:1,
    width:screenWidth,
    // position:'absolute',
    // top:0,
    // left:0,
    // width:screenWidth,
    // ..._.ifIphoneX(
    //   {
    //     marginTop: 80,
    //     height:screenHeight - 80,
    //   },
    //   {
    //     marginTop: isAndroid ? 50 : 75,
    //     height:isAndroid ? screenHeight-50 : screenHeight - 75,
    //   }
    // ),
  },
  boxTitle:{
    position:'absolute',
    right:0,
    left:0,
    top:100,
    justifyContent:'center',
    flexDirection:'row'
  },
  imgTitle:{
    width:screenWidth * 0.7,
    height:screenWidth * 0.7 / 3,
  },
  boxLogo:{
    position:'absolute',
    right:0,
    left:0,
    bottom:0,
    justifyContent:'center',
    flexDirection:'row'
  },
  imgLogo:{
    width:screenWidth / 2,
    height:screenWidth / 2,
  }
});
