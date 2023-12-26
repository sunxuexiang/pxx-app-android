import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import * as WMkit from 'wmkit/kit';
import Fetch from 'wmkit/fetch';
import { config } from 'wmkit/config';
import * as _ from '../../wmkit/common/util';

import { msg } from 'plume2';
import { mainColor, screenWidth } from 'wmkit/styles/index';
const dates = [
  {
    img: require('./img/members.png'),
    currImg: require('./img/members_choose-red.png'),
    text: '会员中心',
    press: 'MemberCenter'
  },
  {
    img: require('./img/integral-mall.png'),
    currImg: require('./img/integral_choose-red.png'),
    text: '积分商城',
    press: 'PointsMall'
  },
  {
    img: require('./img/my.png'),
    currImg: require('./img/my.png'),
    text: '我的',
    press: 'UserCenter'
  }
];
export default class WMIntegralFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basicRules: false
    };
  }

  componentDidMount() {
    Fetch('/pointsConfig').then((res) => {
      if (res && res.code === config.SUCCESS_CODE && res.context.status === 1) {
        this.setState({ basicRules: true });
      }
    });
  }
  render() {
    const { currTab } = this.props;

    return (
      <View>
        <View
          style={{
            ..._.ifIphoneX(
              {
                height: 82
              },
              {
                height: 47
              }
            )
          }}
        />
        <View style={styles.bottom}>
          {dates.map((value, index) => {
            if (index == 1 && this.state.basicRules == false) {
              return;
            } else {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    if (value.text == '会员中心' && !WMkit.isLoginOrNotOpen()) {
                        msg.emit('loginModal:toggleVisible', {
                          callBack: () => {
                            msg.emit('router: goToNext', { routeName: value.press });
                          }
                        });
                    } else {
                      msg.emit('router: goToNext', {
                        routeName: value.press
                      });
                      window.currentRouteName = value.press;
                    }
                  }}
                  style={styles.conBox}
                >
                  <Image
                    style={styles.img}
                    source={currTab == value.text ? value.currImg : value.img}
                  />
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.text,
                      currTab == value.text ? { color: mainColor } : ''
                    ]}
                  >
                    {value.text}
                  </Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>
      </View>
    );
  }
}




const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: screenWidth,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderTopColor: '#e1e1e1',
    borderTopWidth: 1,
    ..._.ifIphoneX(
      {
        height: 82,
        paddingBottom: 35
      },
      {
        height: 47
      }
    )
  },
  conBox: {
    height: 47,
    // width: screenWidth / 3,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: 21,
    height: 21,
    marginBottom: 2
    // tintColor: '#333'
  },
  text: {
    color: '#888',
    fontSize: 10
    // opacity: 0.4
  }
});
