import React from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { msg } from 'plume2';
import { screenHeight, screenWidth } from 'wmkit/styles/index';
import * as WMkit from 'wmkit/kit';
// import { isAndroid } from 'wmkit/styles/index';
import { _, isAndroid } from 'wmkit';


export default class CashModal extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.whiteBox}>
          <View style={styles.tipText}>
            <Text style={styles.text} allowFontScaling={false}>
              您的账号未绑定微信，请至账户中心-关联账号
            </Text>
          </View>

          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={() => {
              if (!WMkit.isLoginOrNotOpen()) {
                msg.emit('loginModal:toggleVisible', {
                  callBack: () => {
                    msg.emit('router: goToNext', {
                      routeName: 'LinkedAccount'
                    });
                  }
                });
              } else {
                msg.emit('router: goToNext', {
                  routeName: 'LinkedAccount'
                });
              }
            }}
          >
            <Text style={styles.btnText} allowFontScaling={false}>
              确定
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
    height: screenHeight,
    ..._.ifIphoneX(
      {
        paddingTop: 35,
        top: 80
      },
      {
        top: isAndroid ? 50 : 60,
        paddingTop: isAndroid ? 0 : 15
      }
    ),
    // top: 100,
    position: 'absolute',
    backgroundColor: 'rgba(000,000,000,0.5)'
  },
  whiteBox: {
    width: screenWidth * 0.888,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop:-80
  },
  tipText: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 15
  },
  text: {
    fontSize: 18,
    color: '#333'
  },
  btn: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ebebeb',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15
  },
  btnText: {
    fontSize: 16,
    color: '#FF1F4E'
  }
});
