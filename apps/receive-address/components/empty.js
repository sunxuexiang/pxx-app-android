/**
 * Created by feitingting on 2017/8/30.
 */
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, PixelRatio } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { msg } from 'plume2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mainColor } from 'wmkit/styles/index';
export default class AddressEmpty extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.empty}>
          <Image style={styles.img} source={require('../img/none.png')} />
          <Text style={styles.text}>还没有收货地址，快去新增吧</Text>
        </View>
        <SafeAreaView>
          <View style={styles.bottom}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                color: 'rgba(0,0,0,0.4)'
              }}
            >
              最多可添加20条收货地址
          </Text>
            <View style={styles.btnbox}>
              <TouchableOpacity
                onPress={() =>
                  msg.emit('router: goToNext', {
                    routeName: 'UserAddressEdit'
                  })
                }
                style={styles.add}
              >
                <LinearGradient
                  colors={[mainColor, mainColor]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={[styles.buttonBox, { backgroundColor: mainColor }]}
                >
                  <Image
                    style={styles.addImg}
                    source={require('../img/add.png')}
                  />
                  <Text style={{ color: '#fff', fontSize: 14 }}>
                    新增收货地址
              </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 200,
    height: 200,
    marginBottom: 15
  },
  text: {
    color: '#333333',
    fontSize: 15,
    marginBottom: 5
  },
  bottom: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ebebeb',
    backgroundColor: '#fff',
    paddingTop: 10
  },
  btnbox: {
    position: 'relative',
    padding: 12,
    paddingBottom: 10,
    paddingTop: 10
  },
  buttonBox: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    flexDirection: 'row'
  },
  add: {
    borderRadius: 18,
    height: 36
  },
  addImg: {
    height: 16,
    width: 16,
    marginRight: 8
  },
});
