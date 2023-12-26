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
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';

@Relax
export default class StoreHeader extends React.Component {
  // static relaxProps = {
  //   openDetailLayout: noop,
  //   openInviteLayout: noop
  // };

  render() {
    // const { openDetailLayout, openInviteLayout } = this.props.relaxProps;
    return (
      <View style={styles.container}>
        <View style={styles.bjBox}>
          <ImageBackground
            style={styles.inviteBj}
            resizeMode="contain"
            source={require('../img/invite-bj.png')}
          >
            <TouchableOpacity
              style={styles.detail}
              activeOpacity={0.8}
              // onPress={openDetailLayout}
            >
              <Text style={styles.textTip} allowFontScaling={false}>
                详细说明
              </Text>
              <Image style={styles.tip} source={require('../img/tip.png')} />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  bjBox: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb'
  },
  inviteBj: {
    height: 145,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 17
  },
  twoText: {
    flexDirection: 'row'
  },
  text: {
    fontSize: 14,
    color: '#fff'
  },
  detail: {
    position: 'absolute',
    right: 11,
    top: 11,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textTip: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginRight: 8
  },
  tip: {
    width: 15,
    height: 15
  }
});
