import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from 'react-native';
import * as Button from './../button';
const LongButton = Button.LongButton;

export default class WMSendCoupon extends React.PureComponent {
  static defaultProps = {
    visible: {}
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { visible } = this.props;
    return (
      visible && (
        <View style={styles.mask}>
          <View style={styles.content}>
            <View style={styles.headerBox}>
              <Text style={styles.title} allowFontScaling={false}>
                注册成功！
              </Text>
              <Text style={styles.tips} allowFontScaling={false}>
                168元注册大礼包已发送至您的账户
              </Text>
            </View>
            <View style={styles.center}>
              <ScrollView contentContainerStyle={styles.couponList}>
                <View style={styles.item}>
                  <ImageBackground
                    style={styles.bg}
                    source={require('./img/coupon-general.png')}
                  >
                    <Text style={styles.price} allowFontScaling={false}>
                      <Text style={styles.symbol} allowFontScaling={false}>
                        ￥
                      </Text>
                      118
                    </Text>
                  </ImageBackground>
                  <View style={styles.rightBox}>
                    <View style={styles.ruleBox}>
                      <Text style={styles.rules} allowFontScaling={false}>
                        满300可用
                      </Text>
                      <Text style={styles.num} allowFontScaling={false}>
                        × 2
                      </Text>
                    </View>
                    <Text style={styles.time} allowFontScaling={false}>
                      2018-10-01至2018-10-30
                    </Text>
                  </View>
                </View>

                <View style={styles.item}>
                  <ImageBackground
                    style={styles.bg}
                    source={require('./img/coupon-general.png')}
                  >
                    <Text style={styles.price} allowFontScaling={false}>
                      <Text style={styles.symbol} allowFontScaling={false}>
                        ￥
                      </Text>
                      118
                    </Text>
                  </ImageBackground>
                  <View style={styles.rightBox}>
                    <View style={styles.ruleBox}>
                      <Text style={styles.rules} allowFontScaling={false}>
                        满300可用
                      </Text>
                      <Text style={styles.num} allowFontScaling={false}>
                        × 2
                      </Text>
                    </View>
                    <Text style={styles.time} allowFontScaling={false}>
                      2018-10-01至2018-10-30
                    </Text>
                  </View>
                </View>

                <View style={styles.item}>
                  <ImageBackground
                    style={styles.bg}
                    source={require('./img/coupon-general.png')}
                  >
                    <Text style={styles.price} allowFontScaling={false}>
                      <Text style={styles.symbol} allowFontScaling={false}>
                        ￥
                      </Text>
                      118
                    </Text>
                  </ImageBackground>
                  <View style={styles.rightBox}>
                    <View style={styles.ruleBox}>
                      <Text style={styles.rules} allowFontScaling={false}>
                        满300可用
                      </Text>
                      <Text style={styles.num} allowFontScaling={false}>
                        × 2
                      </Text>
                    </View>
                    <Text style={styles.time} allowFontScaling={false}>
                      2018-10-01至2018-10-30
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
            <View style={styles.bottom}>
              <LongButton
                btnStyle={styles.btn}
                text="立即查看"
                onClick={() => {}}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.close} activeOpacity={0.8}>
            <Image
              style={styles.closeImg}
              source={require('./img/close.png')}
            />
          </TouchableOpacity>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    backgroundColor: '#fff',
    width: '90%',
    paddingHorizontal: 15
  },
  headerBox: {},
  price: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700'
  },
  symbol: {
    fontSize: 16
  },
  title: {
    fontSize: 18,
    textAlign: 'center'
  },
  tips: {
    textAlign: 'center'
  },
  center: {
    borderWidth: 5,
    borderColor: '#eee',
    padding: 10,
    backgroundColor: '#ddd'
  },
  couponList: {},
  item: {
    flexDirection: 'row',
    marginBottom: 10
  },
  bg: {
    width: 117,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 5
  },
  rightBox: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 10,
    shadowOffset: { width: 5, height: 3 },
    shadowColor: '#999',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderRadius: 2,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  ruleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rules: {
    color: '#000',
    flex: 1,
    fontSize: 12
  },
  time: {
    marginTop: 10,
    color: '#000',
    fontSize: 9
  },
  bottom: {},
  btn: {
    backgroundColor: '#000'
  },
  close: {
    marginTop: 20
  },
  closeImg: {
    width: 43,
    height: 43
  }
});
