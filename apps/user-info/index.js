import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

import { StoreProvider } from 'plume2';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from 'wmkit/header';
import * as Button from 'wmkit/button';

import AppStore from './store';
import UserInfoEdit from './components/user-info-edit';
import GiftModal from './components/gift-modal';
import LinearGradient from 'react-native-linear-gradient';
import { mainColor } from 'wmkit/styles/index';
import * as _ from 'wmkit/common/util';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class UserInfo extends React.Component {
  store;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.store.init();
  }

  render() {
    // 成长值总开关
    let growthValueIsOpen = this.store.state().get('growthValueIsOpen');
    // 积分总开关
    let pointsIsOpen = this.store.state().get('pointsIsOpen');
    let growthValues = this.store.state().get('growthValues');
    let rewardFlag = this.store.state().get('rewardFlag');
    return (
      <View style={styles.container}>
        <Header title="基础信息"/>
        {((growthValueIsOpen && growthValues.get('growthFlag')) ||
          (pointsIsOpen && growthValues.get('pointFlag'))) && rewardFlag && (
          <View style={styles.gift}>
            <TouchableOpacity
              style={styles.giftBtn}
              onPress={() => this.store.openGiftModal(true)}
              activeOpacity={0.8}
            >
              <Image source={require('./img/gift.png')} style={[styles.icon, { tintColor: mainColor }]}/>
              <Text style={[styles.iconText, { color: mainColor }]}>完善有礼</Text>
            </TouchableOpacity>
          </View>
        )}
        <UserInfoEdit/>
        <TouchableOpacity style={styles.bottom} onPress={() => this.store.updateUserInfo()}>
          <LinearGradient
            colors={[mainColor, mainColor]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.buttonBox, { backgroundColor: mainColor }]}
          >
            <Text style={{ color: '#fff', fontSize: 14 }}>保存</Text>
          </LinearGradient>
        </TouchableOpacity>
        {this.store.state().get('giftModalShow') && <GiftModal/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  bottom: {
    paddingTop: 12,
    paddingHorizontal: 12,
    ..._.ifIphoneX(
      {
        paddingBottom: 36
      },
      {
        paddingBottom: 12
      }
    )
  },
  buttonBox: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18
  },
  gift: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 40,
    paddingHorizontal: 12
  },
  giftBtn: {
    flexDirection: 'row'
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 8
  },
  iconText: {
    fontSize: 12
  }
});
