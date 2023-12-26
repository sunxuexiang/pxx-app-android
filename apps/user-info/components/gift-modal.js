/**
 * Created by hht on 2017/9/8.
 */

import React from 'react';
import {
  KeyboardAvoidingView,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { msg, Relax } from 'plume2';

import LinearGradient from 'react-native-linear-gradient';
import { noop } from 'lodash';
import { mainColor } from 'wmkit/styles/index';
@Relax
export default class giftModal extends React.Component {
  static relaxProps = {
    growthValues: 'growthValues',
    // 成长值总开关
    growthValueIsOpen: 'growthValueIsOpen',
    // 积分总开关
    pointsIsOpen: 'pointsIsOpen',
    openGiftModal: noop,
    init: noop
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      growthValues,
      openGiftModal,
      init,
      growthValueIsOpen,
      pointsIsOpen
    } = this.props.relaxProps;

    let growthObj = growthValues.toJS();
    let value = 0;
    let point = 0;
    if (growthObj.growthFlag && growthObj.growthValue > 0) {
      value = growthObj.growthValue;
    }
    if (growthObj.pointFlag && growthObj.point > 0) {
      point = growthObj.point;
    }
    // 赢奖励文本
    let rewardText = '';
    if (
      growthValueIsOpen &&
      pointsIsOpen &&
      growthObj.growthFlag &&
      growthObj.pointFlag
    ) {
      rewardText = '赢成长值，积分';
    } else if (pointsIsOpen && growthObj.pointFlag) {
      rewardText = '赢积分';
    } else if (growthValueIsOpen && growthObj.growthFlag) {
      rewardText = '赢成长值';
    }

    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <LinearGradient
            colors={[mainColor, mainColor]}
            style={styles.content}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <Text style={styles.title} allowFontScaling={false}>
              完善账户信息
            </Text>
            <Text style={styles.text} allowFontScaling={false}>
              {rewardText}
            </Text>
            <View style={styles.row}>
              {growthValueIsOpen && growthObj.growthFlag && (
                <View style={[styles.item, { marginRight: 8 }]}>
                  <Image source={require('../img/1.png')} style={styles.icon} />
                  <Text style={[styles.num, { color: mainColor }]} allowFontScaling={false}>
                    {value}
                  </Text>
                  <Text style={styles.name} allowFontScaling={false}>
                    成长值
                  </Text>
                </View>
              )}
              {pointsIsOpen && growthObj.pointFlag && (
                <View style={styles.item}>
                  <Image source={require('../img/2.png')} style={styles.icon} />
                  <Text style={[styles.num, { color: mainColor }]} allowFontScaling={false}>
                    {point}
                  </Text>
                  <Text style={styles.name} allowFontScaling={false}>
                    积分值
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                openGiftModal(false);
              }}
            >
              <LinearGradient
                colors={['#FFEB66', '#FFC34D']}
                style={styles.btn}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              >
                <Text style={styles.btnText} allowFontScaling={false}>
                  现在就去
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
          <Image source={require('../img/top.png')} style={styles.topImg} />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            openGiftModal(false);
          }}
          style={styles.closeBox}
        >
          <Image source={require('../img/close.png')} style={styles.close} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(000,000,000,0.4)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  column: {
    flexDirection: 'column'
  },
  topImg: {
    width: 280,
    height: 111,
    position: 'absolute',
    top: 0
  },
  content: {
    width: 280,
    height: 294,
    borderRadius: 8,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 91,
    paddingTop: 24
  },
  title: {
    fontSize: 20,
    color: '#FEF8D6',
    fontWeight: 'bold',
    marginBottom: 4
  },
  text: {
    fontSize: 12,
    color: '#fff'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18
  },
  item: {
    width: 100,
    borderRadius: 6,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 10
  },
  icon: {
    width: 100,
    height: 72,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginBottom: 4
  },
  num: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  name: {
    fontSize: 12,
    color: '#999'
  },
  btn: {
    marginHorizontal: 20,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: 240,
    marginTop: 20
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#BD4013'
  },
  closeBox: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16
  },
  close: {
    width: 40,
    height: 40
  }
});
