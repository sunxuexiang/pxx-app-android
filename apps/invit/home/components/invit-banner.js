import React from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  View,
  PixelRatio
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import { mainColor } from 'wmkit/styles/index';

@Relax
export default class InvitBanner extends React.Component {
  static relaxProps = {
    openDetailLayout: noop,
    openInvitLayout: noop,
    isDistributor: 'isDistributor',
    setting: 'setting',
    totalNum: 'totalNum',
    dSetting: 'dSetting'
  };

  render() {
    const {
      openDetailLayout,
      openInvitLayout,
      isDistributor,
      setting,
      totalNum,
      dSetting
    } = this.props.relaxProps;
    // 宣传海报
    let inviteImg = '';
    // 规则描述
    let ruleDesc;
    const applyFlag = dSetting.get('applyFlag');
    const inviteFlag = dSetting.get('inviteFlag');
    const openFlag = dSetting.get('openFlag');
    //展示邀新海报的情况
    //1.是分销员2.不是分销员且招募开关关闭且邀新奖励开关打开,均显示显示邀新奖励落地页海报
    if (dSetting.size > 0) {
      if (isDistributor || (!isDistributor && !applyFlag && inviteFlag)) {
        // 展示邀新海报
        inviteImg = setting.get('inviteImg');
        // 邀新奖励说明
        ruleDesc = setting.get('inviteDesc');
      } else {
        //展示邀请注册时招募落地页海报
        inviteImg = setting.get('inviteRecruitImg');
        // 招募规则说明
        ruleDesc = setting.get('recruitDesc');
      }
    }
    return (
      <View style={styles.container}>
        <View style={styles.bjBox}>
          <ImageBackground
            style={styles.invitBj}
            resizeMode="cover"
            source={
              inviteImg ? { uri: inviteImg } : require('../img/invit-bj.png')
            }
          >
            <TouchableOpacity
              style={styles.detail}
              activeOpacity={0.8}
              onPress={() => openDetailLayout({ ruleDesc })}
            >
              <Text style={styles.textTip} allowFontScaling={false}>
                详细说明
              </Text>
            </TouchableOpacity>
          </ImageBackground>
          <TouchableOpacity activeOpacity={0.8} onPress={openInvitLayout}>
            <LinearGradient
              colors={[mainColor, mainColor]}
              style={styles.btnBox}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Text style={styles.btn} allowFontScaling={false}>
                立即邀请
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.downText}>
            <Text style={styles.invitText} allowFontScaling={false}>
              您已成功邀请
              <Text style={{ color: mainColor }} allowFontScaling={false}>
                {totalNum}
              </Text>
              位好友
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bjBox: {
    paddingHorizontal: 12,
    paddingVertical: 12
  },
  invitBj: {
    width: 351,
    height: 120,
    borderRadius: 6,
    justifyContent: 'center',
    marginBottom: 12
  },
  detail: {
    width: 64,
    height: 20,
    borderRadius: 10,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#FFFFFF',
    position: 'absolute',
    right: 12,
    top: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textTip: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  btnBox: {
    width: 351,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  btn: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  downText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  invitText: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.4)'
  }
});
