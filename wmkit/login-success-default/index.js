import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image, SafeAreaView
} from 'react-native';
import { msg } from 'plume2';
import { screenWidth } from '@/wmkit/styles';

/**
 * 登录成功后的缺省页
 */
export default class LoginSuccessDefault extends React.PureComponent {

  state = {
    timeOffset : 5
  };

  componentDidMount(){
    this._doCount();
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.versionBox}>
            <Image
              source={require('./img/success.png')}
              style={styles.img}
            />
            <Text style={{marginTop:10}}>您已注册成功</Text>
            <View style={{marginTop:10}}>
              <Text>如需完善资料</Text>
            </View>
            <View style={{marginTop:10}}>
              <Text>
                请进入 <Text style={{color: 'orange'}} onPress={() => msg.emit('router: goToNext', { routeName: 'UserCenter' })} > 个人中心 </Text> 完善
              </Text>
            </View>
          </View>
          <SafeAreaView
            style={{ marginBottom: 200, justifyContent: 'flex-end' }}
          >
            <View style={styles.center}>
              <Text>
                您将在<Text style={{color:'red'}}>{this.state.timeOffset}</Text>s后进入商城，也可以
                <Text style={{color: 'red'}} onPress={() => msg.emit('router: goToNext', { routeName: 'Main' })}>
                  立即进入商城
                </Text>
              </Text>
            </View>
          </SafeAreaView>
        </View>
      </View>
    );
  }

  _doCount = () => {
    //将定时器统一赋给window全局对象，便于清除
    this.timer = setInterval(() => {
      if (this.state.timeOffset < 1) {
        clearInterval(this.timer);
        msg.emit('router: goToNext', { routeName: 'Main' });
      }
      this.setState({
        timeOffset: this.state.timeOffset - 1
      });
    }, 1000);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    justifyContent: 'space-between'
  },
  versionBox: {
    width: screenWidth,
    height: screenWidth,
    alignItems: 'center',
    justifyContent: 'center'
  },
  version: {
    width: screenWidth * 0.92,
    height: screenWidth * 0.92,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  num: {
    color: '#fff',
    fontSize: 36,
    textAlign: 'center',
    marginTop: 5
  },
  btn: {
    marginLeft: '20%',
    width: '60%'
  },
  linearGradient: {
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 1, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowColor: '#fc3749'
  },
  whiteText: {
    color: '#fff',
    fontSize: 16
  },
  normalText: {
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: screenWidth < 361 ? 25 : 40
  },
  copyText: {
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 16,
    color: '#999'
  },
  img: {
    width: 100,
    height: 100
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
