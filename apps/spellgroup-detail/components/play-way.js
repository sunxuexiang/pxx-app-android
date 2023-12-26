import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  BackAndroid
} from 'react-native';
import { Relax, msg } from 'plume2';
import LinearGradient from 'react-native-linear-gradient';
import {mainColor} from 'wmkit/styles/index';
@Relax
export default class PlayWay extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <TouchableOpacity TouchableOpacity={0.8} style={styles.groupTitle} onPress={() => msg.emit('router: goToNext', { routeName: 'GrouponRule' })}>
          <Text style={styles.titleText} allowFontScaling={false}>拼团玩法</Text>
          <View style={styles.titleRight}>
            <Text style={styles.more} allowFontScaling={false}>玩法详情</Text>
            <Image style={styles.arrow} source={require('../img/arrow-right.png')} />
          </View>
        </TouchableOpacity> */}
        <View style={styles.playGame}>
          {/* 拼团玩法 */}
          <Text style={styles.title} allowFontScaling={false}>拼团玩法</Text>
          <Image source={require('../img/group-bj.png')} style={styles.playBj} />
        </View>
        <View style={styles.bottomBox}>
          <View style={styles.item}>
            <Text style={[styles.num, { color: mainColor }]} allowFontScaling={false}>01</Text>
            <View style={[styles.row, { backgroundColor: mainColor }]}></View>
            <Text style={styles.text1} allowFontScaling={false}>选择商品</Text>
            <Text style={styles.text2} allowFontScaling={false}>付款开团/参团</Text>
          </View>

          <View style={styles.item}>
            <Text style={[styles.num, { color: mainColor }]} allowFontScaling={false}>02</Text>
            <View style={[styles.row, { backgroundColor: mainColor }]}></View>
            <Text style={styles.text1} allowFontScaling={false}>邀请并等待</Text>
            <Text style={styles.text2} allowFontScaling={false}>还有支付参团</Text>
          </View>

          <View style={styles.item}>
            <Text style={[styles.num, { color: mainColor }]} allowFontScaling={false}>03</Text>
            <View style={[styles.row, { backgroundColor: mainColor }]}></View>
            <Text style={styles.text1} allowFontScaling={false}>达到人数</Text>
            <Text style={styles.text2} allowFontScaling={false}>顺利成团</Text>
          </View>
          <LinearGradient
                    colors={[mainColor, mainColor]}
                    style={styles.line}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                  ></LinearGradient>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    paddingVertical:16,
    alignItems:'center',
    backgroundColor:'#fff',
    marginTop:12,
  },
  playGame:{
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    position: 'relative',
  },
  title:{
    fontSize:14,
    color:'#333',
    fontWeight:'bold',
    position:'absolute',
    top:10
  },
  playBj:{
    width: 134,
    height: 28,
    position: 'absolute',
    top: 0,
  },
  bottomBox:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    width: 285,
    marginTop: 32,
    position: 'relative',
  },
  item:{
    alignItems:'center',
  },
  num:{
    fontSize:18
  },
  row:{
    marginTop: 8,
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  text1:{
    fontSize:10,
    color:'#999',
    marginTop: 8,
  },
  text2:{
    fontSize:10,
    color:'#999',
  },
  line:{
    width: 238,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    top: 36,
    left: 30,
  },
});
