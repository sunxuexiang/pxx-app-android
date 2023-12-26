import React, { Component } from 'react';

import { msg } from 'plume2';
import { Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenWidth } from 'wmkit/styles/index';

export default class SuccessContent extends Component {
  render() {
    const { result } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.imgBox}>
            <Image
              style={styles.img}
              source={require('./img/result-suc.png')}
            />
            <Text allowFontScaling={false} style={styles.text}>订单提交成功！</Text>
          </View>
          <View style={styles.orderBox}>
            <View style={styles.line} />
            <View style={styles.row}>
              <Text style={styles.dark} allowFontScaling={false}>
                订单编号
              </Text>
              <Text style={styles.dark} allowFontScaling={false}>
                {result.tid}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.dark} allowFontScaling={false}>
                订单金额
              </Text>
              <Text style={styles.dark} allowFontScaling={false}>
                {result.points}积分
              </Text>
            </View>
            <Image
              source={require('./img/transparentline.png')}
              style={styles.line}
            />
          </View>
        </View>
        <SafeAreaView>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.8}
              onPress={() => {
                msg.emit('purchaseNum:refresh');
                msg.emit('router: goToNext', {
                  routeName: 'PointsOrderList'
                });
              }}
            >
              <Text allowFontScaling={false} style={styles.btnText}>
                查看订单
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.8}
              onPress={() => msg.emit('router: goToNext', { routeName: 'Main' })}
              >
              <Text allowFontScaling={false} style={styles.btnText}>
                返回首页
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  /**
   * 返回首页
   * @private
   */
  _backToMain() {
    msg.emit('router: goToNext', { routeName: 'PointsMall' });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  img: {
    width: 200,
    height: 200,
    marginBottom: 15,
    marginTop: 40
  },
  text: {
    color: '#000',
    fontSize: 15
  },
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '20%'
  },
  grey: {
    color: '#333',
    fontSize: 13,
    marginTop: 10
  },
  orderBox: {
    borderColor: '#ebebeb',
    borderWidth: 1 / PixelRatio.get(),
    width: screenWidth * 0.7,
    paddingTop: 10,
    marginTop: 20,
    borderBottomWidth: 0
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 10
  },
  dark: {
    fontSize: 13,
    color: '#000'
  },
  imgBox: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  line: {
    width: screenWidth * 0.7,
    height: 2

  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    backgroundColor: '#ffffff'
  },
  btn: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    width: (screenWidth - 72) / 2,
    borderColor: '#000',
    borderWidth: 1
  },
  btnText: {
    color: '#000',
    fontSize: 16
  }
});